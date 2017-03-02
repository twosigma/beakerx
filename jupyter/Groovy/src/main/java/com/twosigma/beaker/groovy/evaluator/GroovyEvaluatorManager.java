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
package com.twosigma.beaker.groovy.evaluator;

import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import org.lappsgrid.jupyter.groovy.GroovyKernelFunctionality;
import org.lappsgrid.jupyter.groovy.msg.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

public class GroovyEvaluatorManager {
  
  public static Logger logger = LoggerFactory.getLogger(GroovyEvaluatorManager.class);
  
  protected GroovyEvaluator groovyEvaluator = null;
  protected GroovyKernelFunctionality kernel;
  
  public GroovyEvaluatorManager(GroovyKernelFunctionality kernel) {
    this.kernel = kernel;
    groovyEvaluator = new GroovyEvaluator(kernel.getId(), kernel.getId());
    groovyEvaluator.startWorker();
  }

  public synchronized void setShellOptions(String cp, String in, String od){
    try {
      groovyEvaluator.setShellOptions(cp, in, od);
    } catch (IOException e) {
      logger.error("Error while setting Shell Options", e);
    }
  }

  public synchronized void killAllThreads(){
    groovyEvaluator.killAllThreads();
  }

  public synchronized void executeCode(String code, Message message, int executionCount){
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code);
    seo.setJupyterMessage(message);
    seo.setExecutionCount(executionCount);
    seo.addObserver(kernel.getExecutionResultSender());
    groovyEvaluator.evaluate(seo, code);
  }
  
  public void exit() {
    groovyEvaluator.exit();
  }
  
}