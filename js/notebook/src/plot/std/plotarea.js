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
  const PlotUtils = require("../utils/PlotUtils").default;
  const PlotColorUtils = require("../utils/PlotColorUtils").default;
  const PlotTip = require("../PlotTip").default;
  const BigNumberUtils = require("beakerx_shared/lib/utils/BigNumberUtils").default;

  var PlotArea = function(data){
    _.extend(this, data); // copy properties to itself
    this.format();
  };

  PlotArea.prototype.respWidth = 5;
  PlotArea.prototype.respMinHeight = 5;
  PlotArea.prototype.plotClass = "plot-area";
  PlotArea.prototype.respClass = "plot-resp plot-respstem";
  PlotArea.prototype.actionClass = "item-clickable item-onkey";

  PlotArea.prototype.setHighlighted = function(scope, highlighted) {

    if(highlighted === true){
      scope.jqsvg.find("#" + this.id+ " polygon").attr("filter", "url("+window.location.pathname+"#svgAreaFilter)");
    }else{
      scope.jqsvg.find("#" + this.id+ " polygon").removeAttr("filter");
    }
  };

  PlotArea.prototype.format = function(){
    if (this.color != null) {
      this.tip_color = PlotColorUtils.createColor(this.color, this.color_opacity);
    } else {
      this.tip_color = "gray";
    }

    this.itemProps = {
      "id" : this.id,
      "fi" : this.color,
      "fi_op": this.color_opacity,
      "st": this.stroke,
      "st_w": this.stroke_width,
      "st_op": this.stroke_opacity,
      "pts" : null
    };
    this.elementProps = [];
  };

  PlotArea.prototype.render = function(scope){
    if (this.showItem === false) {
      this.clear(scope);
      return;
    }
    this.filter(scope);
    this.prepare(scope);
    this.clear(scope);
    if (this.vlength !== 0) {
      this.draw(scope);
    }
  };

  PlotArea.prototype.getRange = function(eles = this.elements){
    var range = {
      xl : Infinity,
      xr : -Infinity,
      yl : Infinity,
      yr : -Infinity
    };
    for (var i = 0; i < eles.length; i++) {
      var ele = eles[i];
      range.xl = BigNumberUtils.min(range.xl, ele.x);
      range.xr = BigNumberUtils.max(range.xr, ele.x);
      range.yl = Math.min(range.yl, ele.y);
      range.yr = Math.max(range.yr, ele.y2);
    }
    return range;
  };

  PlotArea.prototype.applyAxis = function(xAxis, yAxis) {
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    for (var i = 0; i < this.elements.length; i++) {
      var ele = this.elements[i];
      ele.x = xAxis.getPercent(ele.x);
      ele.y = yAxis.getPercent(ele.y);
      ele.y2 = yAxis.getPercent(ele.y2);
    }
  };

  PlotArea.prototype.filter = function(scope) {
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

  PlotArea.prototype.useSecondYAxis = function(scope) {
    var axisLabelExist = this.yAxisLabel !== undefined && this.yAxisLabel !== null;
    return axisLabelExist && scope.plotRange.data2scrYi_r;
  };

  PlotArea.prototype.getYMapper = function(scope) {
    return this.useSecondYAxis(scope) ? scope.plotRange.data2scrYi_r : scope.plotRange.data2scrYi;
  };

  PlotArea.prototype.prepare = function(scope) {
    var focus = scope.plotFocus.getFocus();
    var eles = this.elements,
      eleprops = this.elementProps;
    var mapX = scope.plotRange.data2scrXi,
      mapY = this.getYMapper(scope);
    var pstr = "";

    eleprops.length = 0;

    for (var i = this.vindexL; i <= this.vindexR; i++) {
      var ele = eles[i];
      var x = mapX(ele.x), y = mapY(ele.y), y2 = mapY(ele.y2);

      if (PlotUtils.rangeAssert([x, y, y2])) {
        eleprops.length = 0;
        return;
      }

      if (this.interpolation === "linear") {
        pstr += x + "," + y + " ";
      } else if (this.interpolation === "none" && i < this.vindexR) {
        var ele2 = eles[i + 1];
        var x2 = mapX(ele2.x);
        if (Math.abs(x2) > 1E6) {
          break;
        }
        pstr += x + "," + y + " " + x2 + "," + y + " ";
      }

      if (this.useToolTip === true && ele.y <= focus.yr && ele.y2 >= focus.yl) {
        var id = this.id + "_" + i;
        var prop = {
          "id" : id,
          "idx" : this.index,
          "ele" : ele,
          "isresp" : true,
          "x" : x - this.respWidth / 2,
          "y" : y2,
          "h" : Math.max(y - y2, this.respMinHeight),  // min height to be hoverable
          "op" : scope.tips[id] == null ? 0 : 1
        };
        eleprops.push(prop);
      }
    }

    for (var i = this.vindexR; i >= this.vindexL; i--) {
      var ele = eles[i];
      var x = mapX(ele.x), y2 = mapY(ele.y2);

      if (this.interpolation === "linear") {
        pstr += x + "," + y2 + " ";
      } else if (this.interpolation === "none" && i < this.vindexR) {
        var ele2 = eles[i + 1];
        var x2 = mapX(ele2.x);

        if (PlotUtils.rangeAssert([x2])) {
          eleprops.length = 0;
          return;
        }

        pstr += x2 + "," + y2 + " " + x + "," + y2 + " ";
      }
    }
    if (pstr.length > 0) {
      this.itemProps.pts = pstr;
    }
  };

  PlotArea.prototype.draw = function(scope) {
    var svg = scope.maing;
    var props = this.itemProps,
      eleprops = this.elementProps;

    if (svg.select("#" + this.id).empty()) {
      svg.selectAll("g")
        .data([props], function(d){ return d.id; }).enter().append("g")
        .attr("id", function(d) { return d.id; });
    }

    var itemsvg = svg.select("#" + this.id);

    itemsvg.selectAll("polygon")
      .data([props]).enter().append("polygon")
      .attr("class", this.plotClass + " " + this.actionClass)
      .style("fill", function(d) { return d.fi; })
      .style("fill-opacity", function(d) { return d.fi_op; })
      .style("stroke", function(d) { return d.st; })
      .style("stroke-opacity", function(d) { return d.st_op; })
      .style("stroke-width", function(d) { return d.st_w; });
    itemsvg.select("polygon")
      .attr("points", props.pts);

    if (this.useToolTip === true) {
      itemsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; }).exit().remove();
      itemsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; }).enter().append("rect")
        .attr("id", function(d) { return d.id; })
        .attr("class", this.respClass + " " + this.actionClass)
        .attr("width", this.respWidth)
        .style("stroke", this.tip_color);

      itemsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; })
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("height", function(d) { return d.h; })
        .style("opacity", function(d) { return d.op; });
    }
  };

  PlotArea.prototype.clear = function(scope) {
    scope.maing.select("#" + this.id).selectAll("*").remove();
    this.hideTips(scope);
  };

  PlotArea.prototype.hideTips = function(scope, hidden) {
    PlotTip.hideTips(scope, this.id,  hidden);
  };

  PlotArea.prototype.createTip = function(ele) {
    if (ele.tooltip)
      return ele.tooltip;

    var xAxis = this.xAxis,
      yAxis = this.yAxis;
    var tip = {};
    if (this.legend != null) {
      tip.title = this.legend;
    }
    tip.x = PlotUtils.getTipString(ele._x, xAxis, true);
    tip.yTop = PlotUtils.getTipString(ele._y2, yAxis, true);
    tip.yBtm = PlotUtils.getTipString(ele._y, yAxis, true);
    return PlotUtils.createTipString(tip);
  };

  return PlotArea;

});