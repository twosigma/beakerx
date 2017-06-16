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

import com.twosigma.beakerx.chart.legend.LegendPosition;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.io.IOException;

/**
 * LegendPositionSerializer
 *
 */
public class LegendPositionSerializer extends JsonSerializer<LegendPosition> {

  public static final String TYPE = "type";
  public static final String POSITION = "position";

  @Override
  public void serialize(LegendPosition legendPosition, JsonGenerator jgen, SerializerProvider sp)
    throws IOException, JsonProcessingException {

    jgen.writeStartObject();
    jgen.writeObjectField(TYPE, legendPosition.getClass().getSimpleName());
    if (legendPosition.getPosition() != null) {
      jgen.writeObjectField(POSITION, legendPosition.getPosition().name());
    }else{
      jgen.writeObjectField("x", legendPosition.getX());
      jgen.writeObjectField("y", legendPosition.getY());
    }
    jgen.writeEndObject();
  }

}