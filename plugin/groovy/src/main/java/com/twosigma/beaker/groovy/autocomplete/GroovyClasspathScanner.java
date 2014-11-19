package com.twosigma.beaker.groovy.autocomplete;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import com.twosigma.beaker.autocomplete.ClasspathScanner;

public class GroovyClasspathScanner extends ClasspathScanner {
  protected Map<String,String> fileForClass;
  
  public GroovyClasspathScanner() {
    super();
    if(fileForClass==null)
      fileForClass = new HashMap<String,String>();
  }

  public GroovyClasspathScanner(String cpp) {
    super(cpp);
    if(fileForClass==null)
      fileForClass = new HashMap<String,String>();
  }

  protected void examineFile(File root, File file) {
    if (file.getName().toLowerCase().endsWith(".groovy")) {
      String cname = createGroovyClassName(root, file);
      String ocname = cname;
      int pIndex = cname.lastIndexOf('.');
      if(pIndex > 0) {
        String pname = cname.substring(0, pIndex+1);
        cname = cname.substring(pIndex);
        if(!packages.containsKey(pname))
          packages.put(pname, new ArrayList<String>());
        packages.get(pname).add(cname);
        
        if(fileForClass==null)
          fileForClass = new HashMap<String,String>();

        fileForClass.put(ocname, file.getAbsolutePath());
      }
    }
  }

  private String createGroovyClassName(File root, File file) {
    StringBuffer sb = new StringBuffer();
    String fileName = file.getName();
    sb.append(fileName.substring(0, fileName.lastIndexOf(".groovy")));
    file = file.getParentFile();
    while (file != null && !file.equals(root)) {
      sb.insert(0, '.').insert(0, file.getName());
      file = file.getParentFile();
    }
    return sb.toString();
  }

  public String getFileForClass(String name) {
    return fileForClass.get(name);
  }

  
}
