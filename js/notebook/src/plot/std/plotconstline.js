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
  const PlotStyleUtils = require("beakerx_shared/lib/utils/PlotStyleUtils").default;

  var PlotConstline = function(data){
    _.extend(this, data); // copy properties to itself
    this.format();
  };

  PlotConstline.prototype.plotClass = "plot-constline";

  PlotConstline.prototype.format = function(){
    this.itemProps = {
      "id" : this.id,
      "st" : this.color,
      "st_op": this.color_opacity,
      "st_w" : this.width,
      "st_da" : this.stroke_dasharray,
      "st_label" : this.showLabel,
    };

    this.elementProps = [];
    this.labelpipe = [];
    this.rmlabelpipe = [];
  };

  PlotConstline.prototype.render = function(scope){
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

  PlotConstline.prototype.getRange = function(eles = this.elements) {
    var range = {
      xl : Infinity,
      xr : -Infinity,
      yl : Infinity,
      yr : -Infinity,
    };
    for (var i = 0; i < eles.length; i++) {
      var ele = eles[i];
      if (ele.type === "x") {
        range.xl = Math.min(range.xl, ele.x);
        range.xr = Math.max(range.xr, ele.x);
      } else if (ele.type === "y") {
        range.yl = Math.min(range.yl, ele.y);
        range.yr = Math.max(range.yr, ele.y);
      }
    }
    return range;
  };

  PlotConstline.prototype.applyAxis = function(xAxis, yAxis) {
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    for (var i = 0; i < this.elements.length; i++) {
      var ele = this.elements[i];
      if (ele.type === "x") {
        ele.x = xAxis.getPercent(ele.x);
      } else if (ele.type === "y") {
        ele.y = yAxis.getPercent(ele.y);
      }
    }
  };

  PlotConstline.prototype.filter = function(scope) {
    // do nothing and show everything
    var l = 0, r = this.elements.length - 1;
    this.vindexL = l;
    this.vindexR = r;
    this.vlength = r - l + 1;
  };

  PlotConstline.prototype.useSecondYAxis = function(scope) {
    var axisLabelExist = this.yAxisLabel !== undefined && this.yAxisLabel !== null;
    return axisLabelExist && scope.plotRange.data2scrYi_r;
  };

  PlotConstline.prototype.getYMapper = function(scope) {
    return this.useSecondYAxis(scope) ? scope.plotRange.data2scrYi_r : scope.plotRange.data2scrYi;
  };


  PlotConstline.prototype.prepare = function(scope) {
    var focus = scope.plotFocus.getFocus();
    var eles = this.elements,
      eleprops = this.elementProps;
    var mapX = scope.plotRange.data2scrXi,
      mapY = this.getYMapper(scope);
    var lMargin = scope.layout.leftLayoutMargin,
      bMargin = scope.layout.bottomLayoutMargin;
    var W = PlotStyleUtils.safeWidth(scope.jqsvg),
      H = PlotStyleUtils.safeHeight(scope.jqsvg);

    eleprops.length = 0;
    this.labelpipe.length = 0;
    this.rmlabelpipe.length = 0;

    for (var i = this.vindexL; i <= this.vindexR; i++) {
      var ele = eles[i];
      var prop = {
        "id" : this.id + "_" + i,
        "lbid" : this.id + "_" + i + "l",
        "st" : ele.color,
        "st_op" : ele.color_opacity,
        "st_w" : ele.width,
        "st_da" : ele.stroke_dasharray,
        "bg_clr" : ele.color == null ? this.color : ele.color
      };
      eleprops.push(prop);

      // does not need range assert, clipped directly
      if (ele.type === "x") {
        var x = mapX(ele.x);
        _.extend(prop, {
          "x1" : x,
          "x2" : x,
          "y1" : mapY(focus.yl),
          "y2" : mapY(focus.yr),
        });

        if (this.itemProps.st_label) {
          if (ele.x < focus.xl || ele.x > focus.xr) {
            this.rmlabelpipe.push(eleprops[i]);
            continue;
          } else {
            this.labelpipe.push(eleprops[i]);
          }
          var text = PlotUtils.getTipString(ele._x, scope.stdmodel.xAxis);
          _.extend(prop, {
            "left" : function(w, h, x) { return x - w / 2; },
            "top" : function(w, h, y) { return H - bMargin - h - scope.labelPadding.y; },
            "lb_txt" : text
          });
        }
      } else if (ele.type === "y") {
        var y = mapY(ele.y);
        _.extend(prop, {
          "x1" : mapX(focus.xl),
          "x2" : mapX(focus.xr),
          "y1" : y,
          "y2" : y,
        });
        if (this.itemProps.st_label) {
          if (ele.y < focus.yl || ele.y > focus.yr) {
            this.rmlabelpipe.push(eleprops[i]);
            continue;
          } else {
            this.labelpipe.push(eleprops[i]);
          }
          var text = PlotUtils.getTipString(ele._y, scope.stdmodel.yAxis);

          _.extend(prop, {
            "left" : function(w, h, x) { return lMargin + scope.labelPadding.x; },
            "top" : function(w, h, y) { return y - h / 2; },
            "lb_txt" : text
          });
        }
      }
    }
  };


  PlotConstline.prototype.draw = function(scope) {
    var svg = scope.maing;
    var props = this.itemProps,
      eleprops = this.elementProps;

    if (svg.select("#" + this.id).empty()) {
      svg.selectAll("g")
        .data([props], function(d){ return d.id; }).enter().append("g")
        .attr("id", function(d) { return d.id; });
    }
    svg.select("#" + this.id)
      .attr("class", this.plotClass)
      .style("stroke", props.st)
      .style("stroke-opacity", props.st_op)
      .style("stroke-dasharray", props.st_da)
      .style("stroke-width", props.st_w);

    var svgitem = svg.select("#" + this.id);
    svgitem.selectAll("line")
      .data(eleprops, function(d) { return d.id; }).exit().remove();
    svgitem.selectAll("line")
      .data(eleprops, function(d) { return d.id; }).enter().append("line")
      .attr("id", function(d) { return d.id; })
      //.attr("class", this.respClass) // does not need resp
      .style("stroke", function(d) { return d.st; })
      .style("stroke-opacity", function(d) { return d.st_op; })
      .style("stroke-width", function(d) { return d.st_w; })
      .style("stroke-dasharray", function(d) { return d.st_da; });
    svgitem.selectAll("line")
      .data(eleprops, function(d) { return d.id; })
      .attr("x1", function(d) { return d.x1; })
      .attr("x2", function(d) { return d.x2; })
      .attr("y1", function(d) { return d.y1; })
      .attr("y2", function(d) { return d.y2; });

    // add and remove labels
    for (var i = 0; i < this.labelpipe.length; i++) {
      var lb = this.labelpipe[i], lbid = lb.lbid;

      var box = scope.jqcontainer.find("#" + lbid);
      if (box.empty()) {
        box = $("<div></div>")
          .appendTo(scope.jqcontainer)
          .attr("id", lbid)
          .attr("class", "plot-constlabel")
          .css("background-color", lb.bg_clr)
          .text(lb.lb_txt);
      }
      var w = box.outerWidth(), h = box.outerHeight();
      box.css({
        "left" : lb.left(w, h, lb.x1),
        "top" : lb.top(w, h, lb.y1)
      });
    }

    for (var i = 0; i < this.rmlabelpipe.length; i++) {
      scope.jqcontainer.find("#" + this.rmlabelpipe[i].lbid).remove();
    }

  };

  PlotConstline.prototype.clear = function(scope) {
    scope.maing.select("#" + this.id).selectAll("*").remove();
  };

  PlotConstline.prototype.hideTips = function(scope, hidden) {
    // do nothing, no tip for this type
  };

  return PlotConstline;

});