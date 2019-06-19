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

  var PointShapeHelper = require('./PointShapeHelper.ts').default;

  var PlotPoint = function(data){
    _.extend(this, data); // copy properties to itself
    this.format();
  };

  PlotPoint.prototype.plotClass = "plot-point";
  PlotPoint.prototype.respClass = "plot-resp";
  PlotPoint.prototype.actionClass = "item-clickable item-onkey";
  PlotPoint.prototype.shapes = ["rect", "diamond", "circle", "triangle", "dcross", "downtriangle", "cross", "level", "vlevel", "linecross"];
  PlotPoint.prototype.svgtags = ["rect", "polygon", "circle", "polygon", "polygon", "polygon", "polygon", "polygon", "polygon", "polygon"];

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
            .duration(PlotUtils.getHighlightDuration())
            .attr("r", function(d) {
              return PlotUtils.getHighlightedSize(d.r, highlighted);
            });
          break;
        case "diamond":
          shapesvg.selectAll(tag)
            .transition()
            .duration(PlotUtils.getHighlightDuration())
            .attr("points", function(d) {
              var
                mapX = scope.plotRange.data2scrXi, mapY = scope.plotRange.data2scrYi,
                x = mapX(d.ele.x), y = mapY(d.ele.y),
                size = PlotUtils.getHighlightedSize(d.ele.size, highlighted);
              return PointShapeHelper.getDiamondPoints(x, y, size);
            });
          break;
        case "triangle":
          shapesvg.selectAll(tag)
            .transition()
            .duration(PlotUtils.getHighlightDuration())
            .attr("points", function(d) {
              var
                mapX = scope.plotRange.data2scrXi, mapY = scope.plotRange.data2scrYi,
                x = mapX(d.ele.x), y = mapY(d.ele.y),
                size = PlotUtils.getHighlightedSize(d.ele.size, highlighted);
              return PointShapeHelper.getTrianglePoints(x, y, size);
            });
          break;
        case "downtriangle":
          shapesvg.selectAll(tag)
            .transition()
            .duration(PlotUtils.getHighlightDuration())
            .attr("points", function(d) {
              var
                mapX = scope.plotRange.data2scrXi, mapY = scope.plotRange.data2scrYi,
                x = mapX(d.ele.x), y = mapY(d.ele.y),
                size = PlotUtils.getHighlightedSize(d.ele.size, highlighted);
              return PointShapeHelper.getDownTrianglePoints(x, y, size);
            });
          break;
        case "level":
          shapesvg.selectAll(tag)
            .transition()
            .duration(PlotUtils.getHighlightDuration())
            .attr("points", function(d) {
              var
                mapX = scope.plotRange.data2scrXi, mapY = scope.plotRange.data2scrYi,
                x = mapX(d.ele.x), y = mapY(d.ele.y),
                size = PlotUtils.getHighlightedSize(d.ele.size, highlighted);
              return PointShapeHelper.getLevelPoints(x, y, size);
            });
          break;
        case "vlevel":
          shapesvg.selectAll(tag)
            .transition()
            .duration(PlotUtils.getHighlightDuration())
            .attr("points", function(d) {
              var
                mapX = scope.plotRange.data2scrXi, mapY = scope.plotRange.data2scrYi,
                x = mapX(d.ele.x), y = mapY(d.ele.y),
                size = PlotUtils.getHighlightedSize(d.ele.size, highlighted);
              return PointShapeHelper.getVLevelPoints(x, y, size);
            });
          break;
        case "linecross":
          shapesvg.selectAll(tag)
            .transition()
            .duration(PlotUtils.getHighlightDuration())
            .attr("points", function(d) {
              var
                mapX = scope.plotRange.data2scrXi, mapY = scope.plotRange.data2scrYi,
                x = mapX(d.ele.x), y = mapY(d.ele.y),
                size = PlotUtils.getHighlightedSize(d.ele.size, highlighted);
              return PointShapeHelper.getLineCrossPoints(x, y, size);
            });
          break;
        case "cross":
          shapesvg.selectAll(tag)
            .transition()
            .duration(PlotUtils.getHighlightDuration())
            .attr("points", function(d) {
              var
                mapX = scope.plotRange.data2scrXi, mapY = scope.plotRange.data2scrYi,
                x = mapX(d.ele.x), y = mapY(d.ele.y),
                size = PlotUtils.getHighlightedSize(d.ele.size, highlighted);
              return PointShapeHelper.getCrossPoints(x, y, size);
            });
          break;
        case "dcross":
          shapesvg.selectAll(tag)
            .transition()
            .duration(PlotUtils.getHighlightDuration())
            .attr("points", function(d) {
              var
                mapX = scope.plotRange.data2scrXi, mapY = scope.plotRange.data2scrYi,
                x = mapX(d.ele.x), y = mapY(d.ele.y),
                size = PlotUtils.getHighlightedSize(d.ele.size, highlighted);
              return PointShapeHelper.getDCrossPoints(x, y, size);
            });
          break;
        default:  // rect
          var diff = PlotUtils.getHighlightedDiff(highlighted) / 2;
          shapesvg.selectAll(tag)
            .transition()
            .duration(PlotUtils.getHighlightDuration())
            .attr("x", function(d) { return d.x - diff; })
            .attr("y", function(d) { return d.y - diff; })
            .attr("width", function(d) { return PlotUtils.getHighlightedSize(d.w, highlighted); })
            .attr("height", function(d) { return PlotUtils.getHighlightedSize(d.h, highlighted); });
      }
    }
  };

  PlotPoint.prototype.format = function() {
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
      "st_op" : this.stroke_opacity,
      "st_w": this.stroke_width,
      "st_da": this.stroke_dasharray
    };

    this.elementProps = {
      "rect" : [],
      "diamond" : [],
      "circle" : [],
      "triangle" : [],
      "dcross" : [],
      "downtriangle" : [],
      "cross" : [],
      "level" : [],
      "vlevel" : [],
      "linecross" : []
    };
    this.elementLabels = {
      "rect" : [],
      "diamond" : [],
      "circle" : [],
      "triangle" : [],
      "dcross" : [],
      "downtriangle" : [],
      "cross" : [],
      "level" : [],
      "vlevel" : [],
      "linecross" : []
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
      this.draw(scope);
    }
  };

  PlotPoint.prototype.getRange = function(eles = this.elements) {
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
    var l = PlotUtils.upper_bound(eles, "x", scope.plotFocus.focus.xl) + 1,
      r = PlotUtils.upper_bound(eles, "x", scope.plotFocus.focus.xr);

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

  PlotPoint.prototype.useSecondYAxis = function(scope) {
    var axisLabelExist = this.yAxisLabel !== undefined && this.yAxisLabel !== null;
    return axisLabelExist && scope.plotRange.data2scrYi_r;
  };

  PlotPoint.prototype.getYMapper = function(scope) {
    return this.useSecondYAxis(scope) ? scope.plotRange.data2scrYi_r : scope.plotRange.data2scrYi;
  };

  PlotPoint.prototype.prepare = function(scope) {
    var focus = scope.plotFocus.getFocus();
    var eles = this.elements;
    var mapX = scope.plotRange.data2scrXi,
      mapY = this.getYMapper(scope);

    _.each(this.elementProps, function(val) {
      val.length = 0;
    });

    _.each(this.elementLabels, function(val) {
      val.length = 0;
    });

    for (var i = this.vindexL; i <= this.vindexR; i++) {
      var ele = eles[i];
      if (ele.y < focus.yl || ele.y > focus.yr) { continue; }
      var x = mapX(ele.x), y = mapY(ele.y), s = ele.size, r = s / 2;
      var labely;

      if (PlotUtils.rangeAssert([x, y])) {
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
          _.extend(prop, {
            "pts" : PointShapeHelper.getDiamondPoints(x, y, s),
            "tooltip_cx" : x
          });
          labely = y - s;
          break;
        case "circle":
          _.extend(prop, {
            "cx": x,
            "cy": y,
            "r": r
          });
          labely = y - s;
          break;
        case "triangle":
          _.extend(prop, {
            "pts" : PointShapeHelper.getTrianglePoints(x, y, s),
            "tooltip_cx" : x
          });
          labely = y - r;
          break;
        case "downtriangle":
          _.extend(prop, {
            "pts" : PointShapeHelper.getDownTrianglePoints(x, y, s),
            "tooltip_cx" : x
          });
          labely = y - r;
          break;
        case "level":
          _.extend(prop, {
            "pts" : PointShapeHelper.getLevelPoints(x, y, s),
            "tooltip_cx" : x
          });
          labely = y - r;
          break;
        case "vlevel":
          _.extend(prop, {
            "pts" : PointShapeHelper.getVLevelPoints(x, y, s),
            "tooltip_cx" : x
          });
          labely = y - r;
          break;
        case "linecross":
          _.extend(prop, {
            "pts" : PointShapeHelper.getLineCrossPoints(x, y, s),
            "tooltip_cx" : x
          });
          labely = y - r;
          break;
        case "cross":
          _.extend(prop, {
            "pts" : PointShapeHelper.getCrossPoints(x, y, s),
            "tooltip_cx" : x
          });
          labely = y - r;
          break;
        case "dcross":
          _.extend(prop, {
            "pts" : PointShapeHelper.getDCrossPoints(x, y, s),
            "tooltip_cx" : x
          });
          labely = y - r;
          break;
        default:    // rects
          _.extend(prop, {
            "x": x - r,
            "y": y - r,
            "w": s,
            "h": s
          });
          labely = y - r;
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
        case "triangle":
        case "downtriangle":
        case "cross":
        case "level":
        case "vlevel":
        case "linecross":
        case "dcross":
          shapesvg.selectAll(tag)
            .data(eleprops, function(d) { return d.id; })
            .attr("points", function(d) { return d.pts; });
          break;
        default:  // rect
          shapesvg.selectAll(tag)
            .data(eleprops, function(d) { return d.id; })
            .attr("x", function(d) { return d.x; })
            .attr("y", function(d) { return d.y; })
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
    PlotTip.hideTips(scope, this.id,  hidden);
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
    tip.x = PlotUtils.getTipString(ele._x, xAxis, true);
    tip.y = PlotUtils.getTipString(ele._y, yAxis, true);
    return PlotUtils.createTipString(tip);
  };

  return PlotPoint;

});