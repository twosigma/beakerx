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

package com.twosigma.beaker.scala.util;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.InvocationTargetException;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.FileSystems;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.Semaphore;

import com.twosigma.beaker.scala.util.ScalaEvaluatorGlue;
import com.twosigma.beaker.NamespaceClient;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.jvm.threads.BeakerCellExecutor;

public class ScalaEvaluator {
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

    jobDescriptor(String c , SimpleEvaluationObject o) {
      codeToBeExecuted = c;
      outputObject = o;
    }
  }

  protected final Semaphore syncObject = new Semaphore(0, true);
  protected final ConcurrentLinkedQueue<jobDescriptor> jobQueue = new ConcurrentLinkedQueue<jobDescriptor>();

  public ScalaEvaluator(String id, String sId) {
    shellId = id;
    sessionId = sId;
    classPath = new ArrayList<String>();
    imports = new ArrayList<String>();
    exit = false;
    updateLoader = false;
    currentClassPath = "";
    currentImports = "";
    outDir = FileSystems.getDefault().getPath(System.getenv("beaker_tmp_dir"),"dynclasses",sessionId).toString();
    try { (new File(outDir)).mkdirs(); } catch (Exception e) { }
    executor = new BeakerCellExecutor("scala");
    startWorker();
  }

  protected void startWorker() {
    myWorker = new workerThread();
    myWorker.start();
  }

  public String getShellId() { return shellId; }

  public void killAllThreads() {
    executor.killAllThreads();
  }

  public void cancelExecution() {
    executor.cancelExecution();
  }

  public void resetEnvironment() {
    executor.killAllThreads();
    updateLoader=true;
    syncObject.release();
    try {
      newAutoCompleteEvaluator();
    } catch(MalformedURLException e) { }
  } 

  public void exit() {
    exit = true;
    cancelExecution();
    syncObject.release();
  }

  public void setShellOptions(String cp, String in, String od) throws IOException {
    if (od==null || od.isEmpty()) {
      od = FileSystems.getDefault().getPath(System.getenv("beaker_tmp_dir"),"dynclasses",sessionId).toString();
    } else {
      od = od.replace("$BEAKERDIR",System.getenv("beaker_tmp_dir"));
    }
    
    // check if we are not changing anything
    if (currentClassPath.equals(cp) && currentImports.equals(in) && outDir.equals(od))
      return;

    currentClassPath = cp;
    currentImports = in;
    outDir = od;

    if(cp==null || cp.isEmpty())
      classPath = new ArrayList<String>();
    else
      classPath = Arrays.asList(cp.split("[\\s]+"));
    if (imports==null || in.isEmpty())
      imports = new ArrayList<String>();
    else
      imports = Arrays.asList(in.split("\\s+"));

    try { (new File(outDir)).mkdirs(); } catch (Exception e) { }
    
    resetEnvironment();
  }

  public void evaluate(SimpleEvaluationObject seo, String code) {
    // send job to thread
    jobQueue.add(new jobDescriptor(code,seo));
    syncObject.release();
  }

  public List<String> autocomplete(String code, int caretPosition) {    
    if(acshell != null) {
      String [] sv = code.substring(0, caretPosition).split("\n");
      for ( int i=0; i<sv.length-1; i++) {
        acshell.evaluate2(sv[i]);
        caretPosition -= sv[i].length()+1;
      }
      ArrayList<CharSequence> ret = acshell.autocomplete(sv[sv.length-1], caretPosition);
      ArrayList<String> r2 = new ArrayList<String>();
      for(CharSequence c : ret)
        r2.add(c.toString());
      return r2;
    }
    return null;
  }

  protected ScalaDynamicClassLoader loader = null;
  protected ScalaEvaluatorGlue shell;
  protected ScalaDynamicClassLoader acloader = null;
  protected ScalaEvaluatorGlue acshell;

  protected class workerThread extends Thread {

    public workerThread() {
      super("scala worker");
    }

    /*
     * This thread performs all the evaluation
     */

    public void run() {
      jobDescriptor j = null;
      NamespaceClient nc = null;

      while(!exit) {
        try {
          // wait for work
          syncObject.acquire();

          // check if we must create or update class loader
          if(updateLoader) {
            shell = null;
          }

          // get next job descriptor
          j = jobQueue.poll();
          if(j==null)
            continue;

          if (shell==null) {
            updateLoader=false;
            newEvaluator();
          }

          if(loader!=null)
            loader.clearCache();

          j.outputObject.started();

          nc = NamespaceClient.getBeaker(sessionId);
          nc.setOutputObj(j.outputObject);
          if (!executor.executeTask(new MyRunnable(j.codeToBeExecuted, j.outputObject))) {
            j.outputObject.error("... cancelled!");
          }
          if(nc!=null) {
            nc.setOutputObj(null);
            nc = null;
          }
        } catch(Throwable e) {
          e.printStackTrace();
        } finally {
          if(nc!=null) {
            nc.setOutputObj(null);
            nc = null;
          }
        }
      }
      NamespaceClient.delBeaker(sessionId);
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
          shell.evaluate(theOutput, theCode);
        } catch(Throwable e) {
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
      
    };

    protected ClassLoader newClassLoader() throws MalformedURLException
    {
      URL[] urls = {};
      if (!classPath.isEmpty()) {
        urls = new URL[classPath.size()];
        for (int i = 0; i < classPath.size(); i++) {
          urls[i] = new URL("file://" + classPath.get(i));
          System.out.println(urls[i].toString());
        }
      }
      loader = null;
      ClassLoader cl;
      loader = new ScalaDynamicClassLoader(outDir);
      loader.addAll(Arrays.asList(urls));
      cl = loader.getLoader();
      return cl;
    }

    protected void newEvaluator() throws MalformedURLException
    {
      shell = new ScalaEvaluatorGlue(newClassLoader(), System.getProperty("java.class.path"));

      if (!imports.isEmpty()) {
        for (int i = 0; i < imports.size(); i++) {
          String imp = imports.get(i).trim();
          if (imp.startsWith("import"))
            imp = imp.substring(6).trim();
          if (imp.endsWith(".*"))
            imp = imp.substring(0,imp.length()-1) + "_";
          if(!imp.isEmpty()) {
            if(!shell.addImport(imp))
              System.err.println("ERROR: cannot add import '"+imp+"'");
          }
        }
      }
      
      // ensure object is created
      NamespaceClient.getBeaker(sessionId);

      String r = shell.evaluate2("var beaker = NamespaceClient.getBeaker(\""+sessionId+"\")");
      if(r!=null && !r.isEmpty()) {
        System.err.println("ERROR setting beaker: "+r);
      }
    }
  }

  
  protected ClassLoader newAutoCompleteClassLoader() throws MalformedURLException
  {
    URL[] urls = {};
    if (!classPath.isEmpty()) {
      urls = new URL[classPath.size()];
      for (int i = 0; i < classPath.size(); i++) {
        urls[i] = new URL("file://" + classPath.get(i));
        System.out.println(urls[i].toString());
      }
    }
    acloader = null;
    ClassLoader cl;
    acloader = new ScalaDynamicClassLoader(outDir);
    acloader.addAll(Arrays.asList(urls));
    cl = acloader.getLoader();
    return cl;
  }

  protected void newAutoCompleteEvaluator() throws MalformedURLException
  {
    acshell = new ScalaEvaluatorGlue(newAutoCompleteClassLoader(), System.getProperty("java.class.path"));

    if (!imports.isEmpty()) {
      for (int i = 0; i < imports.size(); i++) {
        String imp = imports.get(i).trim();
        if (imp.startsWith("import"))
          imp = imp.substring(6).trim();
        if (imp.endsWith(".*"))
          imp = imp.substring(0,imp.length()-1) + "_";
        if(!imp.isEmpty()) {
          if(!acshell.addImport(imp))
            System.err.println("ERROR: cannot add import '"+imp+"'");
        }
      }
    }
    
    // ensure object is created
    NamespaceClient.getBeaker(sessionId);

    String r = acshell.evaluate2("var beaker = NamespaceClient.getBeaker(\""+sessionId+"\")");
    if(r!=null && !r.isEmpty()) {
      System.err.println("ERROR setting beaker: "+r);
    }
    
  }

}

