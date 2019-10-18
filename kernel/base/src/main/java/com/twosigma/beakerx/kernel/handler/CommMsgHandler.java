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

import com.twosigma.beakerx.handler.KernelHandler;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.kernel.MagicKernelManager;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.message.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import static com.twosigma.beakerx.handler.KernelHandlerWrapper.wrapBusyIdle;
import static com.twosigma.beakerx.kernel.comm.Comm.COMM_ID;

public class CommMsgHandler extends KernelHandler<Message> {

  private final static Logger logger = LoggerFactory.getLogger(CommMsgHandler.class);

  public CommMsgHandler(final KernelFunctionality kernel) {
    super(kernel);
  }

  public void handle(Message message) {
    wrapBusyIdle(kernel, message, () -> {
      try {
        kernel.startEvaluation();
        handleMsg(message);
      } finally {
        kernel.endEvaluation();
      }
    });
  }

  private void handleMsg(Message message) {
    Map<String, Serializable> commMap = message.getContent();
    String commId = getString(commMap, COMM_ID);
    Comm comm = kernel.getComm(commId);
    logger.debug("Comm message handling, target name: " + (comm != null ? comm.getTargetName() : "undefined"));
    if (comm != null) {
      comm.handleMsg(message);
    } else {
      MagicKernelManager magicKernelManager = kernel.getManagerByCommId(commId);
      if (magicKernelManager != null) {
        List<Message> messages = magicKernelManager.handleMsg(message);
        if (!messages.isEmpty()) {
          kernel.publish(messages);
          return;
        }
      }
      logger.warn("No such comm: " + getString(commMap, COMM_ID));
    }
  }

  public static String getString(Map<String, Serializable> map, String name) {
    String ret = null;
    if (map != null && name != null && map.containsKey(name)) {
      ret = (String) map.get(name);
    }
    return ret;
  }

}