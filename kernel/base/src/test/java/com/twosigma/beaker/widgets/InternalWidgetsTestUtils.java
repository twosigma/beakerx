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

import com.twosigma.beaker.widgets.internal.InternalWidgetUtils;
import com.twosigma.jupyter.message.Message;

import java.util.List;
import java.util.Map;

import static com.twosigma.beaker.jupyter.msg.JupyterMessages.COMM_OPEN;
import static org.assertj.core.api.Assertions.assertThat;

public class InternalWidgetsTestUtils {

  public static void verifyOpenCommMsgInternalWidgets(List<Message> messages, String modelNameValue, String viewNameValue) {
    assertThat(messages.size()).isEqualTo(1);
    Message widget = messages.get(0);

    assertThat(widget.getHeader().getType()).isEqualTo(COMM_OPEN.getName());
    Map data = TestWidgetUtils.getData(widget);
    assertThat(data.get(Widget.MODEL_MODULE)).isEqualTo(InternalWidgetUtils.MODEL_MODULE_VALUE);
    assertThat(data.get(Widget.VIEW_MODULE)).isEqualTo(InternalWidgetUtils.VIEW_MODULE_VALUE);
    assertThat(data.get(Widget.MODEL_NAME)).isEqualTo(modelNameValue);
    assertThat(data.get(Widget.VIEW_NAME)).isEqualTo(viewNameValue);
  }


}
