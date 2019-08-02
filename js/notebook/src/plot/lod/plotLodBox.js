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
  'underscore'
], function(
    _
) {
  const PlotColorUtils = require("../utils/PlotColorUtils").default;
  const PlotTip = require("../PlotTip").default;
  const PlotUtils = require("../utils/PlotUtils").default;

  var PlotLodBox = function(data){
    _.extend(this, data); // copy properties to itself
    this.format();
  };

  PlotLodBox.prototype.plotClass = "plot-lodbox";
  PlotLodBox.prototype.respClass = "plot-resp";
  PlotLodBox.prototype.plotClassAvgLine = "plot-lodavgline";
  PlotLodBox.prototype.actionClass = "item-clickable item-onkey";

  PlotLodBox.prototype.format = function() {
    if (this.color != null) {
      this.tip_color = PlotColorUtils.createColor(this.color, this.color_opacity);
    } else {
      this.tip_color = "gray";
    }
    this.widthShrink = 0;
    this.itemProps = {
      "id" : this.id,
      "fi" : this.color,
      "fi_op" : this.color_opacity,
      "st" : this.stroke,
      "st_op" : this.stroke_opacity,
      "st_da" : this.stroke_dasharray
    };
    this.elementProps = [];
  };

  PlotLodBox.prototype.setWidthShrink = function(shrink) {
    this.widthShrink = shrink;
  };

  PlotLodBox.prototype.render = function(scope, samples, gid){
    if (gid == null) { gid = ""; }
    this.elementSamples = samples;
    this.prepare(scope, gid);
    this.draw(scope, gid);
  };

  PlotLodBox.prototype.setZoomHash = function(hash) {
    this.zoomHash = hash;
  };

  PlotLodBox.prototype.prepare = function(scope, gid) {
    var focus = scope.plotFocus.getFocus();
    var eles = this.elements,
      eleprops = this.elementProps;
    var mapX = scope.plotRange.data2scrXi,
      mapY = scope.plotRange.data2scrYi;
    var fixed = scope.renderFixed;

    eleprops.length = 0;

    this.avgOn = true;

    var samples = this.elementSamples;
    for (var i = 0; i < samples.length; i++) {
      var ele = samples[i];
      if (ele.max < focus.yl || ele.min > focus.yr) { continue; }
      var x = mapX(ele.xl), x2 = mapX(ele.xr),
        y = mapY(ele.max), y2 = mapY(ele.min);

      if (ele.avg == null) {
        this.avgOn = false;
      }

      if (PlotUtils.rangeAssert([x, x2, y, y2])) {
        eleprops.length = 0;
        return false;
      }

      var hashid = this.id + "_" + this.zoomHash + "_" + ele.hash + gid;
      var w = Number((x2 - x - this.widthShrink * 2).toFixed(fixed));
      var hasOneEl = ele.count === 1;
      var prop = {
        "id" : hashid,
        "idx" : this.index,
        "ele" : ele,
        "g" : gid,
        "x" : x + this.widthShrink,
        "y" : hasOneEl ? y - w/2 : y,
        "w" : w,
        "h" : hasOneEl ? w : Number((y2 - y).toFixed(fixed)),
        "x2" : Number((x2 - this.widthShrink).toFixed(fixed))
      };
      if (this.avgOn === true) {
        var y3 = mapY(ele.avg);
        prop.ym = y3;
      }
      eleprops.push(prop);
    }
  };

  PlotLodBox.prototype.setHighlighted = function(scope, highlighted, gid) {
    if(gid == null) {gid = "";}
    var svg = scope.maing;
    var groupid = this.id + "_" + gid;
    var itemsvg = svg.select("#" + this.id);
    var groupsvg = itemsvg.select("#" + groupid);
    var diff = PlotUtils.getHighlightedDiff(highlighted) / 2;
    groupsvg.selectAll("rect")
      .transition()
      .duration(PlotUtils.getHighlightDuration())
      .attr("x", function(d) { return d.x - diff; })
      .attr("y", function(d) { return d.y - diff; })
      .attr("width", function(d) { return PlotUtils.getHighlightedSize(d.w, highlighted); })
      .attr("height", function(d) { return PlotUtils.getHighlightedSize(d.h, highlighted); });
  };

  PlotLodBox.prototype.draw = function(scope, gid) {
    var svg = scope.maing;
    var props = this.itemProps,
      eleprops = this.elementProps;

    if (svg.select("#" + this.id).empty()) {
      svg.selectAll("g")
        .data([props], function(d) { return d.id; }).enter().append("g")
        .attr("id", function(d) { return d.id; });
    }

    var groupid = this.id + "_" + gid;
    var itemsvg = svg.select("#" + this.id);

    if (itemsvg.select("#" + groupid).empty()) {
      itemsvg.selectAll("#" + groupid)
        .data([props], function(d){ return d.id; }).enter().append("g")
        .attr("id", groupid);
    }
    itemsvg.selectAll("#" + groupid)
      .attr("class", this.plotClass)
      .style("fill", props.fi)
      .style("fill-opacity", props.fi_op)
      .style("stroke", props.st)
      .style("stroke-opacity", props.st_op);

    var groupsvg = itemsvg.select("#" + groupid);

    // draw boxes
    groupsvg.selectAll("rect")
      .data(eleprops, function(d) { return d.id; }).exit().remove();
    groupsvg.selectAll("rect")
      .data(eleprops, function(d) { return d.id; }).enter().append("rect")
      .attr("id", function(d) { return d.id; })
      .attr("class", this.respClass + " " + this.actionClass);
    groupsvg.selectAll("rect")
      .data(eleprops, function(d) { return d.id; })
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("width", function(d) { return d.w; })
      .attr("height", function(d) { return d.h; });

    if (this.avgOn === true) {
      var clr = props.st == null ? "black" : props.st;
      var avgeles = _.filter(eleprops, function(eleprop){
        return eleprop.ele.count > 1;
      });
      // draw avg lines
      groupsvg.selectAll("line")
        .data(eleprops, function(d) { return d.id + "l"; }).exit().remove();
      groupsvg.selectAll("line")
        .data(avgeles, function(d) { return d.id + "l"; }).enter().append("line")
        .attr("id", function(d) { return d.id + "l"; })
        .attr("class", this.plotClassAvgLine)
        .style("stroke", clr)
        .style("stroke-opacity", props.st_op);
      groupsvg.selectAll("line")
        .data(avgeles, function(d) { return d.id + "l"; })
        .attr("x1", function(d) { return d.x; })
        .attr("x2", function(d) { return d.x2; })
        .attr("y1", function(d) { return d.ym; })
        .attr("y2", function(d) { return d.ym; });
    }
  };

  PlotLodBox.prototype.hideTips = function(scope, hidden) {
    PlotTip.hideTips(scope, this.id, hidden);
  };

  return PlotLodBox;

});