/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.evaluator.WorkerThread;
import com.twosigma.beakerx.jvm.classloader.DynamicClassLoaderSimple;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.Kernel;
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
import java.io.PrintStream;
import java.lang.reflect.Method;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;

class KotlinWorkerThread extends WorkerThread {

  private static final String WRAPPER_CLASS_NAME = "BeakerWrapperClass1261714175";

  private KotlinEvaluator kotlinEvaluator;
  protected boolean exit;
  protected boolean updateLoader;

  public KotlinWorkerThread(KotlinEvaluator kotlinEvaluator) {
    super("kotlin worker");
    this.kotlinEvaluator = kotlinEvaluator;
    exit = false;
    updateLoader = true;
  }

  /*
   * This thread performs all the evaluation
   */

  public void run() {
    DynamicClassLoaderSimple loader = null;
    BaseEvaluator.JobDescriptor j = null;

    NamespaceClient nc = null;

    while (!exit) {
      try {
        // wait for work
        syncObject.acquire();

        // check if we must create or update class loader
        if (loader == null || updateLoader) {
          loader = new DynamicClassLoaderSimple(ClassLoader.getSystemClassLoader());
          loader.addJars(kotlinEvaluator.getClasspath().getPathsAsStrings());
          loader.addDynamicDir(kotlinEvaluator.getOutDir());
        }

        // get next job descriptor
        j = jobQueue.poll();
        if (j == null)
          continue;

        nc = NamespaceClient.getBeaker(kotlinEvaluator.getSessionId());
        nc.setOutputObj(j.outputObject);

        j.outputObject.started();

        String classpath = System.getProperty("java.class.path");
        String[] classpathEntries = classpath.split(File.pathSeparator);

        LineBrakingStringBuilderWrapper javaSourceCode = new LineBrakingStringBuilderWrapper();
        javaSourceCode.append("package ");
        javaSourceCode.append(kotlinEvaluator.packageId);
        javaSourceCode.append("\n\n");

        for (ImportPath i : kotlinEvaluator.getImports().getImportPaths()) {
          javaSourceCode.append("import ");
          javaSourceCode.append(adjustImport(i));
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
        Path sourceFile = Files.write(Paths.get(kotlinEvaluator.getOutDir() + "\\" + WRAPPER_CLASS_NAME + ".kt"), javaSourceCode.toString().getBytes());

        K2JVMCompilerArguments arguments = K2JVMCompilerArguments.createDefaultInstance();
        //arguments.kotlinHome = pathToCore.toString();
        arguments.includeRuntime = true;
        arguments.destination = kotlinEvaluator.getOutDir();
        arguments.classpath = getEntriesAsString(classpathEntries, Kernel.isWindows() ? ";" : ":");
        arguments.verbose = false;
        arguments.suppressWarnings = true;
        arguments.noStdlib = true;
        arguments.coroutinesState = K2JVMCompilerArguments.ERROR;
        arguments.freeArgs = new ArrayList<>();
        arguments.freeArgs.add(sourceFile.toString());
        arguments.skipRuntimeVersionCheck = true;

        MessageCollector collector = new PrintingMessageCollector(errorPs, MessageRenderer.PLAIN_RELATIVE_PATHS, arguments.verbose);
        exitCode = comp.exec(collector, Services.EMPTY, arguments);

        if (ExitCode.COMPILATION_ERROR == exitCode) {
          j.outputObject.error(new String(errorBaos.toByteArray(), StandardCharsets.UTF_8));
          j.outputObject.executeCodeCallback();
        } else if (ExitCode.OK == exitCode) {

          try {

            Class<?> fooClass = loader.loadClass(kotlinEvaluator.packageId + "." + WRAPPER_CLASS_NAME);
            Method mth = fooClass.getDeclaredMethod("beakerRun", (Class[]) null);
            if (!kotlinEvaluator.executeTask(new KotlinCodeRunner(fooClass.newInstance(), mth, j.outputObject, false, loader))) {
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
    NamespaceClient.delBeaker(kotlinEvaluator.getSessionId());
  }

  private String adjustImport(ImportPath importPath) {
    String currentImportPath = importPath.asString();
    if (currentImportPath.startsWith("import")) {
      currentImportPath = currentImportPath.substring(6).trim();
    }

    if (currentImportPath.startsWith("static")) {
      currentImportPath = currentImportPath.substring(6).trim();
    }

    if (currentImportPath.contains(".object.")) {
      currentImportPath = currentImportPath.replace(".object.", ".`object`.");
    }

    return currentImportPath;
  }


  public String getEntriesAsString(String[] classpathEntries, String separator) {
    String ret = "";
    for (String string : classpathEntries) {
      ret += string + separator;
    }
    return ret;
  }

  public void updateLoader() {
    this.updateLoader = true;
  }

  public void doExit() {
    this.exit = true;
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
