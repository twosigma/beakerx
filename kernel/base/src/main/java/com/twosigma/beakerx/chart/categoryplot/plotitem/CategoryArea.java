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

package com.twosigma.beakerx.chart.categoryplot.plotitem;

import com.twosigma.beakerx.chart.ChartUtils;
import com.twosigma.beakerx.chart.Color;
import com.twosigma.beakerx.chart.xychart.plotitem.LabelPositionType;
import java.util.List;

public class CategoryArea extends BasedCategoryGraphics {

  private Number baseWidth;
  private List<Number> widths;
  private Color baseOutlineColor;
  private List<Object> outlineColors;
  private Boolean baseFill;
  private List<Boolean> fills;
  private Boolean baseOutline = false;
  private List<Boolean> outlines;

  private LabelPositionType labelPosition = LabelPositionType.CENTER;

  public void setWidth(Number width) {
    this.baseWidth = width.floatValue();
  }

  public void setWidth(List<Number> width) {
    setWidths(width);
  }

  private void setWidths(List<Number> widths) {
    this.widths = widths;
  }

  public Number getWidth() {
    return this.baseWidth;
  }

  public List<Number> getWidths() {
    return this.widths;
  }

  public void setOutlineColor(Color color) {
    this.baseOutlineColor = color;
  }

  public void setOutlineColor(java.awt.Color color) {
    this.baseOutlineColor = new Color(color);
  }

  public void setOutlineColor(List<Object> colors) {
    setOutlineColors(colors);
  }

  private void setOutlineColors(List<Object> colors) {
    if (colors != null) {
      this.outlineColors = ChartUtils
          .convertColors(colors, "setOutlineColor takes Color or List of Color");
    } else {
      this.outlineColors = null;
    }
  }

  public Color getOutlineColor() {
    return this.baseOutlineColor;
  }

  public List<Object> getOutlineColors() {
    return this.outlineColors;
  }

  public void setFill(Boolean fill) {
    this.baseFill = fill;
  }

  public void setFill(List<Boolean> fill) {
    setFills(fill);
  }

  private void setFills(List<Boolean> fills) {
    this.fills = fills;
  }

  public Boolean getFill() {
    return this.baseFill;
  }

  public List<Boolean> getFills() {
    return this.fills;
  }

  public void setDrawOutline(Boolean outline) {
    this.baseOutline = outline;
  }

  public void setDrawOutline(List<Boolean> outline) {
    this.outlines = outline;
  }

  public List<Boolean> getDrawOutlines() {
    return this.outlines;
  }

  public Boolean getDrawOutline() {
    return this.baseOutline;
  }

  public LabelPositionType getLabelPosition() {
    return labelPosition;
  }

  public void setLabelPosition(LabelPositionType labelPosition) {
    this.labelPosition = labelPosition;
  }

}
