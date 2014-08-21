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
    var PlotLodRiver = function(data){
      _(this).extend(data); // copy properties to itself
      this.format();
    };
    PlotLodRiver.prototype.respWidth = 5;
    PlotLodRiver.prototype.respMinHeight = 5;
    PlotLodRiver.prototype.plotClass = "";
    PlotLodRiver.prototype.respClass = "plot-resp plot-respstem";

    PlotLodRiver.prototype.format = function() {
      if (this.color != null) {
        this.tip_color = plotUtils.createColor(this.color, this.color_opacity);
      } else {
        this.tip_color = "gray";
      }
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
      this.zoomHash = plotUtils.randomString(3);
    };

    PlotLodRiver.prototype.zoomLevelChanged = function(scope) {
      this.zoomHash = plotUtils.randomString(3);
      this.clearTips(scope);
    };

    PlotLodRiver.prototype.render = function(scope, elements, gid){
      if (gid == null) { gid = ""; }
      this.elements = elements;
      this.prepare(scope, gid);
      this.draw(scope, gid);
    };

    PlotLodRiver.prototype.prepare = function(scope, gid) {
      var focus = scope.focus;
      var eles = this.elements,
          eleprops = this.elementProps;
      var mapX = scope.data2scrXi,
          mapY = scope.data2scrYi;
      var pstr = "";

      eleprops.length = 0;

      var eles = this.elements;
      for (var i = 0; i < eles.length; i++) {
        var ele = eles[i];
        var x = mapX(ele.x), y = mapY(ele.min), y2 = mapY(ele.max);

        if (plotUtils.rangeAssert([x, y, y2])) {
          eleprops.length = 0;
          return;
        }

        pstr += x + "," + y + " ";

        if (ele.min <= focus.yr && ele.max >= focus.yl) {
          var hashid = this.id + "_" + this.zoomHash + "_" + ele.hash;
          var prop = {
            "id" : hashid,
            "idx" : this.index,
            "ele" : ele,
            "g" : gid,
            "isresp" : true,
            "x" : x - this.respWidth / 2,
            "y" : y2,
            "h" : Math.max(y - y2, this.respMinHeight),  // min height to be hoverable
            "t_x" : x,
            "t_y" : (y + y2) / 2,
            "op" : scope.tips[hashid] == null ? 0 : 1
          };
          eleprops.push(prop);
        }
      }

      for (var i = eles.length - 1; i >= 0; i--) {
        var ele = eles[i];
        var x = mapX(ele.x), y2 = mapY(ele.max);
        pstr += x + "," + y2 + " ";
      }
      if (pstr.length > 0) {
        this.itemProps.pts = pstr;
      }
    };

    PlotLodRiver.prototype.draw = function(scope, gid) {
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
      groupsvg.select("polygon")
        .attr("points", props.pts)
        .attr("class", this.plotClass)
        .style("fill", props.fi)
        .style("fill-opacity", props.fi_op)
        .style("stroke", props.st)
        .style("stroke-opacity", props.st_op)
        .style("stroke-width", props.st_w);

      if (scope.stdmodel.useToolTip === true) {
        groupsvg.selectAll("rect")
          .data(eleprops, function(d) { return d.id; }).exit().remove();
        groupsvg.selectAll("rect")
          .data(eleprops, function(d) { return d.id; }).enter().append("rect")
          .attr("id", function(d) { return d.id; })
          .attr("class", this.respClass)
          .attr("width", this.respWidth)
          .style("stroke", this.tip_color);

        groupsvg.selectAll("rect")
          .data(eleprops, function(d) { return d.id; })
          .attr("x", function(d) { return d.x; })
          .attr("y", function(d) { return d.y; })
          .attr("height", function(d) { return d.h; })
          .style("opacity", function(d) { return d.op; });
      }
    };

    PlotLodRiver.prototype.clearTips = function(scope) {
      var eleprops = this.elementProps;
      for (var i = 0; i < eleprops.length; i++) {
        var sel = scope.jqcontainer.find("#tip_" + eleprops[i].id).remove();
        delete scope.tips[eleprops[i].id];  // must clear from tip drawing queue
      }
    };

    return PlotLodRiver;
  };
  beaker.bkoFactory('PlotLodRiver', ['plotUtils', retfunc]);
})();
