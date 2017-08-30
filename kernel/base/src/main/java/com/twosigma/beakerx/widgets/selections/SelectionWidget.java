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
package com.twosigma.beakerx.widgets.selections;

import java.io.Serializable;
import java.util.HashMap;

import com.twosigma.beakerx.widgets.ValueWidget;

public abstract class SelectionWidget<T extends Serializable> extends ValueWidget<T> {

  public static final String OPTIONS_LABELS = "_options_labels";
  public static final String SIZE = "size";

  private String[] options = new String[0];
  private Integer size;

  @Override
  protected HashMap<String, Serializable> content(HashMap<String, Serializable> content) {
    super.content(content);
    content.put(OPTIONS_LABELS, this.options);
    content.put(VALUE, this.value);
    return content;
  }

  public String[] getOptions() {
    return options;
  }

  public void setOptions(Object options) {
    this.options = getStringArray(options);
    sendUpdate(OPTIONS_LABELS, options);
  }

  public Integer getSize() {
    return size;
  }

  public void setSize(Integer size) {
    this.size = getInteger(size);
    sendUpdate(SIZE, size);
  }
}
