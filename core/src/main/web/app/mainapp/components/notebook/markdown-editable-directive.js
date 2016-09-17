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
  module.directive('bkMarkdownEditable', ['bkSessionManager', 'bkHelper', 'bkCoreManager', 'bkDragAndDropHelper', '$timeout', function(bkSessionManager, bkHelper, bkCoreManager, bkDragAndDropHelper, $timeout) {
    var notebookCellOp = bkSessionManager.getNotebookCellOp();
    var getBkNotebookWidget = function() {
      return bkCoreManager.getBkApp().getBkNotebookWidget();
    };
    return {
      restrict: 'E',
      template: JST["mainapp/components/notebook/markdown-editable"](),
      scope: {
        cellmodel: '='
      },
      link: function(scope, element, attrs) {
        var contentAttribute = scope.cellmodel.type === "section" ? 'title' : 'body';

        var previewEnable = true;
        
        var preview = function () {
          bkHelper.markupCellContent(scope.cellmodel[contentAttribute], bkHelper.evaluateCode)
              .then(function (transformedHtml) {
                if(previewEnable){
                  element.find('.markup').html(transformedHtml);
                  scope.mode = 'preview';
                }else{
                  scope.mode = 'edit';
                }
              });
        };

        var syncContentAndPreview = function() {
          scope.cellmodel[contentAttribute] = scope.cm.getValue();
          preview();
        };
        scope.evaluate = syncContentAndPreview;

        // cellmodel.body <-- CodeMirror
        var changeHandler = function(cm, e) {
          if (scope.cellmodel[contentAttribute] !== cm.getValue()) {
            scope.cellmodel[contentAttribute] = cm.getValue();
          }
          bkSessionManager.setNotebookModelEdited(true);
        };

        scope.bkNotebook = getBkNotebookWidget();
        
        scope.isPreviewMode = function () {
          return scope.mode === 'preview';
        };

        scope.focus = function() {
          scope.edit();
          scope.$apply();
        };

        scope.isShowInput = function() {
          //Markdown cell input is always visible
          return true;
        };
        
        scope.prepareForSearch = function() {
          scope.mode = 'edit';
          previewEnable = false;
        };
        
        scope.afterSearchActions = function() {
          previewEnable = true;
          preview();
          if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
            scope.$apply();
          }
        }

        scope.edit = function(event) {
          var selection = window.getSelection() || {};
          // If the user is selecting some text, do not enter the edit markdown mode
          if (selection.type == "Range" && $.contains(element[0], selection.focusNode)) {
            return;
          }
          if (bkHelper.isNotebookLocked()) return;
          if (event && event.target.tagName === "A") return; // Don't edit if clicking a link
          if (scope.$parent.isLockedCell()) return;

          scope.mode = 'edit';

          $timeout(function() {
            // remove content of markup when toggling to edit mode to prevent
            // flash when toggling back to preview mode.
            element.find('.markup').html('');

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

            if (scope.creatingNewSection === true && scope.cellmodel.type === 'section') {
              scope.creatingNewSection = false;
              var selectionStart = {line: 0, ch: 0};
              var selectionEnd = {line: 0, ch: cm.getValue().length};
              cm.setSelection(selectionStart, selectionEnd);
            }

            cm.focus();
          });
        };
        
        element.on('dragenter', function (e) {
          if(scope.isPreviewMode() && !bkDragAndDropHelper.isFileForImportDragging(e)) {
            scope.focus();
            scope.cm.refresh(); // CM should recalculate line heights
          }
        });
        
        CodeMirror.defineMode("smartMarkdownMode", function(config) {
        	  return CodeMirror.multiplexingMode(
        	    CodeMirror.getMode(config, "markdown"),
        	    {open: "$", close: "$",  mode: CodeMirror.getMode(config, "stex"),  delimStyle: "delimit"},
        	    {open: "{{", close: "}}",  mode: CodeMirror.getMode(config, "javascript"),  delimStyle: "delimit"}
        	  );
        	});
        
        var codeMirrorOptions = _.extend(bkCoreManager.codeMirrorOptions(scope, notebookCellOp), {
          lineNumbers: false,
          mode: "smartMarkdownMode",
          smartIndent: false
        });
        _.extend(codeMirrorOptions.extraKeys, {
          'Esc' : function(cm) {
              if (bkHelper.isFullScreen(cm)) {
                bkHelper.setFullScreen(cm, false);
              }
          }
        });

        scope.cm = CodeMirror.fromTextArea(element.find("textarea")[0], codeMirrorOptions);

        scope.bkNotebook.registerPreviewable(scope.cellmodel.id, scope);
        scope.bkNotebook.registerFocusable(scope.cellmodel.id, scope);
        scope.bkNotebook.registerCM(scope.cellmodel.id, scope.cm);

        scope.cm.setValue(scope.cellmodel[contentAttribute]);
        preview();

        scope.cm.on("mousedown", function(cm) {
          scope.mousedown = true;
        });

        $(scope.cm.getWrapperElement()).on("mouseup", function(cm) {
          scope.mousedown = false;
        });

        scope.cm.on("change", changeHandler);
        scope.cm.on("blur", function(cm) {
          setTimeout(function() {
            if (!scope.mousedown) {
              scope.$apply(function() {
                syncContentAndPreview();
              });
            }
          }, 0);
        });
        bkDragAndDropHelper.configureDropEventHandlingForCodeMirror(scope.cm);

        scope.$on('beaker.cell.added', function(e, cellmodel) {
          if (cellmodel === scope.cellmodel) {
            scope.creatingNewSection = true;
            scope.edit();
          }
        });

        scope.$watch('cellmodel.body', function(newVal, oldVal) {
          if (newVal !== oldVal && !bkSessionManager.isNotebookModelEdited()){
            bkSessionManager.setNotebookModelEdited(true);
          }
        });

        scope.$on('$destroy', function() {
          scope.bkNotebook.unregisterFocusable(scope.cellmodel.id);
          scope.bkNotebook.unregisterPreviewable(scope.cellmodel.id);
          scope.bkNotebook.unregisterCM(scope.cellmodel.id, scope.cm);
          CodeMirror.off('change', changeHandler);
          scope.cm.off();
        });
      }
    };
  }]);
})();
