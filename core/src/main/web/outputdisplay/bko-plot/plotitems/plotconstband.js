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
    var PlotConstband = function(data){
      $.extend(true, this, data); // copy properties to itself
      this.format();
    };

    PlotConstband.prototype.render = function(scope){
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

    PlotConstband.prototype.getRange = function() {
      var eles = this.elements;
      var range = {
        xl : 1E100,
        xr : -1E100,
        yl : 1E100,
        yr : -1E100
      };
      for (var i = 0; i < eles.length; i++) {
        var ele = eles[i];
        if (ele.type === "x") {
          range.xl = Math.min(range.xl, ele.x);
          range.xr = Math.max(range.xr, ele.x2);
        } else if (ele.type === "y") {
          range.yl = Math.min(range.yl, ele.y);
          range.yr = Math.max(range.yr, ele.y2);
        }
      }
      return range;
    };

    PlotConstband.prototype.format = function(){
      this.itemProps = {
        "id" : this.id,
        "class" : "plot-const",
        "fill" : this.color,
        "fill_opacity": this.color_opacity,
        "stroke" : this.stroke,
        "stroke_opacity": this.stroke_opacity,
        "stroke_width" : this.stroke_width,
        "stroke_dasharray" : this.stroke_dasharray
      };

      this.elementProps = [];
      for (var i = 0; i < this.elements.length; i++) {
        var ele = this.elements[i];
        var line = {
          "id" : this.id + "_" + i,
          "fill" : ele.color,
          "fill_opacity" : ele.color_opacity,
          "stroke" : ele.stroke,
          "stroke_opacity" : ele.storke_opacity,
          "stroke_width" : ele.stroke_width,
          "stroke_dasharray" : ele.stroke_dasharray
        };
        this.elementProps.push(line);
      }
    };

    PlotConstband.prototype.filter = function(scope) {
      // do nothing and show everything
      var l = 0, r = this.elements.length - 1;
      this.vindexL = l;
      this.vindexR = r;
      this.vlength = r - l + 1;
    };


    PlotConstband.prototype.prepare = function(scope) {
      var focus = scope.focus;
      var eles = this.elements,
          eleprops = this.elementProps;
      var mapX = scope.data2scrX,
          mapY = scope.data2scrY;
      var lMargin = scope.layout.leftLayoutMargin,
          bMargin = scope.layout.bottomLayoutMargin,
          tMargin = scope.layout.topLayoutMargin,
          rMargin = scope.layout.rightLayoutMargin;
      var W = scope.jqsvg.width(),
          H = scope.jqsvg.height();

      this.pipe = [];

      for (var i = this.vindexL; i <= this.vindexR; i++) {
        var ele = eles[i];

        this.pipe.push(eleprops[i]);

        // TODO how to distribute work between draw and jq update?
        if (ele.type === "x") {
          if (ele.x > focus.xr || ele.x2 < focus.xl) { continue; }

          var x = mapX(ele.x),
              x2 = mapX(ele.x2);
          x = Math.max(x, lMargin);
          x2 = Math.min(x2, W - rMargin);

          _(eleprops[i]).extend({
            "x" : x,
            "width" : x2 - x,
            "y" : tMargin,
            "height" : H - bMargin - tMargin
          });
        } else if (ele.type === "y") {
          if (ele.y > focus.yr || ele.y2 < focus.yl) { continue; }

          var y = mapY(ele.y),
              y2 = mapY(ele.y2);
          y = Math.min(y, H - bMargin);
          y2 = Math.max(y2, tMargin);

          _(eleprops[i]).extend({
            "x" : lMargin,
            "width" : W - lMargin - rMargin,
            "y" : y2,
            "height" : y - y2
          });
          var text = plotUtils.getTipString(ele._y, scope.stdmodel.yAxis);

          _(eleprops[i]).extend({
            "left" : function(w, h) { return lMargin + scope.labelPadding.x; }, //  why padding?
            "top" : function(w, h) { return y - w / 2; },
            "label_text" : text
          });
        }
      }
    };


    PlotConstband.prototype.draw = function(scope) {
      var svg = scope.maing;
      var props = this.itemProps,
          pipe = this.pipe;

      if (svg.select("#" + this.id).empty()) {
        svg.selectAll("g")
          .data([props], function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .style("fill", function(d) { return d.fill; })
          .style("fill-opacity", function(d) { return d.fill_opacity; })
          .style("stroke", function(d) { return d.stroke; })
          .style("stroke-opacity", function(d) { return d.stroke_opacity; })
          .style("stroke-width", function(d) { return d.stroke_width; });
      }

      var itemsvg = svg.select("#" + this.id);

      itemsvg.selectAll("rect")
        .data(pipe, function(d) { return d.id; }).exit().remove();
      itemsvg.selectAll("rect")
        .data(pipe, function(d) { return d.id; }).enter().append("rect")
        .attr("id", function(d) { return d.id; })
        .attr("class", function(d) { return d.class; })
        .style("fill", function(d) { return d.fill; })
        .style("fill-opacity", function(d) { return d.fill_opacity; })
        .style("stroke", function(d) { return d.stroke; })
        .style("stroke-opacity", function(d) { return d.stroke_opacity; })
        .style("stroke-width", function(d) { return d.stroke_width; });
      itemsvg.selectAll("rect")
        .data(pipe, function(d) { return d.id; })
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("width", function(d) { return d.width; })
        .attr("height", function(d) { return d.height; });
    };

    PlotConstband.prototype.clear = function(scope) {
      var eleprops = this.elementProps;
      scope.maing.select("#" + this.id).remove();
      for (var i = 0; i < this.elements.length; i++) {
        scope.jqcontainer.find("#" + eleprops.labelid).remove();
      }
    };

    return PlotConstband;
  };
  beaker.bkoFactory('PlotConstband', ['plotUtils', retfunc]);
})();