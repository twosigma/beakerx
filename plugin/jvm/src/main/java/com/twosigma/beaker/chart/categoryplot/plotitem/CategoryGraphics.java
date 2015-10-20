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
import com.twosigma.beaker.chart.Graphics;
import com.twosigma.beaker.chart.xychart.plotitem.LabelPositionType;
import org.apache.commons.lang3.ArrayUtils;

import java.util.Arrays;
import java.util.List;

public abstract class CategoryGraphics extends Graphics {
  protected Number[][]   value;
  protected List<String> seriesNames;
  protected Color        baseColor;
  private   List<Color>  colors;
  private LabelPositionType labelPosition = LabelPositionType.CENTER;
  private boolean           showItemLabel = false;
  private boolean           centerSeries  = false;
  private boolean           useToolTip    = true;

  public void setColor(Object color) {
    if (color instanceof Color) {
      this.baseColor = (Color) color;
    } else if (color instanceof List) {
      @SuppressWarnings("unchecked")
      List<Color> cs = (List<Color>) color;
      setColors(cs);
    } else {
      throw new IllegalArgumentException(
        "setColor takes Color or List of Color");
    }
  }

  private void setColors(List<Color> colors) {
    this.colors = colors;
  }


  public List<Color> getColors() {
    return this.colors;
  }

  @Override
  public void setColori(Color color) {
    this.baseColor = color;
  }

  @Override
  public Color getColor() {
    return this.baseColor;
  }

  public Number[][] getValue() {
    return value;
  }

  public void setValue(Object[] value) {
    if(value != null && ArrayUtils.isNotEmpty(value)){
      if(value[0] instanceof List){
        this.value = new Number[value.length][];
        for(int i=0; i < value.length; i++){
          List<?> a = (List<?>)value[i];
          this.value[i] = a.toArray(new Number[a.size()]);
        }
      }else{
        this.value = new Number[][]{Arrays.copyOf(value, value.length, Integer[].class)};
      }
    }
  }

  public List<String> getSeriesNames() {
    return seriesNames;
  }

  public void setSeriesNames(List<String> seriesNames) {
    this.seriesNames = seriesNames;
  }

  public LabelPositionType getLabelPosition() {
    return labelPosition;
  }

  public void setLabelPosition(LabelPositionType labelPosition) {
    this.labelPosition = labelPosition;
  }

  public boolean getShowItemLabel() {
    return showItemLabel;
  }

  public void setShowItemLabel(boolean showItemLabel) {
    this.showItemLabel = showItemLabel;
  }

  public boolean getCenterSeries() {
    return centerSeries;
  }

  public void setCenterSeries(boolean centerSeries) {
    this.centerSeries = centerSeries;
  }

  public void setUseToolTip(boolean useToolTip) {
    this.useToolTip = useToolTip;
  }

  public Boolean getUseToolTip() {
    return this.useToolTip;
  }
}
