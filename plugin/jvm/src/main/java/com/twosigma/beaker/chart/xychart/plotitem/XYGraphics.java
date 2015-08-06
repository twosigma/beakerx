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

package com.twosigma.beaker.chart.xychart.plotitem;

import com.twosigma.beaker.chart.Color;
import com.twosigma.beaker.chart.Filter;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

abstract public class XYGraphics {
  private List<Number> xs;
  private List<Number> ys;
  private boolean visible     = true;
  private String  displayName = "";
  private String  yAxisName   = null;
  private Filter lodFilter;

  public void setX(List<Number> xs) {
    this.xs = xs;
  }

  public List<Number> getX() {
    if (xs == null) {
      generateXs();
    }
    return this.xs;
  }

  public void setY(List<Number> ys) {
    this.ys = ys;
  }

  public List<Number> getY() {
    return this.ys;
  }

  public void setVisible(boolean visible) {
    this.visible = visible;
  }

  public Boolean getVisible() {
    return this.visible;
  }

  public void setDisplayName(String displayName) {
    this.displayName = displayName;
  }

  public String getDisplayName() {
    return this.displayName;
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

  private void generateXs() {
    this.xs = new ArrayList<>(this.ys.size());
    for (int i = 0; i < ys.size(); ++i) {
      this.xs.add(i);
    }
  }

  public Filter getLodFilter() {
    return lodFilter;
  }

  public void setLodFilter(Filter lodFilter){
    if (getPossibleFilters().contains(lodFilter)){
      this.lodFilter = lodFilter;
    }else{
      throw new RuntimeException(String.format("%s doesn't not support '%s' filter.",
                                               getClass().getSimpleName(),
                                               lodFilter.getText()));
    }

  }

  abstract public void setColori(Color color);
  abstract public Color getColor();
  abstract protected EnumSet<Filter> getPossibleFilters();
}
