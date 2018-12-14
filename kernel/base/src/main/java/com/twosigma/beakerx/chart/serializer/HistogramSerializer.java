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

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.twosigma.beakerx.chart.histogram.Histogram;

import java.io.IOException;
import java.util.List;
import java.util.OptionalInt;

import static java.util.Collections.emptyList;
import static java.util.Collections.singletonList;

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
  public static final String ITEMS = " items";

  private HistogramReducer histogramReducer = new HistogramReducer(Histogram.ROWS_LIMIT, Histogram.NUMBER_OF_POINTS_TO_DISPLAY);

  @Override
  public void serialize(Histogram histogram, JsonGenerator jgen, SerializerProvider provider) throws
          IOException {
    jgen.writeStartObject();

    serialize(histogram, jgen);

    if (histogram.getColors() != null) {
      jgen.writeObjectField(COLORS, histogram.getColors());
    } else {
      jgen.writeObjectField(COLOR, histogram.getColor());
    }

    if (histogram.getListData() != null) {
      serializeListData(jgen, histogram.getListData());
    } else {
      serializeData(jgen, (histogram.getData() != null) ? histogram.getData() : emptyList());
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

  private void serializeData(JsonGenerator jgen, List<Number> list) throws IOException {
    if (Histogram.ROWS_LIMIT < list.size()) {
      jgen.writeObjectField(GRAPHICS_LIST, histogramReducer.limitData(list));
      jgen.writeBooleanField(TOO_MANY_ROWS, true);
      jgen.writeObjectField(ROWS_LIMIT_ITEMS, Histogram.ROWS_LIMIT);
      jgen.writeObjectField(NUMBER_OF_POINTS_TO_DISPLAY, Histogram.NUMBER_OF_POINTS_TO_DISPLAY + ITEMS);
    } else {
      jgen.writeObjectField(GRAPHICS_LIST, singletonList(list));
      jgen.writeBooleanField(TOO_MANY_ROWS, false);
    }
    jgen.writeObjectField(TOTAL_NUMBER_OF_POINTS, list.size());
  }

  private void serializeListData(JsonGenerator jgen, List<List<Number>> listData) throws IOException {
    OptionalInt max = histogramReducer.totalPoints(listData);
    List<List<Number>> limited = histogramReducer.limitListData(listData);
    jgen.writeObjectField(GRAPHICS_LIST, limited);
    jgen.writeObjectField(TOTAL_NUMBER_OF_POINTS, max.orElse(0));
    jgen.writeBooleanField(TOO_MANY_ROWS, max.isPresent() && Histogram.ROWS_LIMIT <= max.getAsInt());
    jgen.writeObjectField(ROWS_LIMIT_ITEMS, Histogram.ROWS_LIMIT);
    jgen.writeObjectField(NUMBER_OF_POINTS_TO_DISPLAY, Histogram.NUMBER_OF_POINTS_TO_DISPLAY + ITEMS);
  }

}
