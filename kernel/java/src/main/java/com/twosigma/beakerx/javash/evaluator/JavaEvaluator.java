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
package com.twosigma.beakerx.javash.evaluator;

import com.twosigma.beakerx.BeakerXClient;
import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.autocomplete.MagicCommandAutocompletePatterns;
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.evaluator.ClasspathScanner;
import com.twosigma.beakerx.evaluator.JobDescriptor;
import com.twosigma.beakerx.evaluator.TempFolderFactory;
import com.twosigma.beakerx.evaluator.TempFolderFactoryImpl;
import com.twosigma.beakerx.javash.JavaBeakerXUrlClassLoader;
import com.twosigma.beakerx.javash.autocomplete.JavaAutocomplete;
import com.twosigma.beakerx.javash.autocomplete.JavaClasspathScanner;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.jvm.threads.BeakerCellExecutor;
import com.twosigma.beakerx.jvm.threads.CellExecutor;
import com.twosigma.beakerx.kernel.Classpath;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.ExecutionOptions;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.Imports;
import com.twosigma.beakerx.kernel.PathToJar;

import java.io.File;
import java.util.concurrent.Executors;

public class JavaEvaluator extends BaseEvaluator {

  public static final String WRAPPER_CLASS_NAME = "BeakerWrapperClass1261714175";
  private final String packageId;
  private JavaAutocomplete jac;
  private JavaBeakerXUrlClassLoader loader = null;

  public JavaEvaluator(String id,
                       String sId,
                       EvaluatorParameters evaluatorParameters,
                       BeakerXClient beakerxClient,
                       MagicCommandAutocompletePatterns autocompletePatterns,
                       ClasspathScanner classpathScanner) {
    this(id, sId, new BeakerCellExecutor("javash"), new TempFolderFactoryImpl(), evaluatorParameters, beakerxClient, autocompletePatterns, classpathScanner);
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
    packageId = "com.twosigma.beaker.javash.bkr" + shellId.split("-")[0];
    loader = newClassLoader();
    jac = createJavaAutocomplete(new JavaClasspathScanner(), imports, loader);
  }

  @Override
  public ClassLoader getClassLoaderForImport() {
    return getJavaClassLoader().getJavaURLClassLoader();
  }

  @Override
  protected void doResetEnvironment() {
    String cpp = createClasspath(classPath, outDir);
    loader = newClassLoader();
    jac = createAutocomplete(new JavaClasspathScanner(cpp), imports, loader);
    executorService.shutdown();
    executorService = Executors.newSingleThreadExecutor();
  }

  @Override
  protected void addJarToClassLoader(PathToJar pathToJar) {
    loader.addJar(pathToJar);
  }

  @Override
  protected void addImportToClassLoader(ImportPath anImport) {

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

  private String createClasspath(Classpath classPath, String outDir) {
    String cpp = "";
    for (String pt : classPath.getPathsAsStrings()) {
      cpp += pt;
      cpp += File.pathSeparator;
    }
    cpp += File.pathSeparator;
    cpp += System.getProperty("java.class.path");
    return cpp;
  }

  public String getPackageId() {
    return packageId;
  }

  private JavaBeakerXUrlClassLoader newClassLoader() {
    JavaBeakerXUrlClassLoader loader = new JavaBeakerXUrlClassLoader(ClassLoader.getSystemClassLoader(), new PathToJar(outDir));
    loader.addInitPathToJars(getClasspath().getPaths());
    return loader;
  }

  public JavaBeakerXUrlClassLoader getJavaClassLoader() {
    return loader;
  }
}
