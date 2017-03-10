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

import com.twosigma.beaker.jupyter.GroovyKernelJupyterTest;
import com.twosigma.beaker.jupyter.msg.JupyterMessages;
import com.twosigma.beaker.jupyter.msg.MessageCreator;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import com.twosigma.jupyter.message.Message;

public class CommMsgHandlerTest {

  private GroovyKernelJupyterTest groovyKernel;
  private CommMsgHandler commMsgHandler;
  private Message message;

  @Before
  public void setUp() {
    groovyKernel = new GroovyKernelJupyterTest();
    commMsgHandler = new CommMsgHandler(groovyKernel, new MessageCreator(groovyKernel));
    message = JupyterHandlerTest.initCommMessage();
    JupyterHandlerTest.initKernelCommMapWithOneComm(groovyKernel);
  }

//  @Test
  public void handleMessage_shouldSendTwoMessages() throws Exception {
    //when
    commMsgHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
    Assertions.assertThat(groovyKernel.getPublishMessages().size()).isEqualTo(2);
  }

//  @Test
  public void handleMessage_commShouldHandleMessages() throws Exception {
    //when
    commMsgHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getCommHandleMessage()).isTrue();
  }

//  @Test
  public void handleMessage_firstSentMessageHasExecutionStateIsBusy() throws Exception {
    //when
    commMsgHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
    Message publishMessage = groovyKernel.getPublishMessages().get(0);
    Assertions.assertThat(publishMessage.getContent().get("execution_state")).isEqualTo("busy");
  }

//  @Test
  public void handleMessage_firstSentMessageHasSessionId() throws Exception {
    //given
    String expectedSessionId = message.getHeader().getSession();
    //when
    commMsgHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
    Message publishMessage = groovyKernel.getPublishMessages().get(0);
    Assertions.assertThat(publishMessage.getHeader().getSession()).isEqualTo(expectedSessionId);
  }

//  @Test
  public void handleMessage_firstSentMessageHasTypeIsStatus() throws Exception {
    //when
    commMsgHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
    Message publishMessage = groovyKernel.getPublishMessages().get(0);
    Assertions.assertThat(publishMessage.getHeader().getType())
        .isEqualTo(JupyterMessages.STATUS.getName());
  }

//  @Test
  public void handleMessage_firstSentMessageHasParentHeader() throws Exception {
    //given
    String expectedHeader = message.getHeader().asJson();
    //when
    commMsgHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
    Message publishMessage = groovyKernel.getPublishMessages().get(0);
    Assertions.assertThat(publishMessage.getParentHeader().asJson()).isEqualTo(expectedHeader);
  }

//  @Test
  public void handleMessage_firstSentMessageHasIdentities() throws Exception {
    //given
    String expectedIdentities = new String(message.getIdentities().get(0));
    //when
    commMsgHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
    Message publishMessage = groovyKernel.getPublishMessages().get(0);
    Assertions.assertThat(new String(publishMessage.getIdentities().get(0)))
        .isEqualTo(expectedIdentities);
  }

//  @Test
  public void handleMessage_secondSentMessageHasExecutionStateIsIdle() throws Exception {
    //when
    commMsgHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
    Message publishMessage = groovyKernel.getPublishMessages().get(1);
    Assertions.assertThat(publishMessage.getContent().get("execution_state")).isEqualTo("idle");
  }

//  @Test
  public void handleMessage_secondSentMessageHasSessionId() throws Exception {
    //given
    String expectedSessionId = message.getHeader().getSession();
    //when
    commMsgHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
    Message publishMessage = groovyKernel.getPublishMessages().get(1);
    Assertions.assertThat(publishMessage.getHeader().getSession()).isEqualTo(expectedSessionId);
  }

//  @Test
  public void handleMessage_secondSendMessageHasTypeIsStatus() throws Exception {
    //when
    commMsgHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
    Message publishMessage = groovyKernel.getPublishMessages().get(1);
    Assertions.assertThat(publishMessage.getHeader().getType())
        .isEqualTo(JupyterMessages.STATUS.getName());
  }

//  @Test
  public void handleMessage_secondSentMessageHasIdentities() throws Exception {
    //given
    String expectedIdentities = new String(message.getIdentities().get(0));
    //when
    commMsgHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getPublishMessages()).isNotEmpty();
    Message publishMessage = groovyKernel.getPublishMessages().get(1);
    Assertions.assertThat(new String(publishMessage.getIdentities().get(0)))
        .isEqualTo(expectedIdentities);
  }
}
