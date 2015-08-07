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

  public final static LegendPosition TOP = new LegendPosition(Position.TOP);
  public final static LegendPosition LEFT = new LegendPosition(Position.LEFT);
  public final static LegendPosition BOTTOM = new LegendPosition(Position.BOTTOM);
  public final static LegendPosition RIGHT = new LegendPosition(Position.RIGHT);
  public final static LegendPosition TOP_LEFT = new LegendPosition(Position.TOP_LEFT);
  public final static LegendPosition TOP_RIGHT = new LegendPosition(Position.TOP_RIGHT);
  public final static LegendPosition BOTTOM_LEFT = new LegendPosition(Position.BOTTOM_LEFT);
  public final static LegendPosition BOTTOM_RIGHT = new LegendPosition(Position.BOTTOM_RIGHT);

  public static enum Position {
    TOP,
    LEFT,
    BOTTOM,
    RIGHT,
    TOP_LEFT,
    TOP_RIGHT,
    BOTTOM_LEFT,
    BOTTOM_RIGHT
  }

  private Position position;
  private int x;
  private int y;

  public LegendPosition() {
    this.position = Position.TOP_RIGHT;
  }

  public LegendPosition(Position position) {
    this.position = position;
  }

  public LegendPosition(int[] coordinates) {
    if (!ArrayUtils.isEmpty(coordinates)) {
      this.x = coordinates[0];
      if (coordinates.length > 1) {
        this.y= coordinates[1];
      }
    }
  }

  public Position getPosition() {
    return position;
  }

  public void setPosition(Position position) {
    this.position = position;
  }

  public int getX() {
    return x;
  }

  public void setX(int x) {
    this.x = x;
  }

  public int getY() {
    return y;
  }

  public void setY(int y) {
    this.y = y;
  }
}
