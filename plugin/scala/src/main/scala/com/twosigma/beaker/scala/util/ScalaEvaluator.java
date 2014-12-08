package com.twosigma.beaker.scala.util;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.InvocationTargetException;
import java.net.MalformedURLException;
import java.net.URL;
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
  //protected ScalaClasspathScanner cps;
  protected boolean exit;
  protected boolean updateLoader;
  protected final BeakerCellExecutor executor;
  protected workerThread myWorker;
  //protected GroovyAutocomplete gac;

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
    //cps = new GroovyClasspathScanner();
    //gac = createGroovyAutocomplete(cps);
    classPath = new ArrayList<String>();
    imports = new ArrayList<String>();
    exit = false;
    updateLoader = false;
    executor = new BeakerCellExecutor("scala");
    startWorker();
  }

  protected void startWorker() {
    myWorker = new workerThread();
    myWorker.start();
  }

  //  protected GroovyAutocomplete createGroovyAutocomplete(GroovyClasspathScanner c)
  //  {
  //	return new GroovyAutocomplete(c);
  //  }

  public String getShellId() { return shellId; }

  public void killAllThreads() {
    executor.killAllThreads();
  }

  public void cancelExecution() {
    executor.cancelExecution();
  }

  public void resetEnvironment() {
    executor.killAllThreads();

    //    String cpp = "";
    //    for(String pt : classPath) {
    //      cpp += pt;
    //      cpp += File.pathSeparator;
    //    }
    //    cpp += File.pathSeparator;
    //    cpp += System.getProperty("java.class.path");
    //    cps = new ScalaClasspathScanner(cpp);
    //    gac = createGroovyAutocomplete(cps);
    //    
    //    for(String st : imports)
    //      gac.addImport(st);

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
    if(cp==null || cp.isEmpty())
      classPath.clear();
    else
      classPath = Arrays.asList(cp.split("[\\s]+"));
    if (imports==null || in.isEmpty())
      imports.clear();
    else
      imports = Arrays.asList(in.split("\\s+"));
    outDir = od;
    if(outDir!=null && !outDir.isEmpty()) {
      outDir = outDir.replace("$BEAKERDIR",System.getenv("beaker_tmp_dir"));
      try { (new File(outDir)).mkdirs(); } catch (Exception e) { }
    }
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
    
    String r = acshell.evaluate2("var beaker = NamespaceClient.getBeaker(\""+sessionId+"\")");
    if(r!=null && !r.isEmpty()) {
      System.err.println("ERROR setting beaker: "+r);
    }
  }

  
}

