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

import static com.twosigma.beakerx.kernel.comm.Comm.COMMS;
import static com.twosigma.beakerx.kernel.comm.Comm.TARGET_NAME;
import static com.twosigma.beakerx.kernel.msg.JupyterMessages.COMM_INFO_REPLY;
import static com.twosigma.beakerx.handler.KernelHandlerWrapper.wrapBusyIdle;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.handler.KernelHandler;
import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.twosigma.beakerx.kernel.comm.Comm;

/**
 * @author konst
 */
public class CommInfoHandler extends KernelHandler<Message> {

  private final static Logger logger = LoggerFactory.getLogger(CommInfoHandler.class);

  public CommInfoHandler(KernelFunctionality kernel) {
    super(kernel);
  }

  @Override
  public void handle(Message message) {
    wrapBusyIdle(kernel, message, () -> {
      handleMsg(message);
    });
  }

  private void handleMsg(Message message) {
    logger.debug("Processing CommInfoHandler");
    Message reply = new Message(new Header(COMM_INFO_REPLY, message.getHeader().getSession()));
    HashMap<String, Serializable> content = new HashMap<>();
    content.put(COMMS, new HashMap<String, Serializable>());

    String target = getMessageTarget(message);
    kernel.getCommHashSet().stream()
            .map(hash -> kernel.getComm(hash))
            .filter(comm -> target == null || target.isEmpty() || comm.getTargetName().equals(target))
            .forEach(comm -> {
              HashMap<String, Serializable> commRepDetails = new HashMap<>();
              commRepDetails.put(TARGET_NAME, comm.getTargetName());
              ((HashMap<String, Serializable>) content.get(COMMS)).put(comm.getCommId(), commRepDetails);
            });
    reply.setContent(content);
    reply.setParentHeader(message.getHeader());
    reply.setIdentities(message.getIdentities());
    send(reply);
  }

  private String getMessageTarget(Message message){
    Map content = message.getContent();
    return content == null ? null : (String) message.getContent().get(TARGET_NAME);
  }
}