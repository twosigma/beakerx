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

package com.twosigma.beaker.jvm.object;

public class AbstractGridLayoutManager extends OutputContainerLayoutManager {
  protected final int columns;
  protected int paddingTop    = 0;
  protected int paddingBottom = 0;
  protected int paddingLeft   = 15;
  protected int paddingRight  = 15;

  public AbstractGridLayoutManager(int columns) {
    this.columns = columns;
  }

  public int getColumns() {
    return columns;
  }

  public int getPaddingTop() {
    return paddingTop;
  }

  public void setPaddingTop(int paddingTop) {
    this.paddingTop = paddingTop;
  }

  public int getPaddingBottom() {
    return paddingBottom;
  }

  public void setPaddingBottom(int paddingBottom) {
    this.paddingBottom = paddingBottom;
  }

  public int getPaddingLeft() {
    return paddingLeft;
  }

  public void setPaddingLeft(int paddingLeft) {
    this.paddingLeft = paddingLeft;
  }

  public int getPaddingRight() {
    return paddingRight;
  }

  public void setPaddingRight(int paddingRight) {
    this.paddingRight = paddingRight;
  }

}
