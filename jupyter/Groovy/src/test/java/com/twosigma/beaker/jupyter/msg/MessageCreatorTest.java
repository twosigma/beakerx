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
package com.twosigma.beaker.jupyter.msg;

import com.twosigma.beaker.jvm.object.SimpleEvaluationObject;
import com.twosigma.beaker.widgets.GroovyKernelTest;
import com.twosigma.beaker.widgets.TestWidgetUtils;
import org.junit.Before;
import org.junit.Test;
import org.lappsgrid.jupyter.groovy.msg.Message;

import java.util.List;
import java.util.Map;

import static com.twosigma.beaker.jupyter.msg.MessageCreator.NULL_RESULT;
import static org.assertj.core.api.Assertions.assertThat;

public class MessageCreatorTest {

  private MessageCreator messageCreator;

  @Before
  public void setUp() throws Exception {
    GroovyKernelTest kernel = new GroovyKernelTest("id1");
    messageCreator = new MessageCreator(kernel);
  }

  @Test
  public void shouldReturnNullStringForNull() throws Exception {
    //given
    SimpleEvaluationObject seo = new SimpleEvaluationObject(null);
    seo.setJupyterMessage(new Message());
    seo.finished(null);
    //when
    List<MessageHolder> message = messageCreator.createMessage(seo);
    //then
    Map data = TestWidgetUtils.getData(message.get(0).getMessage());
    assertThat(data.get(MessageCreator.TEXT_PLAIN)).isEqualTo(NULL_RESULT);
  }

  @Test
  public void shouldReturnResult() throws Exception {
    //given
    SimpleEvaluationObject seo = new SimpleEvaluationObject("1/1");
    seo.setJupyterMessage(new Message());
    seo.finished("1");
    //when
    List<MessageHolder> message = messageCreator.createMessage(seo);
    //then
    Map data = TestWidgetUtils.getData(message.get(0).getMessage());
    assertThat(data.get(MessageCreator.TEXT_PLAIN)).isEqualTo("1");
  }

}