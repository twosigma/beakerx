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

        scope.prepareSavedState = function(state) {
          state.focus = scope.calcRange();
          scope.width = scope.stdmodel.plotSize.width;
        };

        scope.applySavedState = function(state) {
          scope.state = state;
          scope.width = state.width;
        };

        scope.preparePlotModels = function() {
          var models = [];
          var plots = scope.stdmodel.plots;
          
          // create a plot model and a saved state for each plot
          for (var i = 0; i < plots.length; i++) {

            var plotmodel = plots[i];
            plotmodel.plotIndex = i;
            var pl = {
              model : plotmodel,
              state : { },
              getCellModel : function() {
                return this.model;
              },
              getDumpState: function() {
                return this.state;
              },
              setDumpState: function(s) {
                this.state = s;
		if(scope.model.setDumpState !== undefined) {
		    scope.model.setDumpState(scope.dumpState());
		}
              },
              resetShareMenuItems : function() {
              },
              getFocus : function() {
                return scope.focus;
              },
              updateFocus : function(focus) {
                scope.focus = {};
                _(scope.focus).extend(focus);
                scope.$apply();
              },
              updateWidth : function(width) {
                scope.width = width;
                scope.jqplottitle.css("width", width);
                scope.$apply();
              },
              getWidth : function() {
                return scope.width;
              }
            };
            models.push(pl);
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

        scope.dumpState = function() {
          var ret = { };
          ret.focus = scope.focus;
          ret.width = scope.width;
          ret.subplots = [];
          for (var i = 0; i < scope.models.length; i++) {
            ret.subplots.push(scope.models[i].state);
          }
          return ret;
        };
        
        scope.init = function() {
          scope.standardizeData();
          scope.preparePlotModels();
          scope.initLayout();
          scope.calcRange();

	  if(scope.model.getDumpState !== undefined) {
            var savedstate = scope.model.getDumpState();
            if (savedstate.subplots !== undefined) {
	      for (var i = 0; i < scope.models.length; i++) {
		scope.models[i].state = savedstate.subplots[i];
	      }
	      scope.width = savedstate.width;
	      scope.focus = savedstate.focus;
	    } else if(scope.models !== undefined) {
	      scope.focus = scope.calcRange();
	      for (var i = 0; i < scope.models.length; i++) {
		scope.models[i].state = { };
	      }
	      scope.model.setDumpState(scope.dumpState());
	    }
	  }
        };
        
	if(scope.model.getDumpState !== undefined) {
	  scope.getDumpState = function() {
	    return scope.model.getDumpState();
	  };
	}

        scope.init();
        
	if(scope.model.getDumpState !== undefined) {
          scope.$watch('getDumpState()', function(result) {
            if (result.subplots === undefined && scope.models !== undefined) {
              for (var i = 0; i < scope.models.length; i++) {
                scope.models[i].state = { };
	      }
	      scope.model.setDumpState(scope.dumpState());
	    }
	  });
	}

      }
    };
  };
  beaker.bkoDirective("CombinedPlot",
      ["plotUtils", "combinedplotFormatter", "bkCellMenuPluginManager", retfunc]);
})();
