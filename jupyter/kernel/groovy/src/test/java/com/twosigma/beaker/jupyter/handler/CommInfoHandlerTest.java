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
import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.lappsgrid.jupyter.msg.Message;

public class CommInfoHandlerTest {

  private GroovyKernelJupyterTest groovyKernel;
  private CommInfoHandler commInfoHandler;
  private Message message;

  @Before
  public void setUp() {
    groovyKernel = new GroovyKernelJupyterTest();
    commInfoHandler = new CommInfoHandler(groovyKernel);
    message = JupyterHandlerTest.initInfoMessage();
  }

//  @Test
  public void handleMessage_shouldSendShellSocketMessage() throws Exception {
    //when
    commInfoHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getSendMessages()).isNotEmpty();
  }

//  @Test
  public void handleMessage_sentMessageHasTypeIsCommInfoReply() throws Exception {
    //when
    commInfoHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getSendMessages()).isNotEmpty();
    Message sendMessage = groovyKernel.getSendMessages().get(0);
    Assertions.assertThat(sendMessage.getHeader().getType())
        .isEqualTo(JupyterMessages.COMM_INFO_REPLY.getName());
  }

//  @Test
  public void handleMessage_sentMessageHasSessionId() throws Exception {
    //given
    String expectedSessionId = message.getHeader().getSession();
    //when
    commInfoHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getSendMessages()).isNotEmpty();
    Message sendMessage = groovyKernel.getSendMessages().get(0);
    Assertions.assertThat(sendMessage.getHeader().getSession()).isEqualTo(expectedSessionId);
  }

//  @Test
  public void handleMessage_sentMessageHasParentHeader() throws Exception {
    //given
    String expectedHeader = message.getHeader().asJson();
    //when
    commInfoHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getSendMessages()).isNotEmpty();
    Message sendMessage = groovyKernel.getSendMessages().get(0);
    Assertions.assertThat(sendMessage.getParentHeader().asJson()).isEqualTo(expectedHeader);
  }

//  @Test
  public void handleMessage_sentMessageHasIdentities() throws Exception {
    //given
    String expectedIdentities = new String(message.getIdentities().get(0));
    //when
    commInfoHandler.handle(message);
    //then
    Assertions.assertThat(groovyKernel.getSendMessages()).isNotEmpty();
    Message sendMessage = groovyKernel.getSendMessages().get(0);
    Assertions.assertThat(new String(sendMessage.getIdentities().get(0)))
        .isEqualTo(expectedIdentities);
  }
}
