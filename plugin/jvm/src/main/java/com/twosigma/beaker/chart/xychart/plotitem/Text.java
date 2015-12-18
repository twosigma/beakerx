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

import com.twosigma.beaker.chart.Color;

/**
 * Text
 *
 */
public class Text {

  private Number  x           = 0.0d;
  private Number  y           = 0.0d;
  private boolean showPointer = true;
  private String  text        = "";
  private Double pointerAngle;
  private Color  color;

  public Number getX() {
    return x;
  }

  public void setX(Number x) {
    this.x = x;
  }

  public Number getY() {
    return y;
  }

  public void setY(Number y) {
    this.y = y;
  }

  public Boolean getShowPointer() {
    return showPointer;
  }

  public void setShowPointer(boolean showPointer) {
    this.showPointer = showPointer;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }


  public Double getPointerAngle() {
    return pointerAngle;
  }

  public void setPointerAngle(Double pointerAngle) {
    this.pointerAngle = pointerAngle;
  }

  public Color getColor() {
    return color;
  }

  public void setColor(Color color) {
    this.color = color;
  }
}
