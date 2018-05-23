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

import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.handler.KernelHandler;
import com.twosigma.beakerx.handler.Handler;
import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import static com.twosigma.beakerx.kernel.comm.Comm.COMM_ID;
import static com.twosigma.beakerx.kernel.comm.Comm.DATA;
import static com.twosigma.beakerx.kernel.comm.Comm.TARGET_MODULE;
import static com.twosigma.beakerx.kernel.comm.Comm.TARGET_NAME;
import static com.twosigma.beakerx.kernel.msg.JupyterMessages.COMM_CLOSE;
import static com.twosigma.beakerx.kernel.msg.JupyterMessages.COMM_OPEN;
import static com.twosigma.beakerx.handler.KernelHandlerWrapper.wrapBusyIdle;

import com.twosigma.beakerx.kernel.KernelFunctionality;

/**
 * @author konst
 */
public abstract class CommOpenHandler extends KernelHandler<Message> {

  private final static Logger logger = LoggerFactory.getLogger(CommOpenHandler.class);

  public CommOpenHandler(KernelFunctionality kernel) {
    super(kernel);
  }

  @Override
  public void handle(Message message) {
    wrapBusyIdle(kernel, message, () -> {
      handleMsg(message);
    });
  }

  private void handleMsg(Message message) {
    logger.debug("Processing CommOpenHandler");
    Message reply = null;
    HashMap<String, Serializable> map = new HashMap<>(6);

    Map<String, Serializable> commMap = message.getContent();
    Comm newComm = null;
    if (isValidMessage(commMap)) {
      newComm = readComm(commMap);
      reply = new Message(new Header(COMM_OPEN, message.getHeader().getSession()));
      map.put(COMM_ID, newComm.getCommId());
      map.put(TARGET_NAME, newComm.getTargetName());
      map.put(DATA, new HashMap<>());
      map.put(TARGET_MODULE, newComm.getTargetModule());
    } else {
      reply = new Message(new Header(COMM_CLOSE, message.getHeader().getSession()));
      map.put(DATA, new HashMap<>());
    }

    if (newComm != null) {
      logger.debug("Comm opened, target name = " + newComm.getTargetName());
      for (Handler<Message> handler : getKernelControlChanelHandlers(newComm.getTargetName())) {
        newComm.addMsgCallbackList(handler);
      }
      kernel.addComm(newComm.getCommId(), newComm);
    }

    reply.setContent(map);
    reply.setParentHeader(message.getHeader());
    reply.setIdentities(message.getIdentities());
    send(reply);
  }

  public abstract Handler<Message>[] getKernelControlChanelHandlers(String targetName);

  public static String getString(Map<String, Serializable> map, String name) {
    return (String) map.get(name);
  }

  protected Comm readComm(Map<String, Serializable> map) {
    Comm ret = new Comm(getString(map, COMM_ID), getString(map, TARGET_NAME));
    ret.setData((HashMap<String, Serializable>) map.get(DATA));
    ret.setTargetModule(getString(map, TARGET_MODULE));
    return ret;
  }

  protected boolean isValidMessage(Map<String, Serializable> map) {
    boolean ret = true;
    ret = ret && map.get(COMM_ID) != null && map.get(COMM_ID) instanceof String;
    ret = ret && map.get(TARGET_NAME) != null && map.get(TARGET_NAME) instanceof String;
    ret = ret && !kernel.isCommPresent(getString(map, COMM_ID));
    return ret;
  }

}