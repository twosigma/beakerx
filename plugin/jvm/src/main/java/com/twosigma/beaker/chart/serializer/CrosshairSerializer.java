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

import com.twosigma.beaker.chart.xychart.plotitem.Crosshair;
import com.twosigma.beaker.chart.Color;
import java.io.IOException;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

/**
 * CrosshairSerializer
 *
 */
public class CrosshairSerializer extends JsonSerializer<Crosshair>{

  @Override
  public void serialize(Crosshair crosshair, JsonGenerator jgen, SerializerProvider sp)
      throws IOException, JsonProcessingException {

    jgen.writeStartObject();
    jgen.writeObjectField("type", crosshair.getClass().getSimpleName());
    if (crosshair.getColor() instanceof Color) {
      jgen.writeObjectField("color", crosshair.getColor());
    }
    if (crosshair.getStyle() != null) {
      jgen.writeObjectField("style", crosshair.getStyle().toString());
    }
    if (crosshair.getWidth() != null) {
      jgen.writeObjectField("width", crosshair.getWidth());
    }
    jgen.writeEndObject();
  }

}
