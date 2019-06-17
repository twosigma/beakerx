/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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

import * as $ from 'jquery';
import * as _ from 'underscore';
import PlotLayout from "./PlotLayout";
import PlotZoom from "./zoom";
import PlotFocus from "./zoom/PlotFocus";
import PlotGrid from "./grid/PlotGrid";
import PlotRange from "./range/PlotRange";
import PlotCursor from "./PlotCursor";
import PlotLegend from "./legend/PlotLegend";
import PlotInteraction from "./PlotInteraction";
import PlotSize from "./PlotSize";
import PointsLimitModal from "./plotModal/pointsLimitModal";
import PlotModelFactory from "./models/PlotModelFactory";
import ContextMenu from "./contextMenu/plotContextMenu";
import zoomHelpers from './zoom/helpers';
import plotTip from './PlotTip';
import saveAsContextMenu from './contextMenu/SaveAsContextMenu';
import { GistPublisherUtils } from '../GistPublisherUtils';
import bkHelper from "beakerx_shared/src/bk/bkHelper";
import CommonUtils from "beakerx_shared/lib/utils/CommonUtils";

import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/resizable';
import PlotStyleUtils from "beakerx_shared/lib/utils/PlotStyleUtils";

const bkoChartExtender = require('./chartExtender');

export default class PlotScope {
  id: string;
  wrapperId: string;
  model: any;

  stdmodel: any = {};
  prefs: any;

  element: JQuery<HTMLElement> = null;
  container: JQuery<HTMLElement> = null;
  jqcontainer: JQuery<HTMLElement> = null;
  jqlegendcontainer: JQuery<HTMLElement> = null;
  jqplottitle: JQuery<HTMLElement> = null;
  jqsvg: JQuery<HTMLElement> = null;
  jqgridg: JQuery<HTMLElement> = null;
  svg = null;
  canvas = null;
  maing = null;
  gridg = null;
  labelg = null;

  width = null;
  renderFixed = null;
  layout: PlotLayout;
  labelPadding = {};
  intervalStepHint = {};
  numIntervals = {};
  cursor = {};
  visibleItem = null;
  legendableItem = null;
  rpipeGridlines = [];
  removePipe = [];
  tips: any[];
  _defaultZoomWheelFn: Function;

  hasLodItem: boolean = false;
  hasUnorderedItem: boolean = false;
  showUnorderedHint: boolean = false;
  showAllItems: boolean = true;
  showLodHint: boolean = true;
  legendDone: boolean = false;
  legendResetPosition: boolean = false;
  doNotLoadState: boolean = false;

  saveAsMenuContainer = null;
  plotDisplayModel = null;
  plotDisplayView = null;
  contexteMenuEvent = null;

  plotZoom: PlotZoom;
  plotFocus: PlotFocus;
  plotRange: PlotRange;
  plotGrid: PlotGrid;
  plotLegend: PlotLegend;
  plotCursor: PlotCursor;
  plotInteraction: PlotInteraction;
  plotSize: PlotSize;
  pointsLimitModal: PointsLimitModal;
  contextMenu: ContextMenu;

  constructor(wrapperId) {
    this.wrapperId = wrapperId;
    this.id = null;

    this.model = {
      model: {},
      getCellModel: function() {
        return this.model;
      }
    };

    this.plotZoom = new PlotZoom(this);
    this.plotFocus = new PlotFocus(this);
    this.plotRange = new PlotRange(this);
    this.plotGrid = new PlotGrid(this);
    this.plotLegend = new PlotLegend(this);
    this.plotCursor = new PlotCursor(this);
    this.plotInteraction = new PlotInteraction(this);
    this.plotSize = new PlotSize(this);
    this.pointsLimitModal = new PointsLimitModal(this);
  }

