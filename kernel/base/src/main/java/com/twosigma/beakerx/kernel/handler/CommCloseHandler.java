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

import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.handler.KernelHandler;
import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import static com.twosigma.beakerx.kernel.comm.Comm.COMM_ID;
import static com.twosigma.beakerx.kernel.comm.Comm.DATA;
import static com.twosigma.beakerx.kernel.msg.JupyterMessages.COMM_CLOSE;
import static com.twosigma.beakerx.handler.KernelHandlerWrapper.wrapBusyIdle;

/**
 * @author konst
 */
public class CommCloseHandler extends KernelHandler<Message> {

  private final static Logger logger = LoggerFactory.getLogger(CommCloseHandler.class);

  public CommCloseHandler(KernelFunctionality kernel) {
    super(kernel);
  }

  public static String getString(Map<String, Serializable> map, String name) {
    String ret = null;
    if (map != null && name != null && map.containsKey(name)) {
      ret = (String) map.get(name);
    }
    return ret;
  }

  @Override
  public void handle(Message message) {
    wrapBusyIdle(kernel, message, () -> {
      handleMsg(message);
    });
  }

  private void handleMsg(Message message) {
    logger.debug("Processing CommCloseHandler");
    Map<String, Serializable> commMap = message.getContent();

    String targetName =
            (kernel.getComm(getString(commMap, COMM_ID)) != null)
                    ? kernel.getComm(getString(commMap, COMM_ID)).getTargetName()
                    : "";
    kernel.removeComm(getString(commMap, COMM_ID));

    Message reply = new Message(new Header(COMM_CLOSE, message.getHeader().getSession()));
    HashMap<String, Serializable> map = new HashMap<>();
    map.put(DATA, new HashMap<>());
    reply.setContent(map);
    reply.setParentHeader(message.getHeader());
    reply.setIdentities(message.getIdentities());
    send(reply);
    logger.debug("Comm closed, target name = " + targetName);
  }
}
