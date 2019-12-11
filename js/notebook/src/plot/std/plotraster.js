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

  var PlotRaster = function(data){
    _.extend(this, data); // copy properties to itself
    this.format();
  };

  PlotRaster.prototype.plotClass = "plot-raster";

  PlotRaster.prototype.format = function(){
    this.itemProps = {
      "id" : this.id,
      "st" : this.color,
      "st_op": this.opacity,
      "st_w" : this.width,
      // not sure how this works for now
      "st_h" : this.height,
      //"st_f" : this.format,
      //"st_v" : this.value
    };

    this.elementProps = [];
    this.labelpipe = [];
    this.rmlabelpipe = [];
  };

  PlotRaster.prototype.render = function(scope){
    if (this.showItem === false) {
      this.clear(scope);
      return;
    }
    this.filter(scope);
    this.prepare(scope);
    this.clear(scope);
    this.draw(scope);
  };

  PlotRaster.prototype.getRange = function(eles = this.elements) {
    var range = {
      xl : Infinity,
      xr : -Infinity,
      yl : Infinity,
      yr : -Infinity,
    };
    for (var i = 0; i < eles.length; i++) {
      var ele = eles[i];
      //TODO: calculate range
      for (var j = 0; j < ele.x.length; j++){
        range.xl = Math.min(range.xl, ele.x[j]);
        range.xr = Math.max(range.xr, ele.x[j] + ele.width[j]);
        range.yl = Math.min(range.yl, ele.y[j] - ele.height[j]);
        range.yr = Math.max(range.yr, ele.y[j]);  
      }
    }
    return range;
  };

  PlotRaster.prototype.applyAxis = function(xAxis, yAxis) {
    this.xAxis = xAxis;
    this.yAxis = yAxis;
    for (var i = 0; i < this.elements.length; i++) {
      var ele = this.elements[i];
      for (var j = 0; j < ele.x.length; j++){
        var newx = xAxis.getPercent(ele.x[j]);
        var newy = yAxis.getPercent(ele.y[j]);
        var newWidth = xAxis.getPercent(ele.x[j] + ele.width[j]);
        var newHeight = yAxis.getPercent(ele.y[j] - ele.height[j]);
        ele.x[j] = newx;
        ele.y[j] = newy;
        ele.width[j] = newWidth - newx;
        ele.height[j] = newy - newHeight;  
      }
    }
  };

  PlotRaster.prototype.filter = function(scope) {
    // do nothing and show everything
    var l = 0, r = this.elements.length - 1;
    this.vindexL = l;
    this.vindexR = r;
    this.vlength = r - l + 1;
  };

  PlotRaster.prototype.useSecondYAxis = function(scope) {
    var axisLabelExist = this.yAxisLabel !== undefined && this.yAxisLabel !== null;
    return axisLabelExist && scope.plotRange.data2scrYi_r;
  };

  PlotRaster.prototype.getYMapper = function(scope) {
    return this.useSecondYAxis(scope) ? scope.plotRange.data2scrYi_r : scope.plotRange.data2scrYi;
  };


  PlotRaster.prototype.prepare = function(scope) {
    var focus = scope.plotFocus.getFocus();
    var eles = this.elements,
      eleprops = this.elementProps;
    var mapX = scope.plotRange.data2scrXi,
      mapY = this.getYMapper(scope);
    var lMargin = scope.layout.leftLayoutMargin,
      bMargin = scope.layout.bottomLayoutMargin;

    eleprops.length = 0;
    this.labelpipe.length = 0;
    this.rmlabelpipe.length = 0;
    for (var i = this.vindexL; i <= this.vindexR; i++) {
      var ele = eles[i];
      for (var j = 0; j < ele.x.length; j++){
        var prop = {
          "id" : this.id + "_" + i,
          "lbid" : this.id + "_" + i + "l",
          "x": mapX(ele.x[j]),
          "y": mapY(ele.y[j]),
          "st" : ele.color,
          "st_op" : ele.opacity[j],
          "st_w" : mapX(ele.x[j] + ele.width[j]) - mapX(ele.x[j]),
          "st_h" : mapY(ele.y[j] - ele.height[j]) - mapY(ele.y[j]),
          "st_v" : ele.value
        };
        eleprops.push(prop);
      }
    }
  };


  PlotRaster.prototype.draw = function(scope) {
    var svg = scope.maing;
    var props = this.itemProps,
      eleprops = this.elementProps;
    if (svg.select("#" + this.id).empty()) {
      svg.selectAll("g")
        .data([props], function(d){ return d.id; }).enter().append("g")
        .attr("id", function(d) { return d.id; });
    }
    svg.select("#" + this.id)
      .attr("class", this.plotClass);

    var svgitem = svg.select("#" + this.id);
    svgitem.selectAll("image")
      .data(eleprops, function(d) { return d.id; }).exit().remove();
    
    svgitem.selectAll("image")
      .data(eleprops, function(d) { return d.id; }).enter().append("image")
      .attr("id", function(d) { return d.id; })
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("width", function(d) { return d.st_w; })
      .attr("height", function(d) { return d.st_h; })
      .attr("opacity", function(d) { return d.st_op; })
      .attr("preserveAspectRatio", "none")
      .attr("xlink:href", function(d) { return d.st_v; });
      //.attr("class", this.respClass) // does not need resp
  };

  PlotRaster.prototype.clear = function(scope) {
    scope.maing.select("#" + this.id).selectAll("*").remove();
  };

  PlotRaster.prototype.hideTips = function(scope, hidden) {
    // do nothing, no tip for this type
  };

  return PlotRaster;

});