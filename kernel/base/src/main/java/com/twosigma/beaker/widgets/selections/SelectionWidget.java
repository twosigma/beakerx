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
package com.twosigma.beaker.widgets.selections;

import java.io.Serializable;
import java.util.Collection;
import java.util.HashMap;

import com.twosigma.beaker.widgets.ValueWidget;

public abstract class SelectionWidget extends ValueWidget<String> {

  public static final String OPTIONS_LABELS = "_options_labels";
  private Object[] options = new Object[0];

  @Override
  protected HashMap<String, Serializable> content(HashMap<String, Serializable> content) {
    super.content(content);
    content.put(OPTIONS_LABELS, this.options);
    content.put(VALUE, this.value);
    return content;
  }

  @Override
  public void updateValue(Object value) {
    this.value = (String) value;
  }


  public Object[] getOptions() {
    return options;
  }

  public void setOptions(Object[] options) {
    this.options = options;
    sendUpdate(OPTIONS_LABELS, options);
  }
  
  public void setOptions(Collection<Object> options) {
    this.options = options.toArray(new Object[options.size()]);
    sendUpdate(OPTIONS_LABELS, options);
  }
}
