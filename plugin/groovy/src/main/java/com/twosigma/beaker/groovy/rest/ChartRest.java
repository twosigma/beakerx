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
import com.twosigma.beaker.AbstractChart;
import com.twosigma.beaker.chart.Graphics;
import com.twosigma.beaker.chart.actions.ChartObjectManager;
import com.twosigma.beaker.chart.actions.GraphicsClickActionObject;
import com.twosigma.beaker.chart.xychart.XYChart;
import org.apache.commons.lang3.StringUtils;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.io.IOException;

@Path("groovysh/chart")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Singleton
public class ChartRest {

  @Inject
  private ChartObjectManager chartObjectManager;

  @POST
  @Path("click/{chartId}/{graphicsId}")
  public void onClick(@PathParam("chartId") String chartId,
                      @PathParam("graphicsId") String graphicsId,
                      GraphicsClickActionObject info) throws IOException, InterruptedException {
    AbstractChart chart = chartObjectManager.getChart(chartId);
    if(chart instanceof XYChart){
      for(Graphics g: ((XYChart)chart).getGraphics()){
        if(StringUtils.equals(g.getUid(), graphicsId)){
          g.fireClick(info);
          chart.setChanged();
          chart.notifyObservers();
        }
      }
    }
  }

}
