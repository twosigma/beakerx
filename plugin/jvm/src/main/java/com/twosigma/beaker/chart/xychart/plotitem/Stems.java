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
import java.util.List;


public class Stems extends XYGraphics {

  private Number baseBase;
  private List<Number> bases;
  private Color baseColor;
  private List<Color> colors;
  private Float width = 1.5f;
  private StrokeType baseStyle = StrokeType.SOLID;
  private List<StrokeType> styles;


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

  public void setColor(Object color) {
    if (color instanceof Color) {
      this.baseColor = (Color) color;
    } else if (color instanceof List) {
      @SuppressWarnings("unchecked")
      List<Color> cs = (List<Color>) color;
      setColors(cs);
    } else {
      throw new IllegalArgumentException(
          "setColor takes Color or List of Color");
    }
  }

  @Override
  public void setColori(Color color) {
    this.baseColor = color;
  }

  private void setColors(List<Color> colors) {
    this.colors = colors;
  }

  @Override
  public Color getColor() {
    return this.baseColor;
  }

  public List<Color> getColors() {
    return this.colors;
  }

  public void setWidth(Float width) {
    this.width = width;
  }

  public Float getWidth() {
    return this.width;
  }

  public void setStyle(Object style) {
    if (style instanceof StrokeType) {
      this.baseStyle = (StrokeType) style;
    } else if (style instanceof List) {
      @SuppressWarnings("unchecked")
      List<StrokeType> ss = (List<StrokeType>) style;
      setStyles(ss);
    } else {
      throw new IllegalArgumentException(
          "setStyle takes ShapeType or List of ShapeType");
    }
  }

  private void setStyles(List<StrokeType> styles) {
    this.styles = styles;
  }

  public StrokeType getStyle() {
    return this.baseStyle;
  }

  public List<StrokeType> getStyles() {
    return this.styles;
  }
}
