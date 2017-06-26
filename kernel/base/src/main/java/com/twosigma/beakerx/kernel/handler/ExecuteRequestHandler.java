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


import com.twosigma.beakerx.kernel.commands.MagicCommand;
import com.twosigma.beakerx.kernel.commands.MagicCommandResult;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.handler.KernelHandler;
import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Semaphore;

import static com.twosigma.beakerx.kernel.msg.JupyterMessages.EXECUTE_INPUT;

/**
 * Does the actual work of executing user code.
 *
 * @author konst
 */
public class ExecuteRequestHandler extends KernelHandler<Message> {

  private MagicCommand magicCommand;
  private int executionCount;
  private final Semaphore syncObject = new Semaphore(1, true);

  public ExecuteRequestHandler(KernelFunctionality kernel) {
    super(kernel);
    this.executionCount = 0;
    magicCommand = new MagicCommand(kernel);
  }

  @Override
  public void handle(Message message) {
    try {
      handleMsg(message);
    } catch (InterruptedException e) {
      throw new RuntimeException(e);
    }
  }

  private void handleMsg(Message message) throws InterruptedException {
    syncObject.acquire();
    kernel.sendBusyMessage(message);
    executionCount += 1;
    Code code = takeCodeFrom(message);
    announceThatWeHaveTheCode(message, code);
    if (code.isaMagicCommand()) {
      handleMagicCommand(message, code);
    } else {
      runCode(code.asString(), message);
    }
  }

  private void handleMagicCommand(Message message, Code code) {
    MagicCommandResult magicCommandResult = magicCommand.process(code, message, executionCount);
    if (magicCommandResult.hasCodeToExecute()) {
      runCode(magicCommandResult.getCode().get().asString(), message);
    } else if (magicCommandResult.hasResult()) {
      sendMagicCommandReplyAndResult(message, magicCommandResult.replyMessage().get(), magicCommandResult.getResultMessage().get());
    } else {
      sendMagicCommandReply(message, magicCommandResult.replyMessage().get());
    }
  }

  private Code takeCodeFrom(Message message) {
    String code = "";
    if (message.getContent() != null && message.getContent().containsKey("code")) {
      code = ((String) message.getContent().get("code")).trim();
    }
    return new Code(code);
  }

  private void sendMagicCommandReply(Message message, Message replyMessage) {
    kernel.send(replyMessage);
    kernel.sendIdleMessage(message);
    syncObject.release();
  }

  private void sendMagicCommandReplyAndResult(Message message, Message replyMessage, Message resultMessage) {
    kernel.publish(resultMessage);
    sendMagicCommandReply(message, replyMessage);
  }

  private void runCode(String code, Message message) {
    kernel.executeCode(code, message, executionCount, (seo) -> {
      kernel.sendIdleMessage(seo.getJupyterMessage());
      syncObject.release();
    });
  }

  private void announceThatWeHaveTheCode(Message message, Code code) {
    Message reply = new Message();
    reply.setParentHeader(message.getHeader());
    reply.setIdentities(message.getIdentities());
    reply.setHeader(new Header(EXECUTE_INPUT, message.getHeader().getSession()));
    Map<String, Serializable> map1 = new HashMap<>(2);
    map1.put("execution_count", executionCount);
    map1.put("code", code.asString());
    reply.setContent(map1);
    kernel.publish(reply);
  }

  @Override
  public void exit() {
  }

}
