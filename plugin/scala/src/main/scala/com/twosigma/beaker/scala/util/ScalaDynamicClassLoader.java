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

package com.twosigma.beaker.scala.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import com.twosigma.beaker.jvm.classloader.DynamicClassLoader;
import com.twosigma.beaker.jvm.classloader.ProxyClassLoader;

public class ScalaDynamicClassLoader extends DynamicClassLoader {
  protected final ScalaLoaderProxy glp = new ScalaLoaderProxy();
  protected final List<String> paths = new ArrayList<String>();
  private final static Logger logger = Logger.getLogger(ScalaDynamicClassLoader.class.getName());

  public ScalaDynamicClassLoader(String dir) {
    super(dir);
    glp.setOrder(70);
    parent.addLoader(glp);
  }

  public void add(Object s) {
    if (logger.isLoggable(Level.FINEST))
      logger.finest("adding "+s);
    parent.add(s);
    if(s instanceof String) {
      String ss = (String)s;
      File fs = new File(ss);
      if(fs.exists() && fs.isDirectory()) {
        paths.add(ss);
      }
    }
    else if(s instanceof URL && ((URL)s).toString().startsWith("file:")) {
      String ss = ((URL)s).toString().substring(5);
      File fs = new File(ss);
      if(fs.exists() && fs.isDirectory()) {
        paths.add(ss);
      }        
    }
  }

  @SuppressWarnings("rawtypes")
  public void addAll(List sources) {
    parent.addAll(sources);
    for(Object o : sources) {
      if (logger.isLoggable(Level.FINEST))
        logger.finest("adding "+o);
      if(o instanceof String) {
        String ss = (String)o;
        File fs = new File(ss);
        if(fs.exists() && fs.isDirectory()) {
          paths.add(ss);
        }        
      }
      else if(o instanceof URL && ((URL)o).toString().startsWith("file:")) {
        String ss = ((URL)o).toString().substring(5);
        File fs = new File(ss);
        if(fs.exists() && fs.isDirectory()) {
          paths.add(ss);
        }        
      }
    }
  }

  class ScalaLoaderProxy extends ProxyClassLoader {

    public ScalaLoaderProxy() {
      order = 10;
      enabled = true;
    }
    @Override
    public Class<?> loadClass(String className, boolean resolveIt) {
      Class<?> result = null;

      logger.finest(className);

      result = classes.get( className );
      if (result != null) {
        logger.finest("... was cached");
        return result;
      }

      for(String p : paths) {     
        String tpath = p + File.separator + className.replace(".", File.separator) + ".scala";

        File f = new File(tpath);
        if(f.exists()) {
          logger.finest("ERROR: is a scala file");
          try {
            setEnabled(false);
            logger.severe("ERROR: NOT IMPLEMENTED: Should load scala file "+tpath);
            setEnabled(true);
            return null;
          } catch(Exception e) { e.printStackTrace(); }
          setEnabled(true);          
        }
      }
      return null;
    }

    @Override
    public InputStream loadResource(String name) {
      for(String p : paths) {
        String tpath = p + File.separator + name.replace(".", File.separator) + ".scala";

        File f = new File(tpath);
        if(f.exists()) {
          try {
            return new FileInputStream(f);
          } catch(Exception e) { }
        }
      }
      return null;
    }

    @Override
    public URL findResource(String name) {
      return null;
    }
  }

}
