/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.javash.autocomplete;

import com.twosigma.beakerx.autocomplete.ClassUtils;
import com.twosigma.beakerx.jvm.classloader.BeakerxUrlClassLoader;

import java.util.List;
import java.util.Optional;

public class JavaClassUtils extends ClassUtils {

  private JavaClasspathScanner classpathscanner;
  private BeakerxUrlClassLoader classLoader;

  public JavaClassUtils(JavaClasspathScanner cps, ClassLoader l) {
    super(l);
    classpathscanner = cps;
  }

  @Override
  protected Class<?> getClass(String name) throws ClassNotFoundException {
    try {
      Class<?> c = super.getClass(name);
      if (c != null)
        return c;
    } catch (Exception e) {
    }

    String fname = classpathscanner.getFileForClass(name);
    if (fname != null) {
      try {
        if (classLoader == null)
          classLoader = new BeakerxUrlClassLoader(loader != null ? loader : getClass().getClassLoader());
        Class<?> clazz = classLoader.parseClass(fname);
        return clazz;
      } catch (Exception e) {
        e.printStackTrace();
      }
    }

    Class<?> aClass = getClass(name, classpathscanner);
    return aClass;
  }


  private Class<?> getClass(String name, JavaClasspathScanner cps) {
    for (String pkg : cps.getPackages()) {
      List<String> cls = cps.getClasses(pkg);
      if (cls != null && !cls.isEmpty()) {
        Optional<String> clazz = cls.stream().filter(x -> x.equals(name)).findFirst();
        if (clazz.isPresent()) {
          try {
            return Class.forName(pkg + "." + clazz.get());
          } catch (ClassNotFoundException e) {
            return null;
          }
        }
      }
    }
    return null;
  }
}
