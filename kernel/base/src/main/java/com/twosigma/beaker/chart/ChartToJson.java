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

package com.twosigma.beaker.chart;

import com.fasterxml.jackson.core.Version;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.twosigma.beaker.chart.categoryplot.CategoryPlot;
import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryBars;
import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryGraphics;
import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryLines;
import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryPoints;
import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryStems;
import com.twosigma.beaker.chart.heatmap.HeatMap;
import com.twosigma.beaker.chart.histogram.Histogram;
import com.twosigma.beaker.chart.legend.LegendLayout;
import com.twosigma.beaker.chart.legend.LegendPosition;
import com.twosigma.beaker.chart.serializer.AreaSerializer;
import com.twosigma.beaker.chart.serializer.BarsSerializer;
import com.twosigma.beaker.chart.serializer.CategoryBarsSerializer;
import com.twosigma.beaker.chart.serializer.CategoryLinesSerializer;
import com.twosigma.beaker.chart.serializer.CategoryPlotSerializer;
import com.twosigma.beaker.chart.serializer.CategoryPointsSerializer;
import com.twosigma.beaker.chart.serializer.CategoryStemsSerializer;
import com.twosigma.beaker.chart.serializer.ColorSerializer;
import com.twosigma.beaker.chart.serializer.CombinedPlotSerializer;
import com.twosigma.beaker.chart.serializer.ConstantBandSerializer;
import com.twosigma.beaker.chart.serializer.ConstantLineSerializer;
import com.twosigma.beaker.chart.serializer.CrosshairSerializer;
import com.twosigma.beaker.chart.serializer.GradientColorSerializer;
import com.twosigma.beaker.chart.serializer.HeatMapSerializer;
import com.twosigma.beaker.chart.serializer.HistogramSerializer;
import com.twosigma.beaker.chart.serializer.LegendPositionSerializer;
import com.twosigma.beaker.chart.serializer.LineSerializer;
import com.twosigma.beaker.chart.serializer.PointsSerializer;
import com.twosigma.beaker.chart.serializer.RastersSerializer;
import com.twosigma.beaker.chart.serializer.StemsSerializer;
import com.twosigma.beaker.chart.serializer.TextSerializer;
import com.twosigma.beaker.chart.serializer.TreeMapNodeSerializer;
import com.twosigma.beaker.chart.serializer.TreeMapSerializer;
import com.twosigma.beaker.chart.serializer.XYChartSerializer;
import com.twosigma.beaker.chart.serializer.YAxisSerializer;
import com.twosigma.beaker.chart.treemap.Mode;
import com.twosigma.beaker.chart.treemap.TreeMap;
import com.twosigma.beaker.chart.treemap.ValueAccessor;
import com.twosigma.beaker.chart.treemap.util.IToolTipBuilder;
import com.twosigma.beaker.chart.xychart.CombinedPlot;
import com.twosigma.beaker.chart.xychart.XYChart;
import com.twosigma.beaker.chart.xychart.plotitem.Area;
import com.twosigma.beaker.chart.xychart.plotitem.Bars;
import com.twosigma.beaker.chart.xychart.plotitem.ConstantBand;
import com.twosigma.beaker.chart.xychart.plotitem.ConstantLine;
import com.twosigma.beaker.chart.xychart.plotitem.Crosshair;
import com.twosigma.beaker.chart.xychart.plotitem.Line;
import com.twosigma.beaker.chart.xychart.plotitem.PlotOrientationType;
import com.twosigma.beaker.chart.xychart.plotitem.Points;
import com.twosigma.beaker.chart.xychart.plotitem.Rasters;
import com.twosigma.beaker.chart.xychart.plotitem.Stems;
import com.twosigma.beaker.chart.xychart.plotitem.Text;
import com.twosigma.beaker.chart.xychart.plotitem.XYGraphics;
import com.twosigma.beaker.chart.xychart.plotitem.YAxis;
import net.sf.jtreemap.swing.TreeMapNode;

