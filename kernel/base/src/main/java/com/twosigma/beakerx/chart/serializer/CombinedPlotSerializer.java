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

package com.twosigma.beakerx.chart.serializer;

import com.twosigma.beakerx.util.SerializerUtil;
import com.twosigma.beakerx.chart.xychart.CombinedPlot;
import com.twosigma.beakerx.chart.xychart.XYChart;
import static com.twosigma.beakerx.chart.serializer.AbstractChartSerializer.AUTO_ZOOM;
import java.io.IOException;
import java.util.List;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;

/**
 * XYCombinedChartSerializer
 *
 */
public class CombinedPlotSerializer extends ObservableChartSerializer<CombinedPlot> {

  public static final String X_LABEL = "x_label";

  @Override
  public void serialize(CombinedPlot plot, JsonGenerator jgen, SerializerProvider sp)
      throws IOException, JsonProcessingException
  {
    jgen.writeStartObject();
    super.serialize(plot, jgen);
    jgen.writeObjectField("type", SerializerUtil.getTypeName(plot));
    jgen.writeObjectField("init_width", plot.getInitWidth());
    jgen.writeObjectField("init_height", plot.getInitHeight());
    jgen.writeObjectField("title", plot.getTitle());
    jgen.writeObjectField(X_LABEL, plot.getXLabel());
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
    jgen.writeObjectField(AUTO_ZOOM, plot.getAutoZoom());
    jgen.writeEndObject();
  }

}