  init() {
    this.id = `bko-plot-${CommonUtils.generateId(6)}`;
    this.element.find('.plot-plotcontainer').attr('id', this.id);
    this.element.find('.plot-title').attr('class', `plot-title plot-title-${this.id}`);

    this.standardizeData();
    this.initFlags();

    // see if previous state can be applied
    this.plotFocus.setFocus(this.plotFocus.defaultFocus);

    if (!this.model.getCellModel().tips) {
      this.model.getCellModel().tips = {};
    }

    this.tips = this.model.getCellModel().tips;

    this.initLayout();

    if (!this.model.disableContextMenu) {
      this.saveAsMenuContainer = $('div#'+this.wrapperId+' #' + this.id);
      // init context menu for 'save as...'
      this.contextMenu = new ContextMenu(this);
    } else if (this.model && this.model.getSaveAsMenuContainer) {
      this.saveAsMenuContainer = this.model.getSaveAsMenuContainer();
    }

    this.plotSize.setResizable();

    this.resetSvg();
    this.plotZoom.initZoomObject();
    this.plotInteraction.bindEvents();
    this.plotZoom.init();
    this._defaultZoomWheelFn = this.svg.on('wheel.zoom');

    zoomHelpers.disableZoomWheel(this);
    this.plotRange.calcRange();

    // init copies focus to defaultFocus, called only once
    if(_.isEmpty(this.plotFocus.getFocus())){
      this.plotFocus.setFocus(this.plotFocus.defaultFocus);
    }

    this.removePipe = [];
    this.plotRange.calcMapping();
    this.legendDone = false;
    this.update();
    this.fillCellModelWithPlotMethods();
    this.emitSizeChange(true);
    this.pointsLimitModal.init();
  }

  destroy() {
    $(window).off('resize', this.plotSize.resizeFunction);
    this.svg.remove();
    this.jqcontainer.resizable({ disabled: true }).resizable('destroy');
    this.jqlegendcontainer.remove();
    this.jqsvg.remove();
    this.element.remove();

    this.resetSvg();
    this.plotInteraction.removeOnKeyListeners();

    this.contextMenu && this.contextMenu.destroy();
  }

  setWidgetModel(plotDisplayModel) {
    this.plotDisplayModel = plotDisplayModel;
  }

  setWidgetView(plotDisplayView) {
    this.plotDisplayView = plotDisplayView;
  }

  initLayout() {
    this.layout = new PlotLayout(this);
  }

  calcMapping(emitFocusUpdate) {
    return this.plotRange.calcMapping(emitFocusUpdate);
  }

  emitZoomLevelChange() {
    this.plotInteraction.emitZoomLevelChange();
  }

  emitSizeChange(useMinWidth) {
    if (this.model.updateWidth !== null && this.model.updateWidth !== undefined) {
      this.model.updateWidth(this.width, useMinWidth);
    }
  }

  renderData() {
    const data = this.stdmodel.data;

    for (let i = 0; i < data.length; i++) {
      data[i].render(this);

      if (data[i].isLodItem === true) {
        this.hasLodItem = true;
      }

      if (data[i].isUnorderedItem === true) {
        this.hasUnorderedItem = true;
      }
    }

    if (this.hasUnorderedItem === true && this.showUnorderedHint === true) {
      this.showUnorderedHint = false;
      console.warn("unordered area/line detected, truncation disabled");
    }
  }

  updateMargin() {
    if (this.model.updateMargin != null) {
      setTimeout(() => this.model.updateMargin(), 0);
    }
  }

  getMergedLodInfo(lodDataIds) {
    const firstLine = this.stdmodel.data[lodDataIds[0]];
    const lodInfo = {
      lodType: firstLine.lodType,
      lodOn: firstLine.lodOn,
      lodAuto: firstLine.lodAuto //consider all lines have the same lodAuto
    };

    for (let j = 0; j < lodDataIds.length; j++) {
      let dat = this.stdmodel.data[lodDataIds[j]];

      if (lodInfo.lodType !== dat.lodType) {
        lodInfo.lodType = "mixed";//if merged lines have different lod types
      }

      if (lodInfo.lodOn !== true) {//switch off lod only if all lines has lod off
        lodInfo.lodOn = dat.lodOn;
      }
    }

    return lodInfo;
  }

  setMergedLodHint(lodDataIds, legendLineId) {
    const lodInfo = this.getMergedLodInfo(lodDataIds);
    const legend = this.jqlegendcontainer.find("#legends");
    const hint = legend.find("#hint_" + legendLineId);
    const type = hint.find(".dropdown-toggle");

    type.text(lodInfo.lodType);
  }

  updateClipPath() {
    const W = PlotStyleUtils.safeWidth(this.jqsvg);
    const H = PlotStyleUtils.safeHeight(this.jqsvg);

    this.svg.select('#clipPath_' + this.wrapperId + ' rect')
      .attr("x", this.layout.leftLayoutMargin)
      .attr("y", this.layout.topLayoutMargin)
      .attr("height", H - this.layout.topLayoutMargin - this.layout.bottomLayoutMargin)
      .attr("width", W - this.layout.leftLayoutMargin - this.layout.rightLayoutMargin);
  }

