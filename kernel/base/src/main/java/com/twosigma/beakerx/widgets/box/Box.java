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
package com.twosigma.beakerx.widgets.box;

import com.twosigma.beakerx.widgets.ValueWidget;
import com.twosigma.beakerx.widgets.Widget;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Displays multiple widgets in a group.
 */
public abstract class Box extends ValueWidget<String> {

  public static final String CHILDREN = "children";
  public static final String IPY_MODEL = "IPY_MODEL_";

  public static final String VIEW_NAME_VALUE = "BoxView";
  public static final String MODEL_NAME_VALUE = "BoxModel";

  List<Widget> children;

  public Box(List<Widget> children) {
    this.children = children;
  }

  @Override
  protected HashMap<String, Serializable> content(HashMap<String, Serializable> content) {
    List<String> commIds = children.stream().map(x -> IPY_MODEL + x.getComm().getCommId()).collect(Collectors.toList());
    content.put(CHILDREN, commIds.toArray());
    super.content(content);
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

  @Override
  public String getValueFromObject(Object input) {
    return getString(input);
  }

  @Override
  public void display() {
    activateWidgetInContainer();
    super.display();
  }

  @Override
  public void activateWidgetInContainer() {
    this.children.forEach(Widget::activateWidgetInContainer);
  }
}