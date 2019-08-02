/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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


define([
  'underscore',
  'd3-scale'
], function(
  _,
  d3scale
) {
  const PlotUtils = require("../utils/PlotUtils").default;
  const BigNumberUtils = require("beakerx_shared/lib/utils/BigNumberUtils").default;

  var HeatMap = function(data) {
    _.extend(this, data); // copy properties to itself
    this.format();
  };
  HeatMap.prototype.plotClass = "heatmap";
  HeatMap.prototype.respClass = "plot-resp";

  HeatMap.prototype.format = function() {

    this.tip_class = "heatmap-tooltip";
    this.tip_color = "#004C80";

    var valueStep = (this.maxValue - this.minValue) / (this.colors.length - 1);
    var domain = [];
    for(var i = 0; i < this.colors.length; i++){
      domain.push(this.minValue + valueStep * i);
    }

    this.colorScale = d3scale.scaleLinear()
      .domain(domain)
      .range(this.colors);

    this.itemProps = {
      "id": this.id
    };
    this.elementProps = [];
  };

  HeatMap.prototype.render = function(scope) {
    if (this.showItem == false) {
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

  HeatMap.prototype.getRange = function(eles = this.elements) {
    var range = {
      xl: Infinity,
      xr: -Infinity,
      yl: Infinity,
      yr: -Infinity
    };
    for (var i = 0; i < eles.length; i++) {
      var ele = eles[i];
      range.xl = BigNumberUtils.min(range.xl, ele.x);
      range.xr = BigNumberUtils.max(range.xr, ele.x2);
      range.yl = Math.min(range.yl, ele.y);
      range.yr = Math.max(range.yr, ele.y2);
    }
    return range;
  };

  HeatMap.prototype.applyAxis = function(xAxis, yAxis) {
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

  HeatMap.prototype.filter = function(scope) {
    var eles = this.elements;
    var l = PlotUtils.upper_bound(eles, "x2", scope.plotFocus.focus.xl) + 1,
      r = PlotUtils.upper_bound(eles, "x", scope.plotFocus.focus.xr);

    l = Math.max(l, 0);
    r = Math.min(r, eles.length - 1);

    if (l > r || l == r && eles[l].x2 < scope.plotFocus.focus.xl) { // TODO check 'focus' -> 'scope.focus'
      // nothing visible, or all elements are to the left of the svg, vlength = 0
      l = 0;
      r = -1;
    }
    this.vindexL = l;
    this.vindexR = r;
    this.vlength = r - l + 1;
  };

  HeatMap.prototype.prepare = function(scope) {
    var sw;
    var focus = scope.plotFocus.getFocus();
    var mapX = scope.plotRange.data2scrXi;
    var mapY = scope.plotRange.data2scrYi;
    var eleprops = this.elementProps;
    var eles = this.elements;

    eleprops.length = 0;
    for (var i = this.vindexL; i <= this.vindexR; i++) {
      var ele = eles[i];
      if (ele.y2 < focus.yl || ele.y > focus.yr) { continue; }

      var x = mapX(ele.x), x2 = mapX(ele.x2);
      if (x2 - x < 1) x2 = x + 1;
      var y = mapY(ele.y), y2 = mapY(ele.y2);
      sw = x2 - x;
      if (y < y2) { continue; } // prevent negative height


      if (PlotUtils.rangeAssert([x, x2, y, y2])) {
        eleprops.length = 0;
        return;
      }

      var id = this.id + "_" + i;
      var prop = {
        "id": id,
        "idx": this.index,
        "ele": ele,
        "x": x,
        "y": y2,
        "w": sw,
        "h": y - y2,
        "fi": this.colorScale(ele.value)
      };
      eleprops.push(prop);
    }
  };

  HeatMap.prototype.draw = function(scope) {
    var svg = scope.maing;
    var props = this.itemProps,
      eleprops = this.elementProps;

    if (svg.select("#" + this.id).empty()) {
      svg.selectAll("g")
        .data([props], function(d) { return d.id; }).enter().append("g")
        .attr("id", function(d) { return d.id; });
    }
    svg.select("#" + this.id)
      .attr("class", this.plotClass);

    var itemsvg = svg.select("#" + this.id);
    var respClass = this.useToolTip === true ? this.respClass : null;
    itemsvg.selectAll("rect")
      .data(eleprops, function(d) { return d.id; }).exit().remove();
    itemsvg.selectAll("rect")
      .data(eleprops, function(d) { return d.id; }).enter().append("rect")
      .attr("id", function(d) { return d.id; })
      .attr("class", respClass)
      .attr("shape-rendering", "crispEdges")
      .style("fill", function(d) {
        return d.fi;
      });
    itemsvg.selectAll("rect")
      .data(eleprops, function(d) { return d.id; })
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("width", function(d) { return d.w; })
      .attr("height", function(d) { return d.h; });
  };

  HeatMap.prototype.clear = function(scope) {
    scope.maing.select("#" + this.id).selectAll("*").remove();
    this.hideTips(scope);
  };

  HeatMap.prototype.hideTips = function(scope, hidden) {
    plotTip.hideTips(scope, this.id, hidden);
  };

  HeatMap.prototype.createTip = function(ele) {
    if (ele.tooltip)
      return ele.tooltip;
    return "<div>" + ele.value.toFixed(5) * 1 + "</div>";
  };

  return HeatMap;

});