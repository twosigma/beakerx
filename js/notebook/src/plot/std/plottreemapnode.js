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
  'd3'
], function(
  d3
) {

  const PlotUtils = require("../utils/PlotUtils").default;
  const PlotStyleUtils = require("beakerx_shared/lib/utils/PlotStyleUtils").default;

  var PlotTreeMapNode = function (data) {
    _(this).extend(data); // copy properties to itself
  };


  PlotTreeMapNode.prototype.isRoot = function () {
    return this.root === true;
  };

  PlotTreeMapNode.prototype.hideTips = function (scope, hidden) {
    //dummy function
  };

  PlotTreeMapNode.prototype.setHighlighted = function (scope, highlighted) {
    if (this.isRoot())
      return;
    var itemsvg = scope.maing.select("g").select("#" + this.id);
    if (highlighted) {
      itemsvg.node().parentNode.appendChild(itemsvg.node()); // workaround for bringing elements to the front (ie z-index)
    }
    itemsvg
      .transition()
      .duration(PlotUtils.getHighlightDuration())
      .select("rect")
      .style("stroke", highlighted ? "#000000" : "#FFFFFF")
      .style("stroke-width", highlighted ? 2 : 0.2)
      .style("opacity", highlighted ? 0.9 : 1.0)
    ;
  };


  PlotTreeMapNode.prototype.prepare = function (scope) {
    if (!this.isRoot())
      return;

    var margin = {top: 0, right: 0, bottom: 0, left: 0},
      width = (scope ? PlotStyleUtils.safeWidth(scope.jqsvg) : 300) - margin.left - margin.right,
      height = (scope ? PlotStyleUtils.safeHeight(scope.jqsvg) : 200) - margin.top - margin.bottom;

    // assign ratio
    this.ratio = scope.stdmodel.ratio === undefined ? 1 : scope.stdmodel.ratio;

    var treemap = d3.treemap()
      .round(false)
      .size([width / this.ratio, height]);
    // .sticky(true)


    // mode
    var currentModeFn = this.getModeFn(scope.stdmodel.mode);
    treemap.tile(currentModeFn);

    if (scope.stdmodel.round) {
      treemap.round(scope.stdmodel.round)
    }

    // if (scope.stdmodel.sticky) {
    //   treemap.sticky(scope.stdmodel.sticky)
    // }

    this.hierarchy = d3.hierarchy(this)
      .sum(function(d) {
        return hierarchySum(d, scope);
      })
      .sort(function(a, b) { return a.value - b.value; });

    // activate treemap
    treemap(this.hierarchy);

    this.nodes = this.hierarchy.leaves();
    // .filter(function (d) {
    //   return !d.children || d.children.length === 0;
    // });
  };


  PlotTreeMapNode.prototype.render = function (scope) {
    if (!this.isRoot())
      return;

    this.clear(scope);
    if (scope.showAllItems) {
      var hasVisible = false;
      var visitor = {

        visit: function (node) {
          if (!node.children && node.showItem === true)
            hasVisible = true;
        }
      };
      scope.stdmodel.process(visitor);
      if (hasVisible === true) {
        this.draw(scope);
      }
    }
  };


  PlotTreeMapNode.prototype.draw = function (scope) {
    var self = this;

    var zoomed = function () {
      svg.attr("transform", d3.event.transform);
      setTextStyles();
    };

    var setTextStyles = function () {
      svg.selectAll("text")
        .style('font-size', function (d) {
          var scale = d3.event && d3.event.transform ? d3.event.transform.k : 1,
            size = Math.min(18 / scale, Math.floor(d.x1 - d.x0));
          return size + "px"
        })
        .attr("textLength", function (d) {
          return this.getComputedTextLength() < d.x1 - d.x0 ? this.getComputedTextLength() : d.x1 - d.x0;
        })
        .style("opacity", function (d) {
          d.w = this.getComputedTextLength();
          return d.x1 - d.x0 > d.w && d.data.showItem === true ? 1 : 0;
        })
      ;
    };

    if (!this.isRoot())
      return;

    this.prepare(scope);

    var zoom = d3.zoom().scaleExtent([1, 10]);

    var enableZoom = function () {
      scope.maing.call(zoom.on("zoom", zoomed));
      scope.maing.call(zoom)
        .on("dblclick.zoom", function () {
          svg.attr("transform", "translate(" + [0, 0] + ")scale(" + 1 + ")");
          setTextStyles();
        });
    };

    var disableZoom = function () {
      scope.maing.call(zoom.on("zoom", null));
      scope.maing.on("wheel.zoom", null);
    };

    // set zoom object
    scope.maing.on("focusin", function () {
      enableZoom();
    }).on("focusout", function () {
      disableZoom();
    });

    scope.maing.call(zoom)
      .on("dblclick.zoom", function () {
        svg.attr("transform", "translate(" + [0, 0] + ")scale(" + 1 + ")");
        setTextStyles();
      });

    var svg = scope.maing.append("svg:g");
    var cell = svg.selectAll("g")
      .data(this.nodes)
      .enter().append('svg:g')
      .attr('class', 'cell')
      .attr("id", function (d) {
        return d.data.id;
      })
      .attr('transform', function (d) {
        return 'translate(' + d.x0 * self.ratio + ',' + d.y0 + ')';
      })
      .on("mouseover", function (d) {
        if (scope.stdmodel.useToolTip === true && d.data.tooltip) {
          scope.tooltip.style("visibility", "visible");
          scope.tooltip.transition().duration(100).style("opacity", 0.9);
        }
      })
      .on("mousemove", function (d) {
        var xPosition = d3.event.layerX + 16;
        var yPosition = d3.event.layerY - 2;

        scope.tooltip
          .style("left", xPosition + "px")
          .style("top", yPosition + "px");

        if (d.data.tooltip) {
          scope.tooltip.html(d.data.tooltip);
        }
      })
      .on("mouseout", function () {
        scope.tooltip.transition().duration(200).style("opacity", 0);
      });

    cell.append("svg:rect")
      .attr("width", function (d) {
        return Math.max(0, d.x1 * self.ratio - d.x0 * self.ratio - 0.2);
      })
      .attr("height", function (d) {
        return Math.max(0, d.y1 - d.y0 - 0.2);
      })
      .style("fill", function (d) {
        return d.children ? null : d.data.color;
      });

    cell.append("svg:text")
      .attr("x", function (d) {
        return ((d.x1 - d.x0) / 2) * self.ratio;
      })
      .attr("y", function (d) {
        return (d.y1 - d.y0) / 2;
      })
      .attr("cursor", "default")
      .attr("text-anchor", "middle")
      .text(function (d) {
        return d.children ? null : d.data.label;
      });

    setTextStyles();
    disableZoom();
  };

  PlotTreeMapNode.prototype.getModeFn = function(modeName) {
    var res = null;

    modeName = modeName || '';

    if (modeName === 'squarify') {
      res = d3.treemapSquarify;
    } else if (modeName === 'dice') {
      res = d3.treemapDice;
    } else if (modeName === 'binary') {
      res = d3.treemapBinary;
    } else if (modeName === 'slice') {
      res = d3.treemapSlice;
    } else if (modeName === 'slice-dic') {
      res = d3.treemapSliceDice;
    } else if (modeName === 'resquarify') {
      res = d3.treemapResquarify;
    } else {
      res = d3.treemapSquarify;
    }
    return res;
  };

  PlotTreeMapNode.prototype.clear = function (scope) {
    if (!this.isRoot())
      return;
    scope.maing.selectAll("*").remove();
  };

  return PlotTreeMapNode;

  // ----

  function hierarchySum(d, scope) {
    var res = 0;

    if (d.showItem === true) {
      var accessorValue = scope.stdmodel.valueAccessor === 'VALUE',
        hasChildren = d.children && d.children.length;

      if (accessorValue) {
        res = d.doubleValue;
      } else if (!hasChildren) {
        res = d.weight;
      }

    }

    return res;
  }

});