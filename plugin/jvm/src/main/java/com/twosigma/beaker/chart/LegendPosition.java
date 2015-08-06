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
package com.twosigma.beaker.chart;

import org.apache.commons.lang3.ArrayUtils;

public class LegendPosition implements java.io.Serializable {

  public final static LegendPosition TOP_LEFT = new LegendPosition(Position.TOP_LEFT);
  public final static LegendPosition TOP_RIGHT = new LegendPosition(Position.TOP_RIGHT);
  public final static LegendPosition BOTTOM_LEFT = new LegendPosition(Position.BOTTOM_LEFT);
  public final static LegendPosition BOTTOM_RIGHT = new LegendPosition(Position.BOTTOM_RIGHT);

  public static enum Position {
    TOP_LEFT,
    TOP_RIGHT,
    BOTTOM_LEFT,
    BOTTOM_RIGHT
  }

  private Position position;
  private int top;
  private int left;

  public LegendPosition() {
    this.position = Position.TOP_RIGHT;
  }

  public LegendPosition(Position position) {
    this.position = position;
  }

  public LegendPosition(int[] coordinates) {
    if (!ArrayUtils.isEmpty(coordinates)) {
      this.top = coordinates[0];
      if (coordinates.length > 1) {
        this.left = coordinates[1];
      }
    }
  }

  public Position getPosition() {
    return position;
  }

  public void setPosition(Position position) {
    this.position = position;
  }

  public int getTop() {
    return top;
  }

  public void setTop(int top) {
    this.top = top;
  }

  public int getLeft() {
    return left;
  }

  public void setLeft(int left) {
    this.left = left;
  }
}
