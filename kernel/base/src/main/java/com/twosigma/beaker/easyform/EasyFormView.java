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
package com.twosigma.beaker.easyform;

import com.twosigma.beaker.widgets.CommFunctionality;
import com.twosigma.beaker.widgets.box.Box;
import com.twosigma.beaker.widgets.internal.CommWidget;
import com.twosigma.beaker.widgets.internal.InternalWidgetUtils;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;

public class EasyFormView extends Box implements CommWidget{

  public static final String VIEW_NAME_VALUE = "EasyFormView";
  public static final String MODEL_NAME_VALUE = "EasyFormModel";
  public static final String EASY_FORM_NAME = "easyFormName";

  private String easyFormName;

  public EasyFormView(List<CommFunctionality> children) {
    super(children);
    openComm();
  }

  @Override
  public void updateValue(Object value) {

  }

  @Override
  protected HashMap<String, Serializable> content(HashMap<String, Serializable> content) {
    content.put(MODEL_MODULE, InternalWidgetUtils.MODEL_MODULE_VALUE);
    content.put(VIEW_MODULE, InternalWidgetUtils.VIEW_MODULE_VALUE);
    super.content(content);
    return content;
  }

  public String getEasyFormName() {
    return easyFormName;
  }

  public void setEasyFormName(String easyFormName) {
    this.easyFormName = easyFormName;
    sendUpdate(EASY_FORM_NAME, easyFormName);
  }

  public String getModelNameValue(){
    return MODEL_NAME_VALUE;
  }

  public String getViewNameValue(){
    return VIEW_NAME_VALUE;
  }

}