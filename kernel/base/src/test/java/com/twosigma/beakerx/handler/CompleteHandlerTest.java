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

package com.twosigma.beakerx.handler;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.MessageFactorTest;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.message.Header;
import com.twosigma.beakerx.message.Message;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import static com.twosigma.beakerx.kernel.msg.JupyterMessages.COMPLETE_REPLY;

public class CompleteHandlerTest {

  private CompleteHandler completeHandler;
  private Message message;
  private static KernelTest kernel;
  private static EvaluatorTest evaluator;

  @BeforeClass
  public static void setUpClass(){
    evaluator = new EvaluatorTest();
    kernel = new KernelTest("sid", evaluator);
  }

  @Before
  public void setUp() throws Exception {
    completeHandler = new CompleteHandler(kernel);
    message = createAutocompleteMsg();
  }

  @After
  public void tearDown() throws Exception {
    kernel.clearSentMessages();
  }

  @AfterClass
  public static void tearDownClass() throws Exception {
    evaluator.exit();
  }

  @Test
  public void handle_shouldSendMessage() throws Exception {
    //when
    completeHandler.handle(message);
    //then
    Assertions.assertThat(kernel.getSentMessages()).isNotEmpty();
    Assertions.assertThat(kernel.getSentMessages().get(0)).isNotNull();
  }

  @Test
  public void handle_sentMessageHasHeaderTypeIsCompleteReply() throws Exception {
    //when
    completeHandler.handle(message);
    //then
    Header header = kernel.getSentMessages().get(0).getHeader();
    Assertions.assertThat(header).isNotNull();
    Assertions.assertThat(header.getType()).isEqualTo(COMPLETE_REPLY.getName());
  }

  @Test
  public void handle_messageContentHasCursorStartAndEndFields() throws Exception {
    //when
     completeHandler.handle(message);
    //then
    Map<String, Serializable> content = kernel.getSentMessages().get(0).getContent();
    Assertions.assertThat(content.get(CompleteHandler.CURSOR_START)).isNotNull();
    Assertions.assertThat(content.get(CompleteHandler.CURSOR_END)).isNotNull();
  }

  @Test
  public void handle_messageContentHasMatchesField() throws Exception {
    //when
    completeHandler.handle(message);
    //then
    Map<String, Serializable> content = kernel.getSentMessages().get(0).getContent();
    Assertions.assertThat(content.get(CompleteHandler.MATCHES)).isNotNull();
  }

  @Test
  public void handle_messageContentHasStatus() throws Exception {
    //when
    completeHandler.handle(message);
    //then
    Map<String, Serializable> content = kernel.getSentMessages().get(0).getContent();
    Assertions.assertThat(content.get(CompleteHandler.STATUS)).isNotNull();
  }

  private Message createAutocompleteMsg() {
    Message message = MessageFactorTest.commMsg();
    Map<String, Serializable> content = new HashMap();
    content.put(CompleteHandler.CODE, "test");
    content.put(CompleteHandler.CURSOR_POS, 0);
    message.setContent(content);
    return message;
  }

}