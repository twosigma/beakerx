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

package com.twosigma.beaker.clojure.util;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringReader;
import java.io.StringWriter;
import java.lang.reflect.InvocationTargetException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLClassLoader;
import java.nio.file.FileSystems;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.Semaphore;
import java.util.logging.Level;
import java.util.logging.Logger;

import clojure.lang.RT;
import clojure.lang.Var;

import com.twosigma.beaker.jvm.classloader.DynamicClassLoaderSimple;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.jvm.threads.BeakerCellExecutor;

public class ClojureEvaluator {
  protected final String shellId;
  protected final String sessionId;
  protected List<String> classPath;
  protected List<String> imports;
  protected boolean exit;
  protected boolean updateLoader;
  protected final BeakerCellExecutor executor;
  protected workerThread myWorker;
  protected String currentClassPath;
  protected String currentImports;
  protected URLClassLoader loader;

  protected class jobDescriptor {
    String codeToBeExecuted;
    SimpleEvaluationObject outputObject;

    jobDescriptor(String c, SimpleEvaluationObject o) {
      codeToBeExecuted = c;
      outputObject = o;
    }
  }

  protected static final String beaker_clojure_ns = "beaker_clojure_shell";
  protected final Var clojureLoadString; //= RT.var("clojure.core", "load-string");
  protected final Semaphore syncObject = new Semaphore(0, true);
  protected final ConcurrentLinkedQueue<jobDescriptor> jobQueue = new ConcurrentLinkedQueue<jobDescriptor>();

  public ClojureEvaluator(String id, String sId) {
    shellId = id;
    sessionId = sId;
    classPath = new ArrayList<String>();
    imports = new ArrayList<String>();

    String run_str = String.format("(ns %1$s_%2$s)(defn run-str_%2$s [s] (binding [*ns* (find-ns '%1$s_%2$s)] (load-string s)))", beaker_clojure_ns, shellId);
    clojureLoadString = RT.var(String.format("%1$s_%2$s", beaker_clojure_ns, shellId), String.format("run-str_%s", shellId));
    clojure.lang.Compiler.load(new StringReader(run_str));

    exit = false;
    updateLoader = false;
    currentClassPath = "";
    currentImports = "";
    executor = new BeakerCellExecutor("clojure");
    startWorker();
  }

  protected void startWorker() {
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

    List<URL> urlList = new ArrayList<>();
    for (String path : classPath) {
      try {
        urlList.add(Paths.get(path).toUri().toURL());
      } catch (MalformedURLException e) {
        Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, null, e);
      }
    }
    loader = new URLClassLoader(urlList.toArray(new URL[urlList.size()]));
    ClassLoader oldLoader = Thread.currentThread().getContextClassLoader();
    Thread.currentThread().setContextClassLoader(loader);

    for (String s : imports) {
      if (s != null & !s.isEmpty())
        try {
          clojureLoadString.invoke(String.format("(import '%s)", s));
        } catch (Exception e) {
          Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, null, e);
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

  public void evaluate(SimpleEvaluationObject seo, String code) {
    // send job to thread
    jobQueue.add(new jobDescriptor(code, seo));
    syncObject.release();
  }

  protected class workerThread extends Thread {

    public workerThread() {
      super("clojure worker");
    }

    /*
     * This thread performs all the evaluation
     */

    public void run() {
      jobDescriptor j = null;

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
          e.printStackTrace();
        }
      }
    }

    protected class MyRunnable implements Runnable {

      protected final String theCode;
      protected final SimpleEvaluationObject theOutput;

      public MyRunnable(String code, SimpleEvaluationObject out) {
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

          theOutput.finished(clojureLoadString.invoke(theCode));

        } catch (Throwable e) {
          if (e instanceof InterruptedException || e instanceof InvocationTargetException || e instanceof ThreadDeath) {
            theOutput.error("... cancelled!");
          } else {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            theOutput.error(sw.toString());
          }
        }
        theOutput.setOutputHandler();
        Thread.currentThread().setContextClassLoader(oldLoader);
      }
    }
  }

  public void setShellOptions(String cp, String in) throws IOException {

    // check if we are not changing anything
    if (currentClassPath.equals(cp) && currentImports.equals(in))
      return;

    currentClassPath = cp;
    currentImports = in;

    if (cp.isEmpty())
      classPath = new ArrayList<String>();
    else
      classPath = Arrays.asList(cp.split("[\\s" + File.pathSeparatorChar + "]+"));
    if (in.isEmpty())
      imports = new ArrayList<String>();
    else
      imports = Arrays.asList(in.split("\\s+"));

    resetEnvironment();
  }
}
