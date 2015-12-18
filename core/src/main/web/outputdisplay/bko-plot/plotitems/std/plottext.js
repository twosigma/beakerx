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
    var PlotText = function(data){
      _.extend(this, data);
      this.format();
    };

    PlotText.prototype.plotClass = "plot-text";
    PlotText.prototype.respClass = "plot-resp";

    PlotText.prototype.format = function() {
      if (this.color != null) {
        this.tip_color = plotUtils.createColor(this.color, this.color_opacity);
      } else {
        this.tip_color = "gray";
      }
      this.itemProps = {
        "id": this.id,
        "fi": this.color,
        "fi_op": this.color_opacity,
        "show_pointer": this.show_pointer,
        "pointer_angle": this.pointer_angle
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
      if (this.vlength === 0) {
        this.clear(scope);
      } else {
        this.draw(scope);
      }
    };

    PlotText.prototype.getRange = function() {
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


    PlotText.prototype.prepare = function(scope) {
      var focus = scope.focus;
      var eles = this.elements,
          eleprops = this.elementProps;
      var mapX = scope.data2scrXi,
          mapY = scope.data2scrYi;

      eleprops.length = 0;
      for (var i = this.vindexL; i <= this.vindexR; i++) {
        var ele = eles[i];
        if (ele.y < focus.yl || ele.y > focus.yr ) { continue; }
        var x = mapX(ele.x), y = mapY(ele.y);

        if (plotUtils.rangeAssert([x, y])) {
          eleprops.length = 0;
          return;
        }

        var tf = "", rot = null;
        if (ele.rotate != null) {
          rot = ele.rotate;
        } else if (this.rotate != null) {
          rot = this.rotate;
        }
        if (rot != null) {
          tf = "rotate(" + rot + " " + x + " " + y + ")";
        }
        tf += "translate(" + x + "," + y + ")";

        var line_tf = "";
        if (this.itemProps.pointer_angle != null) {

          if (this.itemProps.pointer_angle >= Math.PI / 2 && this.itemProps.pointer_angle <= Math.PI) {
            y -= 15;
            x += getTextWidth(ele.text, "12 px pt-sans, Helvetica, sans-serif");
          }

          line_tf = "rotate(" + this.itemProps.pointer_angle * (180 / Math.PI) + " " + x + " " + y + ")";
          line_tf += "translate(" + x + "," + y + ")";
        }

        var prop = {
          "id" : this.id + "_" + i,
          "idx" : this.index,
          "ele" : ele,
          "tf" : tf,
          "txt" : ele.text,
          "fi" : this.itemProps.fi,
          "fi_op" : this.itemProps.fi_op,
          "show_pointer": this.itemProps.show_pointer,
          "pointer_angle": this.itemProps.pointer_angle,
          "line_tf" : line_tf
        };
        eleprops.push(prop);
      }
    };

    PlotText.prototype.draw = function(scope) {
      var svg = scope.maing;
      var props = this.itemProps,
          eleprops = this.elementProps;

      if (svg.select("#" + this.id).empty()) {
        svg.selectAll("g")
          .data([props], function(d) { return d.id; }).enter().append("g")
          .attr("id", function(d) { return d.id; });
      }
      svg.select("#" + this.id)
        .attr("class", this.plotClass);

      var respClass = this.useToolTip === true ? this.respClass : null;
      var itemsvg = svg.select("#" + this.id);

      itemsvg.selectAll("text")
        .data(eleprops, function(d) { return d.id; }).exit().remove();
      itemsvg.selectAll("text")
        .data(eleprops, function(d) { return d.id; }).enter().append("text")
        .attr("id", function(d) { return d.id; })
        .attr("class", respClass)
        .attr("fill", function(d){return d.fi;})
        .attr("cursor", function(d){return d.show_pointer === false ? "none" : "default";})
        .style("opacity", function(d) { return d.fi_op; })
        .text(function(d) { return d.txt; });
      itemsvg.selectAll("text")
        .data(eleprops, function(d) { return d.id; })
        .attr("transform", function(d) { return d.tf; });


      var mapX = scope.data2scrXi,
          mapY = scope.data2scrYi;

      itemsvg.selectAll("line")
        .data(eleprops, function (d) {return "line_" + d.id;}).exit().remove();

      if (this.itemProps.pointer_angle != null ) {
        itemsvg.selectAll("line")
          .data(eleprops, function (d) {
            return d.id;
          }).enter().append("line")
          .attr("id", function (d) {
            return "line_" + d.id;
          })

          .attr("x1", 0)
          .attr("x2", -15)
          .attr("y1", 0)
          .attr("y2", 0)

          .attr("stroke-width", 1)
          .attr("stroke", function (d) {
            return d.fi;
          })
          .attr("marker-end", "url(/beaker/#Triangle)")
        ;

        itemsvg.selectAll("line")
          .data(eleprops, function (d) {
            return "line_" + d.id;
          })
          .attr("transform", function (d) {
            return d.line_tf;
          });
      }

    };

    PlotText.prototype.clear = function(scope) {
      scope.maing.select("#" + this.id).selectAll("*").remove();
      this.clearTips(scope);
    };

    PlotText.prototype.clearTips = function(scope) {
      var eleprops = this.elementProps;
      var itemid = this.id;
      _.each(scope.tips, function(value, key){
        if (key.search("" + itemid) === 0) {
          scope.jqcontainer.find("#tip_" + key).remove();
          delete scope.tips[key];
        }
      });
    };

    PlotText.prototype.createTip = function(ele) {
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

    return PlotText;
  };
  beaker.bkoFactory('PlotText', ['plotUtils', retfunc]);
})();
