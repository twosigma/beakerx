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
      $.extend(true, this, data);
      this.format();
    };
    PlotBar.prototype.format = function() {
      this.itemProps = {
        "id" : this.id,
        "class" : "plot-bar",
        "fill" : this.color,
        "fill_opacity": this.color_opacity,
        "stroke": this.stroke,
        "stroke_width": this.stroke_width,
        "stroke_opacity": this.stroke_opacity
      };
      this.elementProps = [];
      for (var i = 0; i < this.elements.length; i++) {
        var ele = this.elements[i];
        var bar = {
          "id" : this.id + "_" + i,
          "class" : "plot-resp",
          "fill" : ele.color,
          "fill_opacity" : ele.color_opacity,
          "stroke" : ele.stroke,
          "stroke_width" : ele.stroke_width,
          "stroke_opacity" : ele.stroke_opacity,
          "tip_text" : ele.tip_text,
          "tip_color" : plotUtils.createColor(this.color, this.color_opacity),
        };
        this.elementProps.push(bar);
      }
    };

    PlotBar.prototype.filter = function(scope) {
      var eles = this.elements;
      var l = plotUtils.upper_bound(eles, "x", scope.focus.xl) + 1,
          r = plotUtils.upper_bound(eles, "x2", scope.focus.xr);

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

    PlotBar.prototype.render = function(scope) {

      if (this.shown == false) {
        this.clear(scope);
        return;
      }

      this.filter(scope);

      var w = this.width, sw;
      var mapX = scope.data2scrX, mapY = scope.data2scrY;
      var eleprops = this.elementProps, eles = this.elements;

      for (var i = this.vindexL; i <= this.vindexR; i++) {
        var p = eles[i];
        var x1 = mapX(p.x), x2 = mapX(p.x2);
        if (x2 - x1 < 1) x2 = x1 + 1;
        var y = p.y, y2 = p.y2;
        y = mapY(y); y2 = mapY(y2);
        sw = x2 - x1;
        if (y > y2) { continue; } // prevent negative height

        _(eleprops[i]).extend({
          "x" : x1,
          "y" : y,
          "width" : sw,
          "height" : y2 - y,
          "tip_x" : x1,
          "tip_y" : y
        });
      }
      this.renderSvg(scope);
    };

    PlotBar.prototype.clear = function(scope) {
      scope.maing.select("#" + this.id).remove();
    };

    PlotBar.prototype.renderSvg = function(scope) {
      var svg = scope.maing, prop = this.itemProps, eleprops = this.elementProps;

      if (this.vlength === 0) {
        this.clear(scope);
        return;
      }

      if (svg.select("#" + this.id).empty()) {
        svg.selectAll("g")
          .data([prop], function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .style("fill", function(d) { return d.fill; })
          .style("fill-opacity", function(d) { return d.fill_opacity; })
          .style("stroke", function(d) { return d.stroke; })
          .style("stroke-opacity", function(d) { return d.stroke_opacity; })
          .style("stroke-width", function(d) { return d.stroke_width; });
      }

      var svgitem = svg.select("#" + this.id);

      svgitem.selectAll("rect")
        .data(eleprops, function(d) { return d.id; }).exit().remove();
      svgitem.selectAll("rect")
        .data(eleprops, function(d) { return d.id; }).enter().append("rect")
        .attr("id", function(d) { return d.id; })
        .attr("class", function(d) { return d.class; })
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("width", function(d) { return d.width; })
        .attr("height", function(d) { return d.height; })
        .style("fill", function(d) { return d.fill; })
        .style("fill-opacity", function(d) { return d.fill_opacity; })
        .style("stroke", function(d) { return d.stroke; })
        .style("stroke-opacity", function(d) { return d.stroke_opacity; })
        .style("stroke-width", function(d) { return d.stroke_width; });
      svgitem.selectAll("rect")
        .data(eleprops, function(d) { return d.id; })
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("width", function(d) { return d.width; })
        .attr("height", function(d) { return d.height; });
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
        range.xr = Math.max(range.xr, ele.x);
        range.yl = Math.min(range.yl, ele.y);
        range.yr = Math.max(range.yr, ele.y);
      }
      return range;
    };
    return PlotBar;
  };
  beaker.bkoFactory('PlotBar', ['plotUtils', retfunc]);
})();