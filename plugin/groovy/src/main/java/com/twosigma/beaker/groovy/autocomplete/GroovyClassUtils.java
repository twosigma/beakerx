package com.twosigma.beaker.groovy.autocomplete;

import java.io.File;
import groovy.lang.GroovyClassLoader;

import com.twosigma.beaker.autocomplete.ClassUtils;

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
