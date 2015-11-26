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

package com.twosigma.beaker;

import com.twosigma.beaker.chart.legend.LegendLayout;
import com.twosigma.beaker.chart.legend.LegendPosition;
import com.twosigma.beaker.chart.xychart.plotitem.Crosshair;
import com.twosigma.beaker.chart.xychart.plotitem.YAxis;

import java.util.ArrayList;
import java.util.List;
import java.util.Observable;
import java.util.TimeZone;

public abstract class AbstractChart extends Observable{
  private int initWidth = 640;
  private int initHeight = 480;
  private String title;
  private String xLabel;
  private Boolean showLegend;
  private boolean useToolTip = true;
  private final YAxis yAxis = new YAxis();
  private final List<YAxis> yAxes = new ArrayList<>();
  private double xLowerMargin = 0.05;
  private double xUpperMargin = 0.05;
  protected TimeZone timeZone;
  private Crosshair crosshair;
  private LegendPosition legendPosition = new LegendPosition(LegendPosition.Position.TOP_RIGHT);
  private boolean omitCheckboxes = false;
  private LegendLayout legendLayout = LegendLayout.VERTICAL;

  protected AbstractChart() {
    yAxes.add(yAxis);
  }

  public AbstractChart setInitWidth(int w) {
    this.initWidth = w;
    return this;
  }

  public Integer getInitWidth() {
    return this.initWidth;
  }

  public AbstractChart setInitHeight(int h) {
    this.initHeight = h;
    return this;
  }

  public Integer getInitHeight() {
    return this.initHeight;
  }

  public AbstractChart setTitle(String title) {
    this.title = title;
    return this;
  }

  public String getTitle() {
    return this.title;
  }

  public AbstractChart setXLabel(String xLabel) {
    this.xLabel = xLabel;
    return this;
  }

  public AbstractChart setxLabel(String xLabel) {
    this.xLabel = xLabel;
    return this;
  }

  public String getXLabel() {
    return this.xLabel;
  }

  public AbstractChart setYLabel(String yLabel) {
    yAxis.setLabel(yLabel);
    return this;
  }

  public AbstractChart setyLabel(String yLabel) {
    yAxis.setLabel(yLabel);
    return this;
  }

  public String getYLabel() {
    return yAxis.getLabel();
  }

  public AbstractChart setShowLegend(Boolean showLegend) {
    this.showLegend = showLegend;
    return this;
  }

  public Boolean getShowLegend() {
    return this.showLegend;
  }

  public AbstractChart setUseToolTip(boolean useToolTip) {
    this.useToolTip = useToolTip;
    return this;
  }

  public Boolean getUseToolTip() {
    return this.useToolTip;
  }

  public AbstractChart add(YAxis yAxis) {
    this.yAxes.add(yAxis);
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
    return this;
  }

  public AbstractChart setxLowerMargin(double margin) {
    this.xLowerMargin = margin;
    return this;
  }

  public double getXLowerMargin() {
    return this.xLowerMargin;
  }

  public AbstractChart setXUpperMargin(double margin) {
    this.xUpperMargin = margin;
    return this;
  }

  public AbstractChart setxUpperMargin(double margin) {
    this.xUpperMargin = margin;
    return this;
  }

  public double getXUpperMargin() {
    return this.xUpperMargin;
  }

  public AbstractChart setyAutoRange(boolean yAutoRange) {
    this.yAxis.setAutoRange(yAutoRange);
    return this;
  }

  public Boolean getYAutoRange() {
    return this.yAxis.getAutoRange();
  }

  public AbstractChart setYAutoRangeIncludesZero(boolean yAutoRangeIncludesZero) {
    this.yAxis.setAutoRangeIncludesZero(yAutoRangeIncludesZero);
    return this;
  }

  public AbstractChart setyAutoRangeIncludesZero(boolean yAutoRangeIncludesZero) {
    return this.setYAutoRangeIncludesZero(yAutoRangeIncludesZero);
  }

  public Boolean getYAutoRangeIncludesZero() {
    return this.yAxis.getAutoRangeIncludesZero();
  }

  public AbstractChart setYLowerMargin(double margin) {
    this.yAxis.setLowerMargin(margin);
    return this;
  }

  public AbstractChart setyLowerMargin(double margin) {
    this.yAxis.setLowerMargin(margin);
    return this;
  }

  public double getYLowerMargin() {
    return this.yAxis.getLowerMargin();
  }

  public AbstractChart setYUpperMargin(double margin) {
    this.yAxis.setUpperMargin(margin);
    return this;
  }

  public AbstractChart setyUpperMargin(double margin) {
    this.yAxis.setUpperMargin(margin);
    return this;
  }

  public double getYUpperMargin() {
    return this.yAxis.getUpperMargin();
  }

  public AbstractChart setYBound(double lower, double upper) {
    this.yAxis.setAutoRange(false);
    this.yAxis.setBound(lower, upper);
    return this;
  }

  public AbstractChart setYBound(List bound) {
    if (bound.size() != 2) {
      throw new IllegalArgumentException("to set the y bound, the list needs to be of size=2");
    }
    if (!(bound.get(0) instanceof Number) || !(bound.get(1) instanceof Number)) {
      throw new IllegalArgumentException("the elements in the list needs to be numbers");
    }
    Number n0 = (Number) bound.get(0);
    Number n1 = (Number) bound.get(1);
    setYBound(n0.doubleValue(), n1.doubleValue());
    return this;
  }

  public AbstractChart setyBound(List bound) {
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
    return this;
  }

  public Boolean getLogY() {
    return this.yAxis.getLog();
  }

  public AbstractChart setYLogBase(double yLogBase) {
    this.yAxis.setLogBase(yLogBase);
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
    return this;
  }

  public TimeZone getTimeZone() {
    return this.timeZone;
  }

  public AbstractChart setCrosshair(Crosshair crosshair) {
    this.crosshair = crosshair;
    return this;
  }

  public Crosshair getCrosshair() {
    return this.crosshair;
  }

  public LegendPosition getLegendPosition() {
    return legendPosition;
  }

  public AbstractChart setLegendPosition(LegendPosition legendPosition) {
    this.legendPosition = legendPosition;
    return this;
  }

  public LegendLayout getLegendLayout() {
    return legendLayout;
  }

  public AbstractChart setLegendLayout(LegendLayout legendLayout) {
    this.legendLayout = legendLayout;
    return this;
  }

  public Boolean getOmitCheckboxes() {
    return omitCheckboxes;
  }

  public AbstractChart setOmitCheckboxes(boolean omitCheckboxes) {
    this.omitCheckboxes = omitCheckboxes;
    return this;
  }

  @Override
  public synchronized void setChanged() {
    super.setChanged();
  }
}
