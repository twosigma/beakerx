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
  var retfunc = function() {

    var layout = {
      labelHPadding: 5,
      labelVPadding: 15,
      tickSize: 5,
      legendWidth: 350, //TODO can change it from outside?
      legendHeight: 60,
      colorboxHeight: 20,
      axisPadding: 10,
      histHeight: 7
    };

    var makeGradient = function(legend, colors) {
      var gradient = legend.append("defs")
        .append("linearGradient")
        .attr("id", "gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "0%")
        .attr("spreadMethod", "pad");
      gradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", colors[0])
        .attr("stop-opacity", 1);
      gradient.append("stop")
        .attr("offset", "50%")
        .attr("stop-color", colors[1])
        .attr("stop-opacity", 1);
      gradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", colors[2])
        .attr("stop-opacity", 1);
    };

    var renderAxis = function(legend, data){
      var labelsCount = 6; //TODO need to calculate labels count
      var ticks;
      var axislines = [];
      var axislabels = [];
      var axisliney = layout.colorboxHeight + layout.axisPadding;


      axislines.push({
        id: "legend-axis",
        class: "plot-legend-axis",
        x1: 0,
        x2: layout.legendWidth,
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
        y2: axisliney - layout.tickSize
      });
      axislines.push({
        id: "legend-tick-right",
        class: "plot-legend-tick",
        x1: layout.legendWidth,
        x2: layout.legendWidth,
        y1: axisliney,
        y2: axisliney - layout.tickSize
      });

      //ticks and labels
      var axis = d3.scale.linear().range([0, layout.legendWidth]);
      axis.domain([data[0].minValue, data[0].maxValue]);
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
          y2: axisliney + layout.tickSize
        });
        axislabels.push({
          id: "legend-tick-text-" + i,
          class: "plot-legend-label",
          x: getTickX(i),
          y: axisliney + layout.labelVPadding,
          dy: ".35em",
          text: ticks[i],
          "text-anchor": "middle"
        });
      }

      //min and max value labels
      axislabels.push({
        id: "legend-min-text",
        class: "plot-legend-label",
        x: -layout.labelHPadding,
        y: axisliney,
        text: data[0].minValue.toFixed(4) * 1,
        "text-anchor": "end",
        "dominant-baseline": "central"
      });
      axislabels.push({
        id: "legend-max-text",
        class: "plot-legend-label",
        x: layout.legendWidth + layout.labelHPadding,
        y: axisliney,
        text: data[0].maxValue.toFixed(4) * 1,
        "text-anchor": "start",
        "dominant-baseline": "central"
      });

      legend.selectAll("line").remove();
      legend.selectAll("line")
        .data(axislines, function(d) { return d.id; }).enter().append("line")
        .attr("id", function(d) { return d.id; })
        .attr("class", function(d) { return d.class; })
        .attr("x1", function(d) { return d.x1; })
        .attr("x2", function(d) { return d.x2; })
        .attr("y1", function(d) { return d.y1; })
        .attr("y2", function(d) { return d.y2; });
      legend.selectAll("text").remove();
      legend.selectAll("text")
        .data(axislabels, function(d) { return d.id; }).enter().append("text")
        .attr("id", function(d) { return d.id; })
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("dy", function(d) { return d.dy; })
        .style("text-anchor", function(d) { return d["text-anchor"]; })
        .style("dominant-baseline", function(d) { return d["dominant-baseline"]; })
        .text(function(d) { return d.text; });
    };

    var makeHistogram = function(legend, data) {

      //create histogram data
      var flatValues = [];
      var elements = data[0].elements;
      for (var i = 0; i < elements.length; i++) {
        flatValues.push(elements[i].value);
      }
      var histValues = d3.layout.histogram().bins(100)(flatValues);
      var min = histValues[0].y, max = min;
      for (var i = 0; i < histValues.length; i++) {
        min = Math.min(min, histValues[i].y);
        max = Math.max(max, histValues[i].y);
      }

      // the x-scale parameters
      var x = d3.scale.linear()
        .domain([data[0].minValue, data[0].maxValue])
        .range([0, layout.legendWidth]);

      // the y-scale parameters
      var axisliney = layout.colorboxHeight + layout.axisPadding;
      var y = d3.scale.linear()
        .domain([min, max])
        .range([axisliney, axisliney - layout.histHeight]);

      var yreflected = d3.scale.linear()
        .domain([min, max])
        .range([axisliney, axisliney + layout.histHeight]);

      var createLine = function(yScale) {
        return d3.svg.line()
          .x(function(d) { return x(d.x + d.dx / 2); })
          .y(function(d) { return yScale(d.y); });
      };

      legend.append("path")
        .datum(histValues)
        .attr("class", "plot-legend-histogram")
        .attr("d", createLine(y));
      legend.append("path")
        .datum(histValues)
        .attr("class", "plot-legend-histogram")
        .attr("d", createLine(yreflected));
    };

    return {
      render: function(legendContainer, data) {
        var colors = ["#780004", "#F15806", "#FFCE1F"];

        var legendSvg = d3.select(legendContainer[0]).append("svg")
          .attr("id", "legends")
          .attr('xmlns', 'http://www.w3.org/2000/svg')
          .attr("height", layout.legendHeight);
        var legend = legendSvg
          .append("g")
          .attr("transform", "translate(0.5, 0.5)");

        makeGradient(legend, colors);

        legend.append("rect")
          .attr("width", layout.legendWidth)
          .attr("height", layout.colorboxHeight)
          .style("fill", "url(/beaker/#gradient)");

        makeHistogram(legend, data);
        renderAxis(legend, data);

        legendSvg.attr("width", legend[0][0].getBBox().width);
        var minValueLabelWidth = legend.selectAll("#legend-min-text")[0][0].getBBox().width + layout.labelHPadding;
        legend.style("transform", "translate(" + minValueLabelWidth + "px, 0px)");
      }
    };
  };
  beaker.bkoFactory('gradientLegend', retfunc);
})();
