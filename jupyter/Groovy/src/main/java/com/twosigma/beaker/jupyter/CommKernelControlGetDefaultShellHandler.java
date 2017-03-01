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

import com.twosigma.beaker.groovy.GroovyDefaultVariables;
import org.lappsgrid.jupyter.groovy.GroovyKernelFunctionality;
import org.lappsgrid.jupyter.groovy.handler.AbstractHandler;
import org.lappsgrid.jupyter.groovy.msg.Header;
import org.lappsgrid.jupyter.groovy.msg.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

import static com.twosigma.beaker.jupyter.Comm.COMM_ID;
import static com.twosigma.beaker.jupyter.Comm.DATA;
import static com.twosigma.beaker.jupyter.CommKernelControlSetShellHandler.CLASSPATH;
import static com.twosigma.beaker.jupyter.CommKernelControlSetShellHandler.IMPORTS;
import static com.twosigma.beaker.jupyter.msg.JupyterMessages.COMM_MSG;

/**
 * @author konst
 */
public class CommKernelControlGetDefaultShellHandler extends AbstractHandler<Message> {

  public static final String UNDEFINED_REQUEST = "undefined_request";
  public static final String GET_DEFAULT_SHELL = "get_default_shell";
  public static final String KERNEL_CONTROL_RESPONSE = "kernel_control_response";
  public static final String TRUE = "true";

  private static final Logger logger = LoggerFactory.getLogger(CommKernelControlGetDefaultShellHandler.class);

  public CommKernelControlGetDefaultShellHandler(GroovyKernelFunctionality kernel) {
    super(kernel);
  }

  @Override
  public void handle(Message message) throws NoSuchAlgorithmException {
    logger.info("Handing comm message content");
    if (message != null) {
      Map<String, Serializable> commMap = message.getContent();
      HashMap<String, Boolean> messageData = (HashMap<String, Boolean>) commMap.get(DATA);
      Object okObject = messageData != null ? messageData.get(GET_DEFAULT_SHELL) : null;
      if (okObject != null && okObject instanceof Boolean && ((Boolean) okObject).booleanValue()) {
        Message replay = createReplyMessage(message, true);
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
        HashMap<String, String[]> shell = new HashMap<>();
        shell.put(IMPORTS, GroovyDefaultVariables.IMPORTS);
        shell.put(CLASSPATH, GroovyDefaultVariables.CLASS_PATH);
        data.put(KERNEL_CONTROL_RESPONSE, shell);
        logger.info("Response OK");
      } else {
        data.put(KERNEL_CONTROL_RESPONSE, UNDEFINED_REQUEST);
        logger.info("Response " + UNDEFINED_REQUEST);
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