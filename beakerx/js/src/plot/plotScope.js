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
  'jquery-ui',
  'jquery-ui/ui/widgets/draggable',
  'd3',
  './plotUtils',
  './plotTip',
  './plotConverter',
  './plotFormatter',
  './plotFactory',
  './../shared/bkUtils',
  './../shared/bkHelper',
  './gradientlegend',
  './chartExtender',
  'jquery-contextmenu'
], function(
  _,
  $,
  jqui,
  jquiDraggable,
  d3,
  plotUtils,
  plotTip,
  plotConverter,
  plotFormatter,
  plotFactory,
  bkUtils,
  bkHelper,
  GradientLegend,
  bkoChartExtender,
  contextMenu
) {

  function PlotScope(wrapperId) {
    this.wrapperId = wrapperId;
    this.id = null;

    this.model = {
      model: {},
      getCellModel: function() {
        return this.model;
      }
    };

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
    this.zoomLevel = {};
    this.labelPadding = {};
    this.intervalStepHint = {};
    this.numIntervals = {};
    this.locateBox = null;
    this.cursor = {};
    this.gridlineTickLength = null;
    this.legendResetPosition = null;
    this.visibleItem = null;
    this.legendableItem = null;
    this.defaultFocus = null;
    this.focus = null;
    this.rpipeGridlines = [];
    this.onKeyListeners = {}; //map: item.id -> listener function
    this.hasLodItem = false;
    this.hasUnorderedItem = false;
    this.showUnorderedHint = false;
    this.legendDone = false;
    this.legendResetPosition = false;
    this.doNotLoadState = false;
    this.saveAsMenuContainer = null;

    this.data2scrX = null;
    this.data2scrY = null;
    this.plotDisplayModel = null;
    this.plotDisplayView = null;
  }
  
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

    var noop = function (x) {
      return x;
    };
    var deepcopy = function(original){
      return JSON.parse(JSON.stringify(original));
    };
    var caja = IPython.security.caja;    
    window.cssSchemaFixed = false;
    var sanitize = function(styleString){
      if (!window.cssSchemaFixed){
        // fix caja to support svg color/painting attributes before using it. 
        // some of the attributes can be directly copied. some of them needs modification
        // for details, see https://github.com/google/caja/blob/1056be89dad487f9178d89f462fe5cb207c7e604/src/com/google/caja/lang/css/css3-defs.json
        var ATTRIBS = window.cssSchema;
        ATTRIBS['color-rendering'] = deepcopy(ATTRIBS['speak']);
        ATTRIBS['color-rendering'].cssLitGroup[0][0] = "auto";
        ATTRIBS['color-rendering'].cssLitGroup[1][0] = "optimizeSpeed";
        ATTRIBS['color-rendering'].cssLitGroup[2][0] = "optimizeQuality";
        ATTRIBS['fill'] = ATTRIBS['color'];
        ATTRIBS['fill-opacity'] = ATTRIBS['opacity'];
        ATTRIBS['fill-rule'] = deepcopy(ATTRIBS['speak-header']);
        ATTRIBS['fill-rule'].cssLitGroup[0][0] = "nonzero";
        ATTRIBS['fill-rule'].cssLitGroup[1][0] = "evenodd";
        ATTRIBS['image-rendering'] = ATTRIBS['color-rendering'];
        ATTRIBS['marker-start'] = ATTRIBS['cue-before'];
        ATTRIBS['marker-mid'] = ATTRIBS['cue-before'];
        ATTRIBS['marker-end'] = ATTRIBS['cue-before'];
        ATTRIBS['shape-rendering'] = deepcopy(ATTRIBS['text-transform']);
        ATTRIBS['shape-rendering'].cssLitGroup[0][0] = "optimizeSpeed";
        ATTRIBS['shape-rendering'].cssLitGroup[0][1] = "crispEdges";
        ATTRIBS['shape-rendering'].cssLitGroup[0][2] = "geometricPrecision";
        ATTRIBS['shape-rendering'].cssLitGroup[1][0] = "auto";
        ATTRIBS['stroke'] = ATTRIBS['color'];
        ATTRIBS['stroke-linecap'] = deepcopy(ATTRIBS['speak']);
        ATTRIBS['stroke-linecap'].cssLitGroup[0][0] = "butt";
        ATTRIBS['stroke-linecap'].cssLitGroup[1][0] = "round";
        ATTRIBS['stroke-linecap'].cssLitGroup[2][0] = "square";
        ATTRIBS['stroke-linejoin'] = deepcopy(ATTRIBS['speak']);
        ATTRIBS['stroke-linejoin'].cssLitGroup[0][0] = "miter";
        ATTRIBS['stroke-linejoin'].cssLitGroup[1][0] = "round";
        ATTRIBS['stroke-linejoin'].cssLitGroup[2][0] = "bevel";
        ATTRIBS['stroke-miterlimit'] = ATTRIBS['stress']; 
        ATTRIBS['stroke-opacity'] = ATTRIBS['opacity'];
        ATTRIBS['stroke-width'] = ATTRIBS['max-width'];
        ATTRIBS['text-rendering'] = deepcopy(ATTRIBS['shape-rendering']);
        ATTRIBS['text-rendering'].cssLitGroup[0][1] = "optimizeLegibility";
        window.cssSchemaFixed = true;
      }

      return caja.sanitizeStylesheet(
        window.location.pathname,
        styleString,
        {
          containerClass: null,
          idSuffix: '',
          virtualizeAttrName: noop
        },
        noop
      );
    }
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
      topLayoutMargin : 0,
      leftLayoutMargin : calcVertLayoutMargin(this.stdmodel.yAxis),
      rightLayoutMargin : this.stdmodel.yAxisR ? calcVertLayoutMargin(this.stdmodel.yAxisR) : 0,
      legendMargin : 10,
      legendBoxSize : 10
    };
    this.zoomLevel = {
      minSpanX : 1E-8,
      minSpanY : 1E-8,
      maxScaleX : 1,
      maxScaleY : 1
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
    this.locateBox = null;
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
      self.watchModelGetWidth();
    });

    // self.$watch("model.getWidth()", function(newWidth) {
    //   if (self.width == newWidth) { return; }
    //   self.width = newWidth;
    //   self.jqcontainer.css("width", newWidth );
    //   self.jqsvg.css("width", newWidth );
    //   self.calcMapping(false);
    //   self.legendDone = false;
    //   self.legendResetPosition = true;
    //   self.update();
    // });
    // self.$watch('model.isShowOutput()', function(prev, next) {
    //   if (prev !== next) {
    //     self.update();
    //   }
    // });
  };

  PlotScope.prototype.onModelFucusUpdate = function(newFocus) {
    if (newFocus === null) { return; }
    this.focus.xl = newFocus.xl;
    this.focus.xr = newFocus.xr;
    this.focus.xspan = newFocus.xr - newFocus.xl;
    this.calcMapping(false);
    this.update();
  };

  PlotScope.prototype.watchModelGetWidth = function(newWidth) {
    if (this.width === newWidth) { return; }
    this.width = newWidth;
    this.jqcontainer.css("width", newWidth );
    this.jqsvg.css("width", newWidth );
    this.calcMapping(false);
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

  PlotScope.prototype.emitSizeChange = function() {
    if (this.model.updateWidth !== null && this.model.updateWidth !== undefined) {
      this.model.updateWidth(this.width);
    } // not stdmodel here

    // self.$emit('plotSizeChanged', {
    //   width: self.width,
    //   height: self.height
    // });
  };

  PlotScope.prototype.calcRange = function() {
    var ret = plotUtils.getDefaultFocus(this.stdmodel);
    this.visibleItem = ret.visibleItem;
    this.legendableItem = ret.legendableItem;
    this.defaultFocus = ret.defaultFocus;
    this.fixFocus(this.defaultFocus);
  };

  PlotScope.prototype.calcGridlines = function() {
    // prepare the gridlines
    var focus = this.focus, model = this.stdmodel;
    model.xAxis.setGridlines(focus.xl,
      focus.xr,
      this.numIntervals.x,
      model.margin.left,
      model.margin.right);
    model.yAxis.setGridlines(focus.yl,
      focus.yr,
      this.numIntervals.y,
      model.margin.bottom,
      model.margin.top);
    if(model.yAxisR){
      model.yAxisR.setGridlines(focus.yl_r,
        focus.yr_r,
        this.numIntervals.y,
        model.margin.bottom,
        model.margin.top)
    }
  };

  PlotScope.prototype.renderGridlines = function() {
    var focus = this.focus, model = this.stdmodel;
    var mapX = this.data2scrX, mapY = this.data2scrY;
    var mapY_r = this.data2scrY_r;

    if(model.showXGridlines){
      var xGridlines = model.xAxis.getGridlines();
      for (var i = 0; i < xGridlines.length; i++) {
        var x = xGridlines[i];
        this.rpipeGridlines.push({
          "id" : "gridline_x_" + i,
          "class" : "plot-gridline",
          "x1" : mapX(x),
          "y1" : mapY(focus.yl),
          "x2" : mapX(x),
          "y2" : mapY(focus.yr)
        });
      }
    }
    var yGridlines = model.yAxis.getGridlines();
    for (var i = 0; i < yGridlines.length; i++) {
      var y = yGridlines[i];
      this.rpipeGridlines.push({
        "id" : "gridline_y_" + i,
        "class" : "plot-gridline",
        "x1" : mapX(focus.xl),
        "y1" : mapY(y),
        "x2" : mapX(focus.xr),
        "y2" : mapY(y)
      });
    }
    this.rpipeGridlines.push({
      "id" : "gridline_x_base",
      "class" : "plot-gridline-base",
      "x1" : mapX(focus.xl),
      "y1" : mapY(focus.yl),
      "x2" : mapX(focus.xr),
      "y2" : mapY(focus.yl)
    });
    this.rpipeGridlines.push({
      "id" : "gridline_y_base",
      "class" : "plot-gridline-base",
      "x1" : mapX(focus.xl),
      "y1" : mapY(focus.yl),
      "x2" : mapX(focus.xl),
      "y2" : mapY(focus.yr)
    });
    if (focus.yl_r !== undefined && focus.yr_r !== undefined) {
      this.rpipeGridlines.push({
        "id" : "gridline_yr_base",
        "class" : "plot-gridline-base",
        "x1" : mapX(focus.xr),
        "y1" : mapY_r(focus.yl_r),
        "x2" : mapX(focus.xr),
        "y2" : mapY_r(focus.yr_r)
      });
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
        if (data.keyTags != null && !_.isEmpty(data.keyTags[key])) {
          if (this.model.setActionDetails) {
            this.model.setActionDetails(plotId, data, item).then(
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
            this.model.onKey(key, plotId, data, item);
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
            if(!_.isEmpty(item.clickTag)){
              if (self.model.setActionDetails) {
                self.model.setActionDetails(plotId, item, e).then(
                  function () { plotUtils.evaluateTagCell(item.clickTag); },
                  function () { console.error('set action details error'); }
                );
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
                self.model.onClick(plotId, item, e);
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
        self.drawLegendPointer(d);
        return plotTip.tooltip(self, d, d3.mouse(self.svg.node()));
      })
      .on('mousemove', function(d) {

        self.removeLegendPointer();
        plotTip.untooltip(self, d);

        self.drawLegendPointer(d);
        return plotTip.tooltip(self, d, d3.mouse(self.svg.node()));
      })
      .on("mouseleave", function(d) {
        self.removeLegendPointer();
        return plotTip.untooltip(self, d);
      })
      .on("click.resp", function(d) {
        return plotTip.toggleTooltip(self, d);
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

  PlotScope.prototype.renderGridlineLabels = function() {
    var _size_ = function (s, clazz) {
      var o = $('<div>' + s + '</div>')
          .css({
            'position': 'absolute',
            'float': 'left',
            'white-space': 'nowrap',
            'visibility': 'hidden',
            'class': clazz
          }).appendTo($('body')),
        w = o.width(),
        h = o.height();
      o.remove();
      return {
        width : w,
        height : h
      };
    };
    var mapX = this.data2scrX, mapY = this.data2scrY;
    var mapY_r = this.data2scrY_r;
    var model = this.stdmodel;
    if (model.xAxis.showGridlineLabels !== false) {
      var lines = model.xAxis.getGridlines(),
        labels = model.xAxis.getGridlineLabels();
      for (var i = 0; i < labels.length; i++) {
        var x = mapX(lines[i]);
        var y = mapY(this.focus.yl) + this.labelPadding.y;
        var rpipeText = {
          "id": "label_x_" + i,
          "class": "plot-label plot-label-x",
          "text": labels[i],
          "x": x,
          "y": y,
          "text-anchor": "middle",
          "dominant-baseline": "hanging"
        };
        if (model.categoryNamesLabelAngle &&
            model.categoryNamesLabelAngle !== 0 && model.orientation === 'VERTICAL') {
          var __size__ = _size_(labels[i], "plot-label");
          var degree = -1 * model.categoryNamesLabelAngle * (180 / Math.PI);
          var delta = degree > 0 ? (__size__.width / 2) : -1 * (__size__.width / 2);
          rpipeText.transform =
            "translate(" +
            delta +
            " " + -this.labelPadding.y +
            ") "
            +
            "rotate(" +
            degree +
            " " + (x - delta) +
            " " + (y + __size__.height / 2) +
            ") "
          ;
        }
        this.rpipeTexts.push(rpipeText);
      }
    }
    if (model.yAxis.showGridlineLabels !== false) {
      lines = model.yAxis.getGridlines();
      labels = model.yAxis.getGridlineLabels();
      for (var i = 0; i < labels.length; i++) {
        var x = mapX(this.focus.xl) - this.labelPadding.x;
        var y = mapY(lines[i]);

        var rpipeText = {
          "id": "label_y_" + i,
          "class": "plot-label plot-label-y",
          "text": labels[i],
          "x": x,
          "y": y,
          "text-anchor": "end",
          "dominant-baseline": "central"
        };
        if (model.categoryNamesLabelAngle &&
            model.categoryNamesLabelAngle !== 0 && model.orientation === 'HORIZONTAL') {
          rpipeText.transform = "rotate(" +
                                model.categoryNamesLabelAngle * (180 / Math.PI) +
                                " " + (x) +
                                " " + (y) +
                                ")";
        }
        this.rpipeTexts.push(rpipeText);
      }
    }
    if (model.yAxisR && model.yAxisR.showGridlineLabels !== false) {
      lines = model.yAxisR.getGridlines();
      labels = model.yAxisR.getGridlineLabels();
      for (var i = 0; i < labels.length; i++) {
        var y = lines[i];
        this.rpipeTexts.push({
          "id" : "label_yr_" + i,
          "class" : "plot-label",
          "text" : labels[i],
          "x" : mapX(this.focus.xr) + this.labelPadding.x,
          "y" : mapY_r(y),
          "dominant-baseline" : "central"
        });
      }
    }
    var lMargin = this.layout.leftLayoutMargin, bMargin = this.layout.bottomLayoutMargin;
    if (model.xAxis.label != null) {
      this.rpipeTexts.push({
        "id" : "xlabel",
        "class" : "plot-xylabel",
        "text" : model.xAxis.axisLabelWithCommon,
        "x" : lMargin + (plotUtils.safeWidth(this.jqsvg) - lMargin) / 2,
        "y" : plotUtils.safeHeight(this.jqsvg) - plotUtils.fonts.labelHeight
      });
    }
    if (model.yAxis.label != null) {
      var x = plotUtils.fonts.labelHeight * 2, y = (plotUtils.safeHeight(this.jqsvg) - bMargin) / 2;
      this.rpipeTexts.push({
        "id" : "ylabel",
        "class" : "plot-xylabel",
        "text" : model.yAxis.label,
        "x" : x,
        "y" : y,
        "transform" : "rotate(-90 " + x + " " + y + ")"
      });
    }
    if (model.yAxisR && model.yAxisR.label != null) {
      var x = plotUtils.safeWidth(this.jqsvg) - plotUtils.fonts.labelHeight, y = (plotUtils.safeHeight(this.jqsvg) - bMargin) / 2;
      this.rpipeTexts.push({
        "id" : "yrlabel",
        "class" : "plot-xylabel",
        "text" : model.yAxisR.label,
        "x" : x,
        "y" : y,
        "transform" : "rotate(-90 " + x + " " + y + ")"
      });
    }
  };

  PlotScope.prototype.renderGridlineTicks = function() {
    var tickLength = this.gridlineTickLength;
    var mapX = this.data2scrX, mapY = this.data2scrY;
    var focus = this.focus;
    var model = this.stdmodel;
    if (model.xAxis.showGridlineLabels !== false) {
      var lines = model.xAxis.getGridlines(),
        labels = model.xAxis.getGridlineLabels();
      for (var i = 0; i < labels.length; i++) {
        var x = lines[i];
        this.rpipeTicks.push({
          "id" : "tick_x_" + i,
          "class" : "plot-tick",
          "x1" : mapX(x),
          "y1" : mapY(focus.yl),
          "x2" : mapX(x),
          "y2" : mapY(focus.yl) + tickLength
        });
      }
    }
    if (model.yAxis.showGridlineLabels !== false) {
      lines = model.yAxis.getGridlines();
      labels = model.yAxis.getGridlineLabels();
      for (var i = 0; i < labels.length; i++) {
        var y = lines[i];
        this.rpipeTicks.push({
          "id" : "tick_y_" + i,
          "class" : "plot-tick",
          "x1" : mapX(focus.xl) - tickLength,
          "y1" : mapY(y),
          "x2" : mapX(focus.xl),
          "y2" : mapY(y)
        });
      }
    }
    if (model.yAxisR && model.yAxisR.showGridlineLabels !== false) {
      lines = model.yAxisR.getGridlines();
      labels = model.yAxisR.getGridlineLabels();
      for (var i = 0; i < labels.length; i++) {
        var y = lines[i];
        this.rpipeTicks.push({
          "id" : "tick_yr_" + i,
          "class" : "plot-tick",
          "x1" : mapX(focus.xr),
          "y1" : mapY(y),
          "x2" : mapX(focus.xr) + tickLength,
          "y2" : mapY(y)
        });
      }
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
    var mapX = this.scr2dataX;
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
    var mapY = this.scr2dataY;

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
        .css("background-color",
          line.color == null ? "none" : clr)
        .css("border",
          line.stroke != null ? "1px " + sty + st_clr :
            (line.color != null ? "1px " + sty + clr : "1px dotted gray"))
        .appendTo(unit);
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
          '<div style="float: right; width: auto;">' +
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

      self.calcRange();
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

    self.calcRange();
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

  PlotScope.prototype.renderCoverBox = function() {
    var self = this;
    var W = plotUtils.safeWidth(self.jqsvg), H = plotUtils.safeHeight(self.jqsvg);
    plotUtils.replotSingleRect(self.labelg, {
      "id" : "coverboxYr",
      "class" : "plot-coverbox",
      "x" : 0,
      "y" : H - self.layout.bottomLayoutMargin,
      "width" : W,
      "height" : self.layout.bottomLayoutMargin
    });
    plotUtils.replotSingleRect(self.labelg, {
      "id" : "coverboxYl",
      "class" : "plot-coverbox",
      "x" : 0,
      "y" : 0,
      "width" : W,
      "height" : self.layout.topLayoutMargin
    });
    plotUtils.replotSingleRect(self.labelg, {
      "id" : "coverboxXl",
      "class" : "plot-coverbox",
      "x" : 0,
      "y" : 0,
      "width" : self.layout.leftLayoutMargin,
      "height" : H
    });
    plotUtils.replotSingleRect(self.labelg, {
      "id" : "coverboxXr",
      "class" : "plot-coverbox",
      "x" : W - self.layout.rightLayoutMargin,
      "y" : 0,
      "width" : self.stdmodel.yAxisR ? self.layout.rightLayoutMargin : 10,
      "height" : H
    });

  };

  PlotScope.prototype.renderLocateBox = function() {
    var self = this;
    self.svg.selectAll("#locatebox").remove();
    if (self.locateBox != null) {
      var box = self.locateBox;
      self.view = self.svg.selectAll("#locatebox").data([{}]).enter().append("rect")
        .attr("id", "locatebox")
        .attr("class", "plot-locatebox")
        .attr("x", box.x)
        .attr("y", box.y)
        .attr("width", box.w)
        .attr("height", box.h);
    }
  };

  PlotScope.prototype.calcLocateBox = function() {
    var self = this;
    var p1 = self.mousep1, p2 = self.mousep2;
    var xl = Math.min(p1.x, p2.x), xr = Math.max(p1.x, p2.x),
      yl = Math.min(p1.y, p2.y), yr = Math.max(p1.y, p2.y);
    if (xr === xl) { xr = xl + 1; }
    if (yr === yl) { yr = yl + 1; }
    self.locateBox = {
      "x" : xl,
      "y" : yl,
      "w" : xr - xl,
      "h" : yr - yl
    };
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
      self.disableZoomWheel();
      return;
    }

    if (d3.event.button === 0) {
      self.interactMode = 'zoom';
      self.enableZoomWheel();
    } else {
      self.interactMode = 'locate';
    }
  };

  // PlotScope.prototype.mouseUp = function() {
  //   if (self.interactMode === "remove") {
  //     self.interactMode = "other";
  //     return;
  //   }
  //   if (self.interactMode === "other") {
  //     self.interactMode = "zoom";
  //   }
  //   self.enableZoomWheel();
  // };

  PlotScope.prototype.zoomBoxZooming = function() {
    var self = this;

    var svgNode = self.svg.node();
    // right click zoom
    self.mousep2 = {
      "x" : d3.mouse(svgNode)[0],
      "y" : d3.mouse(svgNode)[1]
    };
    self.calcLocateBox();
    self.rpipeRects = [];
    self.renderLocateBox();
  };

  PlotScope.prototype.zoomStart = function() {
    var self = this;
    if (self.interactMode === "other") { return; }

    self.zoom = true;
    self.zoomed = false;

    var d3trans = d3.event.transform || d3.event;
    self.lastx = d3trans.x;
    self.lasty = d3trans.y;
    self.lastTransK = d3trans.k;

    var svgNode = self.svg.node();

    self.mousep1 = {
      "x" : d3.mouse(svgNode)[0],
      "y" : d3.mouse(svgNode)[1]
    };
    self.mousep2 = {};
    _.extend(self.mousep2, self.mousep1);

    self.jqsvg.css("cursor", "auto");
  };

  PlotScope.prototype.zooming = function() {
    var self = this;
    if (self.interactMode === "other" || !self.zoom){
      return;
    } else if (self.interactMode === "zoom"){

      var lMargin = self.layout.leftLayoutMargin,
        bMargin = self.layout.bottomLayoutMargin,
        W = plotUtils.safeWidth(self.jqsvg) - lMargin,
        H = plotUtils.safeHeight(self.jqsvg) - bMargin,

        d3trans = d3.event.transform || d3.event,

        svgNode = self.svg.node(),
        mx = d3.mouse(svgNode)[0],
        my = d3.mouse(svgNode)[1],

        focus = self.focus;

      if (Math.abs(mx - self.mousep1.x)>0 || Math.abs(my - self.mousep1.y)>0){
        self.zoomed = true;
      }

      var ZOOM_TICK = 0.1;
      var zoomDirection = Math.sign(self.lastTransK - d3trans.k);
      var dx = d3trans.x - self.lastx;
      var dy = d3trans.y - self.lasty;
      var zoomRate =  Math.abs(zoomDirection + ZOOM_TICK);

      self.lastx = d3trans.x;
      self.lasty = d3trans.y;
      self.lastTransK = d3trans.k;

      var tx = -dx / W * focus.xspan,
        ty = dy / H * focus.yspan,
        ty_r = dy / H * focus.yspan_r;

      if(zoomDirection === 0){
        // for translating, moving the graph
        if (focus.xl + tx>=0 && focus.xr + tx<=1){
          focus.xl += tx;
          focus.xr += tx;
        } else {
          if (focus.xl + tx<0){
            focus.xl = 0;
            focus.xr = focus.xl + focus.xspan;
          } else if (focus.xr + tx>1){
            focus.xr = 1;
            focus.xl = focus.xr - focus.xspan;
          }
        }

        if (focus.yl + ty>=0 && focus.yr + ty<=1){
          focus.yl += ty;
          focus.yr += ty;
        } else {
          if (focus.yl + ty<0){
            focus.yl = 0;
            focus.yr = focus.yl + focus.yspan;
          } else if (focus.yr + ty>1){
            focus.yr = 1;
            focus.yl = focus.yr - focus.yspan;
          }
        }

        if (focus.yl_r !== undefined && focus.yr_r !== undefined) {
          if (focus.yl_r + ty>=0 && focus.yr_r + ty_r<=1){
            focus.yl_r += ty_r;
            focus.yr_r += ty_r;
          } else {
            if (focus.yl_r + ty_r<0){
              focus.yl_r = 0;
              focus.yr_r = focus.yl_r + focus.yspan_r;
            } else if (focus.yr_r + ty_r>1){
              focus.yr_r = 1;
              focus.yl_r = focus.yr_r - focus.yspan_r;
            }
          }
        }

        self.jqsvg.css("cursor", "move");
      }else{
        // scale only
        var level = self.zoomLevel;
        if (my <= plotUtils.safeHeight(self.jqsvg) - self.layout.bottomLayoutMargin) {
          // scale y
          var ym = focus.yl + self.scr2dataYp(my) * focus.yspan;
          var nyl = ym - zoomRate * (ym - focus.yl),
            nyr = ym + zoomRate * (focus.yr - ym),
            nyspan = nyr - nyl;
          if (nyspan >= level.minSpanY && nyspan <= level.maxScaleY) {
            focus.yl = nyl;
            focus.yr = nyr;
            focus.yspan = nyspan;
          } else {
            if (nyspan > level.maxScaleY) {
              focus.yr = focus.yl + level.maxScaleY;
            } else if (nyspan < level.minSpanY) {
              focus.yr = focus.yl + level.minSpanY;
            }
            focus.yspan = focus.yr - focus.yl;
          }

          // scale y right
          var ym_r = focus.yl_r + self.scr2dataYp_r(my) * focus.yspan_r;
          var nyl_r = ym_r - zoomRate * (ym_r - focus.yl_r),
            nyr_r = ym_r + zoomRate * (focus.yr_r - ym_r),
            nyspan_r = nyr_r - nyl_r;
          if (nyspan_r >= level.minSpanY && nyspan_r <= level.maxScaleY) {
            focus.yl_r = nyl_r;
            focus.yr_r = nyr_r;
            focus.yspan_r = nyspan_r;
          } else {
            if (nyspan_r > level.maxScaleY) {
              focus.yr_r = focus.yl_r + level.maxScaleY;
            } else if (nyspan_r < level.minSpanY) {
              focus.yr_r = focus.yl_r + level.minSpanY;
            }
            focus.yspan_r = focus.yr_r - focus.yl_r;
          }
        }
        if (mx >= self.layout.leftLayoutMargin) {
          // scale x
          var xm = focus.xl + self.scr2dataXp(mx) * focus.xspan;
          var nxl = xm - zoomRate * (xm - focus.xl),
            nxr = xm + zoomRate * (focus.xr - xm),
            nxspan = nxr - nxl;
          if(nxspan >= level.minSpanX && nxspan <= level.maxScaleX) {
            focus.xl = nxl;
            focus.xr = nxr;
            focus.xspan = nxspan;
          } else {
            if(nxspan > level.maxScaleX) {
              focus.xr = focus.xl + level.maxScaleX;
            } else if(nxspan < level.minSpanX) {
              focus.xr = focus.xl + level.minSpanX;
            }
            focus.xspan = focus.xr - focus.xl;
          }
        }
        self.emitZoomLevelChange();
      }
      self.calcMapping(true);
      self.renderCursor({
        offsetX: mx,
        offsetY: my
      });
      self.fixFocus(self.focus);
      self.update();
    } else if (self.interactMode === 'locate') {
      self.zoomBoxZooming();
    }
  };

  PlotScope.prototype.zoomEnd = function() {
    var self = this;

    if (self.interactMode === "locate") {

      // trigger 'show' for save-as context menu
      if (_.isMatch(self.mousep1, self.mousep2)
          && self.saveAsMenuContainer
          && self.saveAsMenuContainer.contextMenu) {

        var mousePosition = d3.mouse(document.body);
        self.saveAsMenuContainer.contextMenu({x: mousePosition[0], y: mousePosition[1]});

      // draw rectangle for zoom-area and update chart
      } else {
        self.locateFocus();
        self.locateBox = null;
        self.update();
        self.interactMode = "zoom";
      }

      self.enableZoomWheel();
    }

    self.jqsvg.css("cursor", "auto");
  };

  PlotScope.prototype.fixFocus = function(focus) {
    focus.xl = focus.xl < 0 ? 0 : focus.xl;
    focus.xr = focus.xr > 1 ? 1 : focus.xr;
    focus.yl = focus.yl < 0 ? 0 : focus.yl;
    focus.yr = focus.yr > 1 ? 1 : focus.yr;
    focus.yl_r = focus.yl_r < 0 ? 0 : focus.yl_r;
    focus.yr_r = focus.yr_r > 1 ? 1 : focus.yr_r;
    focus.xspan = focus.xr - focus.xl;
    focus.yspan = focus.yr - focus.yl;
    focus.yspan_r = focus.yr_r - focus.yl_r;

    if (focus.xl > focus.xr || focus.yl > focus.yr || focus.yl_r > focus.yr_r) {
      console.error("visible range specified does not match data range, " +
                    "enforcing visible range");
      _.extend(focus, this.defaultFocus);
    }
  };

  PlotScope.prototype.resetFocus = function() {
    var self = this;
    var svgNode = self.svg.node(),
      mx = d3.mouse(svgNode)[0],
      my = d3.mouse(svgNode)[1];

    var t = d3.zoomIdentity.translate(0, 0).scale(1);
    self.svg.call(self.zoomObj.transform, t);

    var lMargin = self.layout.leftLayoutMargin,
      bMargin = self.layout.bottomLayoutMargin;
    var W = plotUtils.safeWidth(self.jqsvg),
      H = plotUtils.safeHeight(self.jqsvg);
    if (mx < lMargin && my < H - bMargin) {
      _.extend(self.focus, _.pick(self.defaultFocus, "yl", "yr", "yspan", "yl_r", "yr_r", "yspan_r"));
    } else if (my > H - bMargin && mx > lMargin) {
      _.extend(self.focus, _.pick(self.defaultFocus, "xl", "xr", "xspan"));
    } else {
      _.extend(self.focus, self.defaultFocus);
    }

    self.fixFocus(self.focus);
    self.calcMapping(true);
    self.emitZoomLevelChange();
    self.update();
  };

  PlotScope.prototype.locateFocus = function() {
    var self = this;
    var box = self.locateBox;
    if (box == null) {
      return;
    }
    var p1 = {
      "x" : self.scr2dataXp(box.x),
      "y" : self.scr2dataYp(box.y)
    };
    var p2 = {
      "x" : self.scr2dataXp(box.x + box.w),
      "y" : self.scr2dataYp(box.y + box.h)
    };
    p1.x = Math.max(0, p1.x);
    p1.y = Math.max(0, p1.y);
    p2.x = Math.min(1, p2.x);
    p2.y = Math.min(1, p2.y);

    var focus = self.focus, ofocus = {};
    _.extend(ofocus, self.focus);
    focus.xl = ofocus.xl + ofocus.xspan * p1.x;
    focus.xr = ofocus.xl + ofocus.xspan * p2.x;
    focus.yl = ofocus.yl + ofocus.yspan * p2.y;
    focus.yr = ofocus.yl + ofocus.yspan * p1.y;
    focus.yl_r = ofocus.yl_r + ofocus.yspan_r * p2.y;
    focus.yr_r = ofocus.yl_r + ofocus.yspan_r * p1.y;
    focus.xspan = focus.xr - focus.xl;
    focus.yspan = focus.yr - focus.yl;
    focus.yspan_r = focus.yr_r - focus.yl_r;


    // Calculate zoom level
    var W = plotUtils.safeWidth(self.jqsvg);
    var H = plotUtils.safeHeight(self.jqsvg);
    var zoomLevel = (self.lastTransK || 1) + ((W / box.w + H / box.h) / 2); // Calculate average zoom level
    var transform = d3.zoomIdentity.scale(zoomLevel);

    self.lastTransK = zoomLevel;
    self.svg.call(self.zoomObj.transform, transform);

    self.calcMapping(true);
    self.emitZoomLevelChange();
  };

  PlotScope.prototype.resetSvg = function() {
    var self = this;
    self.jqcontainer.find(".plot-constlabel").remove();

    self.rpipeGridlines = [];
    self.rpipeTexts = [];
    self.rpipeTicks = [];
  };

  PlotScope.prototype.initZoom = function() {
    var self = this;
    self.zoomObj
      .on("start", function(d) {
        return self.zoomStart(d);
      })
      .on("zoom", function(d) {
        return self.zooming(d);
      })
      .on("end", function(d) {
        return self.zoomEnd(d);
      });

    self.svg.on("dblclick", function() {
      return self.resetFocus();
    });

    // enable zoom events for mouse right click
    var filterFn = function() {
      return true;
    };
    self.zoomObj.filter(filterFn);

    self.svg.call(self.zoomObj);

    // disbale zoom events on double click
    self.svg.on("dblclick.zoom", null);
  };

  PlotScope.prototype.enableZoomWheel = function() {
    var self = this;
    if (self._defaultZoomWheelFn) {
      self.svg.on('wheel.zoom', self._defaultZoomWheelFn);
    }
  };

  PlotScope.prototype.disableZoomWheel = function() {
    var self = this;
    self.svg.on('wheel.zoom', null);
  };

  PlotScope.prototype.mouseleaveClear = function() {
    var self = this;
    self.svg.selectAll(".plot-cursor").remove();
    self.jqcontainer.find(".plot-cursorlabel").remove();
  };

  PlotScope.prototype.calcMapping = function(emitFocusUpdate) {
    var self = this;
    // called every time after the focus is changed
    var focus = self.focus;
    var lMargin = self.layout.leftLayoutMargin,
      bMargin = self.layout.bottomLayoutMargin,
      tMargin = self.layout.topLayoutMargin,
      rMargin = self.layout.rightLayoutMargin;
    var model = self.stdmodel;
    var W = plotUtils.safeWidth(self.jqsvg), H = plotUtils.safeHeight(self.jqsvg);
    if (emitFocusUpdate == true && self.model.updateFocus != null) {
      self.model.updateFocus({
        "xl" : focus.xl,
        "xr" : focus.xr
      });
    }
    self.data2scrY =
      d3.scaleLinear().domain([focus.yl, focus.yr]).range([H - bMargin, tMargin]);
    self.data2scrYp =
      d3.scaleLinear().domain([focus.yl, focus.yr]).range([1, 0]);
    self.scr2dataY =
      d3.scaleLinear().domain([tMargin, H - bMargin]).range([focus.yr, focus.yl]);
    self.scr2dataYp =
      d3.scaleLinear().domain([tMargin, H - bMargin]).range([1, 0]);
    self.data2scrX =
      d3.scaleLinear().domain([focus.xl, focus.xr]).range([lMargin, W - rMargin]);
    self.data2scrXp =
      d3.scaleLinear().domain([focus.xl, focus.xr]).range([0, 1]);
    self.scr2dataX =
      d3.scaleLinear().domain([lMargin, W-rMargin]).range([focus.xl, focus.xr]);
    self.scr2dataXp =
      d3.scaleLinear().domain([lMargin, W-rMargin]).range([0, 1]);

    if (focus.yr_r !== undefined && focus.yl_r !== undefined) {
      self.data2scrY_r =
        d3.scaleLinear().domain([focus.yl_r, focus.yr_r]).range([H - bMargin, tMargin]);
      self.data2scrYp_r =
        d3.scaleLinear().domain([focus.yl_r, focus.yr_r]).range([1, 0]);
      self.scr2dataY_r =
        d3.scaleLinear().domain([tMargin, H - bMargin]).range([focus.yr_r, focus.yl_r]);
      self.scr2dataYp_r =
        d3.scaleLinear().domain([tMargin, H - bMargin]).range([1, 0]);
    }

    self.data2scrXi = function(val) {
      return Number(self.data2scrX(val).toFixed(self.renderFixed));
    };
    self.data2scrYi = function(val) {
      return Number(self.data2scrY(val).toFixed(self.renderFixed));
    };
    if (self.data2scrY_r !== undefined) {
      self.data2scrYi_r = function(val) {
        return Number(self.data2scrY_r(val).toFixed(self.renderFixed));
      };
    }
  };

  PlotScope.prototype.standardizeData = function() {
    var model = this.model.getCellModel();
    this.stdmodel = plotFormatter.standardizeModel(model, this.prefs);
  };

  PlotScope.prototype.dumpState = function() {
    // var self = this;
    // var state = {};
    //
    // state.showAllItems = self.showAllItems;
    // state.plotSize = self.plotSize;
    // state.zoomed = self.zoomed;
    // state.focus = self.focus;
    //
    // state.lodOn = [];
    // state.lodType = [];
    // state.lodAuto = [];
    // state.zoomHash = [];
    // state.showItem = [];
    // var data = self.stdmodel.data;
    // for (var i = 0; i < data.length; i++) {
    //   state.lodOn[i] = data[i].lodOn;
    //   state.lodType[i] = data[i].lodType;
    //   state.lodAuto[i] = data[i].lodAuto;
    //   state.zoomHash[i] = data[i].zoomHash;
    //   state.showItem[i] = data[i].showItem;
    // }
    // state.visibleItem = self.visibleItem;
    // state.legendableItem = self.legendableItem;
    // state.defaultFocus = self.defaultFocus;
    //
    //
    // state.tips = {};
    // $.extend(true, state.tips, self.tips);
    //
    // return state;
  };

  PlotScope.prototype.loadState = function(state) {
    // var self = this;
    // self.showAllItems = state.showAllItems;
    // self.plotSize = state.plotSize;
    // self.zoomed = state.zoomed;
    // self.focus = state.focus;
    // var data = self.stdmodel.data;
    // for (var i = 0; i < data.length; i++) {
    //   if(data[i].isLodItem === true){
    //     data[i].lodOn = state.lodOn[i];
    //     if (state.lodOn[i]) {
    //       data[i].applyLodType(state.lodType[i]);
    //       data[i].applyLodAuto(state.lodAuto[i]);
    //       data[i].applyZoomHash(state.zoomHash[i]);
    //     }
    //   }
    //   data[i].showItem = state.showItem[i];
    // }
    // self.visibleItem = state.visibleItem;
    // self.legendableItem = state.legendableItem;
    // self.defaultFocus = state.defaultFocus;
    // if(self.defaultFocus) {
    //   self.fixFocus(self.defaultFocus);
    // }
    //
    // $.extend(true, self.tips, state.tips);
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
    self.focus = {};

    if (!self.model.getCellModel().tips) {
      self.model.getCellModel().tips = {};
    }

    self.tips = self.model.getCellModel().tips;
    self.plotSize = {};

    _.extend(self.plotSize, self.stdmodel.plotSize);
    // var savedstate = self.model.getDumpState();
    // if (self.doNotLoadState !== true && savedstate !== undefined && savedstate.plotSize !== undefined) {
    //   self.loadState(savedstate);
    // } else {
    //   if (self.setDumpState !== undefined) {
    //     self.setDumpState(self.dumpState());
    //   }
    // }
    // self.doNotLoadState = false;

    // create layout elements
    self.initLayout();

    if (!self.model.disableContextMenu) {
      self.saveAsMenuContainer = $('div#'+self.wrapperId+' #' + self.id);
      // init context menu for 'save as...'
      $.contextMenu({
        selector: 'div#'+self.wrapperId+' #' + self.id,
        zIndex: 3,
        items: plotUtils.getSavePlotAsContextMenuItems(self),
        trigger: 'none'
      });
    } else if (self.model && self.model.getSaveAsMenuContainer) {
      self.saveAsMenuContainer = self.model.getSaveAsMenuContainer();
    }

    var plotContainer = self.element.find('.plot-plotcontainer');
    plotContainer.resizable({
      maxWidth: self.element.width(), // no wider than the width of the cell
      minWidth: 450,
      minHeight: 150,
      handles: "e, s, se",
      resize : function(event, ui) {
        self.width = ui.size.width;
        self.height = ui.size.height;
        _.extend(self.plotSize, ui.size);
        // if (self.setDumpState !== undefined) {
        //   self.setDumpState(self.dumpState());
        // }

        self.jqsvg.css({"width": self.width, "height": self.height});
        self.jqplottitle.css({"width": self.width });
        self.numIntervals = {
          x: self.width / self.intervalStepHint.x,
          y: self.height / self.intervalStepHint.y
        };
        self.calcRange();
        self.calcMapping(false);
        self.emitSizeChange();
        self.legendDone = false;
        self.legendResetPosition = true;

        self.update();
      }
    });

    self.resizeFunction = function() {
      // update resize maxWidth when the browser window resizes
      var width = self.element.width();
      self.jqcontainer.resizable({
        maxWidth : width
      });
    };

    self.resetSvg();
    self.zoomObj = d3.zoom();

    // set zoom object
    self.svg
      .on("mousedown", function() {
        return self.mouseDown();
      })
      //   .on("mouseup", function() {
      //   return self.mouseUp();
      // })
      .on("mouseleave", function() {
        return self.disableZoomWheel();
      });
    self.jqsvg.mousemove(function(e) {
      return self.renderCursor(e);
    }).mouseleave(function(e) {
      return self.mouseleaveClear(e);
    });
    self.initZoom();
    self._defaultZoomWheelFn = self.svg.on('wheel.zoom');
    self.disableZoomWheel();

    self.calcRange();


    // init copies focus to defaultFocus, called only once
    if(_.isEmpty(self.focus)){
      _.extend(self.focus, self.defaultFocus);
    }

    // init remove pipe
    self.removePipe = [];

    self.calcMapping();

    self.legendDone = false;
    self.update();

    self.fillCellModelWithPlotMethods();
  };

  PlotScope.prototype.updatePlot = function() {
    var self = this;

    // first standardize data
    self.standardizeData();
    // init flags
    self.initFlags();

    // see if previous state can be applied
    self.focus = {};

    if (!self.model.getCellModel().tips) {
      self.model.getCellModel().tips = {};
    }

    self.tips = self.model.getCellModel().tips;
    self.plotSize = {};

    _.extend(self.plotSize, self.stdmodel.plotSize);

    // create layout elements
    self.initLayout();

    self.resetSvg();

    self.calcRange();


    // init copies focus to defaultFocus, called only once
    if(_.isEmpty(self.focus)){
      _.extend(self.focus, self.defaultFocus);
    }

    // init remove pipe
    self.removePipe = [];

    self.calcMapping();

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
    self.calcGridlines();
    self.renderGridlines();
    plotUtils.plotGridlines(self);

    self.renderData();
    self.renderGridlineLabels();
    self.renderGridlineTicks();
    self.renderCoverBox(); // redraw
    plotUtils.plotLabels(self); // redraw
    plotUtils.plotTicks(self); // redraw

    plotTip.renderTips(self);
    self.renderLocateBox(); // redraw
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

  // self.$watch('getTheme()', function(newValue, oldValue) {
  //   if(newValue !== oldValue) {
  //     if (self.model.setDumpState !== undefined) {
  //       self.model.setDumpState(self.dumpState());
  //     }
  //     self.legendDone = false;
  //     self.init();
  //   }
  // });

  // todo handle destroy
  PlotScope.prototype.destroy = function() {
    $(window).off('resize',this.resizeFunction);
    this.svg.selectAll("*").remove();
    this.jqlegendcontainer.find("#plotLegend").remove();
    this.removeOnKeyListeners();
    $.contextMenu('destroy', { selector: '#' + self.id});
  };

  PlotScope.prototype.getSvgToSave = function() {
    var self = this;
    var svg = self.svg
      .node()
      .cloneNode(true);
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('class', 'svg-export');

    var plotTitle = self.jqplottitle;
    var titleOuterHeight = plotUtils.getActualCss(plotTitle, 'outerHeight', true);

    //legend
    self.adjustSvgPositionWithLegend(svg, titleOuterHeight);
    self.appendLegendToSvg(d3.select(svg));
    ///////

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

    return svg;
  };

  PlotScope.prototype.saveAsSvg = function() {
    var self = this;
    var html = plotUtils.convertToXHTML(self.getSvgToSave().outerHTML);
    var fileName = _.isEmpty(self.stdmodel.title) ? 'plot' : self.stdmodel.title;
    plotUtils.download('data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(html))), fileName + ".svg");
  };

  PlotScope.prototype.saveAsPng = function() {
    var self = this;
    var svg = self.getSvgToSave();

    self.canvas.width = svg.getAttribute("width");
    self.canvas.height = svg.getAttribute("height");

    var imgsrc = 'data:image/svg+xml;base64,' +
                 btoa(unescape(encodeURIComponent(plotUtils.convertToXHTML(svg.outerHTML))));
    var fileName = _.isEmpty(self.stdmodel.title) ? 'plot' : self.stdmodel.title;
    plotUtils.drawPng(self.canvas, imgsrc, fileName + ".png");
  };

  PlotScope.prototype.adjustSvgPositionWithLegend = function(svg, titleOuterHeight) {
    var self = this;
    var isHorizontal = self.stdmodel.legendLayout === "HORIZONTAL";
    var margin = self.layout.legendMargin;
    var legendContainer = self.jqlegendcontainer.find("#plotLegend");
    var containerLeftMargin = parseFloat(self.jqcontainer.css("margin-left"));


    var W = plotUtils.outerWidth(self.jqcontainer) + containerLeftMargin + 1;//add 1 because jQuery round size
    var H = plotUtils.outerHeight(self.jqcontainer) + titleOuterHeight + 1;
    var legendW = plotUtils.getActualCss(legendContainer, 'outerWidth', true);
    var legendH = plotUtils.getActualCss(legendContainer, 'outerHeight', true);
    var legendPosition = self.stdmodel.legendPosition;

    if (!legendPosition.position) {
      if (legendPosition.x + legendW > W) {
        W += legendPosition.x + legendW - W;
      }
      if ((legendPosition.y + legendH) > H) {
        H += legendPosition.y + legendH - H;
      }
    }

    if (legendPosition.position === "LEFT") {
      plotUtils.translateChildren(svg, legendW + margin, 0);
      W += legendW + margin;
    }
    if (legendPosition.position === "RIGHT") {
      W += legendW + margin;
    }
    if (legendPosition.position === "BOTTOM") {
      H += legendH + margin;
    }
    if (legendPosition.position === "TOP") {
      plotUtils.translateChildren(svg, 0, legendH + margin);
      H += legendH + margin;
    }
    if (isHorizontal) {
      if (["TOP_LEFT", "TOP_RIGHT"].indexOf(legendPosition.position) !== -1) {
        plotUtils.translateChildren(svg, 0, legendH + margin);
        H += legendH + margin;
      }
      if (["BOTTOM_LEFT", "BOTTOM_RIGHT"].indexOf(legendPosition.position) !== -1) {
        H += legendH + margin;
      }
      if (legendPosition.position !== "LEFT") {
        plotUtils.translateChildren(svg, containerLeftMargin, 0);
      }
    } else {
      if (["TOP_LEFT", "BOTTOM_LEFT"].indexOf(legendPosition.position) !== -1) {
        plotUtils.translateChildren(svg, legendW + margin, 0);
        W += legendW + margin;
      }
      if (["TOP_RIGHT", "BOTTOM_RIGHT"].indexOf(legendPosition.position) !== -1) {
        W += legendW + margin;
      }
      if (["LEFT", "TOP_LEFT", "BOTTOM_LEFT"].indexOf(legendPosition.position) < 0) {
        plotUtils.translateChildren(svg, containerLeftMargin, 0);
      }
    }
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
      .attr("xmlns", "http://www.w3.org/1999/xhtml")
      .html(legendCopy[0].outerHTML);
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
               '<defs> <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%"> <stop offset="0.0%" stop-color="#2c7bb6"></stop> <stop offset="12.5%" stop-color="#00a6ca"></stop> <stop offset="25.0%" stop-color="#00ccbc"></stop> <stop offset="37.5%" stop-color="#90eb9d"></stop> <stop offset="50.0%" stop-color="#ffff8c"></stop> <stop offset="62.5%" stop-color="#f9d057"></stop> <stop offset="75.0%" stop-color="#f29e2e"></stop> <stop offset="87.5%" stop-color="#e76818"></stop> <stop offset="100.0%" stop-color="#d7191c"></stop> </linearGradient> <marker id="Triangle" class="text-line-style" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="6" markerHeight="6" orient="auto"> <path d="M 0 0 L 10 5 L 0 10 z"></path> </marker> <filter id="svgfilter"> <feGaussianBlur result="blurOut" in="SourceGraphic" stdDeviation="1"></feGaussianBlur> <feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend> </filter> <filter id="svgAreaFilter"> <feMorphology operator="dilate" result="blurOut" in="SourceGraphic" radius="2"></feMorphology> <feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend> </filter> </defs>' +
               '<g id="gridg"></g>'+
               '<g id="maing"></g>'+
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
    model.saveAsPng = function () {
      return self.saveAsPng();
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
    var result = 80;
    if (axis && axis.axisType === 'linear') {
      var l = axis.axisValL.toFixed(axis.axisFixed) + '';
      var r = axis.axisValL.toFixed(axis.axisFixed) + '';

      var m = l.length > r.length ? l : r;
      var size = measureText(m, 13, pStyle);
      result = size.width + size.height * 2;
    }
    return result > 80 ? result : 80;
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
      stroke_opacity: dat.stroke_opacity
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

  // --------

  return PlotScope;

});