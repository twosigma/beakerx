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

import com.twosigma.beaker.chart.xychart.plotitem.Points;
import java.io.IOException;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

/**
 * PointsSerializer
 *
 */
public class PointsSerializer extends JsonSerializer<Points> {

  @Override
  public void serialize(Points points, JsonGenerator jgen, SerializerProvider sp)
      throws IOException, JsonProcessingException {

    jgen.writeStartObject();
    jgen.writeObjectField("type", points.getClass().getSimpleName());
    jgen.writeObjectField("x", points.getX());
    jgen.writeObjectField("y", points.getY());
    jgen.writeObjectField("visible", points.getVisible());
    jgen.writeObjectField("display_name", points.getDisplayName());
    if (points.getSizes() != null) {
      jgen.writeObjectField("sizes", points.getSizes());
    } else {
      jgen.writeObjectField("size", points.getSize());
    }
    if (points.getShapes() != null) {
      jgen.writeObjectField("shaps", points.getShapes());
    } else {
      jgen.writeObjectField("shape", points.getShape());
    }
    if (points.getFills() != null) {
      jgen.writeObjectField("fills", points.getFills());
    } else {
      jgen.writeObjectField("fill", points.getFill());
    }
    if (points.getColors() != null) {
      jgen.writeObjectField("colors", points.getColors());
    } else {
      jgen.writeObjectField("color", points.getColor());
    }
    if (points.getOutlineColors() != null) {
      jgen.writeObjectField("outline_colors", points.getOutlineColors());
    } else {
      jgen.writeObjectField("outline_color", points.getOutlineColor());
    }
    jgen.writeObjectField("yAxis", points.getYAxis());
    jgen.writeEndObject();
  }

}
