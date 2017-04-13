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
package com.twosigma.beaker.jupyter.handler;


import com.twosigma.beaker.jupyter.commands.MagicCommand;
import com.twosigma.jupyter.KernelFunctionality;
import com.twosigma.jupyter.handler.KernelHandler;
import com.twosigma.jupyter.message.Header;
import com.twosigma.jupyter.message.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import static com.twosigma.beaker.jupyter.msg.JupyterMessages.EXECUTE_INPUT;
import static com.twosigma.beaker.jupyter.msg.JupyterMessages.STATUS;

/**
 * Does the actual work of executing user code.
 *
 * @author konst
 */
public class ExecuteRequestHandler extends KernelHandler<Message> {

  private final static Logger logger = LoggerFactory.getLogger(ExecuteRequestHandler.class);

  private int executionCount;
  private KernelFunctionality kernel;
  private MagicCommand magicCommand;

  public ExecuteRequestHandler(KernelFunctionality kernel) {
    super(kernel);
    this.kernel = kernel;
    magicCommand = new MagicCommand(kernel);
    executionCount = 0;
  }

  @Override
  public void handle(Message message) {
    logger.info("Processing execute request");
    handleMessage(message);
  }

  private synchronized void handleMessage(Message message) {
    Message reply = new Message();
    Map<String, Serializable> map = new HashMap<>(1);
    map.put("execution_state", "busy");
    reply.setContent(map);
    reply.setHeader(new Header(STATUS, message.getHeader().getSession()));
    reply.setParentHeader(message.getHeader());
    reply.setIdentities(message.getIdentities());
    publish(reply);

    // Get the code to be executed from the message.
    String code = "";
    if (message.getContent() != null && message.getContent().containsKey("code")) {
      code = ((String) message.getContent().get("code")).trim();
    }

    // Announce that we have the code.
    reply.setHeader(new Header(EXECUTE_INPUT, message.getHeader().getSession()));
    Map<String, Serializable> map1 = new HashMap<String, Serializable>(2);
    map1.put("execution_count", executionCount);
    map1.put("code", code);
    reply.setContent(map1);
    publish(reply);

    ++executionCount;
    if (!code.startsWith("%")) {
       kernel.executeCode(code, message, executionCount);
      // execution response in ExecuteResultHandler
    } else {
      String command = new Scanner(code).next();
      if (magicCommand.commands.containsKey(command)) {
        magicCommand.commands.get(command).process(code, message, executionCount);
      } else {
        magicCommand.processUnknownCommand(command, message, executionCount);
      }
    }
  }

  @Override
  public void exit() {
  }

}