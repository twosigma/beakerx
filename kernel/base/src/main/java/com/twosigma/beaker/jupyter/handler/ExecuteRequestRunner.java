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
import com.twosigma.beaker.jupyter.threads.AbstractThread;
import com.twosigma.jupyter.KernelFunctionality;
import com.twosigma.jupyter.message.Header;
import com.twosigma.jupyter.message.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.Semaphore;

import static com.twosigma.beaker.jupyter.msg.JupyterMessages.EXECUTE_INPUT;

public class ExecuteRequestRunner  extends AbstractThread{


  public static final Logger logger = LoggerFactory.getLogger(ExecuteRequestRunner.class);
  private final BlockingQueue<Message> messageQueue = new LinkedBlockingQueue<>();
  private final Semaphore syncObject = new Semaphore(1, true);

  private KernelFunctionality kernel;
  private MagicCommand magicCommand;
  private int executionCount;


  public ExecuteRequestRunner(KernelFunctionality kernel) {
    this.kernel = kernel;
    this.executionCount = 0;
    magicCommand = new MagicCommand(kernel);
  }

  public void add(Message message) {
    messageQueue.add(message);
  }

  @Override
  public void run() {
    while (getRunning()) {
      try {
        syncObject.acquire();
        Message action = messageQueue.take();
        if (getRunning()) {
          handleMessage(action);
        }
      } catch (InterruptedException e) {
        throw new RuntimeException(e);
      }
    }
    logger.debug("ExecuteRequestRunner shutdown.");
  }

  private void handleMessage(final Message message) throws InterruptedException {
    kernel.sendBusyMessage(message);
    executionCount+=1;
    // Get the code to be executed from the message.
    String code = "";
    if (message.getContent() != null && message.getContent().containsKey("code")) {
      code = ((String) message.getContent().get("code")).trim();
    }

    // Announce that we have the code.
    Message reply = new Message();
    reply.setParentHeader(message.getHeader());
    reply.setIdentities(message.getIdentities());
    reply.setHeader(new Header(EXECUTE_INPUT, message.getHeader().getSession()));
    Map<String, Serializable> map1 = new HashMap<>(2);
    map1.put("execution_count", executionCount);
    map1.put("code", code);
    reply.setContent(map1);
    kernel.publish(reply);

    if (!code.startsWith("%")) {
      kernel.executeCode(code, message, executionCount, (seo) -> {
        kernel.sendIdleMessage(seo.getJupyterMessage());
//        try {
//          Thread.sleep(50);
//        } catch (InterruptedException e) {
//          e.printStackTrace();
//        }
        syncObject.release();
      });
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

}
