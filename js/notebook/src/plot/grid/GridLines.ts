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
import {LineData} from "./interfaces";

export default class GridLines {
  scope: any;
  plotRange: PlotRange;
  plotFocus: PlotFocus;
  rpipeGridlines: LineData[] = [];

  constructor(scope: any) {
    this.scope = scope;
    this.plotFocus = scope.plotFocus;
    this.plotRange = scope.plotRange;
  }

  reset() {
    this.rpipeGridlines = [];
  }

  render() {
    this.setGridlines();

    const focus = this.plotFocus.getFocus();
    const model = this.scope.stdmodel;
    const mapX = this.plotRange.data2scrX;
    const mapY = this.plotRange.data2scrY;

    if(model.showXGridlines) {
      this.renderXGridLines(model, focus, mapX, mapY);
    }

    this.renderYGridLines(model, focus, mapX, mapY);
    this.renderAxisXLine(model, focus, mapX, mapY);
    this.renderLeftAxisYLine(model, focus, mapX, mapY);
    this.renderRightAxisYLine(model, focus, mapX);

    this.plotGridlines();
  }

  plotGridlines() {
    const selection = this.scope.gridg.selectAll("line");
    const filterWithoutId = d => d.id;

    selection.data(this.rpipeGridlines, filterWithoutId).exit().remove();

    selection.data(this.rpipeGridlines, filterWithoutId).enter()
      .append("line")
      .attr("id", filterWithoutId)
      .attr("class", d => d.class)
      .attr("x1", d => d.x1)
      .attr("x2", d => d.x2)
      .attr("y1", d => d.y1)
      .attr("y2", d => d.y2)
      .style("stroke", d => d.stroke)
      .style("stroke-dasharray", d => d.stroke_dasharray);

    selection.data(this.rpipeGridlines, filterWithoutId)
      .attr("x1", d => d.x1)
      .attr("x2", d => d.x2)
      .attr("y1", d => d.y1)
      .attr("y2", d => d.y2);
  }

  setGridlines() {
    const focus = this.plotFocus.getFocus();
    const model = this.scope.stdmodel;

    model.xAxis.setGridlines(
      focus.xl,
      focus.xr,
      this.scope.numIntervals.x,
      model.margin.left,
      model.margin.right
    );

    model.yAxis.setGridlines(
      focus.yl,
      focus.yr,
      this.scope.numIntervals.y,
      model.margin.bottom,
      model.margin.top
    );

    if (model.yAxisR) {
      model.yAxisR.setGridlines(
        focus.yl_r,
        focus.yr_r,
        this.scope.numIntervals.y,
        model.margin.bottom_r,
        model.margin.top_r
      )
    }
  };

  renderXGridLines(model, focus, mapX, mapY) {
    const xGridlines = model.xAxis.getGridlines();

    for (let i = 0; i < xGridlines.length; i++) {
      let x = xGridlines[i];

      this.rpipeGridlines.push({
        id: "gridline_x_" + i,
        class: "plot-gridline",
        x1: mapX(x),
        y1: mapY(focus.yl),
        x2: mapX(x),
        y2: mapY(focus.yr)
      });
    }
  }

  renderYGridLines(model, focus, mapX, mapY) {
    const yGridlines = model.yAxis.getGridlines();

    for (let i = 0; i < yGridlines.length; i++) {
      let y = yGridlines[i];

      this.rpipeGridlines.push({
        id: "gridline_y_" + i,
        class: "plot-gridline",
        x1: mapX(focus.xl),
        y1: mapY(y),
        x2: mapX(focus.xr),
        y2: mapY(y)
      });
    }
  }

  renderAxisXLine(model, focus, mapX, mapY) {
    this.rpipeGridlines.push({
      id: "gridline_x_base",
      class: "plot-gridline-base",
      x1: mapX(focus.xl),
      y1: mapY(focus.yl),
      x2: mapX(focus.xr),
      y2: mapY(focus.yl)
    });
  }

  renderLeftAxisYLine(model, focus, mapX, mapY) {
    this.rpipeGridlines.push({
      id: "gridline_y_base",
      class: "plot-gridline-base",
      x1: mapX(focus.xl),
      y1: mapY(focus.yl),
      x2: mapX(focus.xl),
      y2: mapY(focus.yr)
    });
  }

  renderRightAxisYLine(model, focus, mapX) {
    if (focus.yl_r !== undefined && focus.yr_r !== undefined) {
      const mapY_r = this.plotRange.data2scrY_r;

      this.rpipeGridlines.push({
        id: "gridline_yr_base",
        class: "plot-gridline-base",
        x1: mapX(focus.xr),
        y1: mapY_r(focus.yl_r),
        x2: mapX(focus.xr),
        y2: mapY_r(focus.yr_r)
      });
    }
  }
}
