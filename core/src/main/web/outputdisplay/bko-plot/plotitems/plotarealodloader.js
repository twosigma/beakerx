/*
*  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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

(function() {
  'use strict';
  var retfunc = function(plotUtils, PlotSampler, PlotLine, PlotLodLine, PlotLodBox) {
    var PlotAreaLodLoader = function(data, lodthresh){

      this.datacopy = {};
      _(this.datacopy).extend(data);  // save for later use
      _(this).extend(data); // copy properties to itself

      this.lodTypeIndex = 0;
      this.lodType = this.lodTypes[this.lodTypeIndex]; // line, box

      this.format();

      // create the two plotters
      this.plotter = new PlotLine(datacopy);
      this.lodplotter = new PlotLodLine(datacopy);


      this.isLodItem = true;
      this.lodthresh = lodthresh;
      this.lodOn = false;
      this.lodAuto = true;
      this.sampleStep = -1;
      this.zoomHash = plotUtils.randomString(3);
      if (this.color != null) {
        this.tip_color = plotUtils.createColor(this.color, this.color_opacity);
      } else {
        this.tip_color = "gray";
      }
    };

    PlotAreaLodLoader.prototype.lodTypes = ["line", "box"];
    PlotAreaLodLoader.prototype.lodSteps = [5, 10, 5, 10, -1];

    PlotAreaLodLoader.prototype.zoomLevelChanged = function(scope) {
      this.clearresp(scope);
      this.sampleStep = -1;
      this.zoomHash = plotUtils.randomString(3);
    };

    PlotAreaLodLoader.prototype.switchLodType = function(scope) {
      this.lodTypeIndex = (this.lodTypeIndex + 1) % this.lodTypes.length;
      this.lodType = this.lodTypes[this.lodTypeIndex];
      this.clear(scope);
    };

    PlotAreaLodLoader.prototype.toggleLod = function(scope) {
      if (this.lodType === "off") {
        this.lodType = this.lodTypes[this.lodTypeIndex];
      } else {
        this.lodType = "off";
      }
      this.clear(scope);
    };

    PlotAreaLodLoader.prototype.render = function(scope){
      if (this.shown === false) {
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

      if (this.lodOn === false) {
        this.plotter.render(scope);
      } else {
        this.sample(scope);
        this.lodplotter.plot(scope, this.elementSamples);
      }
    };

    PlotAreaLodLoader.prototype.getRange = function() {
      var eles = this.elements;
      var range = {
        xl : 1E100,
        xr : -1E100,
        yl : 1E100,
        yr : -1E100
      };
      for (var i = 0; i < eles.length; i++) {
        var ele = eles[i];
        range.xl = Math.min(range.xl, ele.x);
        range.xr = Math.max(range.xr, ele.x);
        range.yl = Math.min(range.yl, ele.y);
        range.yr = Math.max(range.yr, ele.y);
      }
      return range;
    };

    PlotAreaLodLoader.prototype.applyAxis = function(xAxis, yAxis) {
      this.xAxis = xAxis;
      this.yAxis = yAxis;
      for (var i = 0; i < this.elements.length; i++) {
        var ele = this.elements[i];
        ele.x = xAxis.getPercent(ele.x);
        ele.y = yAxis.getPercent(ele.y);
      }
      // sampler is created AFTER coordinate axis remapping
      this.createSampler();
      // do not apply axis to line because element coordinates have been changed above
      this.line.xAxis = xAxis;
      this.line.yAxis = yAxis;
    };

    PlotAreaLodLoader.prototype.createSampler = function() {
      var xs = [], ys = [];
      for (var i = 0; i < this.elements.length; i++) {
        var ele = this.elements[i];
        xs.push(ele.x);
        ys.push(ele.y);
      }
      this.sampler = new PlotSampler(xs, ys);
    };

    PlotAreaLodLoader.prototype.format = function() {
      this.itemProps = {
        "id" : this.id,
        "cls" : "plot-line",
        "st" : this.color,
        "st_op" : this.color_opacity,
        "st_w" : this.width,
        "st_da" : this.stroke_dasharray,
        "d" : ""
      };
      this.elementProps = [];
    };

    PlotAreaLodLoader.prototype.filter = function(scope) {
      var eles = this.elements;
      var l = plotUtils.upper_bound(eles, "x", scope.focus.xl),
          r = plotUtils.upper_bound(eles, "x", scope.focus.xr) + 1;

      l = Math.max(l, 0);
      r = Math.min(r, eles.length - 1);

      if (l > r || l == r && eles[l].x < scope.focus.xl) {
        // nothing visible, or all elements are to the left of the svg, vlength = 0
        l = 0;
        r = -1;
      }
      this.vindexL = l;
      this.vindexR = r;
      this.vlength = r - l + 1;
    };

    PlotAreaLodLoader.prototype.sample = function(scope) {

      var xAxis = this.xAxis,
          yAxis = this.yAxis;
      var xl = scope.focus.xl, xr = scope.focus.xr;

      if (this.sampleStep === -1) {
        var pixelWidth = scope.stdmodel.initSize.width;
        var count = Math.ceil(pixelWidth / this.lodSteps[this.lodTypeIndex]);
        var s = (xr - xl) / count;
        this.sampleStep = s;
      }

      var step = this.sampleStep;
      xl = Math.floor(xl / step) * step;
      xr = Math.ceil(xr / step) * step;

      this.elementSamples = this.sampler.sample(xl, xr, this.sampleStep);
    };

    PlotAreaLodLoader.prototype.createTip = function(ele) {
      if (this.lodOn === false) {
        return this.line.createTip(ele);
      }
      var xAxis = this.xAxis,
          yAxis = this.yAxis;
      var valxl = plotUtils.getTipStringPercent(ele.xl, xAxis, 6),
          valxr = plotUtils.getTipStringPercent(ele.xr, xAxis, 6),
          valmin = plotUtils.getTipStringPercent(ele.min, yAxis),
          valmax = plotUtils.getTipStringPercent(ele.max, yAxis),
          valavg = plotUtils.getTipStringPercent(ele.avg, yAxis);
      var tip = {};
      if (this.legend != null) {
        tip.title = this.legend + " (sample)";
      }
      tip.xl = valxl;
      tip.xr = valxr;
      tip.min = valmin;
      tip.max = valmax;
      tip.avg = valavg;
     return plotUtils.createTipString(tip);
    };

    PlotAreaLodLoader.prototype.clear = function(scope) {
      scope.maing.select("#" + this.id).remove();
      this.clearresp(scope);
    };

    PlotAreaLodLoader.prototype.clearresp = function(scope) {
      var eleprops = this.elementProps;
      for (var i = 0; i < eleprops.length; i++) {
        scope.jqcontainer.find("#tip_" + eleprops[i].id).remove();
        delete scope.tips[eleprops[i].id];
      }
    };

    return PlotAreaLodLoader;
  };
  beaker.bkoFactory('PlotAreaLodLoader',
    ['plotUtils', 'PlotSampler', 'PlotLine', 'PlotLodLine', 'PlotLodBox', retfunc]);
})();
