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

package com.twosigma.beaker.chart.actions;

import com.twosigma.beaker.chart.Graphics;

import java.io.Serializable;
import java.util.List;

public class GraphicsClickActionObject implements Serializable{

  private Graphics graphics;
  private List x;
  private List y;
  private int index;

  public Graphics getGraphics() {
    return graphics;
  }

  public void setGraphics(Graphics graphics) {
    this.graphics = graphics;
  }

  public List getX() {
    return x;
  }

  public void setX(List x) {
    this.x = x;
  }

  public List getY() {
    return y;
  }

  public void setY(List y) {
    this.y = y;
  }

  public int getIndex() {
    return index;
  }

  public void setIndex(int index) {
    this.index = index;
  }
}
