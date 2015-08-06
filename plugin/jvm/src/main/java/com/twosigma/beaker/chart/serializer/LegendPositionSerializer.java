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

import com.twosigma.beaker.chart.LegendPosition;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

import java.io.IOException;

/**
 * LegendPositionSerializer
 *
 */
public class LegendPositionSerializer extends JsonSerializer<LegendPosition> {

  @Override
  public void serialize(LegendPosition legendPosition, JsonGenerator jgen, SerializerProvider sp)
    throws IOException, JsonProcessingException {

    jgen.writeStartObject();
    jgen.writeObjectField("type", legendPosition.getClass().getSimpleName());
    if (legendPosition.getPosition() != null) {
      jgen.writeObjectField("position", legendPosition.getPosition().name());
    }else{
      jgen.writeObjectField("top", legendPosition.getTop());
      jgen.writeObjectField("left", legendPosition.getLeft());
    }
    jgen.writeEndObject();
  }

}