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

import com.twosigma.beaker.chart.xychart.NanoPlot;
import com.twosigma.beaker.chart.xychart.plotitem.Text;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.io.IOException;

/**
 * TextSerializer
 */
public class TextSerializer extends JsonSerializer<Text> {

  public static final String TYPE = "type";

  @Override
  public void serialize(Text text, JsonGenerator jgen, SerializerProvider sp)
    throws IOException, JsonProcessingException {

    boolean isNanoPlot = NanoPlot.class.equals(text.getPlotType());
    jgen.writeStartObject();
    jgen.writeObjectField(TYPE, text.getClass().getSimpleName());
    jgen.writeObjectField("x", isNanoPlot ? processLargeNumber(text.getX()) : text.getX());
    jgen.writeObjectField("y", text.getY());
    jgen.writeObjectField("show_pointer", text.getShowPointer());
    jgen.writeObjectField("text", text.getText());
    jgen.writeObjectField("pointer_angle", text.getPointerAngle());
    jgen.writeObjectField("color", text.getColor());
    jgen.writeObjectField("size", text.getSize());
    jgen.writeEndObject();
  }

  private String processLargeNumber(Number largeNumber){
    return largeNumber != null ? largeNumber.toString() : "";
  }

}
