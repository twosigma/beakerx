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

import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.evaluator.JobDescriptor;
import com.twosigma.beakerx.evaluator.TempFolderFactory;
import com.twosigma.beakerx.evaluator.TempFolderFactoryImpl;
import com.twosigma.beakerx.groovy.autocomplete.GroovyAutocomplete;
import com.twosigma.beakerx.groovy.autocomplete.GroovyClasspathScanner;
import com.twosigma.beakerx.jvm.classloader.BeakerxUrlClassLoader;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.jvm.threads.BeakerCellExecutor;
import com.twosigma.beakerx.jvm.threads.CellExecutor;
import com.twosigma.beakerx.kernel.Classpath;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.PathToJar;
import groovy.lang.Binding;
import groovy.lang.GroovyClassLoader;
import org.codehaus.groovy.control.customizers.ImportCustomizer;

import java.io.File;

import static com.twosigma.beakerx.groovy.evaluator.EnvVariablesFilter.envVariablesFilter;
import static com.twosigma.beakerx.groovy.evaluator.GroovyClassLoaderFactory.addImportPathToImportCustomizer;
import static com.twosigma.beakerx.groovy.evaluator.GroovyClassLoaderFactory.newEvaluator;
import static com.twosigma.beakerx.groovy.evaluator.GroovyClassLoaderFactory.newParentClassLoader;


public class GroovyEvaluator extends BaseEvaluator {

  public static boolean LOCAL_DEV = false;

  private GroovyClasspathScanner cps;
  private GroovyAutocomplete gac;
  private GroovyWorkerThread worker = null;
  private GroovyClassLoader groovyClassLoader;
  private Binding scriptBinding = null;
  private ImportCustomizer icz = new ImportCustomizer();
  private BeakerxUrlClassLoader beakerxUrlClassLoader;

  public GroovyEvaluator(String id, String sId, EvaluatorParameters evaluatorParameters) {
    this(id, sId, new BeakerCellExecutor("groovy"), new TempFolderFactoryImpl(), evaluatorParameters);
  }

  public GroovyEvaluator(String id, String sId, CellExecutor cellExecutor, TempFolderFactory tempFolderFactory, EvaluatorParameters evaluatorParameters) {
    super(id, sId, cellExecutor, tempFolderFactory, evaluatorParameters);
    cps = new GroovyClasspathScanner();
    gac = createGroovyAutocomplete(cps);
    outDir = envVariablesFilter(outDir, System.getenv());
    reloadClassloader();
    worker = new GroovyWorkerThread(this);
    worker.start();
  }

  @Override
  public void evaluate(SimpleEvaluationObject seo, String code) {
    worker.add(new JobDescriptor(code, seo));
  }

  @Override
  public AutocompleteResult autocomplete(String code, int caretPosition) {
    return gac.doAutocomplete(code, caretPosition, groovyClassLoader, imports);
  }

  @Override
  protected void doResetEnvironment() {
    String cpp = createClasspath(classPath);
    cps = new GroovyClasspathScanner(cpp);
    gac = createGroovyAutocomplete(cps);
    reloadClassloader();
    worker.halt();
  }

  @Override
  public void exit() {
    super.exit();
    worker.doExit();
    cancelExecution();
    worker.halt();
  }

  @Override
  public boolean addJarToClasspath(PathToJar path) {
    return super.addJarToClasspath(new PathToJar(envVariablesFilter(path.getPath(), System.getenv())));
  }

  @Override
  protected void addJarToClassLoader(PathToJar pathToJar) {
    this.beakerxUrlClassLoader.addJar(pathToJar);
    //this.groovyClassLoader.addClasspath(pathToJar.getPath());
  }

  @Override
  protected void addImportToClassLoader(ImportPath anImport) {
    addImportPathToImportCustomizer(icz, anImport);
  }

  private GroovyAutocomplete createGroovyAutocomplete(GroovyClasspathScanner c) {
    return new GroovyAutocomplete(c);
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
    beakerxUrlClassLoader = newParentClassLoader(getClasspath());
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
