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

package com.twosigma.beakerx.chart.histogram;

import com.twosigma.beakerx.chart.AbstractChart;
import com.twosigma.beakerx.chart.ChartToJson;
import com.twosigma.beakerx.chart.Color;
import com.twosigma.beakerx.chart.ListColorConverter;

import java.util.List;

import static com.twosigma.beakerx.widget.BeakerxPlot.MODEL_NAME_VALUE;
import static com.twosigma.beakerx.widget.BeakerxPlot.VIEW_NAME_VALUE;

public class Histogram extends AbstractChart {

  public enum DisplayMode {
    OVERLAP,
    STACK,
    SIDE_BY_SIDE
  }

  private Integer rangeMin;
  private Integer rangeMax;
  private int binCount;
  private boolean rightClose;
  private boolean cumulative;
  private boolean normed;
  protected Color baseColor;
  private List<Color> colors;
  private List<Number> data;
  private List<List<Number>> listData;
  private List<String> names;

  private DisplayMode displayMode = DisplayMode.OVERLAP;

  public Histogram() {
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
    sendModelUpdate(ChartToJson.serializeBinCount(this.binCount));
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
    sendModelUpdate(ChartToJson.serializeCumulative(this.cumulative));
  }

  public boolean getNormed() {
    return normed;
  }

  public void setNormed(boolean normed) {
    this.normed = normed;
    sendModelUpdate(ChartToJson.serializeNormed(this.normed));
  }

  public DisplayMode getDisplayMode() {
    return displayMode;
  }

  public void setDisplayMode(DisplayMode displayMode) {
    this.displayMode = displayMode;
    sendModelUpdate(ChartToJson.serializeDisplayMode(this.displayMode));
  }

  public boolean getLog() {
    return getLogY();
  }

  public void setLog(boolean log) {
    setLogY(log);
  }

  @Override
  public AbstractChart setLogY(boolean logY) {
    this.yAxis.setLog(logY);
    sendModelUpdate(ChartToJson.serializeHistogramLog(this.yAxis.getLog()));
    return this;
  }

  public void setColor(Color color) {
    this.baseColor = color;
    sendModelUpdate(ChartToJson.serializeColor(this.baseColor));
  }

  public void setColor(java.awt.Color color) {
    setColor(new Color(color));
  }

  public void setColor(List<Object> colorList) {
    setColors(colorList);
  }

  private void setColors(List<Object> colorList) {
    if (colorList != null) {
      this.colors = ListColorConverter.convert(colorList);
      sendModelUpdate(ChartToJson.serializeColors(this.colors));
    } else {
      this.colors = null;
    }
  }

  public List<Color> getColors() {
    return this.colors;
  }

  public Color getColor() {
    return this.baseColor;
  }

  @SuppressWarnings("unchecked")
  public void setData(List<?> data) {
    if (data.size() > 0) {
      try {
        if (data.get(0) instanceof List) {
          this.listData = (List<List<Number>>) data;
          sendModelUpdate(ChartToJson.serializeHistogramListData(this.listData));
        } else {
          this.data = (List<Number>) data;
          sendModelUpdate(ChartToJson.serializeHistogramData(this.data));
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
    sendModelUpdate(ChartToJson.serializeHistogramNames(this.names));
  }
}
