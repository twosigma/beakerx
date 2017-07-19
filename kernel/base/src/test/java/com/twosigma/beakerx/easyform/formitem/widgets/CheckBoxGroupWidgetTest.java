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
import com.twosigma.beakerx.widgets.strings.Label;
import com.twosigma.beakerx.message.Message;
import org.assertj.core.api.Assertions;
import org.junit.Test;

import java.util.Arrays;
import java.util.List;

import static com.twosigma.beakerx.widgets.TestWidgetUtils.getValueForProperty;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertTrue;

public class CheckBoxGroupWidgetTest extends EasyFormWidgetTest {

  public static final List<Object> EMPTY = Arrays.asList();

  @Test
  public void setValues() throws Exception {
    //given
    List<String> newValue = Arrays.asList("1", "2", "3");
    CheckBoxGroupWidget widget = new CheckBoxGroupWidget();
    kernel.clearPublishedMessages();
    //when
    widget.setValues(newValue);
    //then
    assertTrue("Comm msgs should be 9", kernel.getPublishedMessages().size() == 9);
    Assertions.assertThat(widget.getValue()).isEqualTo(EMPTY);
  }

  @Override
  protected EasyFormComponent createWidget() {
    return new CheckBoxGroupWidget();
  }

  @Override
  protected void verifyLabel(Message message, String expected) {
    String label = getValueForProperty(message, Label.VALUE, String.class);
    assertThat(label).isEqualTo(expected);
  }

}