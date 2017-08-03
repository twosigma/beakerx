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
package com.twosigma.beakerx.groovy.evaluator;

import com.twosigma.beakerx.NamespaceClient;
import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.evaluator.InternalVariable;
import com.twosigma.beakerx.groovy.autocomplete.GroovyAutocomplete;
import com.twosigma.beakerx.groovy.autocomplete.GroovyClasspathScanner;
import com.twosigma.beakerx.jvm.classloader.DynamicClassLoaderSimple;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.jvm.threads.BeakerCellExecutor;
import com.twosigma.beakerx.jvm.threads.CellExecutor;
import com.twosigma.beakerx.kernel.ImportPath;
import com.twosigma.beakerx.kernel.PathToJar;
import groovy.lang.Binding;
import groovy.lang.GroovyClassLoader;
import groovy.lang.Script;
import org.apache.commons.lang3.StringUtils;
import org.codehaus.groovy.control.CompilerConfiguration;
import org.codehaus.groovy.control.customizers.ImportCustomizer;
import org.codehaus.groovy.runtime.StackTraceUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.InvocationTargetException;
import java.net.MalformedURLException;
import java.util.HashMap;

import static com.twosigma.beakerx.groovy.evaluator.EnvVariablesFilter.envVariablesFilter;


public class GroovyEvaluator extends BaseEvaluator {

  private static final Logger logger = LoggerFactory.getLogger(GroovyEvaluator.class.getName());

  private static final String STATIC_WORD_WITH_SPACE = "static ";
  private static final String DOT_STAR_POSTFIX = ".*";

  //user entered source value
  protected GroovyClasspathScanner cps;
  protected boolean exit;
  protected boolean updateLoader;
  protected GroovyAutocomplete gac;
  public static boolean LOCAL_DEV = false;
  public static String GROOVY_JAR_PATH = "GROOVY_JAR_PATH";
  private Binding scriptBinding = null;

  public GroovyEvaluator(String id, String sId) {
    this(id, sId, new BeakerCellExecutor("groovy"));
  }

  public GroovyEvaluator(String id, String sId, CellExecutor cellExecutor) {
    super(id,sId,cellExecutor);
    cps = new GroovyClasspathScanner();
    gac = createGroovyAutocomplete(cps);
    exit = false;
    updateLoader = false;
    outDir = envVariablesFilter(outDir, System.getenv());
    startWorker();
  }

  protected void startWorker() {
    workerThread myWorker = new workerThread();
    myWorker.start();
  }

  protected GroovyAutocomplete createGroovyAutocomplete(GroovyClasspathScanner c) {
    return new GroovyAutocomplete(c);
  }

  @Override
  protected void doResetEnvironment() {
    String cpp = "";
    for (String pt : classPath.getPathsAsStrings()) {
      cpp += pt;
      cpp += File.pathSeparator;
    }
    cpp += File.pathSeparator;
    cpp += System.getProperty("java.class.path");
    cps = new GroovyClasspathScanner(cpp);
    gac = createGroovyAutocomplete(cps);

    for (ImportPath st : imports.getImportPaths())
      gac.addImport(st.asString());

    updateLoader = true;
  }

  public void exit() {
    exit = true;
    cancelExecution();
    syncObject.release();
  }

  @Override
  protected boolean addJar(PathToJar path) {
    return classPath.add(new PathToJar(envVariablesFilter(path.getPath(), System.getenv())));
  }

  protected ClassLoader newClassLoader() throws MalformedURLException {
    loader = new DynamicClassLoaderSimple(ClassLoader.getSystemClassLoader());
    loader.addJars(classPath.getPathsAsStrings());
    loader.addDynamicDir(outDir);
    return loader;
  }

