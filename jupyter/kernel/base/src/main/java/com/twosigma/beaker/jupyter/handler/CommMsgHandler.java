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

import com.twosigma.beaker.jupyter.Comm;
import com.twosigma.beaker.jupyter.msg.MessageCreator;
import org.lappsgrid.jupyter.KernelFunctionality;
import org.lappsgrid.jupyter.handler.AbstractHandler;
import org.lappsgrid.jupyter.msg.Message;
import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

import static com.twosigma.beaker.jupyter.Comm.COMM_ID;

public class CommMsgHandler extends AbstractHandler<Message> {

  private MessageCreator messageCreator;

  public CommMsgHandler(final KernelFunctionality kernel, final MessageCreator messageCreator) {
    super(kernel);
    this.messageCreator = messageCreator;
    logger = LoggerFactory.getLogger(CommMsgHandler.class);
  }

  public void handle(Message message) throws NoSuchAlgorithmException {
    publish(this.messageCreator.createBusyMessage(message));

    Map<String, Serializable> commMap = message.getContent();
    Comm comm = kernel.getComm(getString(commMap, COMM_ID));
    logger.info("Comm message handling, target name: " + (comm != null ? comm.getTargetName() : "undefined"));
    if(comm != null){
      comm.handleMsg(message);
    }
    publish(this.messageCreator.createIdleMessage(message));
  }

  public static String getString(Map<String, Serializable> map, String name) {
    String ret = null;
    if (map != null && name != null && map.containsKey(name)) {
      ret = (String) map.get(name);
    }
    return ret;
  }

}