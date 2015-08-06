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

package com.twosigma.beaker.chart.xychart;

import com.twosigma.beaker.chart.Filter;
import com.twosigma.beaker.chart.xychart.plotitem.ConstantBand;
import com.twosigma.beaker.chart.xychart.plotitem.ConstantLine;
import com.twosigma.beaker.chart.xychart.plotitem.Crosshair;
import com.twosigma.beaker.chart.xychart.plotitem.Text;
import com.twosigma.beaker.chart.xychart.plotitem.XYGraphics;
import com.twosigma.beaker.chart.xychart.plotitem.YAxis;
import java.util.ArrayList;
import java.util.List;
import java.util.TimeZone;

abstract public class XYChart {
  private int initWidth = 640;
  private int initHeight = 480;
  private String title;
  private String xLabel;
  private boolean showLegend = false;
  private boolean useToolTip = true;
  private final List<XYGraphics> xyGraphics = new ArrayList<>();
  private final List<ConstantLine> constantLines = new ArrayList<>();
  private final List<ConstantBand> constantBands = new ArrayList<>();
  private final List<Text> texts = new ArrayList<>();
  private final YAxis yAxis = new YAxis();
  private final List<YAxis> yAxes = new ArrayList<>();
  private double xLowerMargin = 0.05;
  private double xUpperMargin = 0.05;
  private boolean xAutoRange = true;
  private double xLowerBound;
  private double xUpperBound;
  private boolean logX = false;
  protected TimeZone timeZone;
  private Crosshair crosshair;
  private Integer lodThreshold = null;

  protected XYChart() {
    yAxes.add(yAxis);
  }

  public XYChart setInitWidth(int w) {
    this.initWidth = w;
    return this;
  }

  public Integer getInitWidth() {
    return this.initWidth;
  }

  public XYChart setInitHeight(int h) {
    this.initHeight = h;
    return this;
  }

  public Integer getInitHeight() {
    return this.initHeight;
  }

  public XYChart setTitle(String title) {
    this.title = title;
    return this;
  }

  public String getTitle() {
    return this.title;
  }

  public XYChart setXLabel(String xLabel) {
    this.xLabel = xLabel;
    return this;
  }

  public XYChart setxLabel(String xLabel) {
    this.xLabel = xLabel;
    return this;
  }

  public String getXLabel() {
    return this.xLabel;
  }

  public XYChart setYLabel(String yLabel) {
    yAxis.setLabel(yLabel);
    return this;
  }

  public XYChart setyLabel(String yLabel) {
    yAxis.setLabel(yLabel);
    return this;
  }

  public String getYLabel() {
    return yAxis.getLabel();
  }

  public XYChart setShowLegend(boolean showLegend) {
    this.showLegend = showLegend;
    return this;
  }

  public Boolean getShowLegend() {
    return this.showLegend;
  }

  public XYChart setUseToolTip(boolean useToolTip) {
    this.useToolTip = useToolTip;
    return this;
  }

  public Boolean getUseToolTip() {
    return this.useToolTip;
  }

  public XYChart add(XYGraphics graphics) {
    this.xyGraphics.add(graphics);
    return this;
  }

  public XYChart leftShift(XYGraphics graphics) {
    return add(graphics);
  }

  public List<XYGraphics> getGraphics() {
    return this.xyGraphics;
  }

  public XYChart add(ConstantLine constantLine) {
    this.constantLines.add(constantLine);
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
    return this;
  }

  public XYChart leftShift(ConstantBand constantBand) {
    return add(constantBand);
  }

  public List<ConstantBand> getConstantBands() {
    return constantBands;
  }

  public XYChart add(Text text) {
    this.texts.add(text);
    return this;
  }

  public XYChart leftShift(Text text) {
    return add(text);
  }

  public List<Text> getTexts() {
    return this.texts;
  }

  public XYChart add(YAxis yAxis) {
    this.yAxes.add(yAxis);
    return this;
  }

  public XYChart leftShift(YAxis yAxis) {
    return add(yAxis);
  }

  public List<YAxis> getYAxes() {
    return this.yAxes;
  }

  public XYChart add(List items) {
    for (Object o : items) {
      if (o instanceof XYGraphics) {
        add((XYGraphics) o);
      } else if (o instanceof ConstantLine) {
        add((ConstantLine) o);
      } else if (o instanceof ConstantBand) {
        add((ConstantBand) o);
      } else if (o instanceof Text) {
        add((Text) o);
      } else if (o instanceof YAxis) {
        add((YAxis) o);
      }
    }
    return this;
  }

  public XYChart leftShift(List items) {
    return add(items);
  }


  public XYChart setXAutoRange(boolean xAutoRange) {
    this.xAutoRange = xAutoRange;
    return this;
  }

