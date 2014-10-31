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
package com.twosigma.beaker.javash.utils;
import java.util.List;
import java.util.Arrays;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import java.io.IOException;
import org.abstractmeta.toolbox.compilation.compiler.JavaSourceCompiler;
import org.abstractmeta.toolbox.compilation.compiler.impl.JavaSourceCompilerImpl;
import java.lang.reflect.*;
import java.nio.file.*;
import java.util.regex.*;
import java.io.File;
import com.twosigma.beaker.jvm.classloader.DynamicClassLoader;

public class JavaShell {
  private final String shellId;
  private final String packageId;
  private List<String> classPath;
  private List<String> imports;
  private String outDir;
  private final JavaSourceCompiler javaSourceCompiler;
  private DynamicClassLoader loader;
    
  public JavaShell(String id) {
    shellId = id;
    javaSourceCompiler = new JavaSourceCompilerImpl();
    packageId = "com.twosigma.beaker.javash.bkr"+shellId.split("-")[0];
  }

  public String getShellId() { return shellId; }

  public void killAllThreads() { }
  public void cancelExecution() { }
  public void exit() { }

  public void setShellOptions(String cp, String in, String od) throws IOException {
    classPath = Arrays.asList(cp.split("\\s+"));
    imports = Arrays.asList(in.split("\\s+"));
    outDir = od;
    if(outDir==null || outDir.isEmpty()) {
      outDir = Files.createTempDirectory(FileSystems.getDefault().getPath(System.getProperty("java.io.tmpdir")),"javash"+shellId).toString();
    } else {
      try { (new File(outDir)).mkdirs(); } catch (Exception e) { }
    }
    
    System.err.println("   classp "+classPath);
    System.err.println("   imports "+imports); 
    System.err.println("   outdir "+outDir);
    
    loader=new DynamicClassLoader(outDir);
    for(String pt : classPath)
      loader.add(pt);
  }


  public void evaluate(SimpleEvaluationObject seo, String code) {
    Pattern p;
    Matcher m;
    String pname = packageId;
    JavaSourceCompiler.CompilationUnit compilationUnit = javaSourceCompiler.createCompilationUnit(new File(outDir));
    
    // build the compiler class path
    String classpath = System.getProperty("java.class.path");
    String[] classpathEntries = classpath.split(File.pathSeparator);
    if(classpathEntries!=null && classpathEntries.length>0)
        compilationUnit.addClassPathEntries(Arrays.asList(classpathEntries));
    if(!classPath.isEmpty())
      compilationUnit.addClassPathEntries(classPath);
    compilationUnit.addClassPathEntry(outDir);

    // normalize and analyse code
    code = normalizeCode(code);
    
    System.err.println("normalized code is:\n"+code+"\n");

    String [] codev = code.split("\n");
    int ci = 0;
    
    StringBuilder javaSourceCode =  new StringBuilder();
    p = Pattern.compile("\\s*package\\s+((?:[a-zA-Z]\\w*)(?:\\.[a-zA-Z]\\w*)*);.*");
    m = p.matcher(codev[ci]);
 
    if(m.matches()) {
        pname = m.group(1);
        ci++;
        System.err.println("package "+pname);
    }
    javaSourceCode.append("package ");
    javaSourceCode.append(pname);
    javaSourceCode.append(";\n");
    
    for(String i : imports) {
        javaSourceCode.append("import ");
        javaSourceCode.append(i);
        javaSourceCode.append(";\n");
    }
    
    p = Pattern.compile("\\s*import\\s+((?:[a-zA-Z]\\w*)(?:\\.[a-zA-Z]\\w*)*(?:\\.\\*)?);.*");
    m = p.matcher(codev[ci]);
    while(m.matches()) {
        String impstr = m.group(1);
        ci++;
        m = p.matcher(codev[ci]);
        System.err.println("import "+impstr);
        
        javaSourceCode.append("import ");
        javaSourceCode.append(impstr);
        javaSourceCode.append(";\n");
    }
    
    p = Pattern.compile("(?:^|.*\\s+)class\\s+([a-zA-Z]\\w*).*");
    m = p.matcher(codev[ci]);
    if(m.matches()) {
        // this is a class definition
        
        String cname = m.group(1);
        
        for(; ci<codev.length; ci++)
          javaSourceCode.append(codev[ci]);    

        System.err.println("evaluation code: \n"+javaSourceCode.toString()+"\n");
        compilationUnit.addJavaSource(pname+"."+cname, javaSourceCode.toString());
        try {
          javaSourceCompiler.compile(compilationUnit);
          javaSourceCompiler.persistCompiledClasses(compilationUnit);
          seo.finished("...compiled");
        } catch(Exception e) { seo.error("ERROR:\n"+e.toString()); }    
    } else {
        String ret = "void";
        if(codev[codev.length-1].matches("(^|.*\\s+)return\\s+.*"))
            ret = "Object";
        // this is an expression evaluation
        javaSourceCode.append("public class Foo {\n");
        javaSourceCode.append("public static ");
        javaSourceCode.append(ret);
        javaSourceCode.append(" beakerRun() {\n");
        for(; ci<codev.length; ci++)
          javaSourceCode.append(codev[ci]);
        javaSourceCode.append("}\n");
        javaSourceCode.append("}\n");

        System.err.println("evaluation code: \n"+javaSourceCode.toString()+"\n");

        compilationUnit.addJavaSource(pname+".Foo", javaSourceCode.toString());
        try {
          loader.clearCache();
          javaSourceCompiler.compile(compilationUnit);
          javaSourceCompiler.persistCompiledClasses(compilationUnit);
          Class fooClass = loader.loadClass(pname+".Foo");
          Method mth = fooClass.getDeclaredMethod("beakerRun", (Class[]) null);
          Object o = mth.invoke(null, (Object[])null);
          if(ret.equals("Object")) {
              seo.finished(o);
          } else {
              seo.finished("...done");
          }
        } catch(Exception e) { seo.error("ERROR:\n"+e.toString()); }    
    }
    
   }

  public List<String> autocomplete(String code, int caretPosition) {
    // DIPO HERE update?
    return null;
  }


  /*
   * This function does:
   * 1) remove comments
   * 2) ensure we have a cr after each ';' (if not inside double quotes or single quotes)
   * 3) remove empty lines
   */

  private String normalizeCode(String code)
  {
    String c1 = code.replaceAll("\r\n","\n").replaceAll("(?:/\\*(?:[^*]|(?:\\*+[^*/]))*\\*+/)|(?://.*)","");
    StringBuilder c2 = new StringBuilder();
    boolean indq = false;
    boolean insq = false;
    for(int i=0; i<c1.length(); i++)
    {
      char c = c1.charAt(i);
      switch(c) {
          case '"':
              if(!insq && i>0 && c1.charAt(i-1)!='\\')
                  indq = !indq;
              break;
          case '\'':
              if(!indq && i>0 && c1.charAt(i-1)!='\\')
                  insq = !insq;
              break;
          case ';':
              if(!indq && !insq) {
                  c2.append(c);
                  c = '\n';
              }
              break;
      }
      c2.append(c);
    }
    return c2.toString().replaceAll("\n\n+", "\n").trim();
  }
  
}
