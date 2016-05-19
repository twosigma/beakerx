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
package com.twosigma.beaker.table.highlight;

import com.twosigma.beaker.chart.Color;

public class HeatmapHighlighter extends TableDisplayCellHighlighter {
  private String colName;
  private HighlightType style;
  private Number minVal;
  private Number maxVal;
  private Color minColor;
  private Color maxColor;

  HeatmapHighlighter(String colName, HighlightType style) {
    this.colName = colName;
    this.style = style;
  }

  HeatmapHighlighter(String colName, HighlightType style, Number minVal, Number maxVal) {
    this.colName = colName;
    this.style = style;
    this.minVal = minVal;
    this.maxVal = maxVal;
  }

  HeatmapHighlighter(String colName, HighlightType style, Number minVal, Number maxVal, Color minColor, Color maxColor) {
    this.colName = colName;
    this.style = style;
    this.minVal = minVal;
    this.maxVal = maxVal;
    this.minColor = minColor;
    this.maxColor = maxColor;
  }

  public String getColName() {
    return colName;
  }

  public HighlightType getStyle() {
    return style;
  }

  public Number getMinVal() {
    return minVal;
  }

  public Number getMaxVal() {
    return maxVal;
  }

  public Color getMinColor() {
    return minColor;
  }

  public Color getMaxColor() {
    return maxColor;
  }
}