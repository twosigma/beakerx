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
    var PlotLine = function(data){
      $.extend(true, this, data); // copy properties to itself
      this.format();
    };

    PlotLine.prototype.render = function(scope){
      if (this.shown === false) {
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

    PlotLine.prototype.getRange = function() {
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

    PlotLine.prototype.format = function() {
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
      for (var i = 0; i < this.elements.length; i++) {
        var ele = this.elements[i];
        var point = {};
        this.elementProps.push(point);
      }
    };

    PlotLine.prototype.filter = function(scope) {
      var eles = this.elements;
      var l = plotUtils.upper_bound(eles, "x", scope.focus.xl),
          r = plotUtils.upper_bound(eles, "x", scope.focus.xr) + 1;

      l = Math.max(l, 0);
      r = Math.min(r, eles.length - 1);

      if (l > r || l == r && eles[l].x < focus.xl) {
        // nothing visible, or all elements are to the left of the svg, vlength = 0
        l = 0;
        r = -1;
      }
      this.vindexL = l;
      this.vindexR = r;
      this.vlength = r - l + 1;
    };

    PlotLine.prototype.prepare = function(scope) {
      var eles = this.elements;
      var mapX = scope.data2scrX, mapY = scope.data2scrY;
      var pstr = "", skipped = false;

      for (var i = this.vindexL; i <= this.vindexR; i++) {
        var p = eles[i];
        if (i == this.vindexL) pstr += "M";
        else if (i == this.vindexL + 1) {
          if (this.interpolation !== "curve") pstr += "L";
          else pstr += "C";
        }
        var x = mapX(p.x), y = mapY(p.y);
        if (Math.abs(x) > 1E6 || Math.abs(y) > 1E6) {
          skipped = true;
          break;
        }
        var nxtp = x + "," + y + " ";

        if (i < this.vindexR) {
          if (this.interpolation === "none") {
            var p2 = eles[i + 1];
            nxtp += mapX(p.x) + "," + mapY(p.y) + " " + mapX(p2.x) + "," + mapY(p.y) + " ";
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

    PlotLine.prototype.draw = function(scope) {
      var svg = scope.maing;
      var props = this.itemProps;

      if (svg.select("#" + this.id).empty()) {
        svg.selectAll("g")
          .data([props], function(d){ return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .style("stroke", function(d) { return d.stroke; })
          .style("stroke-dasharray", function(d) { return d.stroke_dasharray; })
          .style("stroke-width", function(d) { return d.stroke_width; })
          .style("stroke-opacity", function(d) { return d.stroke_opacity; });
      }

      var itemsvg = svg.select("#" + this.id);

      itemsvg.selectAll("path")
        .data([props]).enter().append("path");
      itemsvg.select("path")
        .attr("d", props.d);
    };

    PlotLine.prototype.clear = function(scope) {
      scope.maing.select("#" + this.id).remove();
    };

    return PlotLine;
  };
  beaker.bkoFactory('PlotLine', ['plotUtils', retfunc]);
})();