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

  var PlotAuxRiver = function(data){
    _.extend(this, data); // copy properties to itself
    this.format();
  };
  PlotAuxRiver.prototype.plotClass = "";

  PlotAuxRiver.prototype.format = function() {
    this.itemProps = {
      "id" : this.id,
      "fi" : this.color,
      "fi_op" : this.color_opacity,
      "st" : this.stroke,
      "st_w" : this.stroke_width,
      "st_op" : this.stroke_opacity,
      "pts" : null
    };
    this.elementProps = [];
  };

  PlotAuxRiver.prototype.render = function(scope, elements, gid){
    if (gid == null) { gid = ""; }
    this.elements = elements;
    this.prepare(scope, gid);
    this.draw(scope, gid);
  };

  PlotAuxRiver.prototype.prepare = function(scope, gid) {
    var focus = scope.plotFocus.getFocus();
    var eles = this.elements,
      eleprops = this.elementProps;
    var mapX = scope.plotRange.data2scrXi,
      mapY = scope.plotRange.data2scrYi;
    var pstr = "";

    eleprops.length = 0;

    var eles = this.elements;
    for (var i = 0; i < eles.length; i++) {
      var ele = eles[i];
      var x = mapX(ele.x), y = mapY(ele.y), y2 = mapY(ele.y2);

      if (PlotUtils.rangeAssert([x, y, y2])) {
        eleprops.length = 0;
        return;
      }
      pstr += x + "," + y + " ";
    }

    for (var i = eles.length - 1; i >= 0; i--) {
      var ele = eles[i];
      var x = mapX(ele.x), y2 = mapY(ele.y2);
      pstr += x + "," + y2 + " ";
    }
    if (pstr.length > 0) {
      this.itemProps.pts = pstr;
    }
  };

  PlotAuxRiver.prototype.setHighlighted = function(scope, highlighted, gid) {
    if(gid == null) { gid = ""; }
    var svg = scope.maing;
    var groupid = this.id + "_" + gid;
    var itemsvg = svg.select("#" + this.id);

    var groupsvg = itemsvg.select("#" + groupid);
    groupsvg.selectAll("polygon")
      .transition()
      .duration(PlotUtils.getHighlightDuration())
      .style("stroke-width", function(d) { return PlotUtils.getHighlightedSize(d.st_w, highlighted); });
  };


  PlotAuxRiver.prototype.draw = function(scope, gid) {
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

    var groupsvg = itemsvg.select("#" + groupid);

    groupsvg.selectAll("polygon")
      .data([props]).enter().append("polygon");
    groupsvg.selectAll("polygon")
      .attr("points", props.pts)
      .attr("class", this.plotClass)
      .style("fill", function(d) { return d.fi; })
      .style("fill-opacity", function(d) { return d.fi_op; })
      .style("stroke", function(d) { return d.st; })
      .style("stroke-opacity", function(d) { return d.st_op; })
      .style("stroke-width", function(d) { return d.st_w; });
  };

  return PlotAuxRiver;

});
