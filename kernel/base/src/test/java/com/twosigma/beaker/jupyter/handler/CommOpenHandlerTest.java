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

import com.twosigma.beaker.KernelTest;
import com.twosigma.beaker.jupyter.msg.JupyterMessages;
import org.assertj.core.api.Assertions;
import org.junit.Before;
import com.twosigma.jupyter.handler.Handler;
import com.twosigma.jupyter.message.Message;
import org.junit.Test;

import java.util.Map;

import static com.twosigma.beaker.jupyter.comm.Comm.COMM_ID;
import static com.twosigma.beaker.jupyter.comm.Comm.DATA;
import static com.twosigma.beaker.jupyter.comm.Comm.TARGET_MODULE;
import static com.twosigma.beaker.jupyter.comm.Comm.TARGET_NAME;

public class CommOpenHandlerTest {

  private KernelTest kernel;
  private CommOpenHandler commOpenHandler;
  private Message message;

  @Before
  public void setUp() {
    kernel = new KernelTest();
    commOpenHandler = new CommOpenHandler(kernel) {
      @Override
      public Handler<Message>[] getKernelControlChanelHandlers(String targetName) {
        return (Handler<Message>[]) new Handler<?>[0];
      }
    };
    message = JupyterHandlerTest.initOpenMessage();
  }

  //@Test
  public void handleMessage_shouldSendShellSocketMessage() throws Exception {
    //when
    commOpenHandler.handle(message);
    //then
    Assertions.assertThat(kernel.getSentMessages()).isNotEmpty();
  }

  //@Test
  public void handleMessageWithoutCommId_shouldSendCloseCommMessage() throws Exception {
    //given
    message.getContent().remove(COMM_ID);
    //when
    commOpenHandler.handle(message);
    //then
    Assertions.assertThat(kernel.getSentMessages()).isNotEmpty();
    Message sendMessage = kernel.getSentMessages().get(0);
    Assertions.assertThat(sendMessage.getHeader().getType())
        .isEqualTo(JupyterMessages.COMM_CLOSE.getName());
  }

  //@Test
  public void handleMessageWithoutTargetName_shouldSendCloseCommMessage() throws Exception {
    //given
    message.getContent().remove(TARGET_NAME);
    //when
    commOpenHandler.handle(message);
    //then
    Assertions.assertThat(kernel.getSentMessages()).isNotEmpty();
    Message sendMessage = kernel.getSentMessages().get(0);
    Assertions.assertThat(sendMessage.getHeader().getType())
        .isEqualTo(JupyterMessages.COMM_CLOSE.getName());
  }

  //@Test
  public void handleMessage_sentMessageHasCommId() throws Exception {
    //given
    String expectedCommId = (String) message.getContent().get(COMM_ID);
    //when
    commOpenHandler.handle(message);
    //then
    Assertions.assertThat(kernel.getSentMessages()).isNotEmpty();
    Message sendMessage = kernel.getSentMessages().get(0);
    Assertions.assertThat(sendMessage.getContent().get(COMM_ID)).isEqualTo(expectedCommId);
  }

  //@Test
  public void handleMessage_sentMessageHasTargetName() throws Exception {
    //given
    String expectedTargetName = (String) message.getContent().get(TARGET_NAME);
    //when
    commOpenHandler.handle(message);
    //then
    Assertions.assertThat(kernel.getSentMessages()).isNotEmpty();
    Message sendMessage = kernel.getSentMessages().get(0);
    Assertions.assertThat(sendMessage.getContent().get(TARGET_NAME)).isEqualTo(expectedTargetName);
  }

  //@Test
  public void handleMessage_sentMessageHasEmptyData() throws Exception {
    //when
    commOpenHandler.handle(message);
    //then
    Assertions.assertThat(kernel.getSentMessages()).isNotEmpty();
    Message sendMessage = kernel.getSentMessages().get(0);
    Assertions.assertThat((Map) sendMessage.getContent().get(DATA)).isEmpty();
  }

  //@Test
  public void handleMessage_sentMessageHasTargetModule() throws Exception {
    //given
    String expectedTargetModule = (String) message.getContent().get(TARGET_MODULE);
    //when
    commOpenHandler.handle(message);
    //then
    Assertions.assertThat(kernel.getSentMessages()).isNotEmpty();
    Message sendMessage = kernel.getSentMessages().get(0);
    Assertions.assertThat(sendMessage.getContent().get(TARGET_MODULE))
        .isEqualTo(expectedTargetModule);
  }

  //@Test
  public void handleMessage_sentMessageHasParentHeader() throws Exception {
    //given
    String expectedHeader = message.getHeader().asJson();
    //when
    commOpenHandler.handle(message);
    //then
    Assertions.assertThat(kernel.getSentMessages()).isNotEmpty();
    Message sendMessage = kernel.getSentMessages().get(0);
    Assertions.assertThat(sendMessage.getParentHeader().asJson()).isEqualTo(expectedHeader);
  }

  //@Test
  public void handleMessage_sentMessageHasIdentities() throws Exception {
    //given
    String expectedIdentities = new String(message.getIdentities().get(0));
    //when
    commOpenHandler.handle(message);
    //then
    Assertions.assertThat(kernel.getSentMessages()).isNotEmpty();
    Message sendMessage = kernel.getSentMessages().get(0);
    Assertions.assertThat(new String(sendMessage.getIdentities().get(0)))
        .isEqualTo(expectedIdentities);
  }
}
