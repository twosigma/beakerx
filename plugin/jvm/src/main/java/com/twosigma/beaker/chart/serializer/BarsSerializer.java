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

import com.twosigma.beaker.chart.xychart.plotitem.Bars;
import java.io.IOException;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

/**
 * PointsSerializer
 *
 */
public class BarsSerializer extends JsonSerializer<Bars> {

  @Override
  public void serialize(Bars bars, JsonGenerator jgen, SerializerProvider sp)
      throws IOException, JsonProcessingException {

    jgen.writeStartObject();
    jgen.writeObjectField("type", bars.getClass().getSimpleName());
    jgen.writeObjectField("x", bars.getX());
    jgen.writeObjectField("y", bars.getY());
    jgen.writeObjectField("visible", bars.getVisible());
    jgen.writeObjectField("display_name", bars.getDisplayName());
    if (bars.getBases() != null) {
      jgen.writeObjectField("bases", bars.getBases());
    } else {
      jgen.writeObjectField("base", bars.getBase());
    }
    if (bars.getWidths() != null) {
      jgen.writeObjectField("widths", bars.getWidths());
    } else {
      jgen.writeObjectField("width", bars.getWidth());
    }
    if (bars.getColors() != null) {
      jgen.writeObjectField("colors", bars.getColors());
    } else {
      jgen.writeObjectField("color", bars.getColor());
    }
    if (bars.getOutlineColors() != null) {
      jgen.writeObjectField("outline_colors", bars.getOutlineColors());
    } else {
      jgen.writeObjectField("outline_color", bars.getOutlineColor());
    }
    jgen.writeObjectField("yAxis", bars.getYAxis());
    jgen.writeEndObject();
  }

}
