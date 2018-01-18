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

package com.twosigma.beakerx.chart;

import com.twosigma.beakerx.chart.xychart.plotitem.Crosshair;
import com.twosigma.beakerx.chart.xychart.plotitem.YAxis;

import java.util.ArrayList;
import java.util.List;
import java.util.TimeZone;

public abstract class AbstractChart extends Chart {
  private String xLabel;
  protected final YAxis yAxis = new YAxis();
  private final List<YAxis> yAxes = new ArrayList<>();
  private double xLowerMargin = 0.05;
  private double xUpperMargin = 0.05;
  protected TimeZone timeZone;
  private Crosshair crosshair;
  private boolean omitCheckboxes = false;

  protected AbstractChart() {
    yAxes.add(yAxis);
  }

  public AbstractChart setXLabel(String xLabel) {
    this.xLabel = xLabel;
    sendModelUpdate(ChartToJson.serializeXLabel(this.xLabel));
    return this;
  }

  public AbstractChart setxLabel(String xLabel) {
    return setXLabel(xLabel);
  }

  public String getXLabel() {
    return this.xLabel;
  }

  public String getxLabel() {
    return getXLabel();
  }

  public AbstractChart setYLabel(String yLabel) {
    yAxis.setLabel(yLabel);
    sendModelUpdate(ChartToJson.serializeYLabel(this.yAxis.getLabel()));
    return this;
  }

  public AbstractChart setyLabel(String yLabel) {
    setYLabel(yLabel);
    return this;
  }

  public String getYLabel() {
    return yAxis.getLabel();
  }

  public AbstractChart add(YAxis yAxis) {
    this.yAxes.add(yAxis);
    sendModelUpdate(ChartToJson.serializeYAxes(this.yAxes));
    return this;
  }

  public AbstractChart leftShift(YAxis yAxis) {
    return add(yAxis);
  }

  public List<YAxis> getYAxes() {
    return this.yAxes;
  }

  public AbstractChart add(List items) {
    for (Object o : items) {
      if (o instanceof YAxis) {
        add((YAxis) o);
      }
    }
    return this;
  }

  public AbstractChart leftShift(List items) {
    return add(items);
  }

  public AbstractChart setXLowerMargin(double margin) {
    this.xLowerMargin = margin;
    sendModelUpdate(ChartToJson.serializeXLowerMargin(this.xLowerMargin));
    return this;
  }

  public AbstractChart setxLowerMargin(double margin) {
    return setXLowerMargin(margin);
  }

  public double getXLowerMargin() {
    return this.xLowerMargin;
  }

  public double getxLowerMargin() {
    return getXLowerMargin();
  }

  public AbstractChart setXUpperMargin(double margin) {
    this.xUpperMargin = margin;
    sendModelUpdate(ChartToJson.serializeXUpperMargin(this.xUpperMargin));
    return this;
  }

  public AbstractChart setxUpperMargin(double margin) {
    return setXUpperMargin(margin);
  }

  public double getXUpperMargin() {
    return this.xUpperMargin;
  }

  public double getxUpperMargin() {
    return getXUpperMargin();
  }

  public AbstractChart setyAutoRange(boolean yAutoRange) {
    this.yAxis.setAutoRange(yAutoRange);
    sendModelUpdate(ChartToJson.serializeAutoRange(this.yAxis.getAutoRange()));
    return this;
  }

  public AbstractChart setYAutoRange(boolean yAutoRange) {
    return setyAutoRange(yAutoRange);
  }

  public Boolean getyAutoRange() {
    return this.yAxis.getAutoRange();
  }

  public Boolean getYAutoRange() {
    return getyAutoRange();
  }

  public AbstractChart setYAutoRangeIncludesZero(boolean yAutoRangeIncludesZero) {
    this.yAxis.setAutoRangeIncludesZero(yAutoRangeIncludesZero);
    sendModelUpdate(ChartToJson.serializeAutoRangeIncludesZero(this.yAxis.getAutoRangeIncludesZero()));
    return this;
  }

  public AbstractChart setyAutoRangeIncludesZero(boolean yAutoRangeIncludesZero) {
    return this.setYAutoRangeIncludesZero(yAutoRangeIncludesZero);
  }

  public Boolean getYAutoRangeIncludesZero() {
    return this.yAxis.getAutoRangeIncludesZero();
  }

  public AbstractChart setYLowerMargin(double margin) {
    return setyLowerMargin(margin);
  }

  public AbstractChart setyLowerMargin(double margin) {
    this.yAxis.setLowerMargin(margin);
    sendModelUpdate(ChartToJson.serializeYLowerMargin(this.yAxis.getLowerMargin()));
    return this;
  }

  public double getYLowerMargin() {
    return this.yAxis.getLowerMargin();
  }

  public AbstractChart setYUpperMargin(double margin) {
    return setyUpperMargin(margin);
  }

  public AbstractChart setyUpperMargin(double margin) {
    this.yAxis.setUpperMargin(margin);
    sendModelUpdate(ChartToJson.serializeUpperMargin(this.yAxis.getUpperMargin()));
    return this;
  }

  public double getYUpperMargin() {
    return this.yAxis.getUpperMargin();
  }

  public AbstractChart setYBound(double lower, double upper) {
    this.yAxis.setAutoRange(false);
    this.yAxis.setBound(lower, upper);
    sendModelUpdate(ChartToJson.serializeYBound(this.yAxis));
    return this;
  }

  public AbstractChart setYBound(List<Number> bound) {
    if (bound.size() != 2) {
      throw new IllegalArgumentException("to set the y bound, the list needs to be of size=2");
    }

    Number n0 = bound.get(0);
    Number n1 = bound.get(1);
    setYBound(n0.doubleValue(), n1.doubleValue());
    return this;
  }

  public AbstractChart setyBound(List<Number> bound) {
    return this.setYBound(bound);
  }

  public Double getYLowerBound() {
    return this.yAxis.getLowerBound();
  }

  public Double getYUpperBound() {
    return this.yAxis.getUpperBound();
  }

  public AbstractChart setLogY(boolean logY) {
    this.yAxis.setLog(logY);
    sendModelUpdate(ChartToJson.serializeLogY(this.yAxis.getLog()));
    return this;
  }

  public Boolean getLogY() {
    return this.yAxis.getLog();
  }

  public AbstractChart setYLogBase(double yLogBase) {
    this.yAxis.setLogBase(yLogBase);
    sendModel();
    return this;
  }

  public AbstractChart setyLogBase(double yLogBase) {
    return this.setYLogBase(yLogBase);
  }

  public Double getYLogBase() {
    return this.yAxis.getLogBase();
  }

  protected AbstractChart setTimeZone(TimeZone timeZone) {
    this.timeZone = timeZone;
    sendModelUpdate(ChartToJson.serializeTimeZone(this.timeZone));
    return this;
  }

  public TimeZone getTimeZone() {
    return this.timeZone;
  }

  public AbstractChart setCrosshair(Crosshair crosshair) {
    this.crosshair = crosshair;
    sendModelUpdate(ChartToJson.serializeCrosshair(this.crosshair));
    return this;
  }

  public Crosshair getCrosshair() {
    return this.crosshair;
  }

  public Boolean getOmitCheckboxes() {
    return omitCheckboxes;
  }

  public AbstractChart setOmitCheckboxes(boolean omitCheckboxes) {
    this.omitCheckboxes = omitCheckboxes;
    sendModelUpdate(ChartToJson.serializeOmitCheckboxes(this.omitCheckboxes));
    return this;
  }

}
