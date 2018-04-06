/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.javash;

import com.twosigma.beakerx.jvm.classloader.BeakerXUrlClassLoader;
import com.twosigma.beakerx.kernel.PathToJar;

import java.net.URL;
import java.net.URLClassLoader;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Collections.singletonList;

public class JavaBeakerXUrlClassLoader extends URLClassLoader {

  private BeakerXUrlClassLoader beakerxUrlClassLoader;
  private JavaInternalUrlClassLoader javaURLClassLoader;

  public JavaBeakerXUrlClassLoader(ClassLoader systemClassLoader, PathToJar pathToJar) {
    super(new URL[0]);
    beakerxUrlClassLoader = new BeakerXUrlClassLoader(this.getURLs(), systemClassLoader);
    javaURLClassLoader = new JavaInternalUrlClassLoader(beakerxUrlClassLoader, new URL[0]);
    javaURLClassLoader.addJar(pathToJar);
  }

  public void addJar(PathToJar pathToJar) {
    javaURLClassLoader.addJar(pathToJar);
  }

  public void addInitJar(PathToJar pathToJar) {
    beakerxUrlClassLoader.addJar(pathToJar);
  }

  public void addInitPathToJars(List<PathToJar> paths) {
    for (PathToJar dir : paths) {
      addInitJar(dir);
    }
  }

  public Class<?> loadClass(String name) throws ClassNotFoundException {
    Class<?> aClass = null;
    try {
      aClass = javaURLClassLoader.loadClass(name);
    } catch (Exception e) {
    }
    if (aClass != null) {
      return aClass;
    }
    return beakerxUrlClassLoader.loadClass(name);
  }

  public void resetClassloader() {
    javaURLClassLoader = new JavaInternalUrlClassLoader(beakerxUrlClassLoader, javaURLClassLoader.getURLs());
  }


  public JavaInternalUrlClassLoader getJavaURLClassLoader() {
    return javaURLClassLoader;
  }

  static class JavaInternalUrlClassLoader extends BeakerXUrlClassLoader {

    private static final List<String> excludedClasses = singletonList("slf4j");

    private BeakerXUrlClassLoader external;

    public JavaInternalUrlClassLoader(BeakerXUrlClassLoader external, URL[] urls) {
      super(urls, null);
      this.external = external;
    }

    public Class<?> loadClass(String name) throws ClassNotFoundException {
      if (isNotInExcludedClasses(name)) {
        Class<?> aClass = null;
        try {
          aClass = super.loadClass(name);
        } catch (Exception e) {
        }
        if (aClass != null) {
          return aClass;
        }
      }
      return external.loadClass(name);
    }

    private boolean isNotInExcludedClasses(String name) {
      return excludedClasses.stream()
              .filter(name::contains)
              .collect(Collectors.toList())
              .isEmpty();
    }
  }
}
