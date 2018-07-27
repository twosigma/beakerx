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

define([
  'underscore',
  'jquery',
  'jquery-ui/ui/widgets/draggable',
  'jquery-ui/ui/widgets/resizable',
  'd3',
  './plotUtils',
  './plotConverter',
  './plotFactory',
  './chartExtender'
], function(
  _,
  $,
  draggable,
  resizable,
  d3,
  plotUtils,
  plotConverter,
  plotFactory,
  bkoChartExtender
) {

  var PlotModelFactory = require('./models/PlotModelFactory').default;
  var PlotRange = require('./range/PlotRange').default;
  var PlotZoom = require('./zoom/index').default;
  var PlotFocus = require('./zoom/PlotFocus').default;
  var PlotGrid = require('./grid/PlotGrid').default;
  var bkUtils = require('./../shared/bkUtils').default;
  var bkHelper = require('./../shared/bkHelper').default;
  var zoomHelpers = require('./zoom/helpers').default;
  var PlotLayout = require('./PlotLayout').default;
  var PlotLegend = require('./legend/PlotLegend').default;
  var PlotCursor = require('./PlotCursor').default;
  var PlotInteraction = require('./PlotInteraction').default;
  var plotTip = require('./plotTip').default;
  var saveAsContextMenu = require('./contextMenu/SaveAsContextMenu').default;
  var PlotSize = require('./PlotSize').default;
  var PointsLimitModal = require('./plotModal/pointsLimitModal').default;

  function PlotScope(wrapperId) {
    this.wrapperId = wrapperId;
    this.id = null;

    this.model = {
      model: {},
      getCellModel: function() {
        return this.model;
      }
    };

    this.initProperties();
  }

  PlotScope.prototype.initProperties = function() {
    this.element = null;
    this.stdmodel = {};
    this.container = null;
    this.jqcontainer = null;
    this.jqlegendcontainer = null;
    this.jqplottitle = null;
    this.svg = null;
    this.jqsvg = null;
    this.jqgridg = null;
    this.canvas = null;
    this.maing = null;
    this.gridg = null;
    this.labelg = null;
    this.renderFixed = null;
    this.layout = {};
    this.labelPadding = {};
    this.intervalStepHint = {};
    this.numIntervals = {};
    this.cursor = {};
    this.legendResetPosition = null;
    this.visibleItem = null;
    this.legendableItem = null;
    this.rpipeGridlines = [];
    this.hasLodItem = false;
    this.hasUnorderedItem = false;
    this.showUnorderedHint = false;
    this.legendDone = false;
    this.legendResetPosition = false;
    this.doNotLoadState = false;
    this.saveAsMenuContainer = null;

    this.plotDisplayModel = null;
    this.plotDisplayView = null;
    this.contexteMenuEvent = null;
    this.plotZoom = new PlotZoom(this);
    this.plotFocus = new PlotFocus(this);
    this.plotRange = new PlotRange(this);
    this.plotGrid = new PlotGrid(this, this.plotFocus, this.plotRange);
    this.plotLegend = new PlotLegend(this);
    this.plotCursor = new PlotCursor(this);
    this.plotInteraction = new PlotInteraction(this);
    this.plotSize = new PlotSize(this);
    this.pointsLimitModal = new PointsLimitModal(this);
  };
  
  PlotScope.prototype.setWidgetModel = function(plotDisplayModel) {
    this.plotDisplayModel = plotDisplayModel;
  };
  
  PlotScope.prototype.setWidgetView = function(plotDisplayView) {
    this.plotDisplayView = plotDisplayView;
  };

  PlotScope.prototype.initLayout = function() {
    this.layout = new PlotLayout(this);
  };

  PlotScope.prototype.calcMapping = function(emitFocusUpdate) {
    return this.plotRange.calcMapping(emitFocusUpdate);
  };

  PlotScope.prototype.emitZoomLevelChange = function() {
    this.plotInteraction.emitZoomLevelChange();
  };

  PlotScope.prototype.emitSizeChange = function(useMinWidth) {
    if (this.model.updateWidth !== null && this.model.updateWidth !== undefined) {
      this.model.updateWidth(this.width, useMinWidth);
    }
  };

  PlotScope.prototype.renderData = function() {
    var data = this.stdmodel.data;
    for (var i = 0; i < data.length; i++) {
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
  };

  PlotScope.prototype.updateMargin = function() {
    var self = this;

    if (self.model.updateMargin != null) {
      setTimeout(self.model.updateMargin, 0);
    }
  };

  PlotScope.prototype.getMergedLodInfo = function(lodDataIds) {
    var self = this;
    var firstLine = self.stdmodel.data[lodDataIds[0]];
    var lodInfo = {
      lodType: firstLine.lodType,
      lodOn: firstLine.lodOn,
      lodAuto: firstLine.lodAuto //consider all lines have the same lodAuto
    };

    for (var j = 0; j < lodDataIds.length; j++) {
      var dat = self.stdmodel.data[lodDataIds[j]];
      if (lodInfo.lodType !== dat.lodType) {
        lodInfo.lodType = "mixed";//if merged lines have different lod types
      }
      if (lodInfo.lodOn !== true) {//switch off lod only if all lines has lod off
        lodInfo.lodOn = dat.lodOn;
      }
    }
    return lodInfo;
  };

  PlotScope.prototype.setMergedLodHint = function(lodDataIds, legendLineId) {
    var self = this;
    var lodInfo = self.getMergedLodInfo(lodDataIds);
    var legend = self.jqlegendcontainer.find("#legends");
    var hint = legend.find("#hint_" + legendLineId);
    var type = hint.find(".dropdown-toggle");
    type.text(lodInfo.lodType);
  };

  PlotScope.prototype.updateClipPath = function() {
    var W = plotUtils.safeWidth(this.jqsvg);
    var H = plotUtils.safeHeight(this.jqsvg);
    
    this.svg.select('#clipPath_' + this.wrapperId + ' rect')
      .attr("x", this.layout.leftLayoutMargin)
      .attr("y", this.layout.topLayoutMargin)
      .attr("height", H - this.layout.topLayoutMargin - this.layout.bottomLayoutMargin)
      .attr("width", W - this.layout.leftLayoutMargin - this.layout.rightLayoutMargin);
  };

  PlotScope.prototype.resetSvg = function() {
    var self = this;
    var self = this;
    self.jqcontainer.find(".plot-constlabel").remove();

    self.plotGrid.reset();
  };

  PlotScope.prototype.standardizeData = function() {
    var model = this.model.getCellModel();
    var plotModel = PlotModelFactory.getPlotModel(model, this.prefs);

    this.stdmodel = plotModel.getStandardizedModel();
  };

  PlotScope.prototype.initFlags = function() {
    this.showAllItems = true;
    this.showLodHint = true;
    this.showUnorderedHint = true;
  };

  PlotScope.prototype.clearRemovePipe = function() {
    // some hints are set to be removed at the end of the next rendering cycle
    for (var i = 0; i < this.removePipe.length; i++) {
      var id = this.removePipe[i];
      this.jqcontainer.find("#" + id).remove();
    }
    this.removePipe.length = 0;
  };

  PlotScope.prototype.init = function() {
    var self = this;
    self.id = 'bko-plot-' + bkUtils.generateId(6);
    self.element.find('.plot-plotcontainer').attr('id', self.id);
    self.element.find('.plot-title').attr('class', 'plot-title ' + 'plot-title-' + self.id);

    self.standardizeData();
    self.initFlags();

    // see if previous state can be applied
    self.plotFocus.setFocus({});

    if (!self.model.getCellModel().tips) {
      self.model.getCellModel().tips = {};
    }

    self.tips = self.model.getCellModel().tips;

    self.initLayout();

    if (!self.model.disableContextMenu) {
      self.saveAsMenuContainer = $('div#'+self.wrapperId+' #' + self.id);
      // init context menu for 'save as...'
      var ContextMenu = require('./contextMenu/plotContextMenu.ts').default;
      self.contextMenu = new ContextMenu(self);
    } else if (self.model && self.model.getSaveAsMenuContainer) {
      self.saveAsMenuContainer = self.model.getSaveAsMenuContainer();
    }

    this.plotSize.setResizable();

    self.resetSvg();
    self.plotZoom.initZoomObject();
    self.plotInteraction.bindEvents();
    self.plotZoom.init();
    self._defaultZoomWheelFn = self.svg.on('wheel.zoom');
    zoomHelpers.disableZoomWheel(self);
    self.plotRange.calcRange();

    // init copies focus to defaultFocus, called only once
    if(_.isEmpty(self.plotFocus.getFocus())){
      self.plotFocus.setFocus(self.plotFocus.defaultFocus);
    }

    self.removePipe = [];
    self.plotRange.calcMapping();
    self.legendDone = false;
    self.update();
    self.fillCellModelWithPlotMethods();
    self.adjustModelWidth();
    self.emitSizeChange(true);
    self.pointsLimitModal.init();
  };

  PlotScope.prototype.adjustModelWidth = function() {
    this.plotSize.updateModelWidth(this.plotSize.getPlotWithLegendWidth());
  };

  PlotScope.prototype.updatePlot = function() {
    var self = this;

    self.standardizeData();
    self.initFlags();

    // see if previous state can be applied
    self.plotFocus.setFocus({});
    if (!self.model.getCellModel().tips) {
      self.model.getCellModel().tips = {};
    }

    self.tips = self.model.getCellModel().tips;
    self.layout.update();
    self.resetSvg();
    self.plotRange.calcRange();
    // init copies focus to defaultFocus, called only once
    if (_.isEmpty(self.plotFocus.getFocus())) {
      self.plotFocus.setFocus(self.plotFocus.defaultFocus);
    }

    // init remove pipe
    self.removePipe = [];
    self.plotRange.calcMapping();
    self.legendDone = false;
    self.update();
    self.fillCellModelWithPlotMethods();
  };

  PlotScope.prototype.update = function() {
    var self = this;
    if (self.model.isShowOutput !== undefined && self.model.isShowOutput() === false) {
      return;
    }

    self.resetSvg();
    self.plotGrid.render();

    self.renderData();
    self.updateClipPath(); // redraw

    plotTip.renderTips(self);
    self.plotZoom.boxZoom.renderLocateBox(); // redraw
    self.plotLegend.render(); // redraw
    self.updateMargin(); //update plot margins

    self.plotInteraction.prepare();

    self.clearRemovePipe();
  };

  PlotScope.prototype.getDumpState = function() {
    var self = this;
    if (self.model.getDumpState !== undefined) {
      return self.model.getDumpState();
    }
  };

  PlotScope.prototype.setDumpState = function(state) {
    var self = this;
    if (self.model.setDumpState !== undefined) {
      self.model.setDumpState(state);

      bkSessionManager.setNotebookModelEdited(true);
      bkUtils.refreshRootScope();
    }
  };

  PlotScope.prototype.getCellWidth = function() {
    return this.jqcontainer.width();
  };

  PlotScope.prototype.getCellHeight = function() {
    return this.jqcontainer.height();
  };

  PlotScope.prototype.getCellModel = function() {
    return this.model.getCellModel();
  };

  PlotScope.prototype.getTheme = function(){
    return bkHelper.getTheme();
  };

  PlotScope.prototype.destroy = function() {
    $(window).off('resize', this.plotSize.resizeFunction);
    this.svg.remove();
    this.jqcontainer.resizable({ disabled: true }).resizable('destroy');
    this.jqlegendcontainer.remove();
    this.jqsvg.remove();
    this.element.remove();

    this.resetSvg();
    this.plotInteraction.removeOnKeyListeners();

    setTimeout(this.initProperties.bind(this));

    this.contextMenu && this.contextMenu.destroy();
  };

  PlotScope.prototype.saveAsSvg = function() {
    saveAsContextMenu.saveAsSvg(self);
  };

  PlotScope.prototype.saveAsPng = function(scale) {
    saveAsContextMenu.saveAsPng(scale, scope);
  };

  PlotScope.prototype.setModelData = function(data) {
    var self = this;

    // TODO quick hack -> standardize all input data
    if (data.getCellModel) {
      self.model = data;
    } else {
      self.model.model = data;
    }

    if (self.model.getCellModel().type === "TreeMap"){
      bkoChartExtender.extend(self, self.element);
    }
  };

  // update model with partial model data
  PlotScope.prototype.updateModelData = function(data) {
    if (this.model && this.model.model && data) {
      this.model.model = _.extend(this.model.model, data);
    }
  };

  PlotScope.prototype.setElement = function(el) {
    this.element = el;
  };

  PlotScope.prototype.modelHasPlotSpecificMethods = function(model) {
    return model.getSvgToSave && model.saveAsSvg && model.saveAsPng && model.updateLegendPosition;
  };

  PlotScope.prototype.fillCellModelWithPlotMethods = function() {
    var self = this;
    var model = self.model.getCellModel();
    if(self.modelHasPlotSpecificMethods(model)) {
      return;
    }
    model.getSvgToSave = function () {
      return saveAsContextMenu.getSvgToSave(self);
    };
    model.saveAsSvg = function () {
      return self.saveAsSvg();
    };
    model.saveAsPng = function (scale) {
      return self.saveAsPng(scale);
    };
    model.updateLegendPosition = function () {
      return self.plotLegend.legendPosition.updateLegendPosition();
    };
  };

  return PlotScope;

});