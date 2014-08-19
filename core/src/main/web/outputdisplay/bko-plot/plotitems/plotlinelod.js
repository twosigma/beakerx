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

      this.lodTypeIndex = 0;

      this.elements = data.elements;  // prevent copy data
      delete data.elements;
      $.extend(true, this, data); // copy properties to itself

      this.lodType = this.lodTypes[this.lodTypeIndex]; // sampling, aggregation (boxplot), none
      this.isLodItem = true;
      this.format();

      this.lodthresh = 200;
      data.elements = this.elements;

      this.line = new PlotLine(data);
      this.lodOn = false;

      this.sampleStep = -1;
      this.zoomHash = plotUtils.randomString(3);

      if (this.color != null) {
        this.tip_color = plotUtils.createColor(this.color, this.color_opacity);
      } else {
        this.tip_color = "gray";
      }
    };

    PlotLineLod.prototype.respclassDot = "plot-resp plot-respdot";
    PlotLineLod.prototype.respclassBox = "plot-resp plot-lodbox";
    PlotLineLod.prototype.lodTypes = ["auto sample", "auto box", "sample", "box"];
    PlotLineLod.prototype.lodSteps = [5, 10, 5, 10, -1];

    PlotLineLod.prototype.zoomLevelChanged = function(scope) {
      this.clearresp(scope);
      this.sampleStep = -1;
      this.zoomHash = plotUtils.randomString(3);
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

      if (this.lodOn != lod) {
        scope.legendDone = false;
        this.clear(scope);
      }
      this.lodOn = lod;

      if (this.lodOn === false) {
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
      // do not apply axis to line because element coordinates have been changed above
      this.line.xAxis = xAxis;
      this.line.yAxis = yAxis;
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
        "cls" : "plot-line",
        "st" : this.color,
        "st_op" : this.color_opacity,
        "st_w" : this.width,
        "st_da" : this.stroke_dasharray,
        "d" : ""
      };
      this.elementProps = [];
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

      eleprops.length = 0;

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

        var nxtp = x + "," + y + " ";

        if (focus.yl <= ele.y && ele.y <= focus.yr) {
          var hashid = this.id + "_" + this.zoomHash + "_" + ele.hash;

          var prop = {
            "id" : hashid,
            "iidx" : this.index,
            "eidx" : i,
            "cls" : this.respclassDot,
            "isresp" : true,
            "cx" : x,
            "cy" : y,
            "r" : 5,
            "t_x" : x,
            "t_y" : y,
            "op" : scope.tips[hashid] == null ? 0 : 1
          };
          eleprops.push(prop);
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
      }
    };

    PlotLineLod.prototype.drawSample = function(scope) {
      var svg = scope.maing;
      var props = this.itemProps,
          eleprops = this.elementProps;

      if (svg.select("#" + this.id).empty()) {
        svg.selectAll("g")
          .data([props], function(d){ return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; });
      }

      var itemsvg = svg.select("#" + this.id);

      itemsvg.selectAll("path")
        .data([props]).enter().append("path")
        .attr("class", function(d) { return d.cls; })
        .style("stroke", function(d) { return d.st; })
        .style("stroke-dasharray", function(d) { return d.st_da; })
        .style("stroke-width", function(d) { return d.st_w; })
        .style("stroke-opacity", function(d) { return d.st_op; });
      itemsvg.select("path")
        .attr("d", props.d);

      var item = this;
      if (scope.stdmodel.useToolTip === true) {
        itemsvg.selectAll("circle")
          .data(eleprops, function(d) { return d.id; }).exit().remove();
        itemsvg.selectAll("circle")
          .data(eleprops, function(d) { return d.id; }).enter().append("circle")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.cls; })
          .style("stroke", item.tip_color);
        itemsvg.selectAll("circle")
          .data(eleprops, function(d) { return d.id; })
          .attr("cx", function(d) { return d.cx; })
          .attr("cy", function(d) { return d.cy; })
          .attr("r", function(d) { return d.r; })
          .style("opacity", function(d) { return d.op; });
      }
    };

    PlotLineLod.prototype.prepareBox = function(scope) {
      var focus = scope.focus;
      var eles = this.elements,
          eleprops = this.elementProps;
      var mapX = scope.data2scrX,
          mapY = scope.data2scrY;
      var skipped = false;

      eleprops.length = 0;

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
        var hashid = this.id + "_" + this.zoomHash + "_" + i;
        var prop = {
          "id" : hashid,
          "iidx" : this.index,
          "eidx": i,
          "cls" : this.respclassBox,
          "x" : x + 1,
          "y" : y,
          "w" : x2 - x - 2,
          "h" : y2 - y,
          "ym" : y3,
          "t_x" : x,
          "t_y" : y
        };
        eleprops.push(prop);
      }
    };

    PlotLineLod.prototype.drawBox = function(scope) {
      var svg = scope.maing;
      var props = this.itemProps,
          eleprops = this.elementProps;

      if (svg.select("#" + this.id).empty()) {
        svg.selectAll("g")
          .data([props], function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; });
      }

      var itemsvg = svg.select("#" + this.id);

      // draw lines
      itemsvg.selectAll("line")
        .data(eleprops, function(d) { return d.id + "l"; }).exit().remove();
      itemsvg.selectAll("line")
        .data(eleprops, function(d) { return d.id + "l"; }).enter().append("line")
        .attr("id", function(d) { return d.id + "l"; })
        .attr("class", "plot-lodboxline")
        .style("stroke", this.tip_color);
      itemsvg.selectAll("line")
        .data(eleprops, function(d) { return d.id + "l"; })
        .attr("x1", function(d) { return d.x; })
        .attr("x2", function(d) { return d.x + d.w; })
        .attr("y1", function(d) { return d.ym; })
        .attr("y2", function(d) { return d.ym; });

      // draw boxes
      itemsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; }).exit().remove();
      itemsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; }).enter().append("rect")
        .attr("id", function(d) { return d.id; })
        .attr("class", function(d) { return d.cls; })
        .style("stroke", this.tip_color);
      itemsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; })
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("width", function(d) { return d.w; })
        .attr("height", function(d) { return d.h; });
    };

    PlotLineLod.prototype.createTip = function(ele) {
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
    };

    return PlotLineLod;
  };
  beaker.bkoFactory('PlotLineLod', ['plotUtils', 'PlotSampler', 'PlotLine', retfunc]);
})();