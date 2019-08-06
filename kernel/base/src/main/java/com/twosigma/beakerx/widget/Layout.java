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

import com.twosigma.beakerx.message.Message;

import java.io.Serializable;
import java.util.HashMap;

public class Layout extends Widget {

  public static final String IPY_MODEL = "IPY_MODEL_";
  public static final String LAYOUT = "layout";
  public static final String DISPLAY = "display";
  public static final String ALIGN_ITEMS = "align_items";
  public static final String FLEX_FLOW = "flex_flow";
  public static final String WIDTH = "width";
  public static final String HEIGHT = "height";
  public static final String PX = "px";
  public static final String VIEW_NAME_VALUE = "LayoutView";
  public static final String MODEL_NAME_VALUE = "LayoutModel";
  public static final String VISIBILITY = "visibility";
  public static final String MODEL_MODULE_VALUE = "@jupyter-widgets/base";
  public static final String VIEW_MODULE_VALUE = "@jupyter-widgets/base";

  private String display;
  private String align_items;
  private String flex_flow;
  private String width;
  private String height;
  private String visibility;
  private String margin;

  public Layout() {
    super();
    openComm();
  }

  public Layout(Message parent) {
    super();
    openComm(parent);
  }

  @Override
  protected HashMap<String, Object> content(HashMap<String, Object> content) {
    content.put("align_content", "");
    content.put(ALIGN_ITEMS, getAlign_items());
    content.put("align_self", "");
    content.put("border", "");
    content.put("bottom", "");
    content.put(DISPLAY, getDisplay());
    content.put("flex", "");
    content.put(FLEX_FLOW, getFlex_flow());
    content.put(HEIGHT, "");
    content.put("justify_content", "");
    content.put("left", "");
    content.put("margin", "");
    content.put("max_height", "");
    content.put("max_width", "");
    content.put("min_height", "");
    content.put("min_width", "");
    content.put("msg_throttle", 3);
    content.put("overflow", "");
    content.put("overflow_x", "");
    content.put("overflow_y", "");
    content.put("padding", "");
    content.put("right", "");
    content.put("top", "");
    content.put(VISIBILITY, getVisibility());
    content.put(WIDTH, getWidth());

    return content;
  }

  public String getDisplay() {
    return display;
  }

  public void setDisplay(String display) {
    this.display = display;
    sendUpdate(DISPLAY, display);
  }

  public String getAlign_items() {
    return align_items;
  }

  public void setAlign_items(String align_items) {
    this.align_items = align_items;
    sendUpdate(ALIGN_ITEMS, align_items);
  }

  public String getFlex_flow() {
    return flex_flow;
  }

  public void setFlex_flow(String flex_flow) {
    this.flex_flow = flex_flow;
    sendUpdate(FLEX_FLOW, flex_flow);
  }

  public String getWidth() {
    return width;
  }

  public void setWidth(String width) {
    this.width = width;
    sendUpdate(WIDTH, width);
  }

  public String getHeight() {
    return height;
  }

  public void setHeight(String height) {
    this.height = height;
    sendUpdate(HEIGHT, height);
  }

  @Override
  protected void addValueChangeMsgCallback() {
  }

  @Override
  public String getModelNameValue() {
    return MODEL_NAME_VALUE;
  }

  @Override
  public String getViewNameValue() {
    return VIEW_NAME_VALUE;
  }

  public String getVisibility() {
    return visibility;
  }

  public void setVisibility(String visibility) {
    this.visibility = visibility;
    sendUpdate(VISIBILITY, visibility);
  }

  @Override
  public String getModelModuleValue() {
    return MODEL_MODULE_VALUE;
  }

  @Override
  public String getViewModuleValue() {
    return VIEW_MODULE_VALUE;
  }

  public void setMargin(String margin) {
    this.margin = margin;
    sendUpdate("margin", this.margin);
  }

  public void setDisplayNone() {
    sendUpdate(DISPLAY, "none");
  }

}
