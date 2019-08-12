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
package com.twosigma.beakerx.widget;

import com.twosigma.beakerx.message.Message;

import java.io.Serializable;
import java.util.HashMap;

public abstract class StringWidget extends ValueWidget<String> {

  public static final String PLACE_HOLDER = "placeholder";
  private String placeholder = "";

  public StringWidget() {
    super();
  }

  public StringWidget(Message parent) {
    super(parent);
  }

  @Override
  protected HashMap<String, Object> content(HashMap<String, Object> content) {
    super.content(content);
    content.put(VALUE, this.value);
    content.put("placeholder", this.placeholder);
    return content;
  }

  @Override
  public String getValueFromObject(Object input) {
    return getString(input);
  }

  public String getPlaceholder() {
    return placeholder;
  }

  public void setPlaceholder(String placeholder) {
    this.placeholder = placeholder;
    sendUpdate(PLACE_HOLDER, this.placeholder);
  }

}