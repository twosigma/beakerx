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


import com.twosigma.beaker.chart.Chart;
import org.codehaus.jackson.JsonGenerator;

import java.io.IOException;

public abstract class ChartSerializer<T extends Chart> extends ObservableChartSerializer<T> {

  protected void serialize(T chart, JsonGenerator jgen) throws IOException {

    super.serialize(chart, jgen);

    String type = chart.getClass().getSimpleName();
    if ("SimpleTimePlot".equals(type)){
      jgen.writeObjectField("type", "TimePlot");
    }else {
      jgen.writeObjectField("type", type);
    }

    jgen.writeObjectField("init_width", chart.getInitWidth());
    jgen.writeObjectField("init_height", chart.getInitHeight());
    jgen.writeObjectField("chart_title", chart.getTitle());
    jgen.writeObjectField("show_legend", chart.getShowLegend());
    jgen.writeObjectField("use_tool_tip", chart.getUseToolTip());
    jgen.writeObjectField("legend_position", chart.getLegendPosition());
    jgen.writeObjectField("legend_layout", chart.getLegendLayout());
    jgen.writeObjectField("custom_styles", chart.getCustomStyles());
    jgen.writeObjectField("element_styles", chart.getElementStyles());
  }
}
