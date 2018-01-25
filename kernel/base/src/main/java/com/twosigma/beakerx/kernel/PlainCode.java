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
import com.twosigma.beakerx.message.Message;

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

  private void handleResult(SimpleEvaluationObject seo, TryResult either) {
    try {
      if (either.isResult()) {
        seo.finished(either.result());
      } else {
        seo.error(either.error());
      }
    } catch (Exception e) {
      seo.error(e.getLocalizedMessage());
    }
  }

  @Override
  public void executeLastFrame(Code code, KernelFunctionality kernel, Message message, int executionCount) {
    SimpleEvaluationObject seo = createSimpleEvaluationObject(this.plainCode, kernel, message, executionCount);
    TryResult either = kernel.executeCode(this.plainCode, seo);
    handleResult(seo, either);
  }

  public static SimpleEvaluationObject createSimpleEvaluationObject(String code, KernelFunctionality kernel, Message message, int executionCount) {
    SimpleEvaluationObject seo = new SimpleEvaluationObject(code);
    seo.setJupyterMessage(message);
    seo.setExecutionCount(executionCount);
    seo.addObserver(kernel.getExecutionResultSender());
    return seo;
  }
}
