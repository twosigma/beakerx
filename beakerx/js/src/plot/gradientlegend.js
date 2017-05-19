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
  'd3'
], function(
  _,
  d3
) {
  var count = 0;

  var GradientLegend = function(data) {
    this.id = count++;
    this.data = _.extend({}, data);
    this.layout = {
      labelHPadding: 5,
      labelVPadding: 15,
      tickSize: 5,
      legendWidth: 350, //TODO can change it from outside?
      legendHeight: 60,
      colorboxHeight: 20,
      axisPadding: 10,
      histHeight: 7
    };
  };

  GradientLegend.prototype.makeGradient = function(colors) {
    var gradient = this.legend.append("defs")
      .append("linearGradient")
      .attr("id", "gradient" + this.id)
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%")
      .attr("spreadMethod", "pad");
    var colorPctStep = 100 / (colors.length - 1);
    for(var i = 0; i< colors.length; i++){
      gradient.append("stop")
        .attr("offset", colorPctStep * i  + "%")
        .attr("stop-color", colors[i])
        .attr("stop-opacity", 1);
    }
  };

  GradientLegend.prototype.drawAxis = function(){
    var labelsCount = 6; //TODO need to calculate labels count
    var ticks;
    var axislines = [];
    var axislabels = [];
    var axisliney = this.layout.colorboxHeight + this.layout.axisPadding;


    axislines.push({
      id: "legend-axis",
      class: "plot-legend-axis",
      x1: 0,
      x2: this.layout.legendWidth,
      y1: axisliney,
      y2: axisliney
    });

    //base ticks
    axislines.push({
      id: "legend-tick-left",
      class: "plot-legend-tick",
      x1: 0,
      x2: 0,
      y1: axisliney,
      y2: axisliney - this.layout.tickSize
    });
    axislines.push({
      id: "legend-tick-right",
      class: "plot-legend-tick",
      x1: this.layout.legendWidth,
      x2: this.layout.legendWidth,
      y1: axisliney,
      y2: axisliney - this.layout.tickSize
    });

    //ticks and labels
    var axis = d3.scaleLinear().range([0, this.layout.legendWidth]);
    axis.domain([this.data[0].minValue, this.data[0].maxValue]);
    ticks = axis.ticks(labelsCount);

    var first = axis(ticks[0]);
    var step = axis(ticks[1]) - axis(ticks[0]);

    function getTickX(index) {
      return first + index * step;
    }

    for(var i = 0; i < ticks.length; i++){
      axislines.push({
        id: "legend-tick-" + i,
        class: "plot-legend-tick",
        x1: getTickX(i),
        x2: getTickX(i),
        y1: axisliney,
        y2: axisliney + this.layout.tickSize
      });
      axislabels.push({
        id: "legend-tick-text-" + i,
        class: "plot-legend-label",
        x: getTickX(i),
        y: axisliney + this.layout.labelVPadding,
        dy: ".35em",
        text: ticks[i],
        "text-anchor": "middle"
      });
    }

    //min and max value labels
    axislabels.push({
      id: "legend-min-text",
      class: "plot-legend-label",
      x: -this.layout.labelHPadding,
      y: axisliney,
      text: this.data[0].minValue.toFixed(4) * 1,
      "text-anchor": "end",
      "dominant-baseline": "central"
    });
    axislabels.push({
      id: "legend-max-text",
      class: "plot-legend-label",
      x: this.layout.legendWidth + this.layout.labelHPadding,
      y: axisliney,
      text: this.data[0].maxValue.toFixed(4) * 1,
      "text-anchor": "start",
      "dominant-baseline": "central"
    });

    this.legend.selectAll("line").remove();
    this.legend.selectAll("line")
      .data(axislines, function(d) { return d.id; }).enter().append("line")
      .attr("id", function(d) { return d.id; })
      .attr("class", function(d) { return d.class; })
      .attr("x1", function(d) { return d.x1; })
      .attr("x2", function(d) { return d.x2; })
      .attr("y1", function(d) { return d.y1; })
      .attr("y2", function(d) { return d.y2; });
    this.legend.selectAll("text").remove();
    this.legend.selectAll("text")
      .data(axislabels, function(d) { return d.id; }).enter().append("text")
      .attr("id", function(d) { return d.id; })
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("dy", function(d) { return d.dy; })
      .style("text-anchor", function(d) { return d["text-anchor"]; })
      .style("dominant-baseline", function(d) { return d["dominant-baseline"]; })
      .text(function(d) { return d.text; });
  };

  GradientLegend.prototype.drawHistogram = function() {

    //create histogram data
    var flatValues = [];
    var elements = this.data[0].elements;

    for (var i = 0; i < elements.length; i++) {
      flatValues.push(elements[i].value);
    }

    var histogram = d3.histogram().thresholds(100);
    var histValues = histogram(flatValues);
    var min = histValues[0].length;
    var max = min;

    for (var i = 0; i < histValues.length; i++) {
      min = Math.min(min, histValues[i].length);
      max = Math.max(max, histValues[i].length);
    }

    // the x-scale parameters
    var x = d3.scaleLinear()
      .domain([this.data[0].minValue, this.data[0].maxValue])
      .range([0, this.layout.legendWidth]);

    // the y-scale parameters
    var axisliney = this.layout.colorboxHeight + this.layout.axisPadding;
    var y = d3.scaleLinear()
      .domain([min, max])
      .range([axisliney, axisliney - this.layout.histHeight]);

    var yreflected = d3.scaleLinear()
      .domain([min, max])
      .range([axisliney, axisliney + this.layout.histHeight]);

    var createArea = function(yScale) {
      return d3.area()
        .x(function(d) { return x(d.x0 + (d.x1-d.x0) / 2); })
        .y0(axisliney)
        .y1(function(d) { return yScale(d.length); });
    };

    this.legend.append("path")
      .datum(histValues)
      .attr("class", "plot-legend-histogram")
      .attr("d", createArea(y));
    this.legend.append("path")
      .datum(histValues)
      .attr("class", "plot-legend-histogram")
      .attr("d", createArea(yreflected));
  };

  GradientLegend.prototype.drawPointer = function(pos) {
    var size = 32;
    var arc = d3.symbol().type(d3.symbolTriangle).size(size);

    var height = Math.sqrt(size * Math.sqrt(3));
    var data = [{x: pos, y: this.layout.colorboxHeight + this.layout.axisPadding - height / 2}];

    var x = d3.scaleLinear()
      .domain([this.data[0].minValue, this.data[0].maxValue])
      .range([0, this.layout.legendWidth]);

    this.legend.selectAll('.legend-pointer').remove();
    this.legend.selectAll('.legend-pointer')
      .data(data)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('class', 'legend-pointer')
      .attr('fill', '#333333')
      .attr('stroke', '#333333')
      .attr('stroke-width', 1)
      .attr("transform", function(d) { return "translate(" + x(d.x) + "," + d.y + ")"; });
  };

  GradientLegend.prototype.removePointer = function() {
    this.legend.selectAll('.legend-pointer').remove();
  };

  GradientLegend.prototype.render = function(legendContainer, colors) {
    var legendSvg = d3.select(legendContainer[0]).append("svg")
      .attr("id", "legends")
      .attr('xmlns', 'http://www.w3.org/2000/svg')
      .attr("height", this.layout.legendHeight);
    this.legend = legendSvg
      .append("g")
      .attr("transform", "translate(0.5, 0.5)");

    this.makeGradient(colors);

    this.legend.append("rect")
      .attr("width", this.layout.legendWidth)
      .attr("height", this.layout.colorboxHeight)
      .style("fill", "url(#gradient" + this.id + ")");

    this.drawHistogram();
    this.drawAxis();

    legendSvg.attr("width", this.legend._groups[0][0].getBBox().width);
    var minValueLabelWidth = this.legend.selectAll("#legend-min-text")._groups[0][0].getBBox().width + this.layout.labelHPadding;
    this.legend.style("transform", "translate(" + minValueLabelWidth + "px, 0px)");
  };

  return GradientLegend;

});