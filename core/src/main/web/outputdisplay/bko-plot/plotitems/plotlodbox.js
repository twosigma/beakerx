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
      this.sampleStep = -1;
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

    PlotLodBox.prototype.render = function(scope, samples){
      this.elementSamples = samples;
      this.prepare(scope);
      this.draw(scope);
    };

    PlotLodBox.prototype.zoomLevelChanged = function() {
      this.zoomHash = plotUtils.randomString(3);
    };

    PlotLodBox.prototype.prepare = function(scope) {
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
          "iidx" : this.index,
          "eidx" : i,
          "cls" : this.plotclass,
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

    PlotLodBox.prototype.draw = function(scope) {
      var svg = scope.maing;
      var props = this.itemProps,
          eleprops = this.elementProps;

      if (svg.select("#" + this.id).empty()) {
        svg.selectAll("g")
          .data([props], function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; });
      }

      var itemsvg = svg.select("#" + this.id);

      // draw lines
      itemsvg.selectAll("line")
        .data(eleprops, function(d) { return d.id + "l"; }).exit().remove();
      itemsvg.selectAll("line")
        .data(eleprops, function(d) { return d.id + "l"; }).enter().append("line")
        .attr("id", function(d) { return d.id + "l"; })
        .attr("class", this.plotClassBoxLine)
        .style("stroke", this.tip_color);
      itemsvg.selectAll("line")
        .data(eleprops, function(d) { return d.id + "l"; })
        .attr("x1", function(d) { return d.x; })
        .attr("x2", function(d) { return d.x + d.w; })
        .attr("y1", function(d) { return d.ym; })
        .attr("y2", function(d) { return d.ym; });

      // draw boxes
      itemsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; }).exit().remove();
      itemsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; }).enter().append("rect")
        .attr("id", function(d) { return d.id; })
        .attr("class", this.plotClassBox)
        .style("stroke", this.tip_color);
      itemsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; })
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("width", function(d) { return d.w; })
        .attr("height", function(d) { return d.h; });
    };

    return PlotLodBox;
  };
  beaker.bkoFactory('PlotLodBox', ['plotUtils', retfunc]);
})();
