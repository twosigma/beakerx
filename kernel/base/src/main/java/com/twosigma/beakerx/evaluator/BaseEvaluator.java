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
import com.twosigma.beakerx.jvm.threads.CellExecutor;
import com.twosigma.beakerx.kernel.Classpath;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.Imports;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.PathToJar;
import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public abstract class BaseEvaluator implements Evaluator {

  public static String INTERUPTED_MSG = "interrupted";

  protected final String shellId;
  protected final String sessionId;
  protected String outDir;
  protected Classpath classPath;
  protected Imports imports;
  private final CellExecutor executor;
  protected Path tempFolder;

  public BaseEvaluator(String id, String sId, CellExecutor cellExecutor, TempFolderFactory tempFolderFactory, EvaluatorParameters evaluatorParameters) {
    shellId = id;
    sessionId = sId;
    executor = cellExecutor;
    tempFolder = tempFolderFactory.createTempFolder();
    outDir = tempFolder.toString();
    classPath = new Classpath();
    imports = new Imports();
    configure(evaluatorParameters);
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

  @Override
  public Classpath getClasspath() {
    return classPath;
  }

  @Override
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

  protected void configure(EvaluatorParameters kernelParameters) {
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
  public void setShellOptions(final EvaluatorParameters kernelParameters) {
    configure(kernelParameters);
    resetEnvironment();
  }

  public boolean executeTask(Runnable codeRunner) {
    return executor.executeTask(codeRunner);
  }

  @Override
  public void killAllThreads() {
    executor.killAllThreads();
  }

  @Override
  public void cancelExecution() {
    executor.cancelExecution();
  }

  @Override
  public void resetEnvironment() {
    executor.killAllThreads();
    doResetEnvironment();
  }

  protected abstract void doResetEnvironment();

  public String getSessionId() {
    return sessionId;
  }

  public String getOutDir() {
    return outDir;
  }

  @Override
  public Path getTempFolder() {
    return tempFolder;
  }

  @Override
  public void exit() {
    removeTempFolder();
  }

  private void removeTempFolder() {
    try {
      FileUtils.deleteQuietly(new File(getTempFolder().toString()));
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  public abstract ClassLoader getClassLoader();

  @Override
  public Class<?> loadClass(String clazzName) throws ClassNotFoundException {
    return getClassLoader().loadClass(clazzName);
  }
}
