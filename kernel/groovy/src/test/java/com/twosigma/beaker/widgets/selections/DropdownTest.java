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
package com.twosigma.beaker.widgets.selections;

import com.twosigma.beaker.jupyter.KernelManager;
import com.twosigma.beaker.widgets.GroovyKernelTest;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.security.NoSuchAlgorithmException;

import static com.twosigma.beaker.widgets.TestWidgetUtils.verifyMsgForProperty;
import static com.twosigma.beaker.widgets.TestWidgetUtils.verifyOpenCommMsg;

public class DropdownTest {

  private GroovyKernelTest groovyKernel;

  @Before
  public void setUp() throws Exception {
    groovyKernel = new GroovyKernelTest();
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
    new Dropdown();
    //then
    verifyOpenCommMsg(groovyKernel.getPublishedMessages(), Dropdown.MODEL_NAME_VALUE, Dropdown.VIEW_NAME_VALUE);
  }

  @Test
  public void shouldSendCommMsgWhenValueChange() throws Exception {
    //given
    Dropdown dropdown = dropdown();
    //when
    dropdown.setValue("1");
    //then
    verifyMsgForProperty(groovyKernel, Dropdown.VALUE, "1");
  }

  @Test
  public void shouldSendCommMsgWhenOptionsChange() throws Exception {
    //given
    Dropdown dropdown = dropdown();
    //when
    dropdown.setOptions(new String[]{"2", "3"});
    //then
    verifyMsgForProperty(groovyKernel, Dropdown.OPTIONS_LABELS, new String[]{"2", "3"});
  }

  private Dropdown dropdown() throws NoSuchAlgorithmException {
    Dropdown widget = new Dropdown();
    groovyKernel.clearPublishedMessages();
    return widget;
  }


}