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

import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyMsgForProperty;
import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyOpenCommMsg;

public class SelectionSliderTest {

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
    new SelectionSlider();
    //then
    verifyOpenCommMsg(
        kernel.getPublishedMessages(),
        SelectionSlider.MODEL_NAME_VALUE,
        SelectionSlider.VIEW_NAME_VALUE
    );
  }

  @Test
  public void setOptions_shouldSendCommMessage() throws Exception {
    String expected = "test";
    //given
    SelectionSlider selectionSlider = selectionSlider();
    //when
    selectionSlider.setOptions(expected);
    //then
    verifyMsgForProperty(kernel, SelectionSlider.OPTIONS_LABELS, expected);
  }

  @Test
  public void setSize_hasThatSize() throws Exception {
    int expected = 10;
    //given
    SelectionSlider selectionSlider = selectionSlider();
    //when
    selectionSlider.setSize(expected);
    //then
    Assertions.assertThat(selectionSlider.getSize()).isEqualTo(expected);
  }

  @Test
  public void setOrientation_hasThatOrientation() throws Exception {
    String expected = "test";
    //given
    SelectionSlider selectionSlider = selectionSlider();
    //when
    selectionSlider.setOrientation(expected);
    //then
    Assertions.assertThat(selectionSlider.getOrientation()).isEqualTo(expected);
  }

  @Test
  public void getValueFromObject_returnString() throws Exception {
    //given
    SelectionSlider selectionSlider = selectionSlider();
    //when
    String result = selectionSlider.getValueFromObject(11);
    //then
    Assertions.assertThat(result).isEqualTo("11");
  }

  private SelectionSlider selectionSlider() throws NoSuchAlgorithmException {
    SelectionSlider widget = new SelectionSlider();
    kernel.clearPublishedMessages();
    return widget;
  }

}
