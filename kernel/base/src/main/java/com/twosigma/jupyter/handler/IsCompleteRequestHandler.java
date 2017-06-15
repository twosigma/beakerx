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
package com.twosigma.jupyter.handler;

import com.twosigma.jupyter.KernelFunctionality;
import com.twosigma.jupyter.message.Header;
import com.twosigma.jupyter.message.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.util.HashMap;

import static com.twosigma.beakerx.jupyter.msg.JupyterMessages.IS_COMPLETE_REPLY;
import static com.twosigma.jupyter.handler.KernelHandlerWrapper.wrapBusyIdle;

public class IsCompleteRequestHandler extends KernelHandler<Message> {


  private final static Logger logger = LoggerFactory.getLogger(IsCompleteRequestHandler.class);

  public IsCompleteRequestHandler(KernelFunctionality kernel) {
    super(kernel);
  }

  @Override
  public void handle(Message message) {
    wrapBusyIdle(kernel, message, () -> {
      handleMsg(message);
    });
  }

  private void handleMsg(Message message) {
    logger.debug("Processing is complete request");
    Message reply = new Message();
    HashMap<String, Serializable> map = new HashMap<>();
    map.put("status", "complete");
    reply.setContent(map);
    reply.setHeader(new Header(IS_COMPLETE_REPLY, message.getHeader().getSession()));
    reply.setParentHeader(message.getHeader());
    reply.setIdentities(message.getIdentities());
    send(reply);
  }
}
