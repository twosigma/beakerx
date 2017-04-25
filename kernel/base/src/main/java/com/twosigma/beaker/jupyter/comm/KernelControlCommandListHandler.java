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

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.twosigma.jupyter.KernelFunctionality;
import com.twosigma.jupyter.message.Message;

public class KernelControlCommandListHandler extends BaseHandler<Boolean> {

  private static final Logger logger = LoggerFactory.getLogger(KernelControlCommandListHandler.class);

  public static final String GET_KERNEL_CONTROL_COMMAND_LIST = "get_kernel_control_command_list";
  public static final String KERNEL_CONTROL_RESPONSE = "kernel_control_response";

  public KernelControlCommandListHandler(KernelFunctionality kernel) {
    super(kernel);
  }

  @Override
  public void handle(Message message) {
    logger.debug("Handing comm message content");
    Boolean value = getValueFromData(message, getHandlerCommand());
    if (value != null && value.booleanValue()) {
      HashMap<String, Serializable> data = new HashMap<>();
      data.put(KERNEL_CONTROL_RESPONSE, getCommKernelControlCommandList());
      publish(createReplyMessage(message, data));
    }
  }

  protected String[] getCommKernelControlCommandList() {
    List<String> ret = new ArrayList<>();
    ret.add(GET_KERNEL_CONTROL_COMMAND_LIST);
    ret.add(KernelControlGetDefaultShellHandler.GET_DEFAULT_SHELL);
    ret.add(KernelControlInterrupt.KERNEL_INTERRUPT);
    ret.add(KernelControlSetShellHandler.CLASSPATH);
    ret.add(KernelControlSetShellHandler.IMPORTS);
    return ret.toArray(new String[ret.size()]);
  }

  @Override
  public String getHandlerCommand() {
    return GET_KERNEL_CONTROL_COMMAND_LIST;
  }

}