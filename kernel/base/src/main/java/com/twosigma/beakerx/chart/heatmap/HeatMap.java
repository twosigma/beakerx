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

package com.twosigma.beakerx.chart.heatmap;

import com.twosigma.beakerx.chart.AbstractChart;
import com.twosigma.beakerx.chart.ChartToJson;
import com.twosigma.beakerx.chart.GradientColor;
import com.twosigma.beakerx.chart.legend.LegendLayout;
import com.twosigma.beakerx.chart.legend.LegendPosition;

import static com.twosigma.beakerx.widget.chart.BeakerxPlot.MODEL_NAME_VALUE;
import static com.twosigma.beakerx.widget.chart.BeakerxPlot.VIEW_NAME_VALUE;

public class HeatMap extends AbstractChart {

  private Number[][] data;
  private GradientColor color = GradientColor.BROWN_RED_YELLOW;

  public HeatMap() {
    super();
    setXLowerMargin(0);
    setXUpperMargin(0);
    setYLowerMargin(0);
    setYUpperMargin(0);
    setLegendLayout(LegendLayout.HORIZONTAL);
    setLegendPosition(LegendPosition.BOTTOM_RIGHT);
    openComm();
  }

  @Override
  public String getModelNameValue() {
    return MODEL_NAME_VALUE;
  }

  @Override
  public String getViewNameValue() {
    return VIEW_NAME_VALUE;
  }


  public void setColor(GradientColor color) {
    this.color = color;
    sendModelUpdate(ChartToJson.serializeHeatmapGradientColor(this.color));
  }

  public GradientColor getColor() {
    return color;
  }

  public Number[][] getData() {
    return data;
  }

  public void setData(Number[][] data) {
    this.data = data;
    sendModelUpdate(ChartToJson.serializeHeatmapData(this.data));
  }
}
