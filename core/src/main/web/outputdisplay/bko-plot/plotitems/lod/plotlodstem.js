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
    var PlotLodStem = function(data){
      _(this).extend(data); // copy properties to itself
      this.format();
    };

    PlotLodStem.prototype.plotClass = "";
    PlotLodStem.prototype.respClass = "plot-resp";
    PlotLodStem.prototype.plotClassAvgCircle = "plot-lodavg";
    PlotLodStem.prototype.plotAvgCircleR = 2;

    PlotLodStem.prototype.format = function() {
      this.zoomHash = plotUtils.randomString(3);
      if (this.color != null) {
        this.tip_color = plotUtils.createColor(this.color, this.color_opacity);
      } else {
        this.tip_color = "gray";
      }
      this.widthShrink = 0;
      this.itemProps = {
        "id" : this.id,
        "st" : this.color,
        "st_w" : this.width,
        "st_op" : this.color_opacity,
        "st_da" : this.stroke_dasharray
      };
      this.elementProps = [];
    };

    PlotLodStem.prototype.setWidthShrink = function(shrink) {
      this.widthShrink = shrink;
    };

    PlotLodStem.prototype.render = function(scope, samples, gid){
      if (gid == null) { gid = ""; }
      this.elementSamples = samples;
      this.prepare(scope, gid);
      this.draw(scope, gid);
    };

    PlotLodStem.prototype.zoomLevelChanged = function(scope) {
      this.zoomHash = plotUtils.randomString(3);
      this.clearTips(scope);
    };

    PlotLodStem.prototype.prepare = function(scope, gid) {
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
        if (ele.max < focus.yl || ele.min > focus.yr) { continue; }
        var x = mapX(ele.x),
            y = mapY(ele.max), y2 = mapY(ele.min);

        if (ele.avg == null) {
          this.avgOn = false;
        }

        if (plotUtils.rangeAssert([x, y, y2])) {
          eleprops.length = 0;
          return false;
        }

        var hashid = this.id + "_" + this.zoomHash + "_" + ele.hash;
        var prop = {
          "id" : hashid,
          "idx" : this.index,
          "ele" : ele,
          "g" : gid,
          "x" : x,
          "y" : y,
          "y2" : y2,
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

    PlotLodStem.prototype.draw = function(scope, gid) {
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
      itemsvg.select("#" + groupid)
        .style("class", this.plotClass)
        .style("stroke", function(d) { return d.st; })
        .style("stroke-opacity", function(d) { return d.st_op; })
        .style("stroke-width", function(d) { return d.st_w; })
        .style("stroke-dasharray", function(d) { return d.st_da; });

      var groupsvg = itemsvg.select("#" + groupid);

      // draw stems
      groupsvg.selectAll("line")
        .data(eleprops, function(d) { return d.id; }).exit().remove();
      groupsvg.selectAll("line")
        .data(eleprops, function(d) { return d.id; }).enter().append("line")
        .attr("id", function(d) { return d.id; })
        .attr("class", this.respClass);
      groupsvg.selectAll("line")
        .data(eleprops, function(d) { return d.id; })
        .attr("x1", function(d) { return d.x; })
        .attr("x2", function(d) { return d.x; })
        .attr("y1", function(d) { return d.y; })
        .attr("y2", function(d) { return d.y2; });

      if (this.avgOn === true) {
        var clr = props.st == null ? "gray" : props.st;
        // draw avg lines
        groupsvg.selectAll("circle")
          .data(eleprops, function(d) { return d.id + "l"; }).exit().remove();
        groupsvg.selectAll("circle")
          .data(eleprops, function(d) { return d.id + "l"; }).enter().append("circle")
          .attr("id", function(d) { return d.id + "l"; })
          .attr("class", this.plotClassAvgCircle)
          .attr("r", this.plotAvgCircleR)
          .style("stroke", clr)
          .style("stroke-opacity", props.st_op);
        groupsvg.selectAll("circle")
          .data(eleprops, function(d) { return d.id + "l"; })
          .attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.ym; });
      }
    };

    PlotLodStem.prototype.clearTips = function(scope) {
      var eleprops = this.elementProps;
      for (var i = 0; i < eleprops.length; i++) {
        var sel = scope.jqcontainer.find("#tip_" + eleprops[i].id).remove();
        delete scope.tips[eleprops[i].id];  // must clear from tip drawing queue
      }
    };

    return PlotLodStem;
  };
  beaker.bkoFactory('PlotLodStem', ['plotUtils', retfunc]);
})();
