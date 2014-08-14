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
    var PlotPoint = function(data){
      $.extend(true, this, data);
      this.format();
    };

    PlotPoint.prototype.render = function(scope) {
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

    PlotPoint.prototype.getRange = function() {
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

    PlotPoint.prototype.applyAxis = function(xAxis, yAxis) {
      this.xAxis = xAxis;
      this.yAxis = yAxis;
      for (var i = 0; i < this.elements.length; i++) {
        var ele = this.elements[i];
        ele.x = xAxis.getPercent(ele.x);
        ele.y = yAxis.getPercent(ele.y);
      }
      this.createTips();
    };

    PlotPoint.prototype.createTips = function() {
      var xAxis = this.xAxis,
          yAxis = this.yAxis;
      for (var i = 0; i < this.elements.length; i++) {
        var ele = this.elements[i];
        var txt = "";
        var valx = plotUtils.getTipString(ele._x, xAxis, true),
            valy = plotUtils.getTipString(ele._y, yAxis, true);

        var tip = {};
        if (this.legend != null) {
          tip.title = this.legend;
        }
        tip.x = valx;
        tip.y = valy;

        this.elementProps[i].tip_text = plotUtils.createTipString(tip);
      }
    };

    PlotPoint.prototype.format = function() {

      this.itemProps = {
        "id" : this.id,
        "class" : "plot-point",
        "fill" : this.color,
        "fill_opacity": this.color_opacity,
        "stroke": this.stroke,
        "stroke_opacity" : this.stroke_opacity,
        "stroke_width": this.stroke_width,
        "stroke_dasharray": this.stroke_dasharray
      };

      this.elementProps = [];
      for (var i = 0; i < this.elements.length; i++) {
        var ele = this.elements[i];
        var stem = {
          "id" : this.id + "_" + i,
          "class" : "plot-resp",
          "shape" : ele.shape == null ? this.shape : ele.shape,
          "fill" : ele.color,
          "fill_opacity" : ele.color_opacity,
          "stroke" : ele.stroke,
          "stroke_opacity": ele.stroke_opacity,
          "stroke_width" : ele.stroke_width,
          "stroke_dasharray": ele.stroke_dasharray,
          "tip_text" : ele.tip_text,
          "tip_color" : plotUtils.createColor(this.color, this.color_opacity)
        };
        this.elementProps.push(stem);
      }

      this.pipeRects = [];
      this.pipeDiamonds = [];
      this.pipeCircles = [];

      this.shapes = ["rect", "diamond", "circle"];
      this.pipes = {
        "rect" : this.pipeRects,
        "diamond" : this.pipeDiamonds,
        "circle" : this.pipeCircles
      };
      this.svgtags = ["rect", "polygon", "circle"];
    };

    PlotPoint.prototype.filter = function(scope) {
      var eles = this.elements;
      var l = plotUtils.upper_bound(eles, "x", scope.focus.xl) + 1,
          r = plotUtils.upper_bound(eles, "x2", scope.focus.xr);

      l = Math.max(l, 0);
      r = Math.min(r, eles.length - 1);

      if (l > r || l == r && eles[l].x2 < scope.focus.xl) {
        // nothing visible, or all elements are to the left of the svg, vlength = 0
        l = 0;
        r = -1;
      }
      this.vindexL = l;
      this.vindexR = r;
      this.vlength = r - l + 1;
    };

    PlotPoint.prototype.prepare = function(scope) {
      var eles = this.elements, eleprops = this.elementProps;
      var mapX = scope.data2scrX, mapY = scope.data2scrY;

      this.pipeRects.length = 0;
      this.pipeDiamonds.length = 0;
      this.pipeCircles.length = 0;

      for (var i = this.vindexL; i <= this.vindexR; i++) {
        var ele = eles[i];
        var x = mapX(ele.x), y = mapY(ele.y), s = ele.size;
        _(eleprops[i]).extend({
          "x" : x,
          "y" : y,
          "tip_x" : x,
          "tip_y" : y
        });
        switch (eleprops[i].shape) {
          case "diamond":
            var pstr = "";
            pstr += (x - s) + "," + (y    ) + " ";
            pstr += (x    ) + "," + (y - s) + " ";
            pstr += (x + s) + "," + (y    ) + " ";
            pstr += (x    ) + "," + (y + s) + " ";
            _(eleprops[i]).extend({
              "points" : pstr
            });
            break;
          case "circle":
            _(eleprops[i]).extend({
              "cx" : x,
              "cy" : y,
              "r" : s
            });
            break;
          default:    // rects
            _(eleprops[i]).extend({
              "x" : x - s / 2,
              "y" : y - s / 2,
              "width" : s,
              "height" : s
            });
        }
        this.pipes[eleprops[i].shape].push(eleprops[i]);
      }
    };

    PlotPoint.prototype.draw = function(scope) {
      var svg = scope.maing;
      var props = this.itemProps;

      if (svg.select("#" + this.id).empty()) {
        svg.selectAll("g")
          .data([props], function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .style("fill", function(d) { return d.fill; })
          .style("fill-opacity", function(d) { return d.fill_opacity; })
          .style("stroke", function(d) { return d.stroke; })
          .style("stroke-opacity", function(d) { return d.stroke_opacity; })
          .style("stroke-dasharray", function(d) { return d.stroke_dasharray; })
          .style("stroke-width", function(d) { return d.stroke_width; });
      }

      var itemsvg = svg.select("#" + this.id);

      for (var i = 0; i < this.shapes.length; i++) {
        var shape = this.shapes[i],
            tag = this.svgtags[i],
            pipe = this.pipes[shape];

        var shapesvg = itemsvg.select("#" + shape);

        if (shapesvg.empty()) {
          shapesvg = itemsvg.selectAll("#" + shape)
            .data([{}]).enter().append("g")
            .attr("id", shape);
        }

        shapesvg.selectAll(tag)
          .data(pipe, function(d) { return d.id; }).exit().remove();
        shapesvg.selectAll(tag)
          .data(pipe, function(d) { return d.id; }).enter().append(tag)
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .style("fill", function(d) { return d.fill; })
          .style("fill-opacity", function(d) { return d.fill_opacity; })
          .style("stroke", function(d) { return d.stroke; })
          .style("stroke-opacity", function(d) { return d.stroke_opacity; })
          .style("stroke-dasharray", function(d) { return d.stroke_dasharray; })
          .style("stroke-width", function(d) { return d.stroke_width; });

        switch (shape) {
          case "circle":
            shapesvg.selectAll(tag)
              .data(pipe, function(d) { return d.id; })
              .attr("cx", function(d) { return d.cx; })
              .attr("cy", function(d) { return d.cy; })
              .attr("r", function(d) { return d.r; });
            break;
          case "diamond":
            shapesvg.selectAll(tag)
              .data(pipe, function(d) { return d.id; })
              .attr("points", function(d) { return d.points; });
            break;
          default:  // rect
            shapesvg.selectAll(tag)
              .data(pipe, function(d) { return d.id; })
              .attr("x", function(d) { return d.x; })
              .attr("y", function(d) { return d.y; })
              .attr("width", function(d) { return d.width; })
              .attr("height", function(d) { return d.height; });
        }
      }
    };

    PlotPoint.prototype.clear = function(scope) {
      scope.maing.select("#" + this.id).remove();
    };

    return PlotPoint;
  };
  beaker.bkoFactory('PlotPoint', ['plotUtils', retfunc]);
})();