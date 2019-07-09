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

import java.io.Serializable;
import java.util.HashMap;

public class ColorPicker extends ValueWidget<String> {

  public static final String VIEW_NAME_VALUE = "ColorPickerView";
  public static final String MODEL_NAME_VALUE = "ColorPickerModel";
  public static final String CONCISE = "concise";

  private Boolean concise = false;

  public ColorPicker() {
    super();
    openComm();
  }

  @Override
  public String getValueFromObject(Object input){
    return getString(input);
  }

  @Override
  protected HashMap<String, Object> content(HashMap<String, Object> content) {
    super.content(content);
    content.put(VALUE, this.value);
    content.put(CONCISE, this.concise);
    return content;
  }

  public Boolean getConcise() {
    return concise;
  }

  public void setConcise(Boolean concise) {
    this.concise = concise;
    sendUpdate(CONCISE, concise);
  }

  @Override
  public String getModelNameValue() {
    return MODEL_NAME_VALUE;
  }

  @Override
  public String getViewNameValue() {
    return VIEW_NAME_VALUE;
  }
  
}