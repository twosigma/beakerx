/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.scala.evaluator;

import com.twosigma.beakerx.NamespaceClient;
import com.twosigma.beakerx.evaluator.JobDescriptor;
import com.twosigma.beakerx.evaluator.WorkerThread;
import com.twosigma.beakerx.jvm.classloader.DynamicClassLoaderSimple;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.net.MalformedURLException;

class ScalaWorkerThread extends WorkerThread {

  private final static Logger logger = LoggerFactory.getLogger(ScalaWorkerThread.class.getName());

  private ScalaEvaluator scalaEvaluator;
  private BeakerxObjectFactory beakerxObjectFactory;
  protected boolean exit;
  protected boolean updateLoader;

  public ScalaWorkerThread(ScalaEvaluator scalaEvaluator, BeakerxObjectFactory beakerxObjectFactory) {
    super("scala worker");
    this.scalaEvaluator = scalaEvaluator;
    this.beakerxObjectFactory = beakerxObjectFactory;
    exit = false;
    updateLoader = false;
  }

  /*
   * This thread performs all the evaluation
   */

  public void run() {
    JobDescriptor j = null;
    NamespaceClient nc = null;

    while (!exit) {
      logger.debug("looping");
      try {
        // wait for work
        syncObject.acquire();

        // check if we must create or update class loader
        if (updateLoader) {
          scalaEvaluator.shell = null;
        }

        // get next job descriptor
        j = jobQueue.poll();
        if (j == null)
          continue;

        if (scalaEvaluator.shell == null) {
          updateLoader = false;
          newEvaluator();
        }

        j.outputObject.started();

        nc = NamespaceClient.getBeaker(scalaEvaluator.getSessionId());
        nc.setOutputObj(j.outputObject);
        if (!scalaEvaluator.executeTask(new ScalaCodeRunner(scalaEvaluator, j.codeToBeExecuted, j.outputObject))) {
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
    NamespaceClient.delBeaker(scalaEvaluator.getSessionId());
  }

  ;

  /*
   * Scala uses multiple classloaders and (unfortunately) cannot fallback to the java one while compiling scala code so we
   * have to build our DynamicClassLoader and also build a proper classpath for the compiler classloader.
   */
  protected ClassLoader newClassLoader() throws MalformedURLException {
    logger.debug("creating new loader");

    scalaEvaluator.loader_cp = "";
    for (int i = 0; i < scalaEvaluator.getClasspath().size(); i++) {
      scalaEvaluator.loader_cp += scalaEvaluator.getClasspath().get(i);
      scalaEvaluator.loader_cp += File.pathSeparatorChar;
    }
    scalaEvaluator.loader_cp += scalaEvaluator.getOutDir();
    DynamicClassLoaderSimple cl = new DynamicClassLoaderSimple(ClassLoader.getSystemClassLoader());
    cl.addJars(scalaEvaluator.getClasspath().getPathsAsStrings());
    cl.addDynamicDir(scalaEvaluator.getOutDir());
    return cl;
  }

  protected void newEvaluator() throws MalformedURLException {
    logger.debug("creating new evaluator");
    scalaEvaluator.shell = new ScalaEvaluatorGlue(newClassLoader(),
            scalaEvaluator.loader_cp + File.pathSeparatorChar + System.getProperty("java.class.path"), scalaEvaluator.getOutDir());

    if (!scalaEvaluator.getImports().isEmpty()) {
      for (int i = 0; i < scalaEvaluator.getImports().getImportPaths().size(); i++) {
        String imp = scalaEvaluator.getImports().getImportPaths().get(i).asString().trim();
        imp = scalaEvaluator.adjustImport(imp);
        if (!imp.isEmpty()) {
          logger.debug("importing : {}", imp);
          if (!scalaEvaluator.shell.addImport(imp))
            logger.warn("ERROR: cannot add import '{}'", imp);
        }
      }
    }

    logger.debug("creating beaker object");

    // ensure object is created
    NamespaceClient.getBeaker(scalaEvaluator.getSessionId());

    String r = scalaEvaluator.shell.evaluate2(this.beakerxObjectFactory.create(scalaEvaluator.getSessionId()));
    if (r != null && !r.isEmpty()) {
      logger.warn("ERROR creating beaker object: {}", r);
    }
  }

  public void updateLoader() {
    this.updateLoader = true;
  }

  public void doExit() {
    this.exit = true;
  }
}
