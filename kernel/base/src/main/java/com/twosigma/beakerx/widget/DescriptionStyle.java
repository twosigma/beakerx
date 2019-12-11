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

import java.util.HashMap;

public class DescriptionStyle extends Style {

  public static final String MODEL_NAME_VALUE = "DescriptionStyleModel";
  public static final String MODEL_MODULE_VALUE = "@jupyter-widgets/controls";

  private String descriptionWidth = "";

  @Override
  public String getModelNameValue() {
    return MODEL_NAME_VALUE;
  }
  @Override
  public String getModelModuleValue(){
    return MODEL_MODULE_VALUE;
  }

  @Override
  protected void addValueChangeMsgCallback() {
  }

  @Override
  protected HashMap<String, Object> content(HashMap<String, Object> content) {
    content.put("description_width", descriptionWidth);
    return content;
  }

}
