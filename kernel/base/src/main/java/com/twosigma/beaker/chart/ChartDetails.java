/*
 *  Copyright 2014 - 2017 TWO SIGMA OPEN SOURCE, LLC
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

package com.twosigma.beaker.chart;

import org.apache.commons.lang3.StringUtils;

import com.twosigma.beaker.NamespaceClient;
import com.twosigma.beaker.chart.actions.CategoryGraphicsActionObject;
import com.twosigma.beaker.chart.actions.CombinedPlotActionObject;
import com.twosigma.beaker.chart.actions.GraphicsActionObject;
import com.twosigma.beaker.chart.actions.XYGraphicsActionObject;
import com.twosigma.beaker.chart.categoryplot.CategoryPlot;
import com.twosigma.beaker.chart.xychart.CombinedPlot;
import com.twosigma.beaker.chart.xychart.XYChart;
import com.twosigma.beaker.widgets.BeakerxWidget;
import com.twosigma.jupyter.handler.Handler;
import com.twosigma.jupyter.message.Message;

import java.util.HashMap;
import java.util.List;

public abstract class ChartDetails extends BeakerxWidget {

  protected GraphicsActionObject details;

  public GraphicsActionObject getDetails() {
    return details;
  }

  public void setDetails(GraphicsActionObject details) {
    this.details = details;
  }
  
  protected void openComm() {
    super.openComm();
    //getComm().addMsgCallbackList((Handler<Message>)this::handleSetDetails);
  }
  
  private void handleSetDetails(Message message) {
    handleCommEventSync(message, CommActions.ACTIONDETAILS, (ActionPerformed)this::onActionDetails);
  }
  

  protected void onActionDetails(HashMap content){
    GraphicsActionObject info = getDetailsFromMessage(content);
    String graphicsId = getGraphicsUid(content);
    Graphics g = getGraphicsById(getGraphics(info, this), graphicsId);
    info.setGraphics(g);
    setDetails(info);
    if(g.getClickTag() != null && !g.getClickTag().isEmpty()){
      NamespaceClient.getBeaker().runByTag(g.getClickTag());
    }
  }
  
  protected String getGraphicsUid(HashMap content){
    String ret = null;
    if(content.containsKey("itemId")){
      ret = (String)content.get("itemId");
    }
    return ret;
  }
  
  protected GraphicsActionObject getDetailsFromMessage(HashMap content){
    GraphicsActionObject ret = null;
    
    if(content.containsKey("params")){
   
      HashMap params = (HashMap) content.get("params");
      
      if(params.containsKey("type")){
        
        String type = (String)params.get("type");
        switch (type) {
        
        case "CategoryGraphicsActionObject":{
          ret = new CategoryGraphicsActionObject();
          CategoryGraphicsActionObject retObject = (CategoryGraphicsActionObject) ret;
          if(params.containsKey("category")){
            retObject.setCategory((int)params.get("category"));
          }
          if(params.containsKey("series")){
            retObject.setSeries((int)params.get("series"));
          }
        }break;
        
        case "CombinedPlotActionObject":{
          ret = new CombinedPlotActionObject();
          CombinedPlotActionObject retObject = (CombinedPlotActionObject) ret;
          if(params.containsKey("subplotIndex")){
            retObject.setSubplotIndex((int)params.get("subplotIndex"));
          }
          if(params.containsKey("index")){
            retObject.setIndex((int)params.get("index"));
          }
        }break;
        
        case "XYGraphicsActionObject":{
          ret = new XYGraphicsActionObject();
          XYGraphicsActionObject retObject = (XYGraphicsActionObject) ret;
          if(params.containsKey("index")){
            retObject.setIndex((int)params.get("index"));
          }
        }break;
        }
        
      }
    }
    return ret;
  }
  
  
  /**
   * Taken from code{@code com.twosigma.beaker.groovy.rest.ChartRest#getGraphics}
   * 
   * @param info
   * @param chart
   * @return
   */
  protected List<? extends Graphics> getGraphics(GraphicsActionObject info, ChartDetails chart) {
    List<? extends Graphics> graphics = null;
    if(chart instanceof XYChart) {
      graphics = ((XYChart)chart).getGraphics();
    } else if (chart instanceof CategoryPlot) {
      graphics = ((CategoryPlot)chart).getGraphics();
    } else if (chart instanceof CombinedPlot){
      XYChart subplot = ((CombinedPlot) chart).getSubplots().get(((CombinedPlotActionObject)info).getSubplotIndex());
      graphics = subplot.getGraphics();
    }
    return graphics;
  }

  /**
   * code{@code com.twosigma.beaker.groovy.rest.ChartRest#getGraphicsById}
   * 
   * @param graphicsList
   * @param graphicsId
   * @return
   */
  protected Graphics getGraphicsById(List<? extends Graphics> graphicsList, String graphicsId) {
    if(graphicsList != null){
      for(Graphics g: graphicsList){
        if(StringUtils.equals(g.getUid(), graphicsId)){
          return g;
        }
      }
    }
    return null;
  }

  
}