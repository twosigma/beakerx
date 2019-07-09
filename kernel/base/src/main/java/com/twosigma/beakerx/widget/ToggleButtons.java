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
 * Group of toggle buttons that represent an enumeration. 
 * Only one toggle button can be toggled at any point in time.
 *   
 * @author konst
 *
 */
public class ToggleButtons  extends SingleSelectionWidget{
  
  public static final String VIEW_NAME_VALUE = "ToggleButtonsView";
  public static final String MODEL_NAME_VALUE = "ToggleButtonsModel";
  
  public static final String BUTTON_STYLE = "button_style";
  public static final String TOOLTIPS = "tooltips";
  public static final String ICONS = "icons";

  private String button_style = ""; 
  private String[] tooltips = new String[0];
  private String[] icons = new String[0];
  
  public ToggleButtons() {
    super();
    openComm();
  }
  

  @Override
  protected HashMap<String, Object> content(HashMap<String, Object> content) {
    super.content(content);
    content.put("button_style", button_style);
    return content;
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

  public void setButton_style(String button_style) {
    this.button_style = button_style;
    sendUpdate(BUTTON_STYLE, button_style);
  }


  public String[] getTooltips() {
    return tooltips;
  }


  public void setTooltips(String[] tooltips) {
    this.tooltips = tooltips;
    sendUpdate(TOOLTIPS, tooltips);
  }


  public String[] getIcons() {
    return icons;
  }


  public void setIcons(String[] icons) {
    this.icons = icons;
    sendUpdate(ICONS, icons);
  }

}