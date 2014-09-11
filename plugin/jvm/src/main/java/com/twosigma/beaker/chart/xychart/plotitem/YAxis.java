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

package com.twosigma.beaker.chart.xychart.plotitem;

/**
 * YAxis
 *
 */
public class YAxis {

  private String label;
  private boolean autoRange;
  private boolean autoRangeIncludesZero;
  private double lowerMargin;
  private double upperMargin;
  private double lowerBound;
  private double upperBound;
  private boolean log;
  private double logBase;

  public YAxis() {
    this("");
  }

  public YAxis(String label) {
    this(label, 0.05, 0.05);
  }

  public YAxis(double lowerMargin, double upperMargin) {
    this("", lowerMargin, upperMargin);
  }

  public YAxis(String label, double lowerMargin, double upperMargin) {
    this.label = label;
    this.autoRange = true;
    this.autoRangeIncludesZero = true;
    this.lowerMargin = lowerMargin;
    this.upperMargin = upperMargin;
    this.log = false;
    this.logBase = 10d;
  }

  public void setLabel(String label) {
    this.label = label;
  }

  public String getLabel() {
    return this.label;
  }

  public void setAutoRange(boolean autoRange) {
    this.autoRange = autoRange;
  }

  public Boolean getAutoRange() {
    return this.autoRange;
  }

  public void setAutoRangeIncludesZero(boolean autoRangeIncludesZero) {
    this.autoRangeIncludesZero = autoRangeIncludesZero;
  }

  public Boolean getAutoRangeIncludesZero() {
    return this.autoRangeIncludesZero;
  }

  public void setUpperMargin(double margin) {
    this.upperMargin = margin;
  }

  public Double getUpperMargin() {
    return this.upperMargin;
  }

  public void setLowerMargin(double margin) {
    this.lowerMargin = margin;
  }

  public Double getLowerMargin() {
    return this.lowerMargin;
  }

  public void setBound(double lower, double upper) {
    this.autoRange = false;
    this.lowerBound = lower;
    this.upperBound = upper;
  }

  public Double getLowerBound() {
    return this.lowerBound;
  }

  public Double getUpperBound() {
    return this.upperBound;
  }

  public void setLog(boolean log) {
    this.log = log;
  }

  public Boolean getLog() {
    return this.log;
  }

  public void setLogBase(double logBase) {
    this.logBase = logBase;
  }

  public Double getLogBase() {
    return this.logBase;
  }
}
