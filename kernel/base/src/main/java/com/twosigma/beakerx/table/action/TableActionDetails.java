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
package com.twosigma.beakerx.table.action;

import com.twosigma.beakerx.widgets.CommActions;

import java.io.Serializable;

public class TableActionDetails implements Serializable {

  private static final long serialVersionUID = 8873196253824638288L;
  
  private int row;
  private int col;
  private String contextMenuItem;
  private CommActions actionType;
  private String tag;

  public int getRow() {
    return row;
  }

  public void setRow(int row) {
    this.row = row;
  }

  public int getCol() {
    return col;
  }

  public void setCol(int col) {
    this.col = col;
  }

  public String getContextMenuItem() {
    return contextMenuItem;
  }

  public void setContextMenuItem(String contextMenuItem) {
    this.contextMenuItem = contextMenuItem;
  }

  public CommActions getActionType() {
    return actionType;
  }

  public void setActionType(CommActions actionType) {
    this.actionType = actionType;
  }

  public String getTag() {
    return tag;
  }

  public void setTag(String tag) {
    this.tag = tag;
  }
  
  public String toString() {
    return actionType + " " + " " + row + " " + col + " " + tag;
  }
  
}