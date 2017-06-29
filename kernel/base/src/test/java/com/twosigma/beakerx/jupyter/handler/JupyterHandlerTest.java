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

package com.twosigma.beakerx.jupyter.handler;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.kernel.Code;
import com.twosigma.beakerx.kernel.handler.CommCloseHandler;
import com.twosigma.beakerx.kernel.handler.CommInfoHandler;
import com.twosigma.beakerx.kernel.handler.CommMsgHandler;
import com.twosigma.beakerx.kernel.handler.CommOpenHandler;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import com.twosigma.beakerx.handler.Handler;
import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.message.MessageTest;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.Serializable;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import static com.twosigma.beakerx.kernel.comm.Comm.COMMS;
import static com.twosigma.beakerx.kernel.comm.Comm.COMM_ID;
import static com.twosigma.beakerx.kernel.comm.Comm.DATA;
import static com.twosigma.beakerx.kernel.comm.Comm.TARGET_MODULE;
import static com.twosigma.beakerx.kernel.comm.Comm.TARGET_NAME;

public class JupyterHandlerTest {

  private static KernelTest kernel;
  private CommOpenHandler commOpenHandler;
  private CommCloseHandler commCloseHandler;
  private CommInfoHandler commInfoHandler;
  private CommMsgHandler commMsgHandler;

  public static Message initCloseMessage() {
    Map<String, Serializable> content = new LinkedHashMap<>();
    content.put(DATA, new HashMap<>());
    content.put(COMM_ID, "commId");
    content.put(TARGET_NAME, "targetName");
    content.put(TARGET_MODULE, "targetModule");

    Message message = new Message();
    message.setIdentities(Arrays.asList("identities".getBytes()));
    message.setHeader(initHeader(JupyterMessages.COMM_CLOSE));
    message.setContent(content);
    return message;
  }

  public static Message initOpenMessage() {
    Map<String, Serializable> content = new LinkedHashMap<>();
    content.put(DATA, new HashMap<>());
    content.put(COMM_ID, "commId");
    content.put(TARGET_NAME, "targetName");
    content.put(TARGET_MODULE, "targetModule");

    Message message = new Message();
    message.setIdentities(Arrays.asList("identities".getBytes()));
    message.setHeader(initHeader(JupyterMessages.COMM_OPEN));
    message.setContent(content);
    return message;
  }

  public static Message initCommMessage() {
    Map<String, Serializable> content = new LinkedHashMap<>();
    content.put(DATA, new HashMap<>());
    content.put(COMM_ID, "commId");
    content.put(TARGET_NAME, "targetName");
    content.put(TARGET_MODULE, "targetModule");
    return initCommMessage(content);
  }

  public static Message initCommMessage(Map<String, Serializable> content) {
    Message message = new Message();
    message.setIdentities(Arrays.asList("identities".getBytes()));
    message.setHeader(initHeader(JupyterMessages.COMM_MSG));
    message.setContent(content);
    return message;
  }

  public static Message createExecuteRequestMessage(Code code) {
    Message message = executeRequestMessage();
    Map<String, Serializable> content = new LinkedHashMap<>();
    content.put("code", code.asString());
    message.setContent(content);
    return message;
  }

  public static Message initExecuteRequestMessage() {
    Map<String, Serializable> content = new LinkedHashMap<>();
    content.put("allow_stdin", Boolean.TRUE);
    content.put("code", "new Plot() << new Line(x: (0..5), y: [0, 1, 6, 5, 2, 8])");
    content.put("stop_on_error", Boolean.TRUE);
    content.put("user_expressions", new LinkedHashMap<>());
    content.put("silent", Boolean.FALSE);
    content.put("store_history", Boolean.TRUE);

    Message message = executeRequestMessage();
    message.setContent(content);
    return message;
  }

  private static Message executeRequestMessage() {
    Message message = new Message();
    message.setIdentities(Arrays.asList("identities".getBytes()));
    message.setHeader(initHeader(JupyterMessages.EXECUTE_REQUEST));
    message.setParentHeader(null);
    message.setMetadata(new LinkedHashMap<>());
    return message;
  }