import java.util.ArrayList;
import java.util.Hashtable;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import static com.twosigma.beaker.chart.serializer.AbstractChartSerializer.CROSSHAIR;
import static com.twosigma.beaker.chart.serializer.AbstractChartSerializer.DOMAIN_AXIS_LABEL;
import static com.twosigma.beaker.chart.serializer.AbstractChartSerializer.LOG_Y;
import static com.twosigma.beaker.chart.serializer.AbstractChartSerializer.OMIT_CHECKBOXES;
import static com.twosigma.beaker.chart.serializer.AbstractChartSerializer.RANGE_AXES;
import static com.twosigma.beaker.chart.serializer.AbstractChartSerializer.TIMEZONE;
import static com.twosigma.beaker.chart.serializer.AbstractChartSerializer.X_LOWER_MARGIN;
import static com.twosigma.beaker.chart.serializer.AbstractChartSerializer.X_UPPER_MARGIN;
import static com.twosigma.beaker.chart.serializer.AbstractChartSerializer.Y_AUTO_RANGE;
import static com.twosigma.beaker.chart.serializer.AbstractChartSerializer.Y_AUTO_RANGE_INCLUDES_ZERO;
import static com.twosigma.beaker.chart.serializer.AbstractChartSerializer.Y_LABEL;
import static com.twosigma.beaker.chart.serializer.AbstractChartSerializer.Y_LOWER_BOUND;
import static com.twosigma.beaker.chart.serializer.AbstractChartSerializer.Y_LOWER_MARGIN;
import static com.twosigma.beaker.chart.serializer.AbstractChartSerializer.Y_UPPER_BOUND;
import static com.twosigma.beaker.chart.serializer.AbstractChartSerializer.Y_UPPER_MARGIN;
import static com.twosigma.beaker.chart.serializer.ChartSerializer.CHART_TITLE;
import static com.twosigma.beaker.chart.serializer.ChartSerializer.CUSTOM_STYLES;
import static com.twosigma.beaker.chart.serializer.ChartSerializer.ELEMENT_STYLES;
import static com.twosigma.beaker.chart.serializer.ChartSerializer.INIT_HEIGHT;
import static com.twosigma.beaker.chart.serializer.ChartSerializer.INIT_WIDTH;
import static com.twosigma.beaker.chart.serializer.ChartSerializer.LEGEND_LAYOUT;
import static com.twosigma.beaker.chart.serializer.ChartSerializer.LEGEND_POSITION;
import static com.twosigma.beaker.chart.serializer.HeatMapSerializer.COLOR;
import static com.twosigma.beaker.chart.serializer.XYChartSerializer.CONSTANT_LINES;

public class ChartToJson {

  private static ObjectMapper mapper;
  private static Map<Class<?>, JsonSerializer> serializerMap = new Hashtable<>();

  static {

    serializerMap.put(Color.class, new ColorSerializer());
    serializerMap.put(XYChart.class, new XYChartSerializer());
    serializerMap.put(CombinedPlot.class, new CombinedPlotSerializer());
    serializerMap.put(Line.class, new LineSerializer());
    serializerMap.put(Points.class, new PointsSerializer());
    serializerMap.put(Bars.class, new BarsSerializer());
    serializerMap.put(Stems.class, new StemsSerializer());
    serializerMap.put(Area.class, new AreaSerializer());
    serializerMap.put(YAxis.class, new YAxisSerializer());
    serializerMap.put(Crosshair.class, new CrosshairSerializer());
    serializerMap.put(LegendPosition.class, new LegendPositionSerializer());
    serializerMap.put(Text.class, new TextSerializer());
    serializerMap.put(ConstantLine.class, new ConstantLineSerializer());
    serializerMap.put(ConstantBand.class, new ConstantBandSerializer());
    serializerMap.put(CategoryBars.class, new CategoryBarsSerializer());
    serializerMap.put(CategoryStems.class, new CategoryStemsSerializer());
    serializerMap.put(CategoryPoints.class, new CategoryPointsSerializer());
    serializerMap.put(CategoryLines.class, new CategoryLinesSerializer());
    serializerMap.put(CategoryPlot.class, new CategoryPlotSerializer());
    serializerMap.put(GradientColor.class, new GradientColorSerializer());
    serializerMap.put(Histogram.class, new HistogramSerializer());
    serializerMap.put(HeatMap.class, new HeatMapSerializer());
    serializerMap.put(Rasters.class, new RastersSerializer());
    serializerMap.put(TreeMap.class, new TreeMapSerializer());
    serializerMap.put(TreeMapNode.class, new TreeMapNodeSerializer());

    SimpleModule module = new SimpleModule("ChartSerializer", new Version(1, 0, 0, null));
    serializerMap.forEach(module::addSerializer);

    mapper = new ObjectMapper();
    mapper.registerModule(module);
  }

