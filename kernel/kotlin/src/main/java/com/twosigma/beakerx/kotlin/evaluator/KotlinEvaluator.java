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
package com.twosigma.beakerx.kotlin.evaluator;

import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.autocomplete.ClasspathScanner;
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.evaluator.JobDescriptor;
import com.twosigma.beakerx.evaluator.TempFolderFactory;
import com.twosigma.beakerx.evaluator.TempFolderFactoryImpl;
import com.twosigma.beakerx.jvm.classloader.BeakerXUrlClassLoader;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.jvm.threads.BeakerCellExecutor;
import com.twosigma.beakerx.jvm.threads.CellExecutor;
import com.twosigma.beakerx.kernel.Classpath;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.PathToJar;
import org.jetbrains.kotlin.cli.common.repl.ReplClassLoader;
import org.jetbrains.kotlin.cli.jvm.repl.ReplInterpreter;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;

import static com.twosigma.beakerx.kotlin.evaluator.ReplWithClassLoaderFactory.createParentClassLoader;
import static com.twosigma.beakerx.kotlin.evaluator.ReplWithClassLoaderFactory.createReplWithKotlinParentClassLoader;
import static com.twosigma.beakerx.kotlin.evaluator.ReplWithClassLoaderFactory.createReplWithReplClassLoader;
import static com.twosigma.beakerx.kotlin.evaluator.ReplWithClassLoaderFactory.getImportString;
import static java.util.Collections.singletonList;

public class KotlinEvaluator extends BaseEvaluator {

  private ClasspathScanner cps;
  private ReplInterpreter repl;
  private ReplClassLoader loader = null;
  private BeakerXUrlClassLoader kotlinClassLoader;

  public KotlinEvaluator(String id, String sId, EvaluatorParameters evaluatorParameters) {
    this(id, sId, new BeakerCellExecutor("kotlin"), new TempFolderFactoryImpl(), evaluatorParameters);
  }

  public KotlinEvaluator(String id, String sId, CellExecutor cellExecutor, TempFolderFactory tempFolderFactory, EvaluatorParameters evaluatorParameters) {
    super(id, sId, cellExecutor, tempFolderFactory, evaluatorParameters);
    cps = new ClasspathScanner();
    createRepl();
  }

  @Override
  protected void doResetEnvironment() {
    String cpp = createClasspath(classPath, outDir);
    cps = new ClasspathScanner(cpp);
    createRepl();
    executorService.shutdown();
    executorService = Executors.newSingleThreadExecutor();
  }

  private void createRepl() {
    kotlinClassLoader = createParentClassLoader(this);
    ReplWithClassLoaderFactory.ReplWithClassLoader replWithClassLoader = createReplWithKotlinParentClassLoader(this, kotlinClassLoader);
    repl = replWithClassLoader.getRepl();
    loader = replWithClassLoader.getLoader();
  }

  @Override
  protected void addJarToClassLoader(PathToJar pathToJar) {
    kotlinClassLoader.addJar(pathToJar);
    repl = createReplWithReplClassLoader(this, loader);
  }

  @Override
  protected void addImportToClassLoader(ImportPath anImport) {
    repl.eval(getImportString(singletonList(anImport)));
  }

  @Override
  public ClassLoader getClassLoader() {
    return loader;
  }

  @Override
  public void exit() {
    super.exit();
    cancelExecution();
    executorService.shutdown();
  }

  @Override
  public TryResult evaluate(SimpleEvaluationObject seo, String code) {
    return evaluate(seo, new KotlinWorkerThread(this, new JobDescriptor(code, seo)));
  }

  @Override
  public AutocompleteResult autocomplete(String code, int caretPosition) {
    List<String> ret = new ArrayList<>();
    //TODO
    return new AutocompleteResult(ret, -1);
  }

  private String createClasspath(Classpath classPath, String outDir) {
    String cpp = "";
    for (String pt : classPath.getPathsAsStrings()) {
      cpp += pt;
      cpp += File.pathSeparator;
    }
    cpp += File.pathSeparator;
    cpp += outDir;
    cpp += File.pathSeparator;
    cpp += System.getProperty("java.class.path");
    return cpp;
  }

  public ReplInterpreter getRepl() {
    return repl;
  }
}
