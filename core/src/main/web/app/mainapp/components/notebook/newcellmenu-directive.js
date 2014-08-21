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
    var cellOps = bkSessionManager.getNotebookCellOp();
    return {
      restrict: 'E',
      templateUrl: "./app/mainapp/components/notebook/newcellmenu.html",
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
          if ($scope.config && $scope.config.attachCell) {
            return $scope.config.attachCell(cell);
          } else {
            cellOps.insertLast(cell);
          }
        }

        // find the first code cell starting with the startCell and scan
        // using the direction, if the startCell is a code cell, it will be returned.
        var findCodeCell = function(startCell, forward) {
          var cell = startCell;
          while (cell) {
            if (cellOps.getCellType(cell.id) === "code") {
              return cell;
            }
            cell = forward ? cellOps.getNext(cell.id) : cellOps.getPrev(cell.id);
          }
          return null;
        };

        // get the last code cell in the notebook
        var getLastCodeCell = function() {
          return _(cellOps.getCells())
              .chain()
              .filter(function(c) {
                return c.type === "code";
              })
              .last()
              .value();
        };


        $scope.insertDefaultCodeCell = function(event) {
          event.preventDefault();
          event.stopPropagation();

          // by default, insert a code cell (and use the best evaluator with best guess)
          // If a prev cell is given, first scan toward top of the notebook, and use the evaluator
          // of the first code cell found. If not found, scan toward bottom, and use the evaluator
          // of the first code cell found.
          // If a prev cell is not given, use the very last code cell in the notebook.
          // If there is no code cell in the notebook, use the first evaluator in the list
          var prevCell = $scope.config && $scope.config.prevCell && $scope.config.prevCell();
          var codeCell = findCodeCell(prevCell) || findCodeCell(prevCell, true) || getLastCodeCell();
          var evaluatorName = codeCell ?
              codeCell.evaluator : _.keys(bkEvaluatorManager.getAllEvaluators())[0];
          $scope.newCodeCell(evaluatorName);
        };
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
