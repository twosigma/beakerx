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

import com.twosigma.beaker.chart.xychart.CombinedPlot;
import com.twosigma.beaker.chart.xychart.XYChart;
import java.io.IOException;
import java.util.List;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.SerializerProvider;

/**
 * XYCombinedChartSerializer
 *
 */
public class CombinedPlotSerializer extends ObservableChartSerializer<CombinedPlot> {

  @Override
  public void serialize(CombinedPlot plot, JsonGenerator jgen, SerializerProvider sp)
      throws IOException, JsonProcessingException
  {
    jgen.writeStartObject();
    super.serialize(plot, jgen);
    jgen.writeObjectField("type", plot.getClass().getSimpleName());
    jgen.writeObjectField("init_width", plot.getInitWidth());
    jgen.writeObjectField("init_height", plot.getInitHeight());
    jgen.writeObjectField("title", plot.getTitle());
    jgen.writeObjectField("x_label", plot.getXLabel());
    List<XYChart> subplots = plot.getSubplots();
    if (!subplots.isEmpty()) {

      String plot_type = subplots.get(0).getClass().getSimpleName();
      if ("SimpleTimePlot".equals(plot_type)){
        jgen.writeObjectField("plot_type", "TimePlot");
      }else {
        jgen.writeObjectField("plot_type", plot_type);
      }
    }
    jgen.writeObjectField("plots", subplots);
    jgen.writeObjectField("weights", plot.getWeights());
    jgen.writeObjectField("version", "groovy");
    jgen.writeObjectField("x_tickLabels_visible", plot.isxTickLabelsVisible());
    jgen.writeObjectField("y_tickLabels_visible", plot.isyTickLabelsVisible());
    jgen.writeEndObject();
  }

}
