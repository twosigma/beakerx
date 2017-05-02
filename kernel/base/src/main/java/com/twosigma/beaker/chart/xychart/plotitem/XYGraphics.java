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

package com.twosigma.beaker.chart.xychart.plotitem;

import com.twosigma.beaker.chart.Color;
import com.twosigma.beaker.chart.Filter;
import com.twosigma.beaker.chart.Graphics;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.EnumSet;
import java.util.List;

abstract public class XYGraphics extends Graphics {
  private List<Number> xs;
  private List<Number> ys = new ArrayList<>();
  private String displayName = "";
  protected Color       baseColor;
  private   List<Color> colors;
  private   Class       plotType;
  private   Filter      lodFilter;
  private   Object      toolTipBuilder;
  private   List<String> toolTips;

  protected List<Number> getBases(){
    return null;
  }

  protected Number getBase(){
    return null;
  }

  protected void setBase(Object base) {
    reinit();
  }

  public List<String> getToolTips() {
    return toolTips;
  }

  public void setToolTip(Object toolTip) {
    toolTipBuilder = toolTip;
    reinit();
  }

  public void setToolTip(List<String> toolTips) {
    toolTipBuilder = null;
    for(Object tooltip : toolTips){
      if(!(tooltip == null || tooltip instanceof String)){
        throw new IllegalArgumentException("Tooltips should be the list of strings");
      }
    }
    this.toolTips = toolTips;
  }

  public void setX(List<Object> xs) {
    this.xs = new ArrayList<>();
    if(xs != null){
      for (Object x : xs) {
        if (x instanceof Number) {
          this.xs.add((Number)x);
        } else if (x instanceof Date) {
          Date date = (Date)x;
          this.xs.add(date.getTime());
        } else {
          throw new IllegalArgumentException("x coordinates should be the list of numbers or java.util.Date objects");
        }
//        remove Java8 feature LocalDateTime, that has to wait
//        else if (x instanceof LocalDateTime) {
//          LocalDateTime date = (LocalDateTime)x;
//          ZonedDateTime zdate = date.atZone(ZoneId.of("UTC"));
//          this.xs.add(zdate.toEpochSecond() * 1000 + date.get(ChronoField.MILLI_OF_SECOND));
//        }
      }
    }
    reinit();
  }

  public List<Number> getX() {
    if (xs == null) {
      generateXs();
    }
    return this.xs;
  }

  public void setY(List<Number> ys) {
    this.ys = new ArrayList<Number>(ys);//to make it serializable
    reinit();
  }

  public List<Number> getY() {
    return this.ys;
  }

  public void setDisplayName(String displayName) {
    this.displayName = displayName;
    reinit();
  }

  public String getDisplayName() {
    return this.displayName;
  }



  private void generateXs() {
    this.xs = new ArrayList<>(this.ys.size());
    for (int i = 0; i < ys.size(); ++i) {
      this.xs.add(i);
    }
  }

  public Filter getLodFilter() {
    return lodFilter;
  }

  public void setLodFilter(Filter lodFilter){
    if (getPossibleFilters().contains(lodFilter)){
      this.lodFilter = lodFilter;
    }else{
      throw new RuntimeException(String.format("%s doesn't not support '%s' filter.",
                                               getClass().getSimpleName(),
                                               lodFilter.getText()));
    }

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
      this.colors = new ArrayList<>(colors.size());
      for (Object c : colors) {
        if (c instanceof Color) {
          this.colors.add((Color)c);
        } else if (c instanceof java.awt.Color) {
          this.colors.add(new Color((java.awt.Color) c));
        } else {
          throw new IllegalArgumentException("setColor takes Color or List of Color");
        }
      }
    } else {
      this.colors = null;
    }

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

  abstract protected EnumSet<Filter> getPossibleFilters();

  public Class getPlotType() {
    return plotType;
  }

  public void setPlotType(Class plotType) {
    this.plotType = plotType;
  }

  private void reinit() {
    if (toolTipBuilder == null) return;

    List<String> toolTip = new ArrayList<>();

    try {
      for (int i = 0; i < xs.size(); i++) {
        toolTip.add((String) runClosure(toolTipBuilder, new Object[]{
          xs.get(i),
          ys.get(i),
          i,
          getBases() != null ? getBases().get(i) : getBase(),
          displayName}));
      }
    } catch (Throwable x) {
      throw new RuntimeException("Can not create tooltips.", x);
    }

    this.toolTips = toolTip;
  }

  private Object runClosure(Object closure, Object... params) throws Exception{
    Class<?> clazz = closure.getClass();
    Method getMaximumNumberOfParameters = clazz.getMethod("getMaximumNumberOfParameters");
    getMaximumNumberOfParameters.setAccessible(true);
    int numberOfParameters = (int) getMaximumNumberOfParameters.invoke(closure);
    Method call;
    Class<Object>[] paramTypes = new Class[numberOfParameters];
    Arrays.fill(paramTypes, Object.class);
    call = clazz.getMethod("call", paramTypes);
    call.setAccessible(true);
    return call.invoke(closure, Arrays.copyOfRange(params, 0, numberOfParameters));
  }
}
