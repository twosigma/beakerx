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
package com.twosigma.beakerx.groovy.evaluator;

import com.twosigma.beakerx.NamespaceClient;
import com.twosigma.beakerx.evaluator.JobDescriptor;
import com.twosigma.beakerx.evaluator.WorkerThread;
import groovy.lang.Binding;
import groovy.lang.GroovyClassLoader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import static com.twosigma.beakerx.evaluator.BaseEvaluator.INTERUPTED_MSG;
import static com.twosigma.beakerx.groovy.evaluator.GroovyClassLoaderFactory.newEvaluator;

class GroovyWorkerThread extends WorkerThread {

  private static final Logger logger = LoggerFactory.getLogger(GroovyWorkerThread.class.getName());

  protected GroovyEvaluator groovyEvaluator;
  private GroovyClassLoader groovyClassLoader;
  private Binding scriptBinding = null;
  private boolean exit;
  private boolean updateLoader;

  GroovyWorkerThread(GroovyEvaluator groovyEvaluator) {
    super("groovy worker");
    this.groovyEvaluator = groovyEvaluator;
    this.exit = false;
    this.updateLoader = false;
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
          groovyClassLoader = newEvaluator(groovyEvaluator.getImports(), groovyEvaluator.getClasspath(), groovyEvaluator.getOutDir());
          scriptBinding = new Binding();
        }

        //if(loader!=null)
        //  loader.resetDynamicLoader();

        if (!GroovyEvaluator.LOCAL_DEV) {
          nc = NamespaceClient.getBeaker(groovyEvaluator.getSessionId());
          nc.setOutputObj(j.outputObject);
        }

        j.outputObject.started();

        String code = j.codeToBeExecuted;

        if (!groovyEvaluator.executeTask(new GroovyCodeRunner(this, code, j.outputObject))) {
          j.outputObject.error(INTERUPTED_MSG);
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
    NamespaceClient.delBeaker(groovyEvaluator.getSessionId());
  }

  void updateLoader() {
    this.updateLoader = true;
  }

  void doExit() {
    this.exit = true;
  }

  GroovyClassLoader getGroovyClassLoader() {
    return groovyClassLoader;
  }

  Binding getScriptBinding() {
    return scriptBinding;
  }
}
