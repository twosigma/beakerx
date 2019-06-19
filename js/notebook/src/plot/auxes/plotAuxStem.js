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

  var PlotAuxStem = function(data){
    _.extend(this, data); // copy properties to itself
    this.format();
  };

  PlotAuxStem.prototype.plotClass = "";

  PlotAuxStem.prototype.format = function() {
    this.itemProps = {
      "id" : this.id,
      "st" : this.color,
      "st_op" : this.color_opacity,
      "st_w" : this.width,
      "st_da" : this.stroke_dasharray
    };
    this.elementProps = [];
  };

  PlotAuxStem.prototype.render = function(scope, elements, gid){
    this.elements = elements;
    this.prepare(scope, gid);
    this.draw(scope, gid);
  };

  PlotAuxStem.prototype.prepare = function(scope, gid) {
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
      var x = mapX(ele.x),
        y = mapY(ele.y), y2 = mapY(ele.y2);

      if (PlotUtils.rangeAssert([x, y, y2])) {
        eleprops.length = 0;
        return;
      }

      var id = this.id + "_" + i;
      var prop = {
        "id" : id,
        "x" : x,
        "y" : y,
        "y2" : y2
      };
      eleprops.push(prop);
    }
  };

  PlotAuxStem.prototype.setHighlighted = function(scope, highlighted, gid) {
    if(gid == null) { gid = ""; }
    var svg = scope.maing;
    var props = this.itemProps;

    var groupid = this.id + "_" + gid;
    var itemsvg = svg.select("#" + this.id);

    itemsvg.select("#" + groupid)
      .transition()
      .duration(PlotUtils.getHighlightDuration())
      .style("stroke-width", PlotUtils.getHighlightedSize(props.st_w, highlighted));
  };

  PlotAuxStem.prototype.draw = function(scope, gid) {
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
      .style("stroke", props.st)
      .style("stroke-opacity", props.st_op)
      .style("stroke-width", props.st_w)
      .style("stroke-dasharray", props.st_da);

    var groupsvg = itemsvg.select("#" + groupid);

    // draw stems
    groupsvg.selectAll("line")
      .data(eleprops, function(d) { return d.id; }).exit().remove();
    groupsvg.selectAll("line")
      .data(eleprops, function(d) { return d.id; }).enter().append("line")
      .attr("id", function(d) { return d.id; })
      .attr("class", this.plotClass)
      .style("stroke", function(d) { return d.st; })
      .style("stroke-opacity", function(d) { return d.st_op; })
      .style("stroke-width", function(d) { return d.st_w; })
      .style("stroke-dasharray", function(d) { return d.st_da; });
    groupsvg.selectAll("line")
      .data(eleprops, function(d) { return d.id; })
      .attr("x1", function(d) { return d.x; })
      .attr("x2", function(d) { return d.x; })
      .attr("y1", function(d) { return d.y; })
      .attr("y2", function(d) { return d.y2; });
  };

  return PlotAuxStem;

});
