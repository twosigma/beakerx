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
package com.twosigma.beakerx.easyform.formitem.widgets;

import com.twosigma.beakerx.widgets.ValueWidget;
import com.twosigma.beakerx.widgets.strings.Textarea;

import static com.twosigma.beakerx.widgets.Layout.PX;

import com.twosigma.beakerx.easyform.EasyFormComponent;

public class TextAreaWidget extends EasyFormComponent<ValueWidget<?>> {

  private Textarea widget;
  public static final Integer AUTO_HEIGHT = -1;
  public static final Integer AUTO_WIDTH = -1;
  private Integer width;
  private Integer height;
  
  public TextAreaWidget() {
    this.widget = new Textarea();
  }

  public Integer getWidth() {
    return width;
  }


  public Integer getHeight() {
    return height;
  }

  @Override
  public String getLabel() {
    return this.widget.getDescription();
  }

  @Override
  public void setLabel(String label) {
    this.widget.setDescription(label);
  }

  @Override
  public String getValue() {
    return this.widget.getValue();
  }

  @Override
  public void setValue(String value) {
    this.widget.setValue(value);
  }

  @Override
  public ValueWidget<?> getWidget() {
    return widget;
  }

  public void setWidth(Integer width) {
    this.width = width;
    widget.getLayout().setWidth(width + PX);
  }

  public void setHeight(Integer height) {
    this.height = height;
    widget.getLayout().setHeight(height + PX);
  }

}