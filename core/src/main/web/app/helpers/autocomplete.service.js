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
  angular.module('bk.core').factory('autocompleteService', function(codeMirrorExtension, autocompleteParametersService, bkEvaluatorManager, $q, bkUtils) {

  var completionActive = false;
  var currentDocumentation = {};
  var autocompleteParameters = true;
  if (window.beakerRegister === undefined || window.beakerRegister.isPublication === undefined) {
    bkUtils.getBeakerPreference('autocomplete-parameters').then(function(autocompleteParametersPref) {
      if (autocompleteParametersPref === "false") {
        autocompleteParameters = false;
      }
    });
  }
  var showAutocomplete = function(cm, scope) {
    if (autocompleteParametersService.isActive()) {
      autocompleteParametersService.nextParameter();
    }

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

      var onResults = function(results, matchedText, dotFix) {
        if (_.isEmpty(results)) {
          return;
        }

        if (_.isUndefined(matchedText)) {
          matchedText = token.string;
        }
        var start = cur.ch - matchedText.length;
        var end = start + matchedText.length;
        if (dotFix && token.string === ".") {
          start += 1;
        }

        var hintData = {
          from: CodeMirror.Pos(cur.line, start),
          to: CodeMirror.Pos(cur.line, end),
          list: _.uniq(results)
        };

        var evaluator = bkEvaluatorManager.getEvaluator(scope.cellmodel.evaluator);
        if (_.isFunction(evaluator.getAutocompleteDocumentation)) {
          attachAutocompleteListeners(hintData, evaluator, scope, cm, matchedText);
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

  var attachAutocompleteListeners = function(hintData, evaluator, scope, cm, matchedText) {
    CodeMirror.on(hintData, 'select', onSelect.bind(null, evaluator, scope, cm, matchedText));
    CodeMirror.on(cm, 'endCompletion', onEndCompletion.bind(null, scope));
    CodeMirror.on(hintData, 'pick', onPick.bind(null, cm, matchedText, scope));
  };

  function writeCompletion(funcName, params, cm, matchedText) {
    // writes the selected completion with parameters
    var str = _.map(params, function(p) {
      return p.name;
    });
    var index = funcName.indexOf(matchedText) + matchedText.length;

    var currentScrollInfo = cm.getScrollInfo();
    replaceSelection(funcName.substring(index) + '(' + str.join(', ') + ')', cm);
    cm.scrollTo(currentScrollInfo.left, currentScrollInfo.top);
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

  function onSelect(evaluator, scope, cm, matchedText, selectedWord, selectedListItem) {
    completionActive = true;
    currentDocumentation = {};

    evaluator.getAutocompleteDocumentation(selectedWord, function(documentation) {
      if (!_.isEmpty(documentation)) {
        scope.$broadcast('showDocumentationForAutocomplete', documentation.description, true);
      }

      if (documentation.parameters && autocompleteParameters && !_.isEmpty(documentation.parameters)) {
        currentDocumentation = documentation;
        writeCompletion(selectedWord, documentation.parameters, cm, matchedText);
      } else {
        var index = selectedWord.indexOf(matchedText) + matchedText.length;
        replaceSelection(selectedWord.substring(index), cm);
      }
    });
  }

  function onPick(cm, matchedText, scope, completion) {
    // Removing duplicate completion since we already have it from when we wrote the parameters
    var lengthToRemove = completion.length - matchedText.length;
    var cursorPosBegin = cm.getCursor('from');
    var cursorPosEnd = cm.getCursor('to');
    cm.doc.replaceRange('', {line: cursorPosBegin.line, ch: cursorPosBegin.ch - lengthToRemove}, cursorPosBegin);
    cm.setCursor(cm.getCursor());
    if (_.isEmpty(currentDocumentation) || _.isEmpty(currentDocumentation.parameters)) {
      return;
    }
    _.defer(function() {
      if (autocompleteParameters) {
        autocompleteParametersService.startParameterCompletion(cm, currentDocumentation, cursorPosBegin, cursorPosEnd, scope);
      }
    });
  }

  function onEndCompletion(scope) {
    completionActive = false;
    scope.$broadcast('hideDocumentationForAutocomplete');
  }

  return {
    showAutocomplete: showAutocomplete,
    maybeShowAutocomplete: maybeShowAutocomplete,
    backspace: backspace
  };

  });
})();
