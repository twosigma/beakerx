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
import java.net.URL;
import java.nio.file.FileSystems;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.Semaphore;
import java.util.logging.Level;
import java.util.logging.Logger;

import clojure.lang.RT;
import clojure.lang.Var;

import com.twosigma.beaker.jvm.classloader.DynamicClassLoaderSimple;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beaker.jvm.threads.BeakerCellExecutor;

public class ClojureEvaluator {
  protected final String shellId;
  protected final String sessionId;
  protected List<String> classPath;
  protected List<String> imports;
  protected List<String> requirements;
  protected boolean exit;
  protected boolean updateLoader;
  protected final BeakerCellExecutor executor;
  protected workerThread myWorker;
  protected String currentClassPath = "";
  protected String currentImports = "";
  protected String outDir = "";
  protected String currenClojureNS;
  protected String currentRequirements = "";
  protected DynamicClassLoaderSimple loader;

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
    requirements = new ArrayList<>();
    String loadFunctionPrefix = "run_str";
    currenClojureNS = String.format("%1$s_%2$s", beaker_clojure_ns, shellId);

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

    loader = new DynamicClassLoaderSimple(ClassLoader.getSystemClassLoader());
    loader.addJars(classPath);
    loader.addDynamicDir(outDir);

    ClassLoader oldLoader = Thread.currentThread().getContextClassLoader();
    Thread.currentThread().setContextClassLoader(loader);

    for (String s : imports) {
      if (s != null & !s.isEmpty())
        try {
          loader.loadClass(s);
          clojureLoadString.invoke(String.format("(import '%s)", s));
        } catch (Exception e) {
          Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, null, e);
        }
    }

    for (String s : requirements) {
      if (s != null && !s.isEmpty())
        try {
          clojureLoadString.invoke(String.format("(require '%s)", s));
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

        ClassLoader oldLoader = Thread.currentThread().getContextClassLoader();
        Thread.currentThread().setContextClassLoader(loader);

        theOutput.setOutputHandler();
        Object result;
        try {
          Object o = clojureLoadString.invoke(theCode);
          try {
            //workaround, checking of corrupted clojure objects
            o.hashCode();
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
            e.printStackTrace(pw);
            theOutput.error(sw.toString());
          }
        }
        theOutput.setOutputHandler();
        Thread.currentThread().setContextClassLoader(oldLoader);
      }
    }
  }

  public void setShellOptions(String cp, String in, String od, String req) throws IOException {

    if (od == null || od.isEmpty()) {
      od = FileSystems.getDefault().getPath(System.getenv("beaker_tmp_dir"), "dynclasses", sessionId).toString();
    } else {
      od = od.replace("$BEAKERDIR", System.getenv("beaker_tmp_dir"));
    }
    // check if we are not changing anything
    if (currentClassPath.equals(cp) && currentImports.equals(in) && outDir.equals(od) && currentRequirements.equals(req))
      return;

    outDir = od;

    if(!currentClassPath.equals(cp)) {
      currentClassPath = cp;
      if (cp.isEmpty())
        classPath = new ArrayList<String>();
      else
        classPath = Arrays.asList(cp.split("[\\s" + File.pathSeparatorChar + "]+"));
    }

    if (!currentImports.equals(in))
    {
      currentImports = in;
      if (in.isEmpty())
        imports = new ArrayList<String>();
      else
        imports = Arrays.asList(in.split("\\s+"));
    }

    if (!currentRequirements.equals(req))
    {
      currentRequirements = req;
      if (req.isEmpty())
        requirements = new ArrayList<String>();
      else
        requirements = Arrays.asList(req.split("\\R"));
    }

    resetEnvironment();
  }

  public List<String> autocomplete(String code, int caretPosition) {

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

    for(Object s : ((Collection) o)) {

      String whole = s.toString();
      int d = whole.indexOf('/');

      if(d > 0)  {
        String woNS = whole.substring(d + 1);
        String ns =  whole.substring(0, d);
        result.add(woNS);
        if(!currenClojureNS.equals(ns) && !"clojure.core".equals(ns)) result.add(whole);
      } else {
        result.add(whole);
      }

    }

    return result;
  }
}
