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
package com.twosigma.beaker.easyform.formitem.widgets;

import com.twosigma.beaker.easyform.EasyFormComponent;
import com.twosigma.beaker.widgets.DatePicker;
import com.twosigma.jupyter.message.Message;
import org.junit.Test;

import static com.twosigma.beaker.widgets.TestWidgetUtils.getValueForProperty;
import static org.assertj.core.api.Assertions.assertThat;

public class DatePickerComponentWidgetTest extends EasyFormWidgetTest {

  @Test
  public void setShowTime() throws Exception {
    //given
    Boolean newValue = Boolean.TRUE;
    DatePickerComponentWidget widget = new DatePickerComponentWidget();
    kernel.clearPublishedMessages();
    //when
    widget.setShowTime(newValue);
    //then
    verifyShowTime(kernel.getPublishedMessages().get(0), true);
  }

  private void verifyShowTime(Message message, Boolean expected) {
    Boolean value = getValueForProperty(message, DatePicker.SHOW_TIME, Boolean.class);
    assertThat(value).isEqualTo(expected);
  }

  @Override
  protected EasyFormComponent createWidget() {
    return new DatePickerComponentWidget();
  }
}