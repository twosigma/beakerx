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

import PlotStyleUtils from "beakerx_shared/lib/utils/PlotStyleUtils";
import PlotUtils from "./utils/PlotUtils";

export default class PlotCursor {
  scope: any;

  constructor(scope) {
    this.scope = scope;
    
    this.render = this.render.bind(this);
  }

  render(event) {
    const x = event.offsetX;
    const y = event.offsetY;

    const width = PlotStyleUtils.safeWidth(this.scope.jqsvg);
    const height = PlotStyleUtils.safeHeight(this.scope.jqsvg);

    const leftMargin = this.scope.layout.leftLayoutMargin;
    const bottomMargin = this.scope.layout.bottomLayoutMargin;
    const rightMargin = this.scope.layout.rightLayoutMargin;
    const topMargin = this.scope.layout.topLayoutMargin;
    const model = this.scope.stdmodel;

    if (
      x < leftMargin
      || model.yAxisR != null && x > width - rightMargin
      || y > height - bottomMargin
      || y < topMargin
    ) {
      this.scope.svg.selectAll(".plot-cursor").remove();
      this.scope.jqcontainer.find(".plot-cursorlabel").remove();

      return;
    }

    this.renderCursorX(x, height, topMargin, bottomMargin);
    this.renderCursorY(y, width, leftMargin, rightMargin);
  }

  renderCursorX(x, height, topMargin, bottomMargin) {
    if (this.scope.stdmodel.xCursor == null) {
      return;
    }

    const model = this.scope.stdmodel;
    const opt = model.xCursor;
    const mapX = this.scope.plotRange.scr2dataX;

    this.scope.svg.selectAll("#cursor_x")
      .data([{}])
      .enter()
      .append("line")
      .attr("id", "cursor_x")
      .attr("class", "plot-cursor")
      .style("stroke", opt.color)
      .style("stroke-opacity", opt.color_opacity)
      .style("stroke-width", opt.width)
      .style("stroke-dasharray", opt.stroke_dasharray);

    this.scope.svg.select("#cursor_x")
      .attr("x1", x)
      .attr("y1", topMargin)
      .attr("x2", x)
      .attr("y2", height - bottomMargin);

    this.scope.jqcontainer.find("#cursor_xlabel").remove();

    const label = $(`<div id="cursor_xlabel" class="plot-cursorlabel"></div>`)
      .appendTo(this.scope.jqcontainer)
      .text(PlotUtils.getTipStringPercent(mapX(x), model.xAxis));

    const width = label.outerWidth();
    const labelHeight = label.outerHeight();
    const point = {
      x: x - width / 2,
      y: height - bottomMargin - this.scope.labelPadding.y - labelHeight
    };

    label.css({
      "left" : point.x ,
      "top" : point.y ,
      "background-color" : opt.color != null ? opt.color : "black"
    });
  }

  renderCursorY(y, width, leftMargin, rightMargin) {
    if (this.scope.stdmodel.yCursor == null) {
      return;
    }

    const model = this.scope.stdmodel;
    const opt = model.yCursor;

    this.scope.svg.selectAll("#cursor_y").data([{}]).enter().append("line")
      .attr("id", "cursor_y")
      .attr("class", "plot-cursor")
      .style("stroke", opt.color)
      .style("stroke-opacity", opt.color_opacity)
      .style("stroke-width", opt.width)
      .style("stroke-dasharray", opt.stroke_dasharray);

    this.scope.svg.select("#cursor_y")
      .attr("x1", leftMargin)
      .attr("y1", y)
      .attr("x2", width - rightMargin)
      .attr("y2", y);

    this.renderCursorLabel(model.yAxis, "cursor_ylabel", y, false);

    if (model.yAxisR) {
      this.renderCursorLabel(model.yAxisR, "cursor_yrlabel", y, true);
    }
  }

  renderCursorLabel(axis, id, y, alignRight) {
    if (axis == null) {
      return;
    }

    const model = this.scope.stdmodel;
    const opt = model.yCursor;
    const lMargin = this.scope.layout.leftLayoutMargin;
    const rMargin = this.scope.layout.rightLayoutMargin;
    const mapY = this.scope.plotRange.scr2dataY;

    this.scope.jqcontainer.find("#" + id).remove();

    const label = $(`<div id="${id}" class='plot-cursorlabel'></div>`)
      .appendTo(this.scope.jqcontainer)
      .text(PlotUtils.getTipStringPercent(mapY(y), axis));

    const height = label.outerHeight();
    const point = { x: (alignRight ? rMargin : lMargin) + this.scope.labelPadding.x, y: y - height / 2 };

    label.css({
      "top" : point.y ,
      "background-color" : opt.color != null ? opt.color : "black",
      [alignRight ? "right" : "left"]: point.x
    });
  }
  
  clear() {
    this.scope.svg.selectAll(".plot-cursor").remove();
    this.scope.jqcontainer.find(".plot-cursorlabel").remove();
  }
}
