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
import com.twosigma.beakerx.widget.ValueWidget;
import com.twosigma.beakerx.widget.Widget;
import com.twosigma.beakerx.widget.bools.BoolWidget;
import com.twosigma.beakerx.widget.box.Box;
import com.twosigma.beakerx.widget.box.HBox;
import com.twosigma.beakerx.widget.box.VBox;
import com.twosigma.beakerx.widget.strings.Label;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Arrays.asList;

public class CheckBoxGroupWidget extends EasyFormComponent<Box> {

  private List<CheckBoxWidget> checkboxes = new ArrayList<>();
  private Label label = new Label();
  private boolean horizontal;

  public CheckBoxGroupWidget(Collection<String> values) {
    this(values,false);
  }

  public CheckBoxGroupWidget(Collection<String> values, boolean horizontal) {
    super();
    this.horizontal = horizontal;
    createWidget(values);
  }

  public Boolean getHorizontal() {
    return horizontal;
  }

  public void setHorizontal(final Boolean horizontal) {
    this.horizontal = horizontal;
  }

  @Override
  public List<String> formatValue(final Object value) {
    List<String> result = new ArrayList<>();
    if (value instanceof Object[]) {
      result = Arrays.stream((Object[]) value).map(i -> (String) i).collect(Collectors.toList());
    } else if (value instanceof List) {
      result = (List<String>) value;
    }
    return result;
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
  public Object getValue() {
    return new ArrayList<>(getValues());
  }

  private Collection<String> getValues() {
    return this.checkboxes.stream().map(EasyFormComponent::getWidget).filter(BoolWidget::getValue).map(ValueWidget::getDescription).collect(Collectors.toList());
  }

  @Override
  public void setValue(Object value) {
    List<String> descList = (ArrayList<String>) value;
    checkboxes.stream()
            .map(c -> c.getWidget())
            .forEach(w -> w.setValue(descList.contains(w.getDescription())));
  }

  public void setValues(Collection<String> values) {
    values.forEach(item -> {
      CheckBoxWidget checkbox = new CheckBoxWidget(item);
      checkboxes.add(checkbox);
    });
  }

  private void createWidget(Collection<String> values) {
    setValues(values);
    List<Widget> comms = checkboxes.stream().map(EasyFormComponent::getWidget).collect(Collectors.toList());
    Box rightSide = (getHorizontal()) ? new HBox(comms) : new VBox(comms);
    this.widget = new HBox(asList(label, rightSide));
  }

  @Override
  protected boolean checkValue(Object value) {
    return value instanceof Object[] || value instanceof List;
  }

}