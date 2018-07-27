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

  PlotScope.prototype.updateModelWidth = function(newWidth) {
    if (this.width === newWidth) { return; }
    this.width = newWidth;
    this.jqcontainer.css("width", newWidth );
    this.jqsvg.css("width", newWidth );
    this.plotRange.calcMapping(false);
    this.legendDone = false;
    this.legendResetPosition = true;
    this.update();
  };

  PlotScope.prototype.emitZoomLevelChange = function() {
    var data = this.stdmodel.data;
    for (var i = 0; i < data.length; i++) {
      if (data[i].isLodItem === true) {
        data[i].zoomLevelChanged(self);
      }
    }
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

  PlotScope.prototype.updateMargin = function(){
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

  PlotScope.prototype.toggleVisibility = function(e) {
    var self = this;
    var id = e.target.id.split("_")[1], data = self.stdmodel.data, line;
    // id in the format "legendcheck_id"
    if (id == "all") {
      self.showAllItems = !self.showAllItems;

      for (var lineId in self.legendMergedLines) {
        if (self.legendMergedLines.hasOwnProperty(lineId)) {
          line = self.legendMergedLines[lineId];
          line.showItem = self.showAllItems;
          for (var i = 0; i < line.dataIds.length; i++) {
            var dat = data[line.dataIds[i]];
            dat.showItem = self.showAllItems;
            if (dat.showItem === false) {
              dat.hideTips(self, true);
              if (dat.isLodItem === true) {
                dat.lodOn = false;
              }
            }else{
              dat.hideTips(self, false);
            }
          }
          if (line.showItem === false) {
            if (line.isLodItem === true) {
              self.setMergedLodHint(line.lodDataIds, lineId);
            }
          }
          self.jqlegendcontainer.find("#legendcheck_" + lineId).prop("checked", line.showItem);
        }
      }

      self.plotRange.calcRange();
      self.update();
      return;
    }

    line = self.legendMergedLines[id];
    line.showItem = !line.showItem;
    for (var j = 0; j < line.dataIds.length; j++) {
      var dat = data[line.dataIds[j]];
      dat.showItem = !dat.showItem;
      if (dat.showItem === false) {
        dat.hideTips(self, true);
        if (dat.isLodItem === true) {
          dat.lodOn = false;
        }
      } else {
        dat.hideTips(self, false);
      }
    }
    if (line.showItem === false) {
      if (line.isLodItem === true) {
        self.setMergedLodHint(line.lodDataIds, id);
      }
    }

    self.plotRange.calcRange();
    self.update();
  };

  PlotScope.prototype.renderMessage = function(title, msgs, msgid, callbacky, callbackn) {
    var self = this;
    var message = $("<div></div>").appendTo(self.jqcontainer)
      .attr("id", msgid)
      .attr("class", "plot-message")
      .on('mousedown', function(e) {
        if (e.which === 3) {
          if (callbackn != null) {
            callbackn();
          }
        } else {
          if (callbacky != null) {
            callbacky();
          }
        }
        $(this).remove();
      });

    if (title != null && title != "") {
      $("<div></div>").appendTo(message)
        .attr("class", "plot-message-title")
        .text(title);
    }

    var content = $("<div></div>").appendTo(message)
      .attr("class", "plot-message-content");
    if (typeof(msgs) === "string") {
      msgs = [ msgs ];
    }
    for (var i = 0; i < msgs.length; i++) {
      $("<div></div>").appendTo(content)
        .text(msgs[i]);
    }

    var w = message.outerWidth(), h = message.outerHeight();
    var lMargin = self.layout.leftLayoutMargin,
      bMargin = self.layout.bottomLayoutMargin;
    message.css({
      "left" : (self.jqcontainer.width() - lMargin) / 2 - w / 2 + lMargin,
      "top" : (self.jqcontainer.height() - bMargin) / 2 - h / 2
    });
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

    // first standardize data
    self.standardizeData();
    // init flags
    self.initFlags();

    // see if previous state can be applied
    self.plotFocus.setFocus({});

    if (!self.model.getCellModel().tips) {
      self.model.getCellModel().tips = {};
    }

    self.tips = self.model.getCellModel().tips;

    // create layout elements
    self.initLayout();

    if (!self.model.disableContextMenu) {
      self.saveAsMenuContainer = $('div#'+self.wrapperId+' #' + self.id);
      // init context menu for 'save as...'
      var ContextMenu = require('./contextMenu/plotContextMenu.ts').default;
      self.contextMenu = new ContextMenu(self);
    } else if (self.model && self.model.getSaveAsMenuContainer) {
      self.saveAsMenuContainer = self.model.getSaveAsMenuContainer();
    }

    self.jqcontainer.resizable({
      maxWidth: self.element.parent().width(), // no wider than the width of the cell
      minWidth: 150,
      minHeight: 150,
      handles: "e, s, se",
      resize : function(event, ui) {
        self.width = ui.size.width;
        self.height = ui.size.height;
        _.extend(self.layout.plotSize, ui.size);

        self.jqsvg.css({"width": self.width, "height": self.height});
        self.jqplottitle.css({"width": self.width });
        self.numIntervals = {
          x: self.width / self.intervalStepHint.x,
          y: self.height / self.intervalStepHint.y
        };
        self.plotRange.calcRange();
        self.plotRange.calcMapping(false);
        self.emitSizeChange();
        self.legendDone = false;
        self.legendResetPosition = true;

        self.update();
      }
    });

    self.resizeFunction = function() {
      // update resize maxWidth when the browser window resizes
      self.jqcontainer.resizable("option", "maxWidth", self.element.parent().width());
    };

    self.resetSvg();
    self.plotZoom.initZoomObject();

    self.svg
      .on("mousedown", function() {
        self.jqcontainer.addClass('bko-focused');
        return self.plotInteraction.mouseDown();
      });
    self.jqcontainer.on("mouseleave", function() {
        self.jqcontainer.removeClass('bko-focused');
        return zoomHelpers.disableZoomWheel(self);
      });
    self.jqsvg.mousemove(function(e) {
      return self.plotCursor.render(e);
    }).mouseleave(function(e) {
      return self.plotCursor.clear();
    });
    self.plotZoom.init();
    self._defaultZoomWheelFn = self.svg.on('wheel.zoom');
    zoomHelpers.disableZoomWheel(self);

    self.plotRange.calcRange();


    // init copies focus to defaultFocus, called only once
    if(_.isEmpty(self.plotFocus.getFocus())){
      self.plotFocus.setFocus(self.plotFocus.defaultFocus);
    }

    // init remove pipe
    self.removePipe = [];

    self.plotRange.calcMapping();

    self.legendDone = false;
    self.update();

    self.fillCellModelWithPlotMethods();
    self.adjustModelWidth();
    self.emitSizeChange(true);
    self.initPointsLimitModal();
  };

  PlotScope.prototype.adjustModelWidth = function() {
    this.updateModelWidth(this.getPlotWithLegendWidth());
  };

  PlotScope.prototype.getPlotWithLegendWidth = function() {
    var containerWidth = this.jqcontainer.parents('.output_subarea').width();
    var plotWidth = containerWidth && containerWidth < this.layout.plotSize.width ? containerWidth : this.layout.plotSize.width;
    var legendWidth = this.jqlegendcontainer.find('.plot-legend').width() || 0;
    var legendPosition = this.stdmodel.legendPosition.position;
    // Logic based on updateLegendPosition method
    var isLegendPlacedHorizontaly = (["LEFT", "RIGTH"].indexOf(legendPosition) !== -1) ||
      (["TOP", "BOTTOM"].indexOf(legendPosition) === -1 && this.stdmodel.legendLayout === "VERTICAL");

    legendWidth = legendWidth ? legendWidth + this.layout.legendMargin + 2 : 0;

    return isLegendPlacedHorizontaly ? plotWidth - legendWidth : plotWidth;
  };

  PlotScope.prototype.updatePlot = function() {
    var self = this;

    // first standardize data
    self.standardizeData();
    // init flags
    self.initFlags();

    // see if previous state can be applied
    self.plotFocus.setFocus({});

    if (!self.model.getCellModel().tips) {
      self.model.getCellModel().tips = {};
    }

    self.tips = self.model.getCellModel().tips;

    // create layout elements
    self.layout.update();

    self.resetSvg();

    self.plotRange.calcRange();


    // init copies focus to defaultFocus, called only once
    if(_.isEmpty(self.plotFocus.getFocus())){
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

  PlotScope.prototype.watchCellSize = function () {
    var self = this;
    if (!self.model.isShowOutput || (self.model.isShowOutput && self.model.isShowOutput() === true)) {
      self.layout.plotSize.width = self.getCellWidth();
      self.layout.plotSize.height = self.getCellHeight();
      if (self.setDumpState !== undefined) {
        self.setDumpState(self.dumpState());
      }
    }
  };

  PlotScope.prototype.getCellModel = function() {
    return this.model.getCellModel();
  };

  PlotScope.prototype.getTheme = function(){
    return bkHelper.getTheme();
  };

  PlotScope.prototype.destroy = function() {
    $(window).off('resize', this.resizeFunction);
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

  PlotScope.prototype.buildTemplate = function() {
    var tmpl = '<div id="'+this.wrapperId+'">' +
               '<div class="dtcontainer">' +
               '<canvas></canvas>'+
               '<div id="plotTitle" class="plot-title"></div>'+
               '<div id="plotLegendContainer" class="plot-plotlegendcontainer" oncontextmenu="return false;">'+
               '<div class="plot-plotcontainer" oncontextmenu="return false;">'+
               '<svg id="svgg">'+
               '<defs>' +
                  '<linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%"> <stop offset="0.0%" stop-color="#2c7bb6"></stop> <stop offset="12.5%" stop-color="#00a6ca"></stop> <stop offset="25.0%" stop-color="#00ccbc"></stop> <stop offset="37.5%" stop-color="#90eb9d"></stop> <stop offset="50.0%" stop-color="#ffff8c"></stop> <stop offset="62.5%" stop-color="#f9d057"></stop> <stop offset="75.0%" stop-color="#f29e2e"></stop> <stop offset="87.5%" stop-color="#e76818"></stop> <stop offset="100.0%" stop-color="#d7191c"></stop> </linearGradient> <marker id="Triangle" class="text-line-style" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="6" markerHeight="6" orient="auto"> <path d="M 0 0 L 10 5 L 0 10 z"></path> </marker> <filter id="svgfilter"> <feGaussianBlur result="blurOut" in="SourceGraphic" stdDeviation="1"></feGaussianBlur> <feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend> </filter> <filter id="svgAreaFilter"> <feMorphology operator="dilate" result="blurOut" in="SourceGraphic" radius="2"></feMorphology> <feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend> </filter>' +
                  '<clipPath id="clipPath_' + this.wrapperId + '"><rect x="0" y="0" width="100%" height="100%" /></clipPath>'+
               '</defs>' +
               '<g id="gridg"></g>'+
               '<g id="maing" clip-path="url(#clipPath_' + this.wrapperId + ')"></g>'+
               '<g id="labelg"></g>'+
               '</svg>'+
               '</div>'+
               '</div>'+
               '</div>'+
               '</div>';
    return tmpl;
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

  // ----- utils

  require('./plotModal/pointsLimitModal.ts').default(PlotScope);

  // --------

  return PlotScope;

});