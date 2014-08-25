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
    var PlotLodPoint = function(data){
      _(this).extend(data); // copy properties to itself
      this.format();
    };

    PlotLodPoint.prototype.plotClass = "plot-point";
    PlotLodPoint.prototype.respClass = "plot-resp";
    PlotLodPoint.prototype.shapes = ["rect", "diamond", "circle"];
    PlotLodPoint.prototype.svgtags = ["rect", "polygon", "circle"];

    PlotLodPoint.prototype.format = function() {
      this.zoomHash = plotUtils.randomString(3);
      if (this.color != null) {
        this.tip_color = plotUtils.createColor(this.color, this.color_opacity);
      } else {
        this.tip_color = "gray";
      }
      this.itemProps = {
        "id" : this.id,
        "fi" : this.color,
        "fi_op": this.color_opacity,
        "st": this.stroke,
        "st_op" : this.stroke_opacity,
        "st_w": this.stroke_width,
        "st_da": this.stroke_dasharray
      };

      this.elementProps = [];
    };

    PlotLodPoint.prototype.render = function(scope, samples, samplesSize, gid){
      if (gid == null) { gid = ""; }
      this.elementSamples = samples;
      this.sizeSamples = samplesSize;
      this.prepare(scope, gid);
      this.draw(scope, gid);
    };

    PlotLodPoint.prototype.zoomLevelChanged = function(scope) {
      this.zoomHash = plotUtils.randomString(3);
      this.clearTips(scope);
    };

    PlotLodPoint.prototype.prepare = function(scope, gid) {
      var focus = scope.focus;
      var eles = this.elementSamples,
          eleprops = this.elementProps;
      var mapX = scope.data2scrXi,
          mapY = scope.data2scrYi;
      var fixed = scope.renderFixed;

      eleprops.length = 0;

      for (var i = 0; i < eles.length; i++) {
        var ele = eles[i];
        if (ele.y < focus.yl || ele.y > focus.yr) { continue; }
        var x = mapX(ele.x), y = mapY(ele.avg);
        var s = this.sizeSamples[i].avg;

        if (plotUtils.rangeAssert([x, y])) {
          eleprops.length = 0;
          return;
        }

        var hashid = this.id + "_" + this.zoomHash + "_" + ele.hash;
        var prop = {
          "id" :  hashid,
          "idx" : this.index,
          "ele" : ele,
          "g" : gid,
          "fi" : ele.color,
          "fi_op" : ele.color_opacity,
          "st" : ele.stroke,
          "st_op" : ele.stroke_opacity,
          "st_w" : ele.stroke_width,
          "st_da" : ele.stroke_dasharray,
          "t_x" : x,
          "t_y" : y
        };
        // lod point does not accept shape for individual element
        switch (this.shape) {
          case "diamond":
            var pstr = "";
            pstr += (x - s) + "," + (y    ) + " ";
            pstr += (x    ) + "," + (y - s) + " ";
            pstr += (x + s) + "," + (y    ) + " ";
            pstr += (x    ) + "," + (y + s) + " ";
            _(prop).extend({
              "pts" : pstr
            });
            break;
          case "circle":
            _(prop).extend({
              "cx" : x,
              "cy" : y,
              "r" : s
            });
            break;
          default:    // rect
            _(prop).extend({
              "x" : x - s / 2,
              "y" : y - s / 2,
              "w" : s,
              "h" : s
            });
        }
        eleprops.push(prop);
      }
    };

    PlotLodPoint.prototype.draw = function(scope, gid) {
      var svg = scope.maing;
      var props = this.itemProps,
          eleprops = this.elementProps;
      var shape = this.shape;
      var tag = this.svgtags[this.shapes.indexOf(shape)];

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
      itemsvg.select("#" + groupid)
        .attr("class", this.plotClass)
        .style("fill", props.fi)
        .style("fill-opacity", props.fi_op)
        .style("stroke", props.st)
        .style("stroke-opacity", props.st_op)
        .style("stroke-dasharray", props.st_da)
        .style("stroke-width", props.st_w);

      var groupsvg = itemsvg.select("#" + groupid);

      if (groupsvg.empty()) {
        groupsvg = itemsvg.selectAll("#" + shape)
          .data([{}]).enter().append("g")
          .attr("id", shape);
      }

      groupsvg.selectAll(tag)
        .data(eleprops, function(d) { return d.id; }).exit().remove();
      groupsvg.selectAll(tag)
        .data(eleprops, function(d) { return d.id; }).enter().append(tag)
        .attr("id", function(d) { return d.id; })
        .attr("class", this.respClass);

      switch (shape) {
        case "circle":
          groupsvg.selectAll(tag)
            .data(eleprops, function(d) { return d.id; })
            .attr("cx", function(d) { return d.cx; })
            .attr("cy", function(d) { return d.cy; })
            .attr("r", function(d) { return d.r; });
          break;
        case "diamond":
          groupsvg.selectAll(tag)
            .data(eleprops, function(d) { return d.id; })
            .attr("points", function(d) { return d.pts; });
          break;
        default:  // rect
          groupsvg.selectAll(tag)
            .data(eleprops, function(d) { return d.id; })
            .attr("x", function(d) { return d.x; })
            .attr("y", function(d) { return d.y; })
            .attr("width", function(d) { return d.w; })
            .attr("height", function(d) { return d.h; });
      }
    };

    PlotLodPoint.prototype.clearTips = function(scope) {
      var eleprops = this.elementProps;
      for (var i = 0; i < eleprops.length; i++) {
        var sel = scope.jqcontainer.find("#tip_" + eleprops[i].id).remove();
        delete scope.tips[eleprops[i].id];  // must clear from tip drawing queue
      }
    };

    return PlotLodPoint;
  };
  beaker.bkoFactory('PlotLodPoint', ['plotUtils', retfunc]);
})();
