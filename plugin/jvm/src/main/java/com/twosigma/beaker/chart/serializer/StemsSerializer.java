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

import com.twosigma.beaker.chart.xychart.plotitem.Stems;
import java.io.IOException;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

/**
 * PointsSerializer
 *
 */
public class StemsSerializer extends JsonSerializer<Stems> {

  @Override
  public void serialize(Stems stems, JsonGenerator jgen, SerializerProvider sp)
      throws IOException, JsonProcessingException {

    jgen.writeStartObject();
    jgen.writeObjectField("type", stems.getClass().getSimpleName());
    jgen.writeObjectField("x", stems.getX());
    jgen.writeObjectField("y", stems.getY());
    jgen.writeObjectField("visible", stems.getVisible());
    jgen.writeObjectField("display_name", stems.getDisplayName());
    if (stems.getBases() != null) {
      jgen.writeObjectField("bases", stems.getBases());
    } else {
      jgen.writeObjectField("base", stems.getBase());
    }
    if (stems.getColors() != null) {
      jgen.writeObjectField("colors", stems.getColors());
    } else {
      jgen.writeObjectField("color", stems.getColor());
    }
    if (stems.getWidth() != null) {
      jgen.writeObjectField("width", stems.getWidth());
    }
    if (stems.getStyles() != null) {
      jgen.writeObjectField("styles", stems.getStyles());
    } else {
      jgen.writeObjectField("style", stems.getStyle().toString());
    }
    jgen.writeEndObject();
  }

}
