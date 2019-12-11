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

import com.twosigma.beakerx.BeakerXClientManager;
import com.twosigma.beakerx.handler.Handler;
import com.twosigma.beakerx.message.Message;

import java.io.Serializable;
import java.util.HashMap;

import static com.twosigma.beakerx.kernel.Utils.EMPTY_STRING;

public class Button extends ValueWidget<Boolean> {

  public static final String VIEW_NAME_VALUE = "ButtonView";
  public static final String MODEL_NAME_VALUE = "ButtonModel";

  public static final String TOOLTIP = "tooltip";
  public static final String TAG = "tag";
  public static final String ICON = "icon";
  public static final String BUTTON_STYLE = "button_style";

  private String tooltip = EMPTY_STRING;
  private String tag;
  private String icon = EMPTY_STRING;
  private String button_style = EMPTY_STRING;
  private ActionPerformed actionPerformed = null;

  public Button() {
    super();
    this.style = new ButtonStyle();
    getComm().addMsgCallbackList((Handler<Message>) this::handleOnClick);
    openComm();
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

  public String getIcon() {
    return icon;
  }

  public void setIcon(String tag) {
    this.icon = tag;
    sendUpdate(ICON, icon);
  }

  public void registerOnClick(ActionPerformed actionPerformed) {
    this.actionPerformed = actionPerformed;
  }

  private void handleOnClick(Message message) {
    handleCommEventSync(message, CommActions.CLICK, this::onClick);
  }

  public void onClick(HashMap content, Message message) {
    if (actionPerformed != null) {
      actionPerformed.executeAction(content, message);
    }
    if (getTag() != null && !getTag().isEmpty()) {
      BeakerXClientManager.get().runByTag(getTag());
    }
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
  public Boolean getValueFromObject(Object input) {
    return getBoolean(input);
  }

  public String getButton_style() {
    return button_style;
  }

  public void setButton_style(String button_style) {
    this.button_style = button_style;
    sendUpdate(BUTTON_STYLE, button_style);
  }

}