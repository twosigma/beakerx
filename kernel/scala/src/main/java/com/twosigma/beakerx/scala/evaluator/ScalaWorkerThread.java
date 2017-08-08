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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

class ScalaWorkerThread extends WorkerThread {

  private final static Logger logger = LoggerFactory.getLogger(ScalaWorkerThread.class.getName());

  private ScalaEvaluator scalaEvaluator;
  private boolean exit;
  private boolean updateLoader;

  public ScalaWorkerThread(ScalaEvaluator scalaEvaluator) {
    super("scala worker");
    this.scalaEvaluator = scalaEvaluator;
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
          scalaEvaluator.clearShell();
        }

        // get next job descriptor
        j = jobQueue.poll();
        if (j == null)
          continue;

        if (scalaEvaluator.getShell() == null) {
          updateLoader = false;
          scalaEvaluator.newEvaluator();
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

  public void updateLoader() {
    this.updateLoader = true;
  }

  public void doExit() {
    this.exit = true;
  }
}
