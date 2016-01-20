/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
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
package com.twosigma.beaker.groovy.rest;

import com.google.inject.Inject;
import com.google.inject.Singleton;
import com.twosigma.beaker.Chart;
import com.twosigma.beaker.chart.Graphics;
import com.twosigma.beaker.chart.actions.CategoryGraphicsClickActionObject;
import com.twosigma.beaker.chart.actions.ChartObjectManager;
import com.twosigma.beaker.chart.actions.GraphicsClickActionObject;
import com.twosigma.beaker.chart.actions.XYGraphicsClickActionObject;
import com.twosigma.beaker.chart.categoryplot.CategoryPlot;
import com.twosigma.beaker.chart.xychart.XYChart;
import org.apache.commons.lang3.StringUtils;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.io.IOException;
import java.util.List;

@Path("groovysh/chart")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Singleton
public class ChartRest {

  @Inject
  private ChartObjectManager chartObjectManager;

  @POST
  @Path("xy/click/{chartId}/{graphicsId}")
  public void onXYClick(@PathParam("chartId") String chartId,
                      @PathParam("graphicsId") String graphicsId,
                      XYGraphicsClickActionObject info) throws IOException, InterruptedException {
    Chart chart = chartObjectManager.getChart(chartId);
    onClick(chart, graphicsId, info, ((XYChart)chart).getGraphics());
  }

  @POST
  @Path("category/click/{chartId}/{graphicsId}")
  public void onCategoryClick(@PathParam("chartId") String chartId,
                      @PathParam("graphicsId") String graphicsId,
                      CategoryGraphicsClickActionObject info) throws IOException, InterruptedException {
    Chart chart = chartObjectManager.getChart(chartId);
    onClick(chart, graphicsId, info, ((CategoryPlot)chart).getGraphics());
  }

  private void onClick(Chart chart,
                       String graphicsId,
                       GraphicsClickActionObject info,
                       List<? extends Graphics> graphics) {
    if(graphics != null){
      for(Graphics g: graphics){
        if(StringUtils.equals(g.getUid(), graphicsId)){
          g.fireClick(info);
          chart.setChanged();
          chart.notifyObservers();
        }
      }
    }
  }

}
