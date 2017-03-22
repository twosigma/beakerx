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

public class Button extends DOMWidget {

  public static final String VIEW_NAME_VALUE = "ButtonView";
  public static final String MODEL_NAME_VALUE = "ButtonModel";

  public static final String TOOLTIP = "tooltip";
  public static final String TAG = "tag";

  private String tooltip;
  private String tag;

  public Button() {
    super();
    init();
  }

  @Override
  protected HashMap<String, Serializable> content(HashMap<String, Serializable> content) {
    super.content(content);
    content.put(MODEL_NAME, MODEL_NAME_VALUE);
    content.put(VIEW_NAME, VIEW_NAME_VALUE);
    content.put(MODEL_MODULE, InternalWidgetUtils.MODEL_MODULE_VALUE);
    content.put(VIEW_MODULE, InternalWidgetUtils.VIEW_MODULE_VALUE);
    content.put(TOOLTIP, tooltip);
    return content;
  }

  public String getTooltip() {
    return tooltip;
  }

  public void setTooltip(String tooltip) {
    this.tooltip = tooltip;
    sendUpdate(TOOLTIP, tooltip);
  }

  public String getTag() {
    return tag;
  }

  public void setTag(String tag) {
    this.tag = tag;
    sendUpdate(TAG, tag);
  }
}
