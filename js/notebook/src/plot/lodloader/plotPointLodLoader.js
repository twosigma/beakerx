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
  './../std/plotpoint',
  './../plotSampler',
  './../lod/plotLodPoint',
  './../lod/plotLodBox'
], function(
  _,
  PlotPoint,
  PlotSampler,
  PlotLodPoint,
  PlotLodBox
) {
  const PlotUtils = require("../utils/PlotUtils").default;
  const PlotColorUtils = require("../utils/PlotColorUtils").default;
  const CommonUtils = require("beakerx_shared/lib/utils/CommonUtils").default;

  var PlotPointLodLoader = function(data, lodthresh){
    this.datacopy = {};
    _.extend(this.datacopy, data);  // save for later use
    _.extend(this, data); // copy properties to itself
    this.lodthresh = lodthresh;
    this.format(lodthresh);
  };
  // class constants
  PlotPointLodLoader.prototype.lodTypes = ["box"];
  PlotPointLodLoader.prototype.lodSteps = [10];

  PlotPointLodLoader.prototype.format = function() {
    // create plot type index
    this.lodTypeIndex =  (this.datacopy.lod_filter) ? this.lodTypes.indexOf(this.datacopy.lod_filter) : 0;
    this.lodType = this.lodTypes[this.lodTypeIndex]; // line, box

    // create the plotters
    this.zoomHash = CommonUtils.randomString(3);
    this.plotter = new PlotPoint(this.datacopy);
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

  PlotPointLodLoader.prototype.zoomLevelChanged = function(scope) {
    this.sampleStep = -1;
    this.zoomHash = CommonUtils.randomString(3);
    if (this.lodOn === false) { return; }
    this.lodplotter.setZoomHash(this.zoomHash);
    this.lodplotter.hideTips(scope);
  };

  PlotPointLodLoader.prototype.applyZoomHash = function(hash) {
    this.zoomHash = hash;
    this.lodplotter.setZoomHash(hash);
  };

  PlotPointLodLoader.prototype.createLodPlotter = function() {
    var data = {};
    _.extend(data, this.datacopy);
    if (this.lodType === "point") {
      this.lodplotter = new PlotLodPoint(data);
      this.lodplotter.setZoomHash(this.zoomHash);
    } else if (this.lodType === "box") {
      // user can set outline for point
      data.color_opacity *= .25;
      data.stroke_opacity = 1.0;
      this.lodplotter = new PlotLodBox(data);
      this.lodplotter.setWidthShrink(1);
      this.lodplotter.setZoomHash(this.zoomHash);
    }
  };

  PlotPointLodLoader.prototype.toggleLodAuto = function(scope) {
    this.lodAuto = !this.lodAuto;
    this.clear(scope);
  };

  PlotPointLodLoader.prototype.applyLodAuto = function(auto) {
    this.lodAuto = auto;
  };

  PlotPointLodLoader.prototype.toggleLod = function(scope) {
    if (this.lodType === "off") {
      this.lodType = this.lodTypes[this.lodTypeIndex];
    } else {
      this.lodType = "off";
    }
    this.clear(scope);
  };

  PlotPointLodLoader.prototype.render = function(scope){
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
      if (this.lodType === "point") {
        // lod point plotter needs size information
        this.lodplotter.render(scope, this.elementSamples, this.sizeSamples);
      } else if (this.lodType === "box") {
        this.lodplotter.render(scope, this.elementSamples);
      }
    } else {
      this.plotter.render(scope);
    }
  };

  PlotPointLodLoader.prototype.setHighlighted = function(scope, highlighted) {
    if (this.lodOn === true) {
      this.lodplotter.setHighlighted(scope, highlighted);
    } else {
      this.plotter.setHighlighted(scope, highlighted);
    }
  };

  PlotPointLodLoader.prototype.getRange = function(){
    return this.plotter.getRange();
  };

  PlotPointLodLoader.prototype.applyAxis = function(xAxis, yAxis) {
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    this.plotter.applyAxis(xAxis, yAxis);
    // sampler is created AFTER coordinate axis remapping
    this.createSampler();
  };

  PlotPointLodLoader.prototype.switchLodType = function(scope) {
    this.clear(scope);  // must clear first before changing lodType
    this.lodTypeIndex = (this.lodTypeIndex + 1) % this.lodTypes.length;
    this.lodType = this.lodTypes[this.lodTypeIndex];
    this.createLodPlotter();
  };

  PlotPointLodLoader.prototype.applyLodType = function(type) {
    this.lodTypeIndex = this.lodTypes.indexOf(type);  // maybe -1
    if (this.lodTypeIndex === -1) {
      this.lodTypeIndex = 0;
    }
    this.lodType = this.lodTypes[this.lodTypeIndex];
    this.createLodPlotter();
  };

  PlotPointLodLoader.prototype.createSampler = function() {
    var xs = [], ys = [], ss = [], _ys = [];
    for (var i = 0; i < this.elements.length; i++) {
      var ele = this.elements[i];
      xs.push(ele.x);
      ys.push(ele.y);
      _ys.push(ele._y);
      ss.push(ele.size != null ? ele.size : this.size);
    }
    this.sampler = new PlotSampler(xs, ys, _ys);
    this.samplerSize = new PlotSampler(xs, ss, ss);
  };

  PlotPointLodLoader.prototype.filter = function(scope) {
    this.plotter.filter(scope);
    this.vindexL = this.plotter.vindexL;
    this.vindexR = this.plotter.vindexR;
    this.vlength = this.plotter.vlength;
  };

  PlotPointLodLoader.prototype.sample = function(scope) {
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
    this.sizeSamples = this.samplerSize.sample(xl, xr, this.sampleStep);
  };

  PlotPointLodLoader.prototype.clear = function(scope) {
    scope.maing.select("#" + this.id).selectAll("*").remove();
    this.hideTips(scope);
  };

  PlotPointLodLoader.prototype.hideTips = function(scope, hidden) {
    if (this.lodOn === false) {
      this.plotter.hideTips(scope, hidden);
      return;
    }
    this.lodplotter.hideTips(scope, hidden);
  };

  PlotPointLodLoader.prototype.createTip = function(ele, g) {
    if (this.lodOn === false) {
      return this.plotter.createTip(ele);
    }
    var xAxis = this.xAxis,
      yAxis = this.yAxis;
    var tip = {};
    var sub = "sample" + (g !== "" ? (" " + g) : "");
    if (this.legend != null) {
      tip.title = this.legend + " (" + sub + ")";
    }
    if (ele.count > 1) {
      tip.xl = PlotUtils.getTipStringPercent(ele.xl, xAxis, 6);
      tip.xr = PlotUtils.getTipStringPercent(ele.xr, xAxis, 6);
      tip.max = PlotUtils.getTipString(ele._max, yAxis, true);
      tip.min = PlotUtils.getTipString(ele._min, yAxis, true);
      tip.avg = PlotUtils.getTipStringPercent(ele.avg, yAxis, 6);
      tip.count = PlotUtils.getTipString(ele.count, yAxis, true);
    } else {
      tip.x = PlotUtils.getTipStringPercent(ele.x, xAxis, 6);
      tip.y = PlotUtils.getTipString(ele._max, yAxis, true);
    }
    return PlotUtils.createTipString(tip);
  };

  return PlotPointLodLoader;

});
