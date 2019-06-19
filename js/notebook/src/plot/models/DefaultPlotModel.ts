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

import AbstractPlotModel from "./AbstractPlotModel";
import PlotAxisFactory from "../std/axis/PlotAxisFactory";
import PlotFocus from "../zoom/PlotFocus";
import {GroovyKernelMapping} from "../mapping/groovy";
import {DefaultKernelMapping} from "../mapping/default";
import {StandardModelData} from "../mapping/interfaces";
import PlotRange from "../range/PlotRange";
import BigNumberUtils from "beakerx_shared/lib/utils/BigNumberUtils";
import PlotUtils from "../utils/PlotUtils";

const plotFactory = require('../plotFactory');

const DEFAULT_LINE_ITEM_WIDTH = 2;
const DEFAULT_BAR_ITEM_WIDTH = 1;

export default class DefaultPlotModel extends AbstractPlotModel {
  createNewModel(model): StandardModelData {
    if (model.version === "groovy") {  // model returned from serializer
      return GroovyKernelMapping.mapStandardPlotModelData(model);
    }

    return DefaultKernelMapping.mapStandardPlotModelData(model);
  }

  format(newmodel) {
    this.formatModel(newmodel); // fill in null entries, compute y2, etc.
    this.sortModelDataItems(newmodel);

    // at this point, data is in standard format (log is applied as well)

    const yAxisData = [];
    const yAxisRData = [];

    this.addDataToAxes(newmodel, yAxisRData, yAxisData);

    newmodel.showLegend = newmodel.showLegend != null ? newmodel.showLegend : false;

    this.calculateAxisYRanges(newmodel, yAxisData, yAxisRData);
    this.remapModel(newmodel);
  }

  formatModel(newmodel) {
    this.formatCursor(newmodel.xCursor);
    this.formatCursor(newmodel.yCursor);

    const logx = newmodel.xAxis.type === "log";
    const logxb = newmodel.xAxis.base;
    const logy = newmodel.yAxis.type === "log";
    const logyb = newmodel.yAxis.base;

    this.applyOrientation(newmodel);
    this.formatModelData(newmodel, logx, logxb, logy, logyb);
    this.applyLogToFocus(newmodel, logx, logxb, logy, logyb);
  }

  sortModelDataItems(model) {
    const data = model.data;

    for (let i = 0; i < data.length; i++) {
      let item = data[i];

      if (
        item.type === "treemapnode"
        || item.type === "constline"
        || item.type === "constband"
        || item.type === "heatmap"
      ) {
        continue;
      }

      const elements = item.elements;
      let unordered = false;

      for (let i = 1; i < elements.length; i++) {
        if (BigNumberUtils.lt(elements[i].x, elements[i - 1].x)) {
          unordered = true;
          break;
        }
      }

      if (!unordered) {
        continue;
      }

      if (
        item.type === "bar"
        || item.type === "stem"
        || item.type === "point"
        || item.type === "text"
      ) {
        elements.sort((a, b) => { BigNumberUtils.minus(a.x, b.x); });
      } else {
        item.isUnorderedItem = true;
      }
    }
  }

  addDataToAxes(newmodel, yAxisRData, yAxisData) {
    for (let i = 0; i < newmodel.data.length; i++) {
      let item = newmodel.data[i];

      if (newmodel.showLegend == null && item.legend) {
        newmodel.showLegend = true;
      }

      if (PlotUtils.useYAxisR(newmodel, item)) {
        yAxisRData.push(item);
      } else {
        yAxisData.push(item);
      }
    }
  }

  calculateAxisYRanges(newmodel, yAxisData, yAxisRData) {
    let range = PlotUtils.getDataRange(yAxisData).dataRange;
    let rangeR = newmodel.yAxisR ? PlotUtils.getDataRange(yAxisRData).dataRange : null;

    range = this.applyMargins(range, newmodel.yAxis);

    if (rangeR) {
      rangeR = this.applyMargins(rangeR, newmodel.yAxisR);
    }

    if (newmodel.yIncludeZero === true && range.yl > 0) {
      range.yl = 0;
      range.ySpan = range.yr - range.yl;
    }

    if (rangeR && newmodel.yRIncludeZero === true && rangeR.yl > 0) {
      rangeR.yl = 0;
      rangeR.ySpan = rangeR.yr - rangeR.yl;
    }

    this.calculateMargin(newmodel);
    this.calculateVisibleRange(newmodel, range, rangeR);
  }

