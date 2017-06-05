/*
 *  Copyright 2014-2016 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beaker.scala.evaluator;

import com.twosigma.beaker.autocomplete.AutocompleteResult;
import com.twosigma.beaker.evaluator.Evaluator;
import com.twosigma.beaker.evaluator.InternalVariable;
import com.twosigma.beaker.NamespaceClient;
import com.twosigma.beaker.jvm.classloader.DynamicClassLoaderSimple;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.jvm.serialization.BeakerObjectConverter;
import com.twosigma.beaker.jvm.threads.BeakerCellExecutor;
import com.twosigma.jupyter.KernelParameters;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.InvocationTargetException;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.Semaphore;

import static com.twosigma.beaker.jupyter.comm.KernelControlSetShellHandler.CLASSPATH;
import static com.twosigma.beaker.jupyter.comm.KernelControlSetShellHandler.IMPORTS;

public class ScalaEvaluator implements Evaluator {

  public final static Logger logger = LoggerFactory.getLogger(ScalaEvaluator.class.getName());

  private String shellId;
  private String sessionId;
  private List<String> classPath;
  private List<String> imports;
  private String outDir;
  private boolean exit;
  private boolean updateLoader;
  private final BeakerCellExecutor executor;
  private workerThread myWorker;
  private String currentClassPath;
  private String currentImports;
  private final BeakerObjectConverter objectSerializerProvider;

  protected class jobDescriptor {
    String codeToBeExecuted;
    SimpleEvaluationObject outputObject;

    jobDescriptor(String c, SimpleEvaluationObject o) {
      codeToBeExecuted = c;
      outputObject = o;
    }
  }

  protected final Semaphore syncObject = new Semaphore(0, true);
  protected final ConcurrentLinkedQueue<jobDescriptor> jobQueue = new ConcurrentLinkedQueue<jobDescriptor>();

  public ScalaEvaluator(BeakerObjectConverter osp) {
    objectSerializerProvider = osp;
    setupAutoTranslation();
    executor = new BeakerCellExecutor("scala");
  }

  public void initialize(String id, String sessionId) {
    logger.debug("id: {}, sId: {}", id, sessionId);
    shellId = id;
    this.sessionId = sessionId;
    classPath = new ArrayList<>();
    imports = new ArrayList<>();
    exit = false;
    updateLoader = false;
    currentClassPath = "";
    currentImports = "";
    outDir = Evaluator.createJupyterTempFolder().toString();
    startWorker();
  }

  @Override
  public void startWorker() {
    myWorker = new workerThread();
    myWorker.start();
  }

  public String getShellId() {
    return shellId;
  }

  private void setupAutoTranslation() {
    objectSerializerProvider.addfTypeSerializer(new ScalaCollectionSerializer(objectSerializerProvider));
    objectSerializerProvider.addfTypeSerializer(new ScalaMapSerializer(objectSerializerProvider));
    objectSerializerProvider.addfTypeSerializer(new ScalaPrimitiveTypeListOfListSerializer(objectSerializerProvider));
    objectSerializerProvider.addfTypeSerializer(new ScalaListOfPrimitiveTypeMapsSerializer(objectSerializerProvider));
    objectSerializerProvider.addfTypeSerializer(new ScalaPrimitiveTypeMapSerializer(objectSerializerProvider));

    objectSerializerProvider.addfTypeDeserializer(new ScalaCollectionDeserializer(objectSerializerProvider));
    objectSerializerProvider.addfTypeDeserializer(new ScalaMapDeserializer(objectSerializerProvider));
    objectSerializerProvider.addfTypeDeserializer(new ScalaTableDeSerializer(objectSerializerProvider));
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
    try {
      newAutoCompleteEvaluator();
    } catch (MalformedURLException e) {
    }
  }

  public void exit() {
    exit = true;
    cancelExecution();
    syncObject.release();
  }

  @Override
  public void setShellOptions(final KernelParameters kernelParameters) throws IOException {

    Map<String, Object> params = kernelParameters.getParams();
    Collection<String> listOfClassPath = (Collection<String>) params.get(CLASSPATH);
    Collection<String> listOfImports = (Collection<String>) params.get(IMPORTS);

    Map<String, String> env = System.getenv();

    if (listOfClassPath == null || listOfClassPath.isEmpty()) {
      classPath = new ArrayList<>();
    } else {
      for (String line : listOfClassPath) {
        if (!line.trim().isEmpty()) {
          classPath.add(line);
        }
      }
    }

    if (listOfImports == null || listOfImports.isEmpty()) {
      imports = new ArrayList<>();
    } else {
      for (String line : listOfImports) {
        if (!line.trim().isEmpty()) {
          imports.add(line);
        }
      }
    }

    resetEnvironment();
  }

  @Override
  public void evaluate(SimpleEvaluationObject seo, String code) {
    // send job to thread
    jobQueue.add(new jobDescriptor(code, seo));
    syncObject.release();
  }

  @Override
  public AutocompleteResult autocomplete(String code, int caretPosition) {
    if (acshell != null) {
      int lineStart = 0;
      String[] sv = code.substring(0, caretPosition).split("\n");
      for (int i = 0; i < sv.length - 1; i++) {
        acshell.evaluate2(sv[i]);
        caretPosition -= sv[i].length() + 1;
        lineStart += sv[i].length() + 1;
      }
      AutocompleteResult lineCompletion = acshell.autocomplete(sv[sv.length - 1], caretPosition);
      return new AutocompleteResult(lineCompletion.getMatches(), lineCompletion.getStartIndex() + lineStart);
    }
    return null;
  }

  protected ScalaEvaluatorGlue shell;
  protected String loader_cp = "";
  protected ScalaEvaluatorGlue acshell;
  protected String acloader_cp = "";

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

      while (!exit) {
        logger.debug("looping");
        try {
          // wait for work
          syncObject.acquire();

          // check if we must create or update class loader
          if (updateLoader) {
            shell = null;
          }

          // get next job descriptor
          j = jobQueue.poll();
          if (j == null)
            continue;

          if (shell == null) {
            updateLoader = false;
            newEvaluator();
          }

          j.outputObject.started();

          nc = NamespaceClient.getBeaker(sessionId);
          nc.setOutputObj(j.outputObject);
          if (!executor.executeTask(new MyRunnable(j.codeToBeExecuted, j.outputObject))) {
            j.outputObject.error("... cancelled!");
          }
          if (nc != null) {
            nc.setOutputObj(null);
            nc = null;
          }
        } catch (Throwable e) {
          e.printStackTrace();
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

      public MyRunnable(String code, SimpleEvaluationObject out) {
        theCode = code;
        theOutput = out;
      }

      @Override
      public void run() {
        theOutput.setOutputHandler();
        try {
          InternalVariable.setValue(theOutput);
          shell.evaluate(theOutput, theCode);
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

    ;

    /*
     * Scala uses multiple classloaders and (unfortunately) cannot fallback to the java one while compiling scala code so we
     * have to build our DynamicClassLoader and also build a proper classpath for the compiler classloader.
     */
    protected ClassLoader newClassLoader() throws MalformedURLException {
      logger.debug("creating new loader");

      loader_cp = "";
      for (int i = 0; i < classPath.size(); i++) {
        loader_cp += classPath.get(i);
        loader_cp += File.pathSeparatorChar;
      }
      loader_cp += outDir;
      DynamicClassLoaderSimple cl = new DynamicClassLoaderSimple(ClassLoader.getSystemClassLoader());
      cl.addJars(classPath);
      cl.addDynamicDir(outDir);
      return cl;
    }

    protected void newEvaluator() throws MalformedURLException {
      logger.debug("creating new evaluator");
      shell = new ScalaEvaluatorGlue(newClassLoader(),
              loader_cp + File.pathSeparatorChar + System.getProperty("java.class.path"), outDir);

      if (!imports.isEmpty()) {
        for (int i = 0; i < imports.size(); i++) {
          String imp = imports.get(i).trim();
          imp = adjustImport(imp);
          if (!imp.isEmpty()) {
            logger.debug("importing : {}", imp);
            if (!shell.addImport(imp))
              logger.warn("ERROR: cannot add import '{}'", imp);
          }
        }
      }

      logger.debug("creating beaker object");

      // ensure object is created
      NamespaceClient.getBeaker(sessionId);

      String r = shell.evaluate2(code(sessionId));
      if (r != null && !r.isEmpty()) {
        logger.warn("ERROR creating beaker object: {}", r);
      }
    }
  }

  private String adjustImport(String imp) {
    if (imp.startsWith("import"))
      imp = imp.substring(6).trim();
    // Scala doesn't need "static"
    if (imp.startsWith("static"))
      imp = imp.substring(6).trim();
    // May need more of these, but all Scala keywords that aren't Java keywords is probably overkill
    if (imp.contains(".object.")) {
      imp = imp.replace(".object.", ".`object`.");
    }
    if (imp.endsWith(".*"))
      imp = imp.substring(0, imp.length() - 1) + "_";
    return imp;
  }


  protected ClassLoader newAutoCompleteClassLoader() throws MalformedURLException {
    logger.debug("creating new autocomplete loader");
    acloader_cp = "";
    for (int i = 0; i < classPath.size(); i++) {
      acloader_cp += classPath.get(i);
      acloader_cp += File.pathSeparatorChar;
    }
    acloader_cp += outDir;

    DynamicClassLoaderSimple cl = new DynamicClassLoaderSimple(ClassLoader.getSystemClassLoader());
    cl.addJars(classPath);
    cl.addDynamicDir(outDir);
    return cl;
  }

  protected void newAutoCompleteEvaluator() throws MalformedURLException {
    logger.debug("creating new autocomplete evaluator");
    acshell = new ScalaEvaluatorGlue(newAutoCompleteClassLoader(),
            acloader_cp + File.pathSeparatorChar + System.getProperty("java.class.path"), outDir);

    if (!imports.isEmpty()) {
      for (int i = 0; i < imports.size(); i++) {
        String imp = imports.get(i).trim();
        imp = adjustImport(imp);
        if (!imp.isEmpty()) {
          if (!acshell.addImport(imp))
            logger.warn("ERROR: cannot add import '{}'", imp);
        }
      }
    }

    // ensure object is created
    NamespaceClient.getBeaker(sessionId);

    String r = acshell.evaluate2(code(sessionId));
    if (r != null && !r.isEmpty()) {
      logger.warn("ERROR creating beaker beaker: {}", r);
    }

  }

  private String code(String sessionId) {
    return "import com.twosigma.beaker.NamespaceClient\n" +
            "import language.dynamics\n" +
            "var _beaker = NamespaceClient.getBeaker(\"" + sessionId + "\")\n" +
            "object beaker extends Dynamic {\n" +
            "  def selectDynamic( field : String ) = _beaker.get(field)\n" +
            "  def updateDynamic (field : String)(value : Any) : Any = {\n" +
            "    _beaker.set(field,value)\n" +
            "    return value\n" +
            "  }\n" +
            "  def applyDynamic(methodName: String)(args: AnyRef*) = {\n" +
            "    def argtypes = args.map(_.getClass)\n" +
            "    def method = _beaker.getClass.getMethod(methodName, argtypes: _*)\n" +
            "    method.invoke(_beaker,args: _*)\n" +
            "  }\n" +
            "}\n";
  }

}