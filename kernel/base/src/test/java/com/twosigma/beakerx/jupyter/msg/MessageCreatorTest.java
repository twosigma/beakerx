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
package com.twosigma.beakerx.jupyter.msg;

import com.twosigma.ExecuteCodeCallbackTest;
import com.twosigma.beakerx.kernel.SocketEnum;
import com.twosigma.beakerx.jvm.object.SimpleEvaluationObject;
import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.kernel.msg.MessageCreator;
import com.twosigma.beakerx.kernel.msg.MessageHolder;
import com.twosigma.beakerx.widgets.TestWidgetUtils;
import org.junit.Before;
import org.junit.Test;
import com.twosigma.beakerx.message.Message;

import java.util.List;
import java.util.Map;

import static com.twosigma.beakerx.kernel.msg.MessageCreator.NULL_RESULT;
import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.assertThat;

public class MessageCreatorTest {

  private MessageCreator messageCreator;
  private SimpleEvaluationObject seo;

  @Before
  public void setUp() throws Exception {
    messageCreator = new MessageCreator(new KernelTest("id1"));
    seo = new SimpleEvaluationObject("code", new ExecuteCodeCallbackTest());
    seo.setJupyterMessage(new Message());
  }

  @Test
  public void createMessageWithNullResult_shouldReturnNullStringForNull() throws Exception {
    //given
    seo.finished(null);
    //when
    List<MessageHolder> message = messageCreator.createMessage(seo);
    //then
    Map data = TestWidgetUtils.getData(message.get(0).getMessage());
    assertThat(data.get(MessageCreator.TEXT_PLAIN)).isEqualTo(NULL_RESULT);
  }

  @Test
  public void createMessageWithNotNullResult_shouldReturnResult() throws Exception {
    //given
    seo.finished("NotNullResult");
    //when
    List<MessageHolder> message = messageCreator.createMessage(seo);
    //then
    Map data = TestWidgetUtils.getData(message.get(0).getMessage());
    assertThat(data.get(MessageCreator.TEXT_PLAIN)).isEqualTo("NotNullResult");
  }

  //@Test
  public void createMessageForCollection() throws Exception {
    //given
    seo.finished(asList("1", "2"));
    //when
    List<MessageHolder> message = messageCreator.createMessage(seo);
    //then
    Map data = TestWidgetUtils.getData(message.get(0).getMessage());
    assertThat(data.get(MessageCreator.TEXT_PLAIN)).isEqualTo("[\"1\",\"2\"]");
  }

  @Test
  public void createMessageWithNotNullResult_createTwoMessages() throws Exception {
    //given
    seo.finished("result");
    //when
    List<MessageHolder> messages = messageCreator.createMessage(seo);
    //then
    assertThat(messages).isNotEmpty();
    assertThat(messages.size()).isEqualTo(2);
  }

  @Test
  public void createMessageWithNotNullResult_firstIOPubMessageHasTypeIsExecuteResult() throws Exception {
    //given
    seo.finished("result");
    //when
    List<MessageHolder> messages = messageCreator.createMessage(seo);
    //then
    assertThat(messages).isNotEmpty();
    assertThat(messages.get(0).getSocketType()).isEqualTo(SocketEnum.IOPUB_SOCKET);
    assertThat(messages.get(0).getMessage().type()).isEqualTo(JupyterMessages.EXECUTE_RESULT);
  }

  @Test
  public void createMessageWithNotNullResult_secondShellMessageHasTypeIsExecuteReply() throws Exception {
    //given
    seo.finished("result");
    //when
    List<MessageHolder> messages = messageCreator.createMessage(seo);
    //then
    assertThat(messages).isNotEmpty();
    assertThat(messages.get(1).getSocketType()).isEqualTo(SocketEnum.SHELL_SOCKET);
    assertThat(messages.get(1).getMessage().type()).isEqualTo(JupyterMessages.EXECUTE_REPLY);
  }

  @Test
  public void createIdleMessage_messageHasTypeIsStatus() {
    //when
    Message message = messageCreator.createIdleMessage(new Message());
    //then
    assertThat(message.type()).isEqualTo(JupyterMessages.STATUS);
  }

  @Test
  public void createIdleMessage_messageHasExecutionStateIsIdle() {
    //when
    Message message = messageCreator.createIdleMessage(new Message());
    //then
    Map data = message.getContent();
    assertThat(data.get(MessageCreator.EXECUTION_STATE)).isEqualTo(MessageCreator.IDLE);
  }

  @Test
  public void createBusyMessage_messageHasTypeIsStatus() {
    //when
    Message message = messageCreator.createBusyMessage(new Message());
    //then
    assertThat(message.type()).isEqualTo(JupyterMessages.STATUS);
  }

  @Test
  public void createBusyMessage_messageHasExecutionStateIsBusy() {
    //when
    Message message = messageCreator.createBusyMessage(new Message());
    //then
    Map data = message.getContent();
    assertThat(data.get(MessageCreator.EXECUTION_STATE)).isEqualTo(MessageCreator.BUSY);
  }

  @Test
  public void createMessageWithError_createTwoMessages() throws Exception {
    //given
    seo.error("some error");
    //when
    List<MessageHolder> messages = messageCreator.createMessage(seo);
    //then
    assertThat(messages).isNotEmpty();
    assertThat(messages.size()).isEqualTo(2);
  }

  @Test
  public void createMessageWithError_firstIOPubMessageHasTypeIsStream() throws Exception {
    //given
    seo.error("some error");
    //when
    List<MessageHolder> messages = messageCreator.createMessage(seo);
    //then
    assertThat(messages).isNotEmpty();
    assertThat(messages.get(0).getSocketType()).isEqualTo(SocketEnum.IOPUB_SOCKET);
    assertThat(messages.get(0).getMessage().type()).isEqualTo(JupyterMessages.ERROR);
  }

  @Test
  public void createMessageWithError_secondShellMessageHasTypeIsExecuteReply() throws Exception {
    //given
    seo.error("some error");
    //when
    List<MessageHolder> messages = messageCreator.createMessage(seo);
    //then
    assertThat(messages).isNotEmpty();
    assertThat(messages.get(1).getSocketType()).isEqualTo(SocketEnum.SHELL_SOCKET);
    assertThat(messages.get(1).getMessage().type()).isEqualTo(JupyterMessages.EXECUTE_REPLY);
  }

  @Test
  public void createMessageWithError_whenException() throws Exception {
    //given
    seo.error(new RuntimeException("oops"));
    //when
    List<MessageHolder> messages = messageCreator.createMessage(seo);
    //then
    assertThat(messages).isNotEmpty();
    assertThat(messages.get(1).getSocketType()).isEqualTo(SocketEnum.SHELL_SOCKET);
    assertThat(messages.get(1).getMessage().type()).isEqualTo(JupyterMessages.EXECUTE_REPLY);
  }
}