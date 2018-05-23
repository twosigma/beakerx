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
package com.twosigma.beakerx.kernel.handler;

import com.twosigma.beakerx.handler.KernelHandler;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.magic.command.CodeFactory;
import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import static com.twosigma.beakerx.kernel.PlainCode.createSimpleEvaluationObject;
import static com.twosigma.beakerx.kernel.msg.JupyterMessages.EXECUTE_INPUT;
import static java.util.Collections.singletonList;

/**
 * Does the actual work of executing user code.
 *
 * @author konst
 */
public class ExecuteRequestHandler extends KernelHandler<Message> {

  private int executionCount;
  private ExecutorService executorService = Executors.newFixedThreadPool(1);

  public ExecuteRequestHandler(KernelFunctionality kernel) {
    super(kernel);
    this.executionCount = 0;
  }

  @Override
  public void handle(Message message) {
    executorService.submit(() -> {
      try {
        handleMsg(message);
      } catch (Exception e) {
        handleException(message, e);
      }
    });
  }

  private void handleMsg(Message message) {
    kernel.sendBusyMessage(message);
    executionCount += 1;
    String codeString = takeCodeFrom(message);
    announceTheCode(message, codeString);
    Code code = CodeFactory.create(codeString, message, kernel);
    code.execute(kernel, executionCount);
    finishExecution(message);
  }

  private void finishExecution(Message message) {
    kernel.sendIdleMessage(message);
  }

  private String takeCodeFrom(Message message) {
    String code = "";
    if (message.getContent() != null && message.getContent().containsKey("code")) {
      code = ((String) message.getContent().get("code")).trim();
    }
    return code;
  }

  private void announceTheCode(Message message, String code) {
    Message reply = new Message(new Header(EXECUTE_INPUT, message.getHeader().getSession()));
    reply.setParentHeader(message.getHeader());
    reply.setIdentities(message.getIdentities());
    Map<String, Serializable> map1 = new HashMap<>(2);
    map1.put("execution_count", executionCount);
    map1.put("code", code);
    reply.setContent(map1);
    kernel.publish(singletonList(reply));
  }

  private void handleException(Message message, Exception e) {
    SimpleEvaluationObject seo = createSimpleEvaluationObject(takeCodeFrom(message), kernel, message, executionCount);
    seo.error(e);
  }

  @Override
  public void exit() {
  }

}
