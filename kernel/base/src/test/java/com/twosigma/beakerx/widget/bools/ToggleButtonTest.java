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
package com.twosigma.beakerx.widget.bools;

import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.KernelTest;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.security.NoSuchAlgorithmException;

import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyMsgForProperty;
import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyOpenCommMsg;

public class ToggleButtonTest {

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
    new ToggleButton();
    //then
    verifyOpenCommMsg(groovyKernel.getPublishedMessages(), ToggleButton.MODEL_NAME_VALUE, ToggleButton.VIEW_NAME_VALUE);
  }

  @Test
  public void shouldSendCommMsgWhenValueChange() throws Exception {
    //given
    ToggleButton widget = toggleButton();
    //when
    widget.setValue(true);
    //then
    verifyMsgForProperty(groovyKernel, ToggleButton.VALUE, true);
  }

  @Test
  public void shouldSendCommMsgWhenTooltipChange() throws Exception {
    //given
    ToggleButton widget = toggleButton();
    //when
    widget.setTooltip("Tooltip 2");
    //then
    verifyMsgForProperty(groovyKernel, ToggleButton.TOOLTIP, "Tooltip 2");
  }

  @Test
  public void setButtonStyle_hasThatButtonStyle() throws Exception {
    String expected = "test";
    //given
    ToggleButton toggleButton = toggleButton();
    //when
    toggleButton.setButton_style(expected);
    //then
    Assertions.assertThat(toggleButton.getButton_style()).isEqualTo(expected);
  }

  @Test
  public void setIcon_hasThatIcon() throws Exception {
    String expected = "test";
    //given
    ToggleButton toggleButton = toggleButton();
    //when
    toggleButton.setIcon(expected);
    //then
    Assertions.assertThat(toggleButton.getIcon()).isEqualTo(expected);
  }

  @Test
  public void setTooltip_hasThatTooltip() throws Exception {
    String expected = "test";
    //given
    ToggleButton toggleButton = toggleButton();
    //when
    toggleButton.setTooltip(expected);
    //then
    Assertions.assertThat(toggleButton.getTooltip()).isEqualTo(expected);
  }

  private ToggleButton toggleButton() throws NoSuchAlgorithmException {
    ToggleButton widget = new ToggleButton();
    groovyKernel.clearPublishedMessages();
    return widget;
  }
}