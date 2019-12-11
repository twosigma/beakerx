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
  _
) {

  const PlotUtils = require('../utils/PlotUtils').default;
  const PlotTip = require('../PlotTip').default;

  var PlotLodLine = function(data){
    _.extend(this, data); // copy properties to itself
    this.format();
  };
  PlotLodLine.prototype.respR = 5;
  PlotLodLine.prototype.plotClass = "plot-line";
  PlotLodLine.prototype.respClass = "plot-resp plot-respdot";
  PlotLodLine.prototype.actionClass = "item-clickable item-onkey";

  PlotLodLine.prototype.render = function(scope, samples, gid){
    if (gid == null) { gid = ""; }
    this.elementSamples = samples;
    this.prepare(scope, gid);
    this.draw(scope, gid);
  };

  PlotLodLine.prototype.setZoomHash = function(hash) {
    this.zoomHash = hash;
  };

  PlotLodLine.prototype.format = function() {
    if (this.color != null) {
      this.tip_color = PlotColorUtils.createColor(this.color, this.color_opacity);
    } else {
      this.tip_color = "gray";
    }
    this.itemProps = {
      "id" : this.id,
      "st" : this.color,
      "st_op" : this.color_opacity,
      "st_w" : this.width,
      "st_da" : this.stroke_dasharray,
      "d" : ""
    };
    this.elementProps = [];
  };

  PlotLodLine.prototype.prepare = function(scope, gid) {
    var focus = scope.plotFocus.getFocus();
    var eleprops = this.elementProps;
    var mapX = scope.plotRange.data2scrXi,
      mapY = scope.plotRange.data2scrYi;
    var pstr = "", skipped = false;

    eleprops.length = 0;

    var samples = this.elementSamples;
    for (var i = 0; i < samples.length; i++) {
      var ele = samples[i];
      if (i === 0) {
        pstr += "M";
      } else if (i === 1) {
        pstr += "L";
      }
      var x = mapX(ele.x), y = mapY(ele.y);
      if (Math.abs(x) > 1E6 || Math.abs(y) > 1E6) {
        skipped = true;
        break;
      }

      var nxtp = x + "," + y + " ";

      if (focus.yl <= ele.y && ele.y <= focus.yr) {
        var hashid = this.id + "_" + this.zoomHash + "_" + ele.hash + gid;

        var prop = {
          "id" : hashid,
          "idx" : this.index,
          "ele" : ele,
          "g" : gid,
          "isresp" : true,
          "cx" : x,
          "cy" : y,
          "op" : scope.tips[hashid] == null ? 0 : 1
        };
        eleprops.push(prop);
      }

      if (i < samples.length - 1) {
        if (this.interpolation === "none") {
          var ele2 = samples[i + 1];
          var x2 = mapX(ele2.x);
          nxtp += x + "," + y + " " + x2 + "," + y + " ";
        } else if (this.interpolation === "curve") {
          // TODO curve implementation
        }
      }

      pstr += nxtp;
    }

    if (skipped === true) {
      console.error("data not shown due to too large coordinate");
    }
    if (pstr.length > 0) {
      this.itemProps.d = pstr;
    }
  };

  PlotLodLine.prototype.setHighlighted = function(scope, highlighted) {
    var svg = scope.maing;
    var itemsvg = svg.select("#" + this.id);
    itemsvg.selectAll("path")
      .transition()
      .duration(PlotUtils.getHighlightDuration())
      .style("stroke-width", function(d) {
        return PlotUtils.getHighlightedSize(d.st_w, highlighted);
      })
  };

  PlotLodLine.prototype.draw = function(scope, gid) {
    var svg = scope.maing;
    var props = this.itemProps,
      eleprops = this.elementProps;

    if (svg.select("#" + this.id).empty()) {
      svg.selectAll("g")
        .data([props], function(d){ return d.id; }).enter().append("g")
        .attr("id", function(d) { return d.id; });
    }

    var groupid = this.id + "_" + gid;
    var itemsvg = svg.select("#" + this.id);

    if (itemsvg.select("#" + groupid).empty()) {
      itemsvg.selectAll("#" + groupid)
        .data([props], function(d){ return d.id; }).enter().append("g")
        .attr("id", groupid);
    }

    itemsvg.selectAll("path")
      .data([props]).enter().append("path")
      .attr("class", this.plotClass + " " + this.actionClass)
      .style("stroke", function(d) { return d.st; })
      .style("stroke-dasharray", function(d) { return d.st_da; })
      .style("stroke-width", function(d) { return d.st_w; })
      .style("stroke-opacity", function(d) { return d.st_op; });
    itemsvg.select("path")
      .attr("d", props.d);

    if (scope.stdmodel.useToolTip === true) {
      itemsvg.selectAll("circle")
        .data(eleprops, function(d) { return d.id; }).exit().remove();
      itemsvg.selectAll("circle")
        .data(eleprops, function(d) { return d.id; }).enter().append("circle")
        .attr("id", function(d) { return d.id; })
        .attr("class", this.respClass + " " + this.actionClass)
        .style("stroke", this.tip_color)
        .attr("r", this.respR);
      itemsvg.selectAll("circle")
        .data(eleprops, function(d) { return d.id; })
        .attr("cx", function(d) { return d.cx; })
        .attr("cy", function(d) { return d.cy; })
        .style("opacity", function(d) { return d.op; });
    }
  };

  PlotLodLine.prototype.hideTips = function(scope, hidden) {
    PlotTip.hideTips(scope, this.id, hidden);
  };

  return PlotLodLine;

});
