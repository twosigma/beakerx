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
import com.twosigma.beakerx.widgets.selections.SelectMultipleSingle;

import java.util.Collection;

public class SelectMultipleSingleWidget extends ListComponent<SelectMultipleSingle> {

  public SelectMultipleSingleWidget() {
    super(new SelectMultipleSingle());
  }

  @Override
  public String getValue() {
    return null;
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
    this.getWidget().setOptions(values.stream().toArray(String[]::new));
  }

  
}