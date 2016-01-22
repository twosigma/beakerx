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
  angular.module('bk.core').factory('autocompleteService', function(codeMirrorExtension, bkEvaluatorManager, $q) {

  var completionActive = false;

  var showAutocomplete = function(cm, scope) {
    var getToken = function(editor, cur) {
      return editor.getTokenAt(cur);
    };
    var getHints = function(editor, showHintCB, options) {
      var cur = editor.getCursor();
      var token = getToken(editor, cur);
      var cursorPos = editor.indexFromPos(cur);

      var waitfor = _(codeMirrorExtension.autocomplete).filter(function(t) {
        return t.type === token.type || t.type === '*';
      }).map(function(t) {
        return t.hint(token, editor);
      }).value();

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
        var hintData = {
          from: CodeMirror.Pos(cur.line, start),
          to: CodeMirror.Pos(cur.line, end),
          list: _.uniq(results)
        };

        var evaluator = bkEvaluatorManager.getEvaluator(scope.cellmodel.evaluator);
        if (_.isFunction(evaluator.showDocs)) {
          attachAutocompleteListeners(hintData, evaluator, scope, cm, matched_text);
        }

        if (waitfor.length > 0) {
          $q.all(waitfor).then(function (res) {
            for (var i in res) {
              hintData.results = _.uniq(results.concat(res[i]));
            }
            showHintCB(hintData);
          }, function(err) {
            showHintCB(hintData);
          })
        } else {
          showHintCB(hintData);
        }
      };
      scope.autocomplete(cursorPos, onResults);
    };

    if (cm.getOption('mode') === 'htmlmixed' || cm.getOption('mode') === 'javascript') {
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
  };

  var maybeShowAutocomplete = function(cm, scope) {
    if (scope.bkNotebook.getCMKeyMapMode() === "emacs") {
      cm.setCursor(cm.getCursor());
      cm.setExtending(!cm.getExtending());
      cm.on("change", function() {
        cm.setExtending(false);
      });
    } else {
      showAutocomplete(cm, scope);
    }
  };

  var attachAutocompleteListeners = function(hintData, evaluator, scope, cm, matched_text) {
    CodeMirror.on(hintData, 'select', function(selectedWord, selectedListItem) {
      completionActive = true;

      evaluator.showDocs(selectedWord, selectedWord.length - 1, function(documentation) {
        scope.$broadcast('showDocumentationForAutocomplete', documentation, true);

        if (documentation.ansiHtml) {
          var params = getParameters(ansi_up.ansi_to_html(documentation.ansiHtml));
          writeCompletion(selectedWord, params, cm, matched_text);
        } else {
          var index = selectedWord.indexOf(matched_text) + matched_text.length;
          replaceSelection(selectedWord.substring(index), cm);
        }
      });
    });
    CodeMirror.on(cm, 'endCompletion', function() {
      completionActive = false;
      scope.$broadcast('hideDocumentationForAutocomplete');
    });
    CodeMirror.on(hintData, 'pick', function(completion) {
      // Removing duplicate completion since we already have it from when we wrote the parameters
      var lengthToRemove = completion.length - matched_text.length;
      var cursorPos = cm.getCursor('from');
      cm.doc.replaceRange('', {line: cursorPos.line, ch: cursorPos.ch - lengthToRemove}, cursorPos);
      cm.setCursor(cm.getCursor());
    })
  };

  function getParameters(documentation) {
    // Parsing parameters from documentation
    debugger;
    var start = documentation.indexOf('Parameters\n');
    if (start === -1) {
      return [];
    }
    documentation = documentation.substring(start);
    documentation = documentation.substring(documentation.indexOf('-\n') + 2, documentation.indexOf('\n\n'));
    return _.map(documentation.split(/\n(?=\S)/), function(param) {
      var s = param.split(':');
      return {name: s[0].trim(), description: s[1].trim()};
    });
  }

  function writeCompletion(funcName, params, cm, matched_text) {
    // writes the selected completion with parameters
    var str = _.map(params, function(p) {
      return p.name;
    });
    var index = funcName.indexOf(matched_text) + matched_text.length;

    replaceSelection(funcName.substring(index) + '(' + str.join(', ') + ')', cm);
  }

  function replaceSelection(s, cm) {
    // Disabling and enabling showhint event handlers that fire on every change
    var handlers = cm._handlers.cursorActivity;
    cm._handlers.cursorActivity = [];
    cm.doc.replaceSelection(s, 'around');
    cm._handlers.cursorActivity = handlers;
  }

  function backspace(cursor, cm) {
    // If backspace is pressed while autocompletion selection is active we delete one extra character
    if (completionActive) {
      var from = cm.findPosH(cursor, -1, 'char', false);
      cm.replaceRange('', from, cursor);
    }
  }

  return {
    showAutocomplete: showAutocomplete,
    maybeShowAutocomplete: maybeShowAutocomplete,
    backspace: backspace
  };

  });
})();
