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
      bkCellMenuPluginManager,
      $timeout) {
    var CELL_TYPE = "section";
    var notebookCellOp = bkSessionManager.getNotebookCellOp();
    var getBkNotebookWidget = function() {
      return bkCoreManager.getBkApp().getBkNotebookWidget();
    };
    return {
      restrict: 'E',
      template: JST["mainapp/components/notebook/sectioncell"](),
      controller: function($scope) {
        var notebookCellOp = bkSessionManager.getNotebookCellOp();
        $scope.toggleShowChildren = function() {
          if ($scope.cellmodel.collapsed === undefined) {
            $scope.cellmodel.collapsed = false;
          }
          $scope.cellmodel.collapsed = !$scope.cellmodel.collapsed;
          $scope.$broadcast('beaker.section.toggled', $scope.cellmodel.collapsed);
        };
        $scope.isShowChildren = function() {
          if ($scope.cellmodel.collapsed === undefined) {
            $scope.cellmodel.collapsed = false;
          }
          return !$scope.cellmodel.collapsed;
        };
        $scope.getChildren = function() {
          return notebookCellOp.getChildren($scope.cellmodel.id);
        };
        $scope.resetTitle = function(newTitle) {
          $scope.cellmodel.title = newTitle;
          bkUtils.refreshRootScope();
        };
        $scope.$watch('cellmodel.title', function(newVal, oldVal) {
          if (newVal !== oldVal) {
            bkSessionManager.setNotebookModelEdited(true);
          }
        });
        $scope.$watch('cellmodel.initialization', function(newVal, oldVal) {
          if (newVal !== oldVal) {
            bkSessionManager.setNotebookModelEdited(true);
          }
        });

        $scope.cellview.menu.renameItem({
          name: "Delete cell",
          newName: "Delete heading and keep contents"
        });

        $scope.cellview.menu.addItemToHead({
          name: "Delete section and all sub-sections",
          action: function() {
            notebookCellOp.deleteSection($scope.cellmodel.id, true);
          }
        });
        $scope.cellview.menu.addItem({
          name: "Change Header Level",
          items: [
            {
              name: "H1",
              action: function() {
                $scope.cellmodel.level = 1;
                notebookCellOp.reset();
              }
            },
            {
              name: "H2",
              action: function() {
                $scope.cellmodel.level = 2;
                notebookCellOp.reset();
              }
            },
            {
              name: "H3",
              action: function() {
                $scope.cellmodel.level = 3;
                notebookCellOp.reset();
              }
            },
            {
              name: "H4",
              action: function() {
                $scope.cellmodel.level = 4;
                notebookCellOp.reset();
              }
            }
          ]
        });
        $scope.isContentEditable = function() {
          return !bkSessionManager.isNotebookLocked();
        };

        $scope.getShareData = function() {
          var cells = [$scope.cellmodel]
              .concat(notebookCellOp.getAllDescendants($scope.cellmodel.id));
          var usedEvaluatorsNames = _(cells).chain()
              .filter(function(cell) {
                return cell.type === "code";
              })
              .map(function (cell) {
                return cell.evaluator;
              })
              .unique().value();
          var evaluators = bkSessionManager.getRawNotebookModel().evaluators
              .filter(function (evaluator) {
                return _.any(usedEvaluatorsNames, function (ev) {
                  return evaluator.name === ev;
                });
              });
          return bkUtils.generateNotebook(evaluators, cells);
        };

        $scope.getShareMenuPlugin = function() {
          return bkCellMenuPluginManager.getPlugin(CELL_TYPE);
        };
        $scope.cellview.menu.addItem({
          name: "Run all",
          action: function() {
            bkCoreManager.getBkApp().evaluateRoot($scope.cellmodel.id).
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
        $scope.$watch("getShareMenuPlugin()", function() {
          shareMenu.items = bkCellMenuPluginManager.getMenuItems(CELL_TYPE, $scope);
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
            notebookCellOp.reset();
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
            notebookCellOp.insertAfter($scope.cellmodel.id, newCell);
          },
          prevCell: function() {
            return $scope.cellmodel;
          }
        };
      },
      link: function(scope, element, attrs) {
        var bkNotebook = getBkNotebookWidget();

        var formatMarkdown = function(text){
          return text.replace('<p>','').replace('</p>','');
        };

        var preview = function() {
          var markdownFragment = $('<div style="display: none;">' + scope.cellmodel.title + '</div>');
          markdownFragment.appendTo('body'); // ugh mathjax doesn't operate on document fragments...

          MathJax.Hub.Queue(["Typeset", MathJax.Hub, markdownFragment[0]]);
          MathJax.Hub.Queue(function() {
            var markedHtml = formatMarkdown(marked(markdownFragment.html()));
            element.find('.markup').first().html(markedHtml);
            markdownFragment.remove();
          });
          scope.mode = 'preview';
        };

        var syncContentAndPreview = function() {
          scope.cellmodel.title = scope.cm.getValue();
          preview();
        };

        var moveFocusDown = function() {
          // move focus to next code cell
          var thisCellId = scope.cellmodel.id;
          var nextCell = notebookCellOp.getNext(thisCellId);
          while (nextCell) {
            if (bkNotebook.getFocusable(nextCell.id)) {
              bkNotebook.getFocusable(nextCell.id).focus();
              break;
            } else {
              nextCell = notebookCellOp.getNext(nextCell.id);
            }
          }
        };
        var moveFocusUp = function() {
          // move focus to prev code cell
          var thisCellID = scope.cellmodel.id;
          var prevCell = notebookCellOp.getPrev(thisCellID);
          while (prevCell) {
            var t = bkNotebook.getFocusable(prevCell.id);
            if (t) {
              t.focus();
              var top = t.cm.cursorCoords(true,'window').top;
              if ( top < 150)
                window.scrollBy(0, top-150);
              break;
            } else {
              prevCell = notebookCellOp.getPrev(prevCell.id);
            }
          }
        };
        scope.focus = function() {
          scope.edit();
          scope.$apply();
        };

        scope.edit = function(event) {
          if (bkHelper.isNotebookLocked()) return;
          var cm = scope.cm;
          scope.mode = 'edit';

          $timeout(function() {
            var cm = scope.cm;
            cm.setValue(scope.cellmodel.title);
            cm.clearHistory();
            cm.focus();
          });
        };

        scope.cm = CodeMirror.fromTextArea(element.find("textarea")[0], {
          electricChars: false,
          extraKeys: {
            "Up" : function(cm) {
              if ($('.CodeMirror-hint').length > 0) {
                //codecomplete is up, skip
                return;
              }
              if (cm.getCursor().line === 0) {
                moveFocusUp();
              } else {
                cm.execCommand("goLineUp");
                var top = cm.cursorCoords(true,'window').top;
                if ( top < 150)
                  window.scrollBy(0, top-150);
              }
            },
            "Down" : function(cm) {
              if ($('.CodeMirror-hint').length > 0) {
                //codecomplete is up, skip
                return;
              }
              if (cm.getCursor().line === cm.doc.size - 1) {
                moveFocusDown();
              } else {
                cm.execCommand("goLineDown");
              }
            },
            "Esc" : function(cm) {
              cm.execCommand("singleSelection");
              if (cm.state.vim && cm.state.vim.insertMode) {
                return;
              } else {
                if (isFullScreen(cm)) {
                  setFullScreen(cm, false);
                }
              }
            },
            "Ctrl-Enter": function(cm) {
              scope.$apply(function() {
                syncContentAndPreview();
              });
            },
            "Cmd-Enter": function(cm) {
              scope.$apply(function() {
                syncContentAndPreview();
              });
            },
            "Alt-Down": moveFocusDown,
            "Alt-J": moveFocusDown,
            "Alt-Up": moveFocusUp,
            "Alt-K": moveFocusUp,
            "Ctrl-Alt-Up": function(cm) { // cell move up
              notebookCellOp.moveUp(scope.cellmodel.id);
              bkUtils.refreshRootScope();
              cm.focus();
            },
            "Cmd-Alt-Up": function(cm) { // cell move up
              notebookCellOp.moveUp(scope.cellmodel.id);
              bkUtils.refreshRootScope();
              cm.focus();
            },
            "Ctrl-Alt-Down": function(cm) { // cell move down
              notebookCellOp.moveDown(scope.cellmodel.id);
              bkUtils.refreshRootScope();
              cm.focus();
            },
            "Cmd-Alt-Down": function(cm) { // cell move down
              notebookCellOp.moveDown(scope.cellmodel.id);
              bkUtils.refreshRootScope();
              cm.focus();
            },
            "Ctrl-Alt-H": function(cm) { // cell hide
              scope.cellmodel.input.hidden = true;
              bkUtils.refreshRootScope();
            },
            "Cmd-Alt-H": function(cm) { // cell hide
              scope.cellmodel.input.hidden = true;
              bkUtils.refreshRootScope();
            },
            "Ctrl-Alt-D": function(cm) { // cell delete
              notebookCellOp.delete(scope.cellmodel.id, true);
              bkUtils.refreshRootScope();
            },
            "Cmd-Alt-D": function(cm) { // cell delete
              notebookCellOp.delete(scope.cellmodel.id, true);
              bkUtils.refreshRootScope();
            }
          }
        });

        bkNotebook.registerFocusable(scope.cellmodel.id, scope);
        bkNotebook.registerCM(scope.cellmodel.id, scope.cm);
        syncContentAndPreview();

        scope.$watch('cellmodel.title', function(newVal, oldVal) {
          if (scope.cm && newVal !== scope.cm.getValue()) {
            if (newVal === null) {
              newVal = "";
            }
            scope.cm.setValue(newVal);
            scope.cm.clearHistory();
          }
        });

        scope.$on('beaker.cell.added', function(e, cellmodel) {
          if (cellmodel === scope.cellmodel) {
            scope.edit();
          }
        });

        if (scope.isInitializationCell()) {
          element.closest(".bkcell").addClass("initcell");
        } else {
          element.closest(".bkcell").removeClass("initcell");
        }

        scope.cm.on('blur', function() {
          scope.$apply(function() {
            syncContentAndPreview();
          });
        });

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

})();
