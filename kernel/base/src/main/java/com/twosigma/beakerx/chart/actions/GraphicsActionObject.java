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

package com.twosigma.beakerx.chart.actions;

import com.twosigma.beakerx.chart.Graphics;
import com.twosigma.beakerx.widgets.CommActions;

import java.io.Serializable;

public abstract class GraphicsActionObject implements Serializable{

  private static final long serialVersionUID = -1010209669334228815L;
  
  private Graphics graphics;
  private CommActions actionType;
  private String key;
  private String tag;


  public Graphics getGraphics() {
    return graphics;
  }

  public void setGraphics(Graphics graphics) {
    this.graphics = graphics;
  }

  public CommActions getActionType() {
    return actionType;
  }

  public void setActionType(CommActions actionType) {
    this.actionType = actionType;
  }

  public String getKey() {
    return key;
  }

  public void setKey(String key) {
    this.key = key;
  }

  public String getTag() {
    return tag;
  }

  public void setTag(String tag) {
    this.tag = tag;
  }

}