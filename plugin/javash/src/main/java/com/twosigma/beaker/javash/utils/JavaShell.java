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
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import org.abstractmeta.toolbox.compilation.compiler.JavaSourceCompiler;
import org.abstractmeta.toolbox.compilation.compiler.impl.JavaSourceCompilerImpl;
import java.lang.reflect.*;

public class JavaShell {
  private String shellId;
  private String classPath;
  private String imports;
  private String outDir;

  public JavaShell(String id) {
    shellId = id;
  }

  public String getShellId() { return shellId; }

  public void killAllThreads() { }
  public void cancelExecution() { }
  public void exit() { }

  public void setShellOptions(String cp, String in, String od) {
    classPath = cp;
    imports = in;
    outDir = od;
    // DIPO HERE update?
    System.err.println("   classp "+classPath);
    System.err.println("   imports "+imports); 
    System.err.println("   outdir "+outDir); 
  }

  public void evaluate(SimpleEvaluationObject seo, String code) {
    JavaSourceCompiler javaSourceCompiler = new JavaSourceCompilerImpl();
    JavaSourceCompiler.CompilationUnit compilationUnit = javaSourceCompiler.createCompilationUnit();
    String shellId = "ABC";
    String javaSourceCode =  "package com.twosigma.beaker.javash."+shellId+";\n" +
      "public class Foo {\n" +
      "        public static Object beakerRun() {\n" + code +
      "        }\n" +
      "    }";
    System.err.println("code: "+javaSourceCode);
    compilationUnit.addJavaSource("com.twosigma.beaker.javash."+shellId+".Foo", javaSourceCode);
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
