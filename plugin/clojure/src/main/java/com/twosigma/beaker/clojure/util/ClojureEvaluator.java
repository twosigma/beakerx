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

import com.google.common.base.Charsets;
import com.google.common.io.Resources;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringReader;
import java.io.StringWriter;
import java.lang.reflect.InvocationTargetException;
import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.FileSystems;
import java.nio.file.Files;
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

import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beaker.jvm.threads.BeakerCellExecutor;

import com.google.inject.Inject;
import com.google.inject.Provider;

public class ClojureEvaluator {
  protected final String shellId;
  protected final String sessionId;
  protected List<String> classPath;
  protected List<String> imports;
  protected String outDir;
  protected boolean exit;
  protected boolean updateLoader;
  protected final BeakerCellExecutor executor;
  protected workerThread myWorker;
  protected String currentClassPath;
  protected String currentImports;

  protected class jobDescriptor {
    String codeToBeExecuted;
    SimpleEvaluationObject outputObject;

    jobDescriptor(String c, SimpleEvaluationObject o) {
      codeToBeExecuted = c;
      outputObject = o;
    }
  }

  protected static final String beaker_clojure_ns = "beaker_clojure_shell";
  protected Var clojureLoadString = null;
  protected final Semaphore syncObject = new Semaphore(0, true);
  protected final ConcurrentLinkedQueue<jobDescriptor> jobQueue = new ConcurrentLinkedQueue<jobDescriptor>();

  public ClojureEvaluator(String id, String sId) {
    shellId = id;
    sessionId = sId;
    classPath = new ArrayList<String>();
    imports = new ArrayList<String>();
    String loadFunctionPrefix = "run_str";

    try {
      URL url = this.getClass().getClassLoader().getResource("init_clojure_script.txt");
      String clojureInitScript = String.format(Resources.toString(url, Charsets.UTF_8), beaker_clojure_ns, shellId, loadFunctionPrefix, NSClientProxy.class.getName(), sessionId);
      clojureLoadString = RT.var(String.format("%1$s_%2$s", beaker_clojure_ns, shellId), String.format("%1$s_%2$s", loadFunctionPrefix, shellId));
      clojure.lang.Compiler.load(new StringReader(clojureInitScript));
    } catch (IOException e) {
      Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, null, e);
    }

    exit = false;
    updateLoader = false;
    currentClassPath = "";
    currentImports = "";
    outDir = FileSystems.getDefault().getPath(System.getenv("beaker_tmp_dir"), "dynclasses", sessionId).toString();
    try {
      (new File(outDir)).mkdirs();
    } catch (Exception e) {
    }
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
    updateLoader = true;
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
          Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, null, e);
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
        theOutput.setOutputHandler();
        Object result;
        try {
          if (clojureLoadString != null)
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
      }
    }
  }
}
