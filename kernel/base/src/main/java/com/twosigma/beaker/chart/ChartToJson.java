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
import com.twosigma.beaker.chart.serializer.XYChartSerializer;
import com.twosigma.beaker.chart.serializer.YAxisSerializer;
import com.twosigma.beaker.chart.xychart.CombinedPlot;
import com.twosigma.beaker.chart.xychart.XYChart;
import com.twosigma.beaker.chart.xychart.plotitem.Area;
import com.twosigma.beaker.chart.xychart.plotitem.Bars;
import com.twosigma.beaker.chart.xychart.plotitem.ConstantBand;
import com.twosigma.beaker.chart.xychart.plotitem.ConstantLine;
import com.twosigma.beaker.chart.xychart.plotitem.Crosshair;
import com.twosigma.beaker.chart.xychart.plotitem.Line;
import com.twosigma.beaker.chart.xychart.plotitem.Points;
import com.twosigma.beaker.chart.xychart.plotitem.Rasters;
import com.twosigma.beaker.chart.xychart.plotitem.Stems;
import com.twosigma.beaker.chart.xychart.plotitem.Text;
import com.twosigma.beaker.chart.xychart.plotitem.YAxis;
import com.twosigma.beaker.chart.treemap.TreeMap;
import com.twosigma.beaker.chart.serializer.TreeMapSerializer;
import com.twosigma.beaker.chart.serializer.TreeMapNodeSerializer;
import net.sf.jtreemap.swing.TreeMapNode;
import java.util.Hashtable;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static com.twosigma.beaker.chart.serializer.ChartSerializer.CHART_TITLE;
import static com.twosigma.beaker.chart.serializer.ChartSerializer.CUSTOM_STYLES;
import static com.twosigma.beaker.chart.serializer.ChartSerializer.ELEMENT_STYLES;
import static com.twosigma.beaker.chart.serializer.ChartSerializer.INIT_HEIGHT;
import static com.twosigma.beaker.chart.serializer.ChartSerializer.INIT_WIDTH;
import static com.twosigma.beaker.chart.serializer.ChartSerializer.LEGEND_LAYOUT;
import static com.twosigma.beaker.chart.serializer.ChartSerializer.LEGEND_POSITION;

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


  public static List toJsonList(Object item) {
    return mapper.convertValue(item, List.class);
  }

}