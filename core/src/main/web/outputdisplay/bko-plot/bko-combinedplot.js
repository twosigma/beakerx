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
  var retfunc = function(plotUtils, combplotConverter, bkCellMenuPluginManager) {
    return {
      template :  "<div id='combplotTitle' class='plot-title'></div>" + 
          "<div id='combplotContainer' class='combplot-renderdiv'>" + 
          "<bk-output-display type='Plot' ng-repeat='m in models' model='m'></bk-output-display>" +
          "</div>",
      controller : function($scope) {
        var model = $scope.model.getCellModel();
        $scope.stdmodel = combplotConverter.standardizeModel(model);
        model = $scope.stdmodel;
        $scope.models = [];

        $scope.init = function() {
          var xl = 1E20, xr = 0;
          var numPlots = model.plots.length;
          for (var i = 0; i < numPlots; i++) {
            var plotmodel = model.plots[i]; // models are already standardized at this point
            var ret = plotUtils.getInitFocus(plotmodel);
            xl = Math.min(xl, ret.initFocus.xl);
            xr = Math.max(xr, ret.initFocus.xr);
          }
          
          for (var i = 0; i < numPlots; i++) {
            var plotmodel = model.plots[i];
            
            $scope.models.push({
              "model" : plotmodel,
              getCellModel : function() {
                return this.model;
              },
              resetShareMenuItems : function() {
              },
              getFocus : function() {
                return $scope.focus;
              },
              updateFocus : function(focus) {
                $scope.focus = focus;
                $scope.$apply();
              },
              updateWidth : function(width) {
                $scope.width = width;
                $scope.jqplottitle.css("width", width + "px");
                $scope.$apply();
              },
              getWidth : function() {
                return $scope.width;
              }
            });
          }
          $scope.focus = {
            "xl" : xl,
            "xr" : xr
          };
        };
        $scope.init();
      },
      link : function(scope, element, attrs) {
        var model = scope.stdmodel;
        scope.jqplottitle = element.find("#combplotTitle");
        scope.jqplottitle.text(model.title).css("width", model.initSize.width);
      }
    };
  };
  beaker.bkoDirective("CombinedPlot", 
      ["plotUtils", "combplotConverter", "bkCellMenuPluginManager", retfunc]);
})();
