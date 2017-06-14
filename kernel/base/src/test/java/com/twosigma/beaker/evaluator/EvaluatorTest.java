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

package com.twosigma.beaker.evaluator;

import com.twosigma.beaker.autocomplete.AutocompleteResult;
import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.jupyter.KernelParameters;
import com.twosigma.jupyter.PathToJar;

import java.io.IOException;
import java.util.ArrayList;

public class EvaluatorTest implements Evaluator {

  KernelParameters kernelParameters;
  SimpleEvaluationObject seo;
  String code;
  boolean killAllThreads;
  boolean startWorker;
  boolean exit;

  @Override
  public void setShellOptions(KernelParameters kernelParameters) throws IOException {
    this.kernelParameters = kernelParameters;
  }

  @Override
  public void addJarToClasspath(PathToJar path) {

  }

  @Override
  public AutocompleteResult autocomplete(String code, int caretPosition) {
    return new AutocompleteResult(new ArrayList<>(), 0);
  }

  @Override
  public void killAllThreads() {
    killAllThreads = true;
  }

  @Override
  public void evaluate(SimpleEvaluationObject seo, String code) {
    this.seo = seo;
    this.code = code;
  }

  @Override
  public void startWorker() {
    startWorker = true;
  }

  @Override
  public void exit() {
    exit = true;
  }

  public SimpleEvaluationObject getSeo() {
    return seo;
  }

  public String getCode() {
    return code;
  }

  public boolean isCallKillAllThreads() {
    return killAllThreads;
  }

  public boolean isCallStartWorker() {
    return startWorker;
  }

  public void clearStartWorkerFlag() {
    startWorker = false;
  }

  public boolean isCallExit() {
    return exit;
  }

}
