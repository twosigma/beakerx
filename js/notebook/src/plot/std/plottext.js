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

  var PlotText = function(data){
    _.extend(this, data);
    this.format();
  };

  PlotText.prototype.plotClass = "plot-text";
  PlotText.prototype.respClass = "plot-resp";

  PlotText.prototype.format = function() {
    if (this.color != null) {
      this.tip_color = PlotColorUtils.createColor(this.color, this.color_opacity);
    } else {
      this.tip_color = "gray";
    }
    this.itemProps = {
      "id": this.id,
      "fi": this.color,
      "fi_op": this.color_opacity,
      "show_pointer": this.show_pointer,
      "pointer_angle": this.pointer_angle,
      "size": this.size
    };
    this.elementProps = [];
  };

  PlotText.prototype.render = function(scope) {
    if (this.showItem === false) {
      this.clear(scope);
      return;
    }
    this.filter(scope);
    this.prepare(scope);
    this.clear(scope);
    if (this.vlength === 0) {
      this.clear(scope);
    } else {
      this.draw(scope);
    }
  };

  PlotText.prototype.getRange = function(eles = this.elements) {
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

  PlotText.prototype.applyAxis = function(xAxis, yAxis) {
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    for (var i = 0; i < this.elements.length; i++) {
      var ele = this.elements[i];
      ele.x = xAxis.getPercent(ele.x);
      ele.y = yAxis.getPercent(ele.y);
    }
  };

  PlotText.prototype.filter = function(scope) {
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


  /**
   * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
   *
   * @param {String} text The text to be rendered.
   * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
   *
   * @see http://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
   */
  var getTextWidth = function (text, font) {
    // re-use canvas object for better performance
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
  };

  PlotText.prototype.useSecondYAxis = function(scope) {
    var axisLabelExist = this.yAxisLabel !== undefined && this.yAxisLabel !== null;
    return axisLabelExist && scope.plotRange.data2scrYi_r;
  };

  PlotText.prototype.getYMapper = function(scope) {
    return this.useSecondYAxis(scope) ? scope.plotRange.data2scrYi_r : scope.plotRange.data2scrYi;
  };

  PlotText.prototype.prepare = function(scope) {
    var focus = scope.plotFocus.getFocus();
    var eles = this.elements,
      eleprops = this.elementProps;
    var mapX = scope.plotRange.data2scrXi,
      mapY = this.getYMapper(scope);

    eleprops.length = 0;
    for (var i = this.vindexL; i <= this.vindexR; i++) {
      var ele = eles[i];
      if (ele.y < focus.yl || ele.y > focus.yr ) { continue; }
      var x = mapX(ele.x), y = mapY(ele.y);

      if (PlotUtils.rangeAssert([x, y])) {
        eleprops.length = 0;
        return;
      }

      var prop = {
        "id" : this.id + "_" + i,
        "idx" : this.index,
        "ele" : ele,
        "txt" : ele.text,
        "x" : x,
        "y" : y
      };
      eleprops.push(prop);
    }
  };

  PlotText.prototype.draw = function (scope) {

    var pointerSize = 20;
    var pointerIndent = 10;

    var self = this;
    var svg = scope.maing;
    var props = this.itemProps,
      eleprops = this.elementProps;

    if (svg.select("#" + this.id).empty()) {
      svg.selectAll("g")
        .data([props], function (d) {
          return d.id;
        }).enter().append("g")
        .attr("id", function (d) {
          return d.id;
        });
    }
    svg.select("#" + this.id)
      .attr("class", this.plotClass);

    var respClass = this.useToolTip === true ? this.respClass : null;
    var itemsvg = svg.select("#" + this.id);

    itemsvg.selectAll("text")
      .data(eleprops, function (d) {
        return d.id;
      }).exit().remove();
    itemsvg.selectAll("line")
      .data(eleprops, function (d) {
        return "line_" + d.id;
      }).exit().remove();

    if (self.itemProps.show_pointer === true) {

      itemsvg.selectAll("line")
        .data(eleprops, function (d) {
          return d.id;
        }).enter().append("line")
        .attr("id", function (d) {
          return "line_" + d.id;
        })
        .attr("x1", pointerSize)
        .attr("x2", pointerIndent)
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("class", "text-line-style")
        .attr("stroke-width", 1)
        .attr("marker-end", "url(#Triangle)");


      itemsvg.selectAll("line")
        .data(eleprops, function (d) {
          return "line_" + d.id;
        })
        .attr("transform", function (d) {
          var x = d.x;
          var y = d.y;
          var transform = "rotate(" + self.itemProps.pointer_angle * (180 / Math.PI) + " " + x + " " + y + ")";
          transform += "translate(" + x + "," + y + ")";
          return transform;
        });
    }

    itemsvg.selectAll("text")
      .data(eleprops, function (d) {
        return d.id;
      }).enter().append("text")
      .attr("id", function (d) {
        return d.id;
      })
      .attr("class", respClass)
      .attr("fill", self.itemProps.fi)
      .style("opacity", self.itemProps.fi_op)
      .style('font-size', self.itemProps.size)
      .text(function (d) {
        return d.txt;
      });
    itemsvg.selectAll("text")
      .data(eleprops, function (d) {
        return d.id;
      })
      .attr("transform", function (d) {

        var x = d.x;
        var y = d.y;

        if (self.itemProps.show_pointer) {
          var size = self.itemProps.size;

          var width = getTextWidth(d.txt, size + "px Lato, Helvetica, sans-serif");
          var height = size;

          var angle = self.itemProps.pointer_angle;
          if (angle < 0) {
            angle = 2 * Math.PI + angle;
          }
          x += Math.cos(angle) * pointerSize;
          y += Math.sin(angle) * pointerSize;

          if (angle === 0) {
            y += Math.floor(height / 2);
          }
          else if (angle === 0.5 * Math.PI) {
            x -= Math.round(width / 2);
            y += height;
          }
          else if (angle === 1.5 * Math.PI) {
            x -= Math.round(width / 2);
          }
          else if (angle === Math.PI) {
            y += Math.floor(height / 2);
            x -= width;
          }
          else if (angle > 0 && angle < 0.5 * Math.PI) {
            y += height;
          }
          else if (angle > 0.5 * Math.PI && angle < Math.PI) {
            y += height;
            x -= width;
          }
          else if (angle > Math.PI && angle < 1.5 * Math.PI) {
            x -= width;
          }
          else if (angle > 1.5 * Math.PI && angle < 2 * Math.PI) {

          }
        }

        var tf = "", rot = null;
        if (d.ele.rotate != null) {
          rot = d.ele.rotate;
        }
        if (rot != null) {
          tf = "rotate(" + rot + " " + x + " " + y + ")";
        }
        tf += "translate(" + x + "," + y + ")";

        return tf;
      });
  };

  PlotText.prototype.clear = function(scope) {
    scope.maing.select("#" + this.id).selectAll("*").remove();
    this.hideTips(scope);
  };

  PlotText.prototype.hideTips = function(scope, hidden) {
    PlotTip.hideTips(scope, this.id, hidden);
  };

  PlotText.prototype.createTip = function(ele) {
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

  return PlotText;

});