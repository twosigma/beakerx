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

import com.twosigma.beakerx.jupyter.SearchMessages;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widget.BoundedFloatText;
import com.twosigma.beakerx.widget.BoundedIntWidget;
import com.twosigma.beakerx.widget.IntSlider;
import com.twosigma.beakerx.widget.Layout;
import com.twosigma.beakerx.widget.Widget;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.security.NoSuchAlgorithmException;
import java.util.List;

import static com.twosigma.beakerx.widget.TestWidgetUtils.getValueForProperty;
import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyMsgForProperty;
import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyOpenCommMsg;
import static org.assertj.core.api.Assertions.assertThat;

public class IntSliderTest {

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
    new IntSlider();
    //then
    verifyOpenCommMsg(groovyKernel.getPublishedMessages(), IntSlider.MODEL_NAME_VALUE, IntSlider.VIEW_NAME_VALUE);
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
    intSlider.getLayout().setVisibility("hidden");
    //then
    verifyMsgForProperty(groovyKernel, Layout.VISIBILITY, "hidden");
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
    List<Message> messages = SearchMessages
            .getListByDataAttr(groovyKernel.getPublishedMessages(), Comm.METHOD, Comm.UPDATE);
    assertThat(getValueForProperty(messages.get(0), BoundedFloatText.VALUE, Integer.class).equals(10));
    assertThat(getValueForProperty(messages.get(1), BoundedFloatText.MIN, Integer.class).equals(10));
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

  @Test
  public void setOrientation_hasThatOrientation() throws Exception {
    String expected = "test";
    //given
    IntSlider intSlider = intSlider();
    //when
    intSlider.setOrientation(expected);
    //then
    Assertions.assertThat(intSlider.getOrientation()).isEqualTo(expected);
  }

  @Test
  public void setReadout_hasThatReadoutFlag() throws Exception {
    boolean expected = true;
    //given
    IntSlider intSlider = intSlider();
    //when
    intSlider.setReadOut(expected);
    //then
    Assertions.assertThat(intSlider.getReadOut()).isEqualTo(expected);
  }

  @Test
  public void setContinuousUpdate_hasThatContinuousUpdateFlag() throws Exception {
    boolean expected = true;
    //given
    IntSlider intSlider = intSlider();
    //when
    intSlider.setContinuous_update(expected);
    //then
    Assertions.assertThat(intSlider.getContinuous_update()).isEqualTo(expected);
  }

  private IntSlider intSlider() throws NoSuchAlgorithmException {
    IntSlider intSlider = new IntSlider();
    groovyKernel.clearPublishedMessages();
    return intSlider;
  }

}