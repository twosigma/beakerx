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
import com.twosigma.beakerx.widgets.Widget;
import com.twosigma.beakerx.widgets.bools.BoolWidget;
import com.twosigma.beakerx.widgets.bools.Checkbox;
import com.twosigma.beakerx.widgets.box.Box;
import com.twosigma.beakerx.widgets.box.HBox;
import com.twosigma.beakerx.widgets.box.VBox;
import com.twosigma.beakerx.widgets.strings.Label;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Arrays.asList;

public class CheckBoxGroupWidget extends EasyFormComponent<Box> {

  private List<Checkbox> checkboxes;
  private Label label;
  private Boolean horizontal;

  public CheckBoxGroupWidget() {
    this.checkboxes = new ArrayList<>();
    this.label = new Label();
  }
  
  public Boolean getHorizontal() {
    return horizontal;
  }

  public void setHorizontal(final Boolean horizontal) {
    this.horizontal = horizontal;
  }
  
  @Override
  public String getLabel() {
    return this.label.getValue();
  }

  @Override
  public void setLabel(String label) {
    this.label.setValue(label);
  }

  @Override
  public String getValue() {
    return String.join(",", getValues());
  }

  @Override
  public void setValue(String value) {
  }

  public Collection<String> getValues() {
    return this.checkboxes.stream().filter(BoolWidget::getValue).map(ValueWidget::getDescription).collect(Collectors.toList());
  }

  public void setValues(Collection<String> values) {
    values.forEach(item -> {
      Checkbox checkbox = new Checkbox();
      checkbox.setDescription(item);
      checkboxes.add(checkbox);
    });
  }

  public void createWidget() {
    List<Widget> comms = checkboxes.stream().map(x -> (Widget) x).collect(Collectors.toList());
    Box rightSide = (getHorizontal()) ? new HBox(comms) : new VBox(comms);
    this.widget = new HBox(asList(label, rightSide));
  }


}