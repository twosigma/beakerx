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

package com.twosigma.beakerx.chart;

import com.twosigma.beakerx.widget.CommActions;
import org.apache.commons.lang3.StringUtils;

import com.twosigma.beakerx.NamespaceClient;
import com.twosigma.beakerx.chart.actions.CategoryGraphicsActionObject;
import com.twosigma.beakerx.chart.actions.CombinedPlotActionObject;
import com.twosigma.beakerx.chart.actions.GraphicsActionObject;
import com.twosigma.beakerx.chart.actions.XYGraphicsActionObject;
import com.twosigma.beakerx.chart.categoryplot.CategoryPlot;
import com.twosigma.beakerx.chart.xychart.CombinedPlot;
import com.twosigma.beakerx.chart.xychart.XYChart;
import com.twosigma.beakerx.widget.BeakerxWidget;
import com.twosigma.beakerx.handler.Handler;
import com.twosigma.beakerx.message.Message;

import java.util.HashMap;
import java.util.List;

public abstract class ChartDetails extends BeakerxWidget {

  private GraphicsActionObject details;

  public GraphicsActionObject getDetails() {
    return details;
  }

  public void setDetails(GraphicsActionObject details) {
    this.details = details;
  }

  protected void openComm() {
    super.openComm();
    getComm().addMsgCallbackList((Handler<Message>) this::handleSetDetails, (Handler<Message>) this::handleClick, (Handler<Message>) this::handleKey);
  }

  private void handleSetDetails(Message message) {
    handleCommEventSync(message, CommActions.ACTIONDETAILS, this::onActionDetails);
  }

  private void handleClick(Message message) {
    handleCommEventSync(message, CommActions.ONCLICK, this::onClickAction);
  }

  private void handleKey(Message message) {
    handleCommEventSync(message, CommActions.ONKEY, this::onKeyAction);
  }

  private void onKeyAction(HashMap content, Message message) {
    GraphicsActionObject info = getDetailsFromMessage(content);
    String graphicsId = getGraphicsUid(content);
    Graphics g = getGraphicsById(getGraphics(info, this), graphicsId);
    if (g != null) {
      g.fireOnKey(info.getKey(), info, message);
      sendModel();
    }
  }

  private void onClickAction(HashMap content, Message message) {
    GraphicsActionObject info = getDetailsFromMessage(content);
    String graphicsId = getGraphicsUid(content);
    Graphics g = getGraphicsById(getGraphics(info, this), graphicsId);
    if (g != null) {
      g.fireClick(info, message);
      sendModel();
    }
  }

  protected void onActionDetails(HashMap content, Message message) {
    GraphicsActionObject info = getDetailsFromMessage(content);
    String graphicsId = getGraphicsUid(content);
    Graphics g = getGraphicsById(getGraphics(info, this), graphicsId);
    info.setGraphics(g);
    updateDetails(info);
    if (CommActions.ONCLICK.equals(info.getActionType())) {
      NamespaceClient.getBeaker().runByTag(info.getTag());
    } else if (CommActions.ONKEY.equals(info.getActionType())) {
      NamespaceClient.getBeaker().runByTag(info.getTag());
    }
  }

  protected void updateDetails(GraphicsActionObject info) {
    setDetails(info);
  }

  protected String getGraphicsUid(HashMap content) {
    String ret = null;
    if (content.containsKey("itemId")) {
      ret = (String) content.get("itemId");
    }
    return ret;
  }

  protected GraphicsActionObject getDetailsFromMessage(HashMap content) {
    GraphicsActionObject ret = null;

    if (content.containsKey("params")) {

      HashMap params = (HashMap) content.get("params");

      if (params.containsKey("type")) {

        String type = (String) params.get("type");
        switch (type) {

          case "CategoryGraphicsActionObject": {
            ret = new CategoryGraphicsActionObject();
            CategoryGraphicsActionObject retObject = (CategoryGraphicsActionObject) ret;
            if (params.containsKey("category")) {
              retObject.setCategory((int) params.get("category"));
            }
            if (params.containsKey("series")) {
              retObject.setSeries((int) params.get("series"));
            }
          }
          break;

          case "CombinedPlotActionObject": {
            ret = new CombinedPlotActionObject();
            CombinedPlotActionObject retObject = (CombinedPlotActionObject) ret;
            if (params.containsKey("subplotIndex")) {
              retObject.setSubplotIndex((int) params.get("subplotIndex"));
            }
            if (params.containsKey("index")) {
              retObject.setIndex((int) params.get("index"));
            }
          }
          break;

          case "XYGraphicsActionObject": {
            ret = new XYGraphicsActionObject();
            XYGraphicsActionObject retObject = (XYGraphicsActionObject) ret;
            if (params.containsKey("index")) {
              retObject.setIndex((int) params.get("index"));
            }
          }
          break;
        }

        if (params.containsKey("actionType")) {
          CommActions value = CommActions.getByAction((String) params.get("actionType"));
          ret.setActionType(value);
        }

        if (params.containsKey("tag")) {
          ret.setTag((String) params.get("tag"));
        }

        if (params.containsKey("key")) {
          ret.setKey((String) params.get("key"));
        }

      }
    }
    return ret;
  }


  /**
   * Taken from code{@code com.twosigma.beaker.groovy.rest.ChartRest#getGraphics}
   *
   * @param info  GraphicsActionObject
   * @param chart ChartDetails
   * @return list of Graphics for given plot data
   */
  protected List<? extends Graphics> getGraphics(GraphicsActionObject info, ChartDetails chart) {
    List<? extends Graphics> graphics = null;
    if (chart instanceof XYChart) {
      graphics = ((XYChart) chart).getGraphics();
    } else if (chart instanceof CategoryPlot) {
      graphics = ((CategoryPlot) chart).getGraphics();
    } else if (chart instanceof CombinedPlot) {
      XYChart subplot = ((CombinedPlot) chart).getSubplots().get(((CombinedPlotActionObject) info).getSubplotIndex());
      graphics = subplot.getGraphics();
    }
    return graphics;
  }

  /**
   * code{@code com.twosigma.beaker.groovy.rest.ChartRest#getGraphicsById}
   *
   * @param graphicsList list of Graphics objects
   * @param graphicsId   string with id of Graphics object
   * @return Graphics with given id or null if it wasn't found
   */
  protected Graphics getGraphicsById(List<? extends Graphics> graphicsList, String graphicsId) {
    if (graphicsList != null) {
      for (Graphics g : graphicsList) {
        if (StringUtils.equals(g.getUid(), graphicsId)) {
          return g;
        }
      }
    }
    return null;
  }


}