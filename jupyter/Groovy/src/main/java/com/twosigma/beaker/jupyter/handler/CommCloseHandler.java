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

package com.twosigma.beaker.jupyter.handler;

import org.lappsgrid.jupyter.groovy.GroovyKernel;
import org.lappsgrid.jupyter.groovy.handler.AbstractHandler;
import org.lappsgrid.jupyter.groovy.msg.Header;
import org.lappsgrid.jupyter.groovy.msg.Message;
import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;

import static com.twosigma.beaker.jupyter.Comm.COMM_ID;
import static com.twosigma.beaker.jupyter.Comm.DATA;
import static com.twosigma.beaker.jupyter.msg.JupyterMessages.COMM_CLOSE;

/**
 * 
 * @author konst
 *
 */
public class CommCloseHandler extends AbstractHandler<Message> {

  public CommCloseHandler(GroovyKernel kernel) {
    super(kernel);
    logger = LoggerFactory.getLogger(CommCloseHandler.class);
  }

  @Override
  public void handle(Message message) throws NoSuchAlgorithmException {

    logger.info("Processing CommCloseHandler");
    Map<String, Serializable> commMap = message.getContent();

    String targetName = kernel.getComm(getString(commMap, COMM_ID)).getTargetName();
    kernel.removeComm(getString(commMap, COMM_ID));

    Message reply = new Message();
    reply.setHeader(new Header(COMM_CLOSE, message.getHeader().getSession()));
    HashMap<String, Serializable> map = new HashMap<>();
    map.put(DATA, new HashMap<>());
    reply.setContent(map);
    reply.setParentHeader(message.getHeader());
    reply.setIdentities(message.getIdentities());
    send(reply);
    logger.info("Comm closed, target name = " + targetName);
  }

  public static String getString(Map<String, Serializable> map, String name) {
    String ret = null;
    if (map != null && name != null && map.containsKey(name)) {
      ret = (String) map.get(name);
    }
    return ret;
  }

}