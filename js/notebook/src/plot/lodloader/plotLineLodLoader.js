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
  './../std/plotline',
  './../plotSampler',
  './../lod/plotLodLine',
  './../lod/plotLodBox',
  './../lod/plotLodRiver'
], function(
  _,
  PlotLine,
  PlotSampler,
  PlotLodLine,
  PlotLodBox,
  PlotLodRiver
) {
  const PlotColorUtils = require("../utils/PlotColorUtils").default;
  const CommonUtils = require("beakerx_shared/lib/utils/CommonUtils").default;
  const PlotUtils = require("../utils/PlotUtils").default;

  var PlotLineLodLoader = function(data, lodthresh){
    this.datacopy = {};
    _.extend(this.datacopy, data);  // save for later use
    _.extend(this, data); // copy properties to itself
    this.lodthresh = lodthresh;
    this.format(lodthresh);
  };
  // class constants
  PlotLineLodLoader.prototype.lodTypes = ["box", "river"];
  PlotLineLodLoader.prototype.lodSteps = [10, 3];

  PlotLineLodLoader.prototype.format = function() {
    // create plot type index
    this.lodTypeIndex =  (this.datacopy.lod_filter) ? this.lodTypes.indexOf(this.datacopy.lod_filter) : 1;
    this.lodType = this.lodTypes[this.lodTypeIndex];

    // create the plotters
    this.zoomHash = CommonUtils.randomString(3);
    this.plotter = new PlotLine(this.datacopy);
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

  PlotLineLodLoader.prototype.zoomLevelChanged = function(scope) {
    this.sampleStep = -1;
    this.zoomHash = CommonUtils.randomString(3);
    if (this.lodOn === false) { return; }
    this.lodplotter.setZoomHash(this.zoomHash);
    this.lodplotter.hideTips(scope);
  };

  PlotLineLodLoader.prototype.applyZoomHash = function(hash) {
    this.zoomHash = hash;
    this.lodplotter.setZoomHash(hash);
  };

  PlotLineLodLoader.prototype.switchLodType = function(scope) {
    this.clear(scope);  // must clear first before changing lodType
    this.lodTypeIndex = (this.lodTypeIndex + 1) % this.lodTypes.length;
    this.lodType = this.lodTypes[this.lodTypeIndex];
    this.createLodPlotter();
  };

  PlotLineLodLoader.prototype.applyLodType = function(type) {
    this.lodTypeIndex = this.lodTypes.indexOf(type);  // maybe -1
    if (this.lodTypeIndex === -1) {
      this.lodTypeIndex = 0;
    }
    this.lodType = this.lodTypes[this.lodTypeIndex];
    this.createLodPlotter();
  };

  PlotLineLodLoader.prototype.createLodPlotter = function() {
    var data = {};
    _.extend(data, this.datacopy);
    if (this.lodType === "line") {
      this.lodplotter = new PlotLodLine(data);
      this.lodplotter.setZoomHash(this.zoomHash);
    } else if (this.lodType === "box") {
      data.stroke = data.color;
      data.color_opacity *= .25;
      data.stroke_opacity = 1.0;
      this.lodplotter = new PlotLodBox(data);
      this.lodplotter.setWidthShrink(1);
      this.lodplotter.setZoomHash(this.zoomHash);
    } else if (this.lodType === "river") {
      data.stroke = data.color;  // assume the user has no way to set outline for line
      data.color_opacity *= .25;
      data.stroke_opacity = 1.0;
      this.lodplotter = new PlotLodRiver(data);
      this.lodplotter.setZoomHash(this.zoomHash);
    }
  };

  PlotLineLodLoader.prototype.toggleLodAuto = function(scope) {
    this.lodAuto = !this.lodAuto;
    this.clear(scope);
  };

  PlotLineLodLoader.prototype.applyLodAuto = function(auto) {
    this.lodAuto = auto;
  };

  PlotLineLodLoader.prototype.toggleLod = function(scope) {
    if (this.lodType === "off") {
      this.lodType = this.lodTypes[this.lodTypeIndex];
    } else {
      this.lodType = "off";
    }
    this.clear(scope);
  };

  PlotLineLodLoader.prototype.render = function(scope){
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

    if (this.lodOn === true && this.lodplotter) {
      this.sample(scope);
      this.lodplotter.render(scope, this.elementSamples);
    } else {
      this.plotter.render(scope);
    }
  };

  PlotLineLodLoader.prototype.setHighlighted = function(scope, highlighted) {
    if (this.lodOn === true && this.lodplotter) {
      this.lodplotter.setHighlighted(scope, highlighted);
    } else {
      this.plotter.setHighlighted(scope, highlighted);
    }
  };

  PlotLineLodLoader.prototype.getRange = function() {
    return this.plotter.getRange();
  };

  PlotLineLodLoader.prototype.applyAxis = function(xAxis, yAxis) {
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    this.plotter.applyAxis(xAxis, yAxis);
    // sampler is created AFTER coordinate axis remapping
    this.createSampler();
  };

  PlotLineLodLoader.prototype.createSampler = function() {
    var xs = [], ys = [], _ys = [];
    for (var i = 0; i < this.elements.length; i++) {
      var ele = this.elements[i];
      xs.push(ele.x);
      ys.push(ele.y);
      _ys.push(ele._y);
    }
    this.sampler = new PlotSampler(xs, ys, _ys);
  };


  PlotLineLodLoader.prototype.filter = function(scope) {
    this.plotter.filter(scope);
    this.vindexL = this.plotter.vindexL;
    this.vindexR = this.plotter.vindexR;
    this.vlength = this.plotter.vlength;
  };

  PlotLineLodLoader.prototype.sample = function(scope) {

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
  };

  PlotLineLodLoader.prototype.clear = function(scope) {
    scope.maing.select("#" + this.id).selectAll("*").remove();
    this.hideTips(scope);
  };

  PlotLineLodLoader.prototype.hideTips = function(scope, hidden) {
    if (this.lodOn === false) {
      this.plotter.hideTips(scope, hidden);
      return;
    }
    this.lodplotter.hideTips(scope, hidden);
  };

  PlotLineLodLoader.prototype.createTip = function(ele) {
    if (this.lodOn === false ||  !this.lodplotter) {
      return this.plotter.createTip(ele);
    }
    var xAxis = this.xAxis,
      yAxis = this.yAxis;
    var tip = {};
    if (this.legend != null) {
      tip.title = this.legend + " (sample)";
    }
    var eles = this.elements;
    tip.xl = PlotUtils.getTipStringPercent(ele.xl, xAxis, 6);
    tip.xr = PlotUtils.getTipStringPercent(ele.xr, xAxis, 6);
    tip.max = PlotUtils.getTipString(ele._max, yAxis, true);
    tip.min = PlotUtils.getTipString(ele._min, yAxis, true);
    tip.avg = PlotUtils.getTipStringPercent(ele.avg, yAxis, 6);
    tip.count = PlotUtils.getTipString(ele.count, yAxis, true);
    return PlotUtils.createTipString(tip);
  };

  return PlotLineLodLoader;

});