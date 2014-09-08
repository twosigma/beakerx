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

import com.twosigma.beaker.chart.xychart.plotitem.ConstantBand;
import com.twosigma.beaker.chart.xychart.plotitem.ConstantLine;
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
  private String yLabel;
  private boolean useToolTip = true;
  private final List<XYGraphics> xyGraphics = new ArrayList<>();
  private final List<ConstantLine> constantLines = new ArrayList<>();
  private final List<ConstantBand> constantBands = new ArrayList<>();
  private final List<Text> texts = new ArrayList<>();
  private final List<YAxis> yAxes = new ArrayList<>();
  private double xLowerMargin;
  private double xUpperMargin;
  private boolean xAutoRange = true;
  private double xLowerBound;
  private double xUpperBound;
  private double yLowerMargin;
  private double yUpperMargin;
  private boolean yAutoRange = true;
  private boolean yAutoRangeIncludesZero;
  private double yLowerBound;
  private double yUpperBound;
  private boolean logX = false;
  private boolean logY = false;
  protected TimeZone timeZone;

  protected XYChart() {
  }

  public XYChart setInitWidth(int w) {
    this.initWidth = w;
    return this;
  }

  public XYChart setInitHeight(int h) {
    this.initHeight = h;
    return this;
  }

  public XYChart setTitle(String title) {
    this.title = title;
    return this;
  }

  public XYChart setXLabel(String xLabel) {
    this.xLabel = xLabel;
    return this;
  }

  public XYChart setxLabel(String xLabel) {
    this.xLabel = xLabel;
    return this;
  }

  public XYChart setYLabel(String yLabel) {
    this.yLabel = yLabel;
    return this;
  }

  public XYChart setyLabel(String yLabel) {
    this.yLabel = yLabel;
    return this;
  }

  public XYChart setShowLegend(String t) {
    this.yLabel = t;
    return this;
  }

  public XYChart setUseToolTip(boolean useToolTip) {
    this.useToolTip = useToolTip;
    return this;
  }

  public XYChart add(XYGraphics graphics) {
    this.xyGraphics.add(graphics);
    return this;
  }

  public XYChart leftShift(XYGraphics graphics) {
    return add(graphics);
  }

  public XYChart add(ConstantLine constantLine) {
    this.constantLines.add(constantLine);
    return this;
  }

  public XYChart leftShift(ConstantLine constantLine) {
    return add(constantLine);
  }

  public XYChart add(ConstantBand constantBand) {
    this.constantBands.add(constantBand);
    return this;
  }

  public XYChart leftShift(ConstantBand constantBand) {
    return add(constantBand);
  }

  public XYChart add(Text text) {
    this.texts.add(text);
    return this;
  }

  public XYChart leftShift(Text text) {
    return add(text);
  }

  public XYChart add(YAxis yAxis) {
    this.yAxes.add(yAxis);
    return this;
  }

  public XYChart leftShift(YAxis yAxis) {
    return add(yAxis);
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

  public XYChart setYAutoRange(boolean yAutoRange) {
    this.xAutoRange = yAutoRange;
    return this;
  }

  public XYChart setyAutoRange(boolean yAutoRange) {
    return this.setYAutoRange(yAutoRange);
  }

  public XYChart setYAutoRangeIncludesZero(boolean yAutoRangeIncludesZero) {
    this.yAutoRangeIncludesZero = yAutoRangeIncludesZero;
    return this;
  }

  public XYChart setyAutoRangeIncludesZero(boolean yAutoRangeIncludesZero) {
    return this.setYAutoRangeIncludesZero(yAutoRangeIncludesZero);
  }

  public XYChart setYBound(double lower, double upper) {
    this.yAutoRange = false;
    this.yLowerBound = lower;
    this.yUpperBound = upper;
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

  protected XYChart setLogX(boolean logX) {
    this.logX = logX;
    return this;
  }

  public XYChart setLogY(boolean logY) {
    this.logY = logY;
    return this;
  }

  protected XYChart setTimeZone(TimeZone timeZone) {
    this.timeZone = timeZone;
    return this;
  }

}
