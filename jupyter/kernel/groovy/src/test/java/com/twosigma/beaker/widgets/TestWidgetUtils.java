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

import com.twosigma.beaker.jupyter.Comm;
import org.lappsgrid.jupyter.msg.Message;
import com.twosigma.beaker.jupyter.msg.JupyterMessages;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import static com.twosigma.beaker.jupyter.msg.JupyterMessages.COMM_OPEN;
import static com.twosigma.beaker.widgets.DisplayWidget.DISPLAY;
import static com.twosigma.beaker.widgets.DisplayWidget.METHOD;
import static org.assertj.core.api.Assertions.assertThat;

public class TestWidgetUtils {

  public static void verifyOpenCommMsg(List<Message> messages, String modelNameValue, String viewNameValue) {
    assertThat(messages.size()).isEqualTo(2);
    Message layout = messages.get(0);
    Message widget = messages.get(1);

    verifyTypeMsg(widget,COMM_OPEN);
    Map data = getData(widget);
    assertThat(data.get(Layout.LAYOUT)).isEqualTo(Layout.IPY_MODEL + layout.getContent().get(Comm.COMM_ID));
    assertThat(data.get(Widget.MODEL_MODULE)).isEqualTo(Widget.MODEL_MODULE_VALUE);
    assertThat(data.get(Widget.VIEW_MODULE)).isEqualTo(Widget.VIEW_MODULE_VALUE);
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


  public static <T> void verifyMsgForProperty(GroovyKernelTest groovyKernel, String propertyName, T expected) {
    Object actual = getValueForProperty(groovyKernel, propertyName, expected.getClass());
    assertThat(actual).isEqualTo(expected);
  }

  public static <T> T getValueForProperty(GroovyKernelTest groovyKernel, String propertyName, Class<T> clazz) {
    assertThat(groovyKernel.getPublishedMessages().size()).isEqualTo(1);
    Message message = groovyKernel.getPublishedMessages().get(0);
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

}
