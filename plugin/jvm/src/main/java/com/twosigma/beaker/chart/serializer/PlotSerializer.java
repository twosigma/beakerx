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

import com.twosigma.beaker.chart.xychart.Plot;
import com.twosigma.beaker.chart.xychart.plotitem.XYGraphics;
import java.awt.Color;
import java.io.IOException;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

/**
 * PlotSerializer
 *
 */
public class PlotSerializer extends JsonSerializer<Plot> {

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
  public void serialize(Plot plot, JsonGenerator jgen, SerializerProvider sp)
      throws IOException, JsonProcessingException {
    int i = 0;
    for (XYGraphics g : plot.getGraphics()) {
      if (g.getColor() == null) {
        g.setColor(ColorPalette.getColor(i++));
      }
    }

    jgen.writeStartObject();
    jgen.writeObjectField("type", plot.getClass().getSimpleName());
    jgen.writeObjectField("init_width", plot.getInitWidth());
    jgen.writeObjectField("init_height", plot.getInitHeight());
    jgen.writeObjectField("chart_title", plot.getTitle());
    jgen.writeObjectField("domain_axis_label", plot.getXLabel());
    jgen.writeObjectField("y_label", plot.getYLabel());
    jgen.writeObjectField("show_legend", plot.getShowLegend());
    jgen.writeObjectField("use_tool_tip", plot.getUseToolTip());
    jgen.writeObjectField("graphics_list", plot.getGraphics());
    jgen.writeObjectField("constant_lines", plot.getConstantLines());
    jgen.writeObjectField("constant_bands", plot.getConstantBands());
    jgen.writeObjectField("texts", plot.getTexts());
    jgen.writeObjectField("rangeAxes", plot.getYAxes());
    jgen.writeObjectField("x_auto_range", plot.getXAutoRange());
    jgen.writeObjectField("x_lower_margin", plot.getXLowerMargin());
    jgen.writeObjectField("x_upper_margin", plot.getXUpperMargin());
    jgen.writeObjectField("x_lower_bound", plot.getXLowerBound());
    jgen.writeObjectField("x_upper_bound", plot.getXUpperBound());
    jgen.writeObjectField("y_auto_range", plot.getYAutoRange());
    jgen.writeObjectField("y_auto_range_includes_zero", plot.getYAutoRangeIncludesZero());
    jgen.writeObjectField("y_lower_margin", plot.getYLowerMargin());
    jgen.writeObjectField("y_upper_margin", plot.getYUpperMargin());
    jgen.writeObjectField("y_lower_bound", plot.getYLowerBound());
    jgen.writeObjectField("y_upper_bound", plot.getYUpperBound());
    jgen.writeObjectField("log_x", plot.getLogX());
    jgen.writeObjectField("log_y", plot.getLogY());
    jgen.writeObjectField("time_zone", plot.getTimeZone());
    jgen.writeEndObject();
  }

}
