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

import com.twosigma.beaker.chart.AbstractChart;
import com.twosigma.beaker.chart.xychart.plotitem.ConstantBand;
import com.twosigma.beaker.chart.xychart.plotitem.ConstantLine;
import com.twosigma.beaker.chart.xychart.plotitem.Text;
import com.twosigma.beaker.chart.xychart.plotitem.XYGraphics;
import java.util.ArrayList;
import java.util.List;

abstract public class XYChart extends AbstractChart{
  private final List<XYGraphics> xyGraphics = new ArrayList<>();
  private final List<ConstantLine> constantLines = new ArrayList<>();
  private final List<ConstantBand> constantBands = new ArrayList<>();
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
    text.setPlotType(this.getClass());
    this.texts.add(text);
    return this;
  }

  public XYChart leftShift(Text text) {
    return add(text);
  }

  public List<Text> getTexts() {
    return this.texts;
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
      } else {
        super.add(items);
      }
    }
    return this;
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

  protected XYChart setLogX(boolean logX) {
    this.logX = logX;
    return this;
  }

  public Boolean getLogX() {
    return this.logX;
  }

  public Double getXLogBase() {
    return xLogBase;
  }

  public XYChart setXLogBase(double xLogBase) {
    this.xLogBase = xLogBase;
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
  }

  public boolean isxTickLabelsVisible() {
    return xTickLabelsVisible;
  }

  public void setxTickLabelsVisible(boolean xTickLabelsVisible) {
    this.xTickLabelsVisible = xTickLabelsVisible;
  }

  public boolean isyTickLabelsVisible() {
    return yTickLabelsVisible;
  }

  public void setyTickLabelsVisible(boolean yTickLabelsVisible) {
    this.yTickLabelsVisible = yTickLabelsVisible;
  }
}
