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

import com.google.common.collect.Lists;
import com.twosigma.beakerx.DefaultJVMVariables;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.jvm.threads.CellExecutor;
import com.twosigma.beakerx.kernel.Classpath;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.Imports;
import com.twosigma.beakerx.kernel.KernelParameters;
import com.twosigma.beakerx.kernel.PathToJar;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.Semaphore;

public abstract class BaseEvaluator implements Evaluator {

  protected final String shellId;
  protected final String sessionId;
  protected String outDir;
  protected Classpath classPath;
  protected Imports imports;

  protected final CellExecutor executor;
  public final Semaphore syncObject = new Semaphore(0, true);
  public final ConcurrentLinkedQueue<JobDescriptor> jobQueue = new ConcurrentLinkedQueue<JobDescriptor>();

  public BaseEvaluator(String id, String sId, CellExecutor cellExecutor) {
    shellId = id;
    sessionId = sId;
    executor = cellExecutor;
    outDir = Evaluator.createJupyterTempFolder().toString();
    classPath = new Classpath();
    imports = new Imports();
  }

  @Override
  public boolean addJarToClasspath(PathToJar path) {
    boolean added = addJar(path);
    if (added) {
      resetEnvironment();
    }

    return added;
  }

  @Override
  public List<Path> addJarsToClasspath(List<PathToJar> paths) {
    LinkedList<Path> addedPaths = Lists.newLinkedList();
    paths.forEach(path -> {
      if (addJar(path)) {
        addedPaths.add(Paths.get(path.getPath()));
      }
    });

    if (!addedPaths.isEmpty()) {
      resetEnvironment();
    }
    return addedPaths;
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

  public Classpath getClasspath() {
    return classPath;
  }

  public Imports getImports() {
    return imports;
  }

  protected boolean addJar(PathToJar path) {
    return classPath.add(path);
  }

  protected boolean addImportPath(ImportPath anImport) {
    return imports.add(anImport);
  }

  protected boolean removeImportPath(ImportPath anImport) {
    return imports.remove(anImport);
  }

  protected void configure(KernelParameters kernelParameters) {
    Map<String, Object> params = kernelParameters.getParams();
    Collection<String> listOfClassPath = (Collection<String>) params.get(DefaultJVMVariables.CLASSPATH);
    Collection<String> listOfImports = (Collection<String>) params.get(DefaultJVMVariables.IMPORTS);

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
          addImportPath(new ImportPath(line));
        }
      }
    }
  }

  @Override
  public void setShellOptions(final KernelParameters kernelParameters) throws IOException {
    configure(kernelParameters);
    resetEnvironment();
  }

  @Override
  public void initKernel(KernelParameters kernelParameters) {
    configure(kernelParameters);
  }

  public class JobDescriptor {
    public String codeToBeExecuted;
    public SimpleEvaluationObject outputObject;
    public String cellId;

    public JobDescriptor(String c, SimpleEvaluationObject o, String cid) {
      this(c, o);
      cellId = cid;
    }

    public JobDescriptor(String c, SimpleEvaluationObject o) {
      codeToBeExecuted = c;
      outputObject = o;
    }

    public SimpleEvaluationObject getSimpleEvaluationObject() {
      return outputObject;
    }
  }

  public void killAllThreads() {
    executor.killAllThreads();
  }

  public void cancelExecution() {
    executor.cancelExecution();
  }

  public void resetEnvironment() {
    executor.killAllThreads();
    doResetEnvironment();
    syncObject.release();
  }

  protected abstract void doResetEnvironment();

  public String getSessionId() {
    return sessionId;
  }

  public String getOutDir() {
    return outDir;
  }
}
