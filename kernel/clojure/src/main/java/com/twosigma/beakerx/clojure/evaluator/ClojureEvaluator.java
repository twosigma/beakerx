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

import clojure.lang.RT;
import clojure.lang.Var;
import com.google.common.base.Charsets;
import com.google.common.io.Resources;
import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.evaluator.InternalVariable;
import com.twosigma.beakerx.jvm.classloader.DynamicClassLoaderSimple;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.jvm.threads.BeakerCellExecutor;
import com.twosigma.beakerx.jvm.threads.CellExecutor;
import com.twosigma.beakerx.kernel.Classpath;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.Imports;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringReader;
import java.io.StringWriter;
import java.lang.reflect.InvocationTargetException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class ClojureEvaluator extends BaseEvaluator {

  private final static Logger logger = LoggerFactory.getLogger(ClojureEvaluator.class.getName());

  private List<String> requirements;
  private boolean exit;
  private workerThread myWorker;
  private String currenClojureNS;
  private DynamicClassLoaderSimple loader;
  private static final String beaker_clojure_ns = "beaker_clojure_shell";
  private Var clojureLoadString = null;

  private String initScriptSource()
          throws IOException {
    URL url = this.getClass().getClassLoader().getResource("init_clojure_script.txt");
    return Resources.toString(url, Charsets.UTF_8);
  }

  public ClojureEvaluator(String id, String sId, CellExecutor cellExecutor) {
    super(id, sId, cellExecutor);
    requirements = new ArrayList<>();
    init();
    startWorker();
  }

  public ClojureEvaluator(String id, String sId) {
    this(id, sId, new BeakerCellExecutor("clojure"));
  }

  private void init() {

    loader = new DynamicClassLoaderSimple(ClassLoader.getSystemClassLoader());
    loader.addJars(classPath.getPathsAsStrings());
    loader.addDynamicDir(outDir);

    String loadFunctionPrefix = "run_str";
    currenClojureNS = String.format("%1$s_%2$s", beaker_clojure_ns, shellId);

    try {
      String clojureInitScript = String.format(initScriptSource(), beaker_clojure_ns, shellId,
              loadFunctionPrefix);
      clojureLoadString = RT.var(String.format("%1$s_%2$s", beaker_clojure_ns, shellId),
              String.format("%1$s_%2$s", loadFunctionPrefix, shellId));
      clojure.lang.Compiler.load(new StringReader(clojureInitScript));
    } catch (IOException e) {
      logger.error(e.getMessage());
    }
    exit = false;
  }

  private void startWorker() {
    myWorker = new workerThread();
    myWorker.start();
  }

  public String getShellId() {
    return shellId;
  }

  public void killAllThreads() {
    executor.killAllThreads();
  }

  public void cancelExecution() {
    executor.cancelExecution();
  }

  public void resetEnvironment() {
    executor.killAllThreads();

    loader = new DynamicClassLoaderSimple(ClassLoader.getSystemClassLoader());
    loader.addJars(classPath.getPathsAsStrings());
    loader.addDynamicDir(outDir);

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

    syncObject.release();
  }

  public void exit() {
    exit = true;
    cancelExecution();
    syncObject.release();
  }

  @Override
  public Classpath getClasspath() {
    return this.classPath;
  }

  @Override
  public Imports getImports() {
    return this.imports;
  }

  public void evaluate(SimpleEvaluationObject seo, String code) {
    // send job to thread
    jobQueue.add(new JobDescriptor(code, seo));
    syncObject.release();
  }

  private class workerThread extends Thread {

    public workerThread() {
      super("clojure worker");
    }

    /*
     * This thread performs all the evaluation
     */

    public void run() {
      JobDescriptor j = null;

      while (!exit) {
        try {
          // wait for work
          syncObject.acquire();

          // get next job descriptor
          j = jobQueue.poll();
          if (j == null)
            continue;

          j.outputObject.started();

          if (!executor.executeTask(new MyRunnable(j.codeToBeExecuted, j.outputObject))) {
            j.outputObject.error("... cancelled!");
          }
        } catch (Throwable e) {
          logger.error(e.getMessage());
        } finally {
          if (j != null && j.outputObject != null) {
            j.outputObject.executeCodeCallback();
          }
        }
      }
    }

    private class MyRunnable implements Runnable {

      private final String theCode;
      private final SimpleEvaluationObject theOutput;

      private MyRunnable(String code, SimpleEvaluationObject out) {
        theCode = code;
        theOutput = out;
      }

      @Override
      public void run() {

        ClassLoader oldLoader = Thread.currentThread().getContextClassLoader();
        Thread.currentThread().setContextClassLoader(loader);

        theOutput.setOutputHandler();
        Object result;
        try {
          InternalVariable.setValue(theOutput);
          Object o = clojureLoadString.invoke(theCode);
          try {
            //workaround, checking of corrupted clojure objects
            if (null != o) {
              o.hashCode();
            }
            theOutput.finished(o);
          } catch (Exception e) {
            theOutput.error("Object: " + o.getClass() + ", value cannot be displayed due to following error: " + e.getMessage());
          }
        } catch (Throwable e) {
          if (e instanceof InterruptedException || e instanceof InvocationTargetException || e instanceof ThreadDeath) {
            theOutput.error("... cancelled!");
          } else {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            if (null != e.getCause()) {
              e.getCause().printStackTrace(pw);
            } else {
              e.printStackTrace(pw);
            }
            theOutput.error(sw.toString());
          }
        }
        theOutput.setOutputHandler();
        Thread.currentThread().setContextClassLoader(oldLoader);
      }
    }
  }

  public AutocompleteResult autocomplete(String code, int caretPosition) {

    int i = caretPosition;
    while (i > 0) {
      char c = code.charAt(i - 1);
      if (!Character.isUnicodeIdentifierStart(c) || "[]{}()/\\".indexOf(c) >= 0) {
        break;
      } else {
        i--;
      }
    }

    String _code = code.substring(i, caretPosition);

    String apropos = "(repl_%1$s/apropos \"%2$s\")";

    Object o = clojureLoadString.invoke(String.format(apropos, shellId, _code));
    List<String> result = new ArrayList<String>();

    for (Object s : ((Collection) o)) {

      String whole = s.toString();
      int d = whole.indexOf('/');

      if (d > 0) {
        String woNS = whole.substring(d + 1);
        String ns = whole.substring(0, d);
        result.add(woNS);
        if (!currenClojureNS.equals(ns) && !"clojure.core".equals(ns)) result.add(whole);
      } else {
        result.add(whole);
      }

    }

    return new AutocompleteResult(result, i);
  }
}
