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
import java.io.IOException;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;

/**
 * XYChartSerializer
 *
 */
public class XYChartSerializer extends AbstractChartSerializer<XYChart> {

  public static final String GRAPHICS_LIST = "graphics_list";
  public static final String LOD_THRESHOLD = "lodThreshold";

  @Override
  public void serialize(XYChart xychart, JsonGenerator jgen, SerializerProvider sp)
    throws IOException, JsonProcessingException {

    jgen.writeStartObject();

    serialize(xychart, jgen);

    jgen.writeObjectField(GRAPHICS_LIST, xychart.getGraphics());
    jgen.writeObjectField("constant_lines", xychart.getConstantLines());
    jgen.writeObjectField("constant_bands", xychart.getConstantBands());
    jgen.writeObjectField("texts", xychart.getTexts());
    jgen.writeObjectField("x_auto_range", xychart.getXAutoRange());
    jgen.writeObjectField("x_lower_bound", xychart.getXLowerBound());
    jgen.writeObjectField("x_upper_bound", xychart.getXUpperBound());
    jgen.writeObjectField("log_x", xychart.getLogX());
    jgen.writeObjectField("x_log_base", xychart.getXLogBase());
    if (xychart.getLodThreshold() != null) {
      jgen.writeObjectField(LOD_THRESHOLD, xychart.getLodThreshold());
    }
    jgen.writeObjectField("x_tickLabels_visible", xychart.isxTickLabelsVisible());
    jgen.writeObjectField("y_tickLabels_visible", xychart.isyTickLabelsVisible());
    jgen.writeEndObject();
  }

}
