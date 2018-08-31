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

var PlotLayout = require('./PlotLayout.ts').default;

define([
    'underscore'
  ],
  function(
    _
  ) {
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
          _(scope.layout.plotSize).extend(ui.size);

          scope.jqsvg.css({"width": scope.width, "height": scope.height});
          scope.jqplottitle.css({"width": scope.width});
          scope.emitSizeChange();
          scope.legendDone = false;
          scope.legendResetPosition = true;

          scope.update();
        }
      });

      scope.plotRange.calcRange = function() {
        console.log('calcRange');

        scope.plotFocus.setDefault({
          xl: 0,
          xr: 1,
          yl: 0,
          yr: 1,
          xspan: 1,
          yspan: 1
        });

        scope.plotFocus.fix(this.scope.plotFocus.defaultFocus)
      };

      scope.plotRange.calcMapping = function() {
        console.log('calcMapping');
      };

      scope.plotSize.updateModelWidth = function(newWidth) {
        console.log('updateModelWidth');
        if (scope.width === newWidth) {
          return;
        }

        scope.width = newWidth;
        scope.jqcontainer.css("width", newWidth );
        scope.jqsvg.css("width", newWidth );
        scope.emitSizeChange();
        scope.legendDone = false;
        scope.legendResetPosition = true;

        scope.update();
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
        scope.plotLegend.render(); // redraw
        scope.updateMargin(); //update plot margins
        scope.calcLegendableItem();
      };

      scope.initLayout = function () {
        scope.layout = new PlotLayout(scope);

        $("<div></div>").appendTo(scope.jqlegendcontainer)
          .attr("id", "tooltip")
          .attr("class", "plot-tooltip")
          .attr("style", "visibility: hidden");
        scope.tooltip = d3.select(element[0]).select("#tooltip");
      };

      scope.dumpState = function () {
        var state = {};

        state.showAllItems = scope.showAllItems;
        state.plotSize = scope.layout.plotSize;
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
  }
});