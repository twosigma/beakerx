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
import com.twosigma.beakerx.evaluator.JobDescriptor;
import com.twosigma.beakerx.evaluator.WorkerThread;
import com.twosigma.beakerx.kotlin.evaluator.ReplWithClassLoaderFactory.ReplWithClassLoader;
import org.jetbrains.kotlin.cli.common.repl.ReplClassLoader;
import org.jetbrains.kotlin.cli.jvm.repl.ReplInterpreter;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

import static com.twosigma.beakerx.evaluator.BaseEvaluator.INTERUPTED_MSG;
import static com.twosigma.beakerx.kotlin.evaluator.ReplWithClassLoaderFactory.createReplWithClassLoader;

class KotlinWorkerThread extends WorkerThread {

  private static final String WRAPPER_CLASS_NAME = "BeakerWrapperClass1261714175";
  private KotlinEvaluator kotlinEvaluator;
  protected boolean exit;
  protected boolean updateLoader;
  private ReplInterpreter repl;


  public KotlinWorkerThread(KotlinEvaluator kotlinEvaluator) {
    super("kotlin worker");
    this.kotlinEvaluator = kotlinEvaluator;
    exit = false;
    updateLoader = true;
  }

  @Override
  public void run() {
    ReplClassLoader loader = null;
    JobDescriptor j = null;

    NamespaceClient nc = null;

    while (!exit) {
      try {
        syncObject.acquire();

        if (loader == null || updateLoader) {
          ReplWithClassLoader replWithClassLoader = createReplWithClassLoader(this.kotlinEvaluator);
          repl = replWithClassLoader.getRepl();
          loader = replWithClassLoader.getLoader();
          this.updateLoader = false;
        }

        j = jobQueue.poll();
        if (j == null)
          continue;

        nc = NamespaceClient.getBeaker(kotlinEvaluator.getSessionId());
        nc.setOutputObj(j.outputObject);

        j.outputObject.started();

        try {
          if (!kotlinEvaluator.executeTask(new KotlinCodeRunner(j.outputObject, loader, repl, j.codeToBeExecuted))) {
            j.outputObject.error(INTERUPTED_MSG);
          }
          if (nc != null) {
            nc.setOutputObj(null);
            nc = null;
          }

        } catch (Exception e) {
          j.outputObject.error(e);
        }
        j = null;
      } catch (Throwable e) {
        e.printStackTrace();
      } finally {
        if (nc != null) {
          nc.setOutputObj(null);
          nc = null;
        }
      }
    }
    NamespaceClient.delBeaker(kotlinEvaluator.getSessionId());
  }

  public void updateLoader() {
    this.updateLoader = true;
  }

  public void doExit() {
    this.exit = true;
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
