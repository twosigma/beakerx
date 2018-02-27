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
import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.evaluator.JobDescriptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.Callable;

class SQLWorkerThread implements Callable<TryResult> {

  private final static Logger logger = LoggerFactory.getLogger(SQLWorkerThread.class.getName());
  private SQLEvaluator sqlEvaluator;
  private final JobDescriptor job;

  SQLWorkerThread(SQLEvaluator sqlEvaluator, JobDescriptor j) {
    this.sqlEvaluator = sqlEvaluator;
    this.job = j;
  }

  @Override
  public TryResult call() throws Exception {
    NamespaceClient namespaceClient = null;
    TryResult r;
    job.getSimpleEvaluationObject().started();
    try {
      job.getSimpleEvaluationObject().setOutputHandler();
      namespaceClient = NamespaceClient.getBeaker(sqlEvaluator.getSessionId());
      namespaceClient.setOutputObj(job.getSimpleEvaluationObject());

      r = sqlEvaluator.executeTask(new SQLCodeRunner(sqlEvaluator, job.getSimpleEvaluationObject(), namespaceClient));
    } finally {
      job.getSimpleEvaluationObject().clrOutputHandler();
      if (namespaceClient != null) {
        namespaceClient.setOutputObj(null);
      }
    }
    return r;
  }

  public void doExit() {
  }
}
