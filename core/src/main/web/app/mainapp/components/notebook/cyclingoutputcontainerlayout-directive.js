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
  module.directive('cyclingOutputContainerLayout', ['bkHelper', '$timeout', "GLOBALS", function (bkHelper, $timeout, GLOBALS) {
    return {
      restrict: 'E',
      template: JST["mainapp/components/notebook/cyclingoutputcontainerlayout"](),
      scope: {
        model: '='
      },
      controller: function ($scope) {
        $scope.borderStyle = {
          'border': $scope.model.getCellModel().layout.borderDisplayed ? 'solid 1px #CCC' : '',
          'margin-top': $scope.model.getCellModel().layout.borderDisplayed ? '30px' : ''
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
      },
      link: function ($scope, element) {
        $timeout(function () {
          var divs = $('div[id^="lm-cycling-panel-"]').hide(),
            i = 0;
          (function cycle() {

            divs.eq(i).show(0)
              .delay($scope.model.getCellModel().layout.period)
              .hide(0, cycle);
            $scope.$broadcast(GLOBALS.EVENTS.CELL_OUTPUT_LM_SHOWED);
            i = ++i % divs.length;
          })();
        });
      }
    }
  }]);
})();


