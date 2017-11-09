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
import com.twosigma.beakerx.chart.Graphics;
import com.twosigma.beakerx.chart.ListColorConverter;
import com.twosigma.beakerx.widgets.RunWidgetClosure;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.EnumSet;
import java.util.List;

abstract public class XYGraphics extends Graphics {
  private List<Number> xs;
  private List<Number> ys = new ArrayList<>();
  private String displayName = "";
  protected Color baseColor;
  private List<Color> colors;
  private Class plotType;
  private Filter lodFilter;
  private Object toolTipBuilder;
  private List<String> toolTips;

  protected List<Number> getBases() {
    return null;
  }

  protected Number getBase() {
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
    for (Object tooltip : toolTips) {
      if (!(tooltip == null || tooltip instanceof String)) {
        throw new IllegalArgumentException("Tooltips should be the list of strings");
      }
    }
    this.toolTips = toolTips;
  }

  public void setX(Object[] xs) {
    setX(Arrays.asList(xs));
  }

  public void setX(List<Object> xs) {
    this.xs = new ArrayList<>();
    if (xs != null) {
      for (Object x : xs) {
        if (x instanceof Number) {
          this.xs.add((Number) x);
        } else if (x instanceof Date) {
          Date date = (Date) x;
          this.xs.add(date.getTime());
        } else if (x instanceof Instant) {
          Instant instant = (Instant) x;
          this.xs.add(instant.toEpochMilli());
        } else if (x instanceof LocalDateTime) {
          LocalDateTime date = (LocalDateTime) x;
          this.xs.add(date.atZone(ZoneId.of("UTC")).toInstant().toEpochMilli());
        } else if (x instanceof LocalDate) {
          LocalDate date = (LocalDate) x;
          this.xs.add(date.atStartOfDay(ZoneId.of("UTC")).toInstant().toEpochMilli());
        } else {
          throw new IllegalArgumentException("x coordinates should be the list of numbers or java.util.Date objects");
        }
      }
    }
    reinit();
  }

  public List<Number> getX() {
    if (xs == null || xs.isEmpty()) {
      generateXs();
    }
    return this.xs;
  }

  public void setY(Number[] ys) {
    setY(Arrays.asList(ys));
  }

  public void setY(List<Number> ys) {
    this.ys = new ArrayList<>(ys);//to make it serializable
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

  public void setLodFilter(Filter lodFilter) {
    if (getPossibleFilters().contains(lodFilter)) {
      this.lodFilter = lodFilter;
    } else {
      throw new RuntimeException(String.format("%s doesn't not support '%s' filter.",
              getClass().getSimpleName(),
              lodFilter.getText()));
    }

  }

  public void setColor(Color color) {
    this.baseColor = color;
  }

  public void setColor(java.awt.Color color) {
    setColor(new Color(color));
  }

  public void setColor(List<Object> colorList) {
    if (colorList != null) {
      this.colors = ListColorConverter.convert(colorList);
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

  private Object runClosure(Object closure, Object... params) throws Exception {
    return RunWidgetClosure.runClosure(closure, params);
  }
}
