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

import com.twosigma.beaker.chart.Color;
import com.twosigma.beaker.chart.xychart.NanoPlot;
import com.twosigma.beaker.chart.xychart.plotitem.ConstantLine;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

import java.io.IOException;

public class ConstantLineSerializer extends JsonSerializer<ConstantLine> {

  @Override
  public void serialize(ConstantLine constantLine, JsonGenerator jgen, SerializerProvider sp)
    throws IOException, JsonProcessingException {

    jgen.writeStartObject();

    boolean isNanoPlot = NanoPlot.class.equals(constantLine.getPlotType());
    jgen.writeObjectField("type", constantLine.getClass().getSimpleName());
    jgen.writeObjectField("x", isNanoPlot ? processLargeNumbers(constantLine.getX()) : constantLine.getX());
    jgen.writeObjectField("y", constantLine.getY());
    jgen.writeObjectField("visible", constantLine.getVisible());
    jgen.writeObjectField("display_name", constantLine.getDisplayName());
    jgen.writeObjectField("yAxis", constantLine.getYAxis());
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

  private String processLargeNumbers(Number largeNumber){
    return largeNumber != null ? largeNumber.toString() : "";
  }

}