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
package com.twosigma.beakerx.widgets;

import static com.twosigma.beakerx.kernel.msg.JupyterMessages.COMM_OPEN;
import static com.twosigma.beakerx.widgets.Widget.DISPLAY;
import static com.twosigma.beakerx.widgets.Widget.METHOD;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertTrue;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.jupyter.SearchMessages;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.message.Message;
import java.io.Serializable;
import java.util.List;
import java.util.Map;

public class TestWidgetUtils {

  public static void verifyOpenCommMsg(List<Message> messages, String modelNameValue,
      String viewNameValue) {
    verifyInternalOpenCommMsgWitLayout(messages, modelNameValue, viewNameValue,
        Widget.MODEL_MODULE_VALUE,
        Widget.VIEW_MODULE_VALUE);
  }

  public static void verifyOpenCommMsgWitoutLayout(List<Message> messages, String modelNameValue,
      String viewNameValue) {
    Message message = SearchMessages.getListWidgetsByViewName(messages, viewNameValue).get(0);
    verifyTypeMsg(message, COMM_OPEN);
    Map data = getData(message);
    assertThat(data.get(Widget.MODEL_NAME)).isEqualTo(modelNameValue);
    assertThat(data.get(Widget.VIEW_NAME)).isEqualTo(viewNameValue);
  }

  public static void verifyInternalOpenCommMsg(Message message, String modelNameValue,
      String viewNameValue) {
    verifyTypeMsg(message, COMM_OPEN);
    Map data = getData(message);
    assertThat(data.get(Widget.MODEL_MODULE)).isEqualTo(BeakerxWidget.MODEL_MODULE_VALUE);
    assertThat(data.get(Widget.VIEW_MODULE)).isEqualTo(BeakerxWidget.VIEW_MODULE_VALUE);
    assertThat(data.get(Widget.MODEL_NAME)).isEqualTo(modelNameValue);
    assertThat(data.get(Widget.VIEW_NAME)).isEqualTo(viewNameValue);
  }

  public static void verifyInternalOpenCommMsgWitLayout(List<Message> messages,
      String modelNameValue, String viewNameValue) {
    verifyInternalOpenCommMsgWitLayout(messages, modelNameValue, viewNameValue,
        BeakerxWidget.MODEL_MODULE_VALUE, BeakerxWidget.VIEW_MODULE_VALUE);
  }

  public static void verifyInternalOpenCommMsgWitLayout(List<Message> messages,
      String modelNameValue, String viewNameValue, String modelModule, String viewModule) {
    Message widget = SearchMessages.getListWidgetsByViewName(messages, viewNameValue).get(0);
    Message layout = SearchMessages.getLayoutForWidget(messages, widget);

    verifyTypeMsg(widget, COMM_OPEN);
    Map data = getData(widget);
    assertThat(data.get(Layout.LAYOUT))
        .isEqualTo(Layout.IPY_MODEL + layout.getContent().get(Comm.COMM_ID));
    assertThat(data.get(Widget.MODEL_MODULE)).isEqualTo(modelModule);
    assertThat(data.get(Widget.VIEW_MODULE)).isEqualTo(viewModule);
    assertThat(data.get(Widget.MODEL_NAME)).isEqualTo(modelNameValue);
    assertThat(data.get(Widget.VIEW_NAME)).isEqualTo(viewNameValue);
  }

  public static void verifyTypeMsg(Message widget, JupyterMessages jupyterMessages) {
    assertThat(widget.getHeader().getType()).isEqualTo(jupyterMessages.getName());
  }

  @SuppressWarnings("unchecked")
  public static Map getData(Message message) {
    Map<String, Serializable> content = getContent(message);
    return (Map) content.get(Comm.DATA);
  }

  public static Map getContent(Message message) {
    return message.getContent();
  }

  public static <T> void verifyMsgForProperty(KernelTest kernel, String propertyName, T expected) {
    Object actual = getValueForProperty(kernel, propertyName, expected.getClass());
    assertThat(actual).isEqualTo(expected);
  }

  public static <T> T getValueForProperty(KernelTest kernel, String propertyName, Class<T> clazz) {
    assertThat(kernel.getPublishedMessages().size()).isEqualTo(1);
    Message message = kernel.getPublishedMessages().get(0);
    return getValueForProperty(message, propertyName, clazz);
  }

  public static <T> T getValueForProperty(Message message, String propertyName, Class<T> clazz) {
    Map data = TestWidgetUtils.getData(message);
    assertThat(data.get(Comm.METHOD)).isEqualTo(Comm.UPDATE);
    Object o = ((Map) data.get(Comm.STATE)).get(propertyName);
    return clazz.cast(o);
  }

  public static void verifyDisplayMsg(Message message) {
    Map data = getData(message);
    assertThat(data.get(METHOD)).isEqualTo(DISPLAY);
  }

  public static void verifyDisplayMsg(List<Message> messages) {
    List<Message> result = SearchMessages.getListByDataAttr(messages, METHOD, DISPLAY);
    assertThat(result.size()).isGreaterThan(0);
    assertThat(result.get(0)).isNotNull();
  }

  public static <T> T findValueForProperty(KernelTest kernel, String propertyName, Class<T> clazz) {
    List<Message> messages = SearchMessages
        .getListByDataAttr(kernel.getPublishedMessages(), Comm.METHOD, Comm.UPDATE);
    assertTrue("No update comm message.", messages.size() > 0);
    return getValueForProperty(messages.get(0), propertyName, clazz);
  }

}
