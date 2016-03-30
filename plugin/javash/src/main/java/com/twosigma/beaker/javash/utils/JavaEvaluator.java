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

import com.twosigma.beaker.NamespaceClient;
import com.twosigma.beaker.autocomplete.ClasspathScanner;
import com.twosigma.beaker.javash.autocomplete.JavaAutocomplete;
import com.twosigma.beaker.jvm.classloader.DynamicClassLoaderSimple;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.jvm.threads.BeakerCellExecutor;
import com.twosigma.beaker.jvm.threads.BeakerStdOutErrHandler;
import com.twosigma.beaker.jvm.utils.BeakerPrefsUtils;
import org.apache.commons.lang3.StringUtils;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.nio.file.FileSystems;
import java.util.*;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.Semaphore;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class JavaEvaluator {
  private static final String WRAPPER_CLASS_NAME = "BeakerWrapperClass1261714175";
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
  protected String currentClassPath;
  protected String currentImports;
  
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
    jac = createJavaAutocomplete(cps);
    classPath = new ArrayList<String>();
    imports = new ArrayList<String>();
    exit = false;
    updateLoader = false;
    currentClassPath = "";
    currentImports = "";
    outDir = FileSystems.getDefault().getPath(System.getenv("beaker_tmp_dir"),"dynclasses",sessionId).toString();
    try { (new File(outDir)).mkdirs(); } catch (Exception e) { }
    executor = new BeakerCellExecutor("javash");
    startWorker();
  }

  protected void startWorker() {
    myWorker = new workerThread();
    myWorker.start();
  }

  protected JavaAutocomplete createJavaAutocomplete(ClasspathScanner c)
  {
    return new JavaAutocomplete(c);
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
   
    String cpp = "";
    for(String pt : classPath) {
      cpp += pt;
      cpp += File.pathSeparator;
    }
    cpp += File.pathSeparator;
    cpp += outDir;
    cpp += File.pathSeparator;
    cpp += System.getProperty("java.class.path");
    
    cps = new ClasspathScanner(cpp);
    jac = createJavaAutocomplete(cps);
    
    for(String st : imports)
      jac.addImport(st);
    
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
    if (od==null || od.isEmpty()) {
      od = FileSystems.getDefault().getPath(System.getenv("beaker_tmp_dir"),"dynclasses",sessionId).toString();
    } else {
      od = od.replace("$BEAKERDIR",System.getenv("beaker_tmp_dir"));
    }
    
    // check if we are not changing anything
    if (currentClassPath.equals(cp) && currentImports.equals(in) && outDir.equals(od))
      return;

    currentClassPath = cp;
    currentImports = in;
    outDir = od;

    if (cp.isEmpty())
      classPath = new ArrayList<String>();
    else
      classPath = Arrays.asList(cp.split("[\\s"+File.pathSeparatorChar+"]+"));
    if (in.isEmpty())
      imports = new ArrayList<String>();
    else
      imports = Arrays.asList(in.split("\\s+"));

    try { (new File(outDir)).mkdirs(); } catch (Exception e) { }

    resetEnvironment();
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
     
    final String CODE_TO_INSERT = "public class " + WRAPPER_CLASS_NAME + " { public static void beakerRun() { \n";
      
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
      DynamicClassLoaderSimple loader = null;
      jobDescriptor j = null;
      org.abstractmeta.toolbox.compilation.compiler.JavaSourceCompiler javaSourceCompiler;
  
      javaSourceCompiler = new JavaSourceCompiler();
      NamespaceClient nc =null;
      
      while(!exit) {
        try {
          // wait for work
          syncObject.acquire();
          
          // check if we must create or update class loader
          if (loader==null || updateLoader) {
            loader=new DynamicClassLoaderSimple(ClassLoader.getSystemClassLoader());
            loader.addJars(classPath);
            loader.addDynamicDir(outDir);
          }
          
          // get next job descriptor
          j = jobQueue.poll();
          if (j==null)
            continue;
  
          nc = NamespaceClient.getBeaker(sessionId);
          nc.setOutputObj(j.outputObject);

          Boolean useOutputPanel = BeakerPrefsUtils.isUseOutputPanel(nc);
          if (useOutputPanel) {
            j.outputObject.clrOutputHandler();
            BeakerStdOutErrHandler.fini();
          } else {
            BeakerStdOutErrHandler.init();
          }
          j.outputObject.started();

          Pattern p;
          Matcher m;
          String pname = packageId;
          
          org.abstractmeta.toolbox.compilation.compiler.JavaSourceCompiler.CompilationUnit compilationUnit = javaSourceCompiler.createCompilationUnit(new File(outDir));
        
          // build the compiler class path
          String classpath = System.getProperty("java.class.path");
          String[] classpathEntries = classpath.split(File.pathSeparator);
          if (classpathEntries!=null && classpathEntries.length>0)
            compilationUnit.addClassPathEntries(Arrays.asList(classpathEntries));
          if (!classPath.isEmpty())
            compilationUnit.addClassPathEntries(classPath);
          compilationUnit.addClassPathEntry(outDir);
        
          // normalize and analyze code
          String code = ParserUtil.normalizeCode(j.codeToBeExecuted);
        
          String [] codev = code.split("\n");
          int ci = 0;

          ci = skipBlankLines(codev, ci);

          Map<Integer, Integer> lineNumbersMapping = new HashMap<>();
          LineBrakingStringBuilderWrapper javaSourceCode =  new LineBrakingStringBuilderWrapper();
          p = Pattern.compile("\\s*package\\s+((?:[a-zA-Z]\\w*)(?:\\.[a-zA-Z]\\w*)*);.*");
          m = p.matcher(codev[ci]);
        
          if (m.matches()) {
            pname = m.group(1);
            lineNumbersMapping.put(1, ci);
            ci = skipBlankLines(codev, ci + 1);
          }
          javaSourceCode.append("package ");
          javaSourceCode.append(pname);
          javaSourceCode.append(";\n");
        
          for(String i : imports) {
            javaSourceCode.append("import ");
            javaSourceCode.append(i);
            javaSourceCode.append(";\n");
          }
        
          p = Pattern.compile("\\s*import(\\s+static)?\\s+((?:[a-zA-Z]\\w*)(?:\\.[a-zA-Z]\\w*)*(?:\\.\\*)?);.*");
          m = p.matcher(codev[ci]);
          while(m.matches()) {
            String impstr = m.group(2);
            String staticModifier = m.group(1);
            javaSourceCode.append("import ");
            if (staticModifier != null) {
              javaSourceCode.append("static ");
            }
            javaSourceCode.append(impstr);
            javaSourceCode.append(";\n");
            lineNumbersMapping.put(javaSourceCode.getLinesCount(), ci);

            ci = skipBlankLines(codev, ci + 1);
            m = p.matcher(codev[ci]);
          }
        
          p = Pattern.compile("(?:^|.*\\s+)class\\s+([a-zA-Z]\\w*).*");
          m = p.matcher(codev[ci]);
          if (m.matches()) {
            // this is a class definition
        
            String cname = m.group(1);

            addTheRestOfCode(codev, ci, javaSourceCode, lineNumbersMapping);

            compilationUnit.addJavaSource(pname+"."+cname, javaSourceCode.toString());
            try {
              javaSourceCompiler.compile(compilationUnit);
              javaSourceCompiler.persistCompiledClasses(compilationUnit);
              j.outputObject.finished(pname+"."+cname);
            } catch (CompilationException e) {
              j.outputObject.error(buildErrorMessage(e, lineNumbersMapping));
            } catch(Exception e) { j.outputObject.error("ERROR: "+e.toString()); }
          } else {
            String ret = "void";
            if (codev[codev.length-1].matches("(^|.*\\s+)return\\s+.*"))
              ret = "Object";
            // this is an expression evaluation
            javaSourceCode.append("public class " + WRAPPER_CLASS_NAME + " {\n");
            javaSourceCode.append("public static ");
            javaSourceCode.append(ret);
            javaSourceCode.append(" beakerRun() throws Exception {\n");
            addTheRestOfCode(codev, ci, javaSourceCode, lineNumbersMapping);
            javaSourceCode.append("}\n");
            javaSourceCode.append("}\n");
        
            compilationUnit.addJavaSource(pname+ "." + WRAPPER_CLASS_NAME, javaSourceCode.toString());

            try {
              javaSourceCompiler.compile(compilationUnit);
              
              javaSourceCompiler.persistCompiledClasses(compilationUnit);
              Class<?> fooClass = loader.loadClass(pname+ "." + WRAPPER_CLASS_NAME);
              Method mth = fooClass.getDeclaredMethod("beakerRun", (Class[]) null);
              
              if (!executor.executeTask(new MyRunnable(mth, j.outputObject, ret.equals("Object"), loader))) {
                j.outputObject.error("... cancelled!");
              }
              if(nc!=null) {
                nc.setOutputObj(null);
                nc = null;
              }
            } catch (CompilationException e) {
              j.outputObject.error(buildErrorMessage(e, lineNumbersMapping));
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
      NamespaceClient.delBeaker(sessionId);
    }

    private int skipBlankLines(String[] lines, int ci) {
      while (ci < lines.length - 1 && StringUtils.isBlank(lines[ci])) {
        ci++;
      }
      return ci;
    }

    private String buildErrorMessage(CompilationException exception, Map<Integer, Integer> lineNumbersMapping) {
      final StringBuilder stringBuilder = new StringBuilder();
      stringBuilder.append("ERROR: ").append(exception.getMessage()).append('\n');
      for (CompilationException.CompilationError compilationError : exception.getCompilationErrors()) {
        stringBuilder
            .append("error at line ")
            .append(mapLineNumber(lineNumbersMapping, compilationError.getLineNumber())).append(": ")
            .append(prepareForFrontend(compilationError.getErrorMessage())).append('\n')
            .append(compilationError.getCode());
      }
      return stringBuilder.toString();
    }

    private String prepareForFrontend(String errorMessage) {
      return errorMessage.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
    }

    private Integer mapLineNumber(Map<Integer, Integer> lineNumbersMapping, int ourNumber) {
      final Integer usersNumber = lineNumbersMapping.get(ourNumber);
      return usersNumber == null ? ourNumber : usersNumber + 1;
    }

    private void addTheRestOfCode(String[] codev, int ci, LineBrakingStringBuilderWrapper javaSourceCode, Map<Integer, Integer> lineNumbersMapping) {
      for (; ci < codev.length; ci++) {
        javaSourceCode.append(codev[ci]);
        javaSourceCode.append("\n");
        lineNumbersMapping.put(javaSourceCode.getLinesCount(), ci);
      }
    }

    protected class MyRunnable implements Runnable {

      protected final SimpleEvaluationObject theOutput;
      protected final Method theMth;
      protected final boolean retObject;
      protected final ClassLoader loader;

      public MyRunnable(Method mth, SimpleEvaluationObject out, boolean ro, ClassLoader ld) {
        theMth = mth;
        theOutput = out;
        retObject = ro;
        loader = ld;
      }
      
      @Override
      public void run() {
        ClassLoader oldld = Thread.currentThread().getContextClassLoader();
        Thread.currentThread().setContextClassLoader(loader);
        theOutput.setOutputHandler();
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
        theOutput.clrOutputHandler();
        Thread.currentThread().setContextClassLoader(oldld);
      }

    };
  }

  private static class LineBrakingStringBuilderWrapper {
    private static final String LINE_BREAK = "\n";
    private StringBuilder delegate;
    private int linesCount;

    public LineBrakingStringBuilderWrapper() {
      this.delegate = new StringBuilder();
      this.linesCount = 0;
    }

    public void append(String string) {
      this.delegate.append(string);
      this.linesCount += StringUtils.countMatches(string, LINE_BREAK);
    }

    public int getLinesCount() {
      return linesCount;
    }

    @Override
    public String toString() {
      return delegate.toString();
    }
  }
}
