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

package com.twosigma.beaker;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Hashtable;
import java.util.Map;

import com.twosigma.beaker.table.TableDisplay;
import com.twosigma.beaker.table.serializer.TableDisplaySerializer;
import com.fasterxml.jackson.core.Version;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.databind.JsonSerializer;


import com.twosigma.beaker.chart.Color;
import com.twosigma.beaker.chart.GradientColor;
import com.twosigma.beaker.chart.categoryplot.CategoryPlot;
import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryBars;
import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryLines;
import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryPoints;
import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryStems;
import com.twosigma.beaker.chart.heatmap.HeatMap;
import com.twosigma.beaker.chart.histogram.Histogram;
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
import com.twosigma.beaker.chart.xychart.plotitem.Stems;
import com.twosigma.beaker.chart.xychart.plotitem.Text;
import com.twosigma.beaker.chart.xychart.plotitem.YAxis;


public class SerializeToString {

  private static int count = 0;
  private static ObjectMapper mapper;
  private static Map<Class<?>, JsonSerializer> serializerMap = new Hashtable<>();

  static {

    serializerMap.put(TableDisplay.class, new TableDisplaySerializer());
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

    SimpleModule module = new SimpleModule("MySerializer", new Version(1, 0, 0, null, null, null));
    serializerMap.forEach((k, v) -> {
      module.addSerializer(k, v);
    });

    mapper = new ObjectMapper();
    mapper.registerModule(module);
  }

  protected static boolean isBeakerChart(Object result) {
    boolean ret = false;
    if (result != null) {
      for (Class<?> clazz : serializerMap.keySet()) {
        ret = clazz.isAssignableFrom(result.getClass());
        if (ret) {
          break;
        }
      }
    }
    return ret;
  }

  public static String doit(Object result) {
    if (mapper != null && isBeakerChart(result)) {
      try {
        String s = mapper.writeValueAsString(result);
        count++;
        s = "<html><div id='beakerChart" + count +
                "'></div><script>var j = " + s +
                "; console.log('plot this:'); console.log(j); window.initPlotd(j,'beakerChart" + count +
                "');</script></html>";
        return s;
      } catch (Exception e) {
        StringWriter w = new StringWriter();
        PrintWriter printWriter = new PrintWriter(w);
        e.printStackTrace(printWriter);
        printWriter.flush();
        return w.toString();
      }
    }
    return result != null ? result.toString() : null;
  }

}