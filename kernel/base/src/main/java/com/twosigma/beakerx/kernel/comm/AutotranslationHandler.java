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
package com.twosigma.beakerx.kernel.comm;

import com.twosigma.beakerx.BeakerXClientManager;
import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.message.Message;

import java.util.Map;

import static com.twosigma.beakerx.handler.KernelHandlerWrapper.wrapBusyIdle;

public class AutotranslationHandler extends BaseHandler<Boolean> {

  public AutotranslationHandler(KernelFunctionality kernel) {
    super(kernel);
  }

  @Override
  public void handle(Message message) {
    wrapBusyIdle(kernel, message, () -> {
      handleMsg(message, kernel);
    });
  }

  private void handleMsg(Message message, KernelFunctionality kernel) {
    if (message.getContent().containsKey("data")) {
      Map<String, Object> data = (Map) message.getContent().get("data");
      if (data.containsKey("name") && data.containsKey("value")) {
        BeakerXClientManager.get().update((String) data.get("name"), data.get("value"));
      }
    }
  }

  @Override
  public String getHandlerCommand() {
    return "";
  }

}