  remapModel(model) {
    // map data entrie to [0, 1] of axis range
    const xAxis = PlotAxisFactory.getPlotAxis(model.xAxis.type);

    model.xAxis = PlotRange.updateAxisXRange(xAxis, model);
    model.yAxis = PlotRange.updateAxisYRange(model.yAxis, model.vrange, model);
    model.yAxisR = PlotRange.updateAxisYRange(model.yAxisR, model.vrangeR, model);

    const data = model.data;

    for (let i = 0; i < data.length; i++) {
      let item = data[i];

      if (item.type === "treemapnode") {
        continue;
      }

      // map coordinates using percentage
      // tooltips are possibly generated at the same time
      if (PlotUtils.useYAxisR(model, item)) {
        item.applyAxis(xAxis, model.yAxisR);
      } else {
        item.applyAxis(xAxis, model.yAxis);
      }
    }

    PlotFocus.remapFocusRegion(model);
  }

  applyMargins(range, axis) {
    axis.lowerMargin = axis.lowerMargin || 0;
    axis.upperMargin = axis.upperMargin || 0;

    const span = range.yr - range.yl;

    range.yl -= axis.lowerMargin * span;
    range.yr += axis.upperMargin * span;
    range.yspan = range.yr - range.yl;

    return range;
  }

  calculateMargin(newmodel) {
    let margin = newmodel.margin;

    if (margin.bottom == null) {
      margin.bottom = .05;
    }

    if (margin.top == null) {
      margin.top = .05;
    }

    if (margin.left == null) {
      margin.left = .05;
    }

    if (margin.right == null) {
      margin.right = .05;
    }
  }

  formatCursor(cursor) {
    if (!cursor) {
      return;
    }

    if (cursor.color == null) {
      cursor.color = "black";
    }

    if (cursor.width == null) {
      cursor.width = 1;
    }

    cursor.stroke_dasharray = this.lineDasharrayMap[cursor.style];
  }

  applyOrientation(newmodel) {
    if (newmodel.orientation !== 'HORIZONTAL') {
      return;
    }

    const temp = newmodel.xAxis;

    newmodel.xAxis = newmodel.yAxis;
    newmodel.yAxis = temp;
  }

  formatModelData(newmodel, logx, logxb, logy, logyb) {
    const logyR = newmodel.yAxisR && newmodel.yAxisR.type === "log";
    const logybR = newmodel.yAxisR && newmodel.yAxisR.base;

    if (!newmodel.data) {
      newmodel.data = [];
    }

    for (let i = 0; i < newmodel.data.length; i++) {
      this.formatModelDataItem(i, newmodel, logx, logxb, logy, logyb, logyR, logybR);
    }
  }

  formatModelDataItem(i, newmodel, logx, logxb, logy, logyb, logyR, logybR) {
    let item = newmodel.data[i];
    let elements = item.elements || [];
    let useYAxisR;
    let itemlogy;
    let itemlogyb;

    if (item.type !== "treemapnode") {
      useYAxisR = PlotUtils.useYAxisR(newmodel, item);
      itemlogy = useYAxisR ? logyR : logy;
      itemlogyb = useYAxisR ? logybR : logyb;
    }

    item.showItem = true;

    if (!item.type) {
      item.type = "line";
    }

    if (item.type === "line" || item.type === "constline") {
      item.style = item.style || "solid";
      item.stroke_dasharray = this.lineDasharrayMap[item.style];
    }

    if (item.type === "point") {
      item.shape = item.shape || "rect";
      item.size = item.size || (item.shape === "rect" ? 8 : 5);
    }

    if (item.useToolTip == null) {
      item.useToolTip = newmodel.useToolTip === true;
    }

    this.setItemWidth(item);
    this.setItemColor(item);
    this.setItemOutline(item);
    this.setItemOpacity(item);

    for (let i = 0; i < elements.length; i++) {
      this.formatModelDataItemElement(item, elements[i], itemlogy, itemlogyb, logx, logxb);
      this.applyOrientationToItemElement(newmodel, item, elements[i]);
    }

    this.applyOrientationToItem(newmodel, item);

    // recreate rendering objects
    item.index = i;
    item.id = "i" + i;

    newmodel.data[i] = plotFactory.createPlotItem(item, newmodel.lodThreshold);
  }

