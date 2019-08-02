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
  './../std/plotbar',
  './../plotSampler',
  './../lod/plotLodBox',
  './../auxes/plotAuxBox'
], function(
  _,
  PlotBar,
  PlotSampler,
  PlotLodBox,
  PlotAuxBox
) {
  const PlotUtils = require("../utils/PlotUtils").default;
  const PlotColorUtils = require("../utils/PlotColorUtils").default;
  const CommonUtils = require("beakerx_shared/lib/utils/CommonUtils").default;

  var PlotBarLodLoader = function(data, lodthresh){
    this.datacopy = {};
    _.extend(this.datacopy, data);  // save for later use
    _.extend(this, data); // copy properties to itself
    this.lodthresh = lodthresh;
    this.format(lodthresh);
  };
  // class constants
  PlotBarLodLoader.prototype.lodTypes = ["box"];
  PlotBarLodLoader.prototype.lodSteps = [10];

  PlotBarLodLoader.prototype.format = function() {
    // create plot type index
    this.lodTypeIndex =  (this.datacopy.lod_filter) ? this.lodTypes.indexOf(this.datacopy.lod_filter) : 0;
    this.lodType = this.lodTypes[this.lodTypeIndex]; // line, box

    // create the plotters
    this.zoomHash = CommonUtils.randomString(3);
    this.plotter = new PlotBar(this.datacopy);
    this.createLodPlotter();

    // a few switches and constants
    this.isLodItem = true;
    this.lodOn = false;
    this.lodAuto = true;
    this.sampleStep = -1;
    if (this.color != null) {
      this.tip_color = PlotColorUtils.createColor(this.color, this.color_opacity);
    } else {
      this.tip_color = "gray";
    }

    this.itemProps = {
      "id" : this.id,
      "st" : this.color,
      "st_op" : this.color_opacity,
      "st_w" : this.width,
      "st_da" : this.stroke_dasharray,
      "d" : ""
    };
    this.elementProps = [];
  };

  PlotBarLodLoader.prototype.zoomLevelChanged = function(scope) {
    this.sampleStep = -1;
    this.zoomHash = CommonUtils.randomString(3);
    if (this.lodOn === false) { return; }
    if (this.lodType === "bar") {
      this.lodplotter.setZoomHash(this.zoomHash);
      this.lodplotter.hideTips(scope);
    } else if (this.lodType === "box") {
      this.lodplotter.setZoomHash(this.zoomHash);
      this.lodplotter2.setZoomHash(this.zoomHash);
      this.lodplotter.hideTips(scope);
      this.lodplotter2.hideTips(scope);
    }
  };

  PlotBarLodLoader.prototype.applyZoomHash = function(hash) {
    this.zoomHash = hash;
    if (this.lodType === "bar") {
      this.lodplotter.setZoomHash(hash);
    } else if (this.lodType === "box") {
      this.lodplotter.setZoomHash(hash);
      this.lodplotter2.setZoomHash(hash);
    }
  };

  PlotBarLodLoader.prototype.switchLodType = function(scope) {
    this.clear(scope);  // must clear first before changing lodType
    this.lodTypeIndex = (this.lodTypeIndex + 1) % this.lodTypes.length;
    this.lodType = this.lodTypes[this.lodTypeIndex];
    this.createLodPlotter();
  };

  PlotBarLodLoader.prototype.applyLodType = function(type) {
    this.lodTypeIndex = this.lodTypes.indexOf(type);  // maybe -1
    if (this.lodTypeIndex === -1) {
      this.lodTypeIndex = 0;
    }
    this.lodType = this.lodTypes[this.lodTypeIndex];
    this.createLodPlotter();
  };

  PlotBarLodLoader.prototype.createLodPlotter = function() {
    var data = {};
    _.extend(data, this.datacopy);
    if (this.lodType === "bar") {
      this.lodplotter = new PlotLodBox(data);
      this.lodplotter.setWidthShrink(1);
      this.lodplotter.setZoomHash(this.zoomHash);
    } else if (this.lodType === "box") {
      // lod boxes are plotted with special coloring (inversed color)
      // user can set outline for bar
      data.stroke_opacity = 1.0;
      data.color_opacity *= .25;  // set box to be transparent
      this.lodplotter = new PlotLodBox(data);
      this.lodplotter2 = new PlotLodBox(data);
      this.lodplotter.setWidthShrink(1);
      this.lodplotter2.setWidthShrink(1);
      this.lodplotter.setZoomHash(this.zoomHash);
      this.lodplotter2.setZoomHash(this.zoomHash);

      _.extend(data, this.datacopy); // normal color for aux box
      this.auxplotter = new PlotAuxBox(data);
      this.auxplotter.setWidthShrink(1);  // reduce box width by 1px (left and right)
    }
  };

  PlotBarLodLoader.prototype.toggleLodAuto = function(scope) {
    this.lodAuto = !this.lodAuto;
    this.clear(scope);
  };

  PlotBarLodLoader.prototype.applyLodAuto = function(auto) {
    this.lodAuto = auto;
  };

  PlotBarLodLoader.prototype.toggleLod = function(scope) {
    if (this.lodType === "off") {
      this.lodType = this.lodTypes[this.lodTypeIndex];
    } else {
      this.lodType = "off";
    }
    this.clear(scope);
  };

  PlotBarLodLoader.prototype.render = function(scope){
    if (this.showItem === false) {
      this.clear(scope);
      return;
    }

    this.filter(scope);

    var lod = false;
    if (this.lodType !== "off") {
      if ( (this.lodAuto === true && this.vlength > this.lodthresh) || this.lodAuto === false) {
        lod = true;
      }
    }

    if (this.lodOn != lod) {
      scope.legendDone = false;
      this.clear(scope);
    }
    this.lodOn = lod;

    if (this.lodOn === true) {
      this.sample(scope);
      if (this.lodType === "bar") {
        this.lodplotter.render(scope, this.elementSamples);
      } else if (this.lodType === "box") {
        this.auxplotter.render(scope, this.elementAuxes, "a");
        this.lodplotter.render(scope, this.elementSamples, "yBtm");
        this.lodplotter2.render(scope, this.elementSamples2, "yTop");
      }
    } else {
      this.plotter.render(scope);
    }
  };

  PlotBarLodLoader.prototype.setHighlighted = function(scope, highlighted) {
    if (this.lodOn === true) {
      if (this.lodType === "bar") {
        this.lodplotter.setHighlighted(scope, highlighted);
      } else if (this.lodType === "box") {
        this.auxplotter.setHighlighted(scope, highlighted, "a");
        this.lodplotter.setHighlighted(scope, highlighted, "yBtm");
        this.lodplotter2.setHighlighted(scope, highlighted, "yTop");
      }
    } else {
      this.plotter.setHighlighted(scope, highlighted);
    }
  };

  PlotBarLodLoader.prototype.getRange = function(){
    return this.plotter.getRange();
  };

  PlotBarLodLoader.prototype.applyAxis = function(xAxis, yAxis) {
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    this.plotter.applyAxis(xAxis, yAxis);
    // sampler is created AFTER coordinate axis remapping
    this.createSampler();
  };

  PlotBarLodLoader.prototype.createSampler = function() {
    var xs = [], ys = [], y2s = [], _ys = [], _y2s = [];
    for (var i = 0; i < this.elements.length; i++) {
      var ele = this.elements[i];
      xs.push( (ele.x + ele.x2) / 2 );
      ys.push(ele.y);
      y2s.push(ele.y2);
      _ys.push(ele._y);
      _y2s.push(ele._y2);
    }
    this.sampler = new PlotSampler(xs, ys, _ys);
    this.sampler2 = new PlotSampler(xs, y2s, _y2s);
  };

  PlotBarLodLoader.prototype.filter = function(scope) {
    this.plotter.filter(scope);
    this.vindexL = this.plotter.vindexL;
    this.vindexR = this.plotter.vindexR;
    this.vlength = this.plotter.vlength;
  };

  PlotBarLodLoader.prototype.sample = function(scope) {
    var xAxis = this.xAxis,
      yAxis = this.yAxis;
    var xl = scope.plotFocus.focus.xl, xr = scope.plotFocus.focus.xr;

    if (this.sampleStep === -1) {
      var pixelWidth = scope.layout.plotSize.width;
      var count = Math.ceil(pixelWidth / this.lodSteps[this.lodTypeIndex]);
      var s = (xr - xl) / count;
      this.sampleStep = s;
    }

    var step = this.sampleStep;
    xl = Math.floor(xl / step) * step;
    xr = Math.ceil(xr / step) * step;

    this.elementSamples = this.sampler.sample(xl, xr, this.sampleStep);
    this.elementSamples2 = this.sampler2.sample(xl, xr, this.sampleStep);
    var count = this.elementSamples.length;

    if (this.lodType === "bar") {
      var elements = [];
      for (var i = 0; i < count; i++) {
        elements.push({
          x : this.elementSamples[i].xl,
          x2 : this.elementSamples[i].xr,
          min : this.elementSamples[i].avg,
          max : this.elementSamples2[i].avg,
          hash: this.elementSamples[i].hash,
          xl : this.elementSamples[i].xl,
          xr : this.elementSamples[i].xr
        });
      }
      this.elementSamples = elements;
    } else if (this.lodType === "box") {
      this.elementAuxes = [];
      // prepare the aux box in between
      for (var i = 0; i < count; i++) {
        this.elementAuxes.push({
          x : this.elementSamples[i].xl,
          x2 : this.elementSamples[i].xr,
          y : this.elementSamples[i].max,
          y2 : this.elementSamples2[i].min
        });
      }
    }
  };

  PlotBarLodLoader.prototype.clear = function(scope) {
    scope.maing.select("#" + this.id).selectAll("*").remove();
    this.hideTips(scope);
  };

  PlotBarLodLoader.prototype.hideTips = function(scope, hidden) {
    if (this.lodOn === false) {
      this.plotter.hideTips(scope, hidden);
      return;
    }
    if (this.lodType === "bar") {
      this.lodplotter.hideTips(scope, hidden);
    } else if (this.lodType === "box") {
      this.lodplotter.hideTips(scope, hidden);
      this.lodplotter2.hideTips(scope, hidden);
    }
  };

  PlotBarLodLoader.prototype.createTip = function(ele, g, model) {
    if (this.lodOn === false) {
      return this.plotter.createTip(ele, g, model);
    }
    var xAxis = this.xAxis,
      yAxis = this.yAxis;
    var tip = {};
    var sub = "sample" + (g !== "" ? (" " + g) : "");
    if (this.legend != null) {
      tip.title = this.legend + " (" + sub + ")";
    }
    tip.xl = PlotUtils.getTipStringPercent(ele.xl, xAxis, 6);
    tip.xr = PlotUtils.getTipStringPercent(ele.xr, xAxis, 6);
    if (this.lodType === "bar") {
      tip.avg_yTop = PlotUtils.getTipStringPercent(ele.max, yAxis, 6);
      tip.avg_yBtm = PlotUtils.getTipStringPercent(ele.min, yAxis, 6);
    } else if (this.lodType === "box") {
      if (ele.count > 1) {
        tip.max = PlotUtils.getTipString(ele._max, yAxis, true);
        tip.min = PlotUtils.getTipString(ele._min, yAxis, true);
        tip.avg = PlotUtils.getTipStringPercent(ele.avg, yAxis, 6);
        tip.count = PlotUtils.getTipString(ele.count, yAxis, true);
      } else {
        tip.y = PlotUtils.getTipString(ele._max, yAxis, true);
      }
    }
    return PlotUtils.createTipString(tip);
  };

  return PlotBarLodLoader;

});
