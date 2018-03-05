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
package com.twosigma.beakerx.widget;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.kernel.KernelManager;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.security.NoSuchAlgorithmException;

import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyInternalOpenCommMsgWitLayout;
import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyMsgForProperty;

public class DatePickerTest {

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
  public void shouldSendCommOpenWhenCreate() throws Exception {
    //given
    //when
    new DatePicker();
    //then
    verifyInternalOpenCommMsgWitLayout(groovyKernel.getPublishedMessages(), DatePicker.MODEL_NAME_VALUE, DatePicker.VIEW_NAME_VALUE);
  }

  @Test
  public void changeValue_shouldSendCommMessage() throws Exception {
    String expected = "20120101";
    //given
    DatePicker widget = widget();
    //when
    widget.setValue(expected);
    //then
    TestWidgetUtils.verifyMsgForProperty(groovyKernel, DatePicker.VALUE, expected);
  }

  @Test
  public void setShowTime_shouldSendCommMessage() throws Exception {
    //given
    DatePicker widget = widget();
    //when
    widget.setShowTime(true);
    //then
    verifyMsgForProperty(groovyKernel, DatePicker.SHOW_TIME, true);
  }

  @Test
  public void setShowTimeFlag_hasThatShowTimeFlag() throws Exception {
    boolean expected = true;
    //given
    DatePicker widget = widget();
    //when
    widget.setShowTime(expected);
    //then
    Assertions.assertThat(widget.getShowTime()).isEqualTo(expected);
  }

  private DatePicker widget() throws NoSuchAlgorithmException {
    DatePicker widget = new DatePicker();
    groovyKernel.clearPublishedMessages();
    return widget;
  }

}