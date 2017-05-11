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
package com.twosigma.beaker.javash.handler;

import static com.twosigma.beaker.jupyter.msg.JupyterMessages.KERNEL_INFO_REPLY;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;

import com.twosigma.jupyter.KernelFunctionality;
import com.twosigma.jupyter.handler.KernelHandler;
import com.twosigma.jupyter.message.Header;
import com.twosigma.jupyter.message.Message;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class JavaKernelInfoHandler extends KernelHandler {

  private final static Logger logger = LoggerFactory.getLogger(JavaKernelInfoHandler.class);

  public JavaKernelInfoHandler(KernelFunctionality kernel) {
    super(kernel);
  }

  @Override
  public void handle(Message message) {
    logger.debug("Processing kernel info request");
    Message reply = new Message();
    HashMap<String, Serializable> map = new HashMap<>(6);
    map.put("protocol_version", "5.0");
    map.put("implementation", "java");
    map.put("implementation_version", "1.0.0");
    HashMap<String, Serializable> map1 = new HashMap<String, Serializable>(7);
    map1.put("name", "Java");
    map1.put("version", System.getProperty("java.version"));
    map1.put("mimetype", "");
    map1.put("file_extension", ".java");
    map1.put("codemirror_mode", "text/x-java");
    map1.put("nbconverter_exporter", "");
    map.put("language_info", map1);
    map.put("banner", "BeakerX kernel for Java");
    map.put("beakerx", true);
    map.put("help_links", new ArrayList<String>());
    reply.setContent(map);
    reply.setHeader(new Header(KERNEL_INFO_REPLY, message.getHeader().getSession()));
    reply.setParentHeader(message.getHeader());
    reply.setIdentities(message.getIdentities());
    send(reply);
  }

}
