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

package com.twosigma.beakerx.widget.strings;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.widget.BxHTML;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyInternalOpenCommMsgWitLayout;
import static com.twosigma.beakerx.widget.TestWidgetUtils.verifyMsgForProperty;

public class BxHTMLTest {

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
    new BxHTML();
    //then
    verifyInternalOpenCommMsgWitLayout(
            groovyKernel.getPublishedMessages(),
            BxHTML.MODEL_NAME_VALUE,
            BxHTML.VIEW_NAME_VALUE,
            BxHTML.MODEL_MODULE_VALUE,
            BxHTML.VIEW_MODULE_VALUE);
  }

  @Test
  public void shouldSendCommMsgWhenValueChange() {
    //given
    BxHTML widget = html();
    //when
    widget.setValue("Hello <b>World</b>");
    //then
    verifyMsgForProperty(groovyKernel, BxHTML.VALUE, "Hello <b>World</b>");
  }

  private BxHTML html() {
    BxHTML widget = new BxHTML();
    groovyKernel.clearPublishedMessages();
    return widget;
  }


}