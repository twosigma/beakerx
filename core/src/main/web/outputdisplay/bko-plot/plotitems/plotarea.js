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

    var PlotArea = function(data){
      $.extend(true, this, data);
      this.format();
    };

    PlotArea.prototype.render = function(scope){
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

    PlotArea.prototype.getRange = function(){
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
        range.yr = Math.max(range.yr, ele.y2);
      }
      return range;
    };

    PlotArea.prototype.format = function(){
      this.itemProps = {
        "id" : this.id,
        "class" : "plot-area",
        "fill" : this.color,
        "fill_opacity": this.color_opacity,
        "stroke": this.stroke,
        "stroke_width": this.stroke_width,
        "stroke_opacity": this.stroke_opacity,
        "points" : ""
      };
      this.elementProps = [];
      for (var i = 0; i < this.elements.length; i++) {
        var ele = this.elements[i];
        var point = {
          "id" : this.id + "_" + i,
          "class" : "plot-resp plot-respstem",
          "isresp" : true,
          "tip_text" : ele.tip_text,
          "tip_color" : this.color == null ? "gray" : this.color,
          "width" : 5
        };
        this.elementProps.push(point);
      }

      this.resppipe = [];
    };

    PlotArea.prototype.filter = function(scope) {
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

    PlotArea.prototype.prepare = function(scope) {
      var focus = scope.focus;
      var eles = this.elements,
          eleprops = this.elementProps;
      var pstr = "", skipped = false;
      var mapX = scope.data2scrX,
          mapY = scope.data2scrY;

      this.resppipe.length = 0;

      for (var i = this.vindexL; i <= this.vindexR; i++) {
        var ele = eles[i];
        var x = mapX(ele.x), y = mapY(ele.y), y2 = mapY(ele.y2);
        if (Math.abs(ele.x) > 1E6 || Math.abs(ele.y) > 1E6) {
          skipped = true;
          break;
        }
        if (this.interpolation === "linear") {
          pstr += x + "," + y + " ";
        } else if (this.interpolation === "none" && i < this.vindexR) {
          var ele2 = eles[i + 1];
          var x2 = mapX(ele2.x);
          if (Math.abs(x2) > 1E6) {
            skipped = true;
            break;
          }
          pstr += x + "," + y + " " + x2 + "," + y + " ";
        }

        if (ele.y <= focus.yr && ele.y2 >= focus.yl) {
          _(eleprops[i]).extend({
            "x" : x - eleprops[i].width / 2,
            "y" : y2,
            "height" : Math.max(y - y2, 5), // at least height 5 to be hoverable
            "tip_x" : x,
            "tip_y" : (y + y2) / 2,
            "opacity" : scope.tips[eleprops[i].id] == null ? 0 : 1
          });
          this.resppipe.push(eleprops[i]);
        }
      }

      for (var i = this.vindexR; i >= this.vindexL; i--) {
        var ele = eles[i];
        var x = mapX(ele.x), y2 = ele.y2 == null ? mapY(focus.yl) : mapY(ele.y2);
        if (Math.abs(y2) > 1E6) { // x is already checked above
          skipped = true;
          break;
        }
        if (this.interpolation === "linear") {
          pstr += x + "," + y2 + " ";
        } else if (this.interpolation === "none" && i < this.vindexR) {
          var ele2 = eles[i + 1];
          var x2 = mapX(ele2.x);
          pstr += x2 + "," + y2 + " " + x + "," + y2 + " ";
        }
      }

      if (skipped === true) {
        console.error("data not shown due to too large coordinate");
      }

      if (pstr.length > 0) {
        this.itemProps.points = pstr;
      }
    };

    PlotArea.prototype.draw = function(scope) {
      var svg = scope.maing;
      var props = this.itemProps,
          resppipe = this.resppipe;

      if (svg.select("#" + this.id).empty()) {
        svg.selectAll("g")
          .data([props], function(d){ return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; });
      }

      var itemsvg = svg.select("#" + this.id);

      itemsvg.selectAll("polygon")
        .data([props]).enter().append("polygon")
        .attr("class", function(d) { return d.class; })
        .style("fill", function(d) { return d.fill; })
        .style("fill-opacity", function(d) { return d.fill_opacity; })
        .style("stroke", function(d) { return d.stroke; })
        .style("stroke-opacity", function(d) { return d.stroke_opacity; })
        .style("stroke-width", function(d) { return d.stroke_width; });
      itemsvg.select("polygon")
        .attr("points", props.points);

      if (scope.stdmodel.useToolTip === true) {
        itemsvg.selectAll("rect")
          .data(resppipe, function(d) { return d.id; }).exit().remove();
        itemsvg.selectAll("rect")
          .data(resppipe, function(d) { return d.id; }).enter().append("rect")
          .attr("id", function(d) { return d.id; })
          .attr("class", function(d) { return d.class; })
          .attr("width", function(d) { return d.width; })
          .style("stroke", function(d) { return d.tip_color; });

        itemsvg.selectAll("rect")
          .data(resppipe, function(d) { return d.id; })
          .attr("x", function(d) { return d.x; })
          .attr("y", function(d) { return d.y; })
          .attr("height", function(d) { return d.height; })
          .style("opacity", function(d) { return d.opacity; });
      }
    };

    PlotArea.prototype.clear = function(scope) {
      scope.maing.select("#" + this.id).remove();
    };

    return PlotArea;
  };
  beaker.bkoFactory('PlotArea', ['plotUtils', retfunc]);
})();