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

import com.twosigma.beaker.jupyter.Comm;
import com.twosigma.beaker.jupyter.CommKernelControlGetDefaultShellHandler;
import com.twosigma.beaker.jupyter.CommKernelControlSetShellHandler;
import com.twosigma.beaker.jupyter.CommNamesEnum;
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
import static com.twosigma.beaker.jupyter.Comm.TARGET_MODULE;
import static com.twosigma.beaker.jupyter.Comm.TARGET_NAME;
import static com.twosigma.beaker.jupyter.msg.JupyterMessages.COMM_CLOSE;
import static com.twosigma.beaker.jupyter.msg.JupyterMessages.COMM_OPEN;

/**
 * 
 * @author konst
 *
 */
public class CommOpenHandler extends AbstractHandler<Message> {

  public CommOpenHandler(GroovyKernel kernel) {
    super(kernel);
    logger = LoggerFactory.getLogger(CommOpenHandler.class);
  }

  @Override
  public void handle(Message message) throws NoSuchAlgorithmException {
    logger.info("Processing CommOpenHandler");
    Message reply = new Message();
    HashMap<String, Serializable> map = new HashMap<>(6);
    
    Map<String, Serializable> commMap = message.getContent();
    Comm newComm = null;
    if (isValidMessage(commMap)) {
      newComm = readComm(commMap);
      reply.setHeader(new Header(COMM_OPEN, message.getHeader().getSession()));
      map.put(COMM_ID, newComm.getCommId());
      map.put(TARGET_NAME, newComm.getTargetName());
      map.put(DATA, new HashMap<>());
      map.put(TARGET_MODULE, newComm.getTargetModule());
    }else{
      reply.setHeader(new Header(COMM_CLOSE, message.getHeader().getSession()));
      map.put(DATA, new HashMap<>());
    }

    if(newComm != null){
      logger.info("Comm opened, target name = " + newComm.getTargetName());
      if(CommNamesEnum.KERNEL_CONTROL_CHANNEL.getTargetName().equalsIgnoreCase(newComm.getTargetName())){
        newComm.addMsgCallbackList(new CommKernelControlSetShellHandler(kernel));
        newComm.addMsgCallbackList(new CommKernelControlGetDefaultShellHandler(kernel));
      }
      kernel.addComm(newComm.getCommId(), newComm);
    }

    reply.setContent(map);
    reply.setParentHeader(message.getHeader());
    reply.setIdentities(message.getIdentities());
    send(reply);
  }

  public static String getString(Map<String, Serializable> map, String name) {
    return (String) map.get(name);
  }

  protected Comm readComm(Map<String, Serializable> map) {
    Comm ret = new Comm(getString(map, COMM_ID), getString(map, TARGET_NAME));
    ret.setData((HashMap<?,?> )map.get(DATA));
    ret.setTargetModule(getString(map, TARGET_MODULE));
    return ret;
  }

  protected boolean isValidMessage(Map<String, Serializable> map) {
    boolean ret = true;
    ret = ret && map.get(COMM_ID) != null && map.get(COMM_ID) instanceof String;
    ret = ret && map.get(TARGET_NAME) != null && map.get(TARGET_NAME) instanceof String;
    ret = ret && !kernel.isCommPresent(getString(map, COMM_ID));
    return ret;
  }

}