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
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

import static com.twosigma.beakerx.widgets.TestWidgetUtils.verifyInternalOpenCommMsgWitLayout;
import static com.twosigma.beakerx.widgets.TestWidgetUtils.verifyMsgForProperty;

public class SelectMultipleTest {

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
  public void shouldSendCommOpenWhenCreate() throws Exception {
    //given
    //when
    new SelectMultiple();
    //then
    verifyInternalOpenCommMsgWitLayout(kernel.getPublishedMessages(), SelectMultiple.MODEL_NAME_VALUE, SelectMultiple.VIEW_NAME_VALUE);
  }

  @Test
  public void shouldSendCommMsgWhenValueChange() throws Exception {
    //given
    SelectMultiple widget = selectMultiple();
    widget.setOptions(new String[]{"1","2", "3"});
    kernel.clearPublishedMessages();
    //when
    widget.setValue(Arrays.asList("1","2"));
    //then
    verifyMsgForProperty(kernel, SelectMultiple.VALUE,new String[]{"1","2"});
  }

  @Test
  public void shouldSendCommMsgWhenOptionsChange() throws Exception {
    //given
    SelectMultiple widget = selectMultiple();
    //when
    widget.setOptions(new String[]{"1", "2"});
    //then
    verifyMsgForProperty(kernel, SelectMultiple.OPTIONS_LABELS, new String[]{"1", "2"});
  }

  private SelectMultiple selectMultiple() throws NoSuchAlgorithmException {
    SelectMultiple widget = new SelectMultiple();
    kernel.clearPublishedMessages();
    return widget;
  }

}