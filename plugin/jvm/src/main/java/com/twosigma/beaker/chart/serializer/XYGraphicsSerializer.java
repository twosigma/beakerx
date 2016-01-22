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

import com.twosigma.beaker.chart.xychart.NanoPlot;
import com.twosigma.beaker.chart.xychart.plotitem.XYGraphics;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.SerializerProvider;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * XYGraphicsSerializer
 */
public class XYGraphicsSerializer<T extends XYGraphics> extends JsonSerializer<T> {

  @Override
  public void serialize(T xyGraphics, JsonGenerator jgen, SerializerProvider sp)
    throws IOException, JsonProcessingException {

    boolean isNanoPlot = NanoPlot.class.equals(xyGraphics.getPlotType());
    jgen.writeObjectField("x", isNanoPlot ? processLargeNumbers(xyGraphics.getX()) : xyGraphics.getX());
    jgen.writeObjectField("y", xyGraphics.getY());
    jgen.writeObjectField("visible", xyGraphics.getVisible());
    jgen.writeObjectField("display_name", xyGraphics.getDisplayName());
    jgen.writeObjectField("yAxis", xyGraphics.getYAxis());
    if (xyGraphics.getLodFilter() != null){
      jgen.writeObjectField("lod_filter", xyGraphics.getLodFilter().getText());
    }
    if (xyGraphics.getToolTips() != null) {
      jgen.writeObjectField("tooltips", xyGraphics.getToolTips());
    }
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
