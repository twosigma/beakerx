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

import com.intellij.openapi.util.Disposer;
import com.twosigma.beakerx.NamespaceClient;
import com.twosigma.beakerx.evaluator.JobDescriptor;
import com.twosigma.beakerx.evaluator.WorkerThread;
import com.twosigma.beakerx.jvm.classloader.DynamicClassLoaderSimple;
import com.twosigma.beakerx.kernel.ImportPath;
import org.jetbrains.kotlin.cli.jvm.repl.ConsoleReplConfiguration;
import org.jetbrains.kotlin.cli.jvm.repl.ReplInterpreter;
import org.jetbrains.kotlin.config.CommonConfigurationKeys;
import org.jetbrains.kotlin.config.CompilerConfiguration;
import org.jetbrains.kotlin.utils.PathUtil;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Arrays;

import static com.twosigma.beakerx.evaluator.BaseEvaluator.INTERUPTED_MSG;
import static org.jetbrains.kotlin.cli.jvm.config.JvmContentRootsKt.addJvmClasspathRoot;
import static org.jetbrains.kotlin.cli.jvm.config.JvmContentRootsKt.addJvmClasspathRoots;

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
    JobDescriptor j = null;

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

          String classpath = System.getProperty("java.class.path");
          String[] classpathEntries = classpath.split(File.pathSeparator);
          repl = createReplInterpreter(classpathEntries);
          this.updateLoader = false;
        }

        // get next job descriptor
        j = jobQueue.poll();
        if (j == null)
          continue;

        nc = NamespaceClient.getBeaker(kotlinEvaluator.getSessionId());
        nc.setOutputObj(j.outputObject);

        j.outputObject.started();

        try {
          if (!kotlinEvaluator.executeTask(new KotlinCodeRunner(null, null, j.outputObject, loader, repl, j.codeToBeExecuted))) {
            j.outputObject.error(INTERUPTED_MSG);
          }
          if (nc != null) {
            nc.setOutputObj(null);
            nc = null;
          }

        } catch (Exception e) {
          j.outputObject.error(e);
        }
        //}

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

  private ReplInterpreter repl;

  private ReplInterpreter createReplInterpreter(String[] classpathEntries) {
    CompilerConfiguration compilerConfiguration = new CompilerConfiguration();
    compilerConfiguration.put(CommonConfigurationKeys.MODULE_NAME, "kotlin-script-module-" + System.currentTimeMillis());
    addJvmClasspathRoots(compilerConfiguration, PathUtil.getJdkClassesRootsFromCurrentJre());
    Arrays.stream(classpathEntries).forEach(x -> {
      addJvmClasspathRoot(compilerConfiguration, new File(x));
    });
    ReplInterpreter replInterpreter = new ReplInterpreter(
            Disposer.newDisposable(),
            compilerConfiguration,
            new ConsoleReplConfiguration());

    StringBuilder javaSourceCode = new StringBuilder();
    for (ImportPath i : kotlinEvaluator.getImports().getImportPaths()) {
      javaSourceCode.append("import ");
      javaSourceCode.append(adjustImport(i));
      javaSourceCode.append("\n");
    }
    replInterpreter.eval(javaSourceCode.toString());
    return replInterpreter;
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

  public void updateLoader() {
    this.updateLoader = true;
  }

  public void doExit() {
    this.exit = true;
    removeKtFile();
  }

  private void removeKtFile() {
    try {
      Files.deleteIfExists(new File(kotlinEvaluator.getOutDir() + "\\" + WRAPPER_CLASS_NAME + ".kt").toPath());
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

}
