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
 * M_bkCodeCell
 * This module holds the logic for code cell, which is a typed {@link bkCell}.
 * The code cell contains an input cell an output cell ({@link bkCodeCellOutput}) and cell menus.
 */
(function() {
  'use strict';
  var M_bkCodeCell = angular.module('M_bkCodeCell', [
    'M_bkCore',
    'M_evaluatorManager',
    'M_bkCellPluginManager',
    'M_bkCodeCellOutput',
    'M_commonUI',
    'M_generalUtils',
    'M_bkShare'
  ]);
  M_bkCodeCell.directive('codeCell', function(
      $rootScope, generalUtils, bkShare, evaluatorManager,
      bkCellPluginManager, bkBaseSessionModel, bkCoreManager) {
    return {
      restrict: 'E',
      templateUrl: "./template/bkCodeCell.html",
      scope: { cellmodel: "=", cellmenu: "="},
      controller: function($scope) {
        $scope.cellview = {
          inputMenu: [],
          displays: []
        };
        var isLocked = function() {
          return bkBaseSessionModel.isNotebookLocked();
        };

        $scope.isShowInput = function() {
          if (isLocked()) {
            return false;
          }
          if ($scope.cellmodel.input.hidden === true) {
            return false;
          }
          return true;
        };
        // ensure cm refreshes when 'unhide'
        $scope.$watch("isShowInput()", function(newValue, oldValue) {
          if ($scope.cm && newValue === true && newValue !== oldValue) {
            Q.fcall(function() {
              $scope.cm.refresh();
            });
          }
        });

        $scope.isShowOutput = function() {
          if ($scope.cellmodel.output.hidden === true) {
            return false;
          }
          var result = $scope.cellmodel.output.result;
          if (result && result.hidden === true) {
            return false;
          }
          return !(result === undefined || result === null);
        };
        $scope.evaluate = function() {
          bkCoreManager.getBkApp().evaluate($scope.cellmodel).
              catch(function(data) {
                console.error(data);
              });
        };
        var editedListener = function(newValue, oldValue) {
          if (newValue !== oldValue) {
            bkBaseSessionModel.setEdited(true);
          }
        };
        $scope.$watch('cellmodel.id', editedListener);
        $scope.$watch('cellmodel.evaluator', editedListener);
        $scope.$watch('cellmodel.initialization', editedListener);
        $scope.$watch('cellmodel.input.body', editedListener);
        $scope.$watch('cellmodel.output.result', editedListener);

        $scope.autocomplete = function(cpos, onResults) {
          var evaluator = evaluatorManager.getEvaluator($scope.cellmodel.evaluator);
          if (!evaluator) {
            return;
          }
          if (evaluator.evaluator.autocomplete) {
            evaluator.evaluator.autocomplete(
                $scope.cellmodel.input.body,
                cpos, onResults);
          } else if (evaluator.evaluator.autocomplete2) {
            evaluator.evaluator.autocomplete2(
                $scope.cm, null, onResults);
          }
        };

        $scope.getEvaluators = function() {
          return evaluatorManager.getAllEvaluators();
        };

        $scope.getEvaluator = function() {
          return evaluatorManager.getEvaluator($scope.cellmodel.evaluator);
        };
        $scope.updateUI = function(evaluator) {
          if ($scope.cm && evaluator) {
            $scope.cm.setOption("mode", evaluator.evaluator.cmMode);
            var bg = evaluator.evaluator.background ? evaluator.evaluator.background : "white";
            $($scope.cm.getWrapperElement()).css("background", bg);
          }
        };
        $scope.$watch("getEvaluator()", function(newValue, oldValue) {
          if (newValue === oldValue) {
            return;
          }
          $scope.updateUI(newValue);
        });
        $scope.appendCodeCell = function(evaluatorName) {
          var thisCellID = $scope.cellmodel.id;
          if (!evaluatorName) {
            // if no evaluator specified, use the current evaluator
            evaluatorName = $scope.cellmodel.evaluator;
          }
          var newCell = bkBaseSessionModel.newCodeCell(evaluatorName);
          bkBaseSessionModel.cellOp.appendAfter(thisCellID, newCell);
          $rootScope.$$phase || $rootScope.$apply();

        };
        $scope.getShareMenuPlugin = function() {
          // the following cellType needs to match
          //plugin.cellType = "codeCell"; in dynamically loaded cellmenu/codeCell.js
          var cellType = "codeCell";
          return bkCellPluginManager.getPlugin(cellType);
        };
        var shareMenu = {
          name: "Share",
          items: []
        };
        $scope.cellmenu.addItem(shareMenu);
        $scope.$watch("getShareMenuPlugin()", function(getShareMenu) {
          if (getShareMenu) {
            shareMenu.items = getShareMenu($scope);
          }
        });

        $scope.cellmenu.addItem({
          name: "Show input cell",
          isChecked: function() {
            return !$scope.cellmodel.input.hidden;
          },
          action: function() {
            if ($scope.cellmodel.input.hidden) {
              delete $scope.cellmodel.input.hidden;
            } else {
              $scope.cellmodel.input.hidden = true;
            }
          }
        });
        $scope.cellmenu.addItem({
          name: "Show output cell (if available)",
          isChecked: function() {
            return !$scope.cellmodel.output.hidden;
          },
          action: function() {
            if ($scope.cellmodel.output.hidden) {
              delete $scope.cellmodel.output.hidden;
            } else {
              $scope.cellmodel.output.hidden = true;
            }
          }
        });

        $scope.isInitializationCell = function() {
          return $scope.cellmodel.initialization;
        };

        $scope.cellmenu.addItem({
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
        $scope.$on("$destroy", function() {
          bkCoreManager.unregisterFocusable($scope.cellmodel.id);
          bkCoreManager.unregisterCM($scope.cellmodel.id);
        });
      },
      link: function(scope, element, attrs) {
        scope.showDebug = false;

        function isFullScreen(cm) {
          return /\bCodeMirror-fullscreen\b/.test(cm.getWrapperElement().className);
        }

        function winHeight() {
          return window.innerHeight || (document.documentElement || document.body).clientHeight;
        }

        function setFullScreen(cm, full) {
          var wrap = cm.getWrapperElement();
          if (full) {
            wrap.className += " CodeMirror-fullscreen";
            wrap.style.height = winHeight() + "px";
            document.documentElement.style.overflow = "hidden";
          } else {
            wrap.className = wrap.className.replace(" CodeMirror-fullscreen", "");
            wrap.style.height = "";
            document.documentElement.style.overflow = "";
          }
          cm.refresh();
        }

        CodeMirror.on(window, "resize", function() {
          var showing = document.body.getElementsByClassName("CodeMirror-fullscreen")[0];
          if (!showing)
            return;
          showing.CodeMirror.getWrapperElement().style.height = winHeight() + "px";
        });
        var moveFocusDown = function() {
          // move focus to next code cell
          var thisCellID = scope.cellmodel.id;
          var nextCell = bkBaseSessionModel.cellOp.getNext(thisCellID);
          while (nextCell) {
            if (bkCoreManager.getFocusable(nextCell.id)) {
              bkCoreManager.getFocusable(nextCell.id).focus();
              break;
            } else {
              nextCell = bkBaseSessionModel.cellOp.getNext(nextCell.id);
            }
          }
        };
        var moveFocusUp = function() {
          // move focus to prev code cell
          var thisCellID = scope.cellmodel.id;
          var prevCell = bkBaseSessionModel.cellOp.getPrev(thisCellID);
          while (prevCell) {
            if (bkCoreManager.getFocusable(prevCell.id)) {
              bkCoreManager.getFocusable(prevCell.id).focus();
              break;
            } else {
              prevCell = bkBaseSessionModel.cellOp.getPrev(prevCell.id);
            }
          }
        };
        scope.cm = CodeMirror.fromTextArea(element.find("textarea")[0], {
          lineNumbers: true,
          matchBrackets: true,
          onKeyEvent: function(cm, event) {
            if (event.type === "keydown") {
              if (event.keyCode === 38) {
                if ($('.CodeMirror-hint').length > 0) {
                  //codecomplete is up, skip
                  return;
                }
                if (cm.getCursor().line === 0 && event.shiftKey === false) {
                  moveFocusUp();
                }
              } else if (event.keyCode === 40) {
                if ($('.CodeMirror-hint').length > 0) {
                  //codecomplete is up, skip
                  return;
                }
                if (cm.getCursor().line === cm.doc.size - 1 && event.shiftKey === false) {
                  moveFocusDown();
                }
              } else if (event.keyCode === 27) { // ESC
                if (cm.state.vim && cm.state.vim.insertMode) {
                  return;
                } else {
                  if (isFullScreen(cm)) {
                    setFullScreen(cm, false);
                  }
                }
              }
            }
          },
          extraKeys: {
            "Shift-Ctrl-A": function(cm) {
              scope.appendCodeCell();
            },
            "Shift-Ctrl-E": function(cm) {
              scope.popupMenu();
              element.find(".inputcellmenu").find('li').find('a')[0].focus();
            },
            "Alt-Down": moveFocusDown,
            "Alt-J": moveFocusDown,
            "Alt-Up": moveFocusUp,
            "Alt-K": moveFocusUp,
            "Alt-F11": function(cm) {
              setFullScreen(cm, !isFullScreen(cm));
            },
            "Ctrl-Enter": function(cm) {
              scope.evaluate();
            },
            "Shift-Enter": function(cm) {
              scope.evaluate();
              moveFocusDown();
            },
            "Ctrl-Space": function(cm) {
              var getToken = function(editor, cur) {
                return editor.getTokenAt(cur);
              };
              var getHints = function(editor, showHintCB, options) {
                var cur = editor.getCursor();
                var token = getToken(editor, cur);
                var cursorPos = editor.indexFromPos(cur);
                // We might want this defined by the plugin.
                var onResults = function(results, matched_text) {
                  var start = token.start;
                  var end = token.end;
                  if (token.string === ".") {
                    start += 1;
                  }
                  if (matched_text) {
                    start += (cur.ch - token.start - matched_text.length);
                    end = start + matched_text.length;
                  }
                  showHintCB({
                    list: _.uniq(results),
                    from: CodeMirror.Pos(cur.line, start),
                    to: CodeMirror.Pos(cur.line, end)
                  });
                };
                scope.autocomplete(cursorPos, onResults);
              };

              var options = {
                async: true,
                closeOnUnfocus: true,
                alignWithWord: true,
                completeSingle: true
              };
              CodeMirror.showHint(cm, getHints, options);
            }
          }
        });

        scope.cm.focus();
        scope.updateUI(scope.getEvaluator());
        bkCoreManager.registerFocusable(scope.cellmodel.id, scope.cm);
        bkCoreManager.registerCM(scope.cellmodel.id, scope.cm);

        // cellmodel.body --> CodeMirror
        scope.$watch('cellmodel.input.body', function(newVal, oldVal) {
          if (scope.cm && newVal !== scope.cm.getValue()) {
            if (newVal === null) {
              newVal = "";
            }
            scope.cm.setValue(newVal);
          }
        });
        // cellmodel.body <-- CodeMirror
        scope.cm.on("change", function(cm, e) {
          scope.cellmodel.input.body = cm.getValue();
          bkCoreManager.refreshRootScope();
        });

        var inputMenuDiv = element.find(".bkcell").first();
        scope.popupMenu = function(event) {
          var menu = inputMenuDiv.find('.dropdown').first();
          var clicked = event && event.hasOwnProperty("clientY");
          menu.css("top", clicked ? event.clientY : "");
          menu.css("left", clicked ? event.clientX - 150 : "");
          menu.find('.dropdown-toggle').first().dropdown('toggle');
        };
        inputMenuDiv.click(function(event) {
          if (generalUtils.eventOffsetX(inputMenuDiv, event) >= inputMenuDiv.width()) {
            scope.popupMenu(event);
            event.stopPropagation();
          }
        });
        inputMenuDiv.mousemove(function(event) {
          if (generalUtils.eventOffsetX(inputMenuDiv, event) >= inputMenuDiv.width()) {
            inputMenuDiv.css('cursor', 'pointer');
          } else {
            inputMenuDiv.css('cursor', 'default');
          }
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
  M_bkCodeCell.directive('inputMenu', function(bkCoreManager) {
    return {
      restrict: 'E',
      templateUrl: "./template/bkCodeCellInputMenu.html",
      controller: function($scope) {
        $scope.getItemClass = function(item) {
          var result = [];
          if (item.items) {
            result.push("dropdown-submenu");
          }
          return result.join(" ");
        };
        $scope.getSubmenuItemClass = function(item) {
          var result = [];
          if (item.disabled) {
            result.push("disabled-link");
          }
          return result.join(" ");
        };
        $scope.getShowEvalIcon = function(evaluator) {
          return $scope.cellmodel.evaluator === evaluator.name;
        };
        $scope.setEvaluator = function(evaluator) {
          var cellID = $scope.cellmodel.id;
          $scope.cellmodel.evaluator = evaluator.name;
          bkCoreManager.getFocusable(cellID).focus();
        };
        $scope.run = function() {
          $scope.evaluate();
        };
      }
    };
  });
})();
