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
package com.twosigma.beaker.easyform.formitem.widgets;

import com.twosigma.beaker.easyform.formitem.ButtonComponent;
import com.twosigma.beaker.jupyter.comm.Comm;
import com.twosigma.beaker.widgets.Button;
import com.twosigma.beaker.widgets.CommFunctionality;
import com.twosigma.beaker.widgets.DOMWidget;

import java.util.HashMap;

public class ButtonComponentWidget extends ButtonComponent implements CommFunctionality, EasyFormWidget {

  private Button widget;

  public ButtonComponentWidget() {
    this.widget = new Button();
    this.widget.registerOnClick(this::fireActionPerformed);
  }
  
  private void fireActionPerformed(HashMap content){
    this.fireActionPerformed();
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
  public String getLabel() {
    return this.widget.getDescription();
  }

  @Override
  public String getValue() {
    return null;
  }

  @Override
  public void setValue(String value) {
  }

  @Override
  public void setTag(String tag) {
    this.widget.setTag(tag);
  }

  @Override
  public String getTag() {
    return this.widget.getTag();
  }

  @Override
  public DOMWidget getWidget() {
    return widget;
  }

  @Override
  public void close() {
    widget.getComm().close();
  }
  
}