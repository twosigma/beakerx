/*
 *  Copyright 2014-2017 TWO SIGMA OPEN SOURCE, LLC
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

import com.twosigma.beakerx.autocomplete.AutocompleteResult;
import com.twosigma.beakerx.autocomplete.ClasspathScanner;
import com.twosigma.beakerx.evaluator.BaseEvaluator;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.jvm.threads.BeakerCellExecutor;
import com.twosigma.beakerx.jvm.threads.CellExecutor;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class KotlinEvaluator extends BaseEvaluator {

  protected final String packageId;
  protected ClasspathScanner cps;
  protected boolean exit;
  protected boolean updateLoader;
  protected KotlinWorkerThread myWorker;

  public KotlinEvaluator(String id, String sId) {
    this(id, sId, new BeakerCellExecutor("kotlin"));
  }

  public KotlinEvaluator(String id, String sId, CellExecutor cellExecutor) {
    super(id, sId, cellExecutor);
    packageId = "com.twosigma.beaker.kotlin.bkr" + shellId.split("-")[0];
    cps = new ClasspathScanner();
    exit = false;
    updateLoader = true;
    startWorker();
  }

  private void startWorker() {
    myWorker = new KotlinWorkerThread(this);
    myWorker.start();
  }

  @Override
  protected void doResetEnvironment() {
    String cpp = "";
    for (String pt : classPath.getPathsAsStrings()) {
      cpp += pt;
      cpp += File.pathSeparator;
    }
    cpp += File.pathSeparator;
    cpp += outDir;
    cpp += File.pathSeparator;
    cpp += System.getProperty("java.class.path");

    cps = new ClasspathScanner(cpp);

    // signal thread to create loader
    updateLoader = true;
  }

  @Override
  public void exit() {
    exit = true;
    cancelExecution();
    syncObject.release();
  }

  @Override
  public void evaluate(SimpleEvaluationObject seo, String code) {
    // send job to thread
    jobQueue.add(new JobDescriptor(code, seo));
    syncObject.release();
  }

  @Override
  public AutocompleteResult autocomplete(String code, int caretPosition) {
    List<String> ret = new ArrayList<>();
    //TODO
    return new AutocompleteResult(ret, -1);
  }

  public boolean executeTask(KotlinCodeRunner kotlinCodeRunner) {
    return executor.executeTask(kotlinCodeRunner);
  }
}
