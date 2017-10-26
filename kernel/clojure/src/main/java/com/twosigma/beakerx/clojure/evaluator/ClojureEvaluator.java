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
import clojure.lang.RT;
import clojure.lang.Var;
import com.google.common.base.Charsets;
import com.google.common.io.Resources;
import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.clojure.autocomplete.ClojureAutocomplete;
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.evaluator.JobDescriptor;
import com.twosigma.beakerx.evaluator.TempFolderFactory;
import com.twosigma.beakerx.evaluator.TempFolderFactoryImpl;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.jvm.threads.BeakerCellExecutor;
import com.twosigma.beakerx.jvm.threads.CellExecutor;
import com.twosigma.beakerx.kernel.ImportPath;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.StringReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class ClojureEvaluator extends BaseEvaluator {

  public static final String beaker_clojure_ns = "beaker_clojure_shell";
  private final static Logger logger = LoggerFactory.getLogger(ClojureEvaluator.class.getName());

  private List<String> requirements;
  private ClojureWorkerThread workerThread;
  private DynamicClassLoader loader;
  private Var clojureLoadString = null;

  public ClojureEvaluator(String id, String sId, CellExecutor cellExecutor, TempFolderFactory tempFolderFactory) {
    super(id, sId, cellExecutor, tempFolderFactory);
    requirements = new ArrayList<>();
    init();
    workerThread = new ClojureWorkerThread(this);
    workerThread.start();
  }

  public ClojureEvaluator(String id, String sId) {
    this(id, sId, new BeakerCellExecutor("clojure"), new TempFolderFactoryImpl());
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
  protected void doResetEnvironment() {
    loader = ClojureClassLoaderFactory.newInstance(classPath, outDir);

    ClassLoader oldLoader = Thread.currentThread().getContextClassLoader();
    Thread.currentThread().setContextClassLoader(loader);

    for (ImportPath s : imports.getImportPaths()) {
      String ss = s.asString();
      if (!ss.isEmpty()) {
        try {
          loader.loadClass(ss);
          clojureLoadString.invoke(String.format("(import '%s)", ss));
        } catch (ClassNotFoundException e) {
          logger.error("Could not find class while loading notebook: " + ss);
        }
      }
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
    workerThread.halt();
  }

  @Override
  public void exit() {
    super.exit();
    workerThread.doExit();
    cancelExecution();
    workerThread.halt();
  }

  @Override
  public void evaluate(SimpleEvaluationObject seo, String code) {
    workerThread.add(new JobDescriptor(code, seo));
  }

  @Override
  public AutocompleteResult autocomplete(String code, int caretPosition) {
    return ClojureAutocomplete.autocomplete(code, caretPosition, clojureLoadString, shellId);
  }

  Object runCode(String theCode) {
    return clojureLoadString.invoke(theCode);
  }

  private void init() {
    loader = ClojureClassLoaderFactory.newInstance(classPath, outDir);
    String loadFunctionPrefix = "run_str";
    try {
      String clojureInitScript = String.format(initScriptSource(), beaker_clojure_ns, shellId,
              loadFunctionPrefix);
      clojureLoadString = RT.var(String.format("%1$s_%2$s", beaker_clojure_ns, shellId),
              String.format("%1$s_%2$s", loadFunctionPrefix, shellId));
      clojure.lang.Compiler.load(new StringReader(clojureInitScript));
    } catch (IOException e) {
      logger.error(e.getMessage());
    }
  }

  private String initScriptSource() throws IOException {
    URL url = this.getClass().getClassLoader().getResource("init_clojure_script.txt");
    return Resources.toString(url, Charsets.UTF_8);
  }

  DynamicClassLoader getLoader() {
    return loader;
  }
}
