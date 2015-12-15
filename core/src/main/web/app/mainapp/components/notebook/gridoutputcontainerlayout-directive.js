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

	var module = angular.module('bk.notebook');
	module.directive('gridOutputContainerLayout', ['bkHelper', function (bkHelper) {
		return {
			restrict: 'E',
			template: JST["mainapp/components/notebook/gridoutputcontainerlayout"](),
			scope: {
				model: '='
			},
			controller: function ($scope) {

				$scope.cellStyle = {
					'border': $scope.model.getCellModel().layout.borderDisplayed ? 'solid 1px #CCC' : '',
					'padding-top': $scope.model.getCellModel().layout.paddingTop+"px",
					'padding-bottom': $scope.model.getCellModel().layout.paddingBottom+"px",
					'padding-left': $scope.model.getCellModel().layout.paddingLeft+"px",
					'padding-right': $scope.model.getCellModel().layout.paddingRight+"px"
				};
				$scope.colCount = $scope.model.getCellModel().layout.columns;
				$scope.rows = [];

				$scope.isShowOutput = function () {
					return $scope.model.isShowOutput();
				};

				var row = 0;
				var col = 0;
				$scope.rows[row] = [];
				for (var i = 0; i < $scope.model.getCellModel().items.length; i++) {
					$scope.rows[row].push({
						result: $scope.model.getCellModel().items[i],
						isShowOutput: function () {
							return $scope.showoutput;
						},
						label: $scope.model.getCellModel().labels[i]
					});
					col++;
					if (col === $scope.colCount && i < $scope.model.getCellModel().items.length - 1) {
						row++;
						$scope.rows[row] = [];
					}
				}

				$scope.showoutput = $scope.model.isShowOutput();

				$scope.isShowMenu = function () {
					return false;
				};

					$scope.$watch('isShowOutput()', function (oldval, newval) {
					$scope.showoutput = newval;
				});
			}
		}
	}]);
})();


