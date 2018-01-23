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

import com.twosigma.beakerx.easyform.formitem.ListComponent;
import com.twosigma.beakerx.widgets.selections.SelectMultiple;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.Arrays.asList;

public class SelectMultipleWidget extends ListComponent<SelectMultiple> {

  public SelectMultipleWidget() {
    super(new SelectMultiple());
  }

  @Override
  public void setSize(Integer size) {
    this.widget.setSize(size);
  }

  @Override
  public Integer getSize() {
    return this.widget.getSize();
  }

  @Override
  public void setValues(Collection<String> values) {
    super.setValues(values);
    this.widget.setOptions(values.stream().toArray(String[]::new));
  }

  @Override
  public Object getValue() {
    return new ArrayList<>(asList(this.widget.getValue()));
  }

  public void setValue(Object[] value) {
    this.widget.setValue(value);
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
  protected boolean checkValue(Object value) {
    return value instanceof Object[] || value instanceof List;
  }

}