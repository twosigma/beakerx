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
import java.util.ArrayList;
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

  private List<Widget> children;
  private String boxStyle="";

  public Box(List<Widget> children) {
    super();
    this.children = children;
  }

  public Box(List<Widget> children, Message parent) {
    super(parent);
    this.children = children;
  }

  public List<Widget> getChildren() {
    return children;
  }

  @Override
  protected HashMap<String, Object> content(HashMap<String, Object> content) {
    List<String> commIds = comIds();
    content.put(CHILDREN, commIds.toArray());
    content.put("box_style",boxStyle);
    super.content(content);
    return content;
  }

  public void add(Widget widget, Message parent) {
    this.children.add(widget);
    updateChildren(parent);
  }

  public void add(Widget widget) {
    this.children.add(widget);
    updateChildren();
  }

  public void add(int index, Widget widget) {
    this.children.add(index, widget);
    updateChildren();
  }

  public void add(int index, Widget widget, Message parent) {
    this.children.add(index, widget);
    updateChildren(parent);
  }

  public void removeAllChildren() {
    List<Widget> ch = new ArrayList<>(getChildren());
    ch.forEach(this::remove);
  }

  public void remove(Widget widget) {
    widget.close();
    this.children.remove(widget);
    updateChildren();
  }

  private void updateChildren() {
    List<String> commIds = comIds();
    sendUpdate(CHILDREN, commIds.toArray());
  }

  private void updateChildren(Message parent) {
    List<String> commIds = comIds();
    sendUpdate(CHILDREN, commIds.toArray(), parent);
  }

  private List<String> comIds() {
    return children.stream().map(x -> IPY_MODEL + x.getComm().getCommId()).collect(Collectors.toList());
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