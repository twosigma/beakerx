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
package com.twosigma.beakerx.jvm.threads;

import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;

import java.io.Serializable;
import java.util.HashMap;

import static com.twosigma.beakerx.kernel.msg.JupyterMessages.INPUT_REQUEST;

public class InputRequestMessageFactoryImpl implements InputRequestMessageFactory {
  @Override
  public Message create(Message parent) {
    Message message = new Message(new Header(INPUT_REQUEST, parent.getHeader().getSession()), parent.getIdentities());
    message.setContent(content());
    message.setParentHeader(parent.getHeader());
    return message;
  }

  private HashMap<String, Serializable> content() {
    HashMap<String, Serializable> map = new HashMap<>();
    map.put("prompt", "");
    map.put("password", false);
    return map;
  }
}