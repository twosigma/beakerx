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

import com.google.common.io.ByteStreams;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLClassLoader;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

public class DynamicClassLoaderSimple extends ClassLoader {
  private URLClassLoader myloader;
  private String outDir;
  protected final Map<String, Class<?>> classes;

  public DynamicClassLoaderSimple(ClassLoader classLoader) {
    super(classLoader);
    classes = Collections.synchronizedMap( new HashMap<String, Class<?>>() );
  }
  
  public void addJars(List<String> dirs) {
    List<URL> urlList = new ArrayList<>();
    for (String dir : dirs) {
      try {
        urlList.add(Paths.get(dir).toUri().toURL());
      } catch (MalformedURLException e) {
        Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, null, e);
      }
    }
    myloader = new URLClassLoader(urlList.toArray(new URL[urlList.size()]), null);
  }
  
  public void addDynamicDir(String o) {
    outDir = o + File.separator;
  }
  
  private Class<?> getClass(String cname, byte[] bytes, boolean resolveIt) {
    Class<?> result = defineClass( cname, bytes, 0, bytes.length );

    if (result == null) {
      return null;
    }

    /*
     * Preserve package name.
     */
    if (result.getPackage() == null) {
      int lastDotIndex = cname.lastIndexOf( '.' );
      String packageName = (lastDotIndex >= 0) ? cname.substring( 0, lastDotIndex) : "";
      if(!packageName.isEmpty())
        definePackage( packageName, null, null, null, null, null, null, null );
    }

    if (resolveIt)
      resolveClass( result );
    return result;
  }
  
  public Class<?>  loadClass(String name)  throws ClassNotFoundException {
    //System.out.println("load class "+name);
    if(!name.startsWith("java")) {
      String cname = formatClassName(name);
      String fname = outDir + cname;     
      File f = new File(fname);
      if (f.exists() && f.isFile()) {
        FileInputStream fis;
        try {
          //System.out.println("found on dynloader");
          fis = new FileInputStream(f);
          byte[] bytes = ByteStreams.toByteArray(fis);
          Class<?> result = getClass(name, bytes, true);
          
          if (result != null) {
            return result;
          }
        } catch (Exception e) {
          e.printStackTrace();
        }          
      }
      
      if (myloader != null) {
        Class<?> result = classes.get( name );
        if (result != null) {
          //System.out.println("found on myloader cache");
          return result;
        }
  
        InputStream is = myloader.getResourceAsStream(cname);
        if (is != null) {
          //System.out.println("found on myloader");
          try {
            byte[] bytes = ByteStreams.toByteArray(is);
            result = getClass(name, bytes, true);
            
            if (result != null) {
              classes.put( name, result );
              return result;
            }
          } catch (Exception e) {
            e.printStackTrace();
          }          
        }
      }
    }
    //System.out.println("goto parent");
    return getParent().loadClass(name);
  }

  public URL getResource(String name) {
    //System.out.println("get resource "+name);
    if (myloader != null) {
      URL c = myloader.getResource(name);
      if (c!=null)
        return c;
    }
    return getParent().getResource(name);
  }
  
  public InputStream getResourceAsStream(String name) {
    //System.out.println("gras "+name);
    if (myloader != null) {
      InputStream c = myloader.getResourceAsStream(name);
      if (c!=null)
        return c;
    }
    return getParent().getResourceAsStream(name);
  }
    

  public Enumeration<URL> getResources(String name) throws IOException
  {
    //System.out.println("get resources "+name);
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

  
  protected String formatClassName(String className) {
    className = className.replace( '/', '~' );
    // '/' is used to map the package to the path
    className = className.replace( '.', '/' ) + ".class";
    className = className.replace( '~', '/' );
    return className;
  }  
}
