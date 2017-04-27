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

import static com.twosigma.jupyter.KernelParameters.KERNEL_PARAMETERS;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.twosigma.jupyter.KernelParameters;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.twosigma.jupyter.KernelFunctionality;
import com.twosigma.jupyter.message.Message;

/**
 * @author konst
 */
public class KernelControlSetShellHandler extends BaseHandler<List<String>> {

  public static final String IMPORTS = "imports";
  public static final String CLASSPATH = "classpath";

  public static final String KERNEL_CONTROL_RESPONSE = "kernel_control_response";
  public static final String RESPONSE_OK = "OK";
  public static final String RESPONSE_ERROR = "ERROR";

  private static final Logger logger = LoggerFactory.getLogger(KernelControlSetShellHandler.class);

  public KernelControlSetShellHandler(KernelFunctionality kernel) {
    super(kernel);
  }

  @Override
  public void handle(Message message) {
    logger.debug("Handing comm message content");
    Map<String, List<String>> shell = getData(message);
    if (shell != null) {
      boolean ok = handleData(shell);
      if (ok) {
        HashMap<String, String> data = new HashMap<>();
        data.put(KERNEL_CONTROL_RESPONSE, ok ? RESPONSE_OK : RESPONSE_ERROR);
        publish(createReplyMessage(message, data));
      }
    }
  }

  public boolean handleData(Map<String, List<String>> data) {
    boolean ret = false;
    if (data.containsKey(KERNEL_PARAMETERS)) {
      Map<String, Object> beakerxKernelParameters = (Map<String, Object>) data.get(KERNEL_PARAMETERS);
      kernel.setShellOptions(new KernelParameters(beakerxKernelParameters));
      ret = true;
    }
    return ret;
  }

  @Override
  public String getHandlerCommand() {
    // in this handler there are 2 commands
    return null;
  }

}