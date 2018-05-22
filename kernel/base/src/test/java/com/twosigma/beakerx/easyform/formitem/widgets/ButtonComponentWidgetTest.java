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
package com.twosigma.beakerx.easyform.formitem.widgets;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.easyform.EasyFormComponent;
import com.twosigma.beakerx.evaluator.EvaluatorResultTestWatcher;
import com.twosigma.beakerx.jvm.threads.BeakerStdOutErrHandler;
import com.twosigma.beakerx.widget.Button;
import com.twosigma.beakerx.message.Message;
import org.junit.Test;

import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.Optional;

import static com.twosigma.beakerx.MessageFactorTest.commMsg;
import static com.twosigma.beakerx.kernel.msg.MessageCreator.NAME;
import static com.twosigma.beakerx.kernel.msg.MessageCreator.STDOUT;
import static com.twosigma.beakerx.kernel.msg.MessageCreator.TEXT;
import static com.twosigma.beakerx.widget.TestWidgetUtils.getValueForProperty;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertTrue;

public class ButtonComponentWidgetTest extends EasyFormWidgetTest {

  @Test
  public void setTag() throws Exception {
    //given
    String tag = "tag1";
    ButtonComponentWidget widget = new ButtonComponentWidget();
    kernel.clearPublishedMessages();
    //when
    widget.setTag(tag);
    //then
    verifyTag(kernel.getPublishedMessages().get(0), tag);
  }

  private void verifyTag(Message message, String expectedTag) {
    String tag = getValueForProperty(message, Button.TAG, String.class);
    assertThat(tag).isEqualTo(expectedTag);
  }

  @Test
  public void handleActionPerformed() throws Exception {
    //given
    final StringBuilder result = new StringBuilder();
    ButtonComponentWidget widget = new ButtonComponentWidget();
    widget.actionPerformed = value -> result.append("action done 1");
    //when
    widget.getComm().handleMsg(messageWithClickEvent());
    //then
    assertThat(result.toString()).isEqualTo("action done 1");
  }

  @Test
  public void noHandleActionPerformed() throws Exception {
    //given
    final StringBuilder result = new StringBuilder().append("no action");
    ButtonComponentWidget widget = new ButtonComponentWidget();
    widget.actionPerformed = value -> result.append("action done 2");
    //when
    widget.getComm().handleMsg(messageWithoutClickEvent());
    //then
    assertThat(result.toString()).isEqualTo("no action");
  }

  private Message messageWithClickEvent() {
    Message message = commMsg();
    LinkedHashMap<String, Serializable> content = new LinkedHashMap<>();
    LinkedHashMap<Object, Object> eventContent = new LinkedHashMap<>();
    LinkedHashMap<Object, Object> eventClick = new LinkedHashMap<>();
    eventClick.put("event", "click");
    eventContent.put("content", eventClick);
    content.put("data", eventContent);
    message.setContent(content);
    return message;
  }

  @Test
  public void handleStdOut() throws Exception {
    try {
      //given
      String outputText = "handleOutput";
      BeakerStdOutErrHandler.init();
      ButtonComponentWidget widget = new ButtonComponentWidget();
      kernel.clearPublishedMessages();
      widget.actionPerformed = value -> System.out.print(outputText);
      //when
      widget.getComm().handleMsg(messageWithClickEvent());
      //then
      Message outputMessage = getOutputMessage(kernel);
      assertThat(outputMessage.getContent().get(NAME)).isEqualTo(STDOUT);
      assertThat(outputMessage.getContent().get(TEXT)).isEqualTo(outputText);
    } finally {
      BeakerStdOutErrHandler.fini();
    }
  }

  private Message getOutputMessage(KernelTest kernel) throws InterruptedException {
    Optional<Message> message = EvaluatorResultTestWatcher.waitForStreamMessage(kernel);
    assertTrue("No output message", message.isPresent());
    return message.get();
  }

  private Message messageWithoutClickEvent() {
    return commMsg();
  }

  @Override
  protected EasyFormComponent createWidget() {
    return new ButtonComponentWidget();
  }
}