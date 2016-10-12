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
package com.twosigma.beaker.groovy.utils;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.InvocationTargetException;
import java.net.MalformedURLException;
import java.nio.file.FileSystems;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.Semaphore;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;
import org.codehaus.groovy.control.CompilerConfiguration;
import org.codehaus.groovy.control.customizers.ImportCustomizer;
import org.codehaus.groovy.runtime.StackTraceUtils;

import com.twosigma.beaker.NamespaceClient;
import com.twosigma.beaker.groovy.autocomplete.GroovyAutocomplete;
import com.twosigma.beaker.groovy.autocomplete.GroovyClasspathScanner;
import com.twosigma.beaker.jvm.classloader.DynamicClassLoaderSimple;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.jvm.threads.BeakerCellExecutor;
import com.twosigma.beaker.jvm.threads.BeakerStdOutErrHandler;
import com.twosigma.beaker.jvm.utils.BeakerPrefsUtils;

import groovy.lang.Binding;
import groovy.lang.GroovyClassLoader;
import groovy.lang.Script;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class GroovyEvaluator {

  private static final Logger logger = LoggerFactory.getLogger(GroovyEvaluator.class.getName());

  private static final String STATIC_WORD_WITH_SPACE = "static ";
  private static final String DOT_STAR_POSTFIX = ".*";
  
  protected final String shellId;
  protected final String sessionId;
  protected List<String> classPath;
  protected List<String> imports;
  //user entered source value
  protected String outDirInput;
  protected String outDir;
  protected GroovyClasspathScanner cps;
  protected boolean exit;
  protected boolean updateLoader;
  protected final BeakerCellExecutor executor;
  protected workerThread myWorker;
  protected GroovyAutocomplete gac;
  protected String currentClassPath;
  protected String currentImports;

  public static boolean LOCAL_DEV = false;
  
  public static String GROOVY_JAR_PATH = "GROOVY_JAR_PATH"; 
  
  private Binding scriptBinding = null;
  
  protected class jobDescriptor {
    public String codeToBeExecuted;
    public SimpleEvaluationObject outputObject;

    jobDescriptor(String c , SimpleEvaluationObject o) {
      codeToBeExecuted = c;
      outputObject = o;
    }
  }

  protected final Semaphore syncObject = new Semaphore(0, true);
  protected final ConcurrentLinkedQueue<jobDescriptor> jobQueue = new ConcurrentLinkedQueue<jobDescriptor>();

  protected static Pattern[] envVariablePatterns = {
    Pattern.compile("\\$\\{([a-z_][a-z0-9_]*)\\}", Pattern.CASE_INSENSITIVE),
    Pattern.compile("\\$([a-z_][a-z0-9_]*)", Pattern.CASE_INSENSITIVE)
  };
  
  public GroovyEvaluator(String id, String sId) {
    shellId = id;
    sessionId = sId;
    cps = new GroovyClasspathScanner();
    gac = createGroovyAutocomplete(cps);
    classPath = new ArrayList<String>();
    imports = new ArrayList<String>();
    exit = false;
    updateLoader = false;
    currentClassPath = "";
    currentImports = "";
    outDir = FileSystems.getDefault().getPath(System.getenv("beaker_tmp_dir"),"dynclasses",sessionId).toString();
    outDir = envVariablesFilter(outDir, System.getenv());
    outDirInput = outDir;
    try { (new File(outDir)).mkdirs(); } catch (Exception e) { }
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
    if (od==null || od.isEmpty()) {
      od = FileSystems.getDefault().getPath(System.getenv("beaker_tmp_dir"),"dynclasses",sessionId).toString();
    } else {
      od = od.replace("$BEAKERDIR",System.getenv("beaker_tmp_dir"));
    }
    
    // check if we are not changing anything
    if (currentClassPath.equals(cp) && currentImports.equals(in) && outDirInput.equals(od))
      return;
  
    currentClassPath = cp;
    currentImports = in;
    Map<String, String> env = System.getenv();
    outDirInput = od;
    outDir = envVariablesFilter(od, env);
    
    if(cp.isEmpty())
      classPath = new ArrayList<String>();
    else {
      List<String> cpList = new ArrayList<String>();
      for(String p : Arrays.asList(cp.split("[\\s"+File.pathSeparatorChar+"]+"))) {

        p = envVariablesFilter(p, env);

        cpList.add(p);
      }
      classPath = cpList;
    }

    if (!in.isEmpty()) {
      String[] importLines = in.split("\\n+");
      for (String line : importLines) {
        if (!line.trim().isEmpty()) {
          imports.add(line);
        }
      }
    }

    try { (new File(outDir)).mkdirs(); } catch (Exception e) { }

    resetEnvironment();
  }
  
  static String envVariablesFilter(String p, Map<String, String> env) {

    if(p == null) return p;

    for(Pattern pattern : envVariablePatterns) {

      Matcher matcher = pattern.matcher(p);

      String r = "";

      int lastIndex = 0;

      while(matcher.find()) {

        String var = matcher.group(1);

        String substitute = env.get(var);

        if(substitute == null) substitute = "";

        r += p.substring(lastIndex, matcher.start());

        r += substitute;

        lastIndex = matcher.end();
      }

      r += p.substring(lastIndex, p.length());

      p = r;

    }
    
    return p;
  }

public void evaluate(SimpleEvaluationObject seo, String code) {
    // send job to thread
    jobQueue.add(new jobDescriptor(code,seo));
    syncObject.release();
  }

  public List<String> autocomplete(String code, int caretPosition) {    
    return gac.doAutocomplete(code, caretPosition,loader);
  }

  protected DynamicClassLoaderSimple loader = null;

  //an object that matches the shell in non-shell mode
  protected GroovyClassLoader groovyClassLoader;
  
  protected CompilerConfiguration compilerConfiguration;
  
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
            if(groovyClassLoader != null) {
              try { groovyClassLoader.close(); } catch(Exception ex) {}
            }
            groovyClassLoader = null;
            scriptBinding = null;
          }
          
          // get next job descriptor
          j = jobQueue.poll();
          if(j==null)
            continue;

          if(groovyClassLoader == null) {
            updateLoader = false;
            newEvaluator();
          }
        
          //if(loader!=null)
          //  loader.resetDynamicLoader();

          if(!LOCAL_DEV) {
              nc = NamespaceClient.getBeaker(sessionId);
              nc.setOutputObj(j.outputObject);
          }

          Boolean useOutputPanel = nc != null ? BeakerPrefsUtils.isUseOutputPanel(nc) : false;
          if (useOutputPanel) {
            j.outputObject.clrOutputHandler();
            BeakerStdOutErrHandler.fini();
          } else {
            if(!LOCAL_DEV) BeakerStdOutErrHandler.init();
          }
          j.outputObject.started();

          
          String code = j.codeToBeExecuted;
          
          if (!executor.executeTask(new MyRunnable(code, j.outputObject, loader))) {
            j.outputObject.error("... cancelled!");
          }
          
          if(nc!=null) {
            nc.setOutputObj(null);
            nc = null;
          }
        } catch(Throwable e) {
          if(e instanceof GroovyNotFoundException) {
            logger.warn(e.getLocalizedMessage());
            if(j != null) {
              j.outputObject.error(e.getLocalizedMessage());
            }
          } else {
            e.printStackTrace();
          }
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
      protected final DynamicClassLoaderSimple _loader;

      public MyRunnable(String code, SimpleEvaluationObject out, DynamicClassLoaderSimple ld) {
        theCode = code;
        theOutput = out;
        _loader = ld;
      }
      
      @Override
      public void run() {
        Object result;
        ClassLoader oldld = Thread.currentThread().getContextClassLoader();
        theOutput.setOutputHandler();
        
        try {
          
          Thread.currentThread().setContextClassLoader(groovyClassLoader);
          Class<?> parsedClass = groovyClassLoader.parseClass(theCode);
          
          Script instance = (Script) parsedClass.newInstance();
          
          if(LOCAL_DEV) {
            scriptBinding.setVariable("beaker", new HashMap<String, Object>());
          } else {
            scriptBinding.setVariable("beaker", NamespaceClient.getBeaker(sessionId));
          }

          instance.setBinding(scriptBinding);
          
          result = instance.run();

          if(LOCAL_DEV) {
            logger.info("Result: {}", result);
            logger.info("Variables: {}", scriptBinding.getVariables());
          }

          theOutput.finished(result);

        } catch(Throwable e) {

          if(LOCAL_DEV) {
              logger.warn(e.getMessage());
              e.printStackTrace();
          }

          //unwrap ITE
          if(e instanceof InvocationTargetException) {
            e = ((InvocationTargetException)e).getTargetException();
          }

          if (e instanceof InterruptedException || e instanceof InvocationTargetException || e instanceof ThreadDeath) {
            theOutput.error("... cancelled!");
          } else {
            StringWriter sw = new StringWriter();
            PrintWriter pw = new PrintWriter(sw);
            StackTraceUtils.sanitize(e).printStackTrace(pw);
            theOutput.error(sw.toString());
          }
        }
        theOutput.clrOutputHandler();
        Thread.currentThread().setContextClassLoader(oldld);
      }
    };
    
    protected ClassLoader newClassLoader() throws MalformedURLException
    {
      loader=new DynamicClassLoaderSimple(ClassLoader.getSystemClassLoader());
      loader.addJars(classPath);
      loader.addDynamicDir(outDir);
      return loader;
    }

    protected void newEvaluator() throws MalformedURLException
    {
    
      try {
        Class.forName("org.codehaus.groovy.control.customizers.ImportCustomizer");
      } catch (ClassNotFoundException e1) {
        String gjp = System.getenv(GROOVY_JAR_PATH);
        String errorMsg = null;
        if(gjp != null && !gjp.isEmpty()) {
          errorMsg = "Groovy libary not found, GROOVY_JAR_PATH = " + gjp;
        } else {
          errorMsg = "Default groovy libary not found. No GROOVY_JAR_PATH variable set.";
        }
        throw new GroovyNotFoundException(errorMsg);
      }
      
      ImportCustomizer icz = new ImportCustomizer();

      if (!imports.isEmpty()) {
        for (String importLine : imports) {
          if (importLine.startsWith(STATIC_WORD_WITH_SPACE)) {

            String pureImport = importLine
                .replace(STATIC_WORD_WITH_SPACE, StringUtils.EMPTY)
                .replace(DOT_STAR_POSTFIX, StringUtils.EMPTY);

            if (importLine.endsWith(DOT_STAR_POSTFIX)) {
              icz.addStaticStars(pureImport);
            } else {
              int index = pureImport.lastIndexOf('.');
              if (index == -1) {
                continue;
              }
              icz.addStaticImport(pureImport.substring(0, index), pureImport.substring(index + 1));
            }

          } else {

            if (importLine.endsWith(DOT_STAR_POSTFIX)) {
              icz.addStarImports(importLine.replace(DOT_STAR_POSTFIX, StringUtils.EMPTY));
            } else {
              icz.addImports(importLine);
            }

          }
        }
      }
      CompilerConfiguration config = new CompilerConfiguration().addCompilationCustomizers(icz);

      String acloader_cp = "";
      for (int i = 0; i < classPath.size(); i++) {
        acloader_cp += classPath.get(i);
        acloader_cp += File.pathSeparatorChar;
      }
      acloader_cp += outDir;

      config.setClasspath(acloader_cp);
      
      compilerConfiguration = config;
        
      //reload classloader
      groovyClassLoader = new GroovyClassLoader(newClassLoader(), compilerConfiguration);
      scriptBinding = new Binding();
          
    }
  }

  static class GroovyNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public GroovyNotFoundException(String message) {
      super(message);
    }

  }
  
}
