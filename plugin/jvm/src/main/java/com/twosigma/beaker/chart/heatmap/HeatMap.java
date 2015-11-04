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

package com.twosigma.beaker.chart.heatmap;

import com.twosigma.beaker.AbstractChart;
import com.twosigma.beaker.chart.GradientColor;
import com.twosigma.beaker.chart.legend.LegendLayout;
import com.twosigma.beaker.chart.legend.LegendPosition;

public class HeatMap extends AbstractChart {
  private Number[][] data;
  private GradientColor color = GradientColor.BROWN_RED_YELLOW;

  public HeatMap() {
    setXLowerMargin(0);
    setXUpperMargin(0);
    setYLowerMargin(0);
    setYUpperMargin(0);
    setLegendLayout(LegendLayout.HORIZONTAL);
    setLegendPosition(LegendPosition.BOTTOM_RIGHT);
  }

  public void setColor(GradientColor color) {
    this.color = color;
  }

  public GradientColor getColor() {
    return color;
  }

  public Number[][] getData() {
    return data;
  }

  public void setData(Number[][] data) {
    this.data = data;
  }
}
