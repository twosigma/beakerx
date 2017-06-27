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
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.widgets.CommFunctionality;
import com.twosigma.beakerx.widgets.ValueWidget;
import com.twosigma.beakerx.widgets.selections.ComboBox;
import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

public class ComboBoxWidget extends EasyFormComponent<ValueWidget<?>> implements CommFunctionality, EasyFormWidget {

  private ComboBox comboBox;
  private Integer width;
  
  public ComboBoxWidget() {
    this.comboBox = new ComboBox();
  }

  @Override
  protected boolean checkValue(final Object value) {
    return getEditable() || (getValues() != null && getValues().contains(value));
  }

  public void setWidth(final Integer width) {
    this.width = width;
  }

  public Integer getWidth() {
    return width;
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

  public void setValues(Collection<String> values) {
    this.comboBox.setOptions(values.toArray(new String[0]));

  }

  public Collection<String> getValues() {
    return Arrays.stream(comboBox.getOptions()).collect(Collectors.toList());
  }

  public void setEditable(Boolean editable) {
    this.comboBox.setEditable(editable);
  }

  public Boolean getEditable() {
    return this.comboBox.getEditable();
  }

  @Override
  public ValueWidget<?> getWidget() {
    return comboBox;
  }

  @Override
  public void close() {
    getComm().close();
  }

}