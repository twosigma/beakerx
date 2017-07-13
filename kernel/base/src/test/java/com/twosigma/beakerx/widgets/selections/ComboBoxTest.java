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
package com.twosigma.beakerx.widgets.selections;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.kernel.KernelManager;
import org.assertj.core.api.Assertions;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.security.NoSuchAlgorithmException;

import static com.twosigma.beakerx.widgets.TestWidgetUtils.verifyInternalOpenCommMsgWitLayout;
import static com.twosigma.beakerx.widgets.TestWidgetUtils.verifyMsgForProperty;

public class ComboBoxTest {

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
  public void createWithBooleanParam_shouldSendCommOpenMessage() throws Exception {
    //given
    //when
    new ComboBox(true);
    //then
    verifyInternalOpenCommMsgWitLayout(
        kernel.getPublishedMessages(),
        ComboBox.MODEL_NAME_VALUE,
        ComboBox.VIEW_NAME_VALUE
    );
  }

  @Test
  public void createWithEmptyConstructor_shouldSendCommOpenMessage() throws Exception {
    //given
    //when
    new ComboBox();
    //then
    verifyInternalOpenCommMsgWitLayout(
        kernel.getPublishedMessages(),
        ComboBox.MODEL_NAME_VALUE,
        ComboBox.VIEW_NAME_VALUE
    );
  }

  @Test
  public void updateValue_shouldSendCommMessage() throws Exception {
    String expected = "test";
    //given
    ComboBox comboBox = comboBox();
    //when
    comboBox.updateValue(expected);
    //then
    verifyMsgForProperty(kernel, ComboBox.VALUE, expected);
  }

  @Test
  public void setEditable_hasThatEditableFlag() throws Exception {
    boolean expected = true;
    //given
    ComboBox comboBox = comboBox();
    //when
    comboBox.setEditable(expected);
    //then
    Assertions.assertThat(comboBox.getEditable()).isEqualTo(expected);
  }

  @Test
  public void setSize_hasThatSize() throws Exception {
    int expected = 10;
    //given
    ComboBox comboBox = comboBox();
    //when
    comboBox.setSize(expected);
    //then
    Assertions.assertThat(comboBox.getSize()).isEqualTo(expected);
  }

  private ComboBox comboBox() throws NoSuchAlgorithmException {
    ComboBox widget = new ComboBox();
    kernel.clearPublishedMessages();
    return widget;
  }

}
