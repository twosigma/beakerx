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

package com.twosigma.beaker.chart.histogram;

import com.twosigma.beaker.AbstractChart;

public class Histogram extends AbstractChart {

  public enum DisplayMode {
    OVERLAP,
    STACK,
    SIDE_BY_SIDE
  }

  private int     rangeMin;
  private int     rangeMax;
  private int     bitCount;
  private boolean rightClose;
  private boolean cumulative;
  private boolean normed;

  private boolean     log         = false;
  private DisplayMode displayMode = DisplayMode.OVERLAP;


  public int getRangeMin() {
    return rangeMin;
  }

  public void setRangeMin(int rangeMin) {
    this.rangeMin = rangeMin;
  }

  public int getRangeMax() {
    return rangeMax;
  }

  public void setRangeMax(int rangeMax) {
    this.rangeMax = rangeMax;
  }

  public int getBitCount() {
    return bitCount;
  }

  public void setBitCount(int bitCount) {
    this.bitCount = bitCount;
  }

  public boolean isRightClose() {
    return rightClose;
  }

  public void setRightClose(boolean rightClose) {
    this.rightClose = rightClose;
  }

  public boolean isCumulative() {
    return cumulative;
  }

  public void setCumulative(boolean cumulative) {
    this.cumulative = cumulative;
  }

  public boolean isNormed() {
    return normed;
  }

  public void setNormed(boolean normed) {
    this.normed = normed;
  }

  public DisplayMode getDisplayMode() {
    return displayMode;
  }

  public void setDisplayMode(DisplayMode displayMode) {
    this.displayMode = displayMode;
  }

  public boolean isLog() {
    return log;
  }

  public void setLog(boolean log) {
    this.log = log;
  }

  public void setColor(Object color) {

  }

  public void setData(Object color) {

  }
}
