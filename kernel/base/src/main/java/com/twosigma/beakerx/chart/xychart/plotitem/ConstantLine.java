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

package com.twosigma.beakerx.chart.xychart.plotitem;

import com.twosigma.beakerx.chart.Color;
import com.twosigma.beakerx.chart.Graphics;
import com.twosigma.beakerx.util.DateUtil;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;

/**
 * ConstantLine
 */
public class ConstantLine extends Graphics {
  private Number x;
  private Number y;
  private Color baseColor;
  private Float width = 1.5f;
  private StrokeType style;
  private Class plotType;
  private boolean showLabel;

  public Number getX() {
    return x;
  }

  public void setX(Number x) {
    this.x = x;
  }

  public void setX(Date x) {
    this.x = DateUtil.dateToLong(x);
  }

  public void setX(Calendar x) {
    this.x = DateUtil.dateToLong(x);
  }

  public void setX(Instant x) {
    this.x = DateUtil.dateToLong(x);
  }

  public void setX(LocalDateTime x) {
    this.x = DateUtil.dateToLong(x);
  }

  public void setX(LocalDate x) {
    this.x = DateUtil.dateToLong(x);
  }

  public Number getY() {
    return y;
  }

  public void setY(Number y) {
    this.y = y;
  }

  public void setColor(Color color) {
    this.baseColor = color;
  }

  public void setColor(java.awt.Color color) {
    setColor(new Color(color));
  }

  @Override
  public void setColori(Color color) {
    this.baseColor = color;
  }

  @Override
  public Color getColor() {
    return baseColor;
  }

  public Float getWidth() {
    return width;
  }

  public void setWidth(Float width) {
    this.width = width;
  }

  public StrokeType getStyle() {
    return style;
  }

  public void setStyle(StrokeType style) {
    this.style = style;
  }

  public Class getPlotType() {
    return plotType;
  }

  public void setPlotType(Class plotType) {
    this.plotType = plotType;
  }

  public Boolean getShowLabel() {
    return showLabel;
  }

  public void setShowLabel(boolean showLabel) {
    this.showLabel = showLabel;
  }
}
