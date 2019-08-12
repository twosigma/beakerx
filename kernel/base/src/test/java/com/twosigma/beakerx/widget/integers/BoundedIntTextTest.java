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
package com.twosigma.beakerx.widget.integers;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.jupyter.SearchMessages;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.BoundedIntText;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.List;
import java.util.stream.Collectors;

import static com.twosigma.beakerx.widget.TestWidgetUtils.findValueForProperty;
import static com.twosigma.beakerx.widget.TestWidgetUtils.getValueForProperty;
import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyMsgForProperty;
import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyOpenCommMsg;

public class BoundedIntTextTest {

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
    new BoundedIntText();
    //then
    verifyOpenCommMsg(
            groovyKernel.getPublishedMessages(),
            BoundedIntText.MODEL_NAME_VALUE,
            BoundedIntText.VIEW_NAME_VALUE
    );
  }

  @Test
  public void setValue_sendCommMessage() {
    int expected = 2;
    //given
    BoundedIntText boundedIntText = BoundedIntText();
    //when
    boundedIntText.setValue(expected);
    //then
    verifyMsgForProperty(groovyKernel, boundedIntText.VALUE, expected);
  }

  private BoundedIntText BoundedIntText() {
    BoundedIntText boundedIntText = new BoundedIntText();
    groovyKernel.clearPublishedMessages();
    return boundedIntText;
  }


  @Test
  public void respectMax() {
    //given
    BoundedIntText boundedIntText = BoundedIntText();
    boundedIntText.setMax(10);
    groovyKernel.clearPublishedMessages();
    //when
    boundedIntText.setValue(15);
    //then
    verifyMsgForProperty(groovyKernel, boundedIntText.VALUE, 10);
  }

  @Test
  public void respectMin() {
    //given
    int min = 0;
    BoundedIntText boundedIntText = BoundedIntText();
    boundedIntText.setMin(min);
    groovyKernel.clearPublishedMessages();
    //when
    boundedIntText.setValue(-1);
    //then
    verifyMsgForProperty(groovyKernel, boundedIntText.VALUE, 0);
  }


  @Test
  public void shouldReturnMinWhenValueLessThenMin() {
    //given
    int min = 5;
    BoundedIntText boundedIntText = BoundedIntText();
    groovyKernel.clearPublishedMessages();
    //when
    boundedIntText.setMin(min);
    //then
    List<Message> messages = SearchMessages
            .getListByDataAttr(groovyKernel.getPublishedMessages(), Comm.METHOD, Comm.UPDATE);
    List<Message> collect = messages.stream()
            .filter(x -> getValueForProperty(x, boundedIntText.VALUE, Integer.class).equals(min))
            .collect(Collectors.toList());
    Assertions.assertThat(collect.size()).isEqualTo(1);
  }

  @Test
  public void shouldReturnMaxWhenValueGreaterThenMax() {
    //given
    int max = 5;
    BoundedIntText boundedIntText = BoundedIntText();
    boundedIntText.setValue(100);
    groovyKernel.clearPublishedMessages();
    //when
    boundedIntText.setMax(max);
    //then
    List<Message> messages = SearchMessages
            .getListByDataAttr(groovyKernel.getPublishedMessages(), Comm.METHOD, Comm.UPDATE);
    List<Message> collect = messages.stream()
            .filter(x -> getValueForProperty(x, boundedIntText.VALUE, Integer.class).equals(max))
            .collect(Collectors.toList());
    Assertions.assertThat(collect.size()).isEqualTo(1);
  }
}
