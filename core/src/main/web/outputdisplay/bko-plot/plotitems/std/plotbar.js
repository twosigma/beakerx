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

    var PlotBar = function(data) {
      _(this).extend(data); // copy properties to itself
      this.format();
    };
    PlotBar.prototype.plotClass = "plot-bar";
    PlotBar.prototype.respClass = "plot-resp";

    PlotBar.prototype.setHighlighted = function(scope, highlighted) {
      var itemsvg = scope.maing.select("#" + this.id);
      var diff = plotUtils.getHighlightedDiff(highlighted) / 2;
      itemsvg.selectAll("rect")
        .transition()
        .duration(plotUtils.getHighlightDuration())
        .attr("x", function(d) { return d.x - diff; })
        .attr("y", function(d) { return d.y - diff; })
        .attr("width", function(d) { return plotUtils.getHighlightedSize(d.w, highlighted); })
        .attr("height", function(d) { return plotUtils.getHighlightedSize(d.h, highlighted); });

    };

    PlotBar.prototype.format = function() {
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
      this.elementLabels = [];
    };

    PlotBar.prototype.render = function(scope) {
      if (this.showItem == false) {
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

    PlotBar.prototype.getRange = function(){
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
        range.xr = plotUtils.max(range.xr, ele.x2);
        range.yl = Math.min(range.yl, ele.y);
        range.yr = Math.max(range.yr, ele.y2);
      }
      return range;
    };

    PlotBar.prototype.applyAxis = function(xAxis, yAxis) {
      this.xAxis = xAxis;
      this.yAxis = yAxis;
      for (var i = 0; i < this.elements.length; i++) {
        var ele = this.elements[i];
        ele.x = xAxis.getPercent(ele.x);
        ele.y = yAxis.getPercent(ele.y);
        ele.x2 = xAxis.getPercent(ele.x2);
        ele.y2 = yAxis.getPercent(ele.y2);
      }
    };

    PlotBar.prototype.filter = function(scope) {
      var eles = this.elements;
      var l = plotUtils.upper_bound(eles, "x2", scope.focus.xl) + 1,
          r = plotUtils.upper_bound(eles, "x", scope.focus.xr);

      l = Math.max(l, 0);
      r = Math.min(r, eles.length - 1);

      if (l > r || l == r && eles[l].x2 < focus.xl) {
        // nothing visible, or all elements are to the left of the svg, vlength = 0
        l = 0;
        r = -1;
      }
      this.vindexL = l;
      this.vindexR = r;
      this.vlength = r - l + 1;
    };

    PlotBar.prototype.prepare = function(scope) {
      var w = this.width, sw;
      var focus = scope.focus;
      var mapX = scope.data2scrXi,
          mapY = scope.data2scrYi;
      var eleprops = this.elementProps,
          eles = this.elements;
      var elelabels = this.elementLabels;

      eleprops.length = 0;
      elelabels.length = 0;
      for (var i = this.vindexL; i <= this.vindexR; i++) {
        var ele = eles[i];
        if (ele.y2 < focus.yl || ele.y > focus.yr) { continue; }

        var x = mapX(ele.x), x2 = mapX(ele.x2);
        if (x2 - x < 1) x2 = x + 1;
        var y = mapY(ele.y), y2 = mapY(ele.y2);
        sw = x2 - x;
        if (y < y2) { continue; } // prevent negative height


        if (plotUtils.rangeAssert([x, x2, y, y2])) {
          eleprops.length = 0;
          return;
        }

        var id = this.id + "_" + i;
        var prop = {
          "id" : id,
          "idx" : this.index,
          "ele" : ele,
          "x" : x,
          "y" : y2,
          "w" : sw,
          "h" : y - y2,
          "fi" : ele.color,
          "fi_op" : ele.color_opacity,
          "st" : ele.stroke,
          "st_w" : ele.stroke_width,
          "st_op" : ele.stroke_opacity
        };

        eleprops.push(prop);

        if(this.showItemLabel){
          var labely;
          var labelMargin = 3;
          var labelHeight = plotUtils.fonts.labelHeight;
          var isBarPositive = ele._y2 != this.base;

          var labelText = isBarPositive ? ele._y2 : ele._y;

          switch(this.labelPosition){
            case "VALUE_OUTSIDE":
              labely = isBarPositive ? y2 - labelMargin : y + labelHeight + labelMargin;
              break;
            case "VALUE_INSIDE":
              labely = isBarPositive ? y2 + labelHeight + labelMargin : y - labelMargin;
              break;
            case "BASE_OUTSIDE":
              labely = isBarPositive ? y + labelHeight + labelMargin : y2 - labelMargin;
              break;
            case "BASE_INSIDE":
              labely = isBarPositive ? y - labelMargin : y2 + labelHeight + labelMargin;
              break;
            default: //CENTER
              var center = (y - y2)/2;
              labely = isBarPositive ? y2 + center + labelHeight/2 : y - center + labelHeight/2;
              break;
          }

          var label = {
            "id": "label_" + id,
            "text": labelText,
            "x": x + sw/2,
            "y": labely
          };
          elelabels.push(label);
        }
      }
    };

    PlotBar.prototype.draw = function(scope) {
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
        .style("fill", props.fi)
        .style("fill-opacity", props.fi_op)
        .style("stroke", props.st)
        .style("stroke-opacity", props.st_op)
        .style("stroke-width", props.st_w);


      var itemsvg = svg.select("#" + this.id);
      var respClass = this.useToolTip === true ? this.respClass : null;
      itemsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; }).exit().remove();
      itemsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; }).enter().append("rect")
        .attr("id", function(d) { return d.id; })
        .attr("class", respClass)
        .style("fill", function(d) { return d.fi; })
        .style("fill-opacity", function(d) { return d.fi_op; })
        .style("stroke", function(d) { return d.st; })
        .style("stroke-opacity", function(d) { return d.st_op; })
        .style("stroke-width", function(d) { return d.st_w; });
      itemsvg.selectAll("rect")
        .data(eleprops, function(d) { return d.id; })
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("width", function(d) { return d.w; })
        .attr("height", function(d) { return d.h; });
      itemsvg.selectAll("text").remove();
      itemsvg.selectAll("text")
        .data(elelabels, function(d) { return d.id; }).enter().append("text")
        .attr("id", function(d) { return d.id; })
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("text-anchor", "middle")
        .style("fill", "black")
        .text(function(d) {
          return d.text;
        });
    };

    PlotBar.prototype.clear = function(scope) {
      scope.maing.select("#" + this.id).selectAll("*").remove();
      this.clearTips(scope);
    };

    PlotBar.prototype.clearTips = function(scope) {
      var eleprops = this.elementProps;
      var itemid = this.id;
      _(scope.tips).each(function(value, key){
        if (key.search("" + itemid) === 0) {
          scope.jqcontainer.find("#tip_" + key).remove();
          delete scope.tips[key];
        }
      });
    };

    PlotBar.prototype.createTip = function(ele, g, model) {
      var xAxis = this.xAxis,
          yAxis = this.yAxis;
      var tip = {};
      if (this.legend != null) {
        tip.title = this.legend;
      }
      if (model.orientation === 'HORIZONTAL'){
        tip.value = plotUtils.getTipString(plotUtils.minus(ele._x2, ele._x), xAxis, true);
      }else{
        tip.x = plotUtils.getTipString(plotUtils.div(plotUtils.plus(ele._x, ele._x2), 2), xAxis, true);
        tip.yTop = plotUtils.getTipString(ele._y2, yAxis, true);
        tip.yBtm = plotUtils.getTipString(ele._y, yAxis, true);
      }
      return plotUtils.createTipString(tip);
    };

    return PlotBar;
  };
  beaker.bkoFactory('PlotBar', ['plotUtils', retfunc]);
})();
