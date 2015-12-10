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
	module.directive('dashboardLayout', ['bkHelper', function (bkHelper) {
		return {
			restrict: 'E',
			template: 'DashboardLayoutManager<ul><li class="outputcontainer-li" ng-repeat="i in items track by $index"><b ng-if="hasName($index)">{{getName($index)}}<br/></b><bk-code-cell-output model="i" >' +
			'</ bk-code-cell-output><br/>></li></ul>',
			scope: {
				model: '='
			},
			controller: function ($scope) {
				$scope.items = $scope.model.getCellModel().items;
				$scope.labels = $scope.model.getCellModel().labels;
				$scope.isShowOutput = function () {
					return $scope.model.isShowOutput();
				};

				$scope.showoutput = $scope.model.isShowOutput();
				$scope.items = _.map($scope.model.getCellModel().items, function (it) {
					return {
						result: it,
						isShowOutput: function () {
							return $scope.showoutput;
						}
					};
				});
				$scope.getName = function (idx) {
					return $scope.model.getCellModel().labels[idx] || '';
				};
				$scope.hasName = function (idx) {
					return $scope.model.getCellModel().labels !== undefined;
				};
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


