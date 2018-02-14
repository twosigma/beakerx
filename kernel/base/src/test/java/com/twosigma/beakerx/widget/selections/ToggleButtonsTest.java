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
package com.twosigma.beakerx.widget.selections;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.kernel.KernelManager;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.security.NoSuchAlgorithmException;

import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyOpenCommMsg;

public class ToggleButtonsTest {

  private KernelTest kernel;

  @Before
  public void setUp() throws Exception {
    kernel = new KernelTest();
    KernelManager.register(kernel);
  }

  @After
  public void tearDown() throws Exception {
    KernelManager.register(null);
  }

  @Test
  public void createSelectionSlider_shouldSendCommOpenMessage() throws Exception {
    //given
    //when
    new ToggleButtons();
    //then
    verifyOpenCommMsg(
        kernel.getPublishedMessages(),
        ToggleButtons.MODEL_NAME_VALUE,
        ToggleButtons.VIEW_NAME_VALUE
    );
  }

  @Test
  public void setButtonStyle_hasThatButtonStyle() throws Exception {
    String expected = "test";
    //given
    ToggleButtons toggleButtons = toggleButtons();
    //when
    toggleButtons.setButton_style(expected);
    //then
    Assertions.assertThat(toggleButtons.getButton_style()).isEqualTo(expected);
  }

  @Test
  public void setTooltips_hasThatTooltips() throws Exception {
    String[] expected = new String[]{"test1", "test2"};
    //given
    ToggleButtons toggleButtons = toggleButtons();
    //when
    toggleButtons.setTooltips(expected);
    //then
    Assertions.assertThat(toggleButtons.getTooltips()).isEqualTo(expected);
  }

  @Test
  public void setIcons_hasThatIcons() throws Exception {
    String[] expected = new String[]{"icon1", "icon2"};
    //given
    ToggleButtons toggleButtons = toggleButtons();
    //when
    toggleButtons.setIcons(expected);
    //then
    Assertions.assertThat(toggleButtons.getIcons()).isEqualTo(expected);
  }

  private  ToggleButtons toggleButtons() throws NoSuchAlgorithmException {
    ToggleButtons widget = new  ToggleButtons();
    kernel.clearPublishedMessages();
    return widget;
  }

}