  resetSvg() {
    this.jqcontainer.find(".plot-constlabel").remove();
    this.plotGrid.reset();
  }

  standardizeData() {
    const model = this.model.getCellModel();

    this.stdmodel = PlotModelFactory
      .getPlotModel(model, this.prefs)
      .getStandardizedModel();
  }

  initFlags() {
    this.showAllItems = true;
    this.showLodHint = true;
    this.showUnorderedHint = true;
  }

  clearRemovePipe() {
    // some hints are set to be removed at the end of the next rendering cycle
    for (let i = 0; i < this.removePipe.length; i++) {
      let id = this.removePipe[i];

      this.jqcontainer.find("#" + id).remove();
    }

    this.removePipe.length = 0;
  }

  updatePlot() {
    this.standardizeData();
    this.initFlags();

    // see if previous state can be applied
    this.plotFocus.setFocus({});
    if (!this.model.getCellModel().tips) {
      this.model.getCellModel().tips = {};
    }

    this.tips = this.model.getCellModel().tips;
    this.layout.update();
    this.resetSvg();
    this.plotRange.calcRange();
    // init copies focus to defaultFocus, called only once
    if (_.isEmpty(this.plotFocus.getFocus())) {
      this.plotFocus.setFocus(this.plotFocus.defaultFocus);
    }

    // init remove pipe
    this.removePipe = [];
    this.plotRange.calcMapping();
    this.legendDone = false;
    this.update();
    this.fillCellModelWithPlotMethods();
  }

  update() {
    if (this.model.isShowOutput !== undefined && this.model.isShowOutput() === false) {
      return;
    }

    this.resetSvg();
    this.plotGrid.render();

    this.renderData();
    this.updateClipPath(); // redraw

    plotTip.renderTips(this);
    this.plotZoom.boxZoom.renderLocateBox(); // redraw
    this.plotLegend.render(); // redraw
    this.updateMargin(); //update plot margins

    this.plotInteraction.prepare();

    this.clearRemovePipe();
  }

  getDumpState() {
    if (this.model.getDumpState !== undefined) {
      return this.model.getDumpState();
    }
  }

  setDumpState(state) {
    if (this.model.setDumpState !== undefined) {
      this.model.setDumpState(state);

      // bkUtils.refreshRootScope();
    }
  }

  getCellWidth() {
    return this.jqcontainer.width();
  }

  getCellHeight() {
    return this.jqcontainer.height();
  }

  getCellModel() {
    return this.model.getCellModel();
  }

  getTheme(){
    return bkHelper.getTheme();
  }

  saveAsSvg() {
    saveAsContextMenu.saveAsSvg(this);
  }

  saveAsPng(scale) {
    saveAsContextMenu.saveAsPng(scale, this);
  }

  publish() {
    GistPublisherUtils.publishScope(this);
  }

  setModelData(data) {
    // TODO quick hack -> standardize all input data
    if (data.getCellModel) {
      this.model = data;
    } else {
      this.model.model = data;
    }

    if (this.model.getCellModel().type === "TreeMap"){
      bkoChartExtender.extend(this, this.element);
    }
  }

  updateModelData(data) {
    if (this.model && this.model.model && data) {
      this.model.model = _.extend(this.model.model, data);
    }
  }

  setElement(el) {
    this.element = el;
  }

  modelHasPlotSpecificMethods(model) {
    return model.getSvgToSave && model.saveAsSvg && model.saveAsPng && model.updateLegendPosition;
  }

  fillCellModelWithPlotMethods() {
    const self = this;
    const model = self.model.getCellModel();

    if (self.modelHasPlotSpecificMethods(model)) {
      return;
    }

    model.getSvgToSave = () => saveAsContextMenu.getSvgToSave(self);
    model.saveAsSvg = () => self.saveAsSvg();
    model.saveAsPng = (scale) => self.saveAsPng(scale);
    model.updateLegendPosition = () => self.plotLegend.legendPosition.updateLegendPosition();
  }

  adjustModelWidth() {
    this.plotSize.updateModelWidth(this.width);
  }
}
