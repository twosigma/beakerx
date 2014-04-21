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
 * M_bkCell
 * This module contains directives for cells. The bkCell directive is the base untyped cell
 * container which can include a typed cell. Most of the typed cell directive, except for the
 * code cell, goes into this module too. The module also holds the directive for cell UI behavior,
 * for example the cell menus.
 */
(function() {
  'use strict';
  var M_bkCell = angular.module('M_bkCell', [
    'M_commonUI',
    'M_generalUtils',
    'M_bkShare',
    'M_bkCore',
    'M_evaluatorManager',
    'M_bkCellPluginManager',
    'M_bkCodeCell'
  ]);
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
   * - TODO, this is currently strongly tied to the hierarchical notebook layout, we want to change
   * that
   */
  M_bkCell.directive('bkCell', function(generalUtils, bkBaseSessionModel, bkCoreManager) {
    return {
      restrict: 'E',
      template: '<div class="bkcell">' +
          '<div ng-if="isDebugging()">' +
          '[Debug]: cell ID = {{cellmodel.id}}, parent = {{getParentID()}}, level = {{cellmodel.level}} ' +
          '<a ng-click="toggleShowDebugInfo()" ng-hide="isShowDebugInfo()">show more</a>' +
          '<a ng-click="toggleShowDebugInfo()" ng-show="isShowDebugInfo()">show less</a>' +
          '<div collapse="!isShowDebugInfo()">' +
          '<pre>{{cellmodel | json}}</pre>' +
          '</div>' +
          '</div>' +
          '<div ng-include="getTypeCellUrl()"></div>' +
          '<bk-cell-menu items="cellview.menu.items"></bk-cell-menu>' +
          '<new-cell-menu config="newCellMenuConfig" ng-if="newCellMenuConfig.isShow()"></new-cell-menu>' +
          '</div>',
      scope: {
        cellmodel: "="
      },
      controller: function($scope) {
        var getBkBaseViewModel = function() {
          return bkCoreManager.getBkNotebook().getViewModel();
        };
        $scope.cellview = {
          showDebugInfo: false,
          menu: {
            items: [],
            addItem: function(menuItem) {
              this.items.push(menuItem);
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
        $scope.newCellMenuConfig = {
          isShow: function() {
            if (bkBaseSessionModel.isNotebookLocked()) {
              return false;
            }
            return !bkBaseSessionModel.cellOp.isContainer($scope.cellmodel.id);
          },
          attachCell: function(newCell) {
            bkBaseSessionModel.cellOp.insertAfter($scope.cellmodel.id, newCell);
          }
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
        $scope.getParentID = function() {
          return $scope.$parent.$parent.cellmodel ? $scope.$parent.$parent.cellmodel.id : 'root';
        };
        $scope.cellview.menu.addItem({
          name: "Delete cell",
          action: function() {
            bkBaseSessionModel.cellOp.delete($scope.cellmodel.id);
          }
        });
        $scope.cellview.menu.addItem({
          name: "Move up",
          disabled: function() {
            return !bkBaseSessionModel.cellOp.isPossibleToMoveSectionUp($scope.cellmodel.id);
          },
          action: function() {
            bkBaseSessionModel.cellOp.moveSectionUp($scope.cellmodel.id);
          }
        });
        $scope.cellview.menu.addItem({
          name: "Move down",
          disabled: function() {
            return !bkBaseSessionModel.cellOp.isPossibleToMoveSectionDown($scope.cellmodel.id);
          },
          action: function() {
            bkBaseSessionModel.cellOp.moveSectionDown($scope.cellmodel.id);
          }
        });
        $scope.cellview.menu.addItem({
          name: "Cut",
          action: function() {
            bkBaseSessionModel.cellOp.cut($scope.cellmodel.id);
          }
        });
        $scope.cellview.menu.addItem({
          name: "Paste (append after)",
          disabled: function() {
            return !bkBaseSessionModel.cellOp.clipboard;
          },
          action: function() {
            bkBaseSessionModel.cellOp.paste($scope.cellmodel.id);
          }
        });
        $scope.getTypeCellUrl = function() {
          var type = $scope.cellmodel.type;
          return type + "Cell.html";
        };
      },
      link: function(scope, element, attrs) {
        var div = element.find(".bkcell").first();
        div.click(function(event) {
          //click in the border or padding should trigger menu
          if (generalUtils.eventOffsetX(div, event) >= div.width()) {
            var menu = div.find('.bkcellmenu').last();
            menu.css("top", event.clientY);
            menu.css("left", event.clientX - 150);
            menu.find('.dropdown-toggle').first().dropdown('toggle');
            event.stopPropagation();
          }
        });
        div.mousemove(function(event) {
          if (generalUtils.eventOffsetX(div, event) >= div.width()) {
            div.css('cursor', 'pointer');
          } else {
            div.css('cursor', 'default');
          }
        });
      }
    };
  });
  M_bkCell.directive('bkCellMenu', function() {
    return {
      restrict: 'E',
      templateUrl: "./template/bkCellMenu.html",
      scope: { items: '=' }
    };
  });
  M_bkCell.directive('newCellMenu', function(
      generalUtils, bkBaseSessionModel, bkCoreManager, evaluatorManager) {
    return {
      restrict: 'E',
      templateUrl: "./template/newCellMenu.html",
      scope: { config: '=' },
      controller: function($scope) {
        $scope.getEvaluators = function() {
          return evaluatorManager.getAllEvaluators();
        };
        var levels = [1, 2, 3, 4];
        $scope.getLevels = function() {
          return levels;
        };

        $scope.newCodeCell = function(evaluatorName) {
          var newCell = bkBaseSessionModel.newCodeCell(evaluatorName);
          $scope.config.attachCell(newCell);
        };
        $scope.newTextCell = function() {
          var newCell = bkBaseSessionModel.newTextCell();
          $scope.config.attachCell(newCell);
        };
        $scope.newMarkdownCell = function() {
          var newCell = bkBaseSessionModel.newMarkdownCell();
          $scope.config.attachCell(newCell);
        };

        $scope.newSectionCell = function(level) {
          var newCell = bkBaseSessionModel.newSectionCell(level);
          $scope.config.attachCell(newCell);
        };
      },
      link: function(scope, element, attrs) {
        var hr = element.find('hr');
        hr.mouseover(function(event) {
          hr.animate({ opacity: 1.0 }, 100);
          event.stopPropagation();
        });
        hr.mouseout(function(event) {
          hr.animate({ opacity: 0.0 }, 200);
          event.stopPropagation();
        });
        scope.moveMenu = function(event) {
          var menu = element.find('.dropdown-menu').first();
          menu.css("left", generalUtils.eventOffsetX(hr, event));
        };
      }
    };
  });

  M_bkCell.directive('sectionCell', function(
      generalUtils,
      bkShare,
      evaluatorManager,
      bkBaseSessionModel,
      bkCoreManager,
      bkCellPluginManager) {
    return {
      restrict: 'E',
      templateUrl: "./template/bkSectionCell.html",
      //scope: { cell: "=" },
      controller: function($scope) {
        $scope.toggleShowChildren = function() {
          if ($scope.cellmodel.collapsed === undefined) {
            $scope.cellmodel.collapsed = false;
          }
          $scope.cellmodel.collapsed = !$scope.cellmodel.collapsed;
        };
        $scope.isShowChildren = function() {
          if ($scope.cellmodel.collapsed === undefined) {
            $scope.cellmodel.collapsed = false;
          }
          return !$scope.cellmodel.collapsed;
        };
        $scope.getChildren = function() {
          return bkBaseSessionModel.cellOp.getChildren($scope.cellmodel.id);
        };
        $scope.resetTitle = function(newTitle) {
          $scope.cellmodel.title = newTitle;
          bkCoreManager.refreshRootScope();
        };
        $scope.$watch('cellmodel.title', function(newVal, oldVal) {
          if (newVal !== oldVal) {
            bkBaseSessionModel.setEdited(true);
          }
        });
        $scope.$watch('cellmodel.initialization', function(newVal, oldVal) {
          if (newVal !== oldVal) {
            bkBaseSessionModel.setEdited(true);
          }
        });
        $scope.cellview.menu.addItemToHead({
          name: "Delete section and all sub-sections",
          action: function() {
            bkBaseSessionModel.cellOp.delete($scope.cellmodel.id);
          }
        });
        $scope.cellview.menu.addItem({
          name: "Change Header Level",
          items: [
            {
              name: "H1",
              action: function() {
                $scope.cellmodel.level = 1;
                bkBaseSessionModel.cellOp.reset();
              }
            },
            {
              name: "H2",
              action: function() {
                $scope.cellmodel.level = 2;
                bkBaseSessionModel.cellOp.reset();
              }
            },
            {
              name: "H3",
              action: function() {
                $scope.cellmodel.level = 3;
                bkBaseSessionModel.cellOp.reset();
              }
            },
            {
              name: "H4",
              action: function() {
                $scope.cellmodel.level = 4;
                bkBaseSessionModel.cellOp.reset();
              }
            }
          ]
        });
        $scope.isContentEditable = function() {
          return !bkBaseSessionModel.isNotebookLocked();
        };

        $scope.getShareData = function() {
          return {
            cellModel: $scope.cellmodel,
            evViewModel: evaluatorManager.getViewModel(),
            notebookModel: {
              cells: [$scope.cellmodel]
                  .concat(bkBaseSessionModel.cellOp.getAllDescendants($scope.cellmodel.id))
            }
          };
        };

        $scope.getShareMenuPlugin = function() {
          // the following cellType needs to match
          //plugin.cellType = "sectionCell"; in dynamically loaded cellmenu/sectionCell.js
          var cellType = "sectionCell";
          return bkCellPluginManager.getPlugin(cellType);
        };
        $scope.cellview.menu.addItem({
          name: "Run all",
          action: function() {
            bkCoreManager.getBkApp().evaluate($scope.cellmodel.id).
                catch(function(data) {
                  console.error(data);
                });
          }
        });
        var shareMenu = {
          name: "Share",
          items: []
        };
        $scope.cellview.menu.addItem(shareMenu);
        $scope.$watch("getShareMenuPlugin()", function(getShareMenu) {
          if (getShareMenu) {
            shareMenu.items = getShareMenu($scope);
          }
        });
        $scope.isInitializationCell = function() {
          return $scope.cellmodel.initialization;
        };
        $scope.cellview.menu.addItem({
          name: "Initialization Cell",
          isChecked: function() {
            return $scope.isInitializationCell();
          },
          action: function() {
            if ($scope.isInitializationCell()) {
              $scope.cellmodel.initialization = undefined;
            } else {
              $scope.cellmodel.initialization = true;
            }
            bkBaseSessionModel.cellOp.reset();
          }
        });
        $scope.newCellMenuConfig = {
          isShow: function() {
            if (bkBaseSessionModel.isNotebookLocked()) {
              return false;
            }
            return !$scope.cellmodel.hideTitle;
          },
          attachCell: function(newCell) {
            bkBaseSessionModel.cellOp.insertAfter($scope.cellmodel.id, newCell);
          }
        };
      },
      link: function(scope, element, attrs) {
        var titleElement = $(element.find(".bk-section-title").first());
        titleElement.bind('blur', function() {
          scope.resetTitle(titleElement.html().trim());
        });
        scope.$watch('isContentEditable()', function(newValue) {
          titleElement.attr('contenteditable', newValue);
        });
        if (scope.isInitializationCell()) {
          element.closest(".bkcell").addClass("initcell");
        } else {
          element.closest(".bkcell").removeClass("initcell");
        }
        scope.$watch('isInitializationCell()', function(newValue, oldValue) {
          if (newValue !== oldValue) {
            if (newValue) {
              element.closest(".bkcell").addClass("initcell");
            } else {
              element.closest(".bkcell").removeClass("initcell");
            }
          }
        });
      }
    };
  });

  M_bkCell.directive('textCell', function(bkBaseSessionModel) {
    return {
      restrict: 'E',
      template: "<div contenteditable='true'></div>",
      //scope: { cell: "=" },
      controller: function($scope) {
      },
      link: function(scope, element, attrs) {
        var titleElement = $(element.find("div").first());
        element.find('div').html(scope.cellmodel.body);
        titleElement.bind('blur', function() {
          scope.cellmodel.body = titleElement.html().trim();
          scope.$apply();
        });
        scope.$watch('cellmodel.body', function(newVal, oldVal) {
          if (newVal !== oldVal) {
            bkBaseSessionModel.setEdited(true);
          }
        });
      }
    };
  });

  M_bkCell.directive('markdownCell', function(bkBaseSessionModel) {
    return {
      restrict: 'E',
      template: "<div></div>",
      controller: function($scope) {
      },
      link: function(scope, element, attrs) {
        var div = element.find("div").first().get()[0];
        var options = {
          basePath: 'vendor/epiceditor',
          container: div,
          file: {
            defaultContent: scope.cellmodel.body
          },
          clientSideStorage: false,
          autogrow: {
            minHeight: 50,
            maxHeight: false,
            scroll: true
          },
          string: {
            togglePreview: 'Toggle Preview Mode(Alt+p)',
            toggleEdit: 'Toggle Edit Mode(Alt+p)',
            toggleFullscreen: 'Enter Fullscreen(Alt+f)'
          }
        };
        var editor = new EpicEditor(options).load();
        editor.on('preview', function() {
          scope.cellmodel.mode = "preview";
        });
        editor.on('edit', function() {
          scope.cellmodel.mode = "edit";
        });
        editor.editorIframeDocument.addEventListener('keyup', function(e) {
//                    if (e.ctrlKey && e.shiftKey && e.keyCode === 65) {
//                        scope.newMarkdownCell();
//                        return;
//                    }
          scope.cellmodel.body = editor.getText();
          scope.$apply();
        });
        if (scope.cellmodel.mode === "preview") {
          // set timeout otherwise the height will be wrong.
          // similar hack found in epic editor source:
          // epiceditor.js#L845
          setTimeout(function() {
            editor.preview();
          }, 1000);
        }
        scope.$watch('cellmodel.body', function(newVal, oldVal) {
          if (newVal !== oldVal) {
            bkBaseSessionModel.setEdited(true);
          }
        });
      }
    };
  });
})();
