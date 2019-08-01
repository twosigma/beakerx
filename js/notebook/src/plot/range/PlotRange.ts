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

import * as d3 from 'd3';
import {ScaleLinear} from "d3";
import PlotFocus from "../zoom/PlotFocus";
import PlotAxisFactory from "../std/axis/PlotAxisFactory";
import PlotStyleUtils from "beakerx_shared/lib/utils/PlotStyleUtils";

export default class PlotRange {
  scope: any;

  data2scrY: ScaleLinear<number, number>;
  data2scrYp: ScaleLinear<number, number>;
  scr2dataY: ScaleLinear<number, number>;
  scr2dataYp: ScaleLinear<number, number>;
  data2scrX: ScaleLinear<number, number>;
  data2scrXp: ScaleLinear<number, number>;
  scr2dataX: ScaleLinear<number, number>;
  scr2dataXp: ScaleLinear<number, number>;
  data2scrY_r: ScaleLinear<number, number>;
  data2scrYp_r: ScaleLinear<number, number>;
  scr2dataY_r: ScaleLinear<number, number>;
  scr2dataYp_r: ScaleLinear<number, number>;

  data2scrXi: (val: number) => number;
  data2scrYi: (val: number) => number;
  data2scrYi_r: (val: number) => number;

  constructor(scope) {
    this.scope = scope;
  }

  static updateAxisXRange(xAxis, model) {
    const vrange = model.vrange;
    const xAxisLabel = model.xAxis.label;

    if (xAxis.axisType === "category") {
      xAxis.setRange(vrange.xl, vrange.xr, model.xAxis.base);
      xAxis.setCategoryNames(model.categoryNames, model.labelsxs);
    } else if (xAxis.axisType === "time" || xAxis.axisType === "nanotime") {
      xAxis.setRange(vrange.xl, vrange.xr, model.timezone);
    } else {
      xAxis.setRange(vrange.xl, vrange.xr, model.xAxis.base);
    }

    if (xAxisLabel != null) {
      xAxis.setLabel(xAxisLabel);
    }

    return xAxis;
  }

  static updateAxisYRange(modelAxis, axisVRange, model) {
    if (modelAxis == null || axisVRange == null) {
      return null;
    }

    const vrange = model.vrange;
    const label = modelAxis.label;
    const axis = PlotAxisFactory.getPlotAxis(modelAxis.type);

    if (axis.axisType === "category") {
      axis.setRange(vrange.xl, vrange.xr, model.xAxis.base);
      axis.setCategoryNames(model.categoryNames, model.labelsxs);
    } else if (axis.axisType !== "time") {
      axis.setRange(axisVRange.yl, axisVRange.yr, modelAxis.base);
    } else {
      axis.setRange(axisVRange.yl, axisVRange.yr, modelAxis.timezone);
    }

    if (label != null) {
      axis.setLabel(label);
    }

    axis.axisMarginValL = modelAxis.lowerMargin;
    axis.axisMarginValR = modelAxis.upperMargin;

    return axis;
  }

  calcRange() {
    const ret = PlotFocus.getDefault(this.scope.stdmodel);

    this.scope.visibleItem = ret.visibleItem;
    this.scope.legendableItem = ret.legendableItem;
    this.scope.plotFocus.setDefault(ret.defaultFocus);
    this.scope.plotFocus.fix(this.scope.plotFocus.defaultFocus);
  }
  
  calcMapping(emitFocusUpdate?) {
    // called every time after the focus is changed
    const focus = this.scope.plotFocus.getFocus();
    const leftMargin = this.scope.layout.leftLayoutMargin;
    const bottomMargin = this.scope.layout.bottomLayoutMargin;
    const topMargin = this.scope.layout.topLayoutMargin;
    const rightMargin = this.scope.layout.rightLayoutMargin;
    const W = PlotStyleUtils.safeWidth(this.scope.jqsvg);
    const H = PlotStyleUtils.safeHeight(this.scope.jqsvg);

    if (emitFocusUpdate && this.scope.model.updateFocus != null) {
      this.scope.model.updateFocus({
        "xl" : focus.xl,
        "xr" : focus.xr
      });
    }

    this.data2scrY = d3.scaleLinear()
      .domain([focus.yl, focus.yr])
      .range([H - bottomMargin, topMargin]);

    this.data2scrYp = d3.scaleLinear()
      .domain([focus.yl, focus.yr])
      .range([1, 0]);

    this.scr2dataY = d3.scaleLinear()
      .domain([topMargin, H - bottomMargin])
      .range([focus.yr, focus.yl]);

    this.scr2dataYp = d3.scaleLinear()
      .domain([topMargin, H - bottomMargin])
      .range([1, 0]);

    this.data2scrX = d3.scaleLinear()
      .domain([focus.xl, focus.xr])
      .range([leftMargin, W - rightMargin]);

    this.data2scrXp = d3.scaleLinear()
      .domain([focus.xl, focus.xr])
      .range([0, 1]);

    this.scr2dataX = d3.scaleLinear()
      .domain([leftMargin, W - rightMargin])
      .range([focus.xl, focus.xr]);

    this.scr2dataXp = d3.scaleLinear()
      .domain([leftMargin, W - rightMargin])
      .range([0, 1]);

    if (focus.yr_r !== undefined && focus.yl_r !== undefined) {
      this.data2scrY_r = d3.scaleLinear()
        .domain([focus.yl_r, focus.yr_r])
        .range([H - bottomMargin, topMargin]);

      this.data2scrYp_r = d3.scaleLinear()
        .domain([focus.yl_r, focus.yr_r])
        .range([1, 0]);

      this.scr2dataY_r = d3.scaleLinear()
        .domain([topMargin, H - bottomMargin])
        .range([focus.yr_r, focus.yl_r]);

      this.scr2dataYp_r = d3.scaleLinear()
        .domain([topMargin, H - bottomMargin])
        .range([1, 0]);
    }

    this.data2scrXi = (val) => Number(this.data2scrX(val).toFixed(this.scope.renderFixed));
    this.data2scrYi = (val) => Number(this.data2scrY(val).toFixed(this.scope.renderFixed));

    if (this.data2scrY_r !== undefined) {
      this.data2scrYi_r = (val) => Number(this.data2scrY_r(val).toFixed(this.scope.renderFixed));
    }
  }
}
