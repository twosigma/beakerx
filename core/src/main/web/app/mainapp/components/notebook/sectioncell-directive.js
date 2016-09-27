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

  module.directive('bkSectionCell', function(
        bkUtils,
        bkEvaluatorManager,
        bkSessionManager,
        bkCoreManager,
        bkPublicationHelper) {

    var CELL_TYPE = 'section';
    var notebookCellOp = bkSessionManager.getNotebookCellOp();
    var getBkNotebookWidget = function() {
      return bkCoreManager.getBkApp().getBkNotebookWidget();
    };
    return {
      restrict: 'E',
      template: JST['mainapp/components/notebook/sectioncell'](),
      controller: function($scope) {
        var notebookCellOp = bkSessionManager.getNotebookCellOp();

        $scope.cellmodel.collapsed = $scope.cellmodel.collapsed || false;

        bkCoreManager.getBkApp().getBkNotebookWidget().registerSectioncell($scope.cellmodel.id, $scope);
        
        $scope.toggleShowChildren = function() {
          $scope.cellmodel.collapsed = !$scope.cellmodel.collapsed;
          $scope.$broadcast('beaker.section.toggled', $scope.cellmodel.collapsed);
          bkSessionManager.setNotebookModelEdited(true);
        };

        $scope.isLeaf = function() {
          return notebookCellOp.getNextSibling($scope.cellmodel.id) === null;
        };

        $scope.isAntecedentSectionSiblingPrimogeniture = function() {
          var prev = notebookCellOp.getPrevSection($scope.cellmodel.id) || {level: $scope.cellmodel.level};

          return prev.level < $scope.cellmodel.level;
        };

        $scope.isBranch = function() {
          var hasSiblingSection = notebookCellOp.getNextSibling($scope.cellmodel.id) !== null;
          var hasChildSections = _.any(notebookCellOp.getAllDescendants($scope.cellmodel.id), function(child) {
            return child.type === 'section';
          });

          return hasSiblingSection || hasChildSections;
        };

        $scope.isShowChildren = function() {
          return !$scope.cellmodel.collapsed;
        };
        $scope.getChildren = function() {
          return notebookCellOp.getChildren($scope.cellmodel.id);
        };
        $scope.resetTitle = function(newTitle) {
          $scope.cellmodel.title = newTitle;
          bkUtils.refreshRootScope();
        };
        $scope.prepareForSearch = function() {
          if(!$scope.isShowChildren()){
            $scope.toggleShowChildren();
          }
        };
        $scope.afterSearchActions = function() {
          //nothing to do
        };
        var editedListener = function(newValue, oldValue) {
          if (newValue !== oldValue) {
            bkSessionManager.setNotebookModelEdited(true);
          }
        };
        $scope.$watch('cellmodel.title', editedListener);
        $scope.$watch('cellmodel.initialization', editedListener);
        
        $scope.cellview.menu.addItem({
          name: 'Change Header Level',
          sortorder: 100,
          items: [1,2,3,4].map(function(level) {
            return {
              name: 'Level ' + level,
              isChecked: function() {
                return $scope.cellmodel.level === level;
              },
              action: function() {
                $scope.cellmodel.level = level;
                notebookCellOp.reset();
              }};
          })
        });

        $scope.cellview.menu.addItem({
          name: 'Options...',
          sortorder: 130,
          action: function() {
            bkCoreManager.showFullModalDialog(function cb(r) { } ,
              'app/mainapp/dialogs/codecelloptions.jst.html', 'CodeCellOptionsController', $scope.cellmodel);
          },
          locked: function () {
            return $scope.isLockedCell();
          }
        });

        $scope.cellview.menu.addItemToHead({
          name: 'Delete section and all sub-sections',
          action: function() {
            notebookCellOp.deleteSection($scope.cellmodel.id, true);
          }
        });
       

        $scope.getPublishData = function() {
          var cells = [$scope.cellmodel]
          .concat(notebookCellOp.getAllDescendants($scope.cellmodel.id));
          var usedEvaluatorsNames = _.chain(cells)
            .filter(function(cell) {
              return cell.type === 'code';
            })
            .map(function(cell) {
              return cell.evaluator;
            })
            .unique().value();
          var evaluators = bkSessionManager.getRawNotebookModel().evaluators
            .filter(function(evaluator) {
              return _.any(usedEvaluatorsNames, function(ev) {
                return evaluator.name === ev;
              });
            });
          return bkUtils.generateNotebook(evaluators, cells, $scope.cellmodel.metadata);
        };

        $scope.cellview.menu.addItem({
          name: 'Run all',
          sortorder: 190,
          action: function() {
            bkCoreManager.getBkApp().evaluateRoot($scope.cellmodel.id).
              catch(function(data) {
                console.error(data);
              });
          }
        });

        $scope.isInitializationCell = function() {
          return $scope.cellmodel.initialization;
        };

        $scope.cellview.menu.addItem({
          name: 'Initialization Cell',
          sortorder:110,
          isChecked: function() {
            return $scope.isInitializationCell();
          },
          action: function() {
            if ($scope.isInitializationCell()) {
              $scope.cellmodel.initialization = undefined;
            } else {
              $scope.cellmodel.initialization = true;
            }
            notebookCellOp.reset();
          }
        });

        $scope.cellview.menu.addItem({
          name: 'Show section',
          sortorder:200,
          disabled: function() {
            return $scope.isShowChildren();
          },
          action: function() {
            $scope.toggleShowChildren();
          }
        });

        $scope.cellview.menu.addItem({
          name: 'Hide section',
          sortorder:210,
          disabled: function() {
            return !$scope.isShowChildren();
          },
          action: function() {
            $scope.toggleShowChildren();
          }
        });

        $scope.newCellMenuConfig = {
          isShow: function() {
            if (bkSessionManager.isNotebookLocked()) {
              return false;
            }
            return !$scope.cellmodel.hideTitle;
          },
          attachCell: function(newCell) {
            var children = notebookCellOp.getAllDescendants($scope.cellmodel.id);
            if ($scope.cellmodel.collapsed && children) {
              var lastChildCell = children[children.length - 1];
              notebookCellOp.insertAfter(lastChildCell.id, newCell);
              if (newCell.type !== "section") {
                $scope.toggleShowChildren();
              }
            } else {
              notebookCellOp.insertAfter($scope.cellmodel.id, newCell);
            }
          },
          prevCell: function() {
            return $scope.cellmodel;
          }
        };
        $scope.getFullIndex = function() {
          var index = $scope.getIndexAmongSectionCells();
          if ($scope.$parent.$parent.getNestedLevel) {
            return $scope.$parent.$parent.getFullIndex() + '.' + (index + 1);
          }

          return index + $scope.getNestedLevel();
        };
        $scope.getIndexAmongSectionCells = function() {
          var siblingSections = [];
          if ($scope.isRoot()) {
            siblingSections = notebookCellOp.getChildren('root');
          } else {
            var parent = notebookCellOp.getParent($scope.cellmodel.id);
            siblingSections = notebookCellOp.getChildren(parent.id);
          }
          siblingSections = siblingSections.filter(function(element) {
            return 'section' === element.type;
          });
          return siblingSections.indexOf($scope.cellmodel);
        };

        bkPublicationHelper.helper(CELL_TYPE, $scope);

        $scope.cellview.menu.changeSortOrder({
          name: "Lock Cell",
          sortorder: 120
        });

        $scope.cellview.menu.changeSortOrder({
          name: "cut",
          sortorder: 150
        });

        $scope.cellview.menu.changeSortOrder({
          name: "Paste (append after)",
          sortorder: 160
        });

        $scope.cellview.menu.changeSortOrder({
          name: "Publish...",
          sortorder: 170
        });
        
        $scope.cellview.menu.changeSortOrder({
          name: "Move up",
          sortorder: 220
        });


        $scope.cellview.menu.changeSortOrder({
          name: "Move down",
          sortorder: 230
        });

        $scope.cellview.menu.renameItem({
          name: 'Delete cell',
          newName: 'Delete heading and keep contents'
        });

        $scope.cellview.menu.changeSortOrder({
          name: 'Delete heading and keep contents',
          sortorder: 240
        });

        $scope.cellview.menu.changeSortOrder({
          name: 'Delete section and all sub-sections',
          sortorder: 250
        });

        $scope.cellview.menu.addSeparator("Cut");

        $scope.cellview.menu.addSeparator("Run all");
        
        $scope.$on('$destroy', function() {
          bkCoreManager.getBkApp().getBkNotebookWidget().unregisterSectioncell($scope.cellmodel.id);
        });

      }
    };
  });

})();
