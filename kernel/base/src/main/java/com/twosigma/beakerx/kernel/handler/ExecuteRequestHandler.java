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


import com.twosigma.beakerx.kernel.magic.command.CodeFactory;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.handler.KernelHandler;
import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Semaphore;

import static com.twosigma.beakerx.kernel.handler.MagicCommandExecutor.executeMagicCommands;
import static com.twosigma.beakerx.kernel.msg.JupyterMessages.EXECUTE_INPUT;

/**
 * Does the actual work of executing user code.
 *
 * @author konst
 */
public class ExecuteRequestHandler extends KernelHandler<Message> {

  private int executionCount;
  private final Semaphore syncObject = new Semaphore(1, true);

  public ExecuteRequestHandler(KernelFunctionality kernel) {
    super(kernel);
    this.executionCount = 0;
  }

  @Override
  public void handle(Message message) {
    try {
      handleMsg(message);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  private void handleMsg(Message message) throws Exception {
    syncObject.acquire();
    kernel.sendBusyMessage(message);
    executionCount += 1;
    String codeString = takeCodeFrom(message);
    announceTheCode(message, codeString);
    Code code = CodeFactory.create(codeString, message, executionCount, kernel);
    executeMagicCommands(code, executionCount, kernel);
    executeCodeBlock(code);
  }

  private void finishExecution(Message message) {
    kernel.sendIdleMessage(message);
    syncObject.release();
  }

  private void executeCodeBlock(Code code) {
    if (code.getCodeBlock().isPresent()) {
      kernel.executeCode(code.getCodeBlock().get(), code.getMessage(), executionCount, (seo) -> {
        finishExecution(seo.getJupyterMessage());
      });
    } else {
      finishExecution(code.getMessage());
    }
  }

  private String takeCodeFrom(Message message) {
    String code = "";
    if (message.getContent() != null && message.getContent().containsKey("code")) {
      code = ((String) message.getContent().get("code")).trim();
    }
    return code;
  }

  private void announceTheCode(Message message, String code) {
    Message reply = new Message();
    reply.setParentHeader(message.getHeader());
    reply.setIdentities(message.getIdentities());
    reply.setHeader(new Header(EXECUTE_INPUT, message.getHeader().getSession()));
    Map<String, Serializable> map1 = new HashMap<>(2);
    map1.put("execution_count", executionCount);
    map1.put("code", code);
    reply.setContent(map1);
    kernel.publish(reply);
  }

  @Override
  public void exit() {
  }

}
