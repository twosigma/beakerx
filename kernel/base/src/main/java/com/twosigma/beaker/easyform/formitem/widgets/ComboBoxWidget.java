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

import com.twosigma.beaker.easyform.formitem.ComboBox;
import com.twosigma.beaker.jupyter.Comm;
import com.twosigma.beaker.widgets.CommFunctionality;
import com.twosigma.beaker.widgets.selections.Dropdown;

import java.util.Collection;

public class ComboBoxWidget extends ComboBox implements CommFunctionality {

  private Dropdown widget;

  public ComboBoxWidget() {
    this.widget = new Dropdown();
  }

  @Override
  public String getLabel() {
    return this.widget.getDescription();
  }

  @Override
  public Comm getComm() {
    return widget.getComm();
  }

  @Override
  public void setLabel(String label) {
    this.widget.setDescription(label);
  }

  @Override
  public void setValues(Collection<String> values) {
    super.setValues(values);
    this.widget.setOptions(values.stream().toArray(String[]::new));
  }

  @Override
  public void setEditable(Boolean editable) {
    super.setEditable(editable);
    this.widget.setDisabled(editable);
  }

  @Override
  public void setValue(String value) {
    this.widget.setValue(value);
  }

  @Override
  public String getValue() {
    return this.widget.getValue();
  }
}