  protected GroovyClassLoader newEvaluator() throws MalformedURLException {

    try {
      Class.forName("org.codehaus.groovy.control.customizers.ImportCustomizer");
    } catch (ClassNotFoundException e1) {
      String gjp = System.getenv(GROOVY_JAR_PATH);
      String errorMsg = null;
      if (gjp != null && !gjp.isEmpty()) {
        errorMsg = "Groovy libary not found, GROOVY_JAR_PATH = " + gjp;
      } else {
        errorMsg = "Default groovy libary not found. No GROOVY_JAR_PATH variable set.";
      }
      throw new GroovyNotFoundException(errorMsg);
    }

    ImportCustomizer icz = new ImportCustomizer();

    if (!imports.isEmpty()) {
      for (ImportPath importLine : imports.getImportPaths()) {
        if (importLine.asString().startsWith(STATIC_WORD_WITH_SPACE)) {

          String pureImport = importLine.asString()
                  .replace(STATIC_WORD_WITH_SPACE, StringUtils.EMPTY)
                  .replace(DOT_STAR_POSTFIX, StringUtils.EMPTY);

          if (importLine.asString().endsWith(DOT_STAR_POSTFIX)) {
            icz.addStaticStars(pureImport);
          } else {
            int index = pureImport.lastIndexOf('.');
            if (index == -1) {
              continue;
            }
            icz.addStaticImport(pureImport.substring(0, index), pureImport.substring(index + 1));
          }

        } else {

          if (importLine.asString().endsWith(DOT_STAR_POSTFIX)) {
            icz.addStarImports(importLine.asString().replace(DOT_STAR_POSTFIX, StringUtils.EMPTY));
          } else {
            icz.addImports(importLine.asString());
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

    scriptBinding = new Binding();
    return new GroovyClassLoader(newClassLoader(), compilerConfiguration);
  }

  public void evaluate(SimpleEvaluationObject seo, String code) {
    // send job to thread
    jobQueue.add(new JobDescriptor(code, seo));
    syncObject.release();
  }

  public AutocompleteResult autocomplete(String code, int caretPosition) {
    return gac.doAutocomplete(code, caretPosition, loader);
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
      JobDescriptor j = null;
      NamespaceClient nc = null;

      while (!exit) {
        try {
          // wait for work
          syncObject.acquire();

          // check if we must create or update class loader
          if (updateLoader) {
            if (groovyClassLoader != null) {
              try {
                groovyClassLoader.close();
              } catch (Exception ex) {
              }
            }
            groovyClassLoader = null;
            scriptBinding = null;
          }

          // get next job descriptor
          j = jobQueue.poll();
          if (j == null)
            continue;

          if (groovyClassLoader == null) {
            updateLoader = false;
            //reload classloader
            groovyClassLoader = newEvaluator();
          }

          //if(loader!=null)
          //  loader.resetDynamicLoader();

          if (!LOCAL_DEV) {
            nc = NamespaceClient.getBeaker(sessionId);
            nc.setOutputObj(j.outputObject);
          }

          j.outputObject.started();

          String code = j.codeToBeExecuted;

          if (!executor.executeTask(new MyRunnable(code, j.outputObject, loader))) {
            j.outputObject.error("... cancelled!");
          }

          if (nc != null) {
            nc.setOutputObj(null);
            nc = null;
          }
        } catch (Throwable e) {
          if (e instanceof GroovyNotFoundException) {
            logger.warn(e.getLocalizedMessage());
            if (j != null) {
              j.outputObject.error(e.getLocalizedMessage());
            }
          } else {
            e.printStackTrace();
          }
        } finally {
          if (nc != null) {
            nc.setOutputObj(null);
            nc = null;
          }
          if (j != null && j.outputObject != null) {
            j.outputObject.executeCodeCallback();
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

          if (LOCAL_DEV) {
            scriptBinding.setVariable(BEAKER_VARIABLE_NAME, new HashMap<String, Object>());
          } else {
            scriptBinding.setVariable(BEAKER_VARIABLE_NAME, NamespaceClient.getBeaker(sessionId));
          }

          instance.setBinding(scriptBinding);

          InternalVariable.setValue(theOutput);

          result = instance.run();

          if (LOCAL_DEV) {
            logger.info("Result: {}", result);
            logger.info("Variables: {}", scriptBinding.getVariables());
          }

          theOutput.finished(result);

        } catch (Throwable e) {

          if (LOCAL_DEV) {
            logger.warn(e.getMessage());
            e.printStackTrace();
          }

          //unwrap ITE
          if (e instanceof InvocationTargetException) {
            e = ((InvocationTargetException) e).getTargetException();
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
    }
  }

  static class GroovyNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public GroovyNotFoundException(String message) {
      super(message);
    }

  }

}
