/*
 * Copyright (C) 2012 The Guava Authors
 * Modifications copyright (C) 2018 TWO SIGMA OPEN SOURCE, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.twosigma.beakerx.util;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.jar.Attributes;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;
import java.util.jar.Manifest;
import java.util.stream.Collectors;

public class ClassPath {

  private static final String CLASS_FILE_NAME_EXTENSION = ".class";
  private final Set<ResourceInfo> resources;

  private ClassPath(Set<ResourceInfo> resources) {
    this.resources = resources;
  }

  public boolean packageExists(String packageName) {
    List<ResourceInfo> collect = resources.stream().filter(x -> x.getResourceName().replace("/", ".").contains(packageName)).collect(Collectors.toList());
    return !collect.isEmpty();
  }

  public static ClassPath from(ClassLoader classloader) throws IOException {
    Scanner scanner = new Scanner();
    for (Map.Entry<URI, ClassLoader> entry : getClassPathEntries(classloader).entrySet()) {
      scanner.scan(entry.getKey(), entry.getValue());
    }
    return new ClassPath(scanner.getResources());
  }

  static Map<URI, ClassLoader> getClassPathEntries(
          ClassLoader classloader) {
    Map<URI, ClassLoader> entries = new HashMap<>();
    // Search parent first, since it's the order ClassLoader#loadClass() uses.
    ClassLoader parent = classloader.getParent();
    if (parent != null) {
      entries.putAll(getClassPathEntries(parent));
    }
    if (classloader instanceof URLClassLoader) {
      URLClassLoader urlClassLoader = (URLClassLoader) classloader;
      for (URL entry : urlClassLoader.getURLs()) {
        URI uri;
        try {
          uri = entry.toURI();
        } catch (URISyntaxException e) {
          throw new IllegalArgumentException(e);
        }
        if (!entries.containsKey(uri)) {
          entries.put(uri, classloader);
        }
      }
    }
    return new HashMap<>(entries);
  }

  static final class Scanner {

    private final Set<ResourceInfo> resources = new HashSet<>();
    private final Set<URI> scannedUris = new HashSet<>();

    Set<ResourceInfo> getResources() {
      return resources;
    }

    void scan(URI uri, ClassLoader classloader) throws IOException {
      if (uri.getScheme().equals("file") && scannedUris.add(uri)) {
        scanFrom(new File(uri), classloader);
      }
    }

    void scanFrom(File file, ClassLoader classloader)
            throws IOException {
      if (!file.exists()) {
        return;
      }
      if (file.isDirectory()) {
        scanDirectory(file, classloader);
      } else {
        scanJar(file, classloader);
      }
    }

    private void scanDirectory(File directory, ClassLoader classloader) throws IOException {
      scanDirectory(directory, classloader, "", new HashSet<>());
    }

    private void scanDirectory(
            File directory, ClassLoader classloader, String packagePrefix,
            Set<File> ancestors) throws IOException {
      File canonical = directory.getCanonicalFile();
      if (ancestors.contains(canonical)) {
        // A cycle in the filesystem, for example due to a symbolic link.
        return;
      }
      File[] files = directory.listFiles();
      if (files == null) {
        // IO error, just skip the directory
        return;
      }
      Set<File> newAncestors = new HashSet<>();
      newAncestors.addAll(ancestors);
      newAncestors.add(canonical);

      for (File f : files) {
        String name = f.getName();
        if (f.isDirectory()) {
          scanDirectory(f, classloader, packagePrefix + name + "/", newAncestors);
        } else {
          String resourceName = packagePrefix + name;
          if (!resourceName.equals(JarFile.MANIFEST_NAME)) {
            resources.add(ResourceInfo.of(resourceName, classloader));
          }
        }
      }
    }

    private void scanJar(File file, ClassLoader classloader) throws IOException {
      JarFile jarFile;
      try {
        jarFile = new JarFile(file);
      } catch (IOException e) {
        // Not a jar file
        return;
      }
      try {
        for (URI uri : getClassPathFromManifest(file, jarFile.getManifest())) {
          scan(uri, classloader);
        }
        Enumeration<JarEntry> entries = jarFile.entries();
        while (entries.hasMoreElements()) {
          JarEntry entry = entries.nextElement();
          if (entry.isDirectory() || entry.getName().equals(JarFile.MANIFEST_NAME)) {
            continue;
          }
          resources.add(ResourceInfo.of(entry.getName(), classloader));
        }
      } finally {
        try {
          jarFile.close();
        } catch (IOException ignored) {
        }
      }
    }

    /**
     * Returns the class path URIs specified by the {@code Class-Path} manifest attribute, according
     * to <a href="http://docs.oracle.com/javase/6/docs/technotes/guides/jar/jar.html#Main%20Attributes">
     * JAR File Specification</a>. If {@code manifest} is null, it means the jar file has no
     * manifest, and an empty set will be returned.
     */
    static Set<URI> getClassPathFromManifest(
            File jarFile, Manifest manifest) {
      if (manifest == null) {
        return new HashSet<>();
      }
      Set<URI> builder = new HashSet<>();
      String classpathAttribute = manifest.getMainAttributes()
              .getValue(Attributes.Name.CLASS_PATH.toString());
      if (classpathAttribute != null) {
        for (String path : classpathAttribute.split(" ")) {
          URI uri;
          try {
            uri = getClassPathEntry(jarFile, path);
          } catch (URISyntaxException e) {
            // Ignore bad entry
            continue;
          }
          builder.add(uri);
        }
      }
      return builder;
    }

    /**
     * Returns the absolute uri of the Class-Path entry value as specified in
     * <a href="http://docs.oracle.com/javase/6/docs/technotes/guides/jar/jar.html#Main%20Attributes">
     * JAR File Specification</a>. Even though the specification only talks about relative urls,
     * absolute urls are actually supported too (for example, in Maven surefire plugin).
     */
    static URI getClassPathEntry(File jarFile, String path)
            throws URISyntaxException {
      URI uri = new URI(path);
      if (uri.isAbsolute()) {
        return uri;
      } else {
        return new File(jarFile.getParentFile(), path.replace('/', File.separatorChar)).toURI();
      }
    }
  }

  public static String getPackageName(String classFullName) {
    int lastDot = classFullName.lastIndexOf('.');
    return (lastDot < 0) ? "" : classFullName.substring(0, lastDot);
  }

  static String getClassName(String filename) {
    int classNameEnd = filename.length() - CLASS_FILE_NAME_EXTENSION.length();
    return filename.substring(0, classNameEnd).replace('/', '.');
  }

  public static final class ClassInfo extends ResourceInfo {
    private final String className;

    ClassInfo(String resourceName, ClassLoader loader) {
      super(resourceName, loader);
      this.className = ClassPath.getClassName(resourceName);
    }

    /**
     * Returns the package name of the class, without attempting to load the class.
     * <p>
     * <p>Behaves identically to {@link Package#getName()} but does not require the class (or
     * package) to be loaded.
     */
    public String getPackageName() {
      return ClassPath.getPackageName(className);
    }

    /**
     * Returns the fully qualified name of the class.
     * <p>
     * <p>Behaves identically to {@link Class#getName()} but does not require the class to be
     * loaded.
     */
    public String getName() {
      return className;
    }

    /**
     * Loads (but doesn't link or initialize) the class.
     *
     * @throws LinkageError when there were errors in loading classes that this class depends on.
     *                      For example, {@link NoClassDefFoundError}.
     */
    public Class<?> load() {
      try {
        return loader.loadClass(className);
      } catch (ClassNotFoundException e) {
        // Shouldn't happen, since the class name is read from the class path.
        throw new IllegalStateException(e);
      }
    }

    @Override
    public String toString() {
      return className;
    }
  }

  public static class ResourceInfo {
    private final String resourceName;
    final ClassLoader loader;

    static ResourceInfo of(String resourceName, ClassLoader loader) {
      if (resourceName.endsWith(CLASS_FILE_NAME_EXTENSION)) {
        return new ClassInfo(resourceName, loader);
      } else {
        return new ResourceInfo(resourceName, loader);
      }
    }

    ResourceInfo(String resourceName, ClassLoader loader) {
      this.resourceName = Preconditions.checkNotNull(resourceName);
      this.loader = Preconditions.checkNotNull(loader);
    }

    /**
     * Returns the url identifying the resource.
     */
    public final URL url() {
      return Preconditions.checkNotNull(loader.getResource(resourceName));
    }

    /**
     * Returns the fully qualified name of the resource. Such as "com/mycomp/foo/bar.txt".
     */
    public final String getResourceName() {
      return resourceName;
    }

    @Override
    public int hashCode() {
      return resourceName.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
      if (obj instanceof ResourceInfo) {
        ResourceInfo that = (ResourceInfo) obj;
        return resourceName.equals(that.resourceName)
                && loader == that.loader;
      }
      return false;
    }

    // Do not change this arbitrarily. We rely on it for sorting ResourceInfo.
    @Override
    public String toString() {
      return resourceName;
    }
  }


}
