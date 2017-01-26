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

import static com.twosigma.beaker.groovy.GroovyDefaultVariables.CLASS_PATH;
import static com.twosigma.beaker.groovy.GroovyDefaultVariables.IMPORTS;
import static com.twosigma.beaker.groovy.GroovyDefaultVariables.OUT_DIR;

import java.io.IOException;

import org.lappsgrid.jupyter.groovy.GroovyKernel;
import org.lappsgrid.jupyter.groovy.msg.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.twosigma.beaker.groovy.SimpleEvaluationObject;

public class GroovyEvaluatorManager {
  
  public static Logger logger = LoggerFactory.getLogger(GroovyEvaluatorManager.class);
  
  protected GroovyEvaluator groovyEvaluator = null;
  protected GroovyKernel kernel;
  
  public GroovyEvaluatorManager(GroovyKernel kernel) {
    this.kernel = kernel;
    groovyEvaluator = new GroovyEvaluator(kernel.getId(), kernel.getId());
    try {
      groovyEvaluator.setShellOptions(CLASS_PATH, IMPORTS, OUT_DIR);
    } catch (IOException e) {
      logger.error("Error while setting Shell Options: " + e.getMessage());
    }
    groovyEvaluator.startWorker();
  }
  
  public void executeCode(String code, Message message, int executionCount){
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