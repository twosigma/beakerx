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
import com.twosigma.beaker.chart.Graphics;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * ConstantBand
 *
 */
public class ConstantBand extends Graphics {
  private List<Number>  xs;
  private List<Number>  ys;
  private Color         baseColor;
  private Class         plotType;

  public List<Number> getX() {
    return xs;
  }

  public void setX(List<Object> xs) {
    this.xs = new ArrayList<>();
    if(xs != null){
      for (Object x : xs) {
        if (x instanceof Number) {
          this.xs.add((Number)x);
        } else if (x instanceof Date) {
          Date date = (Date)x;
          this.xs.add(date.getTime());
        } else {
          throw new IllegalArgumentException("x coordinates should be the list of numbers or java.util.Date objects");
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

  public void setColor(Object color) {
    if (color instanceof Color) {
      this.baseColor = (Color) color;
    } else if (color instanceof java.awt.Color) {
      this.baseColor = new Color((java.awt.Color) color);
    } else {
      throw new IllegalArgumentException(
        "setColor takes Color or java.awt.Color");
    }
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
