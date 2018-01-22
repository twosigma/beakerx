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

import static com.twosigma.beakerx.kernel.msg.JupyterMessages.EXECUTE_REPLY;
import static com.twosigma.beakerx.message.MessageSerializer.parse;
import static com.twosigma.beakerx.message.MessageSerializer.toJson;

import com.twosigma.beakerx.kernel.handler.ExecuteRequestHandler;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;

import java.util.LinkedHashMap;
import java.util.List;

public class ExecuteRequestHandlerTest {

  private static KernelTest kernel;
  private static EvaluatorTest evaluatorTest;
  private ExecuteRequestHandler executeRequestHandler;
  private Message message;
  private Message magicMessage;

  @BeforeClass
  public static void setUpClass() {
    evaluatorTest = new EvaluatorTest();
    kernel = new KernelTest("sid", evaluatorTest) {
      @Override
      public void publish(Message message) {
        super.publish(copyMessage(message));
      }
    };
  }

  @Before
  public void setUp() {
    executeRequestHandler = new ExecuteRequestHandler(kernel);
    message = JupyterHandlerTest.initExecuteRequestMessage();
    magicMessage = JupyterHandlerTest.initExecuteRequestMessage();
    magicMessage.getContent().put("code", "%lsmagic");
  }

  @After
  public void tearDown() throws Exception {
    kernel.clearPublishedMessages();
  }

  @AfterClass
  public static void tearDownClass() throws Exception {
    evaluatorTest.exit();
  }

  @Test
  public void handleMessage_firstSentMessageHasExecutionStateIsBusy() throws Exception {
    //when
    executeRequestHandler.handle(message);
    //then
    Assertions.assertThat(kernel.getPublishedMessages()).isNotEmpty();
    Message publishMessage = kernel.getPublishedMessages().get(0);
    Assertions.assertThat(publishMessage.getContent().get("execution_state")).isEqualTo("busy");
  }

  @Test
  public void handleMessage_firstSentMessageHasSessionId() throws Exception {
    //given
    String expectedSessionId = message.getHeader().getSession();
    //when
    executeRequestHandler.handle(message);
    //then
    Assertions.assertThat(kernel.getPublishedMessages()).isNotEmpty();
    Message publishMessage = kernel.getPublishedMessages().get(0);
    Assertions.assertThat(publishMessage.getHeader().getSession()).isEqualTo(expectedSessionId);
  }

  @Test
  public void handleMessage_firstSentMessageHasTypeIsStatus() throws Exception {
    //when
    executeRequestHandler.handle(message);
    //then
    Assertions.assertThat(kernel.getPublishedMessages()).isNotEmpty();
    Message publishMessage = kernel.getPublishedMessages().get(0);
    Assertions.assertThat(publishMessage.getHeader().getType())
            .isEqualTo(JupyterMessages.STATUS.getName());
  }

  @Test
  public void handleMessage_firstSentMessageHasParentHeader() throws Exception {
    //given
    String expectedHeader = message.getHeader().asJson();
    //when
    executeRequestHandler.handle(message);
    //then
    Assertions.assertThat(kernel.getPublishedMessages()).isNotEmpty();
    Message publishMessage = kernel.getPublishedMessages().get(0);
    Assertions.assertThat(publishMessage.getParentHeader().asJson()).isEqualTo(expectedHeader);
  }

  @Test
  public void handleMessage_firstSentMessageHasIdentities() throws Exception {
    //given
    String expectedIdentities = new String(message.getIdentities().get(0));
    //when
    executeRequestHandler.handle(message);
    //then
    Assertions.assertThat(kernel.getPublishedMessages()).isNotEmpty();
    Message publishMessage = kernel.getPublishedMessages().get(0);
    Assertions.assertThat(new String(publishMessage.getIdentities().get(0)))
            .isEqualTo(expectedIdentities);
  }

  @Test
  public void handleMessage_secondSentMessageHasSessionId() throws Exception {
    //given
    String expectedSessionId = message.getHeader().getSession();
    //when
    executeRequestHandler.handle(message);
    //then
    Assertions.assertThat(kernel.getPublishedMessages()).isNotEmpty();
    Message publishMessage = kernel.getPublishedMessages().get(1);
    Assertions.assertThat(publishMessage.getHeader().getSession()).isEqualTo(expectedSessionId);
  }

