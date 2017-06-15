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

import com.twosigma.beakerx.SerializeToString;
import com.twosigma.beakerx.jupyter.comm.Comm;
import org.junit.Assert;
import org.junit.Test;

import com.twosigma.jupyter.message.Message;

import java.util.Map;

import static com.twosigma.beakerx.jupyter.msg.JupyterMessages.COMM_OPEN;
import static com.twosigma.beakerx.widgets.TestWidgetUtils.getValueForProperty;
import static com.twosigma.beakerx.widgets.Widget.DISPLAY;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;

public class SerializeToStringBeakerxWidgetsTest {

  @Test
  public void shouldSend3MessagesForAllClassesWhichImplementInternalWidgetInterface() throws Exception {
    new BeakerxWidgetTestRunner().test((clazz, groovyKernel) -> {
      //give
      Widget internalWidget = clazz.newInstance();
      //when
      SerializeToString.doit(internalWidget);
      //then
      assertEquals("Should be 3 messages for " + clazz, groovyKernel.getPublishedMessages().size(), 3);
      assertThat(groovyKernel.getPublishedMessages().size()).isEqualTo(3);
      verifyOpenMsg(groovyKernel.getPublishedMessages().get(0), clazz);
      verifyModelMsg(groovyKernel.getPublishedMessages().get(1), clazz);
      verifyDisplayMsg(groovyKernel.getPublishedMessages().get(2), clazz);
    });
  }

  private void verifyOpenMsg(Message message, Class clazz) {
    assertEquals("Type is not equal to COMM_OPEN for  " + clazz, message.getHeader().getType(), COMM_OPEN.getName());
  }

  private void verifyDisplayMsg(Message message, Class clazz) {
    Map data = TestWidgetUtils.getData(message);
    assertEquals("Method is not equal to DISPLAY for  " + clazz, data.get(Comm.METHOD), DISPLAY);
  }

  private void verifyModelMsg(Message message, Class clazz) {
    String model = getValueForProperty(message, BeakerxWidget.MODEL, String.class);
    Assert.assertNotNull("Model should not be null for  " + clazz, model);
  }


}