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

public class ToggleButton extends BoolWidget {

  public static String VIEW_NAME_VALUE = "ToggleButtonView";
  public static String MODEL_NAME_VALUE = "ToggleButtonModel";
  
  public static final String TOOLTIP = "tooltip";
  public static final String BUTTON_STYLE = "button_style";
  public static final String ICON = "icon";

  private String tooltip = "";
  private String button_style = ""; 
  private String icon = "";

  public ToggleButton() {
    super();
    openComm();
  }

  @Override
  protected HashMap<String, Object> content(HashMap<String, Object> content) {
    super.content(content);
    content.put(TOOLTIP, this.tooltip);
    content.put(BUTTON_STYLE, button_style);
    content.put(ICON, icon);
    return content;
  }

  public String getTooltip() {
    return tooltip;
  }

  public void setTooltip(String tooltip) {
    this.tooltip = tooltip;
    sendUpdate(TOOLTIP, tooltip);
  }

  @Override
  public String getModelNameValue() {
    return MODEL_NAME_VALUE;
  }

  @Override
  public String getViewNameValue() {
    return VIEW_NAME_VALUE;
  }
  
  public String getButton_style() {
    return button_style;
  }

  public void setButton_style(Object button_style) {
    this.button_style = getString(button_style);
    sendUpdate(BUTTON_STYLE, button_style);
  }
  
  public String getIcon() {
    return icon;
  }


  public void setIcon(Object icon) {
    this.icon = getString(icon);
    sendUpdate(ICON, icon);
  }
  
}