  setItemWidth(item) {
    if (item.type === "line" || item.type === "stem") {
      item.width = item.width || DEFAULT_LINE_ITEM_WIDTH;
    }

    if (item.type === "bar" && item.width == null) {
      item.width = DEFAULT_BAR_ITEM_WIDTH;
    }
  }

  setItemColor(item) {
    if (
      item.type === "constline"
      || item.type === "constband"
      || item.type === "line"
    ) {
      item.color = item.color || "black";
    }
  }

  setItemOutline(item) {
    if (item.outlineColor != null) {
      item.stroke = item.outlineColor;
      delete item.outlineColor;
    }

    if (item.outlineWidth != null) {
      item.stroke_width = item.outlineWidth;
      delete item.outlineWidth;
    }

    if (item.outlineOpacity != null) {
      item.stroke_opacity = item.outlineOpacity;
      delete item.outlineOpacity;
    }
  }

  setItemOpacity(item) {
    if (item.colorOpacity != null) {
      item.color_opacity = item.colorOpacity;
      delete item.colorOpacity;
    }

    if (item.color_opacity == null) {
      item.color_opacity = item.color_opacity || 1.0; // default show fully
    }

    if (item.stroke_opacity == null) {
      // default show based on whether stroke is set
      item.stroke_opacity = item.stroke == null ? 0.0 : 1.0;
    }
  }

  formatModelDataItemElement(item, element, itemlogy, itemlogyb, logx, logxb) {
    if(item.type === "stem") {
      element.stroke_dasharray = this.lineDasharrayMap[element.style];
    }

    if (element.outlineColor != null) {
      element.stroke = element.outlineColor;
      delete element.outlineColor;
    }

    if (element.outlineWidth != null) {
      element.stroke_width = element.outlineWidth;
      delete element.outlineWidth;
    }

    if (element.outlineOpacity != null) {
      element.stroke_opacity = element.outlineOpacity;
      delete element.outlineOpacity;
    }

    if (item.type === "bar" && element.x2 == null) {
      element.x = BigNumberUtils.minus(element.x, item.width / 2);
      element.x2 = BigNumberUtils.plus(element.x, item.width);
    }

    if (
      (item.type === "area" || item.type === "bar" || item.type === "stem")
      && element.y2 == null
    ) {
      if (item.height != null) {
        element.y2 = element.y + item.height;
      } else if (item.base != null) {
        element.y2 = item.base;
      } else {
        element.y2 = itemlogy ? 1 : 0;
      }
    }

    if (item.type === "point" && element.size == null) {
      element.size = item.size || (item.shape === "rect" ? 8 : 5);
    }

    if (item.type === "area") {
      item.interpolation = item.interpolation || "linear";
    }

    // swap y, y2
    if (element.y != null && element.y2 != null && element.y > element.y2) {
      const temp = element.y;

      element.y = element.y2;
      element.y2 = temp;
    }

    if (element.x != null) {
      element._x = element.x;
      if (logx) {
        element.x = Math.log(element.x) / Math.log(logxb);
      }
    }

    if (element.x2 != null) {
      element._x2 = element.x2;
      if (logx) {
        element.x2 = Math.log(element.x2) / Math.log(logxb);
      }
    }

    if (element.y != null) {
      element._y = element.y;

      if (itemlogy) {
        element.y = Math.log(element.y) / Math.log(itemlogyb);
      }
    }

    if (element.y2 != null) {
      element._y2 = element.y2;

      if (itemlogy) {
        element.y2 = Math.log(element.y2) / Math.log(itemlogyb);
      }
    }
  }

  applyOrientationToItemElement(newmodel, item, element) {
    if (newmodel.orientation !== 'HORIZONTAL') {
      return;
    }

    const temp = {
      x: element.y,
      x2: element.y2,
      y: element.x,
      y2: element.x2
    };

    element.x = temp.x;
    element.x2 = temp.x2;
    element.y = temp.y;
    element.y2 = temp.y2;

    element._x = element.x;
    element._x2 = element.x2;
    element._y = element.y;
    element._y2 = element.y2;

    if (item.type === 'stem'){
      element.y2 = element.y;
      element._y2 = element._y;
    }
  }

