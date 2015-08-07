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

package com.twosigma.beaker.chart.serializer;

import com.twosigma.beaker.chart.xychart.XYChart;
import com.twosigma.beaker.chart.xychart.plotitem.XYGraphics;
import com.twosigma.beaker.chart.Color;
import java.io.IOException;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

/**
 * XYChartSerializer
 *
 */
public class XYChartSerializer extends JsonSerializer<XYChart> {

  private static class ColorPalette {
    static final Color[] colors = new Color[]{
      new Color(192, 80, 77),
      new Color(79, 129, 189),
      new Color(155, 187, 89),
      new Color(247, 150, 70),
      new Color(128, 100, 162),
      new Color(75, 172, 198)
    };

     static Color getColor(int i) {
      return colors[i % colors.length];
    }
  }

  @Override
  public void serialize(XYChart xychart, JsonGenerator jgen, SerializerProvider sp)
      throws IOException, JsonProcessingException {
    int i = 0;
    for (XYGraphics g : xychart.getGraphics()) {
      if (g.getColor() == null) {
        g.setColori(ColorPalette.getColor(i++));
      }
    }

    jgen.writeStartObject();
    String type = xychart.getClass().getSimpleName();
    if ("SimpleTimePlot".equals(type)){
      jgen.writeObjectField("type", "TimePlot");
    }else {
      jgen.writeObjectField("type", type);
    }
    jgen.writeObjectField("init_width", xychart.getInitWidth());
    jgen.writeObjectField("init_height", xychart.getInitHeight());
    jgen.writeObjectField("chart_title", xychart.getTitle());
    jgen.writeObjectField("domain_axis_label", xychart.getXLabel());
    jgen.writeObjectField("y_label", xychart.getYLabel());
    jgen.writeObjectField("show_legend", xychart.getShowLegend());
    jgen.writeObjectField("use_tool_tip", xychart.getUseToolTip());
    jgen.writeObjectField("graphics_list", xychart.getGraphics());
    jgen.writeObjectField("constant_lines", xychart.getConstantLines());
    jgen.writeObjectField("constant_bands", xychart.getConstantBands());
    jgen.writeObjectField("texts", xychart.getTexts());
    jgen.writeObjectField("rangeAxes", xychart.getYAxes());
    jgen.writeObjectField("x_auto_range", xychart.getXAutoRange());
    jgen.writeObjectField("x_lower_margin", xychart.getXLowerMargin());
    jgen.writeObjectField("x_upper_margin", xychart.getXUpperMargin());
    jgen.writeObjectField("x_lower_bound", xychart.getXLowerBound());
    jgen.writeObjectField("x_upper_bound", xychart.getXUpperBound());
    jgen.writeObjectField("y_auto_range", xychart.getYAutoRange());
    jgen.writeObjectField("y_auto_range_includes_zero", xychart.getYAutoRangeIncludesZero());
    jgen.writeObjectField("y_lower_margin", xychart.getYLowerMargin());
    jgen.writeObjectField("y_upper_margin", xychart.getYUpperMargin());
    jgen.writeObjectField("y_lower_bound", xychart.getYLowerBound());
    jgen.writeObjectField("y_upper_bound", xychart.getYUpperBound());
    jgen.writeObjectField("log_x", xychart.getLogX());
    jgen.writeObjectField("log_y", xychart.getLogY());
    jgen.writeObjectField("time_zone", xychart.getTimeZone());
    jgen.writeObjectField("crosshair", xychart.getCrosshair());
    if (xychart.getLodThreshold() != null)
      jgen.writeObjectField("lodThreshold", xychart.getLodThreshold());
    jgen.writeEndObject();
  }

}
