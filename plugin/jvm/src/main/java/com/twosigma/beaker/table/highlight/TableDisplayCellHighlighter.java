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

public class TableDisplayCellHighlighter {
  public static HighlightType FULL_ROW      = HighlightType.FULL_ROW;
  public static HighlightType SINGLE_COLUMN = HighlightType.SINGLE_COLUMN;
  private static HighlightType defaultType  = HighlightType.FULL_ROW;

  public static TableDisplayCellHighlighter getHeatmapHighlighter(String columnToUse) {
    return new HeatmapHighlighter(columnToUse, defaultType);
  }

  public static TableDisplayCellHighlighter getHeatmapHighlighter(String columnToUse, HighlightType style) {
    return new HeatmapHighlighter(columnToUse, defaultType);
  }

  public static TableDisplayCellHighlighter getHeatmapHighlighter(String columnToUse, HighlightType style,
                                                                  Number minVal, Number maxVal) {
    return new HeatmapHighlighter(columnToUse, style, minVal, maxVal);
  }

  public static TableDisplayCellHighlighter getHeatmapHighlighter(String columnToUse, HighlightType style,
                                                                  Number minVal, Number maxVal,
                                                                  Color minColor, Color maxColor) {
    return new HeatmapHighlighter(columnToUse, style, minVal, maxVal, minColor, maxColor);
  }

  public static TableDisplayCellHighlighter getHeatmapHighlighter(String columnToUse,
                                                                  Number minVal, Number maxVal) {
    return new HeatmapHighlighter(columnToUse, defaultType, minVal, maxVal);
  }

  public static TableDisplayCellHighlighter getHeatmapHighlighter(String columnToUse,
                                                                  Number minVal, Number maxVal,
                                                                  Color minColor, Color maxColor) {
    return new HeatmapHighlighter(columnToUse, defaultType, minVal, maxVal, minColor, maxColor);
  }

}