  applyOrientationToItem(newmodel, item) {
    if (newmodel.orientation !== 'HORIZONTAL') {
      return;
    }

    const temp =  item.x;

    item.x = item.y;
    item.y = temp;
  }

  applyLogToFocus(newmodel, logx, logxb, logy, logyb) {
    const focus = newmodel.userFocus;

    this.applyLogToFocusX(focus, logx, logxb);
    this.applyLogToFocusY(focus, logy, logyb);
  }

  applyLogToFocusX(focus, logx, logxb) {
    if (!logx) {
      return;
    }

    if (focus.xl != null) {
      focus.xl = Math.log(focus.xl) / Math.log(logxb);
    }

    if (focus.xr != null) {
      focus.xr = Math.log(focus.xr) / Math.log(logxb);
    }
  }

  applyLogToFocusY(focus, logy, logyb) {
    if (!logy) {
      return;
    }

    if (focus.yl != null) {
      focus.yl = Math.log(focus.yl) / Math.log(logyb);
    }

    if (focus.yr != null) {
      focus.yr = Math.log(focus.yr) / Math.log(logyb);
    }

    if (focus.yl_r != null) {
      focus.yl_r = Math.log(focus.yl_r) / Math.log(logyb);
    }

    if (focus.yr_r != null) {
      focus.yr_r = Math.log(focus.yr_r) / Math.log(logyb);
    }
  }

  calculateVisibleRange(newmodel, range, rangeR) {
    if (newmodel.vrange) {
      return;
    }

    // visible range initially is 10x larger than data range by default
    newmodel.vrange = this.getModelRange(
      newmodel,
      range,
      newmodel.xAxis.type === "log",
      newmodel.yAxis.type === "log"
    );

    if (newmodel.yAxisR) {
      newmodel.vrangeR = this.getModelRange(
        newmodel,
        rangeR,
        newmodel.xAxis.type === "log",
        newmodel.yAxisR.type === "log"
      );
    }

    this.applyFocusToVisibleRange(newmodel, range);
    this.updateRangeSpan(newmodel.vrange);
    this.updateRangeSpan(newmodel.vrangeR);
  }

  getModelRange(newmodel, range, logx, logy) {
    if (range == null) {
      return null;
    }

    const result = {
      xl: BigNumberUtils.minus(range.xl, range.xSpan * 10.0),
      xr: BigNumberUtils.plus(range.xr, range.xSpan * 10.0),
      yl: range.yl - range.ySpan * 10.0,
      yr: range.yr + range.ySpan * 10.0
    };

    if (logx) {
      result.xl = BigNumberUtils.max(result.xl, BigNumberUtils.minus(range.xl, newmodel.margin.left * range.xSpan));
    }

    if (logy) {
      result.yl = Math.max(result.yl, range.yl - newmodel.margin.left * range.ySpan);
    }

    return result;
  }

  applyFocusToVisibleRange(newmodel, range) {
    const vrange = newmodel.vrange;
    const vrangeR = newmodel.vrangeR;
    const focus = newmodel.userFocus; // allow user to overide vrange

    if (newmodel.yPreventNegative === true) {
      newmodel.vrange.yl = Math.min(0, range.yl);
    }

    if (focus.xl != null) {
      vrange.xl = Math.min(focus.xl, vrange.xl);
    }

    if (focus.xr != null) {
      vrange.xr = Math.max(focus.xr, vrange.xr);
    }

    if (focus.yl != null) {
      vrange.yl = Math.min(focus.yl, vrange.yl);
    }

    if (focus.yr != null) {
      vrange.yr = Math.max(focus.yr, vrange.yr);
    }

    if (vrangeR && focus.yl_r != null) {
      vrangeR.yl = Math.min(focus.yl_r, vrangeR.yl);
    }

    if (vrangeR && focus.yr_r != null) {
      vrangeR.yr = Math.max(focus.yr_r, vrangeR.yr);
    }
  }

  updateRangeSpan(range) {
    if (!range) {
      return;
    }

    range.xSpan = BigNumberUtils.minus(range.xr, range.xl);
    range.ySpan = range.yr - range.yl;
  }
}
