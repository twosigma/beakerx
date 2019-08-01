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

  const PlotUtils = require('../utils/PlotUtils').default;

  var PlotAuxBox = function(data){
    _.extend(this, data); // copy properties to itself
    this.format();
  };

  PlotAuxBox.prototype.plotClass = "";

  PlotAuxBox.prototype.format = function() {
    this.itemProps = {
      "id" : this.id,
      "fi" : this.color,
      "fi_op": this.color_opacity,
      "st": this.stroke,
      "st_w": this.stroke_width,
      "st_op": this.stroke_opacity
    };
    this.elementProps = [];
    this.widthShrink = 0;
  };

  PlotAuxBox.prototype.setWidthShrink = function(shrink) {
    this.widthShrink = shrink;
  };

  PlotAuxBox.prototype.render = function(scope, elements, gid){
    this.elements = elements;
    this.prepare(scope, gid);
    this.draw(scope, gid);
  };

  PlotAuxBox.prototype.prepare = function(scope, gid) {
    var focus = scope.plotFocus.getFocus();
    var eles = this.elements,
      eleprops = this.elementProps;
    var mapX = scope.plotRange.data2scrXi,
      mapY = scope.plotRange.data2scrYi;
    var skipped = false;

    eleprops.length = 0;

    var eles = this.elements;
    for (var i = 0; i < eles.length; i++) {
      var ele = eles[i];
      var x = mapX(ele.x), x2 = mapX(ele.x2),
        y = mapY(ele.y), y2 = mapY(ele.y2);

      if (PlotUtils.rangeAssert([x, x2, y, y2])) {
        eleprops.length = 0;
        return;
      }

      var id = this.id + "_" + i;
      var prop = {
        "id" : id,
        "x" : x + this.widthShrink,
        "y" : y2,
        "w" : x2 - x - this.widthShrink * 2,
        "h" : y - y2
      };
      eleprops.push(prop);
    }
  };

  PlotAuxBox.prototype.setHighlighted = function(scope, highlighted, gid) {
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

  PlotAuxBox.prototype.draw = function(scope, gid) {
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
      // aux box are ploted as bars with normal coloring
      // if special coloring is needed, it is set from the loader
      itemsvg.selectAll("#" + groupid)
        .data([props]).enter().append("g")
        .attr("id", groupid);
    }
    itemsvg.select("#" + groupid)
      .style("fill", props.fi)
      .style("fill-opacity", props.fi_op)
      .style("stroke", props.st)
      .style("stroke-opacity", props.st_op)
      .style("stroke-width", props.st_w);

    var groupsvg = itemsvg.select("#" + groupid);

    // draw boxes
    groupsvg.selectAll("rect")
      .data(eleprops, function(d) { return d.id; }).exit().remove();
    groupsvg.selectAll("rect")
      .data(eleprops, function(d) { return d.id; }).enter().append("rect")
      .attr("id", function(d) { return d.id; })
      .attr("class", this.plotClass)
      .style("fill", function(d) { return d.fi; })
      .style("fill-opacity", function(d) { return d.fi_op; })
      .style("stroke", function(d) { return d.st; })
      .style("stroke-opacity", function(d) { return d.st_op; })
      .style("stroke-width", function(d) { return d.st_w; });

    groupsvg.selectAll("rect")
      .data(eleprops, function(d) { return d.id; })
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("width", function(d) { return d.w; })
      .attr("height", function(d) { return d.h; });
  };

  return PlotAuxBox;

});
