/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.jvm.object;

import com.twosigma.beakerx.jvm.threads.BeakerOutputHandler;
import com.twosigma.beakerx.jvm.threads.BxInputStream;
import com.twosigma.beakerx.jvm.threads.InputRequestMessageFactoryImpl;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.message.Message;

public class ConfigurationFactoryImpl implements ConfigurationFactory {
  private KernelFunctionality kernel;
  private Message message;
  private int executionCount;

  public ConfigurationFactoryImpl(KernelFunctionality kernel, Message message, int executionCount) {
    this.kernel = kernel;
    this.message = message;
    this.executionCount = executionCount;
  }

  @Override
  public Configuration create(SimpleEvaluationObject seo) {
    BxInputStream stdin = new BxInputStream(kernel, new InputRequestMessageFactoryImpl());
    BeakerOutputHandler stdout = new SimpleEvaluationObject.SimpleOutputHandler(false, kernel.getExecutionResultSender(), seo);
    BeakerOutputHandler stderr = new SimpleEvaluationObject.SimpleOutputHandler(true, kernel.getExecutionResultSender(), seo);
    return new Configuration(stdin, stdout, stderr, kernel.getExecutionResultSender(), message, executionCount);
  }
}
