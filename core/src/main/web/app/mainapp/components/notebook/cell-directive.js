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
 * bkCell
 * - the controller that responsible for directly changing the view
 * - the container for specific typed cell
 * - the directive is designed to be capable of used in a nested way
 * - conceptually, a cell is 'cell model' + 'view model'(an example of what goes in to the view
 * model is code cell bg color)
 * - A bkCell is generically corresponds to a portion of the notebook model (currently, it is
 * always a branch in the hierarchy)
 * - When exporting (a.k.a. sharing), we will need both the cell model and the view model
 */

(function() {
  'use strict';
  var module = angular.module('bk.notebook');

  module.directive('bkCell', function(
      bkUtils,
      bkSessionManager,
      bkCoreManager,
      bkEvaluatorManager,
      bkEvaluatePluginManager) {
    
    return {
      restrict: 'E',
      template: JST['mainapp/components/notebook/cell'](),
      scope: {
        cellmodel: '=',
        index: '='
      },
      controller: function($scope) {
        $scope.cellmodel.evaluatorReader = false;

        var getBkBaseViewModel = function() {
          return bkCoreManager.getBkApp().getBkNotebookWidget().getViewModel();
        };
        var notebookCellOp = bkSessionManager.getNotebookCellOp();

        $scope.$watch(function() {
          return notebookCellOp.isLast($scope.cellmodel.id);
        }, function(newVal, oldVal) {
          $scope.isLarge = newVal;
        });

        $scope.cellview = {
          showDebugInfo: false,
          menu: {
            items: [],
            renameItem: function(opts) {
              _.findWhere(this.items,
                {name: opts.name}
              ).name = opts.newName;
            },
            addItem: function(menuItem) {
              this.items.push(menuItem);
            },
            changeSortOrder: function(opts) {
              var item = _.findWhere(this.items,
                {name: opts.name}
              );
              if(item){
                item.sortorder = opts.sortorder;
              }
            },
            addSeparator: function(itemName) {
              var item = _.findWhere(this.items,
                {name: itemName}
              );
              if(item){
                item.separator = true;
              }
            },
            addItemToHead: function(menuItem) {
              this.items.splice(0, 0, menuItem);
            },
            removeItem: function(itemName) {
              var index = this.items.indexOf(_.find(this.items, function(it) {
                return it.name === itemName;
              }));
              this.items.splice(index, 1);
            }
          }
        };

        $scope.isLocked = function() {
          return bkSessionManager.isNotebookLocked();
        };

        $scope.newCellMenuConfig = {
          isShow: function() {
            return !bkSessionManager.isNotebookLocked() && !notebookCellOp.isContainer($scope.cellmodel.id);
          },
          attachCell: function(newCell) {
            notebookCellOp.insertAfter($scope.cellmodel.id, newCell);
          },
          prevCell: function() {
            return $scope.cellmodel;
          }
        };

        $scope.isRoot = function() {
          return $scope.$parent.getNestedLevel === undefined;
        };

        $scope.toggleShowDebugInfo = function() {
          $scope.cellview.showDebugInfo = !$scope.cellview.showDebugInfo;
        };
        $scope.isShowDebugInfo = function() {
          return $scope.cellview.showDebugInfo;
        };
        $scope.isDebugging = function() {
          return getBkBaseViewModel().isDebugging();
        };
        $scope.getNestedLevel = function() {
          // bkCell is using isolated scope, $scope is the isolated scope
          // $scope.$parent is the scope resulted from ng-repeat (ng-repeat creates a prototypal
          // scope for each ng-repeated item)
          // $Scope.$parent.$parent is the container cell(which initiates ng-repeat) scope
          var parent = $scope.$parent.$parent;
          return parent.getNestedLevel ? parent.getNestedLevel() + 1 : 1;
        };
        $scope.getParentId = function() {
          return $scope.$parent.$parent.cellmodel ? $scope.$parent.$parent.cellmodel.id : 'root';
        };

        $scope.toggleCellInput = function() {
          if ($scope.cellmodel.input.hidden) {
            delete $scope.cellmodel.input.hidden;
          } else {
            $scope.cellmodel.input.hidden = true;
          }
          bkSessionManager.setNotebookModelEdited(true);
        };

        $scope.toggleMarkdown = function() {
          if ($scope.cellmodel.hidden) {
            delete $scope.cellmodel.hidden;
          } else {
            $scope.cellmodel.hidden = true;
          }
          bkSessionManager.setNotebookModelEdited(true);
        };

        $scope.toggleSection = function() {
          $scope.cellmodel.collapsed = !$scope.cellmodel.collapsed;
          $scope.$broadcast('beaker.section.toggled', $scope.cellmodel.collapsed);
          bkSessionManager.setNotebookModelEdited(true);
        };

        $scope.evaluate = function($event) {
          if($scope.isCellRunning()) {
            return;
          }
          if ($event) {
            $event.stopPropagation();
          }
          var toEval;

          if ($scope.cellmodel.type === 'section') {
            toEval = $scope.cellmodel.id;
          } else {
            $scope.cellmodel.output.state = {};
            toEval = $scope.cellmodel;
          }

          bkCoreManager.getBkApp()
            .evaluateRoot(toEval)
            .catch(function(data) {
              console.error(data);
            });
        };

        $scope.deleteCell = function() {
          notebookCellOp.delete($scope.cellmodel.id, true);
          bkSessionManager.setNotebookModelEdited(true);
        };

        $scope.hasFaultyEvaluator = function() {
          return !($scope.cellmodel.evaluator in bkEvaluatePluginManager.getKnownEvaluatorPlugins());
        };

        $scope.getEvaluators = function() {
          return bkEvaluatorManager.getLoadedEvaluators();
        };

        $scope.getEvaluator = function() {
          return bkEvaluatorManager.getEvaluator($scope.cellmodel.evaluator);
        };

        var moveMethod = 'move';
        if ($scope.cellmodel.type == 'section') {
          moveMethod = 'moveSection';
        }

        $scope.moveCellUp = function() {
          notebookCellOp[moveMethod + 'Up']($scope.cellmodel.id);
          bkSessionManager.setNotebookModelEdited(true);
        };

        $scope.moveCellDown = function() {
          notebookCellOp[moveMethod + 'Down']($scope.cellmodel.id);
          bkSessionManager.setNotebookModelEdited(true);
        };

        $scope.moveCellUpDisabled = function() {
          return !notebookCellOp['isPossibleTo' + _.capitalize(moveMethod) + 'Up']($scope.cellmodel.id);
        };

        $scope.moveCellDownDisabled = function() {
          return !notebookCellOp['isPossibleTo' + _.capitalize(moveMethod) + 'Down']($scope.cellmodel.id);
        };

        $scope.isLockedCell = function() {
          return $scope.cellmodel.locked;
        };
        
        $scope.lockUnlockCell = function() {
          bkSessionManager.setNotebookModelEdited(true);
          if ($scope.isLockedCell()) {
            $scope.cellmodel.locked = undefined;
          } else {
            $scope.cellmodel.locked = true;
          }
        };

        $scope.cellview.menu.addItem({
          name: 'Lock Cell',
          sortorder: 110,
          isChecked: function() {
            return $scope.isLockedCell();
          },
          action: $scope.lockUnlockCell
        });

        $scope.cellview.menu.addItem({
          name: 'Cut',
          sortorder: 150,
          action: function() {
            notebookCellOp.cut($scope.cellmodel.id);
          },
          locked: function () {
            return $scope.isLockedCell();
          }
        });

        $scope.cellview.menu.addItem({
          name: 'Paste (append after)',
          sortorder: 160,
          disabled: function() {
            return !notebookCellOp.clipboard;
          },
          action: function() {
            notebookCellOp.paste($scope.cellmodel.id);
          }
        });

        $scope.cellview.menu.addItem({
          name: 'Move up',
          sortorder: 210,
          shortcut: ['Ctrl-Alt-Up', 'Alt-Cmd-Up'],
          action: $scope.moveCellUp,
          disabled: $scope.moveCellUpDisabled
        });

        $scope.cellview.menu.addItem({
          name: 'Move down',
          sortorder: 220,
          shortcut: ['Ctrl-Alt-Down', 'Alt-Cmd-Down'],
          action: $scope.moveCellDown,
          disabled: $scope.moveCellDownDisabled
        });

        $scope.cellview.menu.addItem({
          name: 'Delete cell',
          sortorder: 230,
          shortcut: ['Ctrl-Alt-D', 'Alt-Cmd-Backspace'],
          action: $scope.deleteCell,
          locked: function () {
            return $scope.isLockedCell();
          }
        });

        $scope.getTypeCellUrl = function() {
          var type = $scope.cellmodel.type;
          return type + '-cell.html';
        };

        $scope.getCellSummary = function () {
          var body = '';
          if($scope.isCodeCell()) {
            body = $scope.cellmodel.input.body;
          }
          if($scope.isMarkdownCell()){
            body = $scope.cellmodel.body;
          }
          return body.replace(/\n/g, ' ');
        };

        $scope.isMarkdownCell = function() {
          return $scope.cellmodel.type === 'markdown';
        };



        $scope.isCodeCell = function() {
          return $scope.cellmodel.type == 'code';
        };

        $scope.isSectionCell = function() {
          return $scope.cellmodel.type == 'section';
        };
        
        $scope.isCellRunning = function () {
          return bkCoreManager.getBkApp().isRunning($scope.cellmodel.id);
        };

        $scope.isCellHidden = function () {
          return $scope.isCodeCell() ? $scope.cellmodel.input.hidden :
            $scope.isMarkdownCell() ? $scope.cellmodel.hidden :
            $scope.isSectionCell ? $scope.cellmodel.collapsed : false;
        };

        $scope.shouldShowSummary = function () {
          return !$scope.isSectionCell() && $scope.isCellHidden() && !$scope.isLocked();
        };

        $scope.wideMenu = function () {
          return $scope.isCellHidden() && !$scope.isSectionCell();
        };




        $scope.collapseCellMenu = {
          'code' : {
            click: $scope.toggleCellInput,
            tooltip: 'cell input'
          },
          'markdown' : {
            click: $scope.toggleMarkdown,
            tooltip: 'text'
          },
          'section' : {
            click: $scope.toggleSection,
            tooltip: 'section'
          }
        };
      }
    };
  });

})();
