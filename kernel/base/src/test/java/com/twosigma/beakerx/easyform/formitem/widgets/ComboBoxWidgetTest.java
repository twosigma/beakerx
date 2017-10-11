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

import static com.twosigma.beakerx.widgets.TestWidgetUtils.getValueForProperty;
import static com.twosigma.beakerx.widgets.Widget.VALUE;
import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.assertThat;

import com.twosigma.beakerx.easyform.EasyFormComponent;
import com.twosigma.beakerx.message.Message;
import com.twosigma.beakerx.widgets.selections.ComboBox;
import org.junit.Test;

public class ComboBoxWidgetTest extends EasyFormWidgetTest {

  @Test
  public void setValue() throws Exception {
    //given
    String newValue = "2";
    ComboBoxWidget widget = new ComboBoxWidget();
    widget.setValues(asList("1", "2", "3"));
    kernel.clearPublishedMessages();
    //when
    widget.setValue(newValue);
    //then
    verifyValue(kernel.getPublishedMessages().get(0), newValue);
  }

  private void verifyValue(Message message, String expected) {
    String value = getValueForProperty(message, VALUE, String.class);
    assertThat(value).isEqualTo(expected);
  }

  @Test
  public void setEditable() throws Exception {
    //given
    Boolean newValue = Boolean.TRUE;
    ComboBoxWidget widget = new ComboBoxWidget();
    kernel.clearPublishedMessages();
    //when
    widget.setEditable(newValue);
    //then
    verifyEditable(kernel.getPublishedMessages().get(0), newValue);
  }

  private void verifyEditable(Message message, Boolean expected) {
    Boolean value = getValueForProperty(message, ComboBox.EDITABLE, Boolean.class);
    assertThat(value).isEqualTo(expected);
  }

  @Test
  public void setSize() throws Exception {
    //given
    Integer newValue = 20;
    ComboBoxWidget widget = new ComboBoxWidget();
    kernel.clearPublishedMessages();
    //when
    widget.setSize(newValue);
    //then
    verifySize(kernel.getPublishedMessages().get(0), newValue);
  }

  private void verifySize(Message message, Integer expectedSize) {
    Integer value = getValueForProperty(message, ComboBox.SIZE, Integer.class);
    assertThat(value).isEqualTo(expectedSize);
  }


  @Override
  protected EasyFormComponent createWidget() {
    return new ComboBoxWidget();
  }
}