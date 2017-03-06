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
import com.twosigma.beaker.jupyter.msg.JupyterMessages;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.lappsgrid.jupyter.groovy.GroovyKernelTest;
import org.lappsgrid.jupyter.groovy.json.Serializer;
import org.lappsgrid.jupyter.groovy.msg.Header;
import org.lappsgrid.jupyter.groovy.msg.Message;

import java.security.NoSuchAlgorithmException;
import java.util.LinkedHashMap;

public class ExecuteRequestHandlerTest {

  private static GroovyKernelTest groovyKernel;
  private ExecuteRequestHandler executeRequestHandler;
  private static GroovyEvaluatorManager evaluatorManager;
  private Message message;

  @BeforeClass
  public static void setUpClass(){
    groovyKernel = new GroovyKernelTest(){
      @Override
      public void publish(Message message) throws NoSuchAlgorithmException {
        getPublishedMessages().add(copyMessage(message));
      }
    };
    evaluatorManager = new GroovyEvaluatorManager(groovyKernel){
      @Override
      public synchronized void executeCode(String code, Message message, int executionCount) {
      }
    };
  }

  @Before
  public void setUp() {
    executeRequestHandler = new ExecuteRequestHandler(groovyKernel, evaluatorManager);
    message = JupyterHandlerTest.initExecuteRequestMessage();
  }

  @After
  public void tearDown() throws Exception {
    groovyKernel.clearPublishedMessages();
  }

  @Test
  public void handleMessage_shouldPublishTwoMessages() throws Exception {
    //when
    executeRequestHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishedMessages()).isNotEmpty();
    Assertions.assertThat(groovyKernel.getPublishedMessages().size()).isEqualTo(2);
  }

  @Test
  public void handleMessage_firstPublishedMessageHasExecutionStateIsBusy() throws Exception {
    //when
    executeRequestHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishedMessages()).isNotEmpty();
    Message publishMessage = groovyKernel.getPublishedMessages().get(0);
    Assertions.assertThat(publishMessage.getContent().get("execution_state")).isEqualTo("busy");
  }

  @Test
  public void handleMessage_firstPublishedMessageHasSessionId() throws Exception {
    //given
    String expectedSessionId = message.getHeader().getSession();
    //when
    executeRequestHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishedMessages()).isNotEmpty();
    Message publishMessage = groovyKernel.getPublishedMessages().get(0);
    Assertions.assertThat(publishMessage.getHeader().getSession()).isEqualTo(expectedSessionId);
  }

  @Test
  public void handleMessage_firstPublishedMessageHasTypeIsStatus() throws Exception {
    //when
    executeRequestHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishedMessages()).isNotEmpty();
    Message publishMessage = groovyKernel.getPublishedMessages().get(0);
    Assertions.assertThat(publishMessage.getHeader().getType())
        .isEqualTo(JupyterMessages.STATUS.getName());
  }

  @Test
  public void handleMessage_firstPublishedMessageHasParentHeader() throws Exception {
    //given
    String expectedHeader = message.getHeader().asJson();
    //when
    executeRequestHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishedMessages()).isNotEmpty();
    Message publishMessage = groovyKernel.getPublishedMessages().get(0);
    Assertions.assertThat(publishMessage.getParentHeader().asJson()).isEqualTo(expectedHeader);
  }

  @Test
  public void handleMessage_firstPublishedMessageHasIdentities() throws Exception {
    //given
    String expectedIdentities = new String(message.getIdentities().get(0));
    //when
    executeRequestHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishedMessages()).isNotEmpty();
    Message publishMessage = groovyKernel.getPublishedMessages().get(0);
    Assertions.assertThat(new String(publishMessage.getIdentities().get(0)))
        .isEqualTo(expectedIdentities);
  }

  @Test
  public void handleMessage_secondPublishedMessageHasSessionId() throws Exception {
    //given
    String expectedSessionId = message.getHeader().getSession();
    //when
    executeRequestHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishedMessages()).isNotEmpty();
    Message publishMessage = groovyKernel.getPublishedMessages().get(1);
    Assertions.assertThat(publishMessage.getHeader().getSession()).isEqualTo(expectedSessionId);
  }

  @Test
  public void handleMessage_secondPublishedMessageHasTypeIsExecutionInput() throws Exception {
    //when
    executeRequestHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishedMessages()).isNotEmpty();
    Message publishMessage = groovyKernel.getPublishedMessages().get(1);
    Assertions.assertThat(publishMessage.getHeader().getType())
        .isEqualTo(JupyterMessages.EXECUTE_INPUT.getName());
  }

  @Test
  public void handleMessage_secondPublishedMessageHasContentCode() throws Exception {
    //given
    String expectedCode = (String) message.getContent().get("code");
    //when
    executeRequestHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishedMessages()).isNotEmpty();
    Message publishMessage = groovyKernel.getPublishedMessages().get(1);
    Assertions.assertThat(publishMessage.getContent().get("code")).isEqualTo(expectedCode);
  }

  @Test
  public void handleMessage_secondPublishedMessageHasContentExecutionCount() throws Exception {
    //when
    executeRequestHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishedMessages()).isNotEmpty();
    Message publishMessage = groovyKernel.getPublishedMessages().get(1);
    Assertions.assertThat(publishMessage.getContent().get("execution_count")).isNotNull();
  }

  @Test
  public void handleMessage_secondPublishedMessageHasParentHeader() throws Exception {
    //given
    String expectedHeader = message.getHeader().asJson();
    //when
    executeRequestHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishedMessages()).isNotEmpty();
    Message publishMessage = groovyKernel.getPublishedMessages().get(1);
    Assertions.assertThat(publishMessage.getParentHeader().asJson()).isEqualTo(expectedHeader);
  }

  @Test
  public void handleMessage_secondPublishedMessageHasIdentities() throws Exception {
    //given
    String expectedIdentities = new String(message.getIdentities().get(0));
    //when
    executeRequestHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishedMessages()).isNotEmpty();
    Message publishMessage = groovyKernel.getPublishedMessages().get(1);
    Assertions.assertThat(new String(publishMessage.getIdentities().get(0)))
        .isEqualTo(expectedIdentities);
  }

  private static Message copyMessage(Message origin) {
    Message copy = new Message();
    for (byte[] list : origin.getIdentities()) {
      copy.getIdentities().add(list.clone());
    }
    String header = Serializer.toJson(origin.getHeader());
    String parent = Serializer.toJson(origin.getParentHeader());
    String metadata = Serializer.toJson(origin.getMetadata());
    String content = Serializer.toJson(origin.getContent());
    copy.setHeader(Serializer.parse(header, Header.class));
    copy.setParentHeader(Serializer.parse(parent, Header.class));
    copy.setMetadata(Serializer.parse(metadata, LinkedHashMap.class));
    copy.setContent(Serializer.parse(content, LinkedHashMap.class));
    return copy;
  }
}
