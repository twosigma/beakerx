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

import org.apache.commons.lang3.SerializationUtils;

import java.io.Serializable;

public abstract class Graphics implements Serializable, Cloneable{
  private boolean visible     = true;
  private String  yAxisName   = null;

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

  @Override
  public Object clone() throws CloneNotSupportedException {
    return SerializationUtils.clone(this);
  }

  abstract public void setColori(Color color);
  abstract public Color getColor();
}
