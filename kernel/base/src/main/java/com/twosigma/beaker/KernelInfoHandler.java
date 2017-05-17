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
package com.twosigma.beaker;

import com.twosigma.jupyter.KernelFunctionality;
import com.twosigma.jupyter.handler.KernelHandler;
import com.twosigma.jupyter.message.Header;
import com.twosigma.jupyter.message.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;

import static com.twosigma.beaker.jupyter.msg.JupyterMessages.KERNEL_INFO_REPLY;
import static com.twosigma.jupyter.handler.KernelHandlerWrapper.wrapBusyIdle;

public abstract class KernelInfoHandler extends KernelHandler<Message> {

  private final static Logger logger = LoggerFactory.getLogger(KernelInfoHandler.class);

  public KernelInfoHandler(KernelFunctionality kernel) {
    super(kernel);
  }

  @Override
  public void handle(Message message) {
    wrapBusyIdle(kernel, message, () -> {
      handleMsg(message);
    });
  }

  private void handleMsg(Message message) {
    logger.debug("Processing kernel info request");
    Message reply = new Message();
    reply.setContent(content());
    reply.setHeader(new Header(KERNEL_INFO_REPLY, message.getHeader().getSession()));
    reply.setParentHeader(message.getHeader());
    reply.setIdentities(message.getIdentities());
    send(reply);
  }

  private HashMap<String, Serializable> languageInfo() {
    HashMap<String, Serializable> map = new HashMap<>();
    return doLanguageInfo(map);
  }

  private HashMap<String, Serializable> content() {
    HashMap<String, Serializable> map = new HashMap<>();
    map.put("implementation_version", BeakerImplementationInfo.IMPLEMENTATION_VERSION);
    map.put("protocol_version", "5.0");
    map.put("language_info", languageInfo());
    map.put("help_links", new ArrayList<String>());
    map.put("beakerx", true);
    map.put("status", "ok");
    return doContent(map);
  }

  protected abstract HashMap<String, Serializable> doLanguageInfo(HashMap<String, Serializable> languageInfo);

  protected abstract HashMap<String, Serializable> doContent(HashMap<String, Serializable> content);

}
