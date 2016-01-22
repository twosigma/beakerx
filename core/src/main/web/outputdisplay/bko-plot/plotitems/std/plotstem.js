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
  var retfunc = function(plotUtils, plotTip) {
    var PlotStem = function(data) {
      _.extend(this, data);
      this.format();
    };

    PlotStem.prototype.plotClass = "plot-stem";
    PlotStem.prototype.respClass = "plot-resp";
    PlotStem.prototype.actionClass = "item-clickable item-onkey";

    PlotStem.prototype.setHighlighted = function(scope, highlighted) {
      var svg = scope.maing;
      var props = this.itemProps;

      svg.select("#" + this.id)
        .transition()
        .duration(plotUtils.getHighlightDuration())
        .style("stroke-width", plotUtils.getHighlightedSize(props.st_w, highlighted));
    };

    PlotStem.prototype.format = function() {
      if (this.color != null) {
        this.tip_color = plotUtils.createColor(this.color, this.color_opacity);
      } else {
        this.tip_color = "gray";
      }
      this.itemProps = {
        "id" : this.id,
        "st" : this.color,
        "st_op": this.color_opacity,
        "st_w": this.width,
        "st_da": this.stroke_dasharray
      };
      this.elementProps = [];
      this.elementLabels = [];
    };

    PlotStem.prototype.render = function(scope) {
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

    PlotStem.prototype.getRange = function() {
      var eles = this.elements;
      var range = {
        xl : Infinity,
        xr : -Infinity,
        yl : Infinity,
        yr : -Infinity,
      };
      for (var i = 0; i < eles.length; i++) {
        var ele = eles[i];
        range.xl = plotUtils.min(range.xl, ele.x);
        range.xr = plotUtils.max(range.xr, ele.x2 ? ele.x2 : ele.x);
        range.yl = Math.min(range.yl, ele.y);
        range.yr = Math.max(range.yr, ele.y2);
      }
      return range;
    };

    PlotStem.prototype.applyAxis = function(xAxis, yAxis) {
      this.xAxis = xAxis;
      this.yAxis = yAxis;
      for (var i = 0; i < this.elements.length; i++) {
        var ele = this.elements[i];
        ele.x = xAxis.getPercent(ele.x);
        if(ele.x2)
          ele.x2 = xAxis.getPercent(ele.x2);
        ele.y = yAxis.getPercent(ele.y);
        ele.y2 = yAxis.getPercent(ele.y2);
      }
    };

    PlotStem.prototype.filter = function(scope) {
      var eles = this.elements;
      var l = plotUtils.upper_bound(eles, "x", scope.focus.xl) + 1,
          r = plotUtils.upper_bound(eles, "x", scope.focus.xr);

      l = Math.max(l, 0);
      r = Math.min(r, eles.length - 1);

      if (l > r || l == r && eles[l].x < scope.focus.xl) {
        // nothing visible, or all elements are to the left of the svg, vlength = 0
        l = 0;
        r = -1;
      }
      this.vindexL = l;
      this.vindexR = r;
      this.vlength = r - l + 1;
    };

    PlotStem.prototype.prepare = function(scope) {
      var focus = scope.focus;
      var eles = this.elements,
          eleprops = this.elementProps,
          elelabels = this.elementLabels;
      var mapX = scope.data2scrXi,
          mapY = scope.data2scrYi;

      eleprops.length = 0;
      elelabels.length = 0;

      for (var i = this.vindexL; i <= this.vindexR; i++) {
        var ele = eles[i];
        if (ele.y2 < focus.yl || ele.y > focus.yr) { continue; }

        var x = mapX(ele.x), y = mapY(ele.y), y2 = mapY(ele.y2);
        var x2 = (ele.x2) ? mapX(ele.x2) : x;

        if (plotUtils.rangeAssert([x, y, y2])) {
          eleprops.length = 0;
          return;
        }

        var prop = {
          "id" : this.id + "_" + i,
          "idx" : this.index,
          "ele" : ele,
          "st" : ele.color,
          "st_op": ele.color_opacity,
          "st_w" : ele.width,
          "st_da": ele.stroke_dasharray,
          "x1" : x,
          "y1" : y,
          "x2" : x2,
          "y2" : y2
        };
        eleprops.push(prop);

        if(this.showItemLabel){
          var labelMargin = 3;
          var labelHeight = plotUtils.fonts.labelHeight;
          var base = this.base != null ? this.base : 0;
          var isPositiveStem = ele._y2 != base;

          var labelText = isPositiveStem ? ele._y2 : ele._y;
          var labely = isPositiveStem ? y2 - labelMargin : y + labelHeight + labelMargin;

          var label = {
            "id": "label_" + prop.id,
            "text": labelText,
            "x": x,
            "y": labely
          };
          elelabels.push(label);
        }

      }
    };

    PlotStem.prototype.draw = function(scope) {
      var svg = scope.maing;
      var props = this.itemProps,
          eleprops = this.elementProps,
          elelabels = this.elementLabels;

      if (svg.select("#" + this.id).empty()) {
        svg.selectAll("g")
          .data([props], function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; });
      }
      svg.select("#" + this.id)
        .attr("class", this.plotClass)
        .style("stroke", props.st)
        .style("stroke-opacity", props.st_op)
        .style("stroke-dasharray", props.st_da)
        .style("stroke-width", props.st_w);

      var respClass = this.useToolTip === true ? this.respClass : null;
      var itemsvg = svg.select("#" + this.id);
      itemsvg.selectAll("line")
        .data(eleprops, function(d) { return d.id; }).exit().remove();
      itemsvg.selectAll("line")
        .data(eleprops, function(d) { return d.id; }).enter().append("line")
        .attr("id", function(d) { return d.id; })
        .attr("class", respClass + " " + this.actionClass)
        .style("stroke", function(d) { return d.st; })
        .style("stroke-opacity", function(d) { return d.st_op; })
        .style("stroke-dasharray", function(d) { return d.st_da; })
        .style("stroke-width", function(d) { return d.st_da; });
      itemsvg.selectAll("line")
        .data(eleprops, function(d) { return d.id; })
        .attr("x1", function(d) { return d.x1; })
        .attr("x2", function(d) { return d.x2; })
        .attr("y1", function(d) { return d.y1; })
        .attr("y2", function(d) { return d.y2; });
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

    PlotStem.prototype.clear = function(scope) {
      scope.maing.select("#" + this.id).selectAll("*").remove();
      this.clearTips(scope);
    };

    PlotStem.prototype.clearTips = function(scope) {
      plotTip.clearTips(scope, this.id);
    };

    PlotStem.prototype.createTip = function(ele, g, model) {
      var xAxis = this.xAxis,
          yAxis = this.yAxis;
      var tip = {};
      if (this.legend != null) {
        tip.title = this.legend;
      }
      if (model.orientation === 'HORIZONTAL'){
        tip.value = plotUtils.getTipString(plotUtils.minus(ele._x2, ele._x), xAxis, true);
      }else {
        tip.x = plotUtils.getTipString(ele._x, xAxis, true);
        tip.yTop = plotUtils.getTipString(ele._y2, yAxis, true);
        tip.yBtm = plotUtils.getTipString(ele._y, yAxis, true);
      }
      return plotUtils.createTipString(tip);
    };

    return PlotStem;
  };
  beaker.bkoFactory('PlotStem', ['plotUtils', 'plotTip',  retfunc]);
})();
