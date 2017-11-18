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
package com.twosigma.beakerx.table.serializer;

import com.twosigma.beakerx.SerializerUtils;
import com.twosigma.beakerx.table.highlight.HeatmapHighlighter;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;

public class HeatmapHighlighterSerializer<H extends HeatmapHighlighter> extends JsonSerializer<H> {

  public static final String TYPE = "type";
  public static final String STYLE = "style";

  @Override
  public void serialize(H value,
                        JsonGenerator jgen,
                        SerializerProvider provider)
    throws IOException, JsonProcessingException {

    synchronized (value) {
      jgen.writeStartObject();
      serializeObj(value, jgen, provider);
      jgen.writeEndObject();
    }
  }

  protected void serializeObj(H value,
                              JsonGenerator jgen,
                              SerializerProvider provider)
    throws IOException, JsonProcessingException {

    jgen.writeObjectField(TYPE, SerializerUtils.getTypeName(value));
    jgen.writeObjectField("colName", value.getColName());
    jgen.writeObjectField(STYLE, value.getStyle());
    jgen.writeObjectField("minVal", value.getMinVal());
    jgen.writeObjectField("maxVal", value.getMaxVal());
    jgen.writeObjectField("minColor", value.getMinColor());
    jgen.writeObjectField("maxColor", value.getMaxColor());

  }

}
