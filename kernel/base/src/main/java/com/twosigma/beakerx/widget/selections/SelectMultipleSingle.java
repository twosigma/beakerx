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
package com.twosigma.beakerx.widget.selections;

import com.twosigma.beakerx.widget.BeakerxWidget;
import com.twosigma.beakerx.widget.Widget;

import java.util.Collection;

import static java.util.Collections.singletonList;

public class SelectMultipleSingle extends MultipleSelectionWidget {

  public static String VIEW_NAME_VALUE = "SelectMultipleSingleView";
  public static String MODEL_NAME_VALUE = "SelectMultipleSingleModel";

  public SelectMultipleSingle() {
    super();
    this.defaultIndex = -1;
    openComm();
  }

  @Override
  protected Collection<Integer> indexes(Object input) {
    if (input instanceof Integer) {
      return singletonList((Integer) input);
    }
    throw new RuntimeException("Index for SelectMultipleSingle should be Integer, your index: " + input);
  }

  @Override
  public String getModelModuleValue() {
    return BeakerxWidget.MODEL_MODULE_VALUE;
  }

  @Override
  public String getViewModuleValue() {
    return BeakerxWidget.VIEW_MODULE_VALUE;
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
  public void setValue(Object newValue) {
    this.value = getValueFromObject(newValue);
    sendUpdate(Widget.VALUE, value);
    sendUpdate(Widget.INDEX, getSelectedOptionIndex(newValue.toString()));
  }

}