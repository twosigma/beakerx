/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beaker.chart.xychart;

import java.io.Serializable;
import java.util.HashMap;

import com.twosigma.beaker.jupyter.comm.Comm;
import com.twosigma.beaker.widgets.Widget;
import com.twosigma.beaker.widgets.chart.InternalPlot;
import com.twosigma.beaker.widgets.internal.InternalCommWidget;
import com.twosigma.beaker.widgets.internal.InternalWidgetContent;
import com.twosigma.beaker.widgets.internal.InternalWidgetUtils;

public class Plot extends XYChart implements InternalCommWidget, InternalPlot {

  private Comm comm;

  public Plot(){
    this.comm = InternalWidgetUtils.createComm(this, new InternalWidgetContent() {
      @Override
      public void addContent(HashMap<String, Serializable> content) {
        content.put(Widget.MODEL_NAME, getModelNameValue());
        content.put(Widget.VIEW_NAME, getViewNameValue());
      }
    });
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
  public Comm getComm() {
    return this.comm;
  }
  
  @Override
  public void close() {
    if (this.comm != null) {
      this.comm.close();
    }
  }

  @Override
  public XYChart setLogX(boolean logX) {
    return super.setLogX(logX);
  }
}
