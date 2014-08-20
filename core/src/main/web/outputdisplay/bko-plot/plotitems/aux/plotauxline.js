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
    var PlotAuxLine = function(data){
      _(this).extend(data); // copy properties to itself
      this.format();
    };

    PlotAuxLine.prototype.plotClass = "";

    PlotAuxLine.prototype.format = function() {
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
        "st_w": this.stroke_width,
        "st_op": this.stroke_opacity
      };
      this.elementProps = [];
      this.widthShrink = 0;
    };

    PlotAuxLine.prototype.setWidthShrink = function(shrink) {
      this.widthShrink = shrink;
    };

    PlotAuxLine.prototype.render = function(scope, elements, gid){
      this.elements = elements;
      this.prepare(scope, gid);
      this.draw(scope, gid);
    };

    PlotAuxLine.prototype.prepare = function(scope, gid) {
      var focus = scope.focus;
      var eles = this.elements,
          eleprops = this.elementProps;
      var mapX = scope.data2scrXi,
          mapY = scope.data2scrYi;
      var skipped = false;

      eleprops.length = 0;

      var eles = this.elements;
      for (var i = 0; i < eles.length; i++) {
        var ele = eles[i];
        var x = mapX(ele.x), x2 = mapX(ele.x2),
            y = mapY(ele.y), y2 = mapY(ele.y2);

        if (plotUtils.rangeAssert([x, x2, y, y2])) {
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

    PlotAuxLine.prototype.draw = function(scope, gid) {
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
          .attr("id", groupid)
          .style("fill", function(d) { return d.fi; })
          .style("fill-opacity", function(d) { return d.fi_op; })
          .style("stroke", function(d) { return d.st; })
          .style("stroke-opacity", function(d) { return d.st_op; })
          .style("stroke-width", function(d) { return d.st_w; });
      }

      var groupsvg = itemsvg.select("#" + groupid);

      groupsvg.selectAll("path")
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

    PlotAuxLine.prototype.clearTips = function(scope) {
      var eleprops = this.elementProps;
      for (var i = 0; i < eleprops.length; i++) {
        var sel = scope.jqcontainer.find("#tip_" + eleprops[i].id).remove();
        delete scope.tips[eleprops[i].id];  // must clear from tip drawing queue
      }
    };

    return PlotAuxLine;
  };
  beaker.bkoFactory('PlotAuxLine', ['plotUtils', retfunc]);
})();
