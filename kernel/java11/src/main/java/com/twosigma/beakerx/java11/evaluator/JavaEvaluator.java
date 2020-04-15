/*
 *  Copyright 2020 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.java11.evaluator;

import com.twosigma.beakerx.BeakerXClient;
import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.autocomplete.MagicCommandAutocompletePatterns;
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.evaluator.ClasspathScanner;
import com.twosigma.beakerx.evaluator.JobDescriptor;
import com.twosigma.beakerx.evaluator.TempFolderFactory;
import com.twosigma.beakerx.evaluator.TempFolderFactoryImpl;
import com.twosigma.beakerx.java11.JavaBeakerXUrlClassLoader;
import com.twosigma.beakerx.java11.autocomplete.JavaAutocomplete;
import com.twosigma.beakerx.java11.autocomplete.JavaClasspathScanner;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.jvm.threads.BeakerCellExecutor;
import com.twosigma.beakerx.jvm.threads.CellExecutor;
import com.twosigma.beakerx.kernel.Classpath;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.ExecutionOptions;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.Imports;
import com.twosigma.beakerx.kernel.PathToJar;
import jdk.jshell.JShell;

import java.io.File;
import java.util.concurrent.Executors;

public class JavaEvaluator extends BaseEvaluator {


  private JavaAutocomplete jac;
  private JavaBeakerXUrlClassLoader loader = null;
  private JShell jshell;

  public JavaEvaluator(String id,
                       String sId,
                       EvaluatorParameters evaluatorParameters,
                       BeakerXClient beakerxClient,
                       MagicCommandAutocompletePatterns autocompletePatterns,
                       ClasspathScanner classpathScanner) {
    this(id, sId, new BeakerCellExecutor("java11"), new TempFolderFactoryImpl(), evaluatorParameters, beakerxClient, autocompletePatterns, classpathScanner);
  }

  public JavaEvaluator(String id,
                       String sId,
                       CellExecutor cellExecutor,
                       TempFolderFactory tempFolderFactory,
                       EvaluatorParameters evaluatorParameters,
                       BeakerXClient beakerxClient,
                       MagicCommandAutocompletePatterns autocompletePatterns,
                       ClasspathScanner classpathScanner) {
    super(id, sId, cellExecutor, tempFolderFactory, evaluatorParameters, beakerxClient, autocompletePatterns, classpathScanner);
    loader = newClassLoader();
    jac = createJavaAutocomplete(new JavaClasspathScanner(), imports, loader);
    this.jshell = newJShell();
  }

  public JShell getJshell() {
    return this.jshell;
  }

  @Override
  public ClassLoader getClassLoaderForImport() {
    return getJavaClassLoader().getJavaURLClassLoader();
  }

  @Override
  protected void doResetEnvironment() {
    String cp = createClasspath(classPath);
    loader = newClassLoader();
    jshell = newJShell();
    jac = createAutocomplete(new JavaClasspathScanner(cp), imports, loader);
    executorService.shutdown();
    executorService = Executors.newSingleThreadExecutor();
  }

  @Override
  protected void addJarToClassLoader(PathToJar pathToJar) {
    this.jshell.addToClasspath(pathToJar.getPath());
    loader.addJar(pathToJar);
  }

  @Override
  protected void addImportToClassLoader(ImportPath anImport) {
    addImportToClassLoader(anImport, this.jshell);
  }

  private void addImportToClassLoader(ImportPath anImport, JShell jShell) {
    jShell.eval("import " + anImport.asString() + ";");
  }

  @Override
  public void exit() {
    super.exit();
    killAllThreads();
    executorService.shutdown();
    executorService = Executors.newSingleThreadExecutor();
  }

  @Override
  public ClassLoader getClassLoader() {
    return loader;
  }

  @Override
  public TryResult evaluate(SimpleEvaluationObject seo, String code, ExecutionOptions executionOptions) {
    return evaluate(seo, new JavaWorkerThread(this, new JobDescriptor(code, seo, executionOptions)));
  }

  @Override
  public AutocompleteResult autocomplete(String code, int caretPosition) {
    return jac.find(code, caretPosition);
  }

  private JavaAutocomplete createJavaAutocomplete(JavaClasspathScanner c, Imports imports, ClassLoader loader) {
    return new JavaAutocomplete(c, loader, imports, autocompletePatterns);
  }

  private JavaAutocomplete createAutocomplete(JavaClasspathScanner cps, Imports imports, ClassLoader loader) {
    JavaAutocomplete jac = createJavaAutocomplete(cps, imports, loader);
    return jac;
  }

  private String createClasspath(Classpath classPath) {
    String cpp = "";
    for (String pt : classPath.getPathsAsStrings()) {
      cpp += pt;
      cpp += File.pathSeparator;
    }
    cpp += File.pathSeparator;
    cpp += System.getProperty("java.class.path");
    return cpp;
  }

  private JavaBeakerXUrlClassLoader newClassLoader() {
    JavaBeakerXUrlClassLoader loader = new JavaBeakerXUrlClassLoader(ClassLoader.getSystemClassLoader(), new PathToJar(outDir));
    loader.addInitPathToJars(getClasspath().getPaths());
    return loader;
  }

  public JavaBeakerXUrlClassLoader getJavaClassLoader() {
    return loader;
  }

  private JShell newJShell() {
    JShell jShell = JShell.create();
    for (ImportPath ip : getImports().getImportPaths()) {
      addImportToClassLoader(ip, jShell);
    }
    return jShell;
  }

}
