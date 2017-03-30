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
package com.twosigma.beaker.jupyter.comm;

import com.twosigma.jupyter.KernelFunctionality;
import com.twosigma.jupyter.handler.KernelHandler;
import com.twosigma.jupyter.message.Header;
import com.twosigma.jupyter.message.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import static com.twosigma.beaker.jupyter.comm.Comm.COMM_ID;
import static com.twosigma.beaker.jupyter.comm.Comm.DATA;
import static com.twosigma.beaker.jupyter.comm.CommKernelControlSetShellHandler.CLASSPATH;
import static com.twosigma.beaker.jupyter.comm.CommKernelControlSetShellHandler.IMPORTS;
import static com.twosigma.beaker.jupyter.msg.JupyterMessages.COMM_MSG;

/**
 * @author konst
 */
public abstract class CommKernelControlGetDefaultShellHandler extends KernelHandler<Message> {

  public static final String GET_DEFAULT_SHELL = "get_default_shell";
  public static final String KERNEL_CONTROL_RESPONSE = "kernel_control_response";

  private static final Logger logger = LoggerFactory.getLogger(CommKernelControlGetDefaultShellHandler.class);

  public CommKernelControlGetDefaultShellHandler(KernelFunctionality kernel) {
    super(kernel);
  }

  @Override
  public void handle(Message message)  {
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
        shell.put(IMPORTS, getDefaultImports());
        shell.put(CLASSPATH, getDefaultClassPath());
        data.put(KERNEL_CONTROL_RESPONSE, shell);
        logger.info("Response OK");
      }
      map.put(DATA, data);
      ret.setContent(map);
    }
    return ret;
  }
  
  public abstract String[] getDefaultImports();
  public abstract String[] getDefaultClassPath();

  public static String getString(Map<String, Serializable> map, String name) {
    String ret = null;
    if (map != null && name != null && map.containsKey(name)) {
      ret = (String) map.get(name);
    }
    return ret;
  }

}