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

public class GridOutputContainerLayoutManager extends OutputContainerLayoutManager {
  private int dividerWidth = 0;
  private final int columns;

  public GridOutputContainerLayoutManager(int columns) {
    this.columns = columns;
  }

  public int getDividerWidth() {
    return dividerWidth;
  }

  public void setDividerWidth(int dividerWidth) {
    this.dividerWidth = dividerWidth;
  }

  public int getColumns() {
    return columns;
  }
}
