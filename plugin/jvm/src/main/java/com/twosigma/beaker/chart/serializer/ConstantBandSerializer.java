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

import com.twosigma.beaker.chart.Color;
import com.twosigma.beaker.chart.xychart.NanoPlot;
import com.twosigma.beaker.chart.xychart.plotitem.ConstantBand;
import com.twosigma.beaker.chart.xychart.plotitem.ConstantLine;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.SerializerProvider;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ConstantBandSerializer extends JsonSerializer<ConstantBand> {

  @Override
  public void serialize(ConstantBand constantBand, JsonGenerator jgen, SerializerProvider sp)
    throws IOException, JsonProcessingException {

    jgen.writeStartObject();

    boolean isNanoPlot = NanoPlot.class.equals(constantBand.getPlotType());
    jgen.writeObjectField("type", constantBand.getClass().getSimpleName());
    jgen.writeObjectField("x", isNanoPlot ? processLargeNumbers(constantBand.getX()) : constantBand.getX());
    jgen.writeObjectField("y", constantBand.getY());
    jgen.writeObjectField("visible", constantBand.getVisible());
    jgen.writeObjectField("yAxis", constantBand.getYAxis());
    if (constantBand.getColor() instanceof Color) {
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