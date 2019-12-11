/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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

import com.twosigma.beakerx.message.Message;

import java.io.Serializable;
import java.util.HashMap;

import static com.twosigma.beakerx.kernel.Utils.EMPTY_STRING;

public class RESTButton extends ValueWidget<Boolean> {

  public static final String VIEW_NAME_VALUE = "RESTButtonView";
  public static final String MODEL_NAME_VALUE = "RESTButtonModel";

  public static final String TOOLTIP = "tooltip";
  public static final String ICON = "icon";
  public static final String BUTTON_STYLE = "button_style";
  public static final String URL = "url";

  private String tooltip = EMPTY_STRING;
  private String icon = EMPTY_STRING;
  private String button_style = EMPTY_STRING;
  private String url;

  public RESTButton(String url) {
    super();
    this.url = url;
    this.style = new ButtonStyle();
    openComm();
  }

  public RESTButton(String url, Message parentMessage) {
    super(parentMessage);
    this.url = url;
    openComm(parentMessage);
  }

  @Override
  public void updateValue(Object value) {

  }

  @Override
  protected HashMap<String, Object> content(HashMap<String, Object> content) {
    super.content(content);
    content.put(TOOLTIP, tooltip);
    content.put(ICON, icon);
    content.put(BUTTON_STYLE, button_style);
    content.put(URL, url);
    return content;
  }

  public String getUrl() {
    return url;
  }

  public String getTooltip() {
    return tooltip;
  }

  public void setTooltip(String tooltip) {
    this.tooltip = tooltip;
    sendUpdate(TOOLTIP, tooltip);
  }

  @Override
  public Boolean getValueFromObject(Object input) {
    return getBoolean(input);
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

}
