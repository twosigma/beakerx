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
package com.twosigma.beakerx.widgets;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.kernel.KernelManager;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import static com.twosigma.beakerx.widgets.DatePicker.YYYY_MM_DD;
import static com.twosigma.beakerx.widgets.TestWidgetUtils.verifyInternalOpenCommMsgWitLayout;
import static com.twosigma.beakerx.widgets.TestWidgetUtils.verifyMsgForProperty;
import static org.assertj.core.api.Assertions.assertThat;

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
  public void shouldSendCommMsgWhenValueChange() throws Exception {
    //given
    DatePicker widget = widget();
    //when
    widget.setValue("20120101");
    //then
    TestWidgetUtils.verifyMsgForProperty(groovyKernel, DatePicker.VALUE, "20120101");
    assertThat(widget.getValue()).isEqualTo(new SimpleDateFormat(YYYY_MM_DD).parse("20120101"));
  }

  @Test
  public void shouldSendCommMsgWhenShowTimeChange() throws Exception {
    //given
    DatePicker widget = widget();
    //when
    widget.setShowTime(true);
    //then
    verifyMsgForProperty(groovyKernel, DatePicker.SHOW_TIME, true);
  }

  private DatePicker widget() throws NoSuchAlgorithmException {
    DatePicker widget = new DatePicker();
    groovyKernel.clearPublishedMessages();
    return widget;
  }

}