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
  var retfunc = function(plotUtils, PlotSampler, PlotLine) {
    var PlotLineLod = function(data){
      this.lodTypes = ["auto sample", "auto box", "sample", "box"];
      this.lodSteps = [5, 10, 5, 10, -1];
      this.lodTypeIndex = 0;

      $.extend(true, this, data); // copy properties to itself

      this.lodType = this.lodTypes[this.lodTypeIndex]; // sampling, aggregation (boxplot), none
      this.isLodItem = true;
      this.format();

      this.lodthresh = 200;
      var datacopy = {};
      $.extend(true, datacopy, data);
      datacopy.id = data.id;
      this.line = new PlotLine(datacopy, true);
      this.lodon = false;

      this.sampleStep = -1;
      this.zoomHash = plotUtils.randomString(6);
    };

    PlotLineLod.prototype.zoomLevelChanged = function(scope) {
      this.clearresp(scope);
      this.sampleStep = -1;
      this.zoomHash = plotUtils.randomString(6);
    };

    PlotLineLod.prototype.switchLodType = function(scope) {
      this.lodTypeIndex = (this.lodTypeIndex + 1) % this.lodTypes.length;
      this.lodType = this.lodTypes[this.lodTypeIndex];
      this.clear(scope);
    };

    PlotLineLod.prototype.toggleLod = function(scope) {
      if (this.lodType === "off") {
        this.lodType = this.lodTypes[this.lodTypeIndex];
      } else {
        this.lodType = "off";
      }
      this.clear(scope);
    };

    PlotLineLod.prototype.render = function(scope){
      if (this.shown === false) {
        this.clear(scope);
        return;
      }

      this.filter(scope);

      var lod = false;
      if (this.lodType === "auto sample" || this.lodType === "auto box") {
        if (this.vlength > this.lodthresh) {
          lod = true;
        }
      } else if (this.lodType === "sample" || this.lodType === "box") {
        lod = true;
      }

      if (this.lodon != lod) {
        scope.legendDone = false;
        this.clear(scope);
      }
      this.lodon = lod;

      if (this.lodon === false) {
        this.line.render(scope);
      } else {
        this.sample(scope);
        if (this.lodType === "auto sample" || this.lodType === "sample") {
          this.prepareSample(scope);
          this.drawSample(scope);
        } else {
          this.prepareBox(scope);
          this.drawBox(scope);
        }
      }
    };

    PlotLineLod.prototype.getRange = function() {
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

    PlotLineLod.prototype.applyAxis = function(xAxis, yAxis) {
      this.xAxis = xAxis;
      this.yAxis = yAxis;
      for (var i = 0; i < this.elements.length; i++) {
        var ele = this.elements[i];
        ele.x = xAxis.getPercent(ele.x);
        ele.y = yAxis.getPercent(ele.y);
      }
      // sampler is created AFTER coordinate axis remapping
      this.createSampler();
      // createTips is not called because Lod tips are changing
      this.line.applyAxis(xAxis, yAxis);
    };

    PlotLineLod.prototype.createSampler = function() {
      var xs = [], ys = [];
      for (var i = 0; i < this.elements.length; i++) {
        var ele = this.elements[i];
        xs.push(ele.x);
        ys.push(ele.y);
      }
      this.sampler = new PlotSampler(xs, ys);
    };

    PlotLineLod.prototype.format = function() {
      this.itemProps = {
        "id" : this.id,
        "class" : "plot-line",
        "stroke" : this.color,
        "stroke_opacity" : this.color_opacity,
        "stroke_width" : this.width,
        "stroke_dasharray" : this.stroke_dasharray,
        "d" : ""
      };
      this.elementProps = [];
      this.resppipe = [];
    };

    PlotLineLod.prototype.filter = function(scope) {
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

    PlotLineLod.prototype.sample = function(scope) {

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

    PlotLineLod.prototype.prepareSample = function(scope) {
      var focus = scope.focus;
      var eleprops = this.elementProps;
      var mapX = scope.data2scrX,
          mapY = scope.data2scrY;
      var pstr = "", skipped = false;
      var xAxis = this.xAxis,
          yAxis = this.yAxis;

      this.resppipe.length = 0;
      this.elementProps.length = 0;

      var samples = this.elementSamples;
      for (var i = 0; i < samples.length; i++) {
        var ele = samples[i];
        if (i === 0) {
          pstr += "M";
        } else if (i === 1) {
          pstr += "L";
        }
        var x = mapX(ele.x), y = mapY(ele.y);
        if (Math.abs(x) > 1E6 || Math.abs(y) > 1E6) {
          skipped = true;
          break;
        }

        if (eleprops[i] == null) {
          eleprops[i] = {}; // create a new sample element if doesn't exists
        }

        var nxtp = x + "," + y + " ";

        if (focus.yl <= ele.y && ele.y <= focus.yr) {
          var hashid = this.id + "_" + this.zoomHash + "_" + ele.hash;

          _(eleprops[i]).extend({
            "id" : hashid,
            "class" : "plot-resp plot-respdot",
            "isresp" : true,
            "cx" : x,
            "cy" : y,
            "r" : 5,
            "tip_x" : x,
            "tip_y" : y,
            "tip_color" : this.color == null ? "gray" : this.color,
            "opacity" : scope.tips[hashid] == null ? 0 : 1
          });
          this.resppipe.push(eleprops[i]);
        }

        if (i < samples.length - 1) {
          if (this.interpolation === "none") {
            var ele2 = samples[i + 1];
            nxtp += x + "," + y + " " + mapX(ele2.x) + "," + y + " ";
          } else if (this.interpolation === "curve") {
            // TODO curve implementation
          }
        }

        pstr += nxtp;
      }

      if (skipped === true) {
        console.error("data not shown due to too large coordinate");
      }
      if (pstr.length > 0) {
        this.itemProps.d = pstr;
        this.createTips();
      }
    };


    PlotLineLod.prototype.drawSample = function(scope) {
      var svg = scope.maing;
      var props = this.itemProps,
          eleprops = this.elementProps,
          pipe = this.resppipe;

      if (svg.select("#" + this.id).empty()) {
        svg.selectAll("g")
          .data([props], function(d){ return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; });
      }

      var itemsvg = svg.select("#" + this.id);

      itemsvg.selectAll("path")
        .data([props]).enter().append("path")
        .attr("class", function(d) { return d.class; })
        .style("stroke", function(d) { return d.stroke; })
        .style("stroke-dasharray", function(d) { return d.stroke_dasharray; })
        .style("stroke-width", function(d) { return d.stroke_width; })
        .style("stroke-opacity", function(d) { return d.stroke_opacity; });
      itemsvg.select("path")
        .attr("d", props.d);

      if (scope.stdmodel.useToolTip === true) {
        itemsvg.selectAll("circle")
          .data(pipe, function(d) { return d.id; }).exit().remove();
        itemsvg.selectAll("circle")
          .data(pipe, function(d) { return d.id; }).enter().append("circle")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .style("stroke", function(d) { return d.tip_color; });
        itemsvg.selectAll("circle")
          .data(pipe, function(d) { return d.id; })
          .attr("cx", function(d) { return d.cx; })
          .attr("cy", function(d) { return d.cy; })
          .attr("r", function(d) { return d.r; })
          .style("opacity", function(d) { return d.opacity; });
      }
    };

    PlotLineLod.prototype.prepareBox = function(scope) {
      var focus = scope.focus;
      var eles = this.elements,
          eleprops = this.elementProps;
      var mapX = scope.data2scrX,
          mapY = scope.data2scrY;
      var skipped = false;

      this.resppipe.length = 0;
      this.elementProps.length = 0;

      var samples = this.elementSamples;
      for (var i = 0; i < samples.length; i++) {
        var ele = samples[i];
        var x = mapX(ele.xl), x2 = mapX(ele.xr),
            y = mapY(ele.max), y2 = mapY(ele.min),
            y3 = mapY(ele.avg);
        if (Math.abs(x) > 1E6 || Math.abs(y) > 1E6 || Math.abs(x2) > 1E6 || Math.abs(y2) > 1E6) {
          skipped = true;
          break;
        }
        if (eleprops[i] == null) {
          eleprops[i] = {}; // create a new sample element if doesn't exists
        }
        var hashid = this.id + "_" + this.zoomHash + "_" + i;
        _(eleprops[i]).extend({
          "id" : hashid,
          "class" : "plot-resp plot-lodbox",
          "x" : x + 1,
          "y" : y,
          "width" : x2 - x - 2,
          "height" : y2 - y,
          "ym" : y3,
          "tip_x" : x,
          "tip_y" : y,
          "tip_color" : this.color == null ? "gray" : this.color
        });
      }

      if (samples.length > 0) {
        this.createTips();
      }
    };

    PlotLineLod.prototype.drawBox = function(scope) {
      var svg = scope.maing;
      var props = this.itemProps,
          pipe = this.elementProps;

      if (svg.select("#" + this.id).empty()) {
        svg.selectAll("g")
          .data([props], function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; });
      }

      var itemsvg = svg.select("#" + this.id);

      // draw boxes
      itemsvg.selectAll("rect")
        .data(pipe, function(d) { return d.id; }).exit().remove();
      itemsvg.selectAll("rect")
        .data(pipe, function(d) { return d.id; }).enter().append("rect")
        .attr("id", function(d) { return d.id; })
        .attr("class", function(d) { return d.class; })
        .style("stroke", this.color);
      itemsvg.selectAll("rect")
        .data(pipe, function(d) { return d.id; })
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("width", function(d) { return d.width; })
        .attr("height", function(d) { return d.height; });

      // draw lines
      itemsvg.selectAll("line")
        .data(pipe, function(d) { return d.id + "l"; }).exit().remove();
      itemsvg.selectAll("line")
        .data(pipe, function(d) { return d.id + "l"; }).enter().append("line")
        .attr("id", function(d) { return d.id + "l"; })
        .attr("class", "plot-lodboxline")
        .style("stroke", this.color);
      itemsvg.selectAll("line")
        .data(pipe, function(d) { return d.id + "l"; })
        .attr("x1", function(d) { return d.x; })
        .attr("x2", function(d) { return d.x + d.width; })
        .attr("y1", function(d) { return d.ym; })
        .attr("y2", function(d) { return d.ym; });
    };

    PlotLineLod.prototype.createTips = function() {
      var xAxis = this.xAxis,
          yAxis = this.yAxis;
      var samples = this.elementSamples;
      for (var i = 0; i < samples.length; i++) {
        var ele = samples[i];
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

        this.elementProps[i].tip_text = plotUtils.createTipString(tip);
      }
    };

    PlotLineLod.prototype.clear = function(scope) {
      scope.maing.select("#" + this.id).remove();
      this.clearresp(scope);
    };

    PlotLineLod.prototype.clearresp = function(scope) {
      var eleprops = this.elementProps;
      for (var i = 0; i < eleprops.length; i++) {
        scope.jqcontainer.find("#tip_" + eleprops[i].id).remove();
        delete scope.tips[eleprops[i].id];
      }
      for (var i = 0; i < this.resppipe.length; i++) {
        scope.jqcontainer.find("#tip_" + this.resppipe[i].id).remove();
        delete scope.tips[this.resppipe[i].id];
      }
    };

    return PlotLineLod;
  };
  beaker.bkoFactory('PlotLineLod', ['plotUtils', 'PlotSampler', 'PlotLine', retfunc]);
})();