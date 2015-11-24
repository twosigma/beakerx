/*
 *  Copyright 2014 TWO SIGMA INVESTMENTS, LLC
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


import com.google.inject.Inject;
import com.google.inject.Provider;
import com.google.inject.Singleton;
import com.twosigma.beaker.AbstractChart;
import com.twosigma.beaker.chart.Color;
import com.twosigma.beaker.chart.actions.ChartObjectManager;
import com.twosigma.beaker.jvm.updater.UpdateManager;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.JsonSerializer;

import java.io.IOException;

@Singleton
public abstract class AbstractChartSerializer<T extends AbstractChart> extends JsonSerializer<T> {

  protected static class ColorPalette {
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

  @Inject
  private Provider<ChartObjectManager> chartObjectManagerProvider;
  @Inject
  private Provider<UpdateManager> updateManagerProvider;

  protected void serialize(T chart, JsonGenerator jgen) throws IOException {

    String id = updateManagerProvider.get().register(chart);
    chartObjectManagerProvider.get().registerChart(id, chart);
    jgen.writeStringField("update_id", id);

    String type = chart.getClass().getSimpleName();
    if ("SimpleTimePlot".equals(type)){
      jgen.writeObjectField("type", "TimePlot");
    }else {
      jgen.writeObjectField("type", type);
    }

    jgen.writeObjectField("init_width", chart.getInitWidth());
    jgen.writeObjectField("init_height", chart.getInitHeight());
    jgen.writeObjectField("chart_title", chart.getTitle());
    jgen.writeObjectField("domain_axis_label", chart.getXLabel());
    jgen.writeObjectField("y_label", chart.getYLabel());
    jgen.writeObjectField("show_legend", chart.getShowLegend());
    jgen.writeObjectField("use_tool_tip", chart.getUseToolTip());
    jgen.writeObjectField("rangeAxes", chart.getYAxes());
    jgen.writeObjectField("x_lower_margin", chart.getXLowerMargin());
    jgen.writeObjectField("x_upper_margin", chart.getXUpperMargin());
    jgen.writeObjectField("y_auto_range", chart.getYAutoRange());
    jgen.writeObjectField("y_auto_range_includes_zero", chart.getYAutoRangeIncludesZero());
    jgen.writeObjectField("y_lower_margin", chart.getYLowerMargin());
    jgen.writeObjectField("y_upper_margin", chart.getYUpperMargin());
    jgen.writeObjectField("y_lower_bound", chart.getYLowerBound());
    jgen.writeObjectField("y_upper_bound", chart.getYUpperBound());
    jgen.writeObjectField("log_y", chart.getLogY());
    jgen.writeObjectField("timezone", chart.getTimeZone());
    jgen.writeObjectField("crosshair", chart.getCrosshair());
    jgen.writeObjectField("legend_position", chart.getLegendPosition());
    jgen.writeObjectField("omit_checkboxes", chart.getOmitCheckboxes());
    jgen.writeObjectField("legend_layout", chart.getLegendLayout());
  }
}
