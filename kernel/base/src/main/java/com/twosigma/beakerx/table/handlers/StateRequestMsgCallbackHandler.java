/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.table.handlers;

import com.twosigma.beakerx.handler.Handler;
import com.twosigma.beakerx.message.Message;

import java.util.Map;

public class StateRequestMsgCallbackHandler implements Handler<Message> {
  private ChangeAction action;

  public StateRequestMsgCallbackHandler(ChangeAction action) {
    this.action = action;
  }

  @Override
  public void handle(Message message) {
    if (message.getContent()!= null && message.getContent().containsKey("data")) {
      Map data = (Map) message.getContent().get("data");
      if (data.containsKey("method")) {
        String method = (String) data.get("method");
        if (method.equals("request_state")) {
          action.execute();
        }
      }
    }
  }
}
