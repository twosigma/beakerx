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
    var PlotPoint = function(data){
      _.extend(this, data); // copy properties to itself
      this.format();
    };

    PlotPoint.prototype.plotClass = "plot-point";
    PlotPoint.prototype.respClass = "plot-resp";
    PlotPoint.prototype.actionClass = "item-clickable item-onkey";
    PlotPoint.prototype.shapes = ["rect", "diamond", "circle"];
    PlotPoint.prototype.svgtags = ["rect", "polygon", "circle"];

    PlotPoint.prototype.setHighlighted = function(scope, highlighted) {

      var svg = scope.maing;

      var itemsvg = svg.select("#" + this.id);

      for (var i = 0; i < this.shapes.length; i++) {
        var shape = this.shapes[i],
          tag = this.svgtags[i];

        var shapesvg = itemsvg.select("#" + shape);

        switch (shape) {
          case "circle":
            shapesvg.selectAll(tag)
              .transition()
              .duration(plotUtils.getHighlightDuration())
              .attr("r", function(d) { return plotUtils.getHighlightedSize(d.r, highlighted); });
            break;
          case "diamond":
            shapesvg.selectAll(tag)
              .transition()
              .duration(plotUtils.getHighlightDuration())
              .attr("points", function(d) {
                var mapX = scope.data2scrXi, mapY = scope.data2scrYi;
                var ele = d.ele, x = mapX(ele.x), y = mapY(ele.y),
                    s = plotUtils.getHighlightedSize(ele.size, highlighted);
                var pstr = "";
                pstr += (x - s) + "," + (y    ) + " ";
                pstr += (x    ) + "," + (y - s) + " ";
                pstr += (x + s) + "," + (y    ) + " ";
                pstr += (x    ) + "," + (y + s) + " ";
                return pstr;
              });
            break;
          default:  // rect
            var diff = plotUtils.getHighlightedDiff(highlighted) / 2;
            shapesvg.selectAll(tag)
              .transition()
              .duration(plotUtils.getHighlightDuration())
              .attr("x", function(d) { return d.x - diff; })
              .attr("y", function(d) { return d.y - diff; })
              .attr("width", function(d) { return plotUtils.getHighlightedSize(d.w, highlighted); })
              .attr("height", function(d) { return plotUtils.getHighlightedSize(d.h, highlighted); });
        }
      }
    };

    PlotPoint.prototype.format = function() {
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
        "st_op" : this.stroke_opacity,
        "st_w": this.stroke_width,
        "st_da": this.stroke_dasharray
      };

      this.elementProps = {
        "rect" : [],
        "diamond" : [],
        "circle" : []
      };
      this.elementLabels = {
        "rect" : [],
        "diamond" : [],
        "circle" : []
      };
    };

    PlotPoint.prototype.render = function(scope) {
      if (this.showItem === false) {
        this.clear(scope);
        return;
      }
      this.filter(scope);
      this.prepare(scope);
      if (this.vlength === 0) {
        this.clear(scope);
      } else {
        this.draw(scope)
      }
    };

    PlotPoint.prototype.getRange = function() {
      var eles = this.elements;
      var range = {
        xl : Infinity,
        xr : -Infinity,
        yl : Infinity,
        yr : -Infinity
      };
      for (var i = 0; i < eles.length; i++) {
        var ele = eles[i];
        range.xl = plotUtils.min(range.xl, ele.x);
        range.xr = plotUtils.max(range.xr, ele.x);
        range.yl = Math.min(range.yl, ele.y);
        range.yr = Math.max(range.yr, ele.y);
      }
      return range;
    };

    PlotPoint.prototype.applyAxis = function(xAxis, yAxis) {
      this.xAxis = xAxis;
      this.yAxis = yAxis;
      for (var i = 0; i < this.elements.length; i++) {
        var ele = this.elements[i];
        ele.x = xAxis.getPercent(ele.x);
        ele.y = yAxis.getPercent(ele.y);
      }
    };

    PlotPoint.prototype.filter = function(scope) {
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

    PlotPoint.prototype.prepare = function(scope) {
      var focus = scope.focus;
      var eles = this.elements;
      var mapX = scope.data2scrXi,
          mapY = scope.data2scrYi;

      _.each(this.elementProps, function(val) {
        val.length = 0;
      });

      _.each(this.elementLabels, function(val) {
        val.length = 0;
      });

      for (var i = this.vindexL; i <= this.vindexR; i++) {
        var ele = eles[i];
        if (ele.y < focus.yl || ele.y > focus.yr) { continue; }
        var x = mapX(ele.x), y = mapY(ele.y), s = ele.size;
        var labely;

        if (plotUtils.rangeAssert([x, y])) {
          _.each(this.elementProps, function(val) {
            val.length = 0;
          });
          _.each(this.elementLabels, function(val) {
            val.length = 0;
          });
          return;
        }

        var prop = {
          "id" :  this.id + "_" + i,
          "idx" : this.index,
          "ele" : ele,
          "fi" : ele.color,
          "fi_op" : ele.color_opacity,
          "st" : ele.stroke,
          "st_op" : ele.stroke_opacity,
          "st_w" : ele.stroke_width,
          "st_da" : ele.stroke_dasharray,
          "tooltip_cx" : x,
          "tooltip_cy" : y
        };
        var shape = ele.shape == null ? this.shape : ele.shape;
        switch (shape) {
          case "diamond":
            var pstr = "";
            pstr += (x - s) + "," + (y    ) + " ";
            pstr += (x    ) + "," + (y - s) + " ";
            pstr += (x + s) + "," + (y    ) + " ";
            pstr += (x    ) + "," + (y + s) + " ";
            _.extend(prop, {
              "pts" : pstr,
              "tooltip_cx" : x
            });
            labely = y - s;
            break;
          case "circle":
            _.extend(prop, {
              "cx": x,
              "cy": y,
              "r": s
            });
            labely = y - s;
            break;
          default:    // rects
            _.extend(prop, {
              "x": x - s / 2,
              "y": y - s / 2,
              "w": s,
              "h": s
            });
            labely = y - s / 2;
        }
        this.elementProps[shape].push(prop);
        if(ele.itemLabel || this.showItemLabel){
          var labelMargin = 3;

          var label = {
            "id": "label_" + prop.id,
            "text": ele.itemLabel ? ele.itemLabel : ele._y,
            "x": x,
            "y": labely - labelMargin
          };
          this.elementLabels[shape].push(label);
        }
      }
    };

    PlotPoint.prototype.draw = function(scope) {
      var svg = scope.maing;
      var props = this.itemProps;

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
        .style("stroke-dasharray", props.st_da)
        .style("stroke-width", props.st_w);

      var itemsvg = svg.select("#" + this.id);
      var respClass = this.useToolTip === true ? this.respClass : null;

      for (var i = 0; i < this.shapes.length; i++) {
        var shape = this.shapes[i],
            tag = this.svgtags[i],
            eleprops = this.elementProps[shape];

        var shapesvg = itemsvg.select("#" + shape);

        if (shapesvg.empty()) {
          shapesvg = itemsvg.selectAll("#" + shape)
            .data([{}]).enter().append("g")
            .attr("id", shape);
        }

        shapesvg.selectAll(tag)
          .data(eleprops, function(d) { return d.id; }).exit().remove();
        shapesvg.selectAll(tag)
          .data(eleprops, function(d) { return d.id; }).enter().append(tag)
          .attr("id", function(d) { return d.id; })
          .attr("class", respClass + " " + this.actionClass)
          .style("fill", function(d) { return d.fi; })
          .style("fill-opacity", function(d) { return d.fi_op; })
          .style("stroke", function(d) { return d.st; })
          .style("stroke-opacity", function(d) { return d.st_op; })
          .style("stroke-dasharray", function(d) { return d.st_da; })
          .style("stroke-width", function(d) { return d.st_w; });

        switch (shape) {
          case "circle":
            shapesvg.selectAll(tag)
              .data(eleprops, function(d) { return d.id; })
              .attr("cx", function(d) { return d.cx; })
              .attr("cy", function(d) { return d.cy; })
              .attr("r", function(d) { return d.r; });
            break;
          case "diamond":
            shapesvg.selectAll(tag)
              .data(eleprops, function(d) { return d.id; })
              .attr("points", function(d) { return d.pts; });
            break;
          default:  // rect
            shapesvg.selectAll(tag)
              .data(eleprops, function(d) { return d.id; })
              .attr("x", function(d) {return d.x;})
              .attr("y", function(d) {return d.y;})
              .attr("width", function(d) { return d.w; })
              .attr("height", function(d) { return d.h; });

        }

        shapesvg.selectAll("text").remove();
        shapesvg.selectAll("text")
          .data(this.elementLabels[shape], function(d) { return d.id; }).enter().append("text")
          .attr("id", function(d) { return tag + "_" + d.id; })
          .attr("x", function(d) { return d.x; })
          .attr("y", function(d) { return d.y; })
          .attr("text-anchor", "middle")
          .style("fill", "black")
          .style("stroke", "none")
          .text(function(d) {return d.text;});
      }
    };

    PlotPoint.prototype.clear = function(scope) {
      scope.maing.select("#" + this.id).selectAll("*").remove();
      this.hideTips(scope);
    };

    PlotPoint.prototype.hideTips = function(scope, hidden) {
      plotTip.hideTips(scope, this.id,  hidden);
    };

    PlotPoint.prototype.createTip = function(ele) {

      if (ele.tooltip)
        return ele.tooltip;

      var xAxis = this.xAxis,
          yAxis = this.yAxis;
      var tip = {};
      if (this.legend != null) {
        tip.title = this.legend;
      }
      tip.x = plotUtils.getTipString(ele._x, xAxis, true);
      tip.y = plotUtils.getTipString(ele._y, yAxis, true);
      return plotUtils.createTipString(tip);
    };

    return PlotPoint;
  };
  beakerRegister.bkoFactory('PlotPoint', ['plotUtils', 'plotTip', retfunc]);
})();
