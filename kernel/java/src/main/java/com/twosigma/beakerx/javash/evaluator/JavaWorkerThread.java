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
import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.evaluator.JobDescriptor;

import java.util.concurrent.Callable;

class JavaWorkerThread implements Callable<TryResult> {

  private JavaEvaluator javaEvaluator;
  private final JobDescriptor j;

  public JavaWorkerThread(JavaEvaluator javaEvaluator, JobDescriptor j) {
    this.javaEvaluator = javaEvaluator;
    this.j = j;
  }

  @Override
  public TryResult call() throws Exception {
    NamespaceClient nc = null;
    TryResult r;
    try {
      nc = NamespaceClient.getBeaker(javaEvaluator.getSessionId());
      nc.setOutputObj(j.outputObject);
      r = javaEvaluator.executeTask(new JavaCodeRunner(javaEvaluator, j.outputObject, j));
//      if (!either.isLeft()) {
//        j.outputObject.error(INTERUPTED_MSG);
//      }
    } catch (Throwable e) {
      e.printStackTrace();
      r = TryResult.createError(e.getLocalizedMessage());
    } finally {
      if (nc != null) {
        nc.setOutputObj(null);
        nc = null;
      }
    }
    return r;
  }
}
