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

package com.twosigma.beaker.chart.xychart;

import com.twosigma.beaker.chart.ChartUtils.ColorPalette;
import com.twosigma.beaker.chart.Color;
import com.twosigma.beaker.chart.xychart.plotitem.Line;
import com.twosigma.beaker.chart.xychart.plotitem.Points;
import com.twosigma.beaker.chart.xychart.plotitem.XYGraphics;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.*;

public class SimpleTimePlot extends TimePlot {

  private List<Map<String, Object>> data;
  private String timeColumn = "time";
  private List<String> columns;
  private List<String> displayNames;
  private List<Object> colors;
  private boolean displayLines  = true;
  private boolean displayPoints = false;


  public SimpleTimePlot(List<Map<String, Object>> data, List<String> columns) {
    this(null, data, columns);
  }

  public SimpleTimePlot(Map<String, Object> parameters,
                        List<Map<String, Object>> data,
                        List<String> columns) {

    this.data = data;
    this.columns = columns;

    //default values
    setUseToolTip(true);
    setShowLegend(true);
    setXLabel("Time");

    if (parameters != null) {
      for (Map.Entry<String, Object> entry : parameters.entrySet()) {
        String fieldName = entry.getKey();
        Object fieldValue = entry.getValue();

        ReflectionUtils.set(this, fieldName, fieldValue);
      }
    }

    //default the names for the lines and points to the same as the column
    if (displayNames == null || displayNames.size() == 0) {
      displayNames = columns;
    }

    reinitialize();
  }

  private List<Color> getChartColors() {
    if (colors != null) {

      List<Color> chartColors = new ArrayList<>();
      for (int i = 0; i < columns.size(); i++) {
        Color color = null;
        if (i < colors.size()) {
          color = createChartColor(colors.get(i));
        }
        if (color == null) {
          color = ColorPalette.createNiceColor();
          while (chartColors.contains(color)) {
            color = ColorPalette.createNiceColor();
          }
        }
        chartColors.add(color);
      }
      return chartColors;
    }
    return getNiceColors(columns.size());
  }

  private List<Color> getNiceColors(int n) {
    List<Color> colors = new ArrayList<>();
    for (int i = 0; i < n; i++){
      colors.add(ColorPalette.getColor(i));
    }
    return colors;
  }

  private Color createChartColor(Object color) {
    if (color instanceof List) {
      try {
        return new Color((int) ((List) color).get(0),
                         (int) ((List) color).get(1),
                         (int) ((List) color).get(2));
      } catch (IndexOutOfBoundsException x) {
        throw new RuntimeException("Color list too short");
      }

    }
    String colorAsStr = (String) color;
    if (colorAsStr.indexOf("#") == 0) {
      return Color.decode(colorAsStr);
    }
    return colorFromName(colorAsStr);
  }

  private Color colorFromName(String color) {
    try {
      Field field = Class.forName("com.twosigma.beaker.chart.Color").getField(color);
      return (Color) field.get(null);
    } catch (ClassNotFoundException | IllegalAccessException | NoSuchFieldException x) {
      throw new RuntimeException(String.format("Can not parse color '%s'", color), x);
    }
  }

  private void reinitialize() {
    List<XYGraphics> graphics = getGraphics();
    filter(graphics, new Predicate<XYGraphics>() {
      public boolean test(XYGraphics graphic) {
        return !(graphic instanceof Line || graphic instanceof Points);
      }
    });

    List<Object> xs = new ArrayList<>();
    List<List<Number>> yss = new ArrayList<>();

    if (data != null && columns != null) {
      for (Map<String, Object> row : data) {

        xs.add((Number) row.get(timeColumn));

        for (int i = 0; i < columns.size(); i++) {
          String column = columns.get(i);

          if (i >= yss.size()) {
            yss.add(new ArrayList<Number>());
          }
          yss.get(i).add((Number) row.get(column));
        }
      }

      List<Color> colors = getChartColors();

      for (int i = 0; i < yss.size(); i++) {
        List<Number> ys = yss.get(i);

        if (displayLines) {
          Line line = new Line();
          line.setX(xs);
          line.setY(ys);

          if (displayNames != null && i < displayNames.size()) {
            line.setDisplayName(displayNames.get(i));
          } else {
            line.setDisplayName(columns.get(i));
          }
          line.setColor(colors.get(i));

          add(line);
        }

        if (displayPoints) {
          Points points = new Points();
          points.setX(xs);
          points.setY(ys);

          if (displayNames != null && i < displayNames.size()) {
            points.setDisplayName(displayNames.get(i));
          } else {
            points.setDisplayName(columns.get(i));
          }
          points.setColor(colors.get(i));

          add(points);
        }
      }
    }
  }


