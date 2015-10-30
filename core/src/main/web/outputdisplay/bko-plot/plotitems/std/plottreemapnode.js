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

		var PlotTreeMapNode = function (data) {
			_(this).extend(data); // copy properties to itself
		};

		PlotTreeMapNode.prototype.translate = null;
		PlotTreeMapNode.prototype.scale = null;


		PlotTreeMapNode.prototype.prepare = function (scope) {
			var margin = {top: 5, right: 5, bottom: 10, left: 0},
				width = (scope ? scope.jqsvg.width() : 300) - margin.left - margin.right,
				height = (scope ? scope.jqsvg.height() : 200) - margin.top - margin.bottom;

			this.nodes =  d3.layout.treemap()
				.round(false)
				.size([width, height])
				.sticky(true)
				.value(function (d) {
					return d.weight;
				})
				//.mode("slice-dice")
				.nodes(this)
				.filter(function (d) {
					return !d.children || d.children.length === 0;
				})
				;
		};


		PlotTreeMapNode.prototype.render = function (scope) {
			this.clear(scope);
			this.draw(scope);
		};


		PlotTreeMapNode.prototype.draw = function (scope) {

			var color = d3.scale.category20c();

			this.prepare(scope);

			var zoom = d3.behavior.zoom()
				.scaleExtent([1, 10])
				.on("zoom", zoomed);


			scope.maing
				.call(zoom)
			;

			var svg = scope.maing.append("svg:g");

			var cell = svg.selectAll("g")
					.data(this.nodes)
					.enter().append('svg:g')
					.attr('class', 'cell')
					.attr('transform', function (d) {
						return 'translate(' + d.x + ',' + d.y + ')';
					})
					.on("mouseover", function (d) {
						if (d.label) {
							scope.tooltip.style("visibility", "visible");
							scope.tooltip.transition().duration(200).style("opacity", 0.9);
						}
					})
					.on("mousemove", function (d) {
						var xPosition = d3.event.layerX + 2;
						var yPosition = d3.event.layerY - 2;

						scope.tooltip
							.style("left", xPosition + "px")
							.style("top", yPosition + "px");

						if (d.label) {
							scope.tooltip.html(d.label);
						}
					})
					.on("mouseout", function () {
						scope.tooltip.transition().duration(500).style("opacity", 0);
					})
				;


			cell.append("svg:rect")
				.attr("width", function (d) {
					return Math.max(0, d.dx - 0.1);
				})
				.attr("height", function (d) {
					return Math.max(0, d.dy - 0.1);
				})
				.style("fill", function (d) {
					return d.children ? null : color(d.label);
				})
			;


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
					return d.children ? null : d.label;
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
					//.attr("textLength", function(d){
					//	return this.getComputedTextLength() < d.dx ? this.getComputedTextLength() : d.dx;
					//})
					//.style("opacity", function(d){
					//	d.w = this.getComputedTextLength();
					//	return d.dx > d.w && d.showItem === true ? 1 : 0;
					//})

				;
			}

		};


		PlotTreeMapNode.prototype.clear = function (scope) {
			scope.maing.selectAll("*").remove();
		};

		PlotTreeMapNode.prototype.clearTips = function (scope) {
		};

		PlotTreeMapNode.prototype.createTip = function (ele) {

		};

		return PlotTreeMapNode;
	};
	beaker.bkoFactory('PlotTreeMapNode', ['plotUtils',  retfunc]);
})();