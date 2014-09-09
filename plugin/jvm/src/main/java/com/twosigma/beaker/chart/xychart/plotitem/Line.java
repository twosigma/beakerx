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

import java.awt.Paint;
import java.util.List;


public class Line extends XYGraphics {

  private Paint color;
  private List<Paint> colors;
  private Float width = 1.5f;
  private StrokeType style;
  private Integer interpolation;

  public Line() {

  }

  public Line(List<Number> ys) {
    super.setY(ys);
  }

  public Line(List<Number> xs, List<Number> ys) {
    super.setX(xs);
    super.setY(ys);
  }

  public void setColor(Object color) {
    if (color instanceof Paint) {
      this.color = (Paint) color;
    } else if (color instanceof List) {
      @SuppressWarnings("unchecked")
      List<Paint> temp = (List<Paint>) color;
      setColors(temp);
    } else {
      throw new IllegalArgumentException(
          "setColor takes Paint or List of Paint");
    }
  }

  @Override
  public void setColori(Paint color) {
    this.color = color;
  }

  private void setColors(List<Paint> colors) {
    this.colors = colors;
  }


  @Override
  public Paint getColor() {
    return this.color;
  }

  public List<Paint> getColors() {
    return this.colors;
  }

  public void setWidth(Float width) {
    this.width = width;
  }

  public Float getWidth() {
    return this.width;
  }

  public void setStyle(StrokeType style) {
    this.style = style;
  }

  public StrokeType getStyle() {
    return this.style;
  }

  public void setInterpolation(Integer interpolation) {
    if (interpolation.intValue() < 0 || interpolation.intValue() > 2) {
      throw new IllegalArgumentException(
          "Line interpolation is limited to 0, 1, 2");
    }

    this.interpolation = interpolation;
  }

  public Integer getInterpolation() {
    return this.interpolation;
  }

}
