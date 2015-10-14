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


package com.twosigma.beaker.chart.categoryplot.plotitem;

import com.twosigma.beaker.chart.Color;
import com.twosigma.beaker.chart.Graphics;

import java.util.List;

public abstract class CategoryGraphics extends Graphics {
  protected Number[][]   value;
  protected List<String> seriesNames;
  protected Color        baseColor;
  private   List<Color>  colors;

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

  private void setColors(List<Color> colors) {
    this.colors = colors;
  }


  public List<Color> getColors() {
    return this.colors;
  }

  @Override
  public void setColori(Color color) {
    this.baseColor = color;
  }

  @Override
  public Color getColor() {
    return this.baseColor;
  }

  public Number[][] getValue() {
    return value;
  }

  public void setValue(Number[][] value) {
    this.value = value;
  }

  public List<String> getSeriesNames() {
    return seriesNames;
  }

  public void setSeriesNames(List<String> seriesNames) {
    this.seriesNames = seriesNames;
  }
}
