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

import com.twosigma.beakerx.chart.AbstractChart;
import com.twosigma.beakerx.chart.ChartToJson;
import com.twosigma.beakerx.chart.xychart.plotitem.ConstantBand;
import com.twosigma.beakerx.chart.xychart.plotitem.ConstantLine;
import com.twosigma.beakerx.chart.xychart.plotitem.Rasters;
import com.twosigma.beakerx.chart.xychart.plotitem.Text;
import com.twosigma.beakerx.chart.xychart.plotitem.XYGraphics;

import java.util.ArrayList;
import java.util.List;

abstract public class XYChart extends AbstractChart {

  private final List<XYGraphics> xyGraphics = new ArrayList<>();
  private final List<ConstantLine> constantLines = new ArrayList<>();
  private final List<ConstantBand> constantBands = new ArrayList<>();
  private final List<Rasters> rasters = new ArrayList<>();
  private final List<Text> texts = new ArrayList<>();
  private boolean xAutoRange = true;
  private double xLowerBound;
  private double xUpperBound;
  private boolean logX = false;
  private double xLogBase = 10;
  private Integer lodThreshold = null;
  private boolean xTickLabelsVisible = true;
  private boolean yTickLabelsVisible = true;

  public XYChart add(XYGraphics graphics) {
    graphics.setPlotType(this.getClass());
    this.xyGraphics.add(graphics);
    sendModelUpdate(ChartToJson.serializeXYGraphics(this.xyGraphics));
    return this;
  }

  public XYChart leftShift(XYGraphics graphics) {
    return add(graphics);
  }

  public List<XYGraphics> getGraphics() {
    return this.xyGraphics;
  }

  public XYChart add(ConstantLine constantLine) {
    constantLine.setPlotType(this.getClass());
    this.constantLines.add(constantLine);
    sendModelUpdate(ChartToJson.serializeConstantLines(this.constantLines));
    return this;
  }

  public XYChart leftShift(ConstantLine constantLine) {
    return add(constantLine);
  }

  public List<ConstantLine> getConstantLines() {
    return constantLines;
  }

  public XYChart add(ConstantBand constantBand) {
    this.constantBands.add(constantBand);
    sendModelUpdate(ChartToJson.serializeConstantBands(this.constantBands));
    return this;
  }

  public XYChart leftShift(ConstantBand constantBand) {
    return add(constantBand);
  }

  public List<ConstantBand> getConstantBands() {
    return constantBands;
  }

  public XYChart add(Text text) {
    text.setPlotType(this.getClass());
    this.texts.add(text);
    sendModelUpdate(ChartToJson.serializeTexts(this.texts));
    return this;
  }

  public XYChart leftShift(Text text) {
    return add(text);
  }

  public List<Text> getTexts() {
    return this.texts;
  }

  public XYChart add(Rasters raster) {
    this.rasters.add(raster);
    sendModelUpdate(ChartToJson.serializeRasters(this.rasters));
    return this;
  }

  public XYChart leftShift(Rasters raster) {
    return add(raster);
  }

  public List<Rasters> getRasters() {
    return this.rasters;
  }

  public XYChart add(List items) {
    for (Object o : items) {
      if (o instanceof Rasters) {
        add((Rasters) o);
      } else if (o instanceof XYGraphics) {
        add((XYGraphics) o);
      } else if (o instanceof ConstantLine) {
        add((ConstantLine) o);
      } else if (o instanceof ConstantBand) {
        add((ConstantBand) o);
      } else if (o instanceof Text) {
        add((Text) o);
      } else {
        super.add(items);
      }
    }
    return this;
  }

  public XYChart setXAutoRange(boolean xAutoRange) {
    this.xAutoRange = xAutoRange;
    sendModelUpdate(ChartToJson.serializeXAutoRange(this.xAutoRange));
    return this;
  }

  public XYChart setxAutoRange(boolean xAutoRange) {
    return this.setXAutoRange(xAutoRange);
  }

  public Boolean getXAutoRange() {
    return this.xAutoRange;
  }

  public Boolean getxAutoRange() {
    return getXAutoRange();
  }

  public XYChart setXBound(double lower, double upper) {
    this.xAutoRange = false;
    this.xLowerBound = lower;
    this.xUpperBound = upper;
    sendModelUpdate(ChartToJson.serializeXBound(this));
    return this;
  }

  public XYChart setxBound(double lower, double upper) {
    return setXBound(lower, upper);
  }

  public XYChart setXBound(List<Number> bound) {
    if (bound.size() != 2) {
      throw new IllegalArgumentException("to set the x bound, the list needs to be of size=2");
    }

    Number n0 = bound.get(0);
    Number n1 = bound.get(1);
    setXBound(n0.doubleValue(), n1.doubleValue());
    return this;
  }

  public XYChart setxBound(List<Number> bound) {
    return this.setXBound(bound);
  }

  public Double getXLowerBound() {
    return this.xLowerBound;
  }

  public Double getxLowerBound() {
    return getXLowerBound();
  }

  public Double getXUpperBound() {
    return this.xUpperBound;
  }

  public Double getxUpperBound() {
    return getXUpperBound();
  }

  public XYChart setLogX(boolean logX) {
    this.logX = logX;
    sendModelUpdate(ChartToJson.serializeLogX(this.logX));
    return this;
  }

  public Boolean getLogX() {
    return this.logX;
  }

  public Double getXLogBase() {
    return xLogBase;
  }

  public Double getxLogBase() {
    return getXLogBase();
  }

  public XYChart setXLogBase(double xLogBase) {
    this.xLogBase = xLogBase;
    sendModelUpdate(ChartToJson.serializeXLogBase(this.xLogBase));
    return this;
  }

  public XYChart setxLogBase(double xLogBase) {
    return this.setXLogBase(xLogBase);
  }

  public Integer getLodThreshold() {
    return lodThreshold;
  }

  public void setLodThreshold(Integer lodThreshold) {
    this.lodThreshold = lodThreshold;
    sendModelUpdate(ChartToJson.serializeLodThreshold(this.lodThreshold));
  }

  public boolean isxTickLabelsVisible() {
    return xTickLabelsVisible;
  }

  public void setxTickLabelsVisible(boolean xTickLabelsVisible) {
    this.xTickLabelsVisible = xTickLabelsVisible;
    sendModelUpdate(ChartToJson.serializeXTickLabelsVisible(this.xTickLabelsVisible));
  }

  public void setXTickLabelsVisible(boolean xTickLabelsVisible) {
    setxTickLabelsVisible(xTickLabelsVisible);
  }

  public boolean isyTickLabelsVisible() {
    return yTickLabelsVisible;
  }

  public void setyTickLabelsVisible(boolean yTickLabelsVisible) {
    this.yTickLabelsVisible = yTickLabelsVisible;
    sendModelUpdate(ChartToJson.serializeYTickLabelsVisible(this.yTickLabelsVisible));
  }
}
