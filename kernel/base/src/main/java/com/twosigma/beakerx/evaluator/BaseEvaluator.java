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
package com.twosigma.beakerx.evaluator;

import com.twosigma.beakerx.jvm.threads.CellExecutor;
import com.twosigma.beakerx.kernel.Classpath;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.Imports;
import com.twosigma.beakerx.kernel.KernelParameters;
import com.twosigma.beakerx.kernel.PathToJar;

import java.io.IOException;
import java.util.concurrent.Semaphore;

public abstract class BaseEvaluator implements Evaluator {
  
  protected Classpath classPath;
  protected Imports imports;
  protected final String shellId;
  protected final String sessionId;
  protected volatile boolean exit;
  protected final Semaphore syncObject = new Semaphore(0, true);
  protected CellExecutor executor;
  
  public BaseEvaluator(String id, String sId) {
    this.shellId = id;
    this.sessionId = sId;
    this.classPath = new Classpath();
    this.imports = new Imports();
    this.exit = false;
  }
  
  protected abstract boolean addJar(PathToJar path);
  
  public void killAllThreads() {
    executor.killAllThreads();
  }

  public void cancelExecution() {
    executor.cancelExecution();
  }
  
  public String getShellId() {
    return shellId;
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
  public void exit() {
    exit = true;
    cancelExecution();
    syncObject.release();
  }

  protected boolean addImportPath(ImportPath anImport) {
    return imports.add(anImport);
  }

  protected boolean removeImportPath(ImportPath anImport) {
    return imports.remove(anImport);
  }

  @Override
  public void setShellOptions(final KernelParameters kernelParameters) throws IOException {
    initKernel(kernelParameters);
    resetEnvironment();
  }
  
  @Override
  public void addJarToClasspath(PathToJar path) {
    if (addJar(path)) {
      resetEnvironment();
    }
  }

  @Override
  public void addImport(ImportPath anImport) {
    if (addImportPath(anImport)) {
      resetEnvironment();
    }
  }

  @Override
  public void removeImport(ImportPath anImport) {
    if (removeImportPath(anImport)) {
      resetEnvironment();
    }
  }
}
