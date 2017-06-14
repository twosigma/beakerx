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
package com.twosigma.beaker.easyform.formitem;

import com.twosigma.beaker.widgets.selections.SingleSelectionWidget;
import com.twosigma.beaker.widgets.BeakerxWidget;

public class ComboBoxComponent extends SingleSelectionWidget {

  public static final String VIEW_NAME_VALUE = "ComboBoxView";
  public static final String MODEL_NAME_VALUE = "ComboBoxModel";
  public static final String EDITABLE = "editable";

  private Boolean editable;

  public ComboBoxComponent() {
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
  public String getModelModuleValue() {
    return BeakerxWidget.MODEL_MODULE_VALUE;
  }

  @Override
  public String getViewModuleValue() {
    return BeakerxWidget.VIEW_MODULE_VALUE;
  }

  public void setEditable(final Boolean editable) {
    this.editable = editable;
    sendUpdate(EDITABLE, editable);
  }

  public Boolean getEditable() {
    return editable;
  }

}