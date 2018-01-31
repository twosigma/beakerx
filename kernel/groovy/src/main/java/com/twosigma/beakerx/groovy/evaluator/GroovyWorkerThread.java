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
import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.evaluator.JobDescriptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.Callable;

class GroovyWorkerThread implements Callable<TryResult> {

  private static final Logger logger = LoggerFactory.getLogger(GroovyWorkerThread.class.getName());
  private final JobDescriptor j;
  protected GroovyEvaluator groovyEvaluator;

  GroovyWorkerThread(GroovyEvaluator groovyEvaluator, JobDescriptor j) {
    this.groovyEvaluator = groovyEvaluator;
    this.j = j;
  }

  @Override
  public TryResult call() throws Exception {
    NamespaceClient nc = null;
    TryResult r;
    try {
      if (!GroovyEvaluator.LOCAL_DEV) {
        nc = NamespaceClient.getBeaker(groovyEvaluator.getSessionId());
        nc.setOutputObj(j.outputObject);
      }
      j.outputObject.started();
      String code = j.codeToBeExecuted;
      r = groovyEvaluator.executeTask(new GroovyCodeRunner(groovyEvaluator, code, j.outputObject));
      if (nc != null) {
        nc.setOutputObj(null);
        nc = null;
      }
    } catch (Throwable e) {
      if (e instanceof GroovyNotFoundException) {
        logger.warn(e.getLocalizedMessage());
        r = TryResult.createError(e.getLocalizedMessage());
      } else {
        e.printStackTrace();
        r = TryResult.createError(e.getLocalizedMessage());
      }
    } finally {
      if (nc != null) {
        nc.setOutputObj(null);
        nc = null;
      }
    }
    return r;
  }
}
