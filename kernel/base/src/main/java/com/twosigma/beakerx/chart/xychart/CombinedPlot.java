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

package com.twosigma.beakerx.chart.xychart;

import com.twosigma.beakerx.chart.ChartDetails;
import com.twosigma.beakerx.chart.ChartToJson;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.twosigma.beakerx.widgets.chart.BeakerxPlot.MODEL_NAME_VALUE;
import static com.twosigma.beakerx.widgets.chart.BeakerxPlot.VIEW_NAME_VALUE;

/**
 * CombinedPlot
 *
 */
public class CombinedPlot extends ChartDetails {
  private int initWidth = 640;
  private int initHeight = 480;
  private String title;
  private String xLabel;
  private List<XYChart> subplots = new ArrayList<>();
  private List<Integer> weights = new ArrayList<>();
  private boolean xTickLabelsVisible = true;
  private boolean yTickLabelsVisible = true;

  public CombinedPlot(){
    super();
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

  public CombinedPlot setInitWidth(int w) {
    this.initWidth = w;
    return this;
  }

  public Integer getInitWidth() {
    return this.initWidth;
  }

  public CombinedPlot setInitHeight(int h) {
    this.initHeight = h;
    return this;
  }

  public Integer getInitHeight() {
    return this.initHeight;
  }

  public CombinedPlot setTitle(String title) {
    this.title = title;
    return this;
  }

  public String getTitle() {
    return this.title;
  }

  public CombinedPlot setXLabel(String xLabel) {
    this.xLabel = xLabel;
    return this;
  }

  public CombinedPlot setxLabel(String xLabel) {
    this.xLabel = xLabel;
    return this;
  }

  public String getXLabel() {
    return this.xLabel;
  }

  public String getxLabel() {
    return getXLabel();
  }

  public CombinedPlot add(XYChart plot, int weight) {
    this.subplots.add(plot);
    this.weights.add(weight);
    sendModel();
    return this;
  }

  public CombinedPlot add(XYChart plot) {
    this.subplots.add(plot);
    this.weights.add(1);
    return this;
  }

  public CombinedPlot leftShift(Object obj) {
    if (obj instanceof XYChart) {
      this.add((XYChart) obj, 1);
    } else if (obj instanceof List && ((List) obj).size() == 2) {
      List list = (List) obj;
      XYChart plot = (XYChart) list.get(0);
      int weight = ((Number) list.get(1)).intValue();
      this.add(plot, weight);
    } else {
      throw new IllegalArgumentException(
          "leftShift takes XYChart or List that hold a XYChart and weight");
    }
    return this;
  }

  public List<XYChart> getSubplots() {
    return this.subplots;
  }

  public List<Integer> getWeights() {
    return this.weights;
  }

  public boolean isyTickLabelsVisible() {
    return yTickLabelsVisible;
  }

  public void setyTickLabelsVisible(boolean yTickLabelsVisible) {
    this.yTickLabelsVisible = yTickLabelsVisible;
  }

  public boolean isxTickLabelsVisible() {
    return xTickLabelsVisible;
  }

  public void setxTickLabelsVisible(boolean xTickLabelsVisible) {
    this.xTickLabelsVisible = xTickLabelsVisible;
  }

  public void setXTickLabelsVisible(boolean xTickLabelsVisible) {
    setxTickLabelsVisible(xTickLabelsVisible);
  }

  @Override
  protected Map serializeToJsonObject() {
    return ChartToJson.toJson(this);
  }
  @Override
  protected Map serializeToJsonObject(Object item) {
    return ChartToJson.toJson(item);
  }
}