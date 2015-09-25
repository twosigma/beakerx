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


import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.Enumeration;

public class DynamicClassLoaderSimple extends ClassLoader {
  private URLClassLoader myloader;
  
  public DynamicClassLoaderSimple(ClassLoader classLoader) {
    super(classLoader);
  }
  
  public void addURLs(URL [] urls) {
    myloader = new URLClassLoader(urls);
  }

  public Class<?>  loadClass(String name)  throws ClassNotFoundException {
    if (myloader != null) {
      try {
        return myloader.loadClass(name);
      } catch(ClassNotFoundException e) {        
      }
    }
    return getParent().loadClass(name);
  }

  public URL getResource(String name) {
    if (myloader != null) {
      URL c = myloader.getResource(name);
      if (c!=null)
        return c;
    }
    return getParent().getResource(name);
  }
  
  public InputStream getResourceAsStream(String name) {
    if (myloader != null) {
      InputStream c = myloader.getResourceAsStream(name);
      if (c!=null)
        return c;
    }
    return getParent().getResourceAsStream(name);
  }
    

  public Enumeration<URL> getResources(String name) throws IOException
  {
    if (myloader != null) {
      try {
        Enumeration<URL> c = myloader.getResources(name);
        if (c!=null)
          return c;
      } catch(IOException e) {        
      }
    }
    return getParent().getResources(name);
  }
                              
  
}