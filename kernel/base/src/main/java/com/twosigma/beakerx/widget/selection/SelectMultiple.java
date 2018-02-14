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
package com.twosigma.beakerx.widget.selection;

import com.twosigma.beakerx.widget.BeakerxWidget;
import com.twosigma.beakerx.widget.Widget;

import java.util.ArrayList;
import java.util.List;


public class SelectMultiple extends MultipleSelectionWidget {

  public static String VIEW_NAME_VALUE = "SelectMultipleView";
  public static String MODEL_NAME_VALUE = "SelectMultipleModel";

  public SelectMultiple() {
    super();
    openComm();
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
    sendUpdate(Widget.INDEX, getSelectedOptionsIndexes(value));
  }

  public Integer[] getSelectedOptionsIndexes(String[] values) {
    List<Integer> indexes = new ArrayList<>();
    String[] options = getOptions();
    for (int i = 0; i < options.length; i++) {
      for (String value : values){
        if (options[i].equals(value)){
          indexes.add(i);
        }
      }
    }
    return indexes.toArray(new Integer[indexes.size()]);
  }

}