  public static Message initInfoMessage() {
    Message message = new Message();
    message.setIdentities(Arrays.asList("identities".getBytes()));
    message.setHeader(initHeader(JupyterMessages.COMM_INFO_REQUEST));
    return message;
  }

  private static Header initHeader(JupyterMessages jupyterMessages) {
    Header header = new Header();
    header.setId("messageId");
    header.setUsername("username");
    header.setSession("sessionId" + jupyterMessages.getName());
    header.setType(jupyterMessages.getName());
    header.setVersion("5.0");
    return header;
  }

  public static String initKernelCommMapWithOneComm(KernelTest kernelTest) {
    Message openMessage = initOpenMessage();
    String commId = (String) openMessage.getContent().get(COMM_ID);
    String targetName = (String) openMessage.getContent().get(TARGET_NAME);
    Comm comm = new Comm(commId, targetName) {
      @Override
      public void handleMsg(Message parentMessage) {
      }
    };
    kernelTest.addComm(commId, comm);
    return commId;
  }

  @BeforeClass
  public static void setUpClass() {
    kernel = new KernelTest();
  }


  @Before
  public void setUp() {
    commOpenHandler = new CommOpenHandler(kernel) {
      @Override
      public Handler<Message>[] getKernelControlChanelHandlers(String targetName) {
        return (Handler<Message>[]) new Handler<?>[0];
      }
    };
    commCloseHandler = new CommCloseHandler(kernel);
    commInfoHandler = new CommInfoHandler(kernel);
    commMsgHandler = new CommMsgHandler(kernel, new MessageCreator(kernel));
  }

  @After
  public void tearDown() throws Exception {
    kernel.clearMessages();
  }

  @Test
  public void handleOpenCommMessage_shouldAddCommMessageToStorageMap() throws Exception {
    //given
    Message message = initCloseMessage();
    String commId = (String) message.getContent().get(COMM_ID);
    //when
    commOpenHandler.handle(message);
    //then
    Assertions.assertThat(kernel.isCommPresent(commId)).isTrue();
  }

  @Test
  public void handleCloseCommMessage_shouldRemoveCommMessageFromStorageMap() throws Exception {
    //given
    String commId = initKernelCommMapWithOneComm(kernel);
    //when
    commCloseHandler.handle(initCloseMessage());
    //then
    Assertions.assertThat(kernel.isCommPresent(commId)).isFalse();
  }

  @Test
  public void handleOpenThenCloseCommMessages_shouldRemoveCommMessageFromStorageMap()
          throws Exception {
    //given
    Message openMessage = initOpenMessage();
    String commId = (String) openMessage.getContent().get(COMM_ID);
    //when
    commOpenHandler.handle(openMessage);
    commCloseHandler.handle(initCloseMessage());
    //then
    Assertions.assertThat(kernel.isCommPresent(commId)).isFalse();
  }

  @Test
  public void handleInfoCommMessages_replyCommMessageHasCommsInfoContent() throws Exception {
    //given
    initKernelCommMapWithOneComm(kernel);
    //when
    commInfoHandler.handle(initInfoMessage());
    //then
    Assertions.assertThat(kernel.getSentMessages()).isNotEmpty();
    Message sendMessage = kernel.getSentMessages().get(0);
    Assertions.assertThat((Map) sendMessage.getContent().get(COMMS)).isNotEmpty();
  }

  @Test
  public void commInfoHandlerHandleEmptyMessage_dontThrowNullPointerException() throws Exception {
    //given
    Message message = new Message();
    MessageTest.initMessage(message);
    //when
    commInfoHandler.handle(message);
  }

  @Test
  public void commOpenHandlerHandleEmptyMessage_dontThrowNullPointerException() throws Exception {
    //given
    Message message = new Message();
    MessageTest.initMessage(message);
    //wnen
    commOpenHandler.handle(message);
  }

  @Test
  public void commMsgHandlerHandleEmptyMessage_dontThrowNullPointerException() throws Exception {
    //given
    Message message = new Message();
    MessageTest.initMessage(message);
    //when
    commMsgHandler.handle(message);
  }

  @Test
  public void commCloseHandlerHandleEmptyMessage_dontThrowNullPointerException() throws Exception {
    //given
    Message message = new Message();
    MessageTest.initMessage(message);
    //when
    commCloseHandler.handle(message);
  }
}
