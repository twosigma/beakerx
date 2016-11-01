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
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.SerializerProvider;

import java.io.IOException;
import java.util.Arrays;

public class HistogramSerializer extends AbstractChartSerializer<Histogram> {

  @Override
  public void serialize(Histogram histogram, JsonGenerator jgen, SerializerProvider provider) throws
                                                                                              IOException,
                                                                                              JsonProcessingException {
    jgen.writeStartObject();

    serialize(histogram, jgen);

    if (histogram.getColors() != null) {
      jgen.writeObjectField("colors", histogram.getColors());
    } else {
      jgen.writeObjectField("color", histogram.getColor());
    }

    if (histogram.getListData() != null) {
      jgen.writeObjectField("graphics_list", histogram.getListData());
    } else {
      jgen.writeObjectField("graphics_list", Arrays.asList(histogram.getData()));
    }

    jgen.writeObjectField("right_close", histogram.getRightClose());
    if (histogram.getRangeMin() != null)
      jgen.writeObjectField("range_min", histogram.getRangeMin());
    if (histogram.getRangeMax() != null)
      jgen.writeObjectField("range_max", histogram.getRangeMax());
    jgen.writeObjectField("bin_count", histogram.getBinCount());
    jgen.writeObjectField("cumulative", histogram.getCumulative());
    jgen.writeObjectField("normed", histogram.getNormed());
    jgen.writeObjectField("log", histogram.getLog());
    jgen.writeObjectField("displayMode", histogram.getDisplayMode());
    jgen.writeObjectField("displayNames", histogram.getDisplayNames());

    jgen.writeEndObject();

  }
}
