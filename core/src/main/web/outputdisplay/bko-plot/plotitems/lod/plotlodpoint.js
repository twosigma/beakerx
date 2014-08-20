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

    PlotLodPoint.prototype.plotClassBox = "plot-lodbox";
    PlotLodPoint.prototype.respClass = "plot-resp";
    PlotLodPoint.prototype.plotClassBoxLine = "plot-lodboxline";

    PlotLodPoint.prototype.format = function() {
      this.zoomHash = plotUtils.randomString(3);
      if (this.color != null) {
        this.tip_color = plotUtils.createColor(this.color, this.color_opacity);
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
        "st_da" : this.stroke_dasharray,
        "d" : ""
      };
      this.elementProps = [];
    };

    PlotLodPoint.prototype.setWidthShrink = function(shrink) {
      this.widthShrink = shrink;
    };

    PlotLodPoint.prototype.render = function(scope, samples, gid){
      if (gid == null) { gid = ""; }
      this.elementSamples = samples;
      this.prepare(scope, gid);
      this.draw(scope, gid);
    };

    PlotLodPoint.prototype.zoomLevelChanged = function(scope) {
      this.zoomHash = plotUtils.randomString(3);
      this.clearTips(scope);
    };

    PlotLodPoint.prototype.prepare = function(scope, gid) {
      var focus = scope.focus;
      var eles = this.elements,
          eleprops = this.elementProps;
      var mapX = scope.data2scrXi,
          mapY = scope.data2scrYi;
      var fixed = scope.renderFixed;

      eleprops.length = 0;

      this.avgOn = true;

      var samples = this.elementSamples;
      for (var i = 0; i < samples.length; i++) {
        var ele = samples[i];
        var x = mapX(ele.xl), x2 = mapX(ele.xr),
            y = mapY(ele.max), y2 = mapY(ele.min);

        if (ele.avg == null) {
          this.avgOn = false;
        }


        if (plotUtils.rangeAssert([x, x2, y, y2])) {
          eleprops.length = 0;
          return false;
        }

        var hashid = this.id + "_" + this.zoomHash + "_" + i;
        var prop = {
          "id" : hashid,
          "idx" : this.index,
          "ele" : ele,
          "g" : gid,
          "x" : x + this.widthShrink,
          "y" : y,
          "w" : Number((x2 - x - this.widthShrink * 2).toFixed(fixed)),
          "h" : Number((y2 - y).toFixed(fixed)),
          "x2" : Number((x2 - this.widthShrink).toFixed(fixed)),
          "t_x" : x,
          "t_y" : y
        };
        if (this.avgOn === true) {
          var y3 = mapY(ele.avg);
          prop.ym = y3;
        }
        eleprops.push(prop);
      }
    };

    PlotLodPoint.prototype.draw = function(scope, gid) {
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
          .attr("id", groupid)
          .style("class", this.plotClassBox)
          .style("fill", function(d) { return d.fi; })
          .style("fill-opacity", function(d) { return d.fi_op; })
          .style("stroke", function(d) { return d.st; })
          .style("stroke-opacity", function(d) { return d.st_op; });
      }

      var groupsvg = itemsvg.select("#" + groupid);

      // draw boxes
      groupsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; }).exit().remove();
      groupsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; }).enter().append("rect")
        .attr("id", function(d) { return d.id; })
        .attr("class", this.respClass);
      groupsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; })
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("width", function(d) { return d.w; })
        .attr("height", function(d) { return d.h; });

      if (this.avgOn === true) {
        // draw lines
        groupsvg.selectAll("line")
          .data(eleprops, function(d) { return d.id + "l"; }).exit().remove();
        groupsvg.selectAll("line")
          .data(eleprops, function(d) { return d.id + "l"; }).enter().append("line")
          .attr("id", function(d) { return d.id + "l"; })
          .attr("class", this.plotClassBoxLine)
          .style("stroke", props.st == null ? "gray" : props.st)
          .style("stroke-opacity", props.st_op);
        groupsvg.selectAll("line")
          .data(eleprops, function(d) { return d.id + "l"; })
          .attr("x1", function(d) { return d.x; })
          .attr("x2", function(d) { return d.x2; })
          .attr("y1", function(d) { return d.ym; })
          .attr("y2", function(d) { return d.ym; });
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
