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
package com.twosigma.beaker.jvm.serialization;

import com.twosigma.beaker.chart.categoryplot.CategoryPlot;
import com.twosigma.beaker.chart.categoryplot.plotitem.CategoryGraphics;
import com.twosigma.beaker.chart.histogram.Histogram;
import com.twosigma.beaker.chart.treemap.TreeMap;
import com.twosigma.beaker.chart.heatmap.HeatMap;
import com.twosigma.beaker.chart.xychart.CombinedPlot;
import com.twosigma.beaker.chart.xychart.Plot;
import com.twosigma.beaker.chart.xychart.XYChart;
import com.twosigma.beaker.chart.xychart.plotitem.XYGraphics;

import java.io.IOException;

import net.sf.jtreemap.swing.TreeMapNode;
import org.codehaus.jackson.JsonGenerator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class PlotObjectSerializer extends BasicObjectSerializer {

  private final static Logger logger = LoggerFactory.getLogger(PlotObjectSerializer.class.getName());

  @Override
  public boolean writeObject(Object obj, JsonGenerator jgen, boolean expand)
      throws IOException  {

      if (super.writeObject(obj, jgen, expand)) {
        return true;
      } else if (expand && obj instanceof XYChart) {
        jgen.writeObject((XYChart) obj);
      } else if (expand && obj instanceof XYGraphics) {
        jgen.writeObject(new Plot().add((XYGraphics) obj));
      } else if (expand && obj instanceof CategoryPlot) {
        jgen.writeObject((CategoryPlot) obj);
      } else if (expand && obj instanceof CategoryGraphics) {
        jgen.writeObject(new CategoryPlot().add((CategoryGraphics) obj));
      } else if (expand && obj instanceof Histogram) {
        jgen.writeObject((Histogram) obj);
      } else if (expand && obj instanceof TreeMap) {
        jgen.writeObject((TreeMap) obj);
      } else if (expand && obj instanceof TreeMapNode) {
        jgen.writeObject((TreeMapNode) obj);
      } else if (expand && obj instanceof CombinedPlot) {
        jgen.writeObject((CombinedPlot) obj);
      }else if (expand && obj instanceof HeatMap) {
        jgen.writeObject((HeatMap) obj);
      } else {
        return false;
      }
    return true;
  }
}
