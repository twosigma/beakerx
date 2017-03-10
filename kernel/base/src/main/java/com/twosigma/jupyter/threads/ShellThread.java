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
package com.twosigma.jupyter.threads;

import com.twosigma.jupyter.Kernel;
import com.twosigma.jupyter.handler.Handler;
import com.twosigma.jupyter.message.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.zeromq.ZMQ;

import com.twosigma.beaker.jupyter.threads.AbstractMessageReaderThread;

public class ShellThread extends AbstractMessageReaderThread {

  public static Logger logger = LoggerFactory.getLogger(ShellThread.class);

  public ShellThread(ZMQ.Socket socket, Kernel kernel) {
    super(socket, kernel);
  }

  @Override
  public void run() {
    while (getRunning()) {
      Message message = readMessage();
      logger.info("Processing message = " + message.type());
      Handler<Message> handler = getKernel().getHandler(message.type());
      if (handler != null) {
        handler.handle(message);
      } else {
        logger.warn("Unhandled message type: {}", message.type());
      }
    }
    logger.info("ShellThread shutdown.");
  }
}