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
/**
 * bko-CombinedPlot
 * ????
 */
(function() {
  'use strict';
  beaker.bkoDirective("CombinedPlot",
      ["lineplotUtils",
       "bkCellMenuPluginManager",
        function(lineplotUtils, bkCellMenuPluginManager) {
          return {
            template: "<div id='combplotContainer' class='combplot-renderdiv'>"+
            "<bk-output-display type='LinePlot' model='model1'></bk-output-display>"+
            "<bk-output-display type='LinePlot' model='model2'></bk-output-display>"+
            "</div>",
            controller: function($scope) {
              var model = $scope.model.getCellModel();

              $scope.initFocus = function(){
                var xl = 1E20, xr = 0;
                var numPlots = model.plots.length;
                for(var i=0; i<numPlots; i++){
                  var data = model.plots[i].data;
                  for(var j=0; j<data.length; j++){
                    var points = data[j].points;
                    for(var k=0; k<points.length; k++){
                      xl = Math.min(xl, points[k].x);
                      xr = Math.max(xr, points[k].x);
                    }
                  }
                }
                $scope.focus = {"xl":xl, "xr":xr};
              }
              
              $scope.initFocus();
              
              $scope.model1 = {
                getCellModel: function(){
                  return model.plots[0];
                },
                resetShareMenuItems: function() {
                },
                getFocus: function(){
                  //console.log("RETURN", $scope.focus);
                  return $scope.focus;
                },
                updateFocus: function(focus){
                  //console.log("UPDATE", $scope.focus);
                  $scope.focus = focus;
                  $scope.$apply();
                },
                updateWidth: function(width){
                  $scope.width = width;
                  $scope.$apply();
                },
                getWidth: function(){
                  return $scope.width;
                }
              }
              $scope.model2 = {
                getCellModel: function(){
                  return model.plots[1];
                },
                resetShareMenuItems: function() {
                },
                getFocus: function(){
                  return $scope.focus;
                },
                updateFocus: function(focus){
                  $scope.focus = focus;
                  $scope.$apply();
                },
                updateWidth: function(width){
                  $scope.width = width;
                  $scope.$apply();
                },
                getWidth: function(){
                  return $scope.width;
                }
              }
            },
            link: function(scope, element, attrs) {
            }
          }
        }]);
})();