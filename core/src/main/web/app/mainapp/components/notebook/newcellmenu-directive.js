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

(function() {
  'use strict';
  var module = angular.module('bk.notebook');

  module.directive('bkNewCellMenu', function(
      bkUtils, bkSessionManager, bkEvaluatorManager) {
    return {
      restrict: 'E',
      template: JST["mainapp/components/notebook/newcellmenu"](),
      scope: { config: '=' },
      controller: function($scope) {
        var newCellFactory = bkSessionManager.getNotebookNewCellFactory();

        $scope.getEvaluators = function() {
          return bkEvaluatorManager.getAllEvaluators();
        };
        var levels = [1, 2, 3, 4];
        $scope.getLevels = function() {
          return levels;
        };

        $scope.newCodeCell = function(evaluatorName) {
          var newCell = newCellFactory.newCodeCell(evaluatorName);
          attachCell(newCell);
        };
        $scope.newTextCell = function() {
          var newCell = newCellFactory.newTextCell();
          attachCell(newCell);
        };
        $scope.newMarkdownCell = function() {
          var newCell = newCellFactory.newMarkdownCell();
          attachCell(newCell);
        };

        $scope.newSectionCell = function(level) {
          var newCell = newCellFactory.newSectionCell(level);
          attachCell(newCell);
        };

        function attachCell(cell) {
          var cellOp = bkSessionManager.getNotebookCellOp();

          if ($scope.config && $scope.config.attachCell) {
            return $scope.config.attachCell(cell);
          }

          bkSessionManager.getRawNotebookModel().cells
          cellOp.insertLast(cell);
        }
      },
      link: function(scope, element, attrs) {
        scope.moveMenu = function(event) {
          var menu = element.find('.dropdown-menu').first();
          menu.css("left", bkUtils.getEventOffsetX(0, event));
        };
      }
    };
  });

})();
