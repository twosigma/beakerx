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
import com.twosigma.jupyter.handler.Handler;
import com.twosigma.jupyter.message.Message;

import java.io.Serializable;
import java.util.HashMap;
import java.util.LinkedHashMap;

public class Button extends ValueWidget<Boolean> {

  public static final String VIEW_NAME_VALUE = "ButtonView";
  public static final String MODEL_NAME_VALUE = "ButtonModel";

  public static final String TOOLTIP = "tooltip";
  public static final String TAG = "tag";
  public static final String ICON = "icon";

  private String tooltip;
  private String tag;
  private String icon = "";
  private ActionPerformed actionPerformed = () -> {
  };

  public Button() {
    super();
    getComm().addMsgCallbackList((Handler<Message>) this::handleOnClick);
    openComm();
  }

  @Override
  public void updateValue(Object value) {

  }

  //@Override
  protected HashMap<String, Serializable> content(HashMap<String, Serializable> content) {
    super.content(content);
    content.put(MODEL_MODULE, InternalWidgetUtils.MODEL_MODULE_VALUE);
    content.put(VIEW_MODULE, InternalWidgetUtils.VIEW_MODULE_VALUE);
    content.put(TOOLTIP, tooltip);
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

  public String getTag() {
    return tag;
  }

  public void setTag(String tag) {
    this.tag = tag;
    sendUpdate(TAG, tag);
  }

  public void registerOnClick(ActionPerformed actionPerformed) {
    this.actionPerformed = actionPerformed;
  }

  public interface ActionPerformed {
    void execute();
  }

  private void handleOnClick(Message message) {
    if (message.getContent() != null) {
      Serializable data = message.getContent().get("data");
      if (data != null && data instanceof LinkedHashMap) {
        Object contentObject = ((LinkedHashMap) data).get("content");
        if (contentObject instanceof LinkedHashMap) {
          Object event = ((LinkedHashMap) contentObject).get("event");
          if (event.equals("click")) {
            actionPerformed.execute();
          }
        }
      }
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
  
}