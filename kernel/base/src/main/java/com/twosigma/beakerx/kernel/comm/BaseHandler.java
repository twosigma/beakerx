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

import static com.twosigma.beakerx.kernel.comm.Comm.COMM_ID;
import static com.twosigma.beakerx.kernel.comm.Comm.DATA;
import static com.twosigma.beakerx.kernel.msg.JupyterMessages.COMM_MSG;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.handler.KernelHandler;
import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;

public abstract class BaseHandler<T> extends KernelHandler<Message> {

  private static final Logger logger = LoggerFactory.getLogger(BaseHandler.class);

  public BaseHandler(KernelFunctionality kernel) {
    super(kernel);
  }

  protected Map<String, T> getData(Message message) {
    Map<String, T> ret = null;
    if (message != null) {
      Map<String, Serializable> commMap = message.getContent();
      ret = (HashMap<String, T>) commMap.get(DATA);
    } else {
      logger.info("Comm message contend is null");
    }
    return ret;
  }

  protected T getValueFromData(Message message, String key) {
    T ret = null;
    Map<String, T> data = getData(message);
    Object okObject = data != null ? data.get(key) : null;
    if (okObject != null && okObject.getClass().isAssignableFrom(okObject.getClass())) {
      ret = (T) okObject;
    }
    return ret;
  }

  protected Message createReplyMessage(Message message, Serializable responceData) {
    Message ret = null;
    if (message != null) {
      ret = new Message(new Header(COMM_MSG, message.getHeader().getSession()));
      Map<String, Serializable> commMap = message.getContent();
      HashMap<String, Serializable> map = new HashMap<>();
      map.put(COMM_ID, getString(commMap, COMM_ID));
      map.put(DATA, responceData);
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

  public abstract String getHandlerCommand();

}