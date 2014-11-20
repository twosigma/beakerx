package com.twosigma.beaker.groovy.utils;

import groovy.lang.GroovyClassLoader;
import groovy.lang.GroovyResourceLoader;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.xeustechnologies.jcl.ProxyClassLoader;

import com.twosigma.beaker.jvm.classloader.DynamicClassLoader;

public class GroovyDynamicClassLoader extends DynamicClassLoader {
  protected final GroovyLoaderProxy glp = new GroovyLoaderProxy();
  protected final List<String> paths = new ArrayList<String>();
  private GroovyClassLoader gloader;
  
  public GroovyDynamicClassLoader(String dir) {
    super(dir);
    glp.setOrder(70);
    parent.addLoader(glp);
  }

  public void add(Object s) {
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

  class GroovyLoaderProxy extends ProxyClassLoader {

    public GroovyLoaderProxy() {
        order = 10;
        enabled = true;
    }
    @Override
    public Class<?> loadClass(String className, boolean resolveIt) {
      Class<?> result = null;
      
      result = classes.get( className );
      if (result != null) {
          return result;
      }

      for(String p : paths) {     
        String tpath = p + File.separator + className.replace(".", File.separator) + ".groovy";

        File f = new File(tpath);
        if(f.exists()) {

          try {
            setEnabled(false);
            if(gloader==null) {
              gloader = new GroovyClassLoader(getLoader());
              gloader.setResourceLoader(new GroovyResourceLoader() {
                public URL loadGroovySource(final String fname) throws MalformedURLException {
                  for(String p : paths) {
                    String tpath = p + File.separator + className.replace(".", File.separator) + ".groovy";

                    File f = new File(tpath);
                    if(f.exists()) {
                      return new URL("file://" + tpath);
                    }
                  }
                  return null;
                }
              });
            }
            Class<?> groovyClass = gloader.parseClass(new File(tpath));
            setEnabled(true);
            return groovyClass;
          } catch(Exception e) { e.printStackTrace(); }
          setEnabled(true);          
        }
      }
      return null;
    }
    
    @Override
    public InputStream loadResource(String name) {
      for(String p : paths) {
        String tpath = p + File.separator + name.replace(".", File.separator) + ".groovy";

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
