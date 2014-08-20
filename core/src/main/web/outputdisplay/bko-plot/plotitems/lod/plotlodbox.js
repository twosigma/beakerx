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
    var PlotLodBox = function(data){
      _(this).extend(data); // copy properties to itself
      this.format();
    };

    PlotLodBox.prototype.plotClassBox = "plot-resp plot-lodbox";
    PlotLodBox.prototype.plotClassBoxLine = "plot-lodboxline";

    PlotLodBox.prototype.format = function() {
      this.zoomHash = plotUtils.randomString(3);
      if (this.color != null) {
        this.tip_color = plotUtils.createColor(this.color, this.color_opacity);
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

    PlotLodBox.prototype.render = function(scope, samples, gid){
      if (gid == null) { gid = ""; }
      this.elementSamples = samples;
      this.prepare(scope, gid);
      this.draw(scope, gid);
    };

    PlotLodBox.prototype.zoomLevelChanged = function(scope) {
      this.zoomHash = plotUtils.randomString(3);
      this.clearTips(scope);
    };

    PlotLodBox.prototype.prepare = function(scope, gid) {
      var focus = scope.focus;
      var eles = this.elements,
          eleprops = this.elementProps;
      var mapX = scope.data2scrX,
          mapY = scope.data2scrY;
      var skipped = false;

      eleprops.length = 0;

      var samples = this.elementSamples;
      for (var i = 0; i < samples.length; i++) {
        var ele = samples[i];
        var x = mapX(ele.xl), x2 = mapX(ele.xr),
            y = mapY(ele.max), y2 = mapY(ele.min),
            y3 = mapY(ele.avg);
        if (Math.abs(x) > 1E6 || Math.abs(y) > 1E6 || Math.abs(x2) > 1E6 || Math.abs(y2) > 1E6) {
          skipped = true;
          break;
        }
        var hashid = this.id + "_" + this.zoomHash + "_" + i;
        var prop = {
          "id" : hashid,
          "idx" : this.index,
          "ele" : ele,
          "g" : gid,
          "x" : x + 1,
          "y" : y,
          "w" : x2 - x - 2,
          "h" : y2 - y,
          "ym" : y3,
          "t_x" : x,
          "t_y" : y
        };
        eleprops.push(prop);
      }
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
        // lod boxes are plotted with special coloring (inversed color)
        itemsvg.selectAll("#" + groupid)
          .data([props], function(d){ return d.id; }).enter().append("g")
          .attr("id", groupid);
      }

      var groupsvg = itemsvg.select("#" + groupid);

      // draw lines
      groupsvg.selectAll("line")
        .data(eleprops, function(d) { return d.id + "l"; }).exit().remove();
      groupsvg.selectAll("line")
        .data(eleprops, function(d) { return d.id + "l"; }).enter().append("line")
        .attr("id", function(d) { return d.id + "l"; })
        .attr("class", this.plotClassBoxLine)
        .style("stroke", this.tip_color);
      groupsvg.selectAll("line")
        .data(eleprops, function(d) { return d.id + "l"; })
        .attr("x1", function(d) { return d.x; })
        .attr("x2", function(d) { return d.x + d.w; })
        .attr("y1", function(d) { return d.ym; })
        .attr("y2", function(d) { return d.ym; });

      // draw boxes
      groupsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; }).exit().remove();
      groupsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; }).enter().append("rect")
        .attr("id", function(d) { return d.id; })
        .attr("class", this.plotClassBox)
        .style("stroke", this.tip_color);
      groupsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; })
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("width", function(d) { return d.w; })
        .attr("height", function(d) { return d.h; });
    };

    PlotLodBox.prototype.clearTips = function(scope) {
      var eleprops = this.elementProps;
      for (var i = 0; i < eleprops.length; i++) {
        var sel = scope.jqcontainer.find("#tip_" + eleprops[i].id).remove();
        delete scope.tips[eleprops[i].id];  // must clear from tip drawing queue
      }
    };

    return PlotLodBox;
  };
  beaker.bkoFactory('PlotLodBox', ['plotUtils', retfunc]);
})();