  public List<Map<String, Object>> getData() {
    return data;
  }

  public void setData(List<Map<String, Object>> data) {
    this.data = data;
    reinitialize();
  }

  public List<String> getColumns() {
    return columns;
  }

  public void setColumns(List<String> columns) {
    this.columns = columns;
    reinitialize();
  }

  public void setDisplayNames(List<String> displayNames) {
    this.displayNames = displayNames;
    if (displayNames != null) {
      List<XYGraphics> graphics = getGraphics();
      int i = 0;
      for (XYGraphics graphic : graphics) {
        if (graphic instanceof Line) {
          graphic.setDisplayName(displayNames.get(++i));
        }
      }
    }
  }

  public List<String> getDisplayNames() {
    return displayNames;
  }


  public void setColors(List<Object> colors) {
    this.colors = colors;
  }

  public List<Object> getColors() {
    return colors;
  }

  public String getTimeColumn() {
    return timeColumn;
  }

  public void setTimeColumn(String timeColumn) {
    this.timeColumn = timeColumn;
    reinitialize();
  }

  public boolean isDisplayLines() {
    return displayLines;
  }

  public void setDisplayLines(boolean displayLines) {
    this.displayLines = displayLines;
    reinitialize();
  }

  public boolean isDisplayPoints() {
    return displayPoints;
  }

  public void setDisplayPoints(boolean displayPoints) {
    this.displayPoints = displayPoints;
    reinitialize();
  }

  private interface Predicate<T> {
    boolean test(T o);
  }

  private static <T> void filter(Collection<T> collection, Predicate<T> predicate) {
    if ((collection != null) && (predicate != null)) {
      Iterator<T> itr = collection.iterator();
      while (itr.hasNext()) {
        T obj = itr.next();
        if (!predicate.test(obj)) {
          itr.remove();
        }
      }
    }
  }

  private static class ReflectionUtils {
    private static Map<String, Method> SETTERS_MAP = new HashMap<String, Method>();

    static boolean set(Object object, String fieldName, Object fieldValue) {
      Class<?> clazz = object.getClass();
      while (clazz != null) {
        try {
          Field field = clazz.getDeclaredField(fieldName);
          field.setAccessible(true);
          field.set(object, fieldValue);
          return true;
        } catch (NoSuchFieldException e) {
          clazz = clazz.getSuperclass();
        } catch (Exception expected) {
          //nothing to do
        }
      }
      return callSetter(object, fieldName, fieldValue);
    }

    private static boolean callSetter(Object obj, String fieldName, Object fieldValue) {

      String key = String.format("%s.%s(%s)", obj.getClass().getName(),
                                 fieldName, fieldValue.getClass().getName());
      Method m = null;
      if (!SETTERS_MAP.containsKey(key)) {
        m = findMethod(obj, fieldName, fieldValue);
        SETTERS_MAP.put(key, m);
      } else {
        m = SETTERS_MAP.get(key);
      }
      if (m != null) {
        try {
          m.invoke(obj, fieldValue);
          return true;
        } catch (Throwable ignored) {
          //expected
        }
      }
      return false;
    }

    private static Method findMethod(Object obj, String fieldName, Object fieldValue) {
      Method m = null;
      Class<?> theClass = obj.getClass();
      String setter = String.format("set%C%s",
                                    fieldName.charAt(0), fieldName.substring(1));
      Class paramType = fieldValue.getClass();
      while (paramType != null) {
        try {
          m = theClass.getMethod(setter, paramType);
          return m;
        } catch (NoSuchMethodException ex) {
          // try on the interfaces of this class
          for (Class iface : paramType.getInterfaces()) {
            try {
              m = theClass.getMethod(setter, iface);
              return m;
            } catch (NoSuchMethodException ignored) {
            }
          }
          paramType = paramType.getSuperclass();
        }
      }
      return m;
    }
  }
}
