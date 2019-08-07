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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class Foldout extends Box {

  public static final String VIEW_NAME_VALUE = "FoldoutView";
  public static final String MODEL_NAME_VALUE = "FoldoutModel";

  private FoldoutOption foldoutOption = new FoldoutOption();

  public Foldout(List<Widget> children) {
    this(children, new FoldoutOption());
  }

  public Foldout(List<Widget> children, FoldoutOption foldoutOption) {
    super(children);
    this.foldoutOption = foldoutOption;
    openComm();
  }

  public Foldout(Message parent, FoldoutOption foldoutOption) {
    super(new ArrayList<>(),parent);
    this.foldoutOption = foldoutOption;
    openComm(parent);
  }

  @Override
  protected HashMap<String, Object> content(HashMap<String, Object> content) {
    content.put("hidePreview", foldoutOption.hidePreview);
    content.put("headerLabel", foldoutOption.headerLabel);
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
  public String getModelModuleValue() {
    return BeakerxWidget.MODEL_MODULE_VALUE;
  }

  @Override
  public String getViewModuleValue() {
    return BeakerxWidget.VIEW_MODULE_VALUE;
  }

  public static class FoldoutOption {
    public boolean hidePreview = false;
    public String headerLabel = "Output";
  }
}
