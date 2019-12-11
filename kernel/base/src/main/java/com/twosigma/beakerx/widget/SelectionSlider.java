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

/**
 * Slider to select a single item from a list or dictionary.
 *
 * @author konst
 */
public class SelectionSlider extends SelectionWidget<String> {


  public static String VIEW_NAME_VALUE = "SelectionSliderView";
  public static String MODEL_NAME_VALUE = "SelectionSliderModel";

  protected static final String ORIENTATION = "orientation";

  private String orientation = "horizontal";

  public SelectionSlider() {
    super();
    openComm();
  }

  @Override
  public String getModelNameValue() {
    return MODEL_NAME_VALUE;
  }

  @Override
  public String getViewNameValue() {
    return VIEW_NAME_VALUE;
  }

  @Override
  public String getValueFromObject(Object input) {
    return getString(input);
  }

  @Override
  public void updateValue(Object input) {
    int index = (Integer) input;
    this.value = getOptions()[index];
  }

  @Override
  protected HashMap<String, Object> content(HashMap<String, Object> content) {
    super.content(content);
    content.put(ORIENTATION, orientation);
    return content;
  }

  public String getOrientation() {
    return orientation;
  }

  public void setOrientation(String orientation) {
    this.orientation = orientation;
    sendUpdate(ORIENTATION, orientation);
  }

  @Override
  public void setValue(Object value) {
    super.setValue(value);
    sendUpdate(INDEX, this.getSelectedOptionIndex(getValue()));
  }
}