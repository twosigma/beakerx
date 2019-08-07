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
import com.twosigma.beakerx.table.Property;

import java.io.Serializable;
import java.util.Map;
import java.util.Optional;

public class ValueChangeMsgCallbackHandler implements Handler<Message> {

  private final ChangeAction action;

  public ValueChangeMsgCallbackHandler(ChangeAction action) {
    this.action = action;
  }

  public Optional<Property> getSyncDataValue(Message msg) {
    Optional<Property> ret = Optional.empty();
    if (msg != null && msg.getContent() != null && msg.getContent().containsKey("data")) {
      Map<String, Serializable> data = (Map<String, Serializable>) msg.getContent().get("data");
      if (data.containsKey("state")) {
        Map<String, Serializable> sync_data = (Map<String, Serializable>) data.get("state");
        if (sync_data.containsKey("loadMoreRows")) {
          ret = Optional.of(new Property("loadMoreRows", sync_data.get("loadMoreRows")));
        }
      }
    }
    return ret;
  }

  public void handle(Message message) {
    Optional<Property> value = getSyncDataValue(message);
    value.ifPresent(o -> updateValue(o, message));
  }

  public void updateValue(Property value, Message message) {
    if (value.getKey().equals("loadMoreRows")) {
      action.execute();
    }
  }
}
