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

import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.evaluator.JobDescriptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.Callable;

class ClojureWorkerThread implements Callable<TryResult> {

  private final static Logger logger = LoggerFactory.getLogger(ClojureWorkerThread.class.getName());
  private ClojureEvaluator clojureEvaluator;
  private final JobDescriptor j;

  ClojureWorkerThread(ClojureEvaluator clojureEvaluator, JobDescriptor j) {
    this.clojureEvaluator = clojureEvaluator;
    this.j = j;
  }

  @Override
  public TryResult call() {
    TryResult r;
    try {
      j.outputObject.started();
      r = clojureEvaluator.executeTask(new ClojureCodeRunner(clojureEvaluator, j.codeToBeExecuted, j.outputObject), j.getExecutionOptions());
    } catch (Throwable e) {
      logger.error(e.getMessage());
      r = TryResult.createError(e.getLocalizedMessage());
    }
    return r;
  }

  void doExit() {
  }
}
