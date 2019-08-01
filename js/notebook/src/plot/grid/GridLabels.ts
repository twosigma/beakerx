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

import * as $ from "jquery";
import PlotRange from "../range/PlotRange";
import PlotFocus from "../zoom/PlotFocus";
import {LabelData} from "./interfaces";
import PlotStyleUtils from "beakerx_shared/lib/utils/PlotStyleUtils";
import PlotUtils from "../utils/PlotUtils";

export default class GridLabels {
  scope: any;
  plotRange: PlotRange;
  plotFocus: PlotFocus;
  rpipeTexts: LabelData[] = [];

  constructor(scope: any) {
    this.scope = scope;
    this.plotFocus = scope.plotFocus;
    this.plotRange = scope.plotRange;

    this.renderAxisXLabel = this.renderAxisXLabel.bind(this);
    this.renderAxisYLabel = this.renderAxisYLabel.bind(this);
    this.renderAxisYRLabel = this.renderAxisYRLabel.bind(this);
  }

  reset() {
    this.rpipeTexts = [];
  }

  render() {
    const mapX = this.plotRange.data2scrX;
    const mapY = this.plotRange.data2scrY;
    const mapY_r = this.plotRange.data2scrY_r;
    const model = this.scope.stdmodel;

    this.renderAxisLabels(model, model.xAxis, mapX, mapY, this.renderAxisXLabel);
    this.renderAxisLabels(model, model.yAxis, mapX, mapY, this.renderAxisYLabel);
    this.renderAxisLabels(model, model.yAxisR, mapX, mapY_r, this.renderAxisYRLabel);
    this.renderAxisCaptions(model);

    this.plotLabels();
  }

  renderAxisLabels(model, axis, mapX, mapY, renderFn) {
    if (!axis || !axis.showGridlineLabels) {
      return;
    }

    const lines = axis.getGridlines();
    const labels = axis.getGridlineLabels();

    for (let i = 0; i < labels.length; i++) {
      renderFn(i, model, mapX, mapY, lines, labels);
    }
  }

  plotLabels() {
    const pipe = this.rpipeTexts;

    this.scope.labelg.selectAll("text").remove();
    this.scope.labelg.selectAll("text")
      .data(pipe, d => d.id).enter().append("text")
      .attr("id", d => d.id)
      .attr("class", d => d.class)
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .attr("transform", d => d.transform)
      .style("text-anchor", d => d["text-anchor"])
      .style("dominant-baseline", d => d["dominant-baseline"])
      .text(d => d.text);
  }

  renderAxisXLabel(i: number, model, mapX, mapY, lines, labels) {
    const x = mapX(lines[i]);
    const y = mapY(this.plotFocus.focus.yl) + this.scope.labelPadding.y;
    const rpipeText = {
      "id": "label_x_" + i,
      "class": "plot-label plot-label-x",
      "text": labels[i],
      "x": x,
      "y": y,
      "text-anchor": "middle",
      "dominant-baseline": "hanging"
    };

    if (
      model.categoryNamesLabelAngle
      && model.categoryNamesLabelAngle !== 0
      && model.orientation === 'VERTICAL'
    ) {
      const labelSize = this.getLabelSize(labels[i], "plot-label");
      const degree = -1 * model.categoryNamesLabelAngle * (180 / Math.PI);
      const delta = degree > 0 ? (labelSize.width / 2) : -1 * (labelSize.width / 2);

      rpipeText['transform'] = `translate(${delta} ${this.scope.labelPadding.y}) rotate(${degree} ${(x - delta)} ${(y + labelSize.height / 2)})`;
    }

    this.rpipeTexts.push(rpipeText);
  }

  renderAxisYLabel(i: number, model, mapX, mapY, lines, labels) {
    const x = mapX(this.plotFocus.focus.xl) - this.scope.labelPadding.x;
    const y = mapY(lines[i]);
    const rpipeText = {
      "id": "label_y_" + i,
      "class": "plot-label plot-label-y",
      "text": labels[i],
      "x": x,
      "y": y,
      "text-anchor": "end",
      "dominant-baseline": "central"
    };

    if (
      model.categoryNamesLabelAngle
      && model.categoryNamesLabelAngle !== 0
      && model.orientation === 'HORIZONTAL'
    ) {
      rpipeText['transform'] = `rotate(${model.categoryNamesLabelAngle * (180 / Math.PI)} ${x} ${y})`;
    }

    this.rpipeTexts.push(rpipeText);
  }

  renderAxisYRLabel(i: number, model, mapX, mapY_r, lines, labels) {
    const y = lines[i];

    this.rpipeTexts.push({
      "id" : `label_yr_${i}`,
      "class" : "plot-label",
      "text" : labels[i],
      "x" : mapX(this.plotFocus.focus.xr) + this.scope.labelPadding.x,
      "y" : mapY_r(y),
      "dominant-baseline" : "central"
    });
  }

  renderAxisCaptions(model) {
    const lMargin = this.scope.layout.leftLayoutMargin;
    const bMargin = this.scope.layout.bottomLayoutMargin;

    if (model.xAxis.label != null) {
      this.rpipeTexts.push({
        "id" : "xlabel",
        "class" : "plot-xylabel",
        "text" : model.xAxis.axisLabelWithCommon,
        "x" : lMargin + (PlotStyleUtils.safeWidth(this.scope.jqsvg) - lMargin) / 2,
        "y" : PlotStyleUtils.safeHeight(this.scope.jqsvg) - PlotUtils.fonts.labelHeight
      });
    }

    if (model.yAxis.label != null) {
      const x = PlotUtils.fonts.labelHeight * 2;
      const y = (PlotStyleUtils.safeHeight(this.scope.jqsvg) - bMargin) / 2;

      this.rpipeTexts.push({
        "id" : "ylabel",
        "class" : "plot-xylabel",
        "text" : model.yAxis.label,
        "x" : x,
        "y" : y,
        "transform" : `rotate(-90 ${x} ${y})`
      });
    }

    if (model.yAxisR && model.yAxisR.label != null) {
      const x = PlotStyleUtils.safeWidth(this.scope.jqsvg) - PlotUtils.fonts.labelHeight;
      const y = (PlotStyleUtils.safeHeight(this.scope.jqsvg) - bMargin) / 2;

      this.rpipeTexts.push({
        "id" : "yrlabel",
        "class" : "plot-xylabel",
        "text" : model.yAxisR.label,
        "x" : x,
        "y" : y,
        "transform" : `rotate(-90 ${x} ${y})`
      });
    }
  }

  getLabelSize(value: string, DOMClass: string) {
    const element = $(`<div>${value}</div>`)
      .css({
        'position': 'absolute',
        'float': 'left',
        'white-space': 'nowrap',
        'visibility': 'hidden',
        'class': DOMClass
      })
      .appendTo($('body'));

    const width = element.width();
    const height = element.height();

    element.remove();

    return { width, height };
  };
}
