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

import PlotRange from "../range/PlotRange";
import PlotFocus from "../zoom/PlotFocus";

export default class GridTics {
  scope: any;
  plotRange: PlotRange;
  plotFocus: PlotFocus;

  constructor(scope: any) {
    this.scope = scope;
    this.plotFocus = scope.plotFocus;
    this.plotRange = scope.plotRange;
  }

  render() {
    const mapX = this.plotRange.data2scrX;
    const mapY = this.plotRange.data2scrY;
    const focus = this.plotFocus.getFocus();
    const model = this.scope.stdmodel;

    this.renderAxisXTics(model, focus, mapX, mapY);
    this.renderLeftAxisYTics(model, focus, mapX, mapY);
    this.renderRightAxisYTics(model, focus, mapX);
  }

  renderAxisXTics(model, focus, mapX, mapY) {
    if (!model.xAxis.showGridlineLabels) {
      return;
    }

    const tickLength = this.scope.gridlineTickLength;
    const lines = model.xAxis.getGridlines();
    const labels = model.xAxis.getGridlineLabels();

    for (var i = 0; i < labels.length; i++) {
      let x = lines[i];

      this.scope.rpipeTicks.push({
        id: "tick_x_" + i,
        class: "plot-tick",
        x1: mapX(x),
        y1: mapY(focus.yl),
        x2: mapX(x),
        y2: mapY(focus.yl) + tickLength
      });
    }
  }

  renderLeftAxisYTics(model, focus, mapX, mapY) {
    if (!model.yAxis.showGridlineLabels) {
      return;
    }

    const tickLength = this.scope.gridlineTickLength;
    const lines = model.yAxis.getGridlines();
    const labels = model.yAxis.getGridlineLabels();

    for (let i = 0; i < labels.length; i++) {
      let y = lines[i];

      this.scope.rpipeTicks.push({
        id: "tick_y_" + i,
        class: "plot-tick",
        x1: mapX(focus.xl) - tickLength,
        y1: mapY(y),
        x2: mapX(focus.xl),
        y2: mapY(y)
      });
    }
  }

  renderRightAxisYTics(model, focus, mapX) {
    if (!model.yAxisR || !model.yAxisR.showGridlineLabels) {
      return;
    }

    const mapY_r = this.plotRange.data2scrY_r;
    const tickLength = this.scope.gridlineTickLength;
    const lines = model.yAxisR.getGridlines();
    const labels = model.yAxisR.getGridlineLabels();

    for (let i = 0; i < labels.length; i++) {
      let y = lines[i];

      this.scope.rpipeTicks.push({
        id: "tick_yr_" + i,
        class: "plot-tick",
        x1: mapX(focus.xr),
        y1: mapY_r(y),
        x2: mapX(focus.xr) + tickLength,
        y2: mapY_r(y)
      });
    }
  }
}
