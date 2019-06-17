/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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

import * as _ from 'underscore';
import PlotUtils from "../utils/PlotUtils";

export default class CombinedPlotModel {
  model: any;
  parentScope: any;
  state: any = {};
  disableContextMenu: boolean = true;

  constructor(plotmodel, parentScope?: any) {
    this.model = plotmodel;
    this.parentScope = parentScope;

    this.getCellModel = this.getCellModel.bind(this);
    this.getDumpState = this.getDumpState.bind(this);
    this.setDumpState = this.setDumpState.bind(this);
    this.updateFocus = this.updateFocus.bind(this);
    this.getSaveAsMenuContainer = this.getSaveAsMenuContainer.bind(this);
    this.updateWidth = this.updateWidth.bind(this);
    this.updateMargin = this.updateMargin.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onKey = this.onKey.bind(this);
    this.setActionDetails = this.setActionDetails.bind(this);
  }

  getCellModel() {
    return this.model;
  }

  getDumpState() {
    return this.state;
  }

  setDumpState(state) {
    this.state = state;

    if (this.parentScope && this.parentScope.model.setDumpState !== undefined) {
      this.parentScope.model.setDumpState(this.parentScope.dumpState());
    }
  }

  updateFocus(focus) {
    this.parentScope.plotFocus.setFocus(focus);

    this.setDumpState(this.parentScope.dumpState());

    this.parentScope.updateModels('focus');
  }

  getSaveAsMenuContainer() {
    return this.parentScope.saveAsMenuContainer;
  }

  updateWidth (width, useMinWidth) {
    this.parentScope.width = useMinWidth ? this.parentScope.getMinScopesWidth() : width;
    this.parentScope.element.find("#combplotTitle").css("width", width);

    this.parentScope.updateModels('width');
  }

  updateMargin () {
    // if any of plots has left-positioned legend we should update left margin (with max value)
    // for all plots (to adjust vertical position)
    const plots = this.parentScope.element.find(".plot-plotcontainer");
    let maxMargin = 0;

    plots.each(function() {
      let value = parseFloat($(this).css('margin-left'));
      maxMargin = _.max([value, maxMargin]);
    });

    plots.css("margin-left", maxMargin);

    for (let i = 0; i < this.parentScope.stdmodel.plots.length; i++) {
      this.parentScope.stdmodel.plots[i].updateLegendPosition();
    }
  }

  onClick(plotIndex, item, e) {
    for (let i = 0; i < this.parentScope.stdmodel.plots.length; i++) {
      let subplot = this.parentScope.stdmodel.plots[i];

      if (plotIndex === subplot.plotIndex) {
        this.parentScope.sendEvent(
          'onclick',
          plotIndex,
          item.uid,
          PlotUtils.getActionObject(this.parentScope.model.getCellModel().type, e, i)
        );

        break;
      }
    }
  }

  onKey(key, plotIndex, item, e) {
    for (let i = 0; i < this.parentScope.stdmodel.plots.length; i++) {
      let subplot = this.parentScope.stdmodel.plots[i];

      if (plotIndex !== subplot.plotIndex) { continue; }

      let params = PlotUtils.getActionObject(
        this.parentScope.model.getCellModel().type, e, i
      );

      params.key = key;
      this.parentScope.sendEvent('onkey', plotIndex, item.uid, params);

      break;
    }
  }

  setActionDetails(plotIndex, item, e) {
    for (let i = 0; i < this.parentScope.stdmodel.plots.length; i++) {
      let subplot = this.parentScope.stdmodel.plots[i];

      if (plotIndex !== subplot.plotIndex) {
        continue;
      }

      let params = PlotUtils.getActionObject(
        this.parentScope.model.getCellModel().type, e, i
      );
      params.actionType = 'onclick';
      params.tag = item.clickTag;

      this.parentScope.sendEvent('actiondetails', plotIndex, item.uid, params);

      break;
    }
  }
}
