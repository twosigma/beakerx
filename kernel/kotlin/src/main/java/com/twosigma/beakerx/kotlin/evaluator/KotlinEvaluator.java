/*
 *  Copyright 2014-2017 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.kotlin.evaluator;

import com.twosigma.beakerx.NamespaceClient;
import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.autocomplete.ClasspathScanner;
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.evaluator.Evaluator;
import com.twosigma.beakerx.evaluator.InternalVariable;
import com.twosigma.beakerx.jvm.classloader.DynamicClassLoaderSimple;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.jvm.threads.BeakerCellExecutor;
import com.twosigma.beakerx.jvm.threads.CellExecutor;
import com.twosigma.beakerx.kernel.Classpath;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.Imports;
import com.twosigma.beakerx.kernel.Kernel;
import com.twosigma.beakerx.kernel.KernelParameters;
import com.twosigma.beakerx.kernel.PathToJar;
import org.apache.commons.lang3.StringUtils;

import org.jetbrains.kotlin.cli.common.ExitCode;
import org.jetbrains.kotlin.cli.common.arguments.K2JVMCompilerArguments;
import org.jetbrains.kotlin.cli.common.messages.MessageCollector;
import org.jetbrains.kotlin.cli.common.messages.MessageRenderer;
import org.jetbrains.kotlin.cli.common.messages.PrintingMessageCollector;
import org.jetbrains.kotlin.cli.jvm.K2JVMCompiler;
import org.jetbrains.kotlin.config.Services;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.Semaphore;

import static com.twosigma.beakerx.DefaultJVMVariables.CLASSPATH;
import static com.twosigma.beakerx.DefaultJVMVariables.IMPORTS;

public class KotlinEvaluator extends BaseEvaluator {
  
  private static final String WRAPPER_CLASS_NAME = "BeakerWrapperClass1261714175";
  
  protected final String shellId;
  protected final String sessionId;
  protected final String packageId;
  protected Classpath classPath;
  protected Imports imports;
  protected String outDir;
  protected ClasspathScanner cps;
  protected boolean exit;
  protected boolean updateLoader;
  protected workerThread myWorker;
  protected final CellExecutor executor;

  protected class jobDescriptor {
    String codeToBeExecuted;
    SimpleEvaluationObject outputObject;

    jobDescriptor(String c, SimpleEvaluationObject o) {
      codeToBeExecuted = c;
      outputObject = o;
    }
  }

  protected final Semaphore syncObject = new Semaphore(0, true);
  protected final ConcurrentLinkedQueue<jobDescriptor> jobQueue = new ConcurrentLinkedQueue<jobDescriptor>();

  public KotlinEvaluator(String id, String sId) {
    this(id, sId, new BeakerCellExecutor("kotlin"));
  }

  public KotlinEvaluator(String id, String sId, CellExecutor cellExecutor) {
    shellId = id;
    sessionId = sId;
    packageId = "com.twosigma.beaker.kotlin.bkr" + shellId.split("-")[0];
    cps = new ClasspathScanner();
    classPath = new Classpath();
    imports = new Imports();
    exit = false;
    updateLoader = true;
    outDir = Evaluator.createJupyterTempFolder().toString();
    executor = cellExecutor;
    startWorker();
  }

  private void startWorker() {
    myWorker = new workerThread();
    myWorker.start();
  }

  public String getShellId() {
    return shellId;
  }

  public void killAllThreads() {
    executor.killAllThreads();
  }

  public void cancelExecution() {
    executor.cancelExecution();
  }

  public void resetEnvironment() {
    executor.killAllThreads();

    String cpp = "";
    for (String pt : classPath.getPathsAsStrings()) {
      cpp += pt;
      cpp += File.pathSeparator;
    }
    cpp += File.pathSeparator;
    cpp += outDir;
    cpp += File.pathSeparator;
    cpp += System.getProperty("java.class.path");

    cps = new ClasspathScanner(cpp);

    // signal thread to create loader
    updateLoader = true;
    syncObject.release();
  }

  @Override
  public void exit() {
    exit = true;
    cancelExecution();
    syncObject.release();
  }


  @Override
  public void initKernel(KernelParameters kernelParameters) {
    configure(kernelParameters);
  }


  @Override
  public void setShellOptions(final KernelParameters kernelParameters) throws IOException {
    configure(kernelParameters);
    resetEnvironment();
  }

  private void configure(KernelParameters kernelParameters) {
    Map<String, Object> params = kernelParameters.getParams();
    Collection<String> listOfClassPath = (Collection<String>) params.get(CLASSPATH);
    Collection<String> listOfImports = (Collection<String>) params.get(IMPORTS);

    Map<String, String> env = System.getenv();

    if (listOfClassPath == null || listOfClassPath.isEmpty()) {
      classPath = new Classpath();
    } else {
      for (String line : listOfClassPath) {
        if (!line.trim().isEmpty()) {
          addJar(new PathToJar(line));
        }
      }
    }

    if (listOfImports == null || listOfImports.isEmpty()) {
      imports = new Imports();
    } else {
      for (String line : listOfImports) {
        if (!line.trim().isEmpty()) {
          imports.add(new ImportPath(line));
        }
      }
    }
  }

  @Override
  public Classpath getClasspath() {
    return this.classPath;
  }

  @Override
  public Imports getImports() {
    return this.imports;
  }

  @Override
  protected boolean addJar(PathToJar path) {
    return classPath.add(path);
  }

  @Override
  protected boolean addImportPath(ImportPath anImport) {
    return imports.add(anImport);
  }

  @Override
  protected boolean removeImportPath(ImportPath anImport) {
    return imports.remove(anImport);
  }

  @Override
  public void evaluate(SimpleEvaluationObject seo, String code) {
    // send job to thread
    jobQueue.add(new jobDescriptor(code, seo));
    syncObject.release();
  }

  @Override
  public AutocompleteResult autocomplete(String code, int caretPosition) {
    List<String> ret = new ArrayList<>();
    //TODO
    return new AutocompleteResult(ret, -1);
  }

  protected class workerThread extends Thread {

    public workerThread() {
      super("kotlin worker");
    }
    
    /*
     * This thread performs all the evaluation
     */

    public void run() {
      DynamicClassLoaderSimple loader = null;
      jobDescriptor j = null;

      NamespaceClient nc = null;

      while (!exit) {
        try {
          // wait for work
          syncObject.acquire();

          // check if we must create or update class loader
          if (loader == null || updateLoader) {
            loader = new DynamicClassLoaderSimple(ClassLoader.getSystemClassLoader());
            loader.addJars(classPath.getPathsAsStrings());
            loader.addDynamicDir(outDir);
          }

          // get next job descriptor
          j = jobQueue.poll();
          if (j == null)
            continue;

          nc = NamespaceClient.getBeaker(sessionId);
          nc.setOutputObj(j.outputObject);

          j.outputObject.started();

          String classpath = System.getProperty("java.class.path");
          String[] classpathEntries = classpath.split(File.pathSeparator);
            
          LineBrakingStringBuilderWrapper javaSourceCode = new LineBrakingStringBuilderWrapper();
          javaSourceCode.append("package ");
          javaSourceCode.append(packageId);
          javaSourceCode.append("\n\n");

          for (ImportPath i : imports.getImportPaths()) {
            javaSourceCode.append("import ");
            javaSourceCode.append(i.asString());
            javaSourceCode.append("\n");
          }
          javaSourceCode.append("\n");

          javaSourceCode.append("class " + WRAPPER_CLASS_NAME + " {\n");
          javaSourceCode.append("fun beakerRun() {\n");
          javaSourceCode.append(j.codeToBeExecuted);
          javaSourceCode.append("\n}\n");
          javaSourceCode.append("}\n");

          K2JVMCompiler comp = new K2JVMCompiler();
          ExitCode exitCode = null;
          
          ByteArrayOutputStream errorBaos = new ByteArrayOutputStream();
          PrintStream errorPs = new PrintStream(errorBaos);
          Path sourceFile = Files.write(Paths.get(outDir + "\\" + WRAPPER_CLASS_NAME + ".kt"), javaSourceCode.toString().getBytes());
          
          K2JVMCompilerArguments arguments = K2JVMCompilerArguments.createDefaultInstance();
          //arguments.kotlinHome = pathToCore.toString();
          arguments.includeRuntime = true;
          arguments.destination = outDir;
          arguments.classpath = getEntriesAsString(classpathEntries, Kernel.isWindows() ? ";" : ":");
          arguments.verbose = false;
          arguments.suppressWarnings = true;
          arguments.noStdlib = true;
          arguments.coroutinesState = K2JVMCompilerArguments.ERROR;
          arguments.freeArgs = new ArrayList<>();
          arguments.freeArgs.add(sourceFile.toString());
          
          MessageCollector collector = new PrintingMessageCollector(errorPs, MessageRenderer.PLAIN_RELATIVE_PATHS, arguments.verbose);
          exitCode = comp.exec(collector, Services.EMPTY, arguments);
          
          if (ExitCode.COMPILATION_ERROR == exitCode) {
            j.outputObject.error(new String(errorBaos.toByteArray(), StandardCharsets.UTF_8));
            j.outputObject.executeCodeCallback();
          } else if (ExitCode.OK == exitCode) {

            try {

              Class<?> fooClass = loader.loadClass(packageId + "." + WRAPPER_CLASS_NAME);
              Method mth = fooClass.getDeclaredMethod("beakerRun", (Class[]) null);
              if (!executor.executeTask(new MyRunnable(fooClass.newInstance(), mth, j.outputObject, false, loader))) {
                j.outputObject.error("... cancelled!");
              }
              if (nc != null) {
                nc.setOutputObj(null);
                nc = null;
              }

            } catch (Exception e) {
              j.outputObject.error(e);
            }
          }

          j = null;
        } catch (Throwable e) {
          e.printStackTrace();
        } finally {
          if (nc != null) {
            nc.setOutputObj(null);
            nc = null;
          }
        }
      }
      NamespaceClient.delBeaker(sessionId);
    }
    
    public String getEntriesAsString(String[] classpathEntries, String separator){
      String ret = "";
      for (String string : classpathEntries) {
        ret += string + separator; 
      }
      return ret;
    }


    protected class MyRunnable <T>implements Runnable {

      protected final SimpleEvaluationObject theOutput;
      protected final T instance;
      protected final Method theMth;
      protected final boolean retObject;
      protected final ClassLoader loader;

      public MyRunnable(T instance,  Method mth, SimpleEvaluationObject out, boolean ro, ClassLoader ld) {
        this.instance = instance;
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
        InternalVariable.setValue(theOutput);
        try {
          InternalVariable.setValue(theOutput);
          Object o = theMth.invoke(instance, (Object[]) null);
          if (retObject) {
            theOutput.finished(o);
          } else {
            theOutput.finished(null);
          }
        } catch (Throwable e) {
          if (e instanceof InvocationTargetException)
            e = ((InvocationTargetException) e).getTargetException();
          if ((e instanceof InterruptedException) || (e instanceof ThreadDeath)) {
            theOutput.error("... cancelled!");
          } else {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            theOutput.error(sw.toString());
          }
        } finally {
          if (theOutput != null) {
            theOutput.executeCodeCallback();
          }
        }
        theOutput.clrOutputHandler();
        Thread.currentThread().setContextClassLoader(oldld);
      }
    }
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
