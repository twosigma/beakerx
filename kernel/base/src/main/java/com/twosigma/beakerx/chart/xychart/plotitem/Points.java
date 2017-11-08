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

package com.twosigma.beakerx.chart.xychart.plotitem;

import com.twosigma.beakerx.chart.Color;
import com.twosigma.beakerx.chart.Filter;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;


public class Points extends XYGraphics {

  private final static EnumSet<Filter> POSSIBLE_LOD_FILTERS = EnumSet.of(Filter.POINT,
                                                                         Filter.BOX);

  private float baseSize = 6.0f;
  private List<Number> sizes;
  private ShapeType baseShape = ShapeType.DEFAULT;
  private List<ShapeType> shapes;
  private Boolean baseFill;
  private List<Boolean> fills;
  private Color baseOutlineColor;
  private List<Color> outlineColors;

  public void setSize(Number size) {
    this.baseSize = size.floatValue();
  }

  public void setSize(List<Number> sizes) {
    setSizes(sizes);
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

  public void setShape(ShapeType shape) {
    this.baseShape = shape;
  }

  public void setShape(List<ShapeType> shapes) {
    setShapes(shapes);
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
      this.outlineColors = new ArrayList<>(colors.size());
      for (Object c : colors) {
        if (c instanceof Color) {
          this.outlineColors.add((Color)c);
        } else if (c instanceof java.awt.Color) {
          this.outlineColors.add(new Color((java.awt.Color) c));
        } else {
          throw new IllegalArgumentException("setColor takes Color or List of Color");
        }
      }
    } else {
      this.outlineColors = null;
    }
  }

  public Color getOutlineColor() {
    return this.baseOutlineColor;
  }

  public List<Color> getOutlineColors() {
    return this.outlineColors;
  }

  @Override
  protected EnumSet<Filter> getPossibleFilters() {
    return POSSIBLE_LOD_FILTERS;
  }

}
