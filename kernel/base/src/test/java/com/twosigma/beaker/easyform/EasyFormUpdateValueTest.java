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
package com.twosigma.beaker.easyform;

import com.twosigma.beaker.KernelTest;
import com.twosigma.beaker.jupyter.KernelManager;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.assertThat;

public class EasyFormUpdateValueTest {

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
  public void shouldUpdateTextField() throws Exception {
    //given
    String label = "text1";
    final StringBuilder result = new StringBuilder();
    EasyForm easyForm = new EasyForm("EasyForm with text field");
    easyForm.addTextField(label).onChange(value -> result.append(value));
    //when
    easyForm.getWidget(label).doUpdateValueWithCallback("new Value");
    //then
    assertThat(result.toString()).isEqualTo("new Value");
  }


  @Test
  public void shouldUpdateRadioButton() throws Exception {
    //given
    String label = "RadioButto1";
    final StringBuilder result = new StringBuilder();
    EasyForm easyForm = new EasyForm("EasyForm with RadioButto");
    easyForm.addRadioButtons(label, asList("1", "2")).onChange(value -> result.append(value));
    //when
    easyForm.getWidget(label).doUpdateValueWithCallback("new Value");
    //then
    assertThat(result.toString()).isEqualTo("new Value");
  }

  @Test
  public void shouldUpdateTextArea() throws Exception {
    //given
    String label = "ButtonLabel1";
    final StringBuilder result = new StringBuilder();
    EasyForm easyForm = new EasyForm("EasyForm with TextArea");
    easyForm.addTextArea(label).onChange(value -> result.append(value));
    //when
    easyForm.getWidget(label).doUpdateValueWithCallback("new TextArea");
    //then
    assertThat(result.toString()).isEqualTo("new TextArea");
  }

  @Test
  public void shouldUpdateButton() throws Exception {
    //given
    String label = "ButtonLabel1";
    final StringBuilder result = new StringBuilder();
    EasyForm easyForm = new EasyForm("EasyForm with button");
    easyForm.addButton(label).onChange(value -> result.append("new Button"));
    //when
    easyForm.getWidget(label).doUpdateValueWithCallback("new Button");
    //then
    assertThat(result.toString()).isEqualTo("new Button");
  }

}