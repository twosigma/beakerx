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
], function(
  _,
) {
  const PlotStyleUtils = require("beakerx_shared/lib/utils/PlotStyleUtils").default;

  var PlotConstband = function(data){
    _.extend(this, data); // copy properties to itself
    this.format();
  };

  PlotConstband.prototype.plotClass = "plot-constband";

  PlotConstband.prototype.format = function(){
    this.itemProps = {
      "id" : this.id,
      "fi" : this.color,
      "fi_op": this.color_opacity,
      "st" : this.stroke,
      "st_op": this.stroke_opacity,
      "st_w" : this.stroke_width,
      "st_da" : this.stroke_dasharray
    };

    this.elementProps = [];
  };

  PlotConstband.prototype.render = function(scope){
    if (this.shotItem === false) {
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

  PlotConstband.prototype.getRange = function(eles = this.elements) {
    var range = {
      xl : Infinity,
      xr : -Infinity,
      yl : Infinity,
      yr : -Infinity,
    };
    for (var i = 0; i < eles.length; i++) {
      var ele = eles[i];
      if (ele.type === "x") {
        if(ele.x !== -Infinity){
          range.xl = Math.min(range.xl, ele.x);
        }
        if(ele.x2 !== Infinity){
          range.xr = Math.max(range.xr, ele.x2);
        }
      } else if (ele.type === "y") {
        if(ele.y !== -Infinity){
          range.yl = Math.min(range.yl, ele.y);
        }
        if(ele.y2 !== Infinity){
          range.yr = Math.max(range.yr, ele.y2);
        }
      }
    }
    return range;
  };

  PlotConstband.prototype.applyAxis = function(xAxis, yAxis) {
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    for (var i = 0; i < this.elements.length; i++) {
      var ele = this.elements[i];
      if (ele.type === "x") {
        if(ele.x !== -Infinity){
          ele.x = xAxis.getPercent(ele.x);
        }
        if(ele.x2 !== Infinity){
          ele.x2 = xAxis.getPercent(ele.x2);
        }
      } else if (ele.type === "y") {
        if(ele.y !== -Infinity){
          ele.y = yAxis.getPercent(ele.y);
        }
        if(ele.y2 !== Infinity){
          ele.y2 = yAxis.getPercent(ele.y2);
        }
      }
    }
  };

  PlotConstband.prototype.filter = function(scope) {
    // do nothing and show everything
    var l = 0, r = this.elements.length - 1;
    this.vindexL = l;
    this.vindexR = r;
    this.vlength = r - l + 1;
  };

  PlotConstband.prototype.useSecondYAxis = function(scope) {
    var axisLabelExist = this.yAxisLabel !== undefined && this.yAxisLabel !== null;
    return axisLabelExist && scope.plotRange.data2scrYi_r;
  };

  PlotConstband.prototype.getYMapper = function(scope) {
    return this.useSecondYAxis(scope) ? scope.plotRange.data2scrYi_r : scope.plotRange.data2scrYi;
  };

  PlotConstband.prototype.prepare = function(scope) {
    var focus = scope.plotFocus.getFocus();
    var eles = this.elements,
      eleprops = this.elementProps;
    var mapX = scope.plotRange.data2scrXi,
      mapY = this.getYMapper(scope);
    var lMargin = scope.layout.leftLayoutMargin,
      bMargin = scope.layout.bottomLayoutMargin,
      tMargin = scope.layout.topLayoutMargin,
      rMargin = scope.layout.rightLayoutMargin;
    var W = PlotStyleUtils.safeWidth(scope.jqsvg),
      H = PlotStyleUtils.safeHeight(scope.jqsvg);

    eleprops.length = 0;

    for (var i = this.vindexL; i <= this.vindexR; i++) {
      var ele = eles[i];

      var prop = {
        "id" : this.id + "_" + i,
        "fi" : ele.color,
        "fi_op" : ele.color_opacity,
        "st" : ele.stroke,
        "st_op" : ele.storke_opacity,
        "st_w" : ele.stroke_width,
        "st_da" : ele.stroke_dasharray
      };

      // does not need range assert, clipped directly
      if (ele.type === "x") {
        if (ele.x > focus.xr || ele.x2 < focus.xl) {
          continue;
        } else {
          eleprops.push(prop);
        }

        var x = mapX(ele.x !== -Infinity ? ele.x : focus.xl),
          x2 = mapX(ele.x2 !== Infinity ? ele.x2 : focus.xr);
        x = Math.max(x, lMargin);
        x2 = Math.min(x2, W - rMargin);

        _.extend(prop, {
          "x" : x,
          "w" : x2 - x,
          "y" : tMargin,
          "h" : H - bMargin - tMargin
        });
      } else if (ele.type === "y") {
        if (ele.y > focus.yr || ele.y2 < focus.yl) {
          continue;
        } else {
          eleprops.push(prop);
        }

        var y = mapY(ele.y !== -Infinity ? ele.y : focus.yl),
          y2 = mapY(ele.y2 !== Infinity ? ele.y2 : focus.yr);
        y = Math.min(y, H - bMargin);
        y2 = Math.max(y2, tMargin);

        _.extend(prop, {
          "x" : lMargin,
          "w" : W - lMargin - rMargin,
          "y" : y2,
          "h" : y - y2
        });
      }
    }
  };


  PlotConstband.prototype.draw = function(scope) {
    var svg = scope.maing;
    var props = this.itemProps,
      eleprops = this.elementProps;

    if (svg.select("#" + this.id).empty()) {
      svg.selectAll("g")
        .data([props], function(d) { return d.id; }).enter().append("g")
        .attr("id", function(d) { return d.id; });
    }
    svg.select("#" + this.id)
      .attr("class", this.plotClass)
      .style("fill", props.fi)
      .style("fill-opacity", props.fi_op)
      .style("stroke", props.st)
      .style("stroke-opacity", props.st_op)
      .style("stroke-width", props.st_w)
      .style("stroke-dasharray", props.st_da);

    var itemsvg = svg.select("#" + this.id);

    itemsvg.selectAll("rect")
      .data(eleprops, function(d) { return d.id; }).exit().remove();
    itemsvg.selectAll("rect")
      .data(eleprops, function(d) { return d.id; }).enter().append("rect")
      .attr("id", function(d) { return d.id; })
      // does not need resp class
      .style("fill", function(d) { return d.fi; })
      .style("fill-opacity", function(d) { return d.fi_op; })
      .style("stroke", function(d) { return d.st; })
      .style("stroke-opacity", function(d) { return d.st_op; })
      .style("stroke-width", function(d) { return d.st_wi; });
    itemsvg.selectAll("rect")
      .data(eleprops, function(d) { return d.id; })
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("width", function(d) { return d.w; })
      .attr("height", function(d) { return d.h; });
  };

  PlotConstband.prototype.clear = function(scope) {
    scope.maing.select("#" + this.id).selectAll("*").remove();
  };

  PlotConstband.prototype.hideTips = function(scope, hidden) {
    // do nothing, no tip for this type
  };

  return PlotConstband;

});