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
package com.twosigma.beaker.jupyter;

import org.lappsgrid.jupyter.Kernel;
import org.lappsgrid.jupyter.KernelFunctionality;
import org.lappsgrid.jupyter.handler.AbstractHandler;
import org.lappsgrid.jupyter.msg.Header;
import org.lappsgrid.jupyter.msg.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

import static com.twosigma.beaker.jupyter.Comm.COMM_ID;
import static com.twosigma.beaker.jupyter.Comm.DATA;
import static com.twosigma.beaker.jupyter.msg.JupyterMessages.COMM_MSG;

/**
 * @author konst
 */
public class CommKernelControlInterrupt extends AbstractHandler<Message> {

  public static final String KERNEL_INTERRUPT = "kernel_interrupt";
  public static final String KERNEL_CONTROL_RESPONSE = "kernel_control_response";
  public static final String TRUE = "true";
  public static final String FALSE = "false";

  private static final Logger logger = LoggerFactory.getLogger(CommKernelControlInterrupt.class);

  public CommKernelControlInterrupt(KernelFunctionality kernel) {
    super(kernel);
  }

  @Override
  public void handle(Message message) throws NoSuchAlgorithmException {
    logger.info("Handing comm message content (Interrupt)");
    if (message != null) {
      Map<String, Serializable> commMap = message.getContent();
      HashMap<String, Boolean> messageData = (HashMap<String, Boolean>) commMap.get(DATA);
      Object okObject = messageData != null ? messageData.get(KERNEL_INTERRUPT) : null;
      if (okObject != null && okObject instanceof Boolean && ((Boolean) okObject).booleanValue()) {
        boolean ok = Kernel.isWindows();
        if(ok){
          kernel.cancelExecution();
        }else{
          logger.info("Cell execution interrupt not performed, done by SIGINT");
        }
        Message replay = createReplyMessage(message, ok);
        publish(replay);
      }
    } else {
      logger.info("Comm message contend is null");
    }
  }

  private Message createReplyMessage(Message message, boolean ok) {
    Message ret = null;
    if (message != null) {
      ret = new Message();
      Map<String, Serializable> commMap = message.getContent();
      ret.setHeader(new Header(COMM_MSG, message.getHeader().getSession()));
      HashMap<String, Serializable> map = new HashMap<>();
      map.put(COMM_ID, getString(commMap, COMM_ID));
      HashMap<String, Serializable> data = new HashMap<>();
      if (ok) {
        HashMap<String, String> body = new HashMap<>();
        body.put(KERNEL_INTERRUPT, ok ? TRUE : FALSE);
        data.put(KERNEL_CONTROL_RESPONSE, body);
        logger.info("Response OK");
      }
      map.put(DATA, data);
      ret.setContent(map);
    }
    return ret;
  }

  public static String getString(Map<String, Serializable> map, String name) {
    String ret = null;
    if (map != null && name != null && map.containsKey(name)) {
      ret = (String) map.get(name);
    }
    return ret;
  }

}