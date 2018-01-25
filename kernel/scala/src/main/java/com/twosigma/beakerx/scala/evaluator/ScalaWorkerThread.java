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
import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.evaluator.JobDescriptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.Callable;

class ScalaWorkerThread implements Callable<TryResult> {

  private final static Logger logger = LoggerFactory.getLogger(ScalaWorkerThread.class.getName());

  private ScalaEvaluator scalaEvaluator;
  private final JobDescriptor j;

  public ScalaWorkerThread(ScalaEvaluator scalaEvaluator, JobDescriptor j) {
    this.scalaEvaluator = scalaEvaluator;
    this.j = j;
  }

  @Override
  public TryResult call() throws Exception {
    NamespaceClient nc = null;
    TryResult either;

    try {
      j.outputObject.started();

      nc = NamespaceClient.getBeaker(scalaEvaluator.getSessionId());
      nc.setOutputObj(j.outputObject);
      either = scalaEvaluator.executeTask(new ScalaCodeRunner(scalaEvaluator, j.codeToBeExecuted, j.outputObject));
//      if (!either.isLeft()) {
//        j.outputObject.error(INTERUPTED_MSG);
//      }
      if (nc != null) {
        nc.setOutputObj(null);
        nc = null;
      }
    } catch (Throwable e) {
      e.printStackTrace();
      either = TryResult.createError(e.getMessage());
    } finally {
      if (nc != null) {
        nc.setOutputObj(null);
        nc = null;
      }
    }

    NamespaceClient.delBeaker(scalaEvaluator.getSessionId());
    return either;
  }

  public void doExit() {

  }
}
