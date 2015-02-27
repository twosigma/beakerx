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

  module.directive('bkCodeCell', function(
      bkUtils,
      bkEvaluatorManager,
      bkCellMenuPluginManager,
      bkSessionManager,
      bkCoreManager) {

    var notebookCellOp = bkSessionManager.getNotebookCellOp();
    var getBkNotebookWidget = function() {
      return bkCoreManager.getBkApp().getBkNotebookWidget();
    };
    var CELL_TYPE = "code";
    return {
      restrict: 'E',
      template: JST["mainapp/components/notebook/codecell"](),
      scope: { cellmodel: "=", cellmenu: "="},
      controller: function($scope) {
        $scope.cellview = {
          inputMenu: [],
          displays: []
        };

        $scope.getFullIndex = function() {
          return $scope.$parent.$parent.$parent.getFullIndex() + "." + ($scope.$parent.index + 1);
        }

        $scope.isLocked = function() {
          return bkSessionManager.isNotebookLocked();
        }

        $scope.isEmpty = function() {
          return !($scope.cellmodel.output.result);
        }

        $scope.isError = function() {
          if ($scope.cellmodel === undefined || $scope.cellmodel.output === undefined || $scope.cellmodel.output.result === undefined)
            return false;

          var type = $scope.cellmodel.output.result.innertype;

          if (!type && $scope.cellmodel.output.result.payload !== undefined)
            type = $scope.cellmodel.output.result.payload.innertype;

          return type == 'Error';
        }

        $scope.isShowInput = function() {
          if ($scope.isLocked()) {
            return false;
          }
          if ($scope.cellmodel.input.hidden === true) {
            return false;
          }
          return true;
        };

        $scope.bkNotebook = getBkNotebookWidget();
        // ensure cm refreshes when 'unhide'
        $scope.$watch("isShowInput()", function(newValue, oldValue) {
          if ($scope.cm && newValue === true && newValue !== oldValue) {
            bkUtils.fcall(function() {
              $scope.cm.refresh();
            });
          }
        });

        $scope.isHiddenOutput = function() {
          return $scope.cellmodel.output.selectedType == 'Hidden';
        }

        $scope.hasOutput = function() {
          return $scope.cellmodel.output.result != undefined;
        }

        $scope.backgroundClick = function(event) {
          if (!$scope.isShowInput() || $(event.toElement).parents().hasClass("code-cell-output")) {
            return;
          }
          var top = $(event.delegateTarget).offset().top;
          var outputElement = $(event.delegateTarget).children(".code-cell-output:first");
          var bottom;
          if (outputElement.length > 0) {
            bottom = outputElement.offset().top;
          } else {
            bottom = top + $(event.delegateTarget).height();
          }
          // Even better would be to detect left/right and move to
          // beginning or end of line, but we can live with this for now.
          var cm = $scope.cm;
          if (event.pageY < (top + bottom) / 2) {
            cm.setCursor(0, 0);
          } else {
            cm.setCursor(cm.lineCount() - 1,
                         cm.getLine(cm.lastLine()).length);
          }
          cm.focus();
        }

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

        $scope.outputTitle = function() {
          if (!$scope.isShowOutput()) return "Output Hidden";

          return $scope.isError() ? "Error" : "Cell Output";
        };

        $scope.evaluate = function($event) {
          if ($event) $event.stopPropagation();

          $scope.cellmodel.output.state = {};
          bkCoreManager.getBkApp().evaluateRoot($scope.cellmodel).
              catch(function(data) {
                console.log("Evaluation failed");
              });
        };
        var editedListener = function(newValue, oldValue) {
          if (newValue !== oldValue) {
            bkSessionManager.setNotebookModelEdited(true);
          }
        };
        $scope.$watch('cellmodel.id', editedListener);
        $scope.$watch('cellmodel.evaluator', editedListener);
        $scope.$watch('cellmodel.initialization', editedListener);
        $scope.$watch('cellmodel.input.body', editedListener);
        $scope.$watch('cellmodel.output.result', editedListener);

        $scope.autocomplete = function(cpos, onResults) {
          var evaluator = bkEvaluatorManager.getEvaluator($scope.cellmodel.evaluator);
          if (!evaluator) {
            return;
          }
          if (evaluator.autocomplete) {
            evaluator.autocomplete($scope.cellmodel.input.body, cpos, onResults);
          } else if (evaluator.autocomplete2) {
            // used by JavaScript evaluator
            evaluator.autocomplete2($scope.cm, null, onResults);
          }
        };

        $scope.getEvaluators = function() {
          return bkEvaluatorManager.getAllEvaluators();
        };

        $scope.getEvaluator = function() {
          return bkEvaluatorManager.getEvaluator($scope.cellmodel.evaluator);
        };
        $scope.updateUI = function(evaluator) {
          if ($scope.cm && evaluator) {
            $scope.cm.setOption("mode", evaluator.cmMode);
            $scope.cellmodel.evaluatorReader = true;
          }
        };
        $scope.$watch("getEvaluator()", function(newValue, oldValue) {
          if (newValue === oldValue) {
            return;
          }
          $scope.updateUI(newValue);
        });
        $scope.appendCodeCell = function(evaluatorName) {
          var thisCellId = $scope.cellmodel.id;
          if (!evaluatorName) {
            // if no evaluator specified, use the current evaluator
            evaluatorName = $scope.cellmodel.evaluator;
          }
          var newCell = bkSessionManager.getNotebookNewCellFactory().newCodeCell(evaluatorName);
          notebookCellOp.appendAfter(thisCellId, newCell);
          bkUtils.refreshRootScope();
        };
        $scope.getShareMenuPlugin = function() {
          return bkCellMenuPluginManager.getPlugin(CELL_TYPE);
        };
        var shareMenu = {
          name: "Share",
          items: []
        };
        $scope.cellmenu.addItem(shareMenu);
        $scope.$watch("getShareMenuPlugin()", function() {
          shareMenu.items = bkCellMenuPluginManager.getMenuItems(CELL_TYPE, $scope);
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

        $scope.getElapsedTimeString = function() {
          // Do not show anything if less than 20 ms
          if ($scope.cellmodel.output.elapsedTime >= 200) {
            return "("+bkUtils.formatTimeString($scope.cellmodel.output.elapsedTime)+")";
          }

          return "";
        }

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
            notebookCellOp.reset();
          }
        });

        $scope.cellmenu.addItem({
          name: "Options",
          action: function() {
            bkCoreManager.showFullModalDialog(function cb(r) { } ,
                'app/mainapp/dialogs/codecelloptions.jst.html', 'CodeCellOptionsController', $scope.cellmodel);
          }
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
        var resizeHandler = function() {
          var showing = document.body.getElementsByClassName("CodeMirror-fullscreen")[0];
          if (!showing)
            return;
          showing.CodeMirror.getWrapperElement().style.height = winHeight() + "px";
        };

        CodeMirror.on(window, "resize", resizeHandler);
        var moveFocusDown = function() {
          // move focus to next code cell
          var thisCellId = scope.cellmodel.id;
          var nextCell = notebookCellOp.getNext(thisCellId);
          while (nextCell) {
            if (scope.bkNotebook.getFocusable(nextCell.id)) {
              scope.bkNotebook.getFocusable(nextCell.id).focus();
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
            var t = scope.bkNotebook.getFocusable(prevCell.id);
            if (t) {
              t.focus();
              var top = t.cursorCoords(true,'window').top;
              if ( top < 150)
                window.scrollBy(0, top-150);
              break;
            } else {
              prevCell = notebookCellOp.getPrev(prevCell.id);
            }
          }
        };
        scope.cm = CodeMirror.fromTextArea(element.find("textarea")[0], {
          lineNumbers: true,
          matchBrackets: true,
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
            "Ctrl-S": "save",
            "Cmd-S": "save",
            "Shift-Ctrl-A": function(cm) {
              scope.appendCodeCell();
            },
            "Shift-Cmd-A": function(cm) {
              scope.appendCodeCell();
            },
            "Shift-Ctrl-E": function(cm) {
              scope.popupMenu();
              element.find(".inputcellmenu").find('li').find('a')[0].focus();
            },
            "Shift-Cmd-E": function(cm) {
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
            "Cmd-Enter": function(cm) {
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
                var onResults = function(results, matched_text, dotFix) {
                  var start = token.start;
                  var end = token.end;
                  if (dotFix && token.string === ".") {
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

              if (cm.getOption('mode') === 'htmlmixed' || cm.getOption('mode') === 'javascript') {
                console.log("using code mirror");
                cm.execCommand("autocomplete");
              } else {
                var options = {
                  async: true,
                  closeOnUnfocus: true,
                  alignWithWord: true,
                  completeSingle: true
                };
                CodeMirror.showHint(cm, getHints, options);
              }
            },
            "Cmd-Space": function(cm) {
              var getToken = function(editor, cur) {
                return editor.getTokenAt(cur);
              };
              var getHints = function(editor, showHintCB, options) {
                var cur = editor.getCursor();
                var token = getToken(editor, cur);
                var cursorPos = editor.indexFromPos(cur);
                // We might want this defined by the plugin.
                var onResults = function(results, matched_text, dotFix) {
                  var start = token.start;
                  var end = token.end;
                  if (dotFix && token.string === ".") {
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

              if (cm.getOption('mode') === 'htmlmixed' || cm.getOption('mode') === 'javascript') {
                console.log("using code mirror");
                cm.execCommand("autocomplete");
              } else {
                var options = {
                  async: true,
                  closeOnUnfocus: true,
                  alignWithWord: true,
                  completeSingle: true
                };
                CodeMirror.showHint(cm, getHints, options);
              }
            },
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

        scope.cm.focus();
        scope.updateUI(scope.getEvaluator());
        scope.bkNotebook.registerFocusable(scope.cellmodel.id, scope.cm);
        scope.bkNotebook.registerCM(scope.cellmodel.id, scope.cm);

        // cellmodel.body --> CodeMirror
        scope.$watch('cellmodel.input.body', function(newVal, oldVal) {
          if (scope.cm && newVal !== scope.cm.getValue()) {
            if (newVal === null) {
              newVal = "";
            }
            scope.cm.setValue(newVal);
            scope.cm.clearHistory();
          }
        });
        // cellmodel.body <-- CodeMirror
        var changeHandler = function(cm, e) {
          if (scope.cellmodel.input.body !== cm.getValue()) {
            scope.cellmodel.lineCount = cm.lineCount();
            scope.cellmodel.input.body = cm.getValue();            
            if (! bkSessionManager.isNotebookModelEdited()) {
              bkSessionManager.setNotebookModelEdited(true);
              bkUtils.refreshRootScope();
            }
          }
        };

        scope.cm.on("change", changeHandler);

        var inputMenuDiv = element.find(".bkcell").first();
        scope.popupMenu = function(event) {
          var menu = inputMenuDiv.find('.dropdown').first();
          menu.find('.dropdown-toggle').first().dropdown('toggle');
        };

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

        scope.getShareData = function() {
          var evaluator = _(bkSessionManager.getRawNotebookModel().evaluators)
              .find(function (evaluator) {
                return evaluator.name === scope.cellmodel.evaluator;
              });
          var cells = [scope.cellmodel];
          return bkUtils.generateNotebook([evaluator], cells);
        };

        scope.$on("$destroy", function() {
          CodeMirror.off(window, "resize", resizeHandler);
          CodeMirror.off("change", changeHandler);
          scope.bkNotebook.unregisterFocusable(scope.cellmodel.id);
          scope.bkNotebook.unregisterCM(scope.cellmodel.id);
          scope.bkNotebook = null;
        });
      }
    };
  });

})();
