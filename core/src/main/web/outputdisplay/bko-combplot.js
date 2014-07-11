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
(function() {'use strict';
	var retfunc = function(plotUtils, combplotConverter, bkCellMenuPluginManager) {
		return {
			template : "<div id='combplotContainer' class='combplot-renderdiv'>" + 
								"<bk-output-display type='Plot' ng-repeat='m in models' model='m'></bk-output-display>" +
								 //"<bk-output-display type='Plot' model='model1'></bk-output-display>" + 
								 //"<bk-output-display type='Plot' model='model2'></bk-output-display>" + 
								 "</div>",
			controller : function($scope) {
				var model = $scope.model.getCellModel();
				$scope.stdmodel = combplotConverter.standardizeModel(model);
				model = $scope.stdmodel;
				$scope.models = [];
				
				$scope.init = function() {
					var xl = 1E20, xr = 0;
					var model = $scope.stdmodel;
					var numPlots = model.plots.length;
					
					for (var i = 0; i < numPlots; i++) {
						var data = model.plots[i].data;
						var ret = plotUtils.getDataRange(data);
						xl = Math.min(xl, ret.datarange.xl);
						xr = Math.max(xr, ret.datarange.xr);
						var plotmodel = model.plots[i];
						
						//console.log(plotmodel, i, model.plots[i]);
						$scope.models.push({
							"model": plotmodel,
							getCellModel : function(){
								return this.model; 
							},
							resetShareMenuItems : function(){
							},
							getFocus : function() { 
								return $scope.focus; 
							},
							updateFocus : function(focus){
								$scope.focus = focus;
								$scope.$apply();
							},
							updateWidth : function(width) {
								$scope.width = width;
								$scope.$apply();
							},
							getWidth : function(){
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

/*
				$scope.model1 = {
					getCellModel : function() {
						return model.plots[0];
					},
					resetShareMenuItems : function() {
					},
					getFocus : function() {
						//console.log("RETURN", $scope.focus);
						return $scope.focus;
					},
					updateFocus : function(focus) {
						//console.log("UPDATE", $scope.focus);
						$scope.focus = focus;
						$scope.$apply();
					},
					updateWidth : function(width) {
						$scope.width = width;
						$scope.$apply();
					},
					getWidth : function() {
						return $scope.width;
					}
				};
				$scope.model2 = {
					getCellModel : function() {
						return model.plots[1];
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
						$scope.$apply();
					},
					getWidth : function() {
						return $scope.width;
					}
				};
				*/
			},
			link : function(scope, element, attrs) {
				scope.container = d3.select(element[0]).select("#combplotContainer");
				scope.jqcontainer = element.find("#combplotContainer");
			}
		};
	};
	beaker.bkoDirective("CombinedPlot", ["plotUtils", "combplotConverter", "bkCellMenuPluginManager", retfunc]);
})(); 