/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.groovy.evaluator;

import com.twosigma.beakerx.BeakerXClient;
import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.autocomplete.MagicCommandAutocompletePatterns;
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.evaluator.ClasspathScanner;
import com.twosigma.beakerx.evaluator.JobDescriptor;
import com.twosigma.beakerx.evaluator.TempFolderFactory;
import com.twosigma.beakerx.evaluator.TempFolderFactoryImpl;
import com.twosigma.beakerx.groovy.autocomplete.GroovyAutocomplete;
import com.twosigma.beakerx.groovy.autocomplete.GroovyClasspathScanner;
import com.twosigma.beakerx.jvm.classloader.BeakerXUrlClassLoader;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.jvm.threads.BeakerCellExecutor;
import com.twosigma.beakerx.jvm.threads.CellExecutor;
import com.twosigma.beakerx.kernel.Classpath;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.ExecutionOptions;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.Imports;
import com.twosigma.beakerx.kernel.PathToJar;
import groovy.lang.Binding;
import groovy.lang.GroovyClassLoader;
import org.codehaus.groovy.control.customizers.ImportCustomizer;

import java.io.File;
import java.util.concurrent.Executors;

import static com.twosigma.beakerx.groovy.evaluator.EnvVariablesFilter.envVariablesFilter;
import static com.twosigma.beakerx.groovy.evaluator.GroovyClassLoaderFactory.addImportPathToImportCustomizer;
import static com.twosigma.beakerx.groovy.evaluator.GroovyClassLoaderFactory.newEvaluator;
import static com.twosigma.beakerx.groovy.evaluator.GroovyClassLoaderFactory.newParentClassLoader;


public class GroovyEvaluator extends BaseEvaluator {


  private GroovyClassLoader groovyClassLoader;
  private Binding scriptBinding = null;
  private ImportCustomizer icz;
  private BeakerXUrlClassLoader beakerxUrlClassLoader;
  private GroovyAutocomplete gac;

  public GroovyEvaluator(String id,
                         String sId,
                         EvaluatorParameters evaluatorParameters,
                         BeakerXClient beakerxClient,
                         MagicCommandAutocompletePatterns autocompletePatterns,
                         ClasspathScanner classpathScanner) {
    this(id,
            sId,
            new BeakerCellExecutor("groovy"),
            new TempFolderFactoryImpl(),
            evaluatorParameters,
            beakerxClient,
            autocompletePatterns,
            classpathScanner);
  }

  public GroovyEvaluator(String id,
                         String sId,
                         CellExecutor cellExecutor,
                         TempFolderFactory tempFolderFactory,
                         EvaluatorParameters evaluatorParameters,
                         BeakerXClient beakerxClient,
                         MagicCommandAutocompletePatterns autocompletePatterns,
                         ClasspathScanner classpathScanner) {
    super(id, sId, cellExecutor, tempFolderFactory, evaluatorParameters, beakerxClient, autocompletePatterns, classpathScanner);
    reloadClassloader();
    gac = createGroovyAutocomplete(new GroovyClasspathScanner(), groovyClassLoader, imports, autocompletePatterns);
    outDir = envVariablesFilter(outDir, System.getenv());
  }

  @Override
  public TryResult evaluate(SimpleEvaluationObject seo, String code, ExecutionOptions executionOptions) {
    return evaluate(seo, new GroovyWorkerThread(this, new JobDescriptor(code, seo, executionOptions)));
  }

  @Override
  public AutocompleteResult autocomplete(String code, int caretPosition) {
    return gac.find(code, caretPosition);
  }

  @Override
  protected void doResetEnvironment() {
    String cpp = createClasspath(classPath);
    reloadClassloader();
    gac = createGroovyAutocomplete(new GroovyClasspathScanner(cpp), groovyClassLoader, imports, autocompletePatterns);
    executorService.shutdown();
    executorService = Executors.newSingleThreadExecutor();
  }

  @Override
  public void exit() {
    super.exit();
    killAllThreads();
    executorService.shutdown();
    executorService = Executors.newSingleThreadExecutor();
  }

  @Override
  protected void addJarToClassLoader(PathToJar pathToJar) {
    this.beakerxUrlClassLoader.addJar(pathToJar);
  }

  @Override
  protected void addImportToClassLoader(ImportPath anImport) {
    addImportPathToImportCustomizer(icz, anImport);
  }

  private GroovyAutocomplete createGroovyAutocomplete(GroovyClasspathScanner c, GroovyClassLoader groovyClassLoader, Imports imports, MagicCommandAutocompletePatterns autocompletePatterns) {
    return new GroovyAutocomplete(c, groovyClassLoader, imports, autocompletePatterns);
  }

  private String createClasspath(Classpath classPath) {
    StringBuilder cppBuilder = new StringBuilder();
    for (String pt : classPath.getPathsAsStrings()) {
      cppBuilder.append(pt);
      cppBuilder.append(File.pathSeparator);
    }
    String cpp = cppBuilder.toString();
    cpp += File.pathSeparator;
    cpp += System.getProperty("java.class.path");
    return cpp;
  }

  @Override
  public ClassLoader getClassLoader() {
    return groovyClassLoader;
  }

  private void reloadClassloader() {
    this.beakerxUrlClassLoader = newParentClassLoader(getClasspath());
    this.icz = new ImportCustomizer();
    this.groovyClassLoader = newEvaluator(getImports(), getClasspath(), getOutDir(), icz, beakerxUrlClassLoader);
    this.scriptBinding = new Binding();
  }

  public GroovyClassLoader getGroovyClassLoader() {
    return groovyClassLoader;
  }

  public Binding getScriptBinding() {
    return scriptBinding;
  }
}
