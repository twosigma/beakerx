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

import com.twosigma.beaker.groovy.evaluator.GroovyEvaluatorManager;
import com.twosigma.beaker.jupyter.Comm;
import com.twosigma.beaker.jupyter.CommKernelControlGetDefaultShellHandler;
import com.twosigma.beaker.jupyter.CommKernelControlSetShellHandler;
import com.twosigma.beaker.jupyter.GroovyKernelJupyterTest;
import com.twosigma.beaker.jupyter.msg.JupyterMessages;
import com.twosigma.beaker.jupyter.msg.MessageCreator;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;
import org.lappsgrid.jupyter.groovy.msg.Header;
import org.lappsgrid.jupyter.groovy.msg.Message;
import org.lappsgrid.jupyter.groovy.msg.MessageTest;

import java.io.Serializable;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import static com.twosigma.beaker.jupyter.Comm.COMMS;
import static com.twosigma.beaker.jupyter.Comm.COMM_ID;
import static com.twosigma.beaker.jupyter.Comm.DATA;
import static com.twosigma.beaker.jupyter.Comm.TARGET_MODULE;
import static com.twosigma.beaker.jupyter.Comm.TARGET_NAME;

public class JupyterHandlerTest {

  private GroovyKernelJupyterTest groovyKernel;
  private CommOpenHandler commOpenHandler;
  private CommCloseHandler commCloseHandler;
  private CommInfoHandler commInfoHandler;
  private CommMsgHandler commMsgHandler;
  private ExecuteRequestHandler executeRequestHandler;

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

    Message message = new Message();
    message.setIdentities(Arrays.asList("identities".getBytes()));
    message.setHeader(initHeader(JupyterMessages.COMM_MSG));
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

    Message message = new Message();
    message.setIdentities(Arrays.asList("identities".getBytes()));
    message.setHeader(initHeader(JupyterMessages.EXECUTE_REQUEST));
    message.setParentHeader(null);
    message.setMetadata(new LinkedHashMap<>());
    message.setContent(content);
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

  public static String initKernelCommMapWithOneComm(
      GroovyKernelJupyterTest groovyKernelJupyterTest) {
    Message openMessage = initOpenMessage();
    String commId = (String) openMessage.getContent().get(COMM_ID);
    String targetName = (String) openMessage.getContent().get(TARGET_NAME);
    Comm comm =
        new Comm(commId, targetName) {
          @Override
          public void handleMsg(Message parentMessage) throws NoSuchAlgorithmException {
            groovyKernelJupyterTest.commHandleMessage();
          }
        };
    groovyKernelJupyterTest.addComm(commId, comm);
    return commId;
  }

  @Before
  public void setUp() {
    groovyKernel = new GroovyKernelJupyterTest();
    commOpenHandler = new CommOpenHandler(groovyKernel);
    commCloseHandler = new CommCloseHandler(groovyKernel);
    commInfoHandler = new CommInfoHandler(groovyKernel);
    commMsgHandler = new CommMsgHandler(groovyKernel, new MessageCreator(groovyKernel));
    executeRequestHandler =
        new ExecuteRequestHandler(groovyKernel, new GroovyEvaluatorManager(groovyKernel));
  }

  @Test
  public void handleOpenCommMessage_shouldAddCommMessageToStorageMap() throws Exception {
    //given
    Message message = initCloseMessage();
    String commId = (String) message.getContent().get(COMM_ID);
    //when
    commOpenHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.isCommPresent(commId)).isTrue();
  }

  @Test
  public void handleCloseCommMessage_shouldRemoveCommMessageFromStorageMap() throws Exception {
    //given
    String commId = initKernelCommMapWithOneComm(groovyKernel);
    //when
    commCloseHandler.handle(initCloseMessage());
    //then
    Assertions.assertThat(groovyKernel.isCommPresent(commId)).isFalse();
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
    Assertions.assertThat(groovyKernel.isCommPresent(commId)).isFalse();
  }

  @Test
  public void handleInfoCommMessages_replyCommMessageHasCommsInfoContent() throws Exception {
    //given
    initKernelCommMapWithOneComm(groovyKernel);
    //when
    commInfoHandler.handle(initInfoMessage());
    //then
    Assertions.assertThat(groovyKernel.getSendMessages()).isNotEmpty();
    Message sendMessage = groovyKernel.getSendMessages().get(0);
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

  @Test
  public void executeRequestHandlerHandleEmptyMessage_dontThrowNullPointerException()
      throws Exception {
    //given
    Message message = new Message();
    MessageTest.initMessage(message);
    //when
    executeRequestHandler.handle(message);
  }

  @Test
  public void defaultShellHandlerHandleEmptyMessage_dontThrowNullPointerException()
      throws Exception {
    //given
    Message message = new Message();
    MessageTest.initMessage(message);
    //when
    CommKernelControlGetDefaultShellHandler handler =
        new CommKernelControlGetDefaultShellHandler(groovyKernel);
    handler.handle(message);
  }

  @Test
  public void setShellHandlerHandleEmptyMessage_dontThrowNullPointerException() throws Exception {
    //given
    Message message = new Message();
    MessageTest.initMessage(message);
    //when
    CommKernelControlSetShellHandler handler = new CommKernelControlSetShellHandler(groovyKernel);
    handler.handle(message);
  }
}
