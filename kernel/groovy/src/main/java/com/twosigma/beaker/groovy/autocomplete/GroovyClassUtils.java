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
package com.twosigma.beaker.groovy.autocomplete;

import com.twosigma.beaker.autocomplete.ClassUtils;
import groovy.lang.GroovyClassLoader;

import java.io.File;

public class GroovyClassUtils extends ClassUtils {

  private GroovyClasspathScanner classpathscanner;
  private GroovyClassLoader gloader;
  
  public GroovyClassUtils(GroovyClasspathScanner cps, ClassLoader l) {
    super(l);
    classpathscanner = cps;
  }

  protected Class<?> getClass(String name) throws ClassNotFoundException {
    try {
      Class<?> c = super.getClass(name);
      if(c!=null)
        return c;
    } catch(Exception e) { }

    String fname = classpathscanner.getFileForClass(name);
    if(fname != null) {
      try {
        if(gloader==null)
          gloader = new GroovyClassLoader(loader!=null ? loader : getClass().getClassLoader());
        Class<?> groovyClass = gloader.parseClass(new File(fname));
        return groovyClass;
      } catch(Exception e) { e.printStackTrace(); }
    }
    return null;
  }

  
}
