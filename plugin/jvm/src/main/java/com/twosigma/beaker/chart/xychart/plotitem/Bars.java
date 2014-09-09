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


public class Bars extends XYGraphics {

  private Number baseWidth;
  private List<Number> widths;
  private Number baseBase = 0.0d;
  private List<Number> bases;
  private Paint baseColor;
  private List<Paint> colors;
  private Paint baseOutlineColor;
  private List<Paint> outlineColors;

  public void setBase(Object base) {
    if (base instanceof Number) {
      this.baseBase = ((Number) base).floatValue();
    } else if (base instanceof List) {
      @SuppressWarnings("unchecked")
      List<Number> ss = (List<Number>) base;
      setBases(ss);
    } else {
      throw new IllegalArgumentException(
          "setBase takes Number or List of Number");
    }
  }

  private void setBases(List<Number> bases) {
    this.bases = bases;
  }

  public Number getBase() {
    return this.baseBase;
  }

  public List<Number> getBases() {
    return this.bases;
  }


  public void setWidth(Object width) {
    if (width instanceof Number) {
      this.baseWidth = ((Number) width).floatValue();
    } else if (width instanceof List) {
      @SuppressWarnings("unchecked")
      List<Number> ws = (List<Number>) width;
      setWidths(ws);
    } else {
      throw new IllegalArgumentException(
          "setWidth takes Number or List of Number");
    }
  }

  private void setWidths(List<Number> widths) {
    this.widths = widths;
  }

  public Number getWidth() {
    return this.baseWidth;
  }

  public List<Number> getWidths() {
    return this.widths;
  }

  public void setColor(Object color) {
    if (color instanceof Paint) {
      this.baseColor = (Paint) color;
    } else if (color instanceof List) {
      @SuppressWarnings("unchecked")
      List<Paint> cs = (List<Paint>) color;
      setColors(cs);
    } else {
      throw new IllegalArgumentException(
          "setColor takes Paint or List of Paint");
    }
  }

  @Override
  public void setColor(Paint color) {
    this.baseColor = color;
  }

  private void setColors(List<Paint> colors) {
    this.colors = colors;
  }

  @Override
  public Paint getColor() {
    return this.baseColor;
  }

  public List<Paint> getColors() {
    return this.colors;
  }

  public void setOutlineColor(Object color) {
    if (color instanceof Paint) {
      this.baseOutlineColor = (Paint) color;
    } else if (color instanceof List) {
      @SuppressWarnings("unchecked")
      List<Paint> cs = (List<Paint>) color;
      setOutlineColors(cs);
    } else {
      throw new IllegalArgumentException(
          "setOutlineColor takes Paint or List of Paint");
    }
  }

  private void setOutlineColors(List<Paint> colors) {
    this.outlineColors = colors;
  }

  public Paint getOutlineColor() {
    return this.baseOutlineColor;
  }

  public List<Paint> getOutlineColors() {
    return this.outlineColors;
  }

}
