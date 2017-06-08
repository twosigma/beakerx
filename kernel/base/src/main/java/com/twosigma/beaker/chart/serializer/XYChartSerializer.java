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
  public static final String X_AUTO_RANGE = "x_auto_range";
  public static final String X_LOWER_BOUND = "x_lower_bound";
  public static final String X_UPPER_BOUND = "x_upper_bound";
  public static final String LOG_X = "log_x";
  public static final String X_LOG_BASE = "x_log_base";
  public static final String X_TICK_LABELS_VISIBLE = "x_tickLabels_visible";
  public static final String Y_TICK_LABELS_VISIBLE = "y_tickLabels_visible";
  public static final String TEXTS = "texts";
  public static final String CONSTANT_BANDS = "constant_bands";
  public static final String CONSTANT_LINES = "constant_lines";
  public static final String RASTERS = "rasters";

  @Override
  public void serialize(XYChart xychart, JsonGenerator jgen, SerializerProvider sp)
    throws IOException, JsonProcessingException {

    jgen.writeStartObject();

    serialize(xychart, jgen);

    jgen.writeObjectField(GRAPHICS_LIST, xychart.getGraphics());
    jgen.writeObjectField(CONSTANT_LINES, xychart.getConstantLines());
    jgen.writeObjectField(CONSTANT_BANDS, xychart.getConstantBands());
    jgen.writeObjectField(RASTERS, xychart.getRasters());
    jgen.writeObjectField(TEXTS, xychart.getTexts());
    jgen.writeObjectField(X_AUTO_RANGE, xychart.getXAutoRange());
    jgen.writeObjectField(X_LOWER_BOUND, xychart.getXLowerBound());
    jgen.writeObjectField(X_UPPER_BOUND, xychart.getXUpperBound());
    jgen.writeObjectField(LOG_X, xychart.getLogX());
    jgen.writeObjectField(X_LOG_BASE, xychart.getXLogBase());
    if (xychart.getLodThreshold() != null) {
      jgen.writeObjectField(LOD_THRESHOLD, xychart.getLodThreshold());
    }
    jgen.writeObjectField(X_TICK_LABELS_VISIBLE, xychart.isxTickLabelsVisible());
    jgen.writeObjectField(Y_TICK_LABELS_VISIBLE, xychart.isyTickLabelsVisible());
    jgen.writeEndObject();
  }

}
