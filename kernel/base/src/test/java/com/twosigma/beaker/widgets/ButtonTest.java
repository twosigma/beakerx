
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
package com.twosigma.beaker.widgets;


import com.twosigma.beaker.KernelTest;
import com.twosigma.beaker.jupyter.KernelManager;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.security.NoSuchAlgorithmException;

import static com.twosigma.beaker.widgets.TestWidgetUtils.verifyMsgForProperty;
import static com.twosigma.beaker.widgets.TestWidgetUtils.verifyOpenCommMsg;

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
    verifyOpenCommMsg(groovyKernel.getPublishedMessages(), Button.MODEL_NAME_VALUE, Button.VIEW_NAME_VALUE);
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

  private Button button() throws NoSuchAlgorithmException {
    Button widget = new Button();
    groovyKernel.clearPublishedMessages();
    return widget;
  }

}