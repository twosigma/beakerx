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

	module.directive('tabbedOutputContainerLayout', ['bkHelper', function (bkHelper) {
		return {
			restrict: 'E',
			template: JST["mainapp/components/notebook/tabbedoutputcontainerlayout"](),
			scope: {
				model: '='
			},
			controller: function ($scope) {
				$scope.borderStyle = {
					'border': $scope.model.getCellModel().layout.borderDisplayed ? 'solid 1px #CCC' : ''
				};
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
						},
						updateWidth: function (width) {
							var divs = $('div[id^="tab-"]').hide();
							for (var i = 0; i < divs.length; i++) {
								var div = divs[i];
								if (!div.hasClass('active'))
									div.width(width);
							}
							$scope.$apply();
						},
						updateHeight: function (height) {

							var divs = $('div[id^="tab-"]').hide();
							for (var i = 0; i < divs.length; i++) {
								var div = divs[i];
								if (!div.hasClass('active'))
									div.height(height);
							}
							$scope.$apply();
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

				$scope.updateWidth =  function (width) {
					var divs = $('div[id^="tab-"]').hide();
					for (var i = 0; i < divs.length; i++) {
						var div = divs[i];
						if (!div.hasClass('active'))
							div.width(width);
					}
					$scope.$apply();
				};

			}
		}
	}]);
})();


