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
package com.twosigma.beakerx.sql.evaluator;

import com.twosigma.beakerx.NamespaceClient;
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

class SQLWorkerThread extends Thread {

  private final static Logger logger = LoggerFactory.getLogger(SQLWorkerThread.class.getName());
  private SQLEvaluator sqlEvaluator;

  SQLWorkerThread(SQLEvaluator sqlEvaluator) {
    super("sql worker");
    this.sqlEvaluator = sqlEvaluator;
  }
      /*
      * This thread performs all the evaluation
      */

  public void run() {
    BaseEvaluator.JobDescriptor job;
    NamespaceClient namespaceClient;

    while (!sqlEvaluator.exit) {
      try {
        sqlEvaluator.syncObject.acquire();
      } catch (InterruptedException e) {
        logger.error(e.getMessage());
      }

      if (sqlEvaluator.exit) {
        break;
      }

      job = sqlEvaluator.jobQueue.poll();
      job.getSimpleEvaluationObject().started();

      job.getSimpleEvaluationObject().setOutputHandler();
      namespaceClient = NamespaceClient.getBeaker(sqlEvaluator.getSessionId());
      namespaceClient.setOutputObj(job.getSimpleEvaluationObject());

      sqlEvaluator.executeTask(new SQLCodeRunner(sqlEvaluator, job.getSimpleEvaluationObject(), namespaceClient));

      job.getSimpleEvaluationObject().clrOutputHandler();

      namespaceClient.setOutputObj(null);
      if (job != null && job.getSimpleEvaluationObject() != null) {
        job.getSimpleEvaluationObject().executeCodeCallback();
      }
    }
  }
}
