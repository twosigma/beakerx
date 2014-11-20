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
 * bkoTestContainer
 */
(function() {
  'use strict';
  beaker.bkoDirective('TestContainer', ["bkCellMenuPluginManager", "bkUtils", function(bkCellMenuPluginManager, bkUtils) {
    var CELL_TYPE = "bko-testcontainer";
    return {
      template: '<div>TEST CONTAINER</div>',
      controller: function($scope) {
        $scope.getStuff = function() {
          return $scope.state;
        };
      },
      link: function(scope, element, attrs) {
        scope.getState = function() {
          return scope.model.getCellModel();
        };

        scope.state = "initial;"+scope.getState()+";";
        scope.$watch('getState()', function(result) {
          scope.state += result + ";"
        });
      }
    };
  }]);
})();
