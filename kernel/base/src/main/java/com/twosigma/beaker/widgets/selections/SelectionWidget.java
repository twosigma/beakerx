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

import com.twosigma.beaker.widgets.DOMWidget;

import java.io.Serializable;
import java.util.HashMap;

public abstract class SelectionWidget extends DOMWidget {

  public static final String OPTIONS_LABELS = "_options_labels";

  private String[] options = new String[0];

  public SelectionWidget() {
  }

  @Override
  protected HashMap<String, Serializable> content(HashMap<String, Serializable> content) {
    super.content(content);
    content.put(OPTIONS_LABELS, this.options);
    return content;
  }

  public String[] getOptions() {
    return options;
  }

  public void setOptions(String[] options) {
    this.options = options;
    sendUpdate(OPTIONS_LABELS, options);
  }
}
