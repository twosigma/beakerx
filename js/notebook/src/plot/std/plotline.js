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
  const PlotUtils = require("../utils/PlotUtils").default;
  const PlotTip = require("../PlotTip").default;
  const PlotColorUtils = require("../utils/PlotColorUtils").default;
  const BigNumberUtils = require("beakerx_shared/lib/utils/BigNumberUtils").default;

  var PlotLine = function(data){
    _.extend(this, data); // copy properties to itself
    this.format();
  };

  // constants
  PlotLine.prototype.respR = 5;
  PlotLine.prototype.plotClass = "plot-line";
  PlotLine.prototype.respClass = "plot-resp plot-respdot";
  PlotLine.prototype.actionClass = "item-clickable item-onkey";

  PlotLine.prototype.setHighlighted = function(scope, highlighted) {
    var svg = scope.maing;
    var itemsvg = svg.select("#" + this.id);
    itemsvg.selectAll("path")
      .transition()
      .duration(PlotUtils.getHighlightDuration())
      .style("stroke-width", function(d) {
        return PlotUtils.getHighlightedSize(d.st_w, highlighted);
      })
  };

  PlotLine.prototype.format = function() {
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
      "d" : null
    };
    this.elementProps = [];
    this.elementLabels = [];
  };

  PlotLine.prototype.render = function(scope){
    if (this.showItem === false) {
      this.clear(scope);
      return;
    }
    this.filter(scope);
    this.prepare(scope);
    if (this.vlength === 0) {
      this.clear(scope);
    } else {
      this.draw(scope);
    }
  };

  PlotLine.prototype.getRange = function(eles = this.elements) {
    var range = {
      xl : Infinity,
      xr : -Infinity,
      yl : Infinity,
      yr : -Infinity,
    };
    for (var i = 0; i < eles.length; i++) {
      var ele = eles[i];
      range.xl = BigNumberUtils.min(range.xl, ele.x);
      range.xr = BigNumberUtils.max(range.xr, ele.x);
      range.yl = Math.min(range.yl, ele.y);
      range.yr = Math.max(range.yr, ele.y);
    }
    return range;
  };

  PlotLine.prototype.applyAxis = function(xAxis, yAxis) {
    this.xAxis = xAxis;
    this.yAxis = yAxis;

    for (var i = 0; i < this.elements.length; i++) {
      var ele = this.elements[i];
      ele.x = xAxis.getPercent(ele.x);
      ele.y = yAxis.getPercent(ele.y);
    }
  };

  PlotLine.prototype.filter = function(scope) {
    var eles = this.elements;
    if (this.isUnorderedItem === true) {
      // cannot do truncation on unordered item, force rendering all
      this.vindexL = 0;
      this.vindexR = eles.length - 1;
      this.vlength = eles.length;
      return;
    }
    var l = PlotUtils.upper_bound(eles, "x", scope.plotFocus.focus.xl),
      r = PlotUtils.upper_bound(eles, "x", scope.plotFocus.focus.xr) + 1;

    l = Math.max(l, 0);
    r = Math.min(r, eles.length - 1);

    if (l > r || l == r && eles[l].x < scope.plotFocus.focus.xl) {
      // nothing visible, or all elements are to the left of the svg, vlength = 0
      l = 0;
      r = -1;
    }

    this.vindexL = l;
    this.vindexR = r;
    this.vlength = r - l + 1;
  };

  PlotLine.prototype.useSecondYAxis = function(scope) {
    var axisLabelExist = this.yAxisLabel !== undefined && this.yAxisLabel !== null;
    return axisLabelExist && scope.plotRange.data2scrYi_r;
  };

  PlotLine.prototype.getYMapper = function(scope) {
    return this.useSecondYAxis(scope) ? scope.plotRange.data2scrYi_r : scope.plotRange.data2scrYi;
  };

  PlotLine.prototype.prepare = function(scope) {
    var focus = scope.plotFocus.getFocus();
    var eles = this.elements,
      eleprops = this.elementProps,
      elelabels = this.elementLabels,
      tipids = this.tipIds;
    var mapX = scope.plotRange.data2scrXi,
      mapY = this.getYMapper(scope);
    var pstr = "";

    eleprops.length = 0;
    elelabels.length = 0;

    for (var i = this.vindexL; i <= this.vindexR; i++) {
      var ele = eles[i];
      if (i === this.vindexL) {
        pstr += "M";
      } else if (i === this.vindexL + 1) {
        if (this.interpolation !== "curve") pstr += "L";
        else pstr += "C";
      }
      var x = mapX(ele.x), y = mapY(ele.y);

      if (PlotUtils.rangeAssert([x, y])) {
        eleprops.length = 0;
        return;
      }

      var nxtp = x + "," + y + " ";

      if (this.useToolTip === true && focus.yl <= ele.y && ele.y <= focus.yr) {
        var id = this.id + "_" + i;
        var prop = {
          "id" : id,
          "idx" : this.index,
          "ele" : ele,
          "isresp" : true,
          "cx" : x,
          "cy" : y,
          "tooltip_cx": x,
          "tooltip_cy": y,
          "tooltip_r": 5,
          "op" : scope.tips[id] == null ? 0 : 1
        };
        eleprops.push(prop);
      }

      if (i < this.vindexR) {
        if (this.interpolation === "none") {
          var ele2 = eles[i + 1];
          var x2 = mapX(ele2.x);

          if (PlotUtils.rangeAssert([x2])) {
            eleprops.length = 0;
            return;
          }

          nxtp += x + "," +y + " " + x2 + "," + y + " ";

        } else if (this.interpolation === "curve") {
          // TODO curve implementation
        }
      }
      pstr += nxtp;

      if(ele.itemLabel || this.showItemLabel){
        var labelMargin = 3;

        var label = {
          "id": "label_" + id,
          "text": ele.itemLabel ? ele.itemLabel : ele._y,
          "x": x,
          "y": y - labelMargin
        };
        elelabels.push(label);
      }

    }
    if (pstr.length > 0) {
      this.itemProps.d = pstr;
    }
  };

  PlotLine.prototype.draw = function(scope) {
    var svg = scope.maing;
    var props = this.itemProps,
      eleprops = this.elementProps,
      elelabels = this.elementLabels;

    if (svg.select("#" + this.id).empty()) {
      svg.selectAll("g")
        .data([props], function(d){ return d.id; }).enter().append("g")
        .attr("id", function(d) { return d.id; });
    }

    var itemsvg = svg.select("#" + this.id);

    itemsvg.selectAll("path")
      .data(props, function(d) { return d.id; }).exit().remove();
    itemsvg.selectAll("path")
      .data([props], function(d) { return d.id; }).enter().insert("path", ':first-child')
      .attr("class", this.plotClass + " " + this.actionClass)
      .style("stroke", function(d) { return d.st; })
      .style("stroke-dasharray", function(d) { return d.st_da; })
      .style("stroke-width", function(d) { return d.st_w; })
      .style("stroke-opacity", function(d) { return d.st_op; });
    itemsvg.select("path")
      .attr("d", props.d);

    if (this.useToolTip === true) {
      itemsvg.selectAll("circle")
        .data(eleprops, function(d) { return d.id; }).exit().remove();
      itemsvg.selectAll("circle")
        .data(eleprops, function(d) { return d.id; }).enter().append("circle")
        .attr("id", function(d) { return d.id; })
        .attr("class", this.respClass + " " + this.actionClass)
        .style("stroke", this.tip_color);
      itemsvg.selectAll("circle")
        .data(eleprops, function(d) { return d.id; })
        .attr("cx", function(d) { return d.tooltip_cx; })
        .attr("cy", function(d) { return d.tooltip_cy; })
        .attr("r", this.respR )
        .style("opacity", function(d) { return d.op; });
    }
    itemsvg.selectAll("text").remove();
    itemsvg.selectAll("text")
      .data(elelabels, function(d) { return d.id; }).enter().append("text")
      .attr("id", function(d) { return d.id; })
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("text-anchor", "middle")
      .style("fill", "black")
      .style("stroke", "none")
      .text(function(d) {
        return d.text;
      });
  };

  PlotLine.prototype.clear = function(scope) {
    scope.maing.select("#" + this.id).selectAll("*").remove();
    this.hideTips(scope);
  };

  PlotLine.prototype.hideTips = function(scope, hidden) {
    PlotTip.hideTips(scope, this.id, hidden);
  };

  PlotLine.prototype.createTip = function(ele) {
    if (ele.tooltip)
      return ele.tooltip;
    var xAxis = this.xAxis,
      yAxis = this.yAxis;
    var valx = PlotUtils.getTipString(ele._x, xAxis, true),
      valy = PlotUtils.getTipString(ele._y, yAxis, true);
    var tip = {};
    if (this.legend != null) {
      tip.title = this.legend;
    }
    tip.x = valx;
    tip.y = valy;
    return PlotUtils.createTipString(tip);
  };

  return PlotLine;
});