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
import com.twosigma.beakerx.kernel.Utils;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.security.NoSuchAlgorithmException;

import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyInternalOpenCommMsgWitLayout;
import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyMsgForProperty;
import static org.assertj.core.api.Assertions.assertThat;

public class ButtonTest {

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
    new Button();
    //then
    verifyInternalOpenCommMsgWitLayout(
        groovyKernel.getPublishedMessages(),
        Button.MODEL_NAME_VALUE,
        Button.VIEW_NAME_VALUE,
        Widget.MODEL_MODULE_VALUE,
        Widget.VIEW_MODULE_VALUE);
  }

  @Test
  public void noTooltipAsDefault() throws Exception {
    //given
    //when
    Button widget = button();
        //then
    assertThat(widget.getTooltip()).isEqualTo(Utils.EMPTY_STRING);
  }

  @Test
  public void shouldSendCommMsgWhenTooltipChange() throws Exception {
    //given
    Button widget = button();
    //when
    widget.setTooltip("Tooltip 2");
    //then
    verifyMsgForProperty(groovyKernel, Button.TOOLTIP, "Tooltip 2");
  }

  @Test
  public void shouldSendCommMsgWhenTagChange() throws Exception {
    //given
    Button widget = button();
    //when
    widget.setTag("Tag2");
    //then
    verifyMsgForProperty(groovyKernel, Button.TAG, "Tag2");
  }

  @Test
  public void setButtonStyle_hasThatButtonStyle() throws Exception {
    String expected = "test";
    //given
    Button button = button();
    //when
    button.setButton_style(expected);
    //then
    assertThat(button.getButton_style()).isEqualTo(expected);
  }

  @Test
  public void setTooltip_hasThatTooltip() throws Exception {
    String expected = "test";
    //given
    Button button = button();
    //when
    button.setTooltip(expected);
    //then
    assertThat(button.getTooltip()).isEqualTo(expected);
  }

  private Button button() throws NoSuchAlgorithmException {
    Button widget = new Button();
    groovyKernel.clearPublishedMessages();
    return widget;
  }

}