  public static Map toJson(Object result) {
    try {
      return getMapper().convertValue(result, Map.class);
    } catch (Exception e) {
      throw new IllegalStateException(e.getMessage());
    }
  }

  private static ObjectMapper getMapper() {
    return mapper;
  }

  static Map<Object, Object> serializeLegendPosition(LegendPosition legendPosition) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(LEGEND_POSITION, toJson(legendPosition));
    return value;
  }

  static Map<Object, Object> serializeLegendLayout(LegendLayout legendLayout) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(LEGEND_LAYOUT, legendLayout.toString());
    return value;
  }

  static Map<Object, Object> serializeCustomStyles(List<String> customStyles) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(CUSTOM_STYLES, toJsonList(customStyles));
    return value;
  }

  static Map<Object, Object> serializeElementStyles(Map<String, String> elementStyles) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(ELEMENT_STYLES, toJson(elementStyles));
    return value;
  }

  static Map<Object, Object> serializeInitHeight(int initHeight) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(INIT_HEIGHT, initHeight);
    return value;
  }

  static Map<Object, Object> serializeInitWidth(int initWidth) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(INIT_WIDTH, initWidth);
    return value;
  }

  static Map<Object, Object> serializeTitle(String title) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(CHART_TITLE, title);
    return value;
  }

  static Map<Object, Object> serializeOmitCheckboxes(boolean omitCheckboxes) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(OMIT_CHECKBOXES, omitCheckboxes);
    return value;
  }

  static Map<Object, Object> serializeAutoRangeIncludesZero(boolean autoRangeIncludesZero) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(Y_AUTO_RANGE_INCLUDES_ZERO, autoRangeIncludesZero);
    return value;
  }

  static Map<Object, Object> serializeYBound(YAxis yAxis) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(Y_LOWER_BOUND, yAxis.getLowerBound());
    value.put(Y_UPPER_BOUND, yAxis.getUpperBound());
    return value;
  }

  static Map<Object, Object> serializeXLabel(String title) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(DOMAIN_AXIS_LABEL, title);
    return value;
  }

  static Map<Object, Object> serializeYLabel(String title) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(Y_LABEL, title);
    return value;
  }

  static Map<Object, Object> serializeXLowerMargin(double margin) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(X_LOWER_MARGIN, margin);
    return value;
  }

  static Map<Object, Object> serializeXUpperMargin(double margin) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(X_UPPER_MARGIN, margin);
    return value;
  }

  static Map<Object, Object> serializeAutoRange(Boolean autoRange) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(Y_AUTO_RANGE, autoRange);
    return value;
  }

  static Map<Object, Object> serializeYLowerMargin(Double yLowerMargin) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(Y_LOWER_MARGIN, yLowerMargin);
    return value;
  }

  static Map<Object, Object> serializeUpperMargin(Double upperMargin) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(Y_UPPER_MARGIN, upperMargin);
    return value;
  }

  static Map<Object, Object> serializeCrosshair(Crosshair crosshair) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(CROSSHAIR, toJson(crosshair));
    return value;
  }

  static Map<Object, Object> serializeTimeZone(TimeZone timeZone) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(TIMEZONE, getMapper().convertValue(timeZone, String.class));
    return value;
  }

  static Map<Object, Object> serializeLogY(Boolean logY) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(LOG_Y, logY);
    return value;
  }

  public static Map<Object, Object> serializeHistogramLog(Boolean logY) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(HistogramSerializer.LOG, logY);
    return value;
  }

  static Map<Object, Object> serializeYAxes(List<YAxis> yAxes) {
    List result = new ArrayList();
    for (YAxis item : yAxes) {
      result.add(toJson(item));
    }
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(RANGE_AXES, toJsonList(result));
    return value;
  }


  public static List toJsonList(Object item) {
    return mapper.convertValue(item, List.class);
  }

  public static Map<Object, Object> serializeHeatmapData(Number[][] data) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(HeatMapSerializer.GRAPHICS_LIST, toJsonList(data));
    return value;
  }

  public static Map<Object, Object> serializeHeatmapGradientColor(GradientColor data) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(COLOR, getMapper().convertValue(data, Object.class));
    return value;
  }

  public static Map<Object, Object> serializeConstantLines(List<ConstantLine> constantLines) {
    List result = new ArrayList();
    for (ConstantLine item : constantLines) {
      result.add(toJson(item));
    }
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(CONSTANT_LINES, toJsonList(result));
    return value;
  }

  public static Map<Object, Object> serializeXYGraphics(List<XYGraphics> xyGraphics) {
    List result = new ArrayList();
    for (XYGraphics item : xyGraphics) {
      result.add(toJson(item));
    }
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(XYChartSerializer.GRAPHICS_LIST, toJsonList(result));
    return value;
  }

  public static Map<Object, Object> serializeConstantBands(List<ConstantBand> constantBands) {
    List result = new ArrayList();
    for (ConstantBand item : constantBands) {
      result.add(toJson(item));
    }
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(XYChartSerializer.CONSTANT_BANDS, toJsonList(result));
    return value;
  }

  public static Map<Object, Object> serializeTexts(List<Text> texts) {
    List result = new ArrayList();
    for (Text item : texts) {
      result.add(toJson(item));
    }
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(XYChartSerializer.TEXTS, toJsonList(result));
    return value;
  }

  public static Map<Object, Object> serializeRasters(List<Rasters> rasters) {
    List result = new ArrayList();
    for (Rasters item : rasters) {
      result.add(toJson(item));
    }
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(XYChartSerializer.RASTERS, toJsonList(result));
    return value;
  }

  public static Map<Object, Object> serializeXBound(XYChart xyChart) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(XYChartSerializer.X_AUTO_RANGE, xyChart.getXAutoRange());
    value.put(XYChartSerializer.X_LOWER_BOUND, xyChart.getXLowerBound());
    value.put(XYChartSerializer.X_UPPER_BOUND, xyChart.getXUpperBound());
    return value;
  }

  public static Map<Object, Object> serializeXAutoRange(boolean xAutoRange) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(XYChartSerializer.X_AUTO_RANGE, xAutoRange);
    return value;
  }

  public static Map<Object, Object> serializeLogX(boolean logX) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(XYChartSerializer.LOG_X, logX);
    return value;
  }

  public static Map<Object, Object> serializeXLogBase(double xLogBase) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(XYChartSerializer.X_LOG_BASE, xLogBase);
    return value;
  }

  public static Map<Object, Object> serializeLodThreshold(Integer lodThreshold) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(XYChartSerializer.LOD_THRESHOLD, lodThreshold);
    return value;
  }

  public static Map<Object, Object> serializeXTickLabelsVisible(boolean xtickLabelsVisible) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(XYChartSerializer.X_TICK_LABELS_VISIBLE, xtickLabelsVisible);
    return value;
  }

  public static Map<Object, Object> serializeYTickLabelsVisible(boolean ytickLabelsVisible) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(XYChartSerializer.Y_TICK_LABELS_VISIBLE, ytickLabelsVisible);
    return value;
  }

  public static Map<Object, Object> serializeDisplayMode(Histogram.DisplayMode displayMode) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(HistogramSerializer.DISPLAY_MODE, displayMode.toString());
    return value;
  }

  public static Map<Object, Object> serializeHistogramNames(List<String> names) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(HistogramSerializer.NAMES, toJsonList(names));
    return value;
  }

  public static Map<Object, Object> serializeHistogramListData(List<List<Number>> listData) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(HistogramSerializer.GRAPHICS_LIST, toJsonList(listData));
    return value;
  }

  public static Map<Object, Object> serializeHistogramData(List<Number> data) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(HistogramSerializer.GRAPHICS_LIST, toJsonList(data));
    return value;
  }

  public static Map<Object, Object> serializeColors(List<Color> colors) {
    List result = new ArrayList();
    for (Color item : colors) {
      result.add(getMapper().convertValue(item, String.class));
    }
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(HistogramSerializer.COLORS, result);
    return value;
  }

  public static Map<Object, Object> serializeColor(Color color) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(HistogramSerializer.COLOR, getMapper().convertValue(color, String.class));
    return value;
  }


  public static Map<Object, Object> serializeCumulative(boolean cumulative) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(HistogramSerializer.CUMULATIVE, cumulative);
    return value;
  }

  public static Map<Object, Object> serializeNormed(boolean normed) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(HistogramSerializer.NORMED, normed);
    return value;
  }

  public static Map<Object, Object> serializeBinCount(int binCount) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(HistogramSerializer.BIN_COUNT, binCount);
    return value;
  }

  public static Map<Object, Object> serializeCategoryNames(List<String> categoryNames) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(CategoryPlotSerializer.CATEGORY_NAMES, categoryNames);
    return value;
  }

  public static Map<Object, Object> serializeCategoryGraphics(List<CategoryGraphics> categoryGraphics) {
    List result = new ArrayList();
    for (CategoryGraphics item : categoryGraphics) {
      result.add(toJson(item));
    }
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(CategoryPlotSerializer.GRAPHICS_LIST, result);
    return value;
  }

  public static Map<Object, Object> serializePlotOrientationType(PlotOrientationType orientation) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(CategoryPlotSerializer.ORIENTATION, orientation.toString());
    return value;
  }

  public static Map<Object, Object> serializeCategoryNamesLabelAngle(double categoryNamesLabelAngle) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(CategoryPlotSerializer.CATEGORY_NAMES_LABEL_ANGLE, categoryNamesLabelAngle);
    return value;
  }

  public static Map<Object, Object>  serializeCategoryMargin(double categoryMargin) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(CategoryPlotSerializer.CATEGORY_MARGIN, categoryMargin);
    return value;
  }

  public static Map<Object, Object> serializeTreeMapRound(Boolean round) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(TreeMapSerializer.ROUND, round);
    return value;
  }

  public static Map<Object, Object> serializeTreeMapSticky(Boolean sticky) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(TreeMapSerializer.STICKY, sticky);
    return value;
  }

  public static Map<Object, Object> serializeTreeMapValueAccessor(ValueAccessor valueAccessor) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(TreeMapSerializer.VALUE_ACCESSOR, valueAccessor.toString());
    return value;
  }

  public static Map<Object, Object> serializeTreeMapRatio(Double ratio) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(TreeMapSerializer.RATIO, ratio);
    return value;
  }

  public static Map<Object, Object> serializeTreeMapMode(Mode mode) {
    Map<Object, Object> value = new LinkedHashMap<>();
    value.put(TreeMapSerializer.MODE, mode.getJsName());
    return value;
  }
}