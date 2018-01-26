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
package com.twosigma.beakerx.kotlin.evaluator;

import com.twosigma.beakerx.NamespaceClient;
import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.evaluator.JobDescriptor;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.concurrent.Callable;

class KotlinWorkerThread implements Callable<TryResult> {

  private static final String WRAPPER_CLASS_NAME = "BeakerWrapperClass1261714175";
  private KotlinEvaluator kotlinEvaluator;
  private final JobDescriptor j;

  public KotlinWorkerThread(KotlinEvaluator kotlinEvaluator, JobDescriptor j) {
    this.kotlinEvaluator = kotlinEvaluator;
    this.j = j;
  }

  @Override
  public TryResult call() throws Exception {
    NamespaceClient nc = null;
    TryResult either;
    try {

      nc = NamespaceClient.getBeaker(kotlinEvaluator.getSessionId());
      nc.setOutputObj(j.outputObject);

      j.outputObject.started();

      try {
        KotlinCodeRunner kotlinCodeRunner = new KotlinCodeRunner(j.outputObject, kotlinEvaluator.getClassLoader(), kotlinEvaluator.getRepl(), j.codeToBeExecuted);
        either = kotlinEvaluator.executeTask(kotlinCodeRunner);
        if (nc != null) {
          nc.setOutputObj(null);
          nc = null;
        }

      } catch (Exception e) {
        either = TryResult.createError(e.getMessage());
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
    return either;
  }

  public void doExit() {
    removeKtFile();
  }

  private void removeKtFile() {
    try {
      Files.deleteIfExists(new File(kotlinEvaluator.getOutDir() + "\\" + WRAPPER_CLASS_NAME + ".kt").toPath());
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }
}
