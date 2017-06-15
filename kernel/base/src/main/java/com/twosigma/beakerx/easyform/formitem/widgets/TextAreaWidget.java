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

import com.twosigma.beakerx.easyform.formitem.TextArea;
import com.twosigma.beakerx.jupyter.comm.Comm;
import com.twosigma.beakerx.widgets.CommFunctionality;
import com.twosigma.beakerx.widgets.DOMWidget;
import com.twosigma.beakerx.widgets.strings.Textarea;

import static com.twosigma.beakerx.widgets.Layout.PX;

public class TextAreaWidget extends TextArea implements CommFunctionality, EasyFormWidget {

  private Textarea widget;

  public TextAreaWidget() {
    this.widget = new Textarea();
  }

  @Override
  public String getLabel() {
    return this.widget.getDescription();
  }

  @Override
  public Comm getComm() {
    return widget.getComm();
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
  public DOMWidget getWidget() {
    return widget;
  }

  @Override
  public void setWidth(Integer width) {
    super.setWidth(width);
    widget.getLayout().setWidth(width + PX);
  }

  @Override
  public void setHeight(Integer height) {
    super.setHeight(height);
    widget.getLayout().setHeight(height + PX);
  }
  
  @Override
  public void close() {
    getComm().close();
  }
  
}