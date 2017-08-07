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
package com.twosigma.beakerx.clojure.evaluator;

import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.evaluator.WorkerThread;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

class ClojureWorkerThread extends WorkerThread {

  private final static Logger logger = LoggerFactory.getLogger(ClojureWorkerThread.class.getName());
  private ClojureEvaluator clojureEvaluator;

  public ClojureWorkerThread(ClojureEvaluator clojureEvaluator) {
    super("clojure worker");
    this.clojureEvaluator = clojureEvaluator;
  }

  /*
   * This thread performs all the evaluation
   */

  public void run() {
    BaseEvaluator.JobDescriptor j = null;

    while (!clojureEvaluator.exit) {
      try {
        // wait for work
        syncObject.acquire();

        // get next job descriptor
        j = jobQueue.poll();
        if (j == null)
          continue;

        j.outputObject.started();

        if (!clojureEvaluator.executeTask(new ClojureCodeRunner(clojureEvaluator, j.codeToBeExecuted, j.outputObject))) {
          j.outputObject.error("... cancelled!");
        }
      } catch (Throwable e) {
        logger.error(e.getMessage());
      } finally {
        if (j != null && j.outputObject != null) {
          j.outputObject.executeCodeCallback();
        }
      }
    }
  }

}
