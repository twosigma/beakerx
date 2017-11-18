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
import com.twosigma.beakerx.chart.xychart.plotitem.ConstantBand;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ConstantBandSerializer extends JsonSerializer<ConstantBand> {

  public static final String TYPE = "type";

  @Override
  public void serialize(ConstantBand constantBand, JsonGenerator jgen, SerializerProvider sp)
    throws IOException, JsonProcessingException {

    jgen.writeStartObject();

    boolean isNanoPlot = NanoPlot.isNanoPlotClass(constantBand.getPlotType());
    jgen.writeObjectField(TYPE, SerializerUtil.getTypeName(constantBand));
    jgen.writeObjectField("x", isNanoPlot ? processLargeNumbers(constantBand.getX()) : constantBand.getX());
    jgen.writeObjectField("y", constantBand.getY());
    jgen.writeObjectField("visible", constantBand.getVisible());
    jgen.writeObjectField("yAxis", constantBand.getYAxis());
    if (constantBand.getColor() == null){
      jgen.writeObjectField("color", new Color(0, 127, 255, 127));
    }else{
      jgen.writeObjectField("color", constantBand.getColor());
    }

    jgen.writeEndObject();
  }

  private List<String> processLargeNumbers(List<Number> list){
    List<String> stringList = new ArrayList<>(list.size());
    for(Number n : list){
      if(n != null){
        stringList.add(n.toString());
      }else{
        stringList.add("");
      }
    }
    return stringList;
  }
}