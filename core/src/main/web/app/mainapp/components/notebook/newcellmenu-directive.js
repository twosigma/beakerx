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
      template: JST["mainapp/components/notebook/newcellmenu"](),
      scope: {
        config: '=',
        isLarge: '=',
        position: '@'
      },
      link: function($scope, element) {
        $scope.hideOpenMenus = function() {
          $(document).trigger('click.bs.dropdown.data-api');
        };

        var menu = $(element).find('.new-cell');
        var fade = function (opacity) {
          if (!$scope.isLarge) {
            menu.stop().fadeTo(200, opacity);
          }
        };
        menu.on('mouseenter.cellmenu-fade', function () { fade(1); });
        menu.on('mouseleave.cellmenu-fade', function () { fade(0); });
        $scope.$on('$destroy', function () {
          menu.off('mouseenter.cellmenu-fade mouseleave.cellmenu-fade');
        });

        $scope.$watch('isLarge', function(newValue){
          menu.css('opacity', newValue ? 1 : 0);
        });
      },
      controller: function($scope, $rootScope, GLOBALS) {
        var newCellFactory = bkSessionManager.getNotebookNewCellFactory();
        var recentlyAddedLanguage;

        $scope.getEvaluators = function() {
          return bkEvaluatorManager.getLoadedEvaluators();
        };
        $scope.sectionLevels = [1, 2, 3, 4];

        $scope.newCodeCell = function(evaluatorName) {
          var newCell = newCellFactory.newCodeCell(evaluatorName);
          attachCell(newCell);
        };
        $scope.newDefaultCodeCell = function() {
          $scope.newCodeCell($scope.defaultEvaluator());
        };
        $scope.showPluginManager = function() {
          bkHelper.showLanguageManager($scope);
        };
        $scope.newMarkdownCell = function() {
          var newCell = newCellFactory.newMarkdownCell();
          attachCell(newCell);
        };

        $scope.newSectionCell = function(level) {
          var newCell = newCellFactory.newSectionCell(level);
          attachCell(newCell);
        };

        $scope.defaultEvaluator = function() {
          // by default, insert a code cell (and use the best evaluator with best guess)
          // If a prev cell is given, first scan toward top of the notebook, and use the evaluator
          // of the first code cell found. If not found, scan toward bottom, and use the evaluator
          // of the first code cell found.
          // If a prev cell is not given, use the very last code cell in the notebook.
          // If there is no code cell in the notebook, use the first evaluator in the list
          var prevCell = $scope.config && $scope.config.prevCell && $scope.config.prevCell();
          var codeCell = recentlyAddedLanguage
              || (prevCell && cellOps.findCodeCell(prevCell.id))
              || (prevCell && cellOps.findCodeCell(prevCell.id, true))
              || getLastCodeCell();
          var defaultEvaluator = GLOBALS.DEFAULT_EVALUATOR;
          var evaluatorName = codeCell ? codeCell.evaluator : bkEvaluatorManager.getEvaluator(defaultEvaluator) ?
              defaultEvaluator : _.keys(bkEvaluatorManager.getLoadedEvaluators())[0];

          return evaluatorName;
        };

        $scope.getEvaluatorDetails = function(name) {
          return bkEvaluatorManager.getVisualParams(name);
        };

        function attachCell(cell) {
          bkSessionManager.setNotebookModelEdited(true);
          if ($scope.config && $scope.config.attachCell) {
            return $scope.config.attachCell(cell);
          } else {
            cellOps.insertFirst(cell);
          }
        }

        // get the last code cell in the notebook
        var getLastCodeCell = function() {
          return _.last(cellOps.getAllCodeCells());
        };

        $scope.$on('languageAdded', function(event, data) {
          recentlyAddedLanguage = data;
        });

        $scope.$on('cellMapRecreated', function() {
          recentlyAddedLanguage = null;
        });

        $scope.$watch('defaultEvaluator()', function(newValue, oldValue) {
          if (newValue !== oldValue) {
            $rootScope.$emit("defaultEvaluatorChanged", $scope.defaultEvaluator());
          }
        });
      }
    };
  });

})();
