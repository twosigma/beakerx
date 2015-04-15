/*
 *  Copyright 2015 TWO SIGMA OPEN SOURCE, LLC
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
  marked.setOptions({
    gfm: true,
    breaks: true
  });
  module.directive('bkMarkdownEditable', ['bkSessionManager', 'bkHelper', 'bkCoreManager', '$timeout', function(bkSessionManager, bkHelper, bkCoreManager, $timeout) {
    var notebookCellOp = bkSessionManager.getNotebookCellOp();
    var getBkNotebookWidget = function() {
      return bkCoreManager.getBkApp().getBkNotebookWidget();
    };
    return {
      restrict: 'E',
      template: JST["mainapp/components/notebook/markdown-editable"](),
      scope: {
        cellmodel: '=',
        options: '='
      },
      link: function(scope, element, attrs) {
        var bkNotebook = getBkNotebookWidget();
        var contentAttribute;

        if (!_.isUndefined(scope.cellmodel.body)) {
          contentAttribute = 'body';
        } else {
          contentAttribute = 'title';
        }

        var preview = function() {
          var markdownFragment = $('<div style="display: none;">' + scope.cellmodel[contentAttribute] + '</div>');
          markdownFragment.appendTo('body'); // ugh mathjax doesn't operate on document fragments...

          MathJax.Hub.Queue(["Typeset", MathJax.Hub, markdownFragment[0]]);
          MathJax.Hub.Queue(function() {
            element.find('.markup').html(marked(markdownFragment.html()));
            markdownFragment.remove();
          });
          scope.mode = 'preview';
        };

        var syncContentAndPreview = function() {
          scope.cellmodel[contentAttribute] = scope.cm.getValue();
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

          scope.mode = 'edit';

          $timeout(function() {
            var cm = scope.cm;
            cm.setValue(scope.cellmodel[contentAttribute]);
            cm.clearHistory();

            if (event) {
              var clickLocation;
              var wrapper = $(event.delegateTarget);
              var top = wrapper.offset().top;
              var bottom = top + wrapper.outerHeight();
              if (event !== undefined && event.pageY < (top + bottom) / 2) {
                cm.setCursor(0, 0);
              } else {
                cm.setCursor(cm.lineCount() - 1, cm.getLine(cm.lastLine()).length);
              }
            }

            cm.focus();
          });
        };

        preview();

        scope.cm = CodeMirror.fromTextArea(element.find("textarea")[0], {
          mode: "markdown",
          electricChars: false,
          smartIndent: false,
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

        scope.options.edit = function(event) { scope.edit(event) };
        bkNotebook.registerFocusable(scope.cellmodel.id, scope);
        bkNotebook.registerCM(scope.cellmodel.id, scope.cm);

        preview();

        scope.cm.on("blur", function(){
          scope.$apply(function() {
            syncContentAndPreview();
          });
        });

        scope.$on('beaker.cell.added', function(e, cellmodel) {
          if (cellmodel === scope.cellmodel) scope.edit();
        });

        scope.$watch('cellmodel.body', function(newVal, oldVal) {
          if (newVal !== oldVal) {
            bkSessionManager.setNotebookModelEdited(true);
          }
        });
      }
    };
  }]);
})();
