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

package com.twosigma.beaker.chart.categoryplot.plotitem;

import com.twosigma.beaker.chart.ChartUtils;
import com.twosigma.beaker.chart.Color;
import com.twosigma.beaker.chart.xychart.plotitem.LabelPositionType;

import java.util.List;

public class CategoryBars extends CategoryGraphics {

  private Number       baseWidth;
  private List<Number> widths;
  private Number baseBase = 0.0d;
  private List<Number>  bases;
  private Color         baseOutlineColor;
  private List<Object>   outlineColors;
  private Boolean       baseFill;
  private List<Boolean> fills;
  private Boolean       baseOutline = false;
  private List<Boolean> outlines;

  private LabelPositionType labelPosition = LabelPositionType.CENTER;

  public void setBase(Object base) {
    if (base instanceof Number) {
      this.baseBase = ((Number) base).floatValue();
    } else if (base instanceof List) {
      @SuppressWarnings("unchecked")
      List<Number> ss = (List<Number>) base;
      setBases(ss);
    } else {
      throw new IllegalArgumentException(
        "setBase takes Number or List of Number");
    }
  }

  private void setBases(List<Number> bases) {
    this.bases = bases;
  }

  public Number getBase() {
    return this.baseBase;
  }

  public List<Number> getBases() {
    return this.bases;
  }


  public void setWidth(Object width) {
    if (width instanceof Number) {
      this.baseWidth = ((Number) width).floatValue();
    } else if (width instanceof List) {
      @SuppressWarnings("unchecked")
      List<Number> ws = (List<Number>) width;
      setWidths(ws);
    } else {
      throw new IllegalArgumentException(
        "setWidth takes Number or List of Number");
    }
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


  public void setOutlineColor(Object color) {
    if (color instanceof Color) {
      this.baseOutlineColor = (Color) color;
    } else if (color instanceof java.awt.Color) {
      this.baseOutlineColor = new Color((java.awt.Color) color);
    } else if (color instanceof List) {
      @SuppressWarnings("unchecked")
      List<Object> cs = (List<Object>) color;
      setOutlineColors(cs);
    } else {
      throw new IllegalArgumentException(
        "setOutlineColor takes Color or List of Color");
    }
  }

  private void setOutlineColors(List<Object> colors) {
    if (colors != null) {
      this.outlineColors = ChartUtils.convertColors(colors, "setOutlineColor takes Color or List of Color");
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

  public void setFill(Object fill) {
    if (fill instanceof Boolean) {
      this.baseFill = (Boolean) fill;
    } else if (fill instanceof List) {
      @SuppressWarnings("unchecked")
      List<Boolean> fs = (List<Boolean>) fill;
      setFills(fs);
    } else {
      throw new IllegalArgumentException(
        "setFill takes boolean or List of boolean");
    }
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

  public void setDrawOutline(Object outline) {
    if (outline instanceof Boolean) {
      this.baseOutline = (Boolean) outline;
    } else if (outline instanceof List) {
      @SuppressWarnings("unchecked")
      List<Boolean> fs = (List<Boolean>) outline;
      this.outlines = fs;
    } else {
      throw new IllegalArgumentException(
        "drawOutline takes boolean or List of boolean");
    }
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
