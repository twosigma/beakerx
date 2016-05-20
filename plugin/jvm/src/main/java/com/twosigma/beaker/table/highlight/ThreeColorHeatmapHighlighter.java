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

public class ThreeColorHeatmapHighlighter extends HeatmapHighlighter{
  private Number midVal;
  private Color midColor;

  public ThreeColorHeatmapHighlighter(String colName, HighlightStyle style){
    super(colName, style);
  }
  public ThreeColorHeatmapHighlighter(String colName, HighlightStyle style, Number minVal,
                               Number midVal, Number maxVal){
    super(colName, style, minVal, maxVal);
    this.midVal = midVal;
  }
  public ThreeColorHeatmapHighlighter(String colName, HighlightStyle style, Number minVal,
                               Number midVal, Number maxVal, Color minColor,
                               Color midColor, Color maxColor){
    super(colName, style, minVal, maxVal, minColor, maxColor);
    this.midVal = midVal;
    this.midColor = midColor;
  }

  public Number getMidVal() {
    return midVal;
  }

  public Color getMidColor() {
    return midColor;
  }

}