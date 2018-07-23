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
  './plotTip',
  './plotConverter',
  './plotFormatter',
  './plotFactory',
  './gradientlegend',
  './chartExtender'
], function(
  _,
  $,
  draggable,
  resizable,
  d3,
  plotUtils,
  plotTip,
  plotConverter,
  plotFormatter,
  plotFactory,
  GradientLegend,
  bkoChartExtender
) {

  var PlotRange = require('./range/PlotRange').default;
  var PlotZoom = require('./zoom/index').default;
  var PlotFocus = require('./zoom/PlotFocus').default;
  var PlotGrid = require('./grid/PlotGrid').default;
  var bkUtils = require('./../shared/bkUtils').default;
  var bkHelper = require('./../shared/bkHelper').default;
  var zoomHelpers = require('./zoom/helpers').default;
  var PointShapeHelper = require('./std/PointShapeHelper.ts').default;

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
    this.plotSize = null;
    this.maing = null;
    this.gridg = null;
    this.labelg = null;
    this.renderFixed = null;
    this.layout = {};
    this.labelPadding = {};
    this.intervalStepHint = {};
    this.numIntervals = {};
    this.cursor = {};
    this.gridlineTickLength = null;
    this.legendResetPosition = null;
    this.visibleItem = null;
    this.legendableItem = null;
    this.rpipeGridlines = [];
    this.onKeyListeners = {}; //map: item.id -> listener function
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
  };
  
  PlotScope.prototype.setWidgetModel = function(plotDisplayModel) {
    this.plotDisplayModel = plotDisplayModel;
  };
  
  PlotScope.prototype.setWidgetView = function(plotDisplayView) {
    this.plotDisplayView = plotDisplayView;
  };


  PlotScope.prototype.initLayout = function() {
    var self = this;
    var model = this.stdmodel;
    var wrapperId = this.wrapperId;
    var scopeId = this.id;

    if(this.model.getCellModel().x_tickLabels_visible !== undefined){
      model.xAxis.showGridlineLabels = this.model.getCellModel().x_tickLabels_visible;
    }

    if(this.model.getCellModel().y_tickLabels_visible !== undefined){
      model.yAxis.showGridlineLabels = this.model.getCellModel().y_tickLabels_visible;
    }

    this.element.find(".ui-icon-gripsmall-diagonal-se")
      .removeClass("ui-icon-gripsmall-diagonal-se")
      .addClass("ui-icon-grip-diagonal-se");

    // hook container to use jquery interaction
    this.container = d3.select(this.element[0]).select(".plot-plotcontainer");
    this.jqcontainer = this.element.find(".plot-plotcontainer");
    this.jqlegendcontainer = this.element.find("#plotLegendContainer");
    this.svg = this.container.select("svg");
    this.jqsvg = this.element.find("#svgg");
    this.canvas = this.element.find("canvas")[0];

    this.canvas.style.display="none";

    var plotSize = this.plotSize;
    this.jqcontainer.css(plotSize);
    this.jqsvg.css(plotSize);

    $(window).resize(this.resizeFunction);

    var sanitize = require('./plotSanitize').default;

    // Apply advanced custom styles set directly by user
    if(model.customStyles) {
      var customStyleString = model.customStyles.map(function(s) {
        return '#' + wrapperId + ' #' + scopeId + ' ' + s;
      }).join('\n');
      // this string needs to be sanitized
      $("<style>"+ sanitize(customStyleString) + "\n</style>").prependTo(this.element.find('.plot-plotcontainer'));
    }

    // set title
    this.jqplottitle = this.element.find("#plotTitle");
    this.jqplottitle.text(model.title).css("width", plotSize.width);

    // Apply any specific element styles (labelStyle,elementStyle, etc)
    if(model['elementStyles']) {
      var styles = [];
      for(var style in model['elementStyles']) {
        styles.push('#' + wrapperId + ' #' + scopeId + ' ' + style + ' { ' + model['elementStyles'][style] + '}');
      }
      $("<style>\n" + sanitize(styles.join('\n')) + "\n</style>").prependTo(this.element.find('.plot-plotcontainer'));
      
      // Title style has to be handlded separately because it sits in a separate
      // div outside the hierachy the rest of the plot is in
      if(model['elementStyles']['.plot-title']) {
        var styleString = '.plot-title-' + scopeId + ' { ' +
          model['elementStyles']['.plot-title'] +
          '}'; 
        $("<style>\n" + sanitize(styleString) + "\n</style>").prependTo(this.element.find('.plot-title-' + scopeId));
      }
    }

    this.maing = d3.select(this.element[0]).select("#maing");
    this.gridg = d3.select(this.element[0]).select("#gridg");
    this.labelg = d3.select(this.element[0]).select("#labelg");

    this.jqgridg = this.element.find("#gridg");

    // set some constants

    this.renderFixed = 1;
    this.layout = {    // TODO, specify space for left/right y-axis, also avoid half-shown labels
      bottomLayoutMargin : 30,
      topLayoutMargin : 30,
      leftLayoutMargin : calcVertLayoutMargin.call(this, this.stdmodel.yAxis),
      rightLayoutMargin : this.stdmodel.yAxisR ? calcVertLayoutMargin(this.stdmodel.yAxisR) : 30,
      legendMargin : 10,
      legendBoxSize : 10
    };
    this.labelPadding = {
      x : 10,
      y : 10
    };
    this.intervalStepHint = {
      x : this.model.getCellModel().type === 'NanoPlot' ? 130 : 75,
      y : 30
    };
    if(this.stdmodel.orientation === 'HORIZONTAL'){
      var tempx = this.intervalStepHint.x;
      this.intervalStepHint.x = this.intervalStepHint.y;
      this.intervalStepHint.y = tempx;
    }
    this.numIntervals = {
      x: parseInt(plotSize.width) / this.intervalStepHint.x,
      y: parseInt(plotSize.height) / this.intervalStepHint.y
    };
    this.plotZoom.boxZoom.resetLocateBox();
    this.cursor = {
      x : -1,
      y : -1
    };

    this.gridlineTickLength = 3;

    var factor = 2.0;
    if (model.xAxis.label == null) { factor -= 1.0; }
    if (model.xAxis.showGridlineLabels === false) { factor -= 1.0; }
    this.layout.bottomLayoutMargin += plotUtils.fonts.labelHeight * factor;

    if (model.yAxis.showGridlineLabels !== false) {
      this.layout.topLayoutMargin += plotUtils.fonts.labelHeight / 2;
    }

    if (model.yAxis.label != null) {
      this.layout.leftLayoutMargin += plotUtils.fonts.labelHeight;
    }
    if(model.yAxisR != null) {
      this.layout.rightLayoutMargin += plotUtils.fonts.labelHeight;
    }
    this.legendResetPosition = true;

    this.jqcontainer.on('resize', function(e, ui) {
      e.stopPropagation();
      e.preventDefault();

      self.updateModelWidth();
    });
  };

  PlotScope.prototype.onModelFucusUpdate = function(newFocus) {
    if (newFocus === null) { return; }

    this.plotFocus.setFocus(
      {
        xl: newFocus.xl,
        xr: newFocus.xr,
        xspan: newFocus.xspan,
      },
      this.plotFocus.focus
    );

    this.plotRange.calcMapping(false);
    this.update();
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

  PlotScope.prototype.onKeyAction = function(item, onKeyEvent) {
    var key = plotUtils.getKeyCodeConstant(onKeyEvent.keyCode);
    for (var i = 0; i < this.stdmodel.data.length; i++) {
      var data = this.stdmodel.data[i];
      if (data.id === item.id || item.id.indexOf(data.id + "_") === 0) {
        var plotId = this.stdmodel.plotId;
        var plotIndex = this.stdmodel.plotIndex;
        if (data.keyTags != null && !_.isEmpty(data.keyTags[key])) {
          if (this.model.setActionDetails) {
            this.model.setActionDetails(plotIndex, data, item).then(
              function () { plotUtils.evaluateTagCell(data.keyTags[key]); },
              function () { console.error('set action details error'); } );
          } else {
            var params = plotUtils.getActionObject(this.model.getCellModel().type, item);
          	params.actionType = 'onkey';
          	params.key = key;
          	params.tag = data.keyTags[key];
          	this.plotDisplayModel.send({
            	event: 'actiondetails', 
            	plotId: plotId,
            	itemId: data.uid, 
            	params: params
            	}, this.plotDisplayView.callbacks());
          }
        } else if (data.keys != null && data.keys.indexOf(key) > -1) {
          this.legendDone = false;
          this.legendResetPosition = true;
          this.doNotLoadState = true;
          if (this.model.onKey) {
            this.model.onKey(key, plotIndex, data, item);
          } else {
          	var params = plotUtils.getActionObject(this.model.getCellModel().type, item);
          	params.key = key;
          	this.plotDisplayModel.send({event: 'onkey', plotId: plotId, itemId: data.uid, params: params},
          	    this.plotDisplayView.callbacks());
          }
        }
      }
    }
  };

  PlotScope.prototype.removeOnKeyListeners = function() {
    for (var f in this.onKeyListeners){
      if(this.onKeyListeners.hasOwnProperty(f)){
        $(document).off("keydown.plot-action", this.onKeyListeners[f]);
      }
    }
    this.onKeyListeners = {};
  };

  PlotScope.prototype.prepareInteraction = function() {
    var model = this.stdmodel;
    var self = this;

    this.svg.selectAll(".item-clickable")
      .on('click.action', function (e) {
        for (var i = 0; i < model.data.length; i++) {
          var item = model.data[i];
          if(item.hasClickAction === true && (item.id === e.id || e.id.indexOf(item.id + "_") === 0)) {
            var plotId = self.stdmodel.plotId;
            var plotIndex = self.stdmodel.plotIndex;
            if(!_.isEmpty(item.clickTag)){
              if (self.model.setActionDetails) {
                self.model.setActionDetails(plotIndex, item, e);
              } else {
              	var params = plotUtils.getActionObject(self.model.getCellModel().type, e);
              	params.actionType = 'onclick';
              	params.tag = item.clickTag;
                self.plotDisplayModel.send({
                	event: 'actiondetails', 
                	plotId: plotId,
                	itemId: item.uid, 
                	params: params
                	}, self.plotDisplayView.callbacks());
              }
            }else{
              self.legendDone = false;
              self.legendResetPosition = true;
              self.doNotLoadState = true;
              if (self.model.onClick) {
                self.model.onClick(plotIndex, item, e);
                return;
              } else {
               	self.plotDisplayModel.send(
               	    {event: 'onclick', 
               	      plotId: plotId,
               	      itemId: item.uid, 
               	      params: plotUtils.getActionObject(self.model.getCellModel().type, e)
               	    }, self.plotDisplayView.callbacks());
               	    
              }
            }
          }
        }
      });

    var onKeyElements = this.svg.selectAll(".item-onkey");
    //TODO add listeners only for elements that have keys or keyTags
    onKeyElements
      .on("mouseenter.plot-click", function(item){
        if(!self.onKeyListeners[item.id]) {
          self.onKeyListeners[item.id] = function(onKeyEvent){
            self.onKeyAction(item, onKeyEvent);
          };
          $(document).on("keydown.plot-action", self.onKeyListeners[item.id]);
        }
      })
      .on("mouseleave.plot-click", function(item){
        var keyListener = self.onKeyListeners[item.id]
        if (keyListener) {
          delete self.onKeyListeners[item.id];
          $(document).off("keydown.plot-action", keyListener);
        }
      });

    if (model.useToolTip === false) {
      return;
    }

    this.svg.selectAll(".plot-resp")
      .on('mouseenter', function(d) {
        d3.event.stopPropagation();

        self.drawLegendPointer(d);
        return plotTip.tooltip(self, d, d3.mouse(self.svg.node()));
      })
      .on('mousemove', function(d) {
        d3.event.stopPropagation();

        self.removeLegendPointer();
        self.drawLegendPointer(d);
        self.tipmoving = true;

        self.tipTimeout && clearTimeout(self.tipTimeout);
        self.tipTimeout = setTimeout(function() {
          self.tipmoving = false;
        }, 50);

        plotTip.movetooltip(self, d, d3.mouse(self.svg.node()));
      })
      .on("mouseleave", function(d) {
        d3.event.stopPropagation();

        self.removeLegendPointer();
        return plotTip.untooltip(self, d);
      })
      .on("click.resp", function(d) {
        var model = self.stdmodel;
        var hasClickAction;

        for (var i = 0; i < model.data.length; i++) {
          var item = model.data[i];
          if(item.hasClickAction === true && (item.id === d.id || d.id.indexOf(item.id + "_") === 0)) {
            hasClickAction = true;
            break;
          }
        }

        return !hasClickAction && plotTip.toggleTooltip(self, d);
      });
  };

  PlotScope.prototype.drawLegendPointer = function(d) {
    if (this.gradientLegend) {
      this.gradientLegend.drawPointer(d.ele.value);
    }
  };

  PlotScope.prototype.removeLegendPointer = function() {
    if(this.gradientLegend){
      this.gradientLegend.removePointer();
    }
  };

  PlotScope.prototype.renderCursor = function(e) {
    var x = e.offsetX, y = e.offsetY;
    var W = plotUtils.safeWidth(this.jqsvg), H = plotUtils.safeHeight(this.jqsvg);
    var lMargin = this.layout.leftLayoutMargin, bMargin = this.layout.bottomLayoutMargin,
      rMargin = this.layout.rightLayoutMargin, tMargin = this.layout.topLayoutMargin;
    var model = this.stdmodel;
    if (x < lMargin || model.yAxisR != null && x > W - rMargin || y > H - bMargin || y < tMargin) {
      this.svg.selectAll(".plot-cursor").remove();
      this.jqcontainer.find(".plot-cursorlabel").remove();
      return;
    }
    var mapX = this.plotRange.scr2dataX;
    if (model.xCursor != null) {
      var opt = model.xCursor;
      this.svg.selectAll("#cursor_x").data([{}]).enter().append("line")
        .attr("id", "cursor_x")
        .attr("class", "plot-cursor")
        .style("stroke", opt.color)
        .style("stroke-opacity", opt.color_opacity)
        .style("stroke-width", opt.width)
        .style("stroke-dasharray", opt.stroke_dasharray);
      this.svg.select("#cursor_x")
        .attr("x1", x).attr("y1", tMargin).attr("x2", x).attr("y2", H - bMargin);

      this.jqcontainer.find("#cursor_xlabel").remove();
      var label = $("<div id='cursor_xlabel' class='plot-cursorlabel'></div>")
        .appendTo(this.jqcontainer)
        .text(plotUtils.getTipStringPercent(mapX(x), model.xAxis));
      var w = label.outerWidth(), h = label.outerHeight();
      var p = {
        "x" : x - w / 2,
        "y" : H - bMargin - this.labelPadding.y - h
      };
      label.css({
        "left" : p.x ,
        "top" : p.y ,
        "background-color" : opt.color != null ? opt.color : "black"
      });
    }
    if (model.yCursor != null) {
      var opt = model.yCursor;
      this.svg.selectAll("#cursor_y").data([{}]).enter().append("line")
        .attr("id", "cursor_y")
        .attr("class", "plot-cursor")
        .style("stroke", opt.color)
        .style("stroke-opacity", opt.color_opacity)
        .style("stroke-width", opt.width)
        .style("stroke-dasharray", opt.stroke_dasharray);
      this.svg.select("#cursor_y")
        .attr("x1", lMargin)
        .attr("y1", y)
        .attr("x2", W - rMargin)
        .attr("y2", y);

      this.renderCursorLabel(model.yAxis, "cursor_ylabel", y, false);

      if (model.yAxisR) {
        this.renderCursorLabel(model.yAxisR, "cursor_yrlabel", y, true);
      }
    }
  };

  PlotScope.prototype.renderCursorLabel = function(axis, id, y, alignRight){
    var model = this.stdmodel;
    var opt = model.yCursor;
    var lMargin = this.layout.leftLayoutMargin;
    var rMargin = this.layout.rightLayoutMargin;
    var mapY = this.plotRange.scr2dataY;

    if(axis == null) { return };
    this.jqcontainer.find("#" + id).remove();
    var label = $("<div id='" + id + "' class='plot-cursorlabel'></div>")
      .appendTo(this.jqcontainer)
      .text(plotUtils.getTipStringPercent(mapY(y), axis));
    var w = label.outerWidth(), h = label.outerHeight();
    var p = {
      "x" : (alignRight ? rMargin : lMargin) + this.labelPadding.x,
      "y" : y - h / 2
    };
    var css = {
      "top" : p.y ,
      "background-color" : opt.color != null ? opt.color : "black"
    };
    css[alignRight ? "right" : "left"] = p.x;
    label.css(css);
  };

  PlotScope.prototype.prepareMergedLegendData = function() {
    var data = this.stdmodel.data;

    var mergedLines = {};
    var lineUniqueAttributesSet = {};

    for (var i = 0; i < data.length; i++) {
      var dat = data[i];
      if (dat.legend == null || dat.legend === "") {
        continue;
      }

      var lineUniqueIndex = dat.legend + getColorInfoUid(dat);

      if (lineUniqueAttributesSet[lineUniqueIndex] == null) {
        addNewLegendLineData(dat, lineUniqueIndex, mergedLines, lineUniqueAttributesSet, i);
      } else {
        addDataForExistingLegendLine(dat, mergedLines[lineUniqueAttributesSet[lineUniqueIndex]])
      }
    }
    return mergedLines;
  };

  PlotScope.prototype.getLegendPosition = function(legendPosition, isHorizontal) {
    var margin = this.layout.legendMargin,
      containerWidth = this.jqcontainer.outerWidth(true),
      containerWidthWithMargin = containerWidth + margin,
      legend = this.jqlegendcontainer.find("#plotLegend"),
      legendHeight = legend.height(),
      legendHeightWithMargin = legendHeight + margin,
      verticalCenter = this.jqcontainer.height() / 2 - legendHeight / 2,
      horizontalCenter = containerWidth / 2 - legend.width() / 2;
    if (!legendPosition) { return this.getLegendPosition("TOP_RIGHT", isHorizontal); }
    var position;
    if(legendPosition.position){
      switch(legendPosition.position){
        case "TOP":
          position = {
            "left": horizontalCenter,
            "top": -legendHeightWithMargin
          };
          break;
        case "LEFT":
          position = {
            "left": 0,
            "top": verticalCenter
          };
          break;
        case "BOTTOM":
          position = {
            "left": horizontalCenter,
            "bottom": -legendHeightWithMargin
          };
          break;
        case "RIGHT":
          position = {
            "left": containerWidthWithMargin,
            "bottom": verticalCenter
          };
          break;
        default:
          position = this.getLegendPositionByLayout(legendPosition, isHorizontal);
      }
    }else{
      position = {
        "left": legendPosition.x,
        "top": legendPosition.y
      };
    }
    return position;
  };

  PlotScope.prototype.getLegendPositionByLayout = function(legendPosition, isHorizontal){
    var legend = this.jqlegendcontainer.find("#plotLegend"),
      margin = this.layout.legendMargin,
      legendWidth = legend.outerWidth(true),
      containerWidth = this.jqcontainer.outerWidth(true),
      containerWidthWithMargin = containerWidth + margin,
      legendHeight = legend.height(),
      legendHeightWithMargin = legendHeight + margin, position;
    if(isHorizontal){
      switch(legendPosition.position){
        case "TOP_LEFT":
          position = {
            "left": 0,
            "top": -legendHeightWithMargin
          };
          break;
        case "TOP_RIGHT":
          position = {
            "left": containerWidth - legendWidth,
            "top": -legendHeightWithMargin
          };
          break;
        case "BOTTOM_LEFT":
          position = {
            "left": 0,
            "bottom": -legendHeightWithMargin
          };
          break;
        case "BOTTOM_RIGHT":
          position = {
            "left": containerWidth - legendWidth,
            "bottom": -legendHeightWithMargin
          };
          break;
      }
    }else{
      switch(legendPosition.position){
        case "TOP_LEFT":
          position = {
            "left": 0,
            "top": this.layout.topLayoutMargin
          };
          break;
        case "TOP_RIGHT":
          position = {
            "left": containerWidthWithMargin,
            "top": this.layout.topLayoutMargin
          };
          break;
        case "BOTTOM_LEFT":
          position = {
            "left": 0,
            "bottom": this.layout.bottomLayoutMargin
          };
          break;
        case "BOTTOM_RIGHT":
          position = {
            "left": containerWidthWithMargin,
            "bottom": this.layout.bottomLayoutMargin
          };
          break;
      }
    }
    return position;
  };

  PlotScope.prototype.createLegendContainer = function(clazz, handle) {
    var self = this;
    var isHorizontal = this.stdmodel.legendLayout === "HORIZONTAL";
    var draggable = {
      containment: 'parent',
      start: function(event, ui) {
        $(this).css({//avoid resizing for bottom-stacked legend
          "bottom": "auto"
        });
      },
      stop: function(event, ui) {
        self.legendPosition = {
          "left": ui.position.left,
          "top": ui.position.top
        };
      }
    };

    var legendContainer = $("<div></div>").appendTo(this.jqlegendcontainer)
      .attr("id", "plotLegend")
      .attr("class", "plot-legend")
      .draggable(draggable)
      .css("max-height", plotUtils.safeHeight(this.jqsvg) - this.layout.bottomLayoutMargin - this.layout.topLayoutMargin);

    if (clazz != null) {
      legendContainer.addClass(clazz);
    }

    if (handle != null) {
      draggable.handle = handle;
    } else {
      legendContainer.addClass("plot-legenddraggable");
    }

    if (isHorizontal) {
      legendContainer.css("max-width", this.jqcontainer.width());
    }

    return legendContainer;
  };

  PlotScope.prototype.getLodLabel = function(lodType) {
    var label;
    switch(lodType){
      case 'box':
        label = 'group into boxes';
        break;
      case 'river':
        label = 'group into river';
        break;
      case 'off':
        label = 'no grouping';
        break;
      default:
        label = lodType;
    }
    return label;
  };

  PlotScope.prototype.renderLegends = function() {
    var self = this;
    
    // legend redraw is controlled by legendDone
    if (this.legendableItem === 0 ||
        this.stdmodel.showLegend === false || this.legendDone === true) { return; }

    var data = this.stdmodel.data;
    var isHorizontal = this.stdmodel.legendLayout === "HORIZONTAL";

    this.jqlegendcontainer.find("#plotLegend").remove();
    this.legendDone = true;

    var legendContainer;
    if (this.model.getCellModel().type === "HeatMap"){
      legendContainer = this.createLegendContainer();
    }else{
      legendContainer = this.createLegendContainer("plot-legendscrollablecontainer", "#legendDraggableContainer");
    }

    if (this.model.getCellModel().type === "HeatMap") {
      this.gradientLegend = new GradientLegend(data);
      this.gradientLegend.render(legendContainer, data[0].colors);
      this.updateLegendPosition();
      return;
    }

    var legendDraggableContainer = $("<div></div>").appendTo(legendContainer)
      .attr("id", "legendDraggableContainer")
      .attr("class", "plot-legenddraggable");

    var legendUnit = "<div></div>",
      legendLineUnit = isHorizontal ? "<div class='plot-legenditeminline'></div>" : "<div class='plot-legenditeminrow'></div>";
    var legend = $(legendUnit).appendTo(legendDraggableContainer)
      .attr("id", "legends");

    this.legendMergedLines = this.prepareMergedLegendData();
    
    if (!this.stdmodel.omitCheckboxes &&
        Object.keys(this.legendMergedLines).length > 1) {  // skip "All" check when there is only one line
      var allLegendId = plotUtils.randomString(32);
      var unit = $(legendLineUnit).appendTo(legend)
        .attr("id", "legend_all")
        .addClass("plot-legendline");
      $("<input type='checkbox' />")
        .attr("id", "legendcheck_all_" + allLegendId)
        .attr("class", "plot-legendcheckbox beforeCheckbox")
        .prop("checked", this.showAllItems)
        .click(function(e) {
          return self.toggleVisibility(e);
        })
        .appendTo($(unit));
      $("<span></span>")
        .attr("id", "legendbox_all")
        .attr("class", "plot-legendbox")
        .css("background-color", "none")
        .appendTo($(unit));
      $("<label></label>")
        .attr("id", "legendtext_all")
        .attr("for", "legendcheck_all_" + allLegendId)
        .attr("class", "plot-label")
        .text("All")
        .appendTo($(unit));
    }

    this.lodTypeMenuItems = {};
    
    for (var id in this.legendMergedLines) {
      if (!this.legendMergedLines.hasOwnProperty(id)) { continue; }
      var line = this.legendMergedLines[id];
      if (line.legend == null || line.legend === "") { continue; }
      var highlightTimeoutId;
      var unit = $(legendLineUnit).appendTo(legend)
        .attr("id", "legend_" + id)
        .addClass("plot-legendline")
        .mouseenter(function(e){
          var legendLine = $(this)[0];
          highlightTimeoutId = setTimeout(function(){
            self.highlightElements(legendLine.id.split("_")[1], true);
          }, 300);
        })
        .mouseleave(function(e){
          clearTimeout(highlightTimeoutId);
          self.highlightElements($(this)[0].id.split("_")[1], false);
        });
      if(!this.stdmodel.omitCheckboxes){
        // checkbox
        $("<input type='checkbox'/>")
          .attr("id", "legendcheck_" + id)
          .attr("class", "plot-legendcheckbox beforeCheckbox")
          .prop("checked", line.showItem)
          .click(function(e) {
            return self.toggleVisibility(e);
          })
          .appendTo(unit);
      }

      var clr = plotUtils.createColor(line.color, line.color_opacity),
        st_clr = plotUtils.createColor(line.stroke, line.stroke_opacity);
      var sty = line.color == null ? "dotted " : "solid ";
      // color box
      $("<span></span>")
        .attr("id", "legendbox_" + id)
        .attr("class", "plot-legendbox")
        .attr("title", line.color == null ? "Element-based colored item" : "")
        .appendTo(unit)
        .append(PointShapeHelper.createLegendMarker(line));

      // legend text
      $("<label></label>").appendTo(unit)
        .attr("id", "legendtext_" + id)
        .attr("for", "legendcheck_" + id)
        .attr("class", "plot-label")
        .text(line.legend);

      if (line.isLodItem === true) {

        var applyLodType = function (lodType, legendLineId) {
          var dataIds = self.legendMergedLines[legendLineId].dataIds;

          if (lodType === 'off') {
            if (self.getMergedLodInfo(dataIds).lodType === "off") { return; }
            self.removePipe.push("msg_lodoff");
            self.renderMessage("LOD is being turned off. Are you sure?",
              [ "You are trying to turning off LOD. Loading full resolution data is " +
                "going to take time and may potentially crash the browser.",
                "PROCEED (left click) / CANCEL (right click)"],
              "msg_lodoff",
              function() {
                _.forEach(dataIds, function (dataId) {
                  var loadLoader = self.stdmodel.data[dataId];
                  if (loadLoader.toggleLod) {
                    loadLoader.toggleLod(self);
                  }
                });
                self.update();
                self.setMergedLodHint(dataIds, legendLineId);
              }, null);
          } else {
            var hasChanged = false;
            _.forEach(dataIds, function (dataId) {
              var loadLoader = self.stdmodel.data[dataId];
              if (!loadLoader.lodType || loadLoader.lodType === lodType) { return; }
              loadLoader.clear(self);
              loadLoader.applyLodType(lodType);
              loadLoader.zoomLevelChanged(self);
              hasChanged = true;
            });
            if (hasChanged) {
              self.update();
              self.setMergedLodHint(dataIds, legendLineId);
            }
          }
        };

        var createLodTypeMenuItem = function(lodType, lineId){
          return {
            lodType: lodType,
            lineId: lineId,
            name: self.getLodLabel(lodType),
            action: function(){
              applyLodType(this.lodType, this.lineId);
            }
          }
        };

        var lodTypeMenuItems = [];
        _.forEach(line.dataIds, function(dataId){
          var graphics = self.stdmodel.data[dataId];
          _.forEach(graphics.lodTypes, function(lodType){
            if(!_.some(lodTypeMenuItems, function(item) {
                return item.lodType === lodType;
              })){
              lodTypeMenuItems.push(createLodTypeMenuItem(lodType, id));
            }
          });
        });
        lodTypeMenuItems.push(createLodTypeMenuItem('off', id));

        var lodhint = $(
          '<div style="width: auto;">' +
          '<div class="dropdown dropdown-promoted lod-dropdown-menu">' +
          '<a class="dropdown-toggle plot-legendlodtype"></a>' +
          '<ul class="dropdown-menu"></ul>' +
          '</div>' +
          // '<bk-dropdown-menu menu-items="lodTypeMenuItems[\'' + id + '\']" submenu-classes="drop-right"></bk-dropdown-menu>' +
          '</div>'
        );

        var dropdownMenuElement = lodhint.find('ul.dropdown-menu');

        lodTypeMenuItems.forEach(function(item) {
          var liElem = $('<li class="">' +
                         '<a>'+item.name+'</a>' +
                         '</li>');
          liElem.children('a').on('click', function() {
            item.action();
            $(this).parents('.lod-dropdown-menu').removeClass('open');
          });
          dropdownMenuElement.append(liElem);
        });

        lodhint.find('a.dropdown-toggle').on('click', function() {
          var parent = $(this).parent();
          $('.lod-dropdown-menu').not(parent).removeClass('open');
          parent.toggleClass('open');
        });

        self.lodTypeMenuItems[id] = lodTypeMenuItems;
        // unit.append($compile(lodhint)(self));
        unit.append(lodhint);
        lodhint.attr("id", "hint_" + id).attr("class", "plot-legendlod");
        self.setMergedLodHint(line.lodDataIds, id);
      }
    }

    this.updateLegendPosition();
  };

  PlotScope.prototype.updateLegendPosition = function() {
    var self = this;
    var legendContainer = self.jqlegendcontainer.find("#plotLegend");
    var isHorizontal = self.stdmodel.legendLayout === "HORIZONTAL";
    var margin = self.layout.legendMargin;
    if (self.legendResetPosition === true) {
      self.legendPosition = self.getLegendPosition(self.stdmodel.legendPosition, isHorizontal);
      self.legendResetPosition = false;
    }
    legendContainer.css(self.legendPosition);

    //increase plot margins if legend has predefined values
    if(self.stdmodel.legendPosition.position === "LEFT") {
      self.jqcontainer.css("margin-left", legendContainer.width() + margin);
    }
    if(self.stdmodel.legendPosition.position === "TOP") {
      self.jqcontainer.css("margin-top", legendContainer.height() + margin);
    }
    if(self.stdmodel.legendPosition.position === "BOTTOM") {
      self.jqcontainer.css("margin-bottom", legendContainer.height() + margin);
    }
    if(isHorizontal){
      if(["TOP_LEFT", "TOP_RIGHT"].indexOf(self.stdmodel.legendPosition.position) !== -1) {
        self.jqcontainer.css("margin-top", legendContainer.height() + margin);
      }
      if(["BOTTOM_LEFT", "BOTTOM_RIGHT"].indexOf(self.stdmodel.legendPosition.position) !== -1) {
        self.jqcontainer.css("margin-bottom", legendContainer.height() + margin);
      }
    }else{
      if(["TOP_LEFT", "BOTTOM_LEFT"].indexOf(self.stdmodel.legendPosition.position) !== -1) {
        self.jqcontainer.css("margin-left", legendContainer.width() + margin);
      }
    }

    if (legendContainer.length) {
      var legenddraggable = legendContainer.find(".plot-legenddraggable");
      if (legendContainer.get(0).scrollHeight > legendContainer.get(0).clientHeight) {
        legenddraggable.addClass("hasScroll");
      } else {
        legenddraggable.removeClass("hasScroll");
      }
    }

  };

  PlotScope.prototype.highlightElements = function(legendId, highlight){
    var self = this;

    if(!legendId) { return; }

    var elementsIds = self.legendMergedLines[legendId].dataIds;
    for(var i=0; i<elementsIds.length; i++){
      var id = elementsIds[i];
      var data = self.stdmodel.data[id];
      data.setHighlighted(self, highlight);
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

  PlotScope.prototype.mouseDown = function() {
    var self = this;
    if (self.interactMode === "other") {
      self.interactMode = "zoom";
      return;
    } else if (self.interactMode === "remove") {
      self.interactMode = "other";
      return;
    }
    if (d3.event.target.nodeName.toLowerCase() === "div") {
      self.interactMode = "other";
      zoomHelpers.disableZoomWheel(self);
      return;
    }

    if (d3.event.button === 0) {
      self.interactMode = 'zoom';
      zoomHelpers.enableZoomWheel(self, d3);
    } else {
      self.interactMode = 'locate';
    }
  };

  PlotScope.prototype.resetSvg = function() {
    var self = this;
    self.jqcontainer.find(".plot-constlabel").remove();

    self.plotGrid.reset();
  };

  PlotScope.prototype.mouseleaveClear = function() {
    var self = this;
    self.svg.selectAll(".plot-cursor").remove();
    self.jqcontainer.find(".plot-cursorlabel").remove();
  };

  PlotScope.prototype.standardizeData = function() {
    var model = this.model.getCellModel();
    this.stdmodel = plotFormatter.standardizeModel(model, this.prefs);
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
    self.plotSize = {};

    _.extend(self.plotSize, self.stdmodel.plotSize);

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
        _.extend(self.plotSize, ui.size);

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
        return self.mouseDown();
      });
    self.jqcontainer.on("mouseleave", function() {
        self.jqcontainer.removeClass('bko-focused');
        return zoomHelpers.disableZoomWheel(self);
      });
    self.jqsvg.mousemove(function(e) {
      return self.renderCursor(e);
    }).mouseleave(function(e) {
      return self.mouseleaveClear(e);
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
    var plotWidth = containerWidth && containerWidth < this.plotSize.width ? containerWidth : this.plotSize.width;
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
    self.plotSize = {};

    _.extend(self.plotSize, self.stdmodel.plotSize);

    // create layout elements
    self.initLayout();

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
    self.renderLegends(); // redraw
    self.updateMargin(); //update plot margins

    self.prepareInteraction();

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
      self.plotSize.width = self.getCellWidth();
      self.plotSize.height = self.getCellHeight();
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
    this.removeOnKeyListeners();

    setTimeout(this.initProperties.bind(this));

    this.contextMenu && this.contextMenu.destroy();
  };

  PlotScope.prototype.getSvgToSave = function() {
    var self = this;
    var svg = self.svg
      .node()
      .cloneNode(true);
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    if (document.body.classList.contains('improveFonts')) {
      svg.setAttribute('class', 'svg-export improveFonts');
    } else {
      svg.setAttribute('class', 'svg-export');
    }

    var plotTitle = self.jqplottitle;
    var titleOuterHeight = plotUtils.getActualCss(plotTitle, 'outerHeight', true);

    //legend
    self.adjustSvgPositionWithLegend(svg, titleOuterHeight);
    self.appendLegendToSvg(d3.select(svg));
    ///////

    //tooltips
    self.appendTooltipsToSvg(d3.select(svg));

    plotUtils.translateChildren(svg, 0, titleOuterHeight);
    plotUtils.addTitleToSvg(svg, plotTitle, {
      width: plotTitle.width(),
      height: plotUtils.getActualCss(plotTitle, 'outerHeight')
    });

    // Custom styles added by user
    var cellModel = self.getCellModel(),
      extraStyles = [],
      styleString = '';
    if(cellModel.element_styles) {
      for(var style in cellModel.element_styles) {
        styleString = cellModel.element_styles[style];
        if (style === '.plot-title') {
          styleString = plotUtils.adjustStyleForSvg(styleString);
        }
        extraStyles.push(style + ' {' + styleString + '}');
      }
    }

    if(cellModel.custom_styles)
      extraStyles = extraStyles.concat(cellModel.custom_styles);

    plotUtils.addInlineStyles(svg, extraStyles);
    self.svgReplaceNbspCharacters(svg);

    return svg;
  };

  PlotScope.prototype.svgReplaceNbspCharacters = function(svg) {
    svg.innerHTML = svg.innerHTML.replace(/\&nbsp;/g, ' ');
  };

  PlotScope.prototype.saveAsSvg = function() {
    var self = this;
    var svgToSave = self.getSvgToSave();
    plotUtils.addInlineFonts(svgToSave);
    var html = plotUtils.convertToXHTML(svgToSave.outerHTML);
    var fileName = _.isEmpty(self.stdmodel.title) ? 'plot' : self.stdmodel.title;
    plotUtils.download('data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(html))), fileName + ".svg");
  };

  PlotScope.prototype.saveAsPng = function(scale) {
    var self = this;
    var svg = self.getSvgToSave();
    plotUtils.addInlineFonts(svg);

    scale = scale === undefined ? 1 : scale;

    self.canvas.width = svg.getAttribute("width") * scale;
    self.canvas.height = svg.getAttribute("height") * scale;

    var html = plotUtils.convertToXHTML(svg.outerHTML);
    var imgsrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(html)));
    var fileName = _.isEmpty(self.stdmodel.title) ? 'plot' : self.stdmodel.title;
    plotUtils.drawPng(self.canvas, imgsrc, fileName + ".png");
  };

  PlotScope.prototype.adjustSvgPositionWithLegend = function(svg, titleOuterHeight) {
    var self = this;
    var isHorizontal = self.stdmodel.legendLayout === "HORIZONTAL";
    var margin = self.layout.legendMargin;
    var legendContainer = self.jqlegendcontainer.find("#plotLegend");
    var containerLeftMargin = parseFloat(self.jqcontainer.css("margin-left"));

    var W = plotUtils.outerWidth(self.jqlegendcontainer);
    var H = plotUtils.outerHeight(self.jqlegendcontainer);
    H += titleOuterHeight;

    svg.setAttribute("width", W);
    svg.setAttribute("height", H);
    $(svg).css("width", W);
    $(svg).css("height", H);
  };

  PlotScope.prototype.appendLegendToSvg = function(svg) {
    var self = this;

    var legend = self.jqlegendcontainer.find("#plotLegend");
    if (self.legendableItem === 0 || self.stdmodel.showLegend === false || !legend.length) { return; }
    var legendCopy = self.jqlegendcontainer.find("#plotLegend").clone();
    legendCopy.find(".plot-legendcheckbox").each(function(i, item) {
      if (item.checked) {
        item.setAttribute("checked", true);
      }
      item.setAttribute("onclick", "return false");
    });
    legendCopy.css("position", "inherit");

    legendCopy.css("top", "auto");
    legendCopy.css("left", "auto");
    legendCopy.css("bottom", "auto");
    legendCopy.css("right", "auto");

    //remove base from urls
    legendCopy.find("[style*='url']").each(function(i, item){
      var style = $(item).attr('style');
      style = style.replace("/beaker/", "");
      $(item).attr('style', style);
    });

    var getPositive = function(value) {
      return value > 0 ? value : 0;
    };

    var position = plotUtils.getActualCss(legend, 'position');
    var x = getPositive(position.left);
    var y = position.top != null ? getPositive(position.top) : getPositive(position.bottom);
    svg.append("foreignObject")
      .attr("width", plotUtils.getActualCss(legend, 'outerWidth', true) + 1)//add 1 because jQuery round size
      .attr("height", plotUtils.getActualCss(legend, 'outerHeight', true) + 1)
      .attr("x", x)
      .attr("y", y)
      .append("xhtml:body")
      .attr('style', 'position: relative;')
      .attr("xmlns", "http://www.w3.org/1999/xhtml")
      .html(legendCopy[0].outerHTML);
  };

  PlotScope.prototype.appendTooltipsToSvg = function(svg) {
    var self = this;

    var tooltipElements = self.jqcontainer.find(".plot-tooltip").toArray();
    var scopeTipsSize = Object.keys(self.tips).length;

    if (scopeTipsSize > 0 && tooltipElements.length > 0) {
      tooltipElements.forEach(function(tooltip) {
        tooltip = $(tooltip);
        var tooltipCopy = tooltip.clone();

        tooltipCopy.css({
          position: 'inherit',
          top: 'auto',
          left: 'auto',
          bottom: 'auto',
          right: 'auto'
        });

        var getPositive = function(value) {
          return value > 0 ? value : 0;
        };

        var position = plotUtils.getActualCss(tooltip, 'position');
        var x = getPositive(position.left);
        var y = position.top != null ? getPositive(position.top) : getPositive(position.bottom);

        svg.append('foreignObject')
          .attr("width", plotUtils.getActualCss(tooltip, 'outerWidth', true) + 1)//add 1 because jQuery round size
          .attr("height", plotUtils.getActualCss(tooltip, 'outerHeight', true) + 1)
          .attr("x", x)
          .attr("y", y)
          .append('xhtml:body')
          .attr('style', 'position: relative;')
          .attr('xmlns', 'http://www.w3.org/1999/xhtml')
          .html(tooltipCopy[0].outerHTML);
      });
    }

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
      return self.getSvgToSave();
    };
    model.saveAsSvg = function () {
      return self.saveAsSvg();
    };
    model.saveAsPng = function (scale) {
      return self.saveAsPng(scale);
    };
    model.updateLegendPosition = function () {
      return self.updateLegendPosition();
    };
  };

  // ----- utils

  function measureText(pText, pFontSize, pStyle) {
    var lDiv = document.createElement('lDiv');

    document.body.appendChild(lDiv);

    if (pStyle != null) {
      lDiv.style = pStyle;
    }
    lDiv.style.fontSize = "" + pFontSize + "px";
    lDiv.style.position = "absolute";
    lDiv.style.left = -1000;
    lDiv.style.top = -1000;

    lDiv.innerHTML = pText;

    var lResult = {
      width: lDiv.clientWidth,
      height: lDiv.clientHeight
    };

    document.body.removeChild(lDiv);
    lDiv = null;

    return lResult;
  }

  function calcVertLayoutMargin(axis, pStyle) {
    var result = 0;
    var MIN_LEFT_MARGIN = 80;
    var MIN_WIDTH = 300;

    if (axis && axis.axisType === 'linear') {
      var l = axis.axisValL.toFixed(axis.axisFixed) + '';
      var r = axis.axisValR.toFixed(axis.axisFixed) + '';

      var m = l.length > r.length ? l : r;
      var size = measureText(m, 13, pStyle);

      result = size.width + size.height * 2;
    }

    if (this.jqcontainer && this.jqcontainer.width() > MIN_WIDTH && result < MIN_LEFT_MARGIN) {
      return MIN_LEFT_MARGIN;
    }

    return result;
  }

  function getColorInfoUid(dat) {
    var color = plotUtils.createColor(dat.color, dat.color_opacity),
      border = plotUtils.createColor(dat.stroke, dat.stroke_opacity);
    return color + border;
  }

  function addNewLegendLineData(dat, lineUniqueIndex, mergedLines, lineUniqueAttributesSet, i) {
    var line = {
      dataIds: [i],
      legend: dat.legend,
      showItem: dat.showItem,
      isLodItem: dat.isLodItem === true,
      color: dat.color,
      color_opacity: dat.color_opacity,
      stroke: dat.stroke,
      stroke_opacity: dat.stroke_opacity,
      shape: dat.type === "point" ? dat.shape : 'rect',
    };
    if (dat.isLodItem === true) {
      line.lodDataIds = [i];
    }
    var lineId = plotUtils.randomString(32);
    mergedLines[lineId] = line;
    lineUniqueAttributesSet[lineUniqueIndex] = lineId;
    return lineId;
  }

  function addDataForExistingLegendLine(dat, line) {
    line.dataIds.push(i);
    if (dat.isLodItem === true) {
      line.isLodItem = true;
      if (line.lodDataIds) {
        line.lodDataIds.push(i);
      } else {
        line.lodDataIds = [i];
      }
    }
    if (line.showItem !== true) {
      line.showItem = dat.showItem
    }
  }

  require('./plotModal/pointsLimitModal.ts').default(PlotScope);

  // --------

  return PlotScope;

});