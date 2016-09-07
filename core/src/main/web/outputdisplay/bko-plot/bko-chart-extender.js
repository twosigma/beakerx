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
	var retfunc = function () {
		return {

			extend: function (scope, element, attrs) {

				// rendering code
				element.find(".plot-plotcontainer").resizable({
					maxWidth: element.width(), // no wider than the width of the cell
					minWidth: 450,
					minHeight: 150,
					handles: "e, s, se",
					resize: function (event, ui) {
						scope.width = ui.size.width;
						scope.height = ui.size.height;
						_(scope.plotSize).extend(ui.size);

						scope.jqsvg.css({"width": scope.width, "height": scope.height});
						scope.jqplottitle.css({"width": scope.width});
						scope.emitSizeChange();
						scope.legendDone = false;
						scope.legendResetPosition = true;

						scope.update();
					}
				});

				scope.calcRange = function(){

				};


				scope.calcLegendableItem = function() {
					scope.legendableItem = 0;
					var visitor = {
						i: 0,
						visit: function (node) {
							if (node.legend){
								scope.legendableItem++;
							}
						}
					};
					scope.stdmodel.process(visitor);
				};

				scope.init = function () {

					// first standardize data
					scope.standardizeData();
					// init flags
					scope.initFlags();

					scope.plotSize = {};

					_.extend(scope.plotSize, scope.stdmodel.plotSize);
					var savedstate = scope.model.getDumpState();
					if (savedstate !== undefined && savedstate.plotSize !== undefined) {
						scope.loadState(savedstate);
					} else {
					  if (scope.setDumpState !== undefined) {
						scope.setDumpState(scope.dumpState());
					  }
					}

					// create layout elements
					scope.initLayout();

					scope.resetSvg();

					scope.update();
				};

				scope.update = function (first) {
					if (scope.model.isShowOutput !== undefined && scope.model.isShowOutput() === false) {
						return;
					}
					scope.resetSvg();
					scope.renderData();
					scope.renderLegends(); // redraw
					scope.updateMargin(); //update plot margins
					scope.calcLegendableItem();
				};

				scope.initLayout = function () {
					var model = scope.stdmodel;

					element.find(".ui-icon-gripsmall-diagonal-se")
						.removeClass("ui-icon-gripsmall-diagonal-se")
						.addClass("ui-icon-grip-diagonal-se");

					// hook container to use jquery interaction
					scope.container = d3.select(element[0]).select(".plot-plotcontainer");
					scope.jqcontainer = element.find(".plot-plotcontainer");
					scope.jqlegendcontainer = element.find("#plotLegendContainer");
					scope.svg = d3.select(element[0]).select(".plot-plotcontainer svg");
					scope.jqsvg = element.find("svg");
					scope.canvas = element.find("canvas")[0];

					scope.canvas.style.display = "none";

					var plotSize = scope.plotSize;
					scope.jqcontainer.css(plotSize);
					scope.jqsvg.css(plotSize);

					$(window).resize(scope.resizeFunction);

					// set title
					scope.jqplottitle = element.find("#plotTitle");
					scope.jqplottitle.text(model.title).css("width", plotSize.width);

					scope.maing = d3.select(element[0]).select("#maing");
					scope.gridg = d3.select(element[0]).select("#gridg");
					scope.labelg = d3.select(element[0]).select("#labelg");

					// set some constants

					scope.renderFixed = 1;
					scope.layout = {    // TODO, specify space for left/right y-axis, also avoid half-shown labels
						bottomLayoutMargin: 30,
						topLayoutMargin: 0,
						leftLayoutMargin: 80,
						rightLayoutMargin: scope.stdmodel.yAxisR ? 80 : 0,
						legendMargin: 10,
						legendBoxSize: 10
					};

					scope.labelPadding = {
						x: 10,
						y: 10
					};

					scope.locateBox = null;
					scope.cursor = {
						x: -1,
						y: -1
					};

					scope.legendResetPosition = true;

					scope.$watch("model.getWidth()", function (newWidth) {
						if (scope.width == newWidth) {
							return;
						}
						scope.width = newWidth;
						scope.jqcontainer.css("width", newWidth);
						scope.jqsvg.css("width", newWidth);
						scope.legendDone = false;
						scope.legendResetPosition = true;
						scope.update();
					});

					scope.$watch('model.isShowOutput()', function (prev, next) {
						if (prev !== next) {
							scope.update();
						}
					});

					$("<div></div>").appendTo(scope.jqlegendcontainer)
						.attr("id", "tooltip")
						.attr("class", "plot-tooltip")
						.attr("style", "visibility: hidden");
					scope.tooltip = d3.select(element[0]).select("#tooltip");
				};

				scope.dumpState = function () {
					var state = {};

					state.showAllItems = scope.showAllItems;
					state.plotSize = scope.plotSize;
					state.showItem = [];
					var data = scope.stdmodel.data;
					for (var i = 0; i < data.length; i++) {
						state.showItem[i] = data[i].showItem;
					}
					state.visibleItem = scope.visibleItem;
					state.legendableItem = scope.legendableItem;
					return state;
				};

				scope.loadState = function (state) {
					scope.showAllItems = state.showAllItems;
					scope.plotSize = state.plotSize;
					var data = scope.stdmodel.data;
					for (var i = 0; i < data.length; i++) {
						data[i].showItem = state.showItem[i];
					}
					scope.visibleItem = state.visibleItem;
					scope.legendableItem = state.legendableItem;
				};

				scope.initFlags = function () {
					scope.showAllItems = true;
				};
			}
		};
	};
	beakerRegister.bkoFactory('bkoChartExtender',
		[retfunc]);
})();
