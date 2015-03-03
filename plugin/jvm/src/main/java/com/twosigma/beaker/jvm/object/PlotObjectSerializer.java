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
package com.twosigma.beaker.jvm.object;

import com.twosigma.beaker.chart.xychart.CombinedPlot;
import com.twosigma.beaker.chart.xychart.Plot;
import com.twosigma.beaker.chart.xychart.XYChart;
import com.twosigma.beaker.chart.xychart.plotitem.XYGraphics;

import java.io.IOException;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;

public class PlotObjectSerializer extends BasicObjectSerializer {

  @Override
  public boolean writeObject(Object obj, JsonGenerator jgen)
      throws IOException, JsonProcessingException  {

    try {
      if (super.writeObject(obj, jgen)) {
        return true;
      } else if (obj instanceof XYChart) {
        jgen.writeObject((XYChart) obj);
      } else if (obj instanceof XYGraphics) {
        jgen.writeObject(new Plot().add((XYGraphics) obj));
      } else if (obj instanceof CombinedPlot) {
        jgen.writeObject((CombinedPlot) obj);
      } else {
        return false;
      }
    } catch (Exception e) {
      System.err.println(e);
      return false;
    }
    return true;
  }
}
