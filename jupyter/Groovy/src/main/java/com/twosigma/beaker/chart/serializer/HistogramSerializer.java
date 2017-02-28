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

import com.twosigma.beaker.chart.histogram.Histogram;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.io.IOException;
import java.util.Arrays;

public class HistogramSerializer extends AbstractChartSerializer<Histogram> {

  public static final String GRAPHICS_LIST = "graphics_list";
  public static final String BIN_COUNT = "bin_count";
  public static final String COLOR = "color";
  public static final String COLORS = "colors";
  public static final String NAMES = "names";
  public static final String DISPLAY_MODE = "displayMode";
  public static final String CUMULATIVE = "cumulative";
  public static final String NORMED = "normed";
  public static final String LOG = "log";

  @Override
  public void serialize(Histogram histogram, JsonGenerator jgen, SerializerProvider provider) throws
                                                                                              IOException,
                                                                                              JsonProcessingException {
    jgen.writeStartObject();

    serialize(histogram, jgen);

    if (histogram.getColors() != null) {
      jgen.writeObjectField(COLORS, histogram.getColors());
    } else {
      jgen.writeObjectField(COLOR, histogram.getColor());
    }

    if (histogram.getListData() != null) {
      jgen.writeObjectField(GRAPHICS_LIST, histogram.getListData());
    } else {
      jgen.writeObjectField(GRAPHICS_LIST, Arrays.asList(histogram.getData()));
    }

    jgen.writeObjectField("right_close", histogram.getRightClose());
    if (histogram.getRangeMin() != null)
      jgen.writeObjectField("range_min", histogram.getRangeMin());
    if (histogram.getRangeMax() != null)
      jgen.writeObjectField("range_max", histogram.getRangeMax());
    jgen.writeObjectField(BIN_COUNT, histogram.getBinCount());
    jgen.writeObjectField(CUMULATIVE, histogram.getCumulative());
    jgen.writeObjectField(NORMED, histogram.getNormed());
    jgen.writeObjectField(LOG, histogram.getLog());
    jgen.writeObjectField(DISPLAY_MODE, histogram.getDisplayMode());
    jgen.writeObjectField(NAMES, histogram.getNames());

    jgen.writeEndObject();

  }
}
