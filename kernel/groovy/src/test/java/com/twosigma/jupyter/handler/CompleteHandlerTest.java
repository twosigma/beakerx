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
package com.twosigma.jupyter.handler;

import com.twosigma.beaker.widgets.GroovyKernelTest;
import org.junit.Before;
import org.junit.Test;
import com.twosigma.jupyter.message.Message;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

public class CompleteHandlerTest {

  private CompleteHandler completeHandler;
  private GroovyKernelTest kernel;

  @Before
  public void setUp() throws Exception {
    kernel = new GroovyKernelTest();
    completeHandler = new CompleteHandler(kernel);
  }

  @Test
  public void shouldSendCompleteReplyMsgForPrintln() throws Exception {
    //given
    Message message = autocompleteMsgFor(
            "//parentheses are optional\n" +
            "System.out.printl \"hey!\"\n" +
            "println \"no System.out either!\"",44);
    //when
    completeHandler.handle(message);
    //then
    assertThat(kernel.getSentMessages().size()).isEqualTo(1);
    verifyAutocompleteMsg(kernel.getSentMessages().get(0),38,44);
  }

  @Test
  public void shouldSendCompleteReplyMsgForDef() throws Exception {
    //given
    String comment = "//parentheses are optional\n";
    Message message = autocompleteMsgFor(comment + "de", comment.length()+2);
    //when
     completeHandler.handle(message);
    //then
    assertThat(kernel.getSentMessages().size()).isEqualTo(1);
    verifyAutocompleteMsg(kernel.getSentMessages().get(0),27,comment.length()+2);
  }

  private void verifyAutocompleteMsg(Message reply, int expectedCursorStart, int expectedCursorEnd) {
    Map<String, Serializable> content = reply.getContent();
    int cursorStart = (int) content.get(CompleteHandler.CURSOR_START);
    assertThat(cursorStart).isEqualTo(expectedCursorStart);
    int cursorEnd = (int) content.get(CompleteHandler.CURSOR_END);
    assertThat(cursorEnd).isEqualTo(expectedCursorEnd);
    Object[] matches = (Object[]) content.get(CompleteHandler.MATCHES);
    assertThat(matches).isNotEmpty();
  }

  private Message autocompleteMsgFor(String code, int curPos) {
    Message message = new Message();
    Map<String, Serializable> content = new HashMap();
    content.put(CompleteHandler.CODE, code);
    content.put(CompleteHandler.CURSOR_POS, curPos);
    message.setContent(content);
    return message;
  }
}