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

package com.twosigma.beaker.easyform.formitem;

import com.twosigma.beaker.easyform.EasyFormComponent;
import java.util.Collection;

public abstract class ComboBoxComponent extends EasyFormComponent {

  private Boolean editable;
  private Collection<String> values;
  private Integer width;

  @Override
  protected boolean checkValue(final Object value) {
    return editable || (values != null && values.contains(value));
  }

  public void setEditable(final Boolean editable) {
    this.editable = editable;
  }

  public Boolean getEditable() {
    return editable;
  }

  public void setValues(final Collection<String> values) {
    this.values = values;
  }

  public Collection<String> getValues() {
    return values;
  }

  public void setWidth(final Integer width) {
    this.width = width;
  }

  public Integer getWidth() {
    return width;
  }
}
