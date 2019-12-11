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
package com.twosigma.beakerx.widget.floats;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.jupyter.SearchMessages;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.BoundedFloatText;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.List;
import static com.twosigma.beakerx.widget.TestWidgetUtils.getValueForProperty;
import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyMsgForProperty;
import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyOpenCommMsg;
import static org.assertj.core.api.Assertions.assertThat;

public class BoundedFloatTextTest {

  private KernelTest groovyKernel;

  @Before
  public void setUp() throws Exception {
    groovyKernel = new KernelTest();
    KernelManager.register(groovyKernel);
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void createByEmptyConstructor_sendCommOpenMessage() throws Exception {
    //given
    //when
    new BoundedFloatText();
    //then
    verifyOpenCommMsg(
            groovyKernel.getPublishedMessages(),
            BoundedFloatText.MODEL_NAME_VALUE,
            BoundedFloatText.VIEW_NAME_VALUE
    );
  }

  @Test
  public void setValue_sendCommMessage() throws Exception {
    double expected = 5.5;
    //given
    BoundedFloatText boundedFloatText = boundedFloatText();
    //when
    boundedFloatText.setValue(expected);
    //then
    verifyMsgForProperty(groovyKernel, boundedFloatText.VALUE, expected);
  }

  private BoundedFloatText boundedFloatText() {
    BoundedFloatText boundedFloatText = new BoundedFloatText();
    groovyKernel.clearPublishedMessages();
    return boundedFloatText;
  }

  @Test
  public void respectMax() {
    //given
    BoundedFloatText boundedFloatText = new BoundedFloatText();
    boundedFloatText.setMax(10.5);
    groovyKernel.clearPublishedMessages();
    //when
    boundedFloatText.setValue(15.123);
    //then
    verifyMsgForProperty(groovyKernel, boundedFloatText.VALUE, 10.5);
  }

  @Test
  public void respectMin() {
    //given
    double min = 0.0;
    BoundedFloatText boundedFloatText = new BoundedFloatText();
    boundedFloatText.setMin(min);
    groovyKernel.clearPublishedMessages();
    //when
    boundedFloatText.setValue(-1.1);
    //then
    verifyMsgForProperty(groovyKernel, boundedFloatText.VALUE, 0.0);
  }

  @Test
  public void shouldReturnMinWhenValueLessThenMin() {
    //given
    double min = 5.0;
    BoundedFloatText boundedFloatText = new BoundedFloatText();
    groovyKernel.clearPublishedMessages();
    //when
    boundedFloatText.setMin(min);
    //then
    List<Message> messages = SearchMessages
            .getListByDataAttr(groovyKernel.getPublishedMessages(), Comm.METHOD, Comm.UPDATE);
    assertThat(getValueForProperty(messages.get(0), BoundedFloatText.VALUE, Double.class).equals(min));
    assertThat(getValueForProperty(messages.get(1), BoundedFloatText.MIN, Double.class).equals(min));
  }

  @Test
  public void shouldReturnMaxWhenValueGreaterThenMax() {
    //given
    double max = 5.0;
    BoundedFloatText boundedFloatText = new BoundedFloatText();
    boundedFloatText.setValue(100);
    groovyKernel.clearPublishedMessages();
    //when
    boundedFloatText.setMax(max);
    //then

    List<Message> messages = SearchMessages
            .getListByDataAttr(groovyKernel.getPublishedMessages(), Comm.METHOD, Comm.UPDATE);
    assertThat(getValueForProperty(messages.get(0), BoundedFloatText.VALUE, Double.class).equals(max));
    assertThat(getValueForProperty(messages.get(1), BoundedFloatText.MAX, Double.class).equals(max));
  }
}
