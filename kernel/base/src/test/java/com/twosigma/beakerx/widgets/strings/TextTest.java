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
package com.twosigma.beakerx.widgets.strings;

import com.twosigma.beakerx.jupyter.SearchMessages;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.message.Message;

import com.twosigma.beakerx.kernel.KernelManager;
import com.twosigma.beakerx.KernelTest;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.List;
import java.util.Map;

import java.security.NoSuchAlgorithmException;

import static com.twosigma.beakerx.kernel.msg.JupyterMessages.COMM_OPEN;
import static com.twosigma.beakerx.widgets.Widget.MODEL_NAME;
import static com.twosigma.beakerx.widgets.Widget.MODEL_MODULE;
import static com.twosigma.beakerx.widgets.Widget.VIEW_NAME;
import static com.twosigma.beakerx.widgets.Widget.VIEW_MODULE;
import static com.twosigma.beakerx.widgets.Layout.LAYOUT;
import static com.twosigma.beakerx.widgets.Layout.IPY_MODEL;
import static com.twosigma.beakerx.widgets.TestWidgetUtils.verifyMsgForProperty;
import static com.twosigma.beakerx.widgets.TestWidgetUtils.verifyTypeMsg;
import static com.twosigma.beakerx.widgets.TestWidgetUtils.getData;
import static org.assertj.core.api.Assertions.assertThat;

public class TextTest {

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
    new Text();
    //then
    verifyTextField(
      groovyKernel.getPublishedMessages(),
      Text.MODEL_NAME_VALUE,
      Text.MODEL_MODULE_VALUE,
      Text.VIEW_NAME_VALUE,
      Text.VIEW_MODULE_VALUE
    );
  }

  @Test
  public void shouldSendCommMsgWhenValueChange() throws Exception {
    //given
    Text widget = text();
    //when
    widget.setValue("1");
    //then
    verifyMsgForProperty(groovyKernel, Text.VALUE, "1");
  }

  private Text text() throws NoSuchAlgorithmException {
    Text widget = new Text();
    groovyKernel.clearPublishedMessages();
    return widget;
  }

  public static void verifyTextField(
    List<Message> messages,
    String modelNameValue,
    String modelModuleValue,
    String viewNameValue,
    String viewModuleValue
  ) {
    Message widget = SearchMessages.getListWidgetsByViewName(messages, viewNameValue).get(0);
    Message layout = SearchMessages.getLayoutForWidget(messages, widget);

    verifyTypeMsg(widget,COMM_OPEN);
    Map data = getData(widget);
    assertThat(data.get(LAYOUT)).isEqualTo(IPY_MODEL + layout.getContent().get(Comm.COMM_ID));
    assertThat(data.get(MODEL_NAME)).isEqualTo(modelNameValue);
    assertThat(data.get(MODEL_MODULE)).isEqualTo(modelModuleValue);
    assertThat(data.get(VIEW_NAME)).isEqualTo(viewNameValue);
    assertThat(data.get(VIEW_MODULE)).isEqualTo(viewModuleValue);
  }
}