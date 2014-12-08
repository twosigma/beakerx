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

import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;

import com.twosigma.beaker.NamespaceClient;
import com.twosigma.beaker.javash.autocomplete.JavaAutocomplete;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.jvm.threads.BeakerCellExecutor;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;

import org.abstractmeta.toolbox.compilation.compiler.JavaSourceCompiler;
import org.abstractmeta.toolbox.compilation.compiler.impl.JavaSourceCompilerImpl;

import java.lang.reflect.*;
import java.nio.file.*;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.Semaphore;
import java.util.regex.*;
import java.io.File;

import com.twosigma.beaker.jvm.classloader.DynamicClassLoader;
import com.twosigma.beaker.autocomplete.ClasspathScanner;

public class JavaEvaluator {
  protected final String shellId;
  protected final String sessionId;
  protected final String packageId;
  protected List<String> classPath;
  protected List<String> imports;
  protected String outDir;
  protected ClasspathScanner cps;
  protected JavaAutocomplete jac;
  protected boolean exit;
  protected boolean updateLoader;
  protected workerThread myWorker;
  protected final BeakerCellExecutor executor;
  
  protected class jobDescriptor {
    String codeToBeExecuted;
    SimpleEvaluationObject outputObject;
    
    jobDescriptor(String c , SimpleEvaluationObject o) {
      codeToBeExecuted = c;
      outputObject = o;
    }
  }
  
  protected final Semaphore syncObject = new Semaphore(0, true);
  protected final ConcurrentLinkedQueue<jobDescriptor> jobQueue = new ConcurrentLinkedQueue<jobDescriptor>();

  public JavaEvaluator(String id, String sId) {
    shellId = id;
    sessionId = sId;
    packageId = "com.twosigma.beaker.javash.bkr"+shellId.split("-")[0];
    cps = new ClasspathScanner();
    jac = new JavaAutocomplete(cps);
    classPath = new ArrayList<String>();
    imports = new ArrayList<String>();
    exit = false;
    updateLoader = false;
    executor = new BeakerCellExecutor("javash");
    startWorker();
  }

  protected void startWorker() {
    myWorker = new workerThread();
    myWorker.start();
  }

  public String getShellId() { return shellId; }

  public void killAllThreads() {
    executor.killAllThreads();
  }

  public void cancelExecution() {
    executor.cancelExecution();
  }

  public void resetEnvironment() {
    executor.killAllThreads();
    
    // signal thread to create loader
    updateLoader = true;
    syncObject.release();
  }
    
  public void exit() {
    exit = true;
    cancelExecution();
    syncObject.release();
  }

  public void setShellOptions(String cp, String in, String od) throws IOException {
    if (cp.isEmpty())
      classPath.clear();
    else
      classPath = Arrays.asList(cp.split("[\\s"+File.pathSeparatorChar+"]+"));
    if (in.isEmpty())
      imports.clear();
    else
      imports = Arrays.asList(in.split("\\s+"));

    outDir = od;
    if (outDir!=null && !outDir.isEmpty()) {
	outDir = outDir.replace("$BEAKERDIR",System.getenv("beaker_tmp_dir"));
      try { (new File(outDir)).mkdirs(); } catch (Exception e) { }
    } else {
      outDir = Files.createTempDirectory(FileSystems.getDefault().getPath(System.getenv("beaker_tmp_dir")),"javash"+shellId).toString();
    }

    String cpp = "";
    for(String pt : classPath) {
      cpp += pt;
      cpp += File.pathSeparator;
    }
    cpp += File.pathSeparator;
    cpp += System.getProperty("java.class.path");
    cps = new ClasspathScanner(cpp);
    jac = new JavaAutocomplete(cps);

    for(String st : imports)
      jac.addImport(st);
    
    // signal thread to create loader
    updateLoader = true;
    syncObject.release();
  }

  public void evaluate(SimpleEvaluationObject seo, String code) {
    // send job to thread
    jobQueue.add(new jobDescriptor(code,seo));
    syncObject.release();
  }

  public List<String> autocomplete(String code, int caretPosition) {
    List<String> ret = jac.doAutocomplete(code, caretPosition);
    
    if (!ret.isEmpty())
      return ret;
    
    // this is a code sniplet... 
    String [] codev = code.split("\n");
    int insert = 0;
    while(insert < codev.length) {
      if (!codev[insert].contains("package") && !codev[insert].contains("import") && !codev[insert].trim().isEmpty())
        break;
      insert++;
    }
     
    final String CODE_TO_INSERT = "public class Foo { public static void beakerRun() { \n";
      
    StringBuilder sb = new StringBuilder();
    for ( int i=0; i<insert; i++) {
      sb.append(codev[i]);
      sb.append('\n');
    }
      
    if (caretPosition>=sb.length()) {
      caretPosition += CODE_TO_INSERT.length();
    }
    sb.append(CODE_TO_INSERT);
    for ( int i=insert; i<codev.length; i++) {
      sb.append(codev[i]);
      sb.append('\n');
    }
  
    return jac.doAutocomplete(sb.toString(), caretPosition);    
  }

  protected class workerThread extends Thread {
  
    public workerThread() {
      super("javash worker");
    }
    
    /*
     * This thread performs all the evaluation
     */
    
