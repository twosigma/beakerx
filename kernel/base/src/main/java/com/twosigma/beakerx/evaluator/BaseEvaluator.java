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

import com.twosigma.beakerx.BeakerXClient;
import com.twosigma.beakerx.BeakerXClientManager;
import com.twosigma.beakerx.BeakerxDirvers;
import com.twosigma.beakerx.ClassLoaderSwitcher;
import com.twosigma.beakerx.DefaultJVMVariables;
import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.autocomplete.MagicCommandAutocompletePatterns;
import com.twosigma.beakerx.inspect.Inspect;
import com.twosigma.beakerx.inspect.InspectResult;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.jvm.threads.CellExecutor;
import com.twosigma.beakerx.kernel.AddImportStatus;
import com.twosigma.beakerx.kernel.Classpath;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.ExecutionOptions;
import com.twosigma.beakerx.kernel.GroupName;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.Imports;
import com.twosigma.beakerx.kernel.PathToJar;
import org.apache.commons.io.FileUtils;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collection;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Callable;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public abstract class BaseEvaluator implements Evaluator {

  public static String INTERUPTED_MSG = "interrupted";
  protected final String shellId;
  protected final String sessionId;
  private final ClasspathScanner classpathScanner;
  protected String outDir;
  private Inspect inspect;
  protected Classpath classPath;
  protected Imports imports = new Imports(new ArrayList<>());
  private final CellExecutor executor;
  private Path tempFolder;
  private BeakerXClient beakerXClient;
  protected MagicCommandAutocompletePatterns autocompletePatterns;
  protected EvaluatorParameters evaluatorParameters;
  private EvaluatorHooks cancelHooks = new EvaluatorHooks();
  private ClassLoaderService classLoaderService = new ClassLoaderService();

  protected ExecutorService executorService;
  protected ExecutorService executorBgkService;
  private ClassLoaderSwitcher classLoaderSwitcher;

  public BaseEvaluator(String id,
                       String sId,
                       CellExecutor cellExecutor,
                       TempFolderFactory tempFolderFactory,
                       EvaluatorParameters evaluatorParameters,
                       BeakerXClient beakerXClient,
                       MagicCommandAutocompletePatterns autocompletePatterns,
                       ClasspathScanner classpathScanner) {
    shellId = id;
    sessionId = sId;
    executor = cellExecutor;
    tempFolder = tempFolderFactory.createTempFolder();
    this.classpathScanner = classpathScanner;
    this.beakerXClient = BeakerXClientManager.register(beakerXClient);
    this.autocompletePatterns = autocompletePatterns;
    outDir = getOrCreateFile(tempFolder.toString() + File.separator + "outDir").getPath();
    classPath = new Classpath();
    classPath.add(new PathToJar(outDir));
    inspect = new Inspect();
    executorService = Executors.newCachedThreadPool();
    executorBgkService = Executors.newCachedThreadPool();
    this.evaluatorParameters = evaluatorParameters;
    init(evaluatorParameters);
  }

  @Override
  public void startEvaluation() {
    classLoaderSwitcher = new ClassLoaderSwitcher(this);
    classLoaderSwitcher.start();
  }

  @Override
  public void endEvaluation() {
    classLoaderSwitcher.end();
  }

  CompletableFuture<TryResult> background;

  protected TryResult evaluate(SimpleEvaluationObject seo, Callable<TryResult> callable) {
    try {
      background = CompletableFuture.supplyAsync(() -> {
        try {
          InternalVariable.setValue(seo);
          Future<TryResult> submit = executorService.submit(callable);
          return submit.get();
        } catch (Exception e) {
          throw new RuntimeException(e);
        }
      }, executorBgkService);

      return background.get();

    } catch (Exception e) {
      return TryResult.createError(e.getLocalizedMessage());
    }
  }

  @Override
  public TryResult evaluate(SimpleEvaluationObject seo, String code) {
    return evaluate(seo, code, new ExecutionOptions(GroupName.generate()));
  }

  @Override
  public void putEvaluationInToBackground() {
    background.complete(TryResult.createResult("Evaluation in the background"));
  }

  protected abstract void addJarToClassLoader(PathToJar pathToJar);

  protected abstract void addImportToClassLoader(ImportPath anImport);

  protected abstract void doResetEnvironment();

  protected void doReloadEvaluator() {
  }

  public abstract ClassLoader getClassLoader();

  public ClassLoader getClassLoaderForImport() {
    return getClassLoader();
  }

  @Override
  public BeakerXClient getBeakerX() {
    return beakerXClient;
  }

  @Override
  public List<Path> addJarsToClasspath(List<PathToJar> paths) {
    LinkedList<Path> addedPaths = new LinkedList<>();
    paths.forEach(path -> {
      if (addJarToClasspath(path)) {
        addedPaths.add(Paths.get(path.getPath()));
      }
    });
    classpathScanner.scan();
    doReloadEvaluator();
    return addedPaths;
  }

  private boolean addJarToClasspath(PathToJar path) {
    boolean add = classPath.add(path);
    if (add) {
      addJarToClassLoader(path);
    }
    return add;
  }

  @Override
  public AddImportStatus addImport(ImportPath anImport) {
    AddImportStatus add = imports.add(anImport, getClassLoaderForImport());
    if (AddImportStatus.ADDED.equals(add)) {
      addImportToClassLoader(anImport);
    }
    return add;
  }

  @Override
  public void removeImport(ImportPath anImport) {
    if (removeImportPath(anImport)) {
      resetEnvironment();
    }
  }

  protected boolean removeImportPath(ImportPath anImport) {
    return imports.remove(anImport);
  }

  @Override
  public Classpath getClasspath() {
    return classPath;
  }

  @Override
  public Imports getImports() {
    return imports;
  }

  protected void init(EvaluatorParameters kernelParameters) {
    Map<String, Object> params = kernelParameters.getParams();
    initClasspath(params);
    initImports(params);
  }

  private void initClasspath(Map<String, Object> params) {
    Collection<String> listOfClassPath = (Collection<String>) params.get(DefaultJVMVariables.CLASSPATH);
    if (listOfClassPath != null) {
      for (String line : listOfClassPath) {
        if (!line.trim().isEmpty()) {
          classPath.add(new PathToJar(line));
        }
      }
    }
  }

  private void initImports(Map<String, Object> params) {
    Collection<String> listOfImports = (Collection<String>) params.get(DefaultJVMVariables.IMPORTS);
    List<ImportPath> importPaths = new ArrayList<>();
    if (listOfImports != null) {
      for (String line : listOfImports) {
        if (!line.trim().isEmpty()) {
          importPaths.add(new ImportPath(line));
        }
      }
      if (this.imports != null) {
        importPaths.addAll(this.imports.getImportPaths());
      }
    }
    this.imports = new Imports(importPaths);
  }

  @Override
  public void updateEvaluatorParameters(final EvaluatorParameters kernelParameters) {
    init(kernelParameters);
    resetEnvironment();
  }

  public TryResult executeTask(Callable<TryResult> codeRunner, ExecutionOptions executionOptions) {
    return executor.executeTask(codeRunner, executionOptions);
  }

  @Override
  public void killAllThreads() {
    executor.killAllThreads();
  }

  @Override
  public void cancelExecution(GroupName groupName) {
    executor.cancelExecution(groupName);
    cancelHooks.runHooks();
  }

  @Override
  public void resetEnvironment() {
    executor.killAllThreads();
    inspect = new Inspect();
    doResetEnvironment();
  }

  public String getSessionId() {
    return sessionId;
  }

  @Override
  public String getOutDir() {
    return outDir;
  }

  @Override
  public Path getTempFolder() {
    return tempFolder;
  }

  @Override
  public void exit() {
    beakerXClient.delBeaker();
    removeTempFolder();
  }

  private void removeTempFolder() {
    try {
      FileUtils.deleteQuietly(new File(getTempFolder().toString()));
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public Class<?> loadClass(String clazzName) throws ClassNotFoundException {
    return classLoaderService.loadClass(clazzName, getClassLoader());
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

  @Override
  public InspectResult inspect(String code, int caretPosition) {
    return inspect.doInspect(code, caretPosition, null, imports);
  }

  public Inspect getInspect() {
    return inspect;
  }

  @Override
  public void registerCancelHook(Hook hook) {
    this.cancelHooks.registerHook(hook);
  }

  @Override
  public boolean checkIfClassExistsInClassloader(String clazzName) {
    return classLoaderService.checkIfClassExistsInClassloader(clazzName, getClassLoader());
  }
}
