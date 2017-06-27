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

import com.twosigma.beakerx.easyform.EasyFormComponent;
import com.twosigma.beakerx.widgets.ValueWidget;
import com.twosigma.beakerx.widgets.strings.Text;

import static com.twosigma.beakerx.widgets.Layout.PX;

public class TextFieldWidget extends EasyFormComponent<ValueWidget<?>> {

  private Text text;
  private Integer width;
  
  public TextFieldWidget() {
    this.text = new Text();
  }
  
  public Integer getWidth() {
    return width;
  }

  @Override
  protected boolean checkValue(final Object value) {
    return value instanceof String;
  }

  @Override
  public ValueWidget<?> getWidget() {
    return text;
  }

  @Override
  public String getLabel() {
    return text.getDescription();
  }

  @Override
  public void setLabel(String label) {
    this.text.setDescription(label);
  }

  @Override
  public void setValue(String value) {
    this.text.setValue(value);
  }

  @Override
  public String getValue() {
    return this.text.getValue();
  }

  public TextFieldWidget setWidth(Integer width) {
    text.getLayout().setWidth(width + PX);
    this.width = width;
    return this;
  }

}