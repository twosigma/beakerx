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

import com.twosigma.beakerx.chart.xychart.plotitem.Points;
import java.io.IOException;
import java.util.stream.Collectors;

import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.twosigma.beakerx.chart.xychart.plotitem.ShapeType;

/**
 * PointsSerializer
 *
 */
public class PointsSerializer extends XYGraphicsSerializer<Points> {

  @Override
  public void serialize(Points points, JsonGenerator jgen, SerializerProvider sp)
      throws IOException, JsonProcessingException {

    jgen.writeStartObject();

    super.serialize(points, jgen, sp);

    if (points.getSizes() != null) {
      jgen.writeObjectField("sizes", points.getSizes());
    } else {
      jgen.writeObjectField("size", points.getSize());
    }
    if (points.getShapes() != null) {
      jgen.writeObjectField("shaps", points.getShapes().stream().map(ShapeType::getText).collect(Collectors.toList()));
    } else {
      jgen.writeObjectField("shape", points.getShape().getText());
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
    jgen.writeEndObject();
  }

}
