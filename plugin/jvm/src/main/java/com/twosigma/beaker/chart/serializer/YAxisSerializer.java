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

import com.twosigma.beaker.chart.xychart.plotitem.YAxis;
import java.io.IOException;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

public class YAxisSerializer extends JsonSerializer<YAxis> {

  @Override
  public void serialize(YAxis yAxis, JsonGenerator jgen, SerializerProvider sp)
      throws IOException, JsonProcessingException {

    jgen.writeStartObject();
    jgen.writeObjectField("type", yAxis.getClass().getSimpleName());
    jgen.writeObjectField("auto_range", yAxis.getAutoRange());
    jgen.writeObjectField("auto_range_includes_zero", yAxis.getAutoRangeIncludesZero());
    jgen.writeObjectField("lower_margin", yAxis.getLowerMargin());
    jgen.writeObjectField("upper_margin", yAxis.getUpperMargin());
    jgen.writeObjectField("lower_bound", yAxis.getLowerBound());
    jgen.writeObjectField("upper_bound", yAxis.getUpperBound());
    jgen.writeObjectField("log", yAxis.getLog());
    jgen.writeEndObject();
  }

}
