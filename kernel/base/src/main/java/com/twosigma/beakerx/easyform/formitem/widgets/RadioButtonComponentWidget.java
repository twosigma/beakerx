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
import com.twosigma.beakerx.widgets.ValueWidget;
import com.twosigma.beakerx.widgets.selections.RadioButtons;
import com.twosigma.beakerx.widgets.box.HBox;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.stream.Collectors;

public class RadioButtonComponentWidget extends EasyFormComponent<ValueWidget<?>> {

  private RadioButtons radioButtons;
  private Boolean horizontal;

  public RadioButtonComponentWidget() {
    this.radioButtons = new RadioButtons();
  }

  public void setHorizontal(final Boolean horizontal) {
    this.horizontal = horizontal;
  }

  public Boolean getHorizontal() {
    return horizontal;
  }
  
  @Override
  public String getLabel() {
    return radioButtons.getDescription();
  }

  @Override
  public void setLabel(String label) {
    radioButtons.setDescription(label);
  }

  @Override
  public String getValue() {
    return radioButtons.getValue();
  }

  @Override
  public void setValue(String value) {
    radioButtons.setValue(value);
  }

  public void setValues(Collection<String> values) {
    this.radioButtons.setOptions(values.toArray(new String[0]));
  }

  public Collection<String> getValues() {
    return Arrays.stream(radioButtons.getOptions()).collect(Collectors.toList());
  }

  @Override
  public ValueWidget<?> getWidget() {
    if (getHorizontal()) {
      return new HBox(Collections.singletonList(this.radioButtons));
    } else {
      return this.radioButtons;
    }
  }
 

}