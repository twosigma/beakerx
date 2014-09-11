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

/*
 * bkoCombinedPlot
 * This is the output display component for displaying multiple Plots
 */

(function() {
  'use strict';
  var retfunc = function(plotUtils, combinedplotFormatter, bkCellMenuPluginManager) {
    var CELL_TYPE = "bko-combinedplot";
    return {
      template :  "<div id='combplotTitle' class='plot-title'></div>" +
          "<div id='combplotContainer' class='combplot-plotcontainer'>" +
          "<bk-output-display type='Plot' ng-repeat='m in models' model='m'></bk-output-display>" +
          "</div>",
      controller : function($scope) {
        $scope.getShareMenuPlugin = function() {
          return bkCellMenuPluginManager.getPlugin(CELL_TYPE);
        };
        $scope.$watch("getShareMenuPlugin()", function() {
          var newItems = bkCellMenuPluginManager.getMenuItems(CELL_TYPE, $scope);
          $scope.model.resetShareMenuItems(newItems);
        });
      },
      link : function(scope, element, attrs) {
        scope.initLayout = function() {
          var model = scope.stdmodel;
          if(model.title != null) {
            scope.jqplottitle = element.find("#combplotTitle");
            scope.jqplottitle.text(model.title).css("width", scope.width);
          }
        };

        scope.standardizeData = function() {
          var model = scope.model.getCellModel();
          scope.stdmodel = combinedplotFormatter.standardizeModel(model);
        };

        scope.checkSavedState = function() {
          var state = scope.model.getClientState();

          if (state.savedState == null) {
            scope.isPreviousState = false;
            state.savedState = {};
            state.savedStates = [];
            scope.prepareSavedState(state.savedState, state.savedStates);
          } else {
            scope.isPreviousState = true;
            scope.applySavedState(state.savedState, state.savedStates);
          }
        };

        scope.prepareSavedState = function(state, states) {
          scope.state = state;
          state.focus = scope.calcRange();
          scope.states = states;
          // create a state for each plot
          var plots = scope.stdmodel.plots;
          for (var i = 0; i < plots.length; i++) {
            states.push({});
          }
          state.width = scope.stdmodel.plotSize.width;
          scope.width = state.width;
        };

        scope.applySavedState = function(state, states) {
          scope.state = state;
          scope.states = states;
          scope.width = state.width;
        };

        scope.preparePlotModels = function() {
          var models = [];
          var plots = scope.stdmodel.plots;
          var states = scope.states;

          for (var i = 0; i < plots.length; i++) {

            var plotmodel = plots[i];
            plotmodel.plotIndex = i;
            models.push({
              model : plotmodel,
              getCellModel : function() {
                return this.model;
              },
              getClientState : function() {
                return states[this.model.plotIndex];
              },
              resetShareMenuItems : function() {
              },
              getFocus : function() {
                return scope.focus;
              },
              updateFocus : function(focus) {
                scope.focus = {};
                _(scope.focus).extend(focus);
                scope.state.focus = scope.focus; // reference is changed
                scope.$apply();
              },
              updateWidth : function(width) {
                scope.width = width;
                scope.state.width = width;
                scope.jqplottitle.css("width", width);
                scope.$apply();
              },
              getWidth : function() {
                return scope.width;
              }
            });
          }
          scope.models = models;
        };

        scope.calcRange = function() {
          var xl = 1E100, xr = 0;
          var plots = scope.stdmodel.plots;
          for (var i = 0; i < plots.length; i++) {
            var plotmodel = plots[i]; // models are already standardized at this point
            var ret = plotUtils.getDefaultFocus(plotmodel);
            xl = Math.min(xl, ret.defaultFocus.xl);
            xr = Math.max(xr, ret.defaultFocus.xr);
          }
          return {
            "xl" : xl,
            "xr" : xr
          };
        };

        scope.init = function() {
          scope.standardizeData();
          scope.checkSavedState();
          scope.preparePlotModels();
          scope.initLayout();

          // call this after the plot models are prepared so as to update focus
          scope.focus = scope.state.focus;
        };

        scope.init();
      }
    };
  };
  beaker.bkoDirective("CombinedPlot",
      ["plotUtils", "combinedplotFormatter", "bkCellMenuPluginManager", retfunc]);
})();
