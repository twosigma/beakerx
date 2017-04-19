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

import static com.twosigma.beaker.jupyter.comm.KernelControlSetShellHandler.CLASSPATH;
import static com.twosigma.beaker.jupyter.comm.KernelControlSetShellHandler.IMPORTS;
import static com.twosigma.jupyter.KernelParameters.KERNEL_PARAMETERS;

import java.io.Serializable;
import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.twosigma.jupyter.KernelFunctionality;
import com.twosigma.jupyter.message.Message;

/**
 * @author konst
 */
public abstract class KernelControlGetDefaultShellHandler extends BaseHandler<Boolean> {

  public static final String GET_DEFAULT_SHELL = "get_default_shell";
  public static final String KERNEL_CONTROL_RESPONSE = "kernel_control_response";

  private static final Logger logger = LoggerFactory.getLogger(KernelControlGetDefaultShellHandler.class);

  public KernelControlGetDefaultShellHandler(KernelFunctionality kernel) {
    super(kernel);
  }

  @Override
  public void handle(Message message) {
    logger.info("Handing comm message content");
    Boolean ok = getValueFromData(message, getHandlerCommand());
    if (ok != null && ok.booleanValue()) {

      HashMap<String, Object> kernelParameters = new HashMap<>();
      kernelParameters.put(IMPORTS, getDefaultImports());
      kernelParameters.put(CLASSPATH, getDefaultClassPath());

      HashMap<String, Object> shell = new HashMap<>();
      shell.put(KERNEL_PARAMETERS, kernelParameters);

      HashMap<String, Serializable> data = new HashMap<>();
      data.put(KERNEL_CONTROL_RESPONSE, shell);
      logger.info("Response OK");
      publish(createReplyMessage(message, data));
    }
  }

  @Override
  public String getHandlerCommand() {
    return GET_DEFAULT_SHELL;
  }

  public abstract String[] getDefaultImports();

  public abstract String[] getDefaultClassPath();

}