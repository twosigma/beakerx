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
  var retfunc = function(plotUtils) {

    var PlotBar = function(data) {
      this.elements = data.elements;
      delete data.elements;
      $.extend(true, this, data);
      this.format();

      if (this.color != null) {
        this.tip_color = plotUtils.createColor(this.color, this.color_opacity);
      } else {
        this.tip_color = "gray";
      }
    };

    PlotBar.prototype.respclass = "plot-resp";

    PlotBar.prototype.render = function(scope) {
      if (this.shown == false) {
        this.clear(scope);
        return;
      }
      this.filter(scope);
      this.prepare(scope);
      if (this.vlength === 0) {
        this.clear(scope);
      } else {
        this.draw(scope);
      }
    };

    PlotBar.prototype.getRange = function(){
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
        range.xr = Math.max(range.xr, ele.x2);
        range.yl = Math.min(range.yl, ele.y);
        range.yr = Math.max(range.yr, ele.y2);
      }
      return range;
    };

    PlotBar.prototype.applyAxis = function(xAxis, yAxis) {
      this.xAxis = xAxis;
      this.yAxis = yAxis;
      for (var i = 0; i < this.elements.length; i++) {
        var ele = this.elements[i];
        ele.x = xAxis.getPercent(ele.x);
        ele.y = yAxis.getPercent(ele.y);
        ele.x2 = xAxis.getPercent(ele.x2);
        ele.y2 = yAxis.getPercent(ele.y2);
      }
    };

    PlotBar.prototype.createTip = function(ele) {
      var xAxis = this.xAxis,
          yAxis = this.yAxis;
      var valx = plotUtils.getTipString(ele._x, xAxis, true),
          valy = plotUtils.getTipString(ele._y, yAxis, true),
          valy2 = plotUtils.getTipString(ele._y2, yAxis, true);
      var tip = {};
      if (this.legend != null) {
        tip.title = this.legend;
      }
      tip.x = valx;
      tip.y = valy;
      tip.y2 = valy2;
      return plotUtils.createTipString(tip);
    };

    PlotBar.prototype.format = function() {

      this.itemProps = {
        "id" : this.id,
        "cls" : "plot-bar",
        "fi" : this.color,
        "fi_op": this.color_opacity,
        "st": this.stroke,
        "st_w": this.stroke_width,
        "st_op": this.stroke_opacity
      };

      this.elementProps = [];
    };

    PlotBar.prototype.filter = function(scope) {
      var eles = this.elements;
      var l = plotUtils.upper_bound(eles, "x2", scope.focus.xl) + 1,
          r = plotUtils.upper_bound(eles, "x", scope.focus.xr);

      l = Math.max(l, 0);
      r = Math.min(r, eles.length - 1);

      if (l > r || l == r && eles[l].x2 < focus.xl) {
        // nothing visible, or all elements are to the left of the svg, vlength = 0
        l = 0;
        r = -1;
      }
      this.vindexL = l;
      this.vindexR = r;
      this.vlength = r - l + 1;
    };

    PlotBar.prototype.prepare = function(scope) {
      var w = this.width, sw;
      var mapX = scope.data2scrX, mapY = scope.data2scrY;
      var eleprops = this.elementProps,
          eles = this.elements;

      eleprops.length = 0;
      for (var i = this.vindexL; i <= this.vindexR; i++) {
        var ele = eles[i];
        var x1 = mapX(ele.x), x2 = mapX(ele.x2);
        if (x2 - x1 < 1) x2 = x1 + 1;
        var y = ele.y, y2 = ele.y2;
        y = mapY(y); y2 = mapY(y2);
        sw = x2 - x1;
        if (y < y2) { continue; } // prevent negative height

        var id = this.id + "_" + i;
        var prop = {
          "id" : id,
          "iidx" : this.index,
          "eidx" : i,
          "cls" : this.respclass,
          "x" : x1,
          "y" : y2,
          "w" : sw,
          "h" : y - y2,
          "t_x" : x1,
          "t_y" : y2,
          "fi" : ele.color,
          "fi_op" : ele.color_opacity,
          "st" : ele.stroke,
          "st_w" : ele.stroke_width,
          "st_op" : ele.stroke_opacity
        };
        eleprops.push(prop);
      }
    };

    PlotBar.prototype.draw = function(scope) {
      var svg = scope.maing;
      var props = this.itemProps,
          eleprops = this.elementProps;

      if (svg.select("#" + this.id).empty()) {
        svg.selectAll("g")
          .data([props], function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.cls; })
          .style("fill", function(d) { return d.fi; })
          .style("fill-opacity", function(d) { return d.fi_op; })
          .style("stroke", function(d) { return d.st; })
          .style("stroke-opacity", function(d) { return d.st_op; })
          .style("stroke-width", function(d) { return d.st_w; });
      }

      var itemsvg = svg.select("#" + this.id);

      itemsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; }).exit().remove();
      itemsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; }).enter().append("rect")
        .attr("id", function(d) { return d.id; })
        .attr("class", function(d) { return d.cls; })
        .style("fill", function(d) { return d.fi; })
        .style("fill-opacity", function(d) { return d.fi_op; })
        .style("stroke", function(d) { return d.st; })
        .style("stroke-opacity", function(d) { return d.st_op; })
        .style("stroke-width", function(d) { return d.st_w; });
      itemsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; })
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("width", function(d) { return d.w; })
        .attr("height", function(d) { return d.h; });
    };

    PlotBar.prototype.clear = function(scope) {
      scope.maing.select("#" + this.id).remove();
    };

    return PlotBar;
  };
  beaker.bkoFactory('PlotBar', ['plotUtils', retfunc]);
})();