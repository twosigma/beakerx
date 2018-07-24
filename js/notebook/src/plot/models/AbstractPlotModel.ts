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
import PlotAxisFactory from '../std/axis/PlotAxisFactory';

const heatmapConverter = require('../heatmapconverter');
const plotConverter = require('../plotConverter');
const plotUtils = require('../plotUtils');
const plotFactory = require('../plotFactory');

const DEFAULT_LINE_ITEM_WIDTH = 2;
const DEFAULT_BAR_ITEM_WIDTH = 1;

export default abstract class AbstractPlotModel {
  model: any;
  settings: any;
  lineDasharrayMap = {
    solid : "",
    dash : "9,5",
    dot : "2,2",
    dashdot : "9,5,2,5",
    longdash : "20,5"
  };

  constructor(model, settings) {
    this.model = this.standardize(model, settings);
  }

  getStandardizedModel() {
    return this.model;
  }

  standardize(originalModel, settings) {
    const model = { ...originalModel };

    if (model.graphics_list != null) {
      model.version = "groovy";  // TODO, a hack now to check DS source
    }

    if (model.version === "complete") { // skip standardized model in combined plot
      return model;
    }

    if (model.version !== "groovy") {
      model.version = "direct";
    }

    const newmodel = this.createNewModel(model);

    newmodel.lodThreshold = model.lodThreshold
      ? model.lodThreshold
      : (settings && settings.lodThreshold !== undefined ? settings.lodThreshold : 4000) ;

    newmodel.data = [];

    if (model.version === "groovy") {
      switch (model.type) {
        case 'HeatMap':
          heatmapConverter.convertGroovyData(newmodel, model);
          break;
        default:
          plotConverter.convertGroovyData(newmodel, model);
          break;
      }
    } else {  // DS generated directly
      _.extend(newmodel, model);
    }

    this.format(newmodel);

    newmodel.version = "complete";

    return newmodel;
  }

  createNewModel(model): any {
    if (model.version === "groovy") {  // model returned from serializer
      return {
        plotId: model.update_id,
        type: "plot",
        title: model.chart_title != null ? model.chart_title : model.title,
        margin: {},
        showLegend: model.show_legend,
        legendPosition: model.legend_position != null ? model.legend_position : {position: "TOP_RIGHT"},
        legendLayout: model.legend_layout != null ? model.legend_layout : "VERTICAL",
        useToolTip: model.use_tool_tip != null ? model.use_tool_tip : false,
        plotSize: {
          "width": model.init_width != null ? model.init_width : 1200,
          "height": model.init_height != null ? model.init_height : 350
        },
        customStyles: model.custom_styles ? model.custom_styles : '',
        elementStyles: model.element_styles ? model.element_styles : ''
      }
    }

    return {
      showLegend: model.showLegend,
      legendPosition: model.legendPosition != null ? model.legendPosition : {position: "TOP_RIGHT"},
      legendLayout: model.legendLayout != null ? model.legendLayout : "VERTICAL",
      useToolTip: model.useToolTip != null ? model.useToolTip : false,
      margin: model.margin != null ? model.margin : {},
      plotSize: {
        "width": model.width != null ? model.width : 1200,
        "height": model.height != null ? model.height : 350
      }
    };
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

  addDataToAxes(newmodel, yAxisRData, yAxisData) {
    for (let i = 0; i < newmodel.data.length; i++) {
      let item = newmodel.data[i];

      if (newmodel.showLegend == null && item.legend) {
        newmodel.showLegend = true;
      }

      if (plotUtils.useYAxisR(newmodel, item)) {
        yAxisRData.push(item);
      } else {
        yAxisData.push(item);
      }
    }
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

  calculateAxisYRanges(newmodel, yAxisData, yAxisRData) {
    let range = plotUtils.getDataRange(yAxisData).datarange;
    let rangeR = newmodel.yAxisR ? plotUtils.getDataRange(yAxisRData).datarange : null;

    range = this.applyMargins(range, newmodel.yAxis);

    if (rangeR) {
      rangeR = this.applyMargins(rangeR, newmodel.yAxisR);
    }

    if (newmodel.yIncludeZero === true && range.yl > 0) {
      range.yl = 0;
      range.yspan = range.yr - range.yl;
    }

    if (rangeR && newmodel.yRIncludeZero === true && rangeR.yl > 0) {
      rangeR.yl = 0;
      rangeR.yspan = rangeR.yr - rangeR.yl;
    }

    this.calculateMargin(newmodel);
    this.calculateVisibleRange(newmodel, range, rangeR);
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
      useYAxisR = plotUtils.useYAxisR(newmodel, item);
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

    this.applyorientationToItem(newmodel, item);

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
      element.x = plotUtils.minus(element.x, item.width / 2);
      element.x2 = plotUtils.plus(element.x, item.width);
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

  applyorientationToItem(newmodel, item) {
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
      xl: plotUtils.minus(range.xl, range.xspan * 10.0),
      xr: plotUtils.plus(range.xr, range.xspan * 10.0),
      yl: range.yl - range.yspan * 10.0,
      yr: range.yr + range.yspan * 10.0
    };

    if (logx) {
      result.xl = Math.max(result.xl, range.xl - newmodel.margin.left * range.xspan);
    }

    if (logy) {
      result.yl = Math.max(result.yl, range.yl - newmodel.margin.left * range.yspan);
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

    range.xspan = plotUtils.minus(range.xr, range.xl);
    range.yspan = range.yr - range.yl;
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
        if (plotUtils.lt(elements[i].x, elements[i - 1].x)) {
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
        elements.sort((a, b) => { plotUtils.minus(a.x, b.x); });
      } else {
        item.isUnorderedItem = true;
      }
    }
  }

  remapModel(model) {
    // map data entrie to [0, 1] of axis range
    const vrange = model.vrange;
    const xAxis = PlotAxisFactory.getPlotAxis(model.xAxis.type);

    model.xAxis = this.updateAxisXRange(xAxis, model);
    model.yAxis = this.updateYAxisRange(model.yAxis, model.vrange, model);
    model.yAxisR = this.updateYAxisRange(model.yAxisR, model.vrangeR, model);

    const data = model.data;

    for (let i = 0; i < data.length; i++) {
      let item = data[i];

      if (item.type === "treemapnode") {
        continue;
      }

      // map coordinates using percentage
      // tooltips are possibly generated at the same time
      if (plotUtils.useYAxisR(model, item)) {
        item.applyAxis(xAxis, model.yAxisR);
      } else {
        item.applyAxis(xAxis, model.yAxis);
      }
    }

    this.remapFocusRegion(model);
  }

  updateAxisXRange(xAxis, model) {
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

  updateYAxisRange(modelAxis, axisVRange, model) {
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

  remapFocusRegion(model) {
    const focus = model.userFocus;

    if (focus.xl != null) {
      focus.xl = model.xAxis.getPercent(focus.xl);
    }

    if (focus.xr != null) {
      focus.xr = model.xAxis.getPercent(focus.xr);
    }

    if (focus.yl != null) {
      focus.yl = model.yAxis.getPercent(focus.yl);
    }

    if (focus.yr != null) {
      focus.yr = model.yAxis.getPercent(focus.yr);
    }

    if (focus.yl_r != null && model.yAxisR) {
      focus.yl_r = model.yAxisR.getPercent(focus.yl_r);
    }

    if (focus.yr_r != null && model.yAxisR) {
      focus.yr_r = model.yAxisR.getPercent(focus.yr_r);
    }
  }
}
