/*
 *  Copyright 2014-2016 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beakerx.scala.evaluator;

import com.twosigma.beakerx.BeakerXClient;
import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.autocomplete.MagicCommandAutocompletePatterns;
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.evaluator.ClasspathScanner;
import com.twosigma.beakerx.evaluator.JobDescriptor;
import com.twosigma.beakerx.evaluator.TempFolderFactory;
import com.twosigma.beakerx.jvm.classloader.BeakerXUrlClassLoader;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.jvm.threads.CellExecutor;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.ExecutionOptions;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.PathToJar;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.util.List;
import java.util.concurrent.Executors;

public class ScalaEvaluator extends BaseEvaluator {

  private final static Logger logger = LoggerFactory.getLogger(ScalaEvaluator.class.getName());
  private BeakerxObjectFactory beakerxObjectFactory;
  private BeakerXUrlClassLoader classLoader;
  private ScalaEvaluatorGlue shell;
  private ScalaAutocomplete scalaAutocomplete;

  public ScalaEvaluator(String id,
                        String sId,
                        CellExecutor cellExecutor,
                        BeakerxObjectFactory beakerxObjectFactory,
                        TempFolderFactory tempFolderFactory,
                        EvaluatorParameters evaluatorParameters,
                        BeakerXClient beakerxClient,
                        MagicCommandAutocompletePatterns autocompletePatterns,
                        ClasspathScanner classpathScanner) {
    super(id, sId, cellExecutor, tempFolderFactory, evaluatorParameters, beakerxClient, autocompletePatterns,classpathScanner);
    this.beakerxObjectFactory = beakerxObjectFactory;
    this.classLoader = newClassLoader();
    this.shell = createNewEvaluator();
    this.scalaAutocomplete = new ScalaAutocomplete(shell, autocompletePatterns);
  }

  @Override
  public TryResult evaluate(SimpleEvaluationObject seo, String code, ExecutionOptions executionOptions) {
    return evaluate(seo, new ScalaWorkerThread(this, new JobDescriptor(code, seo, executionOptions)));
  }

  @Override
  protected void addJarToClassLoader(PathToJar pathToJar) {
    this.classLoader.addJar(pathToJar);
  }

  @Override
  protected void addImportToClassLoader(ImportPath anImport) {
    addImportToShell(this.shell, anImport);
  }

  @Override
  protected void doReloadEvaluator() {
    this.shell = createNewEvaluator(shell);
    this.scalaAutocomplete = new ScalaAutocomplete(shell, autocompletePatterns);
  }

  @Override
  protected void doResetEnvironment() {
    this.classLoader = newClassLoader();
    this.shell = createNewEvaluator();
    this.scalaAutocomplete = new ScalaAutocomplete(shell, autocompletePatterns);
    executorService.shutdown();
    executorService = Executors.newSingleThreadExecutor();
  }

  @Override
  public void exit() {
    super.exit();
    killAllThreads();
    executorService.shutdown();
  }

  @Override
  public ClassLoader getClassLoader() {
    return this.classLoader;
  }

  ScalaEvaluatorGlue getShell() {
    return shell;
  }

  @Override
  public AutocompleteResult autocomplete(String code, int caretPosition) {
    return this.scalaAutocomplete.find(code, caretPosition);
  }

  private String adjustImport(String imp) {
    if (imp.startsWith("import"))
      imp = imp.substring(6).trim();
    // Scala doesn't need "static"
    if (imp.startsWith("static"))
      imp = imp.substring(6).trim();
    // May need more of these, but all Scala keywords that aren't Java keywords is probably overkill
    if (imp.contains(".object.")) {
      imp = imp.replace(".object.", ".`object`.");
    }
    if (imp.endsWith(".*"))
      imp = imp.substring(0, imp.length() - 1) + "_";
    return imp;
  }

  private ScalaEvaluatorGlue createNewEvaluator(ScalaEvaluatorGlue shell) {
    ScalaEvaluatorGlue newEvaluator = createNewEvaluator();
    setLineId(newEvaluator, shell.interpreter().lastRequest().lineRep().lineId());
    return newEvaluator;
  }

  private void setLineId(ScalaEvaluatorGlue newEvaluator, int lines) {
    for (int i = newEvaluator.interpreter().lastRequest().lineRep().lineId(); i < lines; i++) {
      newEvaluator.evaluate2("\"\"");
    }
  }

  private ScalaEvaluatorGlue createNewEvaluator() {
    logger.debug("creating new evaluator");
    String loader_cp = createLoaderCp();
    ScalaEvaluatorGlue shell = new ScalaEvaluatorGlue(this.classLoader, loader_cp, getOutDir());
    if (!getImports().isEmpty()) {
      addImportsToShell(shell, getImports().getImportPaths());
    }
    logger.debug("creating beaker object");
    String r = shell.evaluate2(this.beakerxObjectFactory.create());
    if (r != null && !r.isEmpty()) {
      logger.warn("ERROR creating beaker object: {}", r);
    }
    return shell;
  }

  private void addImportsToShell(ScalaEvaluatorGlue shell, List<ImportPath> importsPaths) {
    if (!importsPaths.isEmpty()) {
      String[] imp = importsPaths.stream().map(importPath -> adjustImport(importPath.asString())).toArray(String[]::new);
      logger.debug("importing : {}", importsPaths);
      if (!shell.addImports(imp)) {
        logger.warn("ERROR: cannot add import '{}'", (Object[]) imp);
      }
    }
  }

  private void addImportToShell(ScalaEvaluatorGlue shell, ImportPath importPath) {
    String imp = importPath.asString().trim();
    imp = adjustImport(imp);
    if (!imp.isEmpty()) {
      logger.debug("importing : {}", imp);
      if (!shell.addImport(imp))
        logger.warn("ERROR: cannot add import '{}'", imp);
    }
  }

  /*
   * Scala uses multiple classloaders and (unfortunately) cannot fallback to the java one while compiling scala code so we
   * have to build our DynamicClassLoader and also build a proper classpath for the compiler classloader.
   */
  private BeakerXUrlClassLoader newClassLoader() {
    logger.debug("creating new loader");
    BeakerXUrlClassLoader cl = new BeakerXUrlClassLoader(ClassLoader.getSystemClassLoader());
    cl.addPathToJars(getClasspath().getPaths());
    return cl;
  }

  private String createLoaderCp() {
    String loader_cp = "";
    for (int i = 0; i < getClasspath().size(); i++) {
      loader_cp += getClasspath().get(i);
      loader_cp += File.pathSeparatorChar;
    }
    return loader_cp + File.pathSeparatorChar + System.getProperty("java.class.path");
  }
}