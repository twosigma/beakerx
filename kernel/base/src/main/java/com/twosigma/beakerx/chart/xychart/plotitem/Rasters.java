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

package com.twosigma.beakerx.chart.xychart.plotitem;

import com.twosigma.beakerx.chart.Color;
import com.twosigma.beakerx.chart.Graphics;
import com.twosigma.beakerx.chart.Filter;

import java.util.Date;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

public class Rasters extends XYGraphics {
  private List<Number> width;
  private List<Number> height;
  private List<Number> opacity;
  private String filePath = "";
  private String fileUrl = "";
  private byte[] dataString;
  private Color  baseColor;
  private String position = "zoomable";

  // getter and setters
  /*
  public Number getX() {
    return x;
  }

  public void setX(Object x) {
    if (x instanceof Number) {
      this.x = (Number)x;
    } else if (x instanceof Date) {
      this.x = ((Date)x).getTime();
    } else {
      throw new IllegalArgumentException("x takes Number or Date");
    }
  }

  public Number getY() {
    return y;
  }

  public void setY(Number y) {
    this.y = y;
  }
  */

  public List<Number> getOpacity() {
    // generate a list of opacity 1, if not given
    if (this.opacity == null){
      this.opacity = new ArrayList<>(this.width.size());
      for (int i = 0; i < this.width.size(); ++i) {
        this.opacity.add(1);
      }
    }
    return this.opacity;
  }

  public void setOpacity(List<Number> opacity) {
    this.opacity = new ArrayList<Number>(opacity);
  }

  public List<Number> getWidth() {
    return this.width;
  }

  public void setWidth(List<Number> width) {
    this.width = new ArrayList<Number>(width);
  }

  public List<Number> getHeight() {
    return this.height;
  }

  public void setHeight(List<Number> height) {
    this.height = new ArrayList<Number>(height);
  }

  public String getFilePath() {
    return filePath;
  }

  public void setFilePath(String filePath) {
    this.filePath = filePath;
  }

  public String getFileUrl() {
    return fileUrl;
  }

  public void setFileUrl(String fileUrl) {
    this.fileUrl = fileUrl;
  }

  public String getPosition() {
    return position;
  }

  public void setPosition(String position) {
    this.position = position;
  }

  public byte[] getDataString() {
    return dataString;
  }

  public void setDataString(byte[] dataString) {
    this.dataString = dataString;
  }

  @Override
  protected EnumSet<Filter> getPossibleFilters() {
    return null;
  }
}