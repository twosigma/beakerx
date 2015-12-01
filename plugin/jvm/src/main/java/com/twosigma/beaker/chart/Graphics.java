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

package com.twosigma.beaker.chart;

import com.twosigma.beaker.chart.actions.GraphicsActionListener;
import com.twosigma.beaker.chart.actions.GraphicsClickActionObject;

import java.util.UUID;

public abstract class Graphics {
  private final String uid;
  private boolean visible     = true;
  private String  yAxisName   = null;
  private GraphicsActionListener onClickListener = null;
  private String tag;

  public Graphics() {
    this.uid = UUID.randomUUID().toString();
  }

  public void setVisible(boolean visible) {
    this.visible = visible;
  }

  public Boolean getVisible() {
    return this.visible;
  }

  public void setYAxis(String yAxisName) {
    this.yAxisName = yAxisName;
  }

  public void setyAxis(String yAxisName) {
    this.yAxisName = yAxisName;
  }

  public String getYAxis() {
    return yAxisName;
  }

  public String getUid() {
    return uid;
  }

  public String getTag() {
    return tag;
  }

  public Graphics onClick(GraphicsActionListener onClickListener) {
    this.onClickListener = onClickListener;
    return this;
  }

  public Graphics onClick(String tag) {
    this.tag = tag;
    return this;
  }

  public void fireClick(GraphicsClickActionObject actionObject) {
    if (onClickListener != null) {
      actionObject.setGraphics(this);
      onClickListener.execute(actionObject);
    }
  }

  abstract public void setColori(Color color);
  abstract public Color getColor();
}