  public XYChart setxAutoRange(boolean xAutoRange) {
    return this.setXAutoRange(xAutoRange);
  }

  public Boolean getXAutoRange() {
    return this.xAutoRange;
  }

  public XYChart setXLowerMargin(double margin) {
    this.xLowerMargin = margin;
    return this;
  }

  public XYChart setxLowerMargin(double margin) {
    this.xLowerMargin = margin;
    return this;
  }

  public double getXLowerMargin() {
    return this.xLowerMargin;
  }

  public XYChart setXUpperMargin(double margin) {
    this.xUpperMargin = margin;
    return this;
  }

  public XYChart setxUpperMargin(double margin) {
    this.xUpperMargin = margin;
    return this;
  }

  public double getXUpperMargin() {
    return this.xUpperMargin;
  }

  public XYChart setXBound(double lower, double upper) {
    this.xAutoRange = false;
    this.xLowerBound = lower;
    this.xUpperBound = upper;
    return this;
  }

  public XYChart setXBound(List bound) {
    if (bound.size() != 2) {
      throw new IllegalArgumentException("to set the x bound, the list needs to be of size=2");
    }
    if (!(bound.get(0) instanceof Number) || !(bound.get(1) instanceof Number)) {
      throw new IllegalArgumentException("the elements in the list needs to be numbers");
    }
    Number n0 = (Number) bound.get(0);
    Number n1 = (Number) bound.get(1);
    setXBound(n0.doubleValue(), n1.doubleValue());
    return this;
  }

  public XYChart setxBound(List bound) {
    return this.setXBound(bound);
  }

  public Double getXLowerBound() {
    return this.xLowerBound;
  }

  public Double getXUpperBound() {
    return this.xUpperBound;
  }

  public XYChart setYAutoRange(boolean yAutoRange) {
    this.xAutoRange = yAutoRange;
    return this;
  }

  public XYChart setyAutoRange(boolean yAutoRange) {
    return this.setYAutoRange(yAutoRange);
  }

  public Boolean getYAutoRange() {
    return this.yAxis.getAutoRange();
  }

  public XYChart setYAutoRangeIncludesZero(boolean yAutoRangeIncludesZero) {
    this.yAxis.setAutoRangeIncludesZero(yAutoRangeIncludesZero);
    return this;
  }

  public XYChart setyAutoRangeIncludesZero(boolean yAutoRangeIncludesZero) {
    return this.setYAutoRangeIncludesZero(yAutoRangeIncludesZero);
  }

  public Boolean getYAutoRangeIncludesZero() {
    return this.yAxis.getAutoRangeIncludesZero();
  }

  public XYChart setYLowerMargin(double margin) {
    this.yAxis.setLowerMargin(margin);
    return this;
  }

  public XYChart setyLowerMargin(double margin) {
    this.yAxis.setLowerMargin(margin);
    return this;
  }

  public double getYLowerMargin() {
    return this.yAxis.getLowerMargin();
  }

  public XYChart setYUpperMargin(double margin) {
    this.yAxis.setUpperMargin(margin);
    return this;
  }

  public XYChart setyUpperMargin(double margin) {
    this.yAxis.setUpperMargin(margin);
    return this;
  }

  public double getYUpperMargin() {
    return this.yAxis.getUpperMargin();
  }

  public XYChart setYBound(double lower, double upper) {
    this.yAxis.setAutoRange(false);
    this.yAxis.setBound(lower, upper);
    return this;
  }

  public XYChart setYBound(List bound) {
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

  public XYChart setyBound(List bound) {
    return this.setYBound(bound);
  }

  public Double getYLowerBound() {
    return this.yAxis.getLowerBound();
  }

  public Double getYUpperBound() {
    return this.yAxis.getUpperBound();
  }

  protected XYChart setLogX(boolean logX) {
    this.logX = logX;
    return this;
  }

  public Boolean getLogX() {
    return this.logX;
  }

  public XYChart setLogY(boolean logY) {
    this.yAxis.setLog(logY);
    return this;
  }

  public Boolean getLogY() {
    return this.yAxis.getLog();
  }

  protected XYChart setTimeZone(TimeZone timeZone) {
    this.timeZone = timeZone;
    return this;
  }

  public TimeZone getTimeZone() {
    return this.timeZone;
  }

  public XYChart setCrosshair(Crosshair crosshair) {
    this.crosshair = crosshair;
    return this;
  }

  public Crosshair getCrosshair() {
    return this.crosshair;
  }


  public Integer getLodThreshold() {
    return lodThreshold;
  }

  public void setLodThreshold(Integer lodThreshold) {
    this.lodThreshold = lodThreshold;
  }
}
