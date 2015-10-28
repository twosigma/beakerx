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

(function () {
	'use strict';
	var retfunc = function (plotUtils) {

		var PlotTreeMap = function (data) {
			_(this).extend(data); // copy properties to itself
			this.format();
		};

		PlotTreeMap.prototype.translate = null;
		PlotTreeMap.prototype.scale = null;


		PlotTreeMap.prototype.format = function () {

		};

		PlotTreeMap.prototype.render = function (scope) {
			this.clear(scope);

			var hasVisible = false;
			var visitor = {

				visit: function (node) {
					if (node.showItem === true)
						hasVisible = true;
				}
			};

			this.process(visitor);

			if (hasVisible === true) {
				this.filter(scope);
				this.prepare(scope);
				if (this.vlength !== 0) {
					this.draw(scope);
				}
			}

		};


		PlotTreeMap.prototype.filter = function (scope) {
		};

		PlotTreeMap.prototype.prepare = function (scope) {
		};


		PlotTreeMap.prototype.draw = function (scope) {

			var colourscale = d3.scale.linear()
				.range(["#" + this.colorMinRange.substring(3, 9), "#" + this.colorMaxRange.substring(3, 9)])
				.domain([this.minValue, this.maxValue]);

			var margin = {top: 5, right: 5, bottom: 5, left: 0},
				width = scope.jqsvg.width() - margin.left - margin.right,
				height = scope.jqsvg.height() - margin.top - margin.bottom;

			var zoom = d3.behavior.zoom()
				.scaleExtent([1, 10])
				.on("zoom", zoomed);

			var drag = d3.behavior.drag()
				.origin(function (d) {
					return d;
				})
				.on("dragstart", dragstarted)
				.on("drag", dragged)
				.on("dragend", dragended);


			scope.maing
				.call(zoom)
				.call(drag);

			var svg = scope.maing.append("svg:g");

			var treemap = d3.layout.treemap()
				.round(false)
				.size([width, height])
				.sticky(true)
				.value(function (d) {
					return d.showItem === true ? d._value_ : 0;
				});

			var nodes = treemap.nodes({children: this.values}).filter(function (d) {
				return !d.children || d.children.length === 0;
			});
			treemap.links(nodes);
			var cell = svg.selectAll("g")
				.data(nodes)
				.enter().append('svg:g')
				.attr('class', 'cell')
				.attr('transform', function (d) {
					return 'translate(' + d.x + ',' + d.y + ')';
				})
				.on("mouseover", function (d) {
					if (d._tooltip_) {
						scope.tooltip.style("visibility", "visible");
						scope.tooltip.transition().duration(200).style("opacity", 0.9);
					}
				})
				.on("mousemove", function (d) {
					var xPosition = d3.event.layerX + 25;
					var yPosition = d3.event.layerY - 35;

					scope.tooltip
						.style("left", xPosition + "px")
						.style("top", yPosition + "px");

					if (d._tooltip_) {
						scope.tooltip.html(d._tooltip_);
					}
				})
				.on("mouseout", function () {
					scope.tooltip.transition().duration(500).style("opacity", 0);
				});


			cell.append("svg:rect")
				.attr("width", function (d) {
					return Math.max(0, d.dx - 0.1);
				})
				.attr("height", function (d) {
					return Math.max(0, d.dy - 0.1);
				})
				.style("fill", function (d) {
					return d.children ? null : colourscale(d._synthetic_value_);
				});


			cell.append("svg:text")
				.attr("x", function (d) {
					return d.dx / 2;
				})
				.attr("y", function (d) {
					return d.dy / 2;
				})
				.attr("cursor", "default")
				.attr("text-anchor", "middle")
				.text(function (d) {
					return d.children ? null : d._name_;
				});
			setTextStyles();

			function zoomed() {
				svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
				setTextStyles();
			}

			function setTextStyles(){
				svg.selectAll("text")
					.style('font-size', function(d){
						var scale = d3.event && d3.event.scale ? d3.event.scale : 1;
						var size = Math.min(18 / scale, Math.floor(d.dx));
						return size + "px"
					})
					.attr("textLength", function(d){
						return this.getComputedTextLength() < d.dx ? this.getComputedTextLength() : d.dx;
					})
					.style("opacity", function(d){
						d.w = this.getComputedTextLength();
						return d.dx > d.w && d.showItem === true ? 1 : 0;
					})

				;
			}


			function dragstarted(d) {
				d3.event.sourceEvent.stopPropagation();
				d3.select(this).classed("dragging", true);
			}

			function dragged(d) {
				d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
			}

			function dragended(d) {
				d3.select(this).classed("dragging", false);
			}

		};


		PlotTreeMap.prototype.clear = function (scope) {
			scope.maing.selectAll("*").remove();
		};

		PlotTreeMap.prototype.clearTips = function (scope) {
		};

		PlotTreeMap.prototype.createTip = function (ele) {

		};

		return PlotTreeMap;
	};
	beaker.bkoFactory('PlotTreeMap', ['plotUtils',  retfunc]);
})();