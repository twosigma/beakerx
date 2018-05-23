
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
package com.twosigma.beakerx.easyform;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.kernel.KernelManager;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.security.NoSuchAlgorithmException;

import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyInternalOpenCommMsgWitLayout;
import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyMsgForProperty;
import static java.util.Arrays.asList;

public class EasyFormViewTest {

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
    new EasyFormView(asList());
    //then
    verifyInternalOpenCommMsgWitLayout(groovyKernel.getPublishedMessages(), EasyFormView.MODEL_NAME_VALUE, EasyFormView.VIEW_NAME_VALUE);
  }

  @Test
  public void shouldSendCommMsgWhenEasyFormNameChange() throws Exception {
    //given
    EasyFormView widget = easyForm();
    //when
    widget.setEasyFormName("title2");
    //then
    verifyMsgForProperty(groovyKernel, EasyFormView.EASY_FORM_NAME, "title2");
  }

  private EasyFormView easyForm() throws NoSuchAlgorithmException {
    EasyFormView widget = new EasyFormView(asList());
    groovyKernel.clearPublishedMessages();
    return widget;
  }


}