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
package com.twosigma.beakerx.easyform.formitem.widgets;

import com.twosigma.beakerx.easyform.EasyFormComponent;
import com.twosigma.beakerx.message.Message;
import org.junit.Test;

import static com.twosigma.beakerx.widget.TestWidgetUtils.getValueForProperty;
import static com.twosigma.beakerx.widget.Widget.VALUE;
import static org.assertj.core.api.Assertions.assertThat;

public class TextAreaWidgetTest extends EasyFormWidgetTest {

  @Test
  public void setValue() throws Exception {
    //given
    String newValue = "newValue";
    TextAreaWidget widget = new TextAreaWidget();
    kernel.clearPublishedMessages();
    //when
    widget.setValue(newValue);
    //then
    verifyTextAreaValue(kernel.getPublishedMessages().get(0), newValue);
  }

  private void verifyTextAreaValue(Message message, String expected) {
    String label = getValueForProperty(message, VALUE, String.class);
    assertThat(label).isEqualTo(expected);
  }


  @Test
  public void setWidth() throws Exception {
    //given
    Integer newValue = 11;
    TextAreaWidget widget = new TextAreaWidget();
    kernel.clearPublishedMessages();
    //when
    widget.setWidth(newValue);
    //then
    verifyWidth(kernel.getPublishedMessages().get(0), 11);
  }

  private void verifyWidth(Message message, Integer expected) {
    Integer label = getValueForProperty(message, "width", Integer.class);
    assertThat(label).isEqualTo(expected);
  }

  @Test
  public void setHeight() throws Exception {
    //given
    Integer newValue = 22;
    TextAreaWidget widget = new TextAreaWidget();
    kernel.clearPublishedMessages();
    //when
    widget.setHeight(newValue);
    //then
    verifyHeight(kernel.getPublishedMessages().get(0), 22);
  }

  private void verifyHeight(Message message, Integer expected) {
    Integer label = getValueForProperty(message, "height", Integer.class);
    assertThat(label).isEqualTo(expected);
  }


  @Override
  protected EasyFormComponent createWidget() {
    return new TextAreaWidget();
  }
}