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

import com.twosigma.beakerx.util.SerializerUtil;
import com.twosigma.beakerx.chart.xychart.plotitem.Crosshair;
import com.twosigma.beakerx.chart.Color;
import java.io.IOException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;

/**
 * CrosshairSerializer
 *
 */
public class CrosshairSerializer extends JsonSerializer<Crosshair>{

  public static final String TYPE = "type";

  @Override
  public void serialize(Crosshair crosshair, JsonGenerator jgen, SerializerProvider sp)
      throws IOException, JsonProcessingException {

    jgen.writeStartObject();
    jgen.writeObjectField(TYPE, SerializerUtil.getTypeName(crosshair));
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
