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

import static com.twosigma.beaker.jupyter.msg.JupyterMessages.COMM_MSG;
import static com.twosigma.beaker.jupyter.Comm.DATA;
import static com.twosigma.beaker.jupyter.Comm.COMM_ID;

import java.io.Serializable;
import java.security.NoSuchAlgorithmException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.lappsgrid.jupyter.groovy.GroovyKernel;
import org.lappsgrid.jupyter.groovy.handler.IHandler;
import org.lappsgrid.jupyter.groovy.msg.Header;
import org.lappsgrid.jupyter.groovy.msg.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * TODO remove : it is a test
 * @author konst
 */
@Deprecated
public class CommCallbacTest implements IHandler<Message>{

  private static final Logger logger = LoggerFactory.getLogger(GroovyKernel.class);
  
  @Override
  public void handle(Message message) throws NoSuchAlgorithmException {
    Map<String, Serializable> commMap = message.getContent();
    HashMap<?, ?> messageData = (HashMap<?, ?>)commMap.get(DATA);
    if (messageData != null) {
      hangleData(messageData);
    } else {
      logger.info("Comm message contend is null");
    }
    GroovyKernelManager.get().publish(createReplayMessage(message));
    //message handler in here:
    //static/notebook/js/services/kernels/kernel.js
  }

  // TODO read and handle comm message
  public void hangleData(Object data) {
    logger.info("Handing comm messahe content:");
    if (data instanceof Map<?, ?>) {
      logger.info("Comm content is map, key list:");
      for (Object key : ((Map<?, ?>) data).keySet()) {
        logger.info(key.toString());
      }
    } else if (data instanceof Collection<?>) {
      System.out.println("Comm content is Collection, content is:");
      for (Object value : ((Collection<?>) data)) {
        logger.info(value.toString());
      }
    } else {
      logger.info("Comm mesage content Class is:");
      logger.info(data.getClass().getName());
      logger.info("Comm mesage content value toString():");
      logger.info(data.toString());
    }
    logger.info("Handing comm messahe content END");
  }
  
  private Message createReplayMessage(Message message) {
    Message ret = null;
    if (message != null) {
      ret = new Message();
      Map<String, Serializable> commMap = message.getContent();
      ret.setHeader(new Header(COMM_MSG, message.getHeader().getSession()));
      HashMap<String, Serializable> map = new HashMap<>(6);
      map.put(COMM_ID, getString(commMap, COMM_ID));
      HashMap<String, String> data = new HashMap<>();
      data.put("abc", "HELL0!!!");
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