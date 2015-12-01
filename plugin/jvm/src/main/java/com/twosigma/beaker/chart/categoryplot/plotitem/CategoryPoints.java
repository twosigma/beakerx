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


import com.twosigma.beaker.chart.Color;
import com.twosigma.beaker.chart.xychart.plotitem.ShapeType;

import java.util.ArrayList;
import java.util.List;

public class CategoryPoints extends CategoryGraphics {
  private float baseSize = 6.0f;
  private List<Number> sizes;
  private ShapeType baseShape = ShapeType.DEFAULT;
  private List<ShapeType> shapes;
  private Boolean         baseFill;
  private List<Boolean>   fills;
  private Color           baseOutlineColor;
  private List<Object>     outlineColors;

  public void setSize(Object size) {
    if (size instanceof Number) {
      this.baseSize = ((Number) size).floatValue();
    } else if (size instanceof List) {
      @SuppressWarnings("unchecked")
      List<Number> ss = (List<Number>) size;
      setSizes(ss);
    } else {
      throw new IllegalArgumentException(
        "setSize takes Number or List of Number");
    }
  }

  private void setSizes(List<Number> sizes) {
    this.sizes = sizes;
  }

  public float getSize() {
    return this.baseSize;
  }

  public List<Number> getSizes() {
    return this.sizes;
  }

  public void setShape(Object shape) {
    if (shape instanceof ShapeType) {
      this.baseShape = (ShapeType) shape;
    } else if (shape instanceof List) {
      @SuppressWarnings("unchecked")
      List<ShapeType> ss = (List<ShapeType>) shape;
      setShapes(ss);
    } else {
      throw new IllegalArgumentException(
        "setShape takes ShapeType or List of ShapeType");
    }
  }

  private void setShapes(List<ShapeType> shapes) {
    this.shapes = shapes;
  }

  public ShapeType getShape() {
    return this.baseShape;
  }

  public List<ShapeType> getShapes() {
    return this.shapes;
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
      this.outlineColors = convertColors(colors);
    } else {
      this.outlineColors = null;
    }
  }

  private List<Object> convertColors(List colors) {
    List<Object> clist = new ArrayList<>(colors.size());
    for(Object c : colors){
      if (c instanceof Color) {
        clist.add(c);
      } else if (c instanceof java.awt.Color) {
        clist.add(new Color((java.awt.Color) c));
      } else if (c instanceof List) {
        clist.add(convertColors((List)c));
      } else {
        throw new IllegalArgumentException("setOutlineColors takes Color or List of Color");
      }
    }
    return clist;
  }

  public Color getOutlineColor() {
    return this.baseOutlineColor;
  }

  public List<Object> getOutlineColors() {
    return this.outlineColors;
  }
}
