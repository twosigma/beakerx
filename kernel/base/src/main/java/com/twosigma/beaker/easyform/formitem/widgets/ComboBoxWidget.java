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

import com.twosigma.beaker.easyform.formitem.ComboBoxComponent;
import com.twosigma.beaker.jupyter.comm.Comm;
import com.twosigma.beaker.widgets.CommFunctionality;
import com.twosigma.beaker.widgets.DOMWidget;
import com.twosigma.beaker.widgets.selections.ComboBox;
import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

public class ComboBoxWidget extends ComboBoxComponent implements CommFunctionality, EasyFormWidget {

  private ComboBox comboBox;

  public ComboBoxWidget() {
    this.comboBox = new ComboBox();
  }

  @Override
  public String getLabel() {
    return comboBox.getDescription();
  }

  @Override
  public Comm getComm() {
    return comboBox.getComm();
  }

  @Override
  public void setLabel(String label) {
    comboBox.setDescription(label);
  }

  @Override
  public void setValue(String value) {
    comboBox.setValue(value);

  }

  @Override
  public String getValue() {
    return comboBox.getValue();
  }

  @Override
  public void setValues(Collection<String> values) {
    super.setValues(values);
    this.comboBox.setOptions(values.toArray(new String[0]));

  }

  @Override
  public Collection<String> getValues() {
    return Arrays.stream(comboBox.getOptions()).collect(Collectors.toList());
  }

  @Override
  public void setEditable(Boolean editable) {
    this.comboBox.setEditable(editable);
  }

  @Override
  public Boolean getEditable() {
    return this.comboBox.getEditable();
  }

  @Override
  public DOMWidget getWidget() {
    return comboBox;
  }

  @Override
  public void close() {
    getComm().close();
  }

}