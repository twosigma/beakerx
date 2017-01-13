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
import com.twosigma.beaker.chart.Graphics;
import com.twosigma.beaker.chart.categoryplot.CategoryPlot;
import org.apache.commons.lang3.ArrayUtils;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public abstract class CategoryGraphics extends Graphics {
  protected Number[][]   value;
  protected List<String> seriesNames;
  protected Color        baseColor;
  private   List<Object> colors;
  private   Object       itemLabelBuilder;
  private   String[][]   itemLabels;

  private boolean showItemLabel = false;
  private boolean centerSeries  = false;
  private boolean useToolTip    = true;

  protected List<Number> getBases(){
    return null;
  }

  protected Number getBase(){
    return null;
  }

  public void createItemLabels(CategoryPlot plot) {
    if (itemLabelBuilder == null || value == null) {
      this.itemLabels = null;
      return;
    }

    int itemCategoriesNumber = value[0].length;
    int itemSeriesNumber = value.length;

    String[][] itemLabels = new String[itemCategoriesNumber][itemSeriesNumber];

    try {
      Class<?> clazz = itemLabelBuilder.getClass();
      Method getMaximumNumberOfParameters = clazz.getMethod("getMaximumNumberOfParameters");
      getMaximumNumberOfParameters.setAccessible(true);
      int numberOfParameters = (int) getMaximumNumberOfParameters.invoke(itemLabelBuilder);


      for (int column = 0; column < itemCategoriesNumber; column++) {
        List<String> categoryNames = plot.getCategoryNames();
        String category = categoryNames != null && categoryNames.size() > column ?
          categoryNames.get(column) : null;

        for (int row = 0; row < itemSeriesNumber; row++) {

          Number _value = value[row][column];
          String series = seriesNames != null && seriesNames.size() > row ? seriesNames.get(row) : null;

          Method call;
          if (numberOfParameters == 1) {
            call = clazz.getMethod("call", Object.class);
            call.setAccessible(true);
            itemLabels[column][row] = String.valueOf(call.invoke(itemLabelBuilder, _value));
          } else {
            Object base = getBases() != null ?
              getBases().get(row) instanceof List ?
                ((List) getBases().get(row)).get(column) : getBases().get(row) : getBase();
            if (numberOfParameters == 2) {
              call = clazz.getMethod("call", Object.class, Object.class);
              call.setAccessible(true);
              itemLabels[column][row] = String.valueOf(call.invoke(itemLabelBuilder,
                                                                   _value,
                                                                   base));
            } else if (numberOfParameters == 3) {
              call = clazz.getMethod("call", Object.class, Object.class, Object.class);
              call.setAccessible(true);
              itemLabels[column][row] = String.valueOf(call.invoke(itemLabelBuilder,
                                                                   _value,
                                                                   base,
                                                                   series));
            } else if (numberOfParameters == 4) {
              call = clazz.getMethod("call",
                                     Object.class,
                                     Object.class,
                                     Object.class,
                                     Object.class);
              call.setAccessible(true);
              itemLabels[column][row] = String.valueOf(call.invoke(itemLabelBuilder,
                                                                   _value,
                                                                   base,
                                                                   series,
                                                                   category));
            } else if (numberOfParameters == 5) {
              call = clazz.getMethod("call",
                                     Object.class,
                                     Object.class,
                                     Object.class,
                                     Object.class,
                                     Object.class);
              call.setAccessible(true);
              itemLabels[column][row] = String.valueOf(call.invoke(itemLabelBuilder,
                                                                   _value,
                                                                   base,
                                                                   series,
                                                                   category,
                                                                   row));
            } else if (numberOfParameters == 6) {
              call = clazz.getMethod("call",
                                     Object.class,
                                     Object.class,
                                     Object.class,
                                     Object.class,
                                     Object.class,
                                     Object.class);
              call.setAccessible(true);
              itemLabels[column][row] = String.valueOf(call.invoke(itemLabelBuilder,
                                                                   _value,
                                                                   base,
                                                                   series,
                                                                   category,
                                                                   row,
                                                                   column));
            }
          }

        }
      }
    } catch (Throwable x) {
      throw new RuntimeException("Can not create item labels.", x);
    }

    this.itemLabels = itemLabels;
  }

  public String[][] getItemLabels() {
    return itemLabels;
  }

  public void setItemLabel(Object itemLabel) {
    itemLabelBuilder = itemLabel;
  }


  public void setColor(Object color) {
    if (color instanceof Color) {
      this.baseColor = (Color) color;
    } else if (color instanceof java.awt.Color) {
      this.baseColor = new Color((java.awt.Color) color);
    } else if (color instanceof List) {
      @SuppressWarnings("unchecked")
      List<Object> cs = (List<Object>) color;
      setColors(cs);
    } else {
      throw new IllegalArgumentException(
        "setColor takes Color or List of Color");
    }
  }

  private void setColors(List<Object> colors) {
    if (colors != null) {
      this.colors = ChartUtils.convertColors(colors, "setColor takes Color or List of Color");
    } else {
      this.colors = null;
    }

  }

  public List<Object> getColors() {
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
        this.value = new Number[][]{Arrays.copyOf(value, value.length, Number[].class)};
      }
    }
  }

  public List<String> getSeriesNames() {
    return seriesNames;
  }

  public void setSeriesNames(List<String> seriesNames) {
    this.seriesNames = seriesNames;
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
