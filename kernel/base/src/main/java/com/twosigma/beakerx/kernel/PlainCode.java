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
package com.twosigma.beakerx.kernel;

import com.twosigma.beakerx.TryResult;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.magic.command.outcome.MagicCommandOutcomeItem;
import com.twosigma.beakerx.message.Message;

import java.util.Optional;

public class PlainCode extends CodeFrame {

  private String plainCode;

  public PlainCode(String plainCode) {
    this.plainCode = plainCode;
  }

  public String getPlainCode() {
    return plainCode;
  }

  @Override
  public void executeFrame(Code code, KernelFunctionality kernel, Message message, int executionCount) {
    SimpleEvaluationObject seo = createSimpleEvaluationObject(this.plainCode, kernel, message, executionCount);
    seo.noResult();
    TryResult either = kernel.executeCode(this.plainCode, seo);
    handleResult(seo, either);
  }

  @Override
  public void executeLastFrame(Code code, KernelFunctionality kernel, Message message, int executionCount) {
    SimpleEvaluationObject seo = createSimpleEvaluationObject(this.plainCode, kernel, message, executionCount);
    TryResult either = kernel.executeCode(this.plainCode, seo);
    handleResult(seo, either);
  }

  @Override
  public Optional<MagicCommandOutcomeItem> getError() {
    return Optional.empty();
  }

  public static SimpleEvaluationObject createSimpleEvaluationObject(String code, KernelFunctionality kernel, Message message, int executionCount) {
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code);
    seo.setJupyterMessage(message);
    seo.setExecutionCount(executionCount);
    seo.addObserver(kernel.getExecutionResultSender());
    return seo;
  }
}