    public void run() {
      DynamicClassLoader loader = null;;
      jobDescriptor j = null;
      JavaSourceCompiler javaSourceCompiler;
  
      javaSourceCompiler = new JavaSourceCompilerImpl();
      NamespaceClient nc =null;
      
      while(!exit) {
        try {
          // wait for work
          syncObject.acquire();
          
          // check if we must create or update class loader
          if (loader==null || updateLoader) {
            loader=new DynamicClassLoader(outDir);
            for(String pt : classPath) {
              loader.add(pt);
            }
          }
          
          // get next job descriptor
          j = jobQueue.poll();
          if (j==null)
            continue;
  
          j.outputObject.started();
          
          nc = NamespaceClient.getBeaker(sessionId);
          nc.setOutputObj(j.outputObject);

          Pattern p;
          Matcher m;
          String pname = packageId;
          
          JavaSourceCompiler.CompilationUnit compilationUnit = javaSourceCompiler.createCompilationUnit(new File(outDir));
        
          // build the compiler class path
          String classpath = System.getProperty("java.class.path");
          String[] classpathEntries = classpath.split(File.pathSeparator);
          if (classpathEntries!=null && classpathEntries.length>0)
            compilationUnit.addClassPathEntries(Arrays.asList(classpathEntries));
          if (!classPath.isEmpty())
            compilationUnit.addClassPathEntries(classPath);
          compilationUnit.addClassPathEntry(outDir);
        
          // normalize and analyze code
          String code = normalizeCode(j.codeToBeExecuted);
        
          String [] codev = code.split("\n");
          int ci = 0;
        
          StringBuilder javaSourceCode =  new StringBuilder();
          p = Pattern.compile("\\s*package\\s+((?:[a-zA-Z]\\w*)(?:\\.[a-zA-Z]\\w*)*);.*");
          m = p.matcher(codev[ci]);
        
          if (m.matches()) {
            pname = m.group(1);
            ci++;
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
        
            javaSourceCode.append("import ");
            javaSourceCode.append(impstr);
            javaSourceCode.append(";\n");
          }
        
          p = Pattern.compile("(?:^|.*\\s+)class\\s+([a-zA-Z]\\w*).*");
          m = p.matcher(codev[ci]);
          if (m.matches()) {
            // this is a class definition
        
            String cname = m.group(1);
        
            for(; ci<codev.length; ci++)
              javaSourceCode.append(codev[ci]);    
        
            compilationUnit.addJavaSource(pname+"."+cname, javaSourceCode.toString());
            try {
              javaSourceCompiler.compile(compilationUnit);
              javaSourceCompiler.persistCompiledClasses(compilationUnit);
              j.outputObject.finished(pname+"."+cname);
            } catch(Exception e) { j.outputObject.error("ERROR:\n"+e.toString()); }    
          } else {
            String ret = "void";
            if (codev[codev.length-1].matches("(^|.*\\s+)return\\s+.*"))
              ret = "Object";
            // this is an expression evaluation
            javaSourceCode.append("public class Foo {\n");
            javaSourceCode.append("public static ");
            javaSourceCode.append(ret);
            javaSourceCode.append(" beakerRun() throws InterruptedException {\n");
            for(; ci<codev.length; ci++)
              javaSourceCode.append(codev[ci]);
            javaSourceCode.append("}\n");
            javaSourceCode.append("}\n");
        
            compilationUnit.addJavaSource(pname+".Foo", javaSourceCode.toString());
  
            loader.clearCache();
            try {
              javaSourceCompiler.compile(compilationUnit);
              
              javaSourceCompiler.persistCompiledClasses(compilationUnit);
              Class<?> fooClass = loader.loadClass(pname+".Foo");
              Method mth = fooClass.getDeclaredMethod("beakerRun", (Class[]) null);
              
              if (!executor.executeTask(new MyRunnable(mth, j.outputObject, ret.equals("Object")))) {
                j.outputObject.error("... cancelled!");
              }
              if(nc!=null) {
                nc.setOutputObj(null);
                nc = null;
              }
            } catch(Exception e) { j.outputObject.error("ERROR: "+e.toString()); }    
          }
          j = null;
        } catch(Throwable e) {
          e.printStackTrace();
        } finally {
          if (nc!=null) {
            nc.setOutputObj(null);
            nc = null;
          }
        }
      }
      
    }
    
    protected class MyRunnable implements Runnable {

      protected final SimpleEvaluationObject theOutput;
      protected final Method theMth;
      protected final boolean retObject;

      public MyRunnable(Method mth, SimpleEvaluationObject out, boolean ro) {
        theMth = mth;
        theOutput = out;
        retObject = ro;
      }
      
      @Override
      public void run() {
        try {
          
          Object o = theMth.invoke(null, (Object[])null);
          if (retObject) {
            theOutput.finished(o);
          } else {
            theOutput.finished(null);
          }          
        } catch(Throwable e) {
          if (e instanceof InvocationTargetException)
            e = ((InvocationTargetException)e).getTargetException();
          if ((e instanceof InterruptedException) || (e instanceof ThreadDeath)) {
            theOutput.error("... cancelled!");
          } else {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            theOutput.error(sw.toString());
          }
        }
      }

    };

    
    /*
     * This function does:
     * 1) remove comments
     * 2) ensure we have a cr after each ';' (if not inside double quotes or single quotes)
     * 3) remove empty lines
     */
  
    protected String normalizeCode(String code)
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
          if (!insq && i>0 && c1.charAt(i-1)!='\\')
            indq = !indq;
          break;
        case '\'':
          if (!indq && i>0 && c1.charAt(i-1)!='\\')
            insq = !insq;
          break;
        case ';':
          if (!indq && !insq) {
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
}
