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
package com.twosigma.beaker.widgets;

import com.twosigma.beaker.widgets.internal.InternalWidgetUtils;

import java.io.Serializable;
import java.util.HashMap;
import java.util.LinkedHashMap;

public class DatePicker extends ValueWidget<LinkedHashMap<String,String>> {

  public static final String VIEW_NAME_VALUE = "DatePickerView";
  public static final String MODEL_NAME_VALUE = "DatePickerModel";

  public DatePicker() {
    super();
    this.value = new LinkedHashMap();
    init();
  }

  @Override
  public void updateValue(Object value) {
    this.value = (LinkedHashMap<String, String>) value;
  }

  @Override
  protected HashMap<String, Serializable> content(HashMap<String, Serializable> content) {
    super.content(content);
    content.put(MODEL_NAME, MODEL_NAME_VALUE);
    content.put(VIEW_NAME, VIEW_NAME_VALUE);
    content.put(MODEL_MODULE, InternalWidgetUtils.MODEL_MODULE_VALUE);
    content.put(VIEW_MODULE, InternalWidgetUtils.VIEW_MODULE_VALUE);
    content.put(VALUE, this.value);
    return content;
  }

  public LinkedHashMap<String, String> getValue() {
    return value;
  }

  public void setValue(String value) {
    // not sure what and how to do
  }

}
