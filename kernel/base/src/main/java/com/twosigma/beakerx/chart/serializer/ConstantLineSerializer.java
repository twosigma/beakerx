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
import com.twosigma.beakerx.chart.Color;
import com.twosigma.beakerx.chart.xychart.NanoPlot;
import com.twosigma.beakerx.chart.xychart.plotitem.ConstantLine;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.io.IOException;

public class ConstantLineSerializer extends JsonSerializer<ConstantLine> {

  public static final String TYPE = "type";

  @Override
  public void serialize(ConstantLine constantLine, JsonGenerator jgen, SerializerProvider sp)
    throws IOException, JsonProcessingException {

    jgen.writeStartObject();

    boolean isNanoPlot = NanoPlot.isNanoPlotClass(constantLine.getPlotType());
    jgen.writeObjectField(TYPE, SerializerUtil.getTypeName(constantLine));
    jgen.writeObjectField("x", isNanoPlot ? processLargeNumber(constantLine.getX()) : constantLine.getX());
    jgen.writeObjectField("y", constantLine.getY());
    jgen.writeObjectField("visible", constantLine.getVisible());
    jgen.writeObjectField("yAxis", constantLine.getYAxis());
    jgen.writeObjectField("showLabel", constantLine.getShowLabel());
    if (constantLine.getWidth() != null) {
      jgen.writeObjectField("width", constantLine.getWidth());
    }
    if (constantLine.getStyle() != null) {
      jgen.writeObjectField("style", constantLine.getStyle().toString());
    }
    if (constantLine.getColor() instanceof Color) {
      jgen.writeObjectField("color", constantLine.getColor());
    }

    jgen.writeEndObject();
  }

  private String processLargeNumber(Number largeNumber){
    return largeNumber != null ? largeNumber.toString() : "";
  }

}