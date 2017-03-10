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
import com.twosigma.jupyter.message.Header;
import com.twosigma.jupyter.message.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.zeromq.ZMQ;

import com.twosigma.beaker.jupyter.msg.JupyterMessages;
import com.twosigma.beaker.jupyter.threads.AbstractMessageReaderThread;

import static com.twosigma.beaker.jupyter.msg.JupyterMessages.SHUTDOWN_REPLY;
import static com.twosigma.beaker.jupyter.msg.JupyterMessages.SHUTDOWN_REQUEST;

public class ControlThread extends AbstractMessageReaderThread {

  public static final Logger logger = LoggerFactory.getLogger(ControlThread.class);

  public ControlThread(ZMQ.Socket socket, Kernel kernel) {
    super(socket, kernel);
  }

  @Override
  public void run() {
    while (getRunning()) {
      Message message = readMessage();
      JupyterMessages type = message.getHeader().getTypeEnum();
      if (type.equals(SHUTDOWN_REQUEST)) {
        logger.info("Control handler received a shutdown request");
        getKernel().shutdown();
        Message reply = new Message();
        reply.setHeader(new Header(SHUTDOWN_REPLY, message.getHeader().getSession()));
        reply.setParentHeader(message.getHeader());
        reply.setContent(message.getContent());
        send(reply);
      } else {
        logger.warn("Unhandled control message: {}", type);
      }
    }
    logger.info("ControlThread shutdown.");
  }

}