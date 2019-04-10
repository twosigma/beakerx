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

package com.twosigma.beakerx.groovy.autocomplete;

import com.twosigma.beakerx.MessageFactorTest;
import com.twosigma.beakerx.evaluator.ClasspathScannerMock;
import com.twosigma.beakerx.evaluator.EvaluatorTest;
import com.twosigma.beakerx.evaluator.MagicCommandAutocompletePatternsMock;
import com.twosigma.beakerx.groovy.evaluator.GroovyEvaluator;
import com.twosigma.beakerx.groovy.kernel.GroovyKernelMock;
import com.twosigma.beakerx.handler.CompleteHandler;
import com.twosigma.beakerx.kernel.EvaluatorParameters;
import com.twosigma.beakerx.message.Message;
import org.apache.commons.collections.map.HashedMap;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import static com.twosigma.beakerx.evaluator.TestBeakerCellExecutor.cellExecutor;
import static org.assertj.core.api.Assertions.assertThat;

public class GroovyCompleteHandlerTest {

  private CompleteHandler completeHandler;
  private static GroovyKernelMock groovyKernel;

  @BeforeClass
  public static void setUpClass() {
    GroovyEvaluator groovyEvaluator = new GroovyEvaluator(
            "id",
            "sid",
            cellExecutor(),
            EvaluatorTest.getTestTempFolderFactory(),
            new EvaluatorParameters(new HashedMap()),
            new EvaluatorTest.BeakexClientTestImpl(),
            new MagicCommandAutocompletePatternsMock(),
            new ClasspathScannerMock()
    );
    groovyKernel = new GroovyKernelMock("sid", groovyEvaluator);
  }

  @Before
  public void setUp() throws Exception {
    completeHandler = new CompleteHandler(groovyKernel);
  }

  @After
  public void tearDown() throws Exception {
    groovyKernel.clearSentMessages();
  }

  @AfterClass
  public static void tearDownClass() throws Exception {
    groovyKernel.exit();
  }

  @Test
  public void shouldSendCompleteReplyMsgForPrintln() throws Exception {
    //given
    Message message = autocompleteMsgFor(
            "//parentheses are optional\n" +
                    "System.out.printl \"hey!\"\n" +
                    "println \"no System.out either!\"", 44);
    //when
    completeHandler.handle(message);
    //then
    assertThat(groovyKernel.getSentMessages().size()).isEqualTo(1);
    verifyAutocompleteMsg(groovyKernel.getSentMessages().get(0), 38, 44);
  }

  @Test
  public void shouldSendCompleteReplyMsgForDef() throws Exception {
    //given
    String comment = "//parentheses are optional\n";
    Message message = autocompleteMsgFor(comment + "de", comment.length() + 2);
    //when
    completeHandler.handle(message);
    //then
    assertThat(groovyKernel.getSentMessages().size()).isEqualTo(1);
    verifyAutocompleteMsg(groovyKernel.getSentMessages().get(0), 27, comment.length() + 2);
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
    Message message = MessageFactorTest.commMsg();
    Map<String, Serializable> content = new HashMap();
    content.put(CompleteHandler.CODE, code);
    content.put(CompleteHandler.CURSOR_POS, curPos);
    message.setContent(content);
    return message;
  }

}
