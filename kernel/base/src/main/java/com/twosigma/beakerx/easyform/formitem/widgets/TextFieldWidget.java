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

import com.twosigma.beakerx.easyform.formitem.TextField;
import com.twosigma.beakerx.kernel.comm.Comm;
import com.twosigma.beakerx.widgets.CommFunctionality;
import com.twosigma.beakerx.widgets.DOMWidget;
import com.twosigma.beakerx.widgets.strings.Text;

import static com.twosigma.beakerx.widgets.Layout.PX;

public class TextFieldWidget extends TextField implements CommFunctionality, EasyFormWidget {

  private Text text;

  public TextFieldWidget() {
    this.text = new Text();
  }

  @Override
  public DOMWidget getWidget() {
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

  @Override
  public Comm getComm() {
    return text.getComm();
  }

  @Override
  public TextField setWidth(Integer width) {
    text.getLayout().setWidth(width + PX);
    return super.setWidth(width);
  }
  
  @Override
  public void close() {
    getComm().close();
  }
  
}