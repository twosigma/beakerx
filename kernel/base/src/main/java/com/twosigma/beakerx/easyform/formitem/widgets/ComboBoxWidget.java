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
import com.twosigma.beakerx.widgets.selections.ComboBox;
import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

public class ComboBoxWidget extends EasyFormComponent<ComboBox> {

  private Integer width;
  
  public ComboBoxWidget() {
    super(new ComboBox());
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

  public void setValues(Collection<String> values) {
    this.widget.setOptions(values.toArray(new String[0]));
  }

  public Collection<String> getValues() {
    return Arrays.stream(widget.getOptions()).collect(Collectors.toList());
  }

  public void setEditable(Boolean editable) {
    this.widget.setEditable(editable);
  }

  public Boolean getEditable() {
    return this.widget.getEditable();
  }

}