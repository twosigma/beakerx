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
import org.abstractmeta.toolbox.compilation.compiler.JavaSourceCompiler;
import org.abstractmeta.toolbox.compilation.compiler.impl.JavaSourceCompilerImpl;
import java.lang.reflect.*;
import java.nio.file.*;
import java.nio.file.FileSystems;

public class JavaShell {
  private String shellId;
  private String packageId;
  private List<String> classPath;
  private List<String> imports;
  private String outDir;
  private JavaSourceCompiler javaSourceCompiler;
  
  public JavaShell(String id) {
    shellId = id;
    javaSourceCompiler = new JavaSourceCompilerImpl();
    packageId = "com.twosigma.beaker.javash."+shellId.split("-")[0];
  }

  public String getShellId() { return shellId; }

  public void killAllThreads() { }
  public void cancelExecution() { }
  public void exit() { }

  public void setShellOptions(String cp, String in, String od) {
    classPath = Arrays.asList(cp.split("\\s+"));
    imports = Arrays.asList(in.split("\\s+"));
    outDir = od;
    if(outDir==null || outDir.isEmpty()) {
      outDir = "/tmp/pippero"; //Files.createTempDirectory(java.nio.file.Filesystems.getDefault().getPath("/tmp"),"javash").toString();
    }
    System.err.println("   classp "+classPath);
    System.err.println("   imports "+imports); 
    System.err.println("   outdir "+outDir); 
  }


  /*
   * 1) check if the code contains package declaration
   *   -> YES -> write package declaration to out code -> remove everything before and including the package declaration
   *   -> NO -> write default package declaration to out code
   * 2) add default imports to out code
   * 3) check if code contains import statements
   *    -> YES -> add imports to out code -> remove everything before and including the last import
   * 5) check if code contains a class declaration
   *   -> NO -> wrap code in default class
   *         -> execute code
   *   -> YES -> compile code
   *
   *
   * "(^|\\n)\\s*package\\s+([a-zA-Z]\\w*)(\\.[a-zA-Z]\\w*)*;"
   *
   */

  
  public void evaluate(SimpleEvaluationObject seo, String code) {
    JavaSourceCompiler.CompilationUnit compilationUnit = javaSourceCompiler.createCompilationUnit();

    compilationUnit.addClassPathEntries(classPath);

    
    
    
    String javaSourceCode =  "package "+packageId+";\n" +
      "public class Foo {\n" +
      "        public static Object beakerRun() {\n" + code +
      "        }\n" +
      "    }";
    System.err.println("code: "+javaSourceCode);
    
    compilationUnit.addJavaSource(packageId+".Foo", javaSourceCode);
    try {
      ClassLoader classLoader = javaSourceCompiler.compile(compilationUnit);
      Class fooClass = classLoader.loadClass("com.twosigma.beaker.javash."+shellId+".Foo");
      Method m = fooClass.getDeclaredMethod("beakerRun", (Class[]) null);
      System.err.println("Got method: " + m);
      Object o = m.invoke(null, (Object[])null);
      seo.finished(o);
    } catch(Exception e) { seo.error("ERROR:\n"+e.toString()); return; }    
  }

  public List<String> autocomplete(String code, int caretPosition) {
    // DIPO HERE update?
    return null;
  }
  
}
