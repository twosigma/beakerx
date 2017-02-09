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
package com.twosigma.beaker.widgets.integers;

import com.twosigma.beaker.jupyter.GroovyKernelManager;
import com.twosigma.beaker.widgets.GroovyKernelTest;
import com.twosigma.beaker.widgets.Widget;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.security.NoSuchAlgorithmException;

import static com.twosigma.beaker.widgets.TestWidgetUtils.verifyMsgForProperty;
import static com.twosigma.beaker.widgets.TestWidgetUtils.verifyOpenCommMsg;

public class IntSliderTest {

  private GroovyKernelTest groovyKernel;

  @Before
  public void setUp() throws Exception {
    groovyKernel = new GroovyKernelTest();
    GroovyKernelManager.register(groovyKernel);
  }

  @After
  public void tearDown() throws Exception {
    GroovyKernelManager.register(null);
  }

  @Test
  public void shouldSendCommOpenWhenCreate() throws Exception {
    //given
    //when
    new IntSlider();
    //then
    verifyOpenCommMsg(groovyKernel.getMessages(), IntSlider.MODEL_NAME_VALUE, IntSlider.VIEW_NAME_VALUE);
  }

  @Test
  public void shouldSendCommMsgWhenValueChange() throws Exception {
    //given
    IntSlider intSlider = intSlider();
    //when
    intSlider.setValue(11);
    //then
    verifyMsgForProperty(groovyKernel, IntSlider.VALUE, 11);
  }

  @Test
  public void shouldSendCommMsgWhenDisableChange() throws Exception {
    //given
    IntSlider intSlider = intSlider();
    //when
    intSlider.setDisabled(true);
    //then
    verifyMsgForProperty(groovyKernel, Widget.DISABLED, true);
  }

  @Test
  public void shouldSendCommMsgWhenVisibleChange() throws Exception {
    //given
    IntSlider intSlider = intSlider();
    //when
    intSlider.setVisible(false);
    //then
    verifyMsgForProperty(groovyKernel, Widget.VISIBLE, false);
  }

  @Test
  public void shouldSendCommMsgWhenDescriptionChange() throws Exception {
    //given
    IntSlider intSlider = intSlider();
    //when
    intSlider.setDescription("Description 2");
    //then
    verifyMsgForProperty(groovyKernel, Widget.DESCRIPTION, "Description 2");
  }

  @Test
  public void shouldSendCommMsgWhenMsg_throttleChange() throws Exception {
    //given
    IntSlider intSlider = intSlider();
    //when
    intSlider.setMsg_throttle(12);
    //then
    verifyMsgForProperty(groovyKernel, Widget.MSG_THROTTLE, 12);
  }

  @Test
  public void shouldSendCommMsgWhenStepChange() throws Exception {
    //given
    IntSlider intSlider = intSlider();
    //when
    intSlider.setStep(12);
    //then
    verifyMsgForProperty(groovyKernel, BoundedIntWidget.STEP, 12);
  }

  @Test
  public void shouldSendCommMsgWhenMaxChange() throws Exception {
    //given
    IntSlider intSlider = intSlider();
    //when
    intSlider.setMax(122);
    //then
    verifyMsgForProperty(groovyKernel, BoundedIntWidget.MAX, 122);
  }

  @Test
  public void shouldSendCommMsgWhenMinChange() throws Exception {
    //given
    IntSlider intSlider = intSlider();
    //when
    intSlider.setMin(10);
    //then
    verifyMsgForProperty(groovyKernel, BoundedIntWidget.MIN, 10);
  }

  @Test
  public void shouldSendCommMsgWhenOrientationChange() throws Exception {
    //given
    IntSlider intSlider = intSlider();
    //when
    intSlider.setOrientation("vertical");
    //then
    verifyMsgForProperty(groovyKernel, IntSlider.ORIENTATION, "vertical");
  }

  @Test
  public void shouldSendCommMsgWhenSliderColorChange() throws Exception {
    //given
    IntSlider intSlider = intSlider();
    //when
    intSlider.setSlider_color("#456789");
    //then
    verifyMsgForProperty(groovyKernel, IntSlider.SLIDER_COLOR, "#456789");
  }

  @Test
  public void shouldSendCommMsgWhenReadOutChange() throws Exception {
    //given
    IntSlider intSlider = intSlider();
    //when
    intSlider.setReadOut(false);
    //then
    verifyMsgForProperty(groovyKernel, IntSlider.READOUT, false);
  }

  @Test
  public void shouldSendCommMsgWhenChangeContinuous_update() throws Exception {
    //given
    IntSlider intSlider = intSlider();
    //when
    intSlider.setContinuous_update(false);
    //then
    verifyMsgForProperty(groovyKernel, IntSlider.CONTINUOUS_UPDATE, false);
  }

  private IntSlider intSlider() throws NoSuchAlgorithmException {
    IntSlider intSlider = new IntSlider();
    groovyKernel.clearMessages();
    return intSlider;
  }

}