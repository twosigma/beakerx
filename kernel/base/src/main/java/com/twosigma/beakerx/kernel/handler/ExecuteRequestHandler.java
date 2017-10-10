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


import static com.twosigma.beakerx.kernel.msg.JupyterMessages.EXECUTE_INPUT;

import com.twosigma.beakerx.handler.KernelHandler;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.commands.CommandExecutor;
import com.twosigma.beakerx.kernel.commands.CommandExecutorImpl;
import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.Semaphore;

/**
 * Does the actual work of executing user code.
 *
 * @author konst
 */
public class ExecuteRequestHandler extends KernelHandler<Message> {

  private int executionCount;
  private final Semaphore syncObject = new Semaphore(1, true);
  private CommandExecutor commandExecutor;

  public ExecuteRequestHandler(KernelFunctionality kernel) {
    super(kernel);
    this.executionCount = 0;
    commandExecutor = new CommandExecutorImpl(kernel);
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
    commandExecutor.execute(message, executionCount);
    syncObject.release();
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

  private Code takeCodeFrom(Message message) {
    String code = "";
    if (message.getContent() != null && message.getContent().containsKey("code")) {
      code = ((String) message.getContent().get("code")).trim();
    }
    return new Code(code);
  }

  @Override
  public void exit() {
  }
}
