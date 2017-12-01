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
import com.twosigma.beakerx.kernel.Repos;
import org.apache.commons.io.FileUtils;

import java.io.File;
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
  protected Repos repos;

  public BaseEvaluator(String id, String sId, CellExecutor cellExecutor, TempFolderFactory tempFolderFactory, EvaluatorParameters evaluatorParameters) {
    shellId = id;
    sessionId = sId;
    executor = cellExecutor;
    tempFolder = tempFolderFactory.createTempFolder();
    outDir = getOrCreateFile(tempFolder.toString() + File.separator + "outDir").getPath();
    classPath = new Classpath();
    classPath.add(new PathToJar(outDir));
    imports = new Imports();
    repos = new Repos();
    configure(evaluatorParameters);
  }

  @Override
  public boolean addJarToClasspath(PathToJar path) {
    boolean add = classPath.add(path);
    if (add) {
      addJarToClassLoader(path);
    }
    return add;
  }

  @Override
  public List<Path> addJarsToClasspath(List<PathToJar> paths) {
    LinkedList<Path> addedPaths = Lists.newLinkedList();
    paths.forEach(path -> {
      if (addJarToClasspath(path)) {
        addedPaths.add(Paths.get(path.getPath()));
      }
    });
    return addedPaths;
  }

  @Override
  public void addImport(ImportPath anImport) {
    boolean add = imports.add(anImport);
    if (add) {
      addImportToClassLoader(anImport);
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

  @Override
  public Repos getRepos() {
    return repos;
  }

  @Override
  public String addRepo(String name, String url) {
    return repos.add(name, url);
  }

  protected abstract void addJarToClassLoader(PathToJar pathToJar);

  protected abstract void addImportToClassLoader(ImportPath anImport);

  protected boolean removeImportPath(ImportPath anImport) {
    return imports.remove(anImport);
  }

  protected void configure(EvaluatorParameters kernelParameters) {
    Map<String, Object> params = kernelParameters.getParams();
    Collection<String> listOfClassPath = (Collection<String>) params.get(DefaultJVMVariables.CLASSPATH);
    Collection<String> listOfImports = (Collection<String>) params.get(DefaultJVMVariables.IMPORTS);
    if (listOfClassPath != null) {
      for (String line : listOfClassPath) {
        if (!line.trim().isEmpty()) {
          classPath.add(new PathToJar(line));
        }
      }
    }
    if (listOfImports != null) {
      for (String line : listOfImports) {
        if (!line.trim().isEmpty()) {
          imports.add(new ImportPath(line));
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

  private File getOrCreateFile(String pathToMavenRepo) {
    File theDir = new File(pathToMavenRepo);
    if (!theDir.exists()) {
      try {
        theDir.mkdirs();
      } catch (Exception e) {
        throw new RuntimeException(e);
      }
    }
    return theDir;
  }

}
