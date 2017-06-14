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
import com.twosigma.jupyter.Classpath;
import com.twosigma.jupyter.KernelFunctionality;
import com.twosigma.jupyter.KernelParameters;
import com.twosigma.jupyter.PathToJar;
import com.twosigma.jupyter.message.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

public class EvaluatorManager {

  public static final String THE_KERNEL_IS_NOT_READY = "The kernel was not ready, run the cell again.";
  public static Logger logger = LoggerFactory.getLogger(EvaluatorManager.class);

  protected Evaluator evaluator = null;
  protected KernelFunctionality kernel;
  private CodeExecutor codeExecutor;

  public EvaluatorManager(KernelFunctionality kernel, Evaluator evaluator) {
    this.kernel = kernel;
    this.evaluator = evaluator;
    evaluator.startWorker();
    this.codeExecutor = this::kernelNotReady;
  }

  public synchronized void setShellOptions(final KernelParameters kernelParameters) {
    try {
      evaluator.setShellOptions(kernelParameters);
    } catch (IOException e) {
      logger.error("Error while setting Shell Options", e);
    }
    evaluator.startWorker();
    readyToExecuteCode();
  }

  public AutocompleteResult autocomplete(String code, int caretPosition) {
    return evaluator.autocomplete(code, caretPosition);
  }

  public synchronized void killAllThreads() {
    evaluator.killAllThreads();
  }

  public synchronized SimpleEvaluationObject executeCode(String code, Message message, int executionCount, KernelFunctionality.ExecuteCodeCallback executeCodeCallback) {
    return codeExecutor.executeCode(code, message, executionCount, executeCodeCallback);
  }

  public void exit() {
    evaluator.exit();
  }

  private SimpleEvaluationObject execute(String code, Message message, int executionCount, KernelFunctionality.ExecuteCodeCallback executeCodeCallback) {
    SimpleEvaluationObject seo = createSimpleEvaluationObject(code, message, executionCount, executeCodeCallback);
    evaluator.evaluate(seo, code);
    return seo;
  }

  private SimpleEvaluationObject kernelNotReady(String code, Message message, int executionCount, KernelFunctionality.ExecuteCodeCallback executeCodeCallback) {
    SimpleEvaluationObject seo = createSimpleEvaluationObject(code, message, executionCount, executeCodeCallback);
    seo.error(THE_KERNEL_IS_NOT_READY);
    seo.executeCodeCallback();
    return seo;
  }

  private SimpleEvaluationObject createSimpleEvaluationObject(String code, Message message, int executionCount, KernelFunctionality.ExecuteCodeCallback executeCodeCallback) {
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code, executeCodeCallback);
    seo.setJupyterMessage(message);
    seo.setExecutionCount(executionCount);
    seo.addObserver(kernel.getExecutionResultSender());
    return seo;
  }

  private void readyToExecuteCode() {
    codeExecutor = this::execute;
  }

  public void addJarToClasspath(PathToJar path) {
   this.evaluator.addJarToClasspath(path);
  }

  public Classpath getClasspath() {
    return this.evaluator.getClasspath();
  }

  interface CodeExecutor {
    SimpleEvaluationObject executeCode(String code, Message message, int executionCount, KernelFunctionality.ExecuteCodeCallback executeCodeCallback);
  }

}
