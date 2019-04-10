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

package com.twosigma.beakerx.clojure.evaluator;

import clojure.lang.DynamicClassLoader;
import clojure.lang.Namespace;
import clojure.lang.RT;
import clojure.lang.Symbol;
import clojure.lang.Var;
import com.twosigma.beakerx.BeakerXClient;
import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.autocomplete.MagicCommandAutocompletePatterns;
import com.twosigma.beakerx.clojure.autocomplete.ClojureAutocomplete;
import com.twosigma.beakerx.clojure.autotranslation.NSClientProxy;
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.evaluator.ClasspathScanner;
import com.twosigma.beakerx.evaluator.JobDescriptor;
import com.twosigma.beakerx.evaluator.TempFolderFactory;
import com.twosigma.beakerx.evaluator.TempFolderFactoryImpl;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.jvm.threads.BeakerCellExecutor;
import com.twosigma.beakerx.jvm.threads.CellExecutor;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.kernel.ExecutionOptions;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.PathToJar;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;

public class ClojureEvaluator extends BaseEvaluator {

  public static final String beaker_clojure_ns = "beaker_clojure_shell";
  private final static Logger logger = LoggerFactory.getLogger(ClojureEvaluator.class.getName());

  private List<String> requirements;
  private DynamicClassLoader loader;
  private Var clojureLoadString = null;
  private ClojureAutocomplete clojureAutocomplete;

  public ClojureEvaluator(String id,
                          String sId,
                          CellExecutor cellExecutor,
                          TempFolderFactory tempFolderFactory,
                          EvaluatorParameters evaluatorParameters,
                          BeakerXClient beakerxClient,
                          MagicCommandAutocompletePatterns autocompletePatterns,
                          ClasspathScanner classpathScanner) {
    super(id, sId, cellExecutor, tempFolderFactory, evaluatorParameters, beakerxClient, autocompletePatterns,classpathScanner);
    requirements = new ArrayList<>();
    init();
  }

  public ClojureEvaluator(String id, String sId, EvaluatorParameters evaluatorParameters, BeakerXClient beakerxClient, MagicCommandAutocompletePatterns autocompletePatterns,ClasspathScanner classpathScanner) {
    this(id,
            sId,
            new BeakerCellExecutor("clojure"),
            new TempFolderFactoryImpl(),
            evaluatorParameters,
            beakerxClient,
            autocompletePatterns,
            classpathScanner);
  }

  @Override
  public void resetEnvironment() {
    killClojureThreads();
    super.resetEnvironment();
  }

  private void killClojureThreads() {
    runCode("(import 'clojure.lang.Agent)\n" +
            "(.shutdownNow Agent/soloExecutor)\n" +
            "(import 'java.util.concurrent.Executors) \n" +
            "(set! Agent/soloExecutor (Executors/newCachedThreadPool))");
  }

  @Override
  protected void addJarToClassLoader(PathToJar pathToJar) {
    loader.addURL(pathToJar.getUrl());
  }

  @Override
  protected void addImportToClassLoader(ImportPath anImport) {
    addImportPathToShell(anImport);
  }

  @Override
  protected void doResetEnvironment() {
    init();
    ClassLoader oldLoader = Thread.currentThread().getContextClassLoader();
    Thread.currentThread().setContextClassLoader(loader);
    for (ImportPath s : imports.getImportPaths()) {
      addImportPathToShell(s);
    }

    for (String s : requirements) {
      if (s != null && !s.isEmpty())
        try {
          clojureLoadString.invoke(String.format("(require '%s)", s));
        } catch (Exception e) {
          logger.error(e.getMessage());
        }
    }

    Thread.currentThread().setContextClassLoader(oldLoader);
    executorService.shutdown();
    executorService = Executors.newSingleThreadExecutor();
  }

  private void addImportPathToShell(ImportPath s) {
    ClassLoader oldLoader = Thread.currentThread().getContextClassLoader();
    Thread.currentThread().setContextClassLoader(loader);
    String ss = s.asString();
    if (!ss.isEmpty()) {
      try {
        loader.loadClass(ss);
        clojureLoadString.invoke(String.format("(import '%s)", ss));
      } catch (ClassNotFoundException e) {
        throw new RuntimeException("Could not create class while loading notebook: " + ss);
      } finally {
        Thread.currentThread().setContextClassLoader(oldLoader);
      }
    }
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
    return evaluate(seo, new ClojureWorkerThread(this, new JobDescriptor(code, seo, executionOptions)));
  }

  @Override
  public AutocompleteResult autocomplete(String code, int caretPosition) {
    return clojureAutocomplete.find(code, caretPosition);
  }

  Object runCode(String theCode) {
    return clojureLoadString.invoke(theCode);
  }

  private void init() {
    loader = ClojureClassLoaderFactory.newInstance(classPath, outDir);
    String loadFunctionPrefix = "run_str";
    try {
      String clojureInitScript = String.format(initScriptSource(),
              beaker_clojure_ns,
              shellId,
              loadFunctionPrefix,
              NSClientProxy.class.getName());
      String ns = String.format("%1$s_%2$s", beaker_clojure_ns, shellId);
      clearClojureNamespace(ns);
      clojureLoadString = RT.var(ns, String.format("%1$s_%2$s", loadFunctionPrefix, shellId));
      clojure.lang.Compiler.load(new StringReader(clojureInitScript));
    } catch (Exception e) {
      logger.error(e.getMessage());
    }
    clojureAutocomplete = new ClojureAutocomplete(clojureLoadString, shellId, autocompletePatterns);
  }

  private void clearClojureNamespace(String ns) {
    Namespace.remove(Symbol.intern(null, ns));
  }

  private String initScriptSource() throws Exception {
    InputStream in = this.getClass().getResourceAsStream("/init_clojure_script.txt");
    BufferedReader reader = new BufferedReader(new InputStreamReader(in));
    StringBuilder result = new StringBuilder("");
    String line;
    while ((line = reader.readLine()) != null) {
      result.append(line).append(System.lineSeparator());
    }
    in.close();
    return result.toString();
  }

}
