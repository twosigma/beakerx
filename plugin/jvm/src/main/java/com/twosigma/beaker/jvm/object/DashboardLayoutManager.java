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

public class DashboardLayoutManager extends OutputContainerLayoutManager {

  private int colCount;

  private int colSpan;

  private int rowSpan;


  //  Gets how many columns each widget occupies.
  public int getxSpan() {
    return colSpan;
  }

  //  Gets how many columns each widget occupies.
  public int getXSpan() {
    return colSpan;
  }

  //  Gets how many rows each widget occupies.
  public int getySpan() {
    return rowSpan;
  }

  //  Gets how many rows each widget occupies.
  public int getYSpan() {
    return rowSpan;
  }

  //  Sets how many columns of widgets.
  public DashboardLayoutManager setColumnCount(int colCount) {
    this.colCount = colCount;
    return this;
  }

  //  Sets how many columns each widget is going to occupy.
  public DashboardLayoutManager setxSpan(int colSpan) {
    this.colSpan = colSpan;
    return this;
  }

  //  Sets how many columns each widget is going to occupy.
  public DashboardLayoutManager setXSpan(int colSpan) {
    this.colSpan = colSpan;
    return this;
  }

  //  Sets how many rows each widget is going to occupy.
  public DashboardLayoutManager setySpan(int rowSpan) {
    this.rowSpan = rowSpan;
    return this;
  }

  //  Sets how many rows each widget is going to occupy.
  public DashboardLayoutManager setYSpan(int rowSpan) {
    this.rowSpan = rowSpan;
    return this;
  }

  public int getColCount() {
    return colCount;
  }
}
