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

import com.twosigma.beaker.chart.xychart.plotitem.Line;
import com.twosigma.beaker.chart.Color;
import java.io.IOException;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

public class LineSerializer extends JsonSerializer<Line> {

  @Override
  public void serialize(Line line, JsonGenerator jgen, SerializerProvider sp)
      throws IOException, JsonProcessingException {

    jgen.writeStartObject();
    jgen.writeObjectField("type", line.getClass().getSimpleName());
    jgen.writeObjectField("x", line.getX());
    jgen.writeObjectField("y", line.getY());
    jgen.writeObjectField("visible", line.getVisible());
    jgen.writeObjectField("display_name", line.getDisplayName());
    if (line.getColor() instanceof Color) {
      jgen.writeObjectField("color", line.getColor());
    }
    if (line.getWidth() != null) {
      jgen.writeObjectField("width", line.getWidth());
    }
    if (line.getStyle() != null) {
      jgen.writeObjectField("style", line.getStyle().toString());
    }
    if (line.getInterpolation() != null) {
      jgen.writeObjectField("interpolation", line.getInterpolation());
    }
    jgen.writeEndObject();
  }

}
