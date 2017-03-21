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
package com.twosigma.beaker.easyform.formitem.widgets;

import com.twosigma.beaker.KernelTest;
import com.twosigma.beaker.jupyter.KernelManager;
import com.twosigma.jupyter.message.Message;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static com.twosigma.beaker.widgets.TestWidgetUtils.getValueForProperty;
import static com.twosigma.beaker.widgets.Widget.DESCRIPTION;
import static org.assertj.core.api.Assertions.assertThat;

public class ButtonComponentWidgetTest {

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
  public void setLabel() throws Exception {
    //given
    String label = "newLabel";
    ButtonComponentWidget widget = new ButtonComponentWidget();
    kernel.clearPublishedMessages();
    //when
    widget.setLabel(label);
    //then
    verifyLabel(kernel.getPublishedMessages().get(0), label);
  }

  private void verifyLabel(Message message, String expected) {
    String label = getValueForProperty(message, DESCRIPTION, String.class);
    assertThat(label).isEqualTo(expected);
  }
}