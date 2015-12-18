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

import com.twosigma.beaker.chart.xychart.plotitem.Text;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

import java.io.IOException;

/**
 * TextSerializer
 */
public class TextSerializer extends JsonSerializer<Text> {

  @Override
  public void serialize(Text text, JsonGenerator jgen, SerializerProvider sp)
    throws IOException, JsonProcessingException {

    jgen.writeStartObject();
    jgen.writeObjectField("type", text.getClass().getSimpleName());
    jgen.writeObjectField("x", text.getX());
    jgen.writeObjectField("y", text.getY());
    jgen.writeObjectField("show_pointer", text.getShowPointer());
    jgen.writeObjectField("text", text.getText());
    jgen.writeObjectField("pointer_angle", text.getPointerAngle());
    jgen.writeObjectField("color", text.getColor());
    jgen.writeEndObject();
  }

}
