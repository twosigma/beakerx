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
package com.twosigma.beakerx.widget;

import com.twosigma.beakerx.KernelTest;
import com.twosigma.beakerx.jupyter.SearchMessages;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.kernel.msg.JupyterMessages;
import com.twosigma.beakerx.message.Message;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.twosigma.beakerx.kernel.msg.JupyterMessages.COMM_OPEN;
import static com.twosigma.beakerx.widget.Widget.DISPLAY;
import static com.twosigma.beakerx.widget.Widget.METHOD;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertTrue;

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
    Map data = getState(message);
    assertThat(data.get(Widget.MODEL_NAME)).isEqualTo(modelNameValue);
    assertThat(data.get(Widget.VIEW_NAME)).isEqualTo(viewNameValue);
  }

  public static void verifyInternalOpenCommMsg(Message message, String modelNameValue,
                                               String viewNameValue) {
    verifyTypeMsg(message, COMM_OPEN);
    Map data = getState(message);
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
    Map data = getState(widget);
    assertThat(data.get(Layout.LAYOUT))
            .isEqualTo(Layout.IPY_MODEL + layout.getContent().get(Comm.COMM_ID));
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

  public static Map getState(Message message) {
    Map<String, Serializable> content = getContent(message);
    Serializable data = content.getOrDefault(Comm.DATA, null);
    if (null != data) {
      return (Map) ((Map) data).getOrDefault(Comm.STATE, null);
    }
    return new HashMap();
  }

  public static Map getContent(Message message) {
    return message.getContent();
  }

  public static <T> void verifyMsgForProperty(KernelTest kernel, String propertyName, T expected) {
    Object actual = getValueForProperty(kernel, propertyName, expected.getClass());
    assertThat(actual).isEqualTo(expected);
  }

  public static <T> T getValueForProperty(KernelTest kernel, String propertyName, Class<T> clazz) {
    Message message = kernel.getPublishedMessages().get(0);
    return getValueForProperty(message, propertyName, clazz);
  }

  public static <T> T getValueForProperty(Message message, String propertyName, Class<T> clazz) {
    Map data = TestWidgetUtils.getState(message);
    assertThat(getMethod(message)).isEqualTo(Comm.UPDATE);
    Object o = data.get(propertyName);
    return clazz.cast(o);
  }

  public static void verifyDisplayMsg(Message message) {
    assertThat(getMethod(message)).isEqualTo(DISPLAY);
  }

  public static void verifyDisplayMsg(List<Message> messages) {
    List<Message> result = SearchMessages.getListByDataAttr(messages, METHOD, DISPLAY);
    assertThat(result.size()).isGreaterThan(0);
    assertThat(result.get(0)).isNotNull();
  }

  public static <T> T findValueForProperty(KernelTest kernel, String propertyName, Class<T> clazz) {
    List<Message> messages = SearchMessages
            .getListByDataAttr(kernel.getPublishedMessages(), Comm.METHOD, Comm.UPDATE);
    messages = messages.stream().filter(x -> getState(x).containsKey(propertyName)).collect(Collectors.toList());
    assertTrue("No update comm message.", messages.size() > 0);
    return getValueForProperty(messages.get(0), propertyName, clazz);
  }

  public static Optional<Message> getMessageUpdate(KernelTest kernel) {
    return getMessageUpdate(kernel.getPublishedMessages());
  }

  public static Optional<Message> getMessageUpdate(List<Message> messages) {
    List<Message> list = SearchMessages
            .getListByDataAttr(messages, Comm.METHOD, Comm.UPDATE);
    assertTrue("No update comm message.", list.size() > 0);
    return list.stream().filter(x -> x.getHeader().getType().equals(JupyterMessages.COMM_MSG.getName())).findFirst();
  }


  public static String getMethod(Message message) {
    return (String) ((Map) (message.getContent().get(Comm.DATA))).get(Comm.METHOD);
  }

  public static List<Message> getOpenMessages(List<Message> messages) {
    return SearchMessages.getListMessagesByType(messages, JupyterMessages.COMM_OPEN);
  }

  public static List<Message> stateContains(List<Message> messages, String attribute, String text) {
    List<Message> result = messages.stream()
            .filter(message -> {
              Map state = TestWidgetUtils.getState(message);
              if (state != null) {
                Object expected = state.get(attribute);
                if (expected != null && expected instanceof String) {
                  return ((String) expected).contains(text);
                }
              }
              return false;
            })
            .collect(Collectors.toList());
    return result;
  }
}
