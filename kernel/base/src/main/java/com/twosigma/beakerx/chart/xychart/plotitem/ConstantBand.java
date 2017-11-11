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

package com.twosigma.beakerx.chart.xychart.plotitem;

import com.twosigma.beakerx.chart.Color;
import com.twosigma.beakerx.chart.Graphics;
import com.twosigma.beakerx.util.DateUtil;

import java.util.ArrayList;
import java.util.List;

/**
 * ConstantBand
 */
public class ConstantBand extends Graphics {
  private List<Number> xs;
  private List<Number> ys;
  private Color baseColor;
  private Class plotType;

  public List<Number> getX() {
    return xs;
  }

  public void setX(List<Object> xs) {
    this.xs = new ArrayList<>();
    if (xs != null) {
      for (Object x : xs) {
        if (x instanceof Number) {
          this.xs.add((Number) x);
        } else {
          this.xs.add(DateUtil.dateToLong(x));
        }
      }
    }
  }

  public List<Number> getY() {
    return ys;
  }

  public void setY(List<Number> y) {
    this.ys = y;
  }

  public void setColor(Color color) {
    this.baseColor = color;
  }

  public void setColor(java.awt.Color color) {
    setColor(new Color(color));
  }

  @Override
  public void setColori(Color color) {
    this.baseColor = color;
  }

  @Override
  public Color getColor() {
    return baseColor;
  }

  public Class getPlotType() {
    return plotType;
  }

  public void setPlotType(Class plotType) {
    this.plotType = plotType;
  }

}
