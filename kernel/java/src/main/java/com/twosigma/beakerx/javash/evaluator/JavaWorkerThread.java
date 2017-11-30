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
package com.twosigma.beakerx.javash.evaluator;

import com.twosigma.beakerx.NamespaceClient;
import com.twosigma.beakerx.evaluator.JobDescriptor;
import com.twosigma.beakerx.evaluator.WorkerThread;

import static com.twosigma.beakerx.evaluator.BaseEvaluator.INTERUPTED_MSG;

class JavaWorkerThread extends WorkerThread {

  private JavaEvaluator javaEvaluator;
  private boolean exit;

  public JavaWorkerThread(JavaEvaluator javaEvaluator) {
    super("javash worker");
    this.javaEvaluator = javaEvaluator;
    exit = false;
  }

  /*
   * This thread performs all the evaluation
   */
  public void run() {

    JobDescriptor j;
    NamespaceClient nc = null;
    while (!exit) {
      try {
        syncObject.acquire();
        j = jobQueue.poll();
        if (j == null) {
          continue;
        }
        nc = NamespaceClient.getBeaker(javaEvaluator.getSessionId());
        nc.setOutputObj(j.outputObject);
        if (!javaEvaluator.executeTask(new JavaCodeRunner(javaEvaluator, j.outputObject,j))) {
          j.outputObject.error(INTERUPTED_MSG);
        }
      } catch (Throwable e) {
        e.printStackTrace();
      } finally {
        if (nc != null) {
          nc.setOutputObj(null);
          nc = null;
        }
      }
    }
    NamespaceClient.delBeaker(javaEvaluator.getSessionId());
  }

  public void doExit() {
    this.exit = true;
  }

}
