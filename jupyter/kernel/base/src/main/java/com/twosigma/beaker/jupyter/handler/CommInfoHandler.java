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

import static com.twosigma.beaker.jupyter.Comm.COMMS;
import static com.twosigma.beaker.jupyter.Comm.TARGET_NAME;
import static com.twosigma.beaker.jupyter.msg.JupyterMessages.COMM_INFO_REPLY;

import java.io.Serializable;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;

import org.lappsgrid.jupyter.KernelFunctionality;
import org.lappsgrid.jupyter.handler.AbstractHandler;
import org.lappsgrid.jupyter.msg.Header;
import org.lappsgrid.jupyter.msg.Message;
import org.slf4j.LoggerFactory;

import com.twosigma.beaker.jupyter.Comm;

/**
 * 
 * @author konst
 *
 */
public class CommInfoHandler extends AbstractHandler<Message> {

  public CommInfoHandler(KernelFunctionality kernel) {
    super(kernel);
    logger = LoggerFactory.getLogger(CommInfoHandler.class);
  }

  @Override
  public void handle(Message message) throws NoSuchAlgorithmException {
    logger.info("Processing CommInfoHandler");
    Message reply = new Message();
    reply.setHeader(new Header(COMM_INFO_REPLY, message.getHeader().getSession()));
    HashMap<String, Serializable> content = new HashMap<>();
    content.put(COMMS, new HashMap<String, Serializable>());
    
    for (String commHash : kernel.getCommHashSet()) {
      HashMap<String, Serializable> commRepDetails = new HashMap<>();
      Comm comm = kernel.getComm(commHash);
      commRepDetails.put(TARGET_NAME, comm.getTargetName());
      ((HashMap<String, Serializable>)content.get(COMMS)).put(comm.getCommId(), commRepDetails);
    }
    
    reply.setContent(content);
    reply.setParentHeader(message.getHeader());
    reply.setIdentities(message.getIdentities());
    send(reply);
  }

}