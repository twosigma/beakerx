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
package com.twosigma.beakerx;

import static com.twosigma.beakerx.kernel.msg.JupyterMessages.KERNEL_INFO_REPLY;
import static com.twosigma.beakerx.handler.KernelHandlerWrapper.wrapBusyIdle;
import static java.util.Arrays.asList;

import com.twosigma.beakerx.kernel.KernelFunctionality;
import com.twosigma.beakerx.handler.KernelHandler;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class KernelInfoHandler extends KernelHandler<Message> {

  private final static Logger logger = LoggerFactory.getLogger(KernelInfoHandler.class);
  public static final String PROTOCOL_VERSION = "protocol_version";
  public static final String PROTOCOL_VERSION_NUMBER = "5.3";
  public static final String INTERRUPT_KERNEL = "interrupt_kernel";

  public KernelInfoHandler(KernelFunctionality kernel) {
    super(kernel);
  }

  @Override
  public void handle(Message message) {
    wrapBusyIdle(kernel, message, () -> handleMsg(message));
  }

  private void handleMsg(Message message) {
    logger.debug("Processing kernel info request");
    Message reply = new Message(new Header(KERNEL_INFO_REPLY, message.getHeader().getSession()));
    reply.setContent(content());
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
    map.put(PROTOCOL_VERSION, PROTOCOL_VERSION_NUMBER);
    map.put("language_info", languageInfo());
    map.put("help_links", getHelpLinks());
    map.put("beakerx", true);
    map.put("status", "ok");
    map.put("url_to_interrupt", KernelManager.get().getBeakerXServer().getURL() + INTERRUPT_KERNEL);
    return doContent(map);
  }

  private ArrayList<HelpLink> getHelpLinks() {
    HelpLink beakerXHome = new HelpLink("BeakerX Home", "http://BeakerX.com");
    HelpLink fileAnIssue = new HelpLink("File an Issue", "https://github.com/twosigma/beakerx/issues/new");
    HelpLink twoSigmaOpenSource = new HelpLink("Two Sigma Open Source", "http://opensource.twosigma.com/");
    HelpLink javadoc = new HelpLink("BeakerX JavaDoc", "javadoc/index.html");

    return new ArrayList<>(asList(beakerXHome, fileAnIssue, twoSigmaOpenSource, javadoc));
  }

  protected abstract HashMap<String, Serializable> doLanguageInfo(HashMap<String, Serializable> languageInfo);

  protected abstract HashMap<String, Serializable> doContent(HashMap<String, Serializable> content);

  private class HelpLink implements Serializable {
    protected String text;
    protected String url;

    HelpLink(String text, String url) {
      this.text = text;
      this.url = url;
    }

    public String getText() {
      return text;
    }

    public String getUrl() {
      return url;
    }
  }
}
