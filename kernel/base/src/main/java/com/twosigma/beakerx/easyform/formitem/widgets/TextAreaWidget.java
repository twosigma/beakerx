/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beakerx.easyform.formitem.widgets;

import com.twosigma.beakerx.easyform.EasyFormComponent;
import com.twosigma.beakerx.widget.Textarea;

public class TextAreaWidget extends EasyFormComponent<Textarea> {

  public static final Integer AUTO_HEIGHT = -1;
  public static final Integer AUTO_WIDTH = -1;
  private Integer width;
  private Integer height;
  private Integer cols;
  private Integer rows;

  public TextAreaWidget() {
    super(new Textarea());
  }

  public Integer getCols() {
    return cols;
  }

  public Integer getRows() {
    return rows;
  }

  public Integer getWidth() {
    return width;
  }

  public Integer getHeight() {
    return height;
  }

  public void setCols(Integer cols) {
    this.cols = cols;
    getWidget().sendUpdate("cols", cols);
  }

  public void setRows(Integer rows) {
    this.rows = rows;
    getWidget().sendUpdate("rows", rows);
  }

  public void setWidth(Integer width) {
    this.width = width;
    getWidget().sendUpdate("width", width);
  }

  public void setHeight(Integer height) {
    this.height = height;
    getWidget().sendUpdate("height", height);
  }

}