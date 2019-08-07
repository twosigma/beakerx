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

public class ComboBox extends SingleSelectionWidget {

  public static final String VIEW_NAME_VALUE = "ComboBoxView";
  public static final String MODEL_NAME_VALUE = "ComboBoxModel";
  public static final String EDITABLE = "editable";

  private Boolean editable = Boolean.FALSE;

  public ComboBox() {
    super();
    openComm();
  }

  public ComboBox(Boolean editable) {
    this();
    this.editable = editable;
  }

  public Boolean getEditable() {
    return editable;
  }

  public void setEditable(Boolean editable) {
    this.editable = editable;
    sendUpdate(EDITABLE, editable);
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
  public String getModelModuleValue() {
    return BeakerxWidget.MODEL_MODULE_VALUE;
  }

  @Override
  public String getViewModuleValue() {
    return BeakerxWidget.VIEW_MODULE_VALUE;
  }

  @Override
  public void updateValue(Object value) {
    setValue(value);
  }

  @Override
  protected HashMap<String, Object> content(HashMap<String, Object> content) {
    super.content(content);
    content.put(EDITABLE, editable);
    return content;
  }
}
