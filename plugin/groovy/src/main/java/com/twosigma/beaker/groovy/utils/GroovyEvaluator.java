package com.twosigma.beaker.groovy.utils;

import groovy.lang.Binding;
import groovy.lang.GroovyShell;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.Semaphore;

import org.codehaus.groovy.control.CompilerConfiguration;
import org.codehaus.groovy.control.customizers.ImportCustomizer;

import com.twosigma.beaker.NamespaceClient;
import com.twosigma.beaker.groovy.autocomplete.GroovyAutocomplete;
import com.twosigma.beaker.groovy.autocomplete.GroovyClasspathScanner;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.jvm.threads.BeakerCellExecutor;

public class GroovyEvaluator {
  protected final String shellId;
  protected final String sessionId;
  protected List<String> classPath;
  protected List<String> imports;
  protected String outDir;
  protected GroovyClasspathScanner cps;
  protected boolean exit;
  protected boolean updateLoader;
  protected final BeakerCellExecutor executor;
  protected workerThread myWorker;
  protected GroovyAutocomplete gac;

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

  public GroovyEvaluator(String id, String sId) {
    shellId = id;
    sessionId = sId;
    cps = new GroovyClasspathScanner();
    gac = createGroovyAutocomplete(cps);
    classPath = new ArrayList<String>();
    imports = new ArrayList<String>();
    exit = false;
    updateLoader = false;
    executor = new BeakerCellExecutor("groovy");
    startWorker();
  }

  protected void startWorker() {
    myWorker = new workerThread();
    myWorker.start();
  }

  protected GroovyAutocomplete createGroovyAutocomplete(GroovyClasspathScanner c)
  {
	return new GroovyAutocomplete(c);
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

    String cpp = "";
    for(String pt : classPath) {
      cpp += pt;
      cpp += File.pathSeparator;
    }
    cpp += File.pathSeparator;
    cpp += System.getProperty("java.class.path");
    cps = new GroovyClasspathScanner(cpp);
    gac = createGroovyAutocomplete(cps);
    
    for(String st : imports)
      gac.addImport(st);

    updateLoader=true;
    syncObject.release();
  } 

  public void exit() {
    exit = true;
    cancelExecution();
    syncObject.release();
  }

  public void setShellOptions(String cp, String in, String od) throws IOException {
    if(cp.isEmpty())
      classPath.clear();
    else
      classPath = Arrays.asList(cp.split("[\\s"+File.pathSeparatorChar+"]+"));
    if (in.isEmpty())
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
    return gac.doAutocomplete(code, caretPosition,loader!=null ? loader.getLoader() : null);
  }

  protected GroovyDynamicClassLoader loader = null;
  protected GroovyShell shell;

  protected class workerThread extends Thread {

    public workerThread() {
      super("groovy worker");
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
          result = shell.evaluate(theCode);
          theOutput.finished(result);              
        } catch(Throwable e) {
          if (e instanceof InterruptedException || e instanceof InvocationTargetException || e instanceof ThreadDeath) {
            theOutput.error("... cancelled!");
          } else {
            theOutput.error(e.getMessage());
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
        }
      }
      loader = null;
      ClassLoader cl;

      loader = new GroovyDynamicClassLoader(outDir);
      loader.addAll(Arrays.asList(urls));
      cl = loader.getLoader();
      return cl;
    }

    protected void newEvaluator() throws MalformedURLException
    {
      ImportCustomizer icz = new ImportCustomizer();

      if (!imports.isEmpty()) {
        for (int i = 0; i < imports.size(); i++) {
          // should trim too
          if (imports.get(i).endsWith(".*")) {
            icz.addStarImports(imports.get(i).substring(0, imports.get(i).length() - 2));
          } else {
            icz.addImports(imports.get(i));
          }
        }
      }
      CompilerConfiguration config = new CompilerConfiguration().addCompilationCustomizers(icz);
      shell = new GroovyShell(newClassLoader(), new Binding(), config);
    }
  }

}