  @Test
  public void handleMessage_secondSendMessageHasTypeIsExecutionInput() throws Exception {
    //when
    executeRequestHandler.handle(message);
    //then
    Assertions.assertThat(kernel.getPublishedMessages()).isNotEmpty();
    Message publishMessage = kernel.getPublishedMessages().get(1);
    Assertions.assertThat(publishMessage.getHeader().getType())
            .isEqualTo(JupyterMessages.EXECUTE_INPUT.getName());
  }

  @Test
  public void handleMessage_secondSentMessageHasContentCode() throws Exception {
    //given
    String expectedCode = (String) message.getContent().get("code");
    //when
    executeRequestHandler.handle(message);
    //then
    Assertions.assertThat(kernel.getPublishedMessages()).isNotEmpty();
    Message publishMessage = kernel.getPublishedMessages().get(1);
    Assertions.assertThat(publishMessage.getContent().get("code")).isEqualTo(expectedCode);
  }

  @Test
  public void handleMessage_secondSentMessageHasContentExecutionCount() throws Exception {
    //when
    executeRequestHandler.handle(message);
    //then
    Assertions.assertThat(kernel.getPublishedMessages()).isNotEmpty();
    Message publishMessage = kernel.getPublishedMessages().get(1);
    Assertions.assertThat(publishMessage.getContent().get("execution_count")).isNotNull();
  }

  @Test
  public void handleMessage_secondSentMessageHasParentHeader() throws Exception {
    //given
    String expectedHeader = message.getHeader().asJson();
    //when
    executeRequestHandler.handle(message);
    //then
    Assertions.assertThat(kernel.getPublishedMessages()).isNotEmpty();
    Message publishMessage = kernel.getPublishedMessages().get(1);
    Assertions.assertThat(publishMessage.getParentHeader().asJson()).isEqualTo(expectedHeader);
  }

  @Test
  public void handleMessage_secondSentMessageHasIdentities() throws Exception {
    //given
    String expectedIdentities = new String(message.getIdentities().get(0));
    //when
    executeRequestHandler.handle(message);
    //then
    Assertions.assertThat(kernel.getPublishedMessages()).isNotEmpty();
    Message publishMessage = kernel.getPublishedMessages().get(1);
    Assertions.assertThat(new String(publishMessage.getIdentities().get(0)))
            .isEqualTo(expectedIdentities);
  }

  @Test
  public void handleMagicMessage_executionStateStartsBusyEndsIdle() throws Exception {
    //when
    executeRequestHandler.handle(magicMessage);
    //then
    final List<Message> publishedMessages = kernel.getPublishedMessages();
    Assertions.assertThat(publishedMessages).isNotEmpty();
    Message firstPublishedMessage = publishedMessages.get(0);
    Assertions.assertThat(firstPublishedMessage.getContent().get("execution_state")).isEqualTo("busy");
    Message lastPublishedMessage = publishedMessages.get(publishedMessages.size() - 1);
    Assertions.assertThat(lastPublishedMessage.getContent().get("execution_state")).isEqualTo("idle");
  }

  @Test
  public void handleMagicMessage_replyIsSent() {
    //when
    executeRequestHandler.handle(magicMessage);
    //then
    final List<Message> sentMessages = kernel.getSentMessages();
    Assertions.assertThat(sentMessages).isNotEmpty();
    Message firstSentMessage = sentMessages.get(0);
    Assertions.assertThat(firstSentMessage.getHeader().getTypeEnum()).isEqualTo(EXECUTE_REPLY);
  }

  private static Message copyMessage(Message origin) {
    Message copy = new Message();
    for (byte[] list : origin.getIdentities()) {
      copy.getIdentities().add(list.clone());
    }
    String header = toJson(origin.getHeader());
    String parent = toJson(origin.getParentHeader());
    String metadata = toJson(origin.getMetadata());
    String content = toJson(origin.getContent());
    copy.setHeader(parse(header, Header.class));
    copy.setParentHeader(parse(parent, Header.class));
    copy.setMetadata(parse(metadata, LinkedHashMap.class));
    copy.setContent(parse(content, LinkedHashMap.class));
    return copy;
  }
}
