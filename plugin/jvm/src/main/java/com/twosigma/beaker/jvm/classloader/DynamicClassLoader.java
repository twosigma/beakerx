/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package com.twosigma.beaker.jvm.classloader;

import javax.tools.JavaFileManager;
import javax.tools.JavaFileObject;
import javax.tools.StandardLocation;
import java.net.URI;
import java.net.URISyntaxException;
import javax.tools.JavaFileObject;
import javax.tools.StandardLocation;
import java.io.*;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.util.*;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;
import com.google.common.io.Closeables;
import com.google.common.io.Files;
import com.google.common.io.ByteStreams;

public class DynamicClassLoader extends ClassLoader {

  private final List<JarFile> jFiles = new ArrayList<JarFile>();
  private final List<File> cDirectories = new ArrayList<File>();
  private final Map<String, ClassLoader> cLoaders = new HashMap<String, ClassLoader>();

  public DynamicClassLoader() {
    super();
  }

  public DynamicClassLoader(final ClassLoader parent) {
    super(parent);
  }

  public void addClassPathEntry(String classPathEntry) {
    if (classPathEntry.endsWith(".jar")) {
      try {
        JarFile jarFile = new JarFile(classPathEntry);
        jFiles.add(jarFile);
      } catch (IOException e) {
        throw new IllegalStateException("Failed to register classPath entry: " + classPathEntry, e);
      }
    } else {
      File classDirectory = new File(classPathEntry);
      cDirectories.add(classDirectory);
    }
  }

  public void addClassPathEntries(Iterable<String> classPathEntries) {
    for (String classPathEntry : classPathEntries) {
      addClassPathEntry(classPathEntry);
    }
  }

  public void addSpecificClassLoader(String qualifiedClassName, ClassLoader cl) {
    cLoaders.put(qualifiedClassName, cl);
  }

  @Override
  protected Class<?> findClass(final String qualifiedClassName) throws ClassNotFoundException {
    System.err.println("XXXX findClass("+qualifiedClassName+")");
    Class<?> result=null;

    if(cLoaders.containsKey(qualifiedClassName)) {
      try {
        result = cLoaders.get(qualifiedClassName).loadClass(qualifiedClassName);
        if (result != null) {
          return result;
        }
      } catch (ClassNotFoundException nf) {
      // Ignore and fall through
      }
    }
    result = findClassInFileSystem(qualifiedClassName);
    if (result != null) {
      return result;
    }
    result = findClassInJarFile(qualifiedClassName);
    if (result != null) {
      return result;
    }
    try {
      result = Class.forName(qualifiedClassName);
      return result;
    } catch (ClassNotFoundException nf) {
      // Ignore and fall through
    }
    return super.findClass(qualifiedClassName);
  }

  protected Class<?> findClassInFileSystem(String qualifiedClassName) {
    for (File classDirectory : cDirectories) {
      File classFile = new File(classDirectory, qualifiedClassName.replace('.', '/') + ".class");
      if (classFile.exists()) {
        try {
          byte[] byteCode = Files.toByteArray(classFile);
          return defineClass(qualifiedClassName, byteCode, 0, byteCode.length);
        } catch (IOException e) {
          throw new IllegalStateException("Failed to read class file " + classFile, e);
        }
      }
    }
    return null;
  }


  protected Class<?> findClassInJarFile(String qualifiedClassName) throws ClassNotFoundException {
    URI classUri = buildUri(StandardLocation.CLASS_OUTPUT, qualifiedClassName);
    String internalClassName = classUri.getPath().substring(1);
    JarFile jarFile = null;
    try {
      for (int i = 0; i < jFiles.size(); i++) {
        jarFile = jFiles.get(i);
        JarEntry jarEntry = jarFile.getJarEntry(internalClassName);
        if (jarEntry != null) {
          InputStream inputStream = jarFile.getInputStream(jarEntry);
          try {
            byte[] byteCode = new byte[(int) jarEntry.getSize()];
            ByteStreams.read(inputStream, byteCode, 0, byteCode.length);
            return defineClass(qualifiedClassName, byteCode, 0, byteCode.length);
          } finally {
            Closeables.closeQuietly(inputStream);
          }
        }
      }
    } catch (IOException e) {
      throw new IllegalStateException(String.format("Failed to lookup class %s in jar file %s", qualifiedClassName, jarFile), e);
    }
    return null;
  }

    @Override
    protected Enumeration<URL> findResources(String resource) throws IOException {
        System.err.println("XXXX findResources("+resource+")");
            
        List<URL> result = new ArrayList<URL>(Collections.list(super.findResources(resource)));
        findResourcesInJarFiles(result, resource);
        findResourcesInJavaFileObjectRegistry(result, resource);
        return Collections.enumeration(result);
    }


    protected void findResourcesInJarFiles(List<URL> result, String resource) throws MalformedURLException {
        for (JarFile jarFile : jFiles) {
            JarEntry entry = jarFile.getJarEntry(resource);
            if (entry != null) {
                result.add(new URL("jar", "", String.format("file:%s!%s", jarFile.getName(), resource)));
            }
        }
    }

    protected void findResourcesInJavaFileObjectRegistry(List<URL> result, String resource) throws MalformedURLException {
        for (ClassLoader cl : cLoaders.values()) {
          URL u = cl.getResource(resource);
          if(u!=null)
            result.add(u);
        }
    }

    public static String SOURCE_CODE_URI_TEMPLATE = "string:///%s%s";
    public static String CLASS_CODE_URI_TEMPLATE = "bytecode:///%s%s";

    /**
     * Builds url for a given location, class or internal name
     *
     * @param location java file manager location
     * @param name     name
     * @return URI
     */
    public static URI buildUri(JavaFileManager.Location location, String name) {
        String extension = "";
        String template = location.getName().toLowerCase().replace("_", "") + ":///%s%s";
        if (location == StandardLocation.CLASS_OUTPUT) {
            extension = JavaFileObject.Kind.CLASS.extension;
            template = CLASS_CODE_URI_TEMPLATE;
        } else if (location == StandardLocation.SOURCE_OUTPUT) {
            extension = JavaFileObject.Kind.SOURCE.extension;
            template = SOURCE_CODE_URI_TEMPLATE;
        }
        int dotLastPosition = name.lastIndexOf('.');
        if (dotLastPosition != -1) {
            name = name.replace('.', '/');
        }
        return buildUri(String.format(template, name, extension));
    }

    /**
     * Builds uri for a given location, package, simple class name
     *
     * @param location
     * @param packageName
     * @param simpleClassName
     * @return URI
     */
    public static URI buildUri(JavaFileManager.Location location, String packageName, String simpleClassName) {
        if(packageName.isEmpty()) {
            return buildUri(location, simpleClassName);
        }
        return buildUri(location, packageName + "." + simpleClassName);
    }

    /**
     * Builds uri for a given uri fragment.
     *
     * @param uri uri fragment.
     * @return URI
     */
    public static URI buildUri(String uri) {
        try {
            return new URI(uri);
        } catch (URISyntaxException e) {
            throw new IllegalStateException(String.format("Failed to build uri: %s", uri));
        }

    }
}