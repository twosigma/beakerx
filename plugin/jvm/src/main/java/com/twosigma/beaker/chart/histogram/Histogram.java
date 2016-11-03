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

package com.twosigma.beaker.chart.histogram;

import com.twosigma.beaker.chart.AbstractChart;
import com.twosigma.beaker.chart.Color;

import java.util.ArrayList;
import java.util.List;

public class Histogram extends AbstractChart {

  public enum DisplayMode {
    OVERLAP,
    STACK,
    SIDE_BY_SIDE
  }

  private   Integer            rangeMin;
  private   Integer            rangeMax;
  private   int                binCount;
  private   boolean            rightClose;
  private   boolean            cumulative;
  private   boolean            normed;
  protected Color              baseColor;
  private   List<Color>        colors;
  protected List<Number>       data;
  private   List<List<Number>> listData;
  private List<String> names;


  private DisplayMode displayMode = DisplayMode.OVERLAP;


  public Integer getRangeMin() {
    return rangeMin;
  }

  public void setRangeMin(Integer rangeMin) {
    this.rangeMin = rangeMin;
  }

  public Integer getRangeMax() {
    return rangeMax;
  }

  public void setRangeMax(Integer rangeMax) {
    this.rangeMax = rangeMax;
  }

  public int getBinCount() {
    return binCount;
  }

  public void setBinCount(int binCount) {
    this.binCount = binCount;
  }

  public boolean getRightClose() {
    return rightClose;
  }

  public void setRightClose(boolean rightClose) {
    this.rightClose = rightClose;
  }

  public boolean getCumulative() {
    return cumulative;
  }

  public void setCumulative(boolean cumulative) {
    this.cumulative = cumulative;
  }

  public boolean getNormed() {
    return normed;
  }

  public void setNormed(boolean normed) {
    this.normed = normed;
  }

  public DisplayMode getDisplayMode() {
    return displayMode;
  }

  public void setDisplayMode(DisplayMode displayMode) {
    this.displayMode = displayMode;
  }

  public boolean getLog() {
    return getLogY();
  }

  public void setLog(boolean log) {
    setLogY(log);
  }

  @SuppressWarnings("unchecked")
  public void setColor(Object color) {
    if (color instanceof Color) {
      this.baseColor = (Color) color;
    } else if (color instanceof java.awt.Color) {
      this.baseColor = new Color((java.awt.Color) color);
    } else if (color instanceof List) {
      if (color != null) {
        List cs = (List) color;
        this.colors = new ArrayList<>(cs.size());
        for (Object c : cs) {
          if (c instanceof Color) {
            this.colors.add((Color)c);
          } else if (c instanceof java.awt.Color) {
            this.colors.add(new Color((java.awt.Color) c));
          } else {
            throw new IllegalArgumentException("setColor takes Color or List of Color");
          }
        }
      } else {
        this.colors = null;
      }
    } else {
      throw new IllegalArgumentException(
        "setColor takes Color or List of Color");
    }
  }

  public List<Color> getColors() {
    return this.colors;
  }

  public Color getColor() {
    return this.baseColor;
  }

  @SuppressWarnings("unchecked")
  public void setData(Object data) {
    List<?> list = (List<?>) data;
    if (list.size() > 0) {
      try {
        if (list.get(0) instanceof List) {
          this.listData = (List<List<Number>>) data;
        } else {
          this.data = (List<Number>) data;
        }
      } catch (Throwable x) {
        throw new IllegalArgumentException(
          "setData takes List of Number or List of List of Number");
      }
    }
  }

  public List<Number> getData() {
    return data;
  }

  public List<List<Number>> getListData() {
    return listData;
  }

  public List<String> getNames() {
        return names;
  }

  public void setNames(List<String> names) {
        this.names = names;
  }
}
