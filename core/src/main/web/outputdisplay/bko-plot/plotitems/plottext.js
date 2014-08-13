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
    var PlotText = function(data){
      $.extend(true, this, data);
      this.format();
    };

    PlotText.prototype.render = function(scope) {
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

    PlotText.prototype.getRange = function() {
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

    PlotText.prototype.format = function() {

      this.itemProps = {
        "id" : this.id,
        "class" : "plot-text",
        "fill" : this.color,
        "fill_opacity" : this.color_opacity,
      };

      this.elementProps = [];
      for (var i = 0; i < this.elements.length; i++) {
        var ele = this.elements[i];
        var stem = {
          "id" : this.id + "_" + i,
          "class" : "plot-resp",
          "fill" : ele.color,
          "fill_opacity" : ele.fill_opacity,
          "text" : ele.text,
          "transform" : ""
        };
        this.elementProps.push(stem);
      }

      this.pipe = [];
    };

    PlotText.prototype.filter = function(scope) {
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

    PlotText.prototype.prepare = function(scope) {
      var eles = this.elements, eleprops = this.elementProps;
      var mapX = scope.data2scrX, mapY = scope.data2scrY;

      this.pipe.length = 0;
      for (var i = this.vindexL; i <= this.vindexR; i++) {
        var ele = eles[i];
        if (ele.x < focus.xl || ele.x > focus.xr || ele.y < focus.yl || ele.y > focus.yr ) {
          continue;
        }
        var x = mapX(ele.x), y = mapY(ele.y);
        var tf = "", rot = null;
        if (ele.rotate != null) {
          rot = ele.rotate;
        } else if (this.rotate != null) {
          rot = this.rotate;
        }
        if (rot != null) {
          tf = "rotate(" + rot + " " + x + " " + y + ")";
        }
        tf += "translate(" + x + "," + y + ")";

        _(eleprops[i]).extend({
          "transform" : tf,
          "text" : ele.text,
          "fill" : ele.color,
          "fill_opacity" : ele.opacity
        });
        this.pipe.push(eleprops[i]);
      }
    };

    PlotText.prototype.draw = function(scope) {
      var svg = scope.maing;
      var props = this.itemProps,
          pipe = this.pipe;

      if (svg.select("#" + this.id).empty()) {
        svg.selectAll("g")
          .data([props], function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .style("fill", function(d) { return d.fill; })
          .style("fill_opacity", function(d) { return d.fill_opacity; });
      }

      var itemsvg = svg.select("#" + this.id);
      itemsvg.selectAll("text")
        .data(pipe, function(d) { return d.id; }).exit().remove();
      itemsvg.selectAll("text")
        .data(pipe, function(d) { return d.id; }).enter().append("text")
        .attr("id", function(d) { return d.id; })
        .attr("class", function(d) { return d.class; })
        .style("fill", function(d) { return d.fill; })
        .style("fill_opacity", function(d) { return d.fill_opacity; })
        .text(function(d) { return d.text; });
      itemsvg.selectAll("text")
        .data(pipe, function(d) { return d.id; })
        .attr("transform", function(d) { return d.transform; });
    };

    PlotText.prototype.clear = function(scope) {
      scope.maing.select("#" + this.id).remove();
    };

    return PlotText;
  };
  beaker.bkoFactory('PlotText', ['plotUtils', retfunc]);
})();