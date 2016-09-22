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
  angular.module('bk.core').factory('autocompleteParametersService', function() {

    var markConfig = {
      clearWhenEmpty: false,
      inclusiveLeft: true,
      inclusiveRight: true
    };

    var params = [];
    var cm;
    var scope;
    var currentParam, initialValues = [], currentValues = [];
    var args = [];
    var DOCUMENTATION_WIDTH = 500;

    function startParameterCompletion(codeMirror, documentation, selectionStart, selectionEnd, $scope) {
      cm = codeMirror;
      params = documentation.parameters;
      scope = $scope;
      markParameters(selectionStart, selectionEnd);
      cm.on('cursorActivity', endCompletionIfCursorOutOfRange);
      nextParameter();
    }

    function endCompletionIfCursorOutOfRange(cm) {
      if (!isActive()) {
        return;
      }
      if (!cursorInRange(getCompletionRange())) {
        return endCompletion();
      }

      if (cursorInRange(args[currentParam].find())) {
        // if not initialized
        if (initialValues.length == 0) {
          initialValues = getAllValues();
        }
        return showParameterDocumentation(params[currentParam]);
      }

      var activeArgumentIndex = getArgumentIndexUnderCursor();
      if (activeArgumentIndex === -1 || _.isUndefined(activeArgumentIndex)) {
        return hideParameterDocumentation();
      }
      toParam(activeArgumentIndex);

    }

    function getArgumentIndexUnderCursor() {
      return _.findIndex(args, function(arg) {
        return cursorInRange(arg.find());
      });
    }

    function cursorInRange(range) {
      var cursor = cm.getCursor('anchor');
      return cursor.line >= range.from.line &&
        cursor.line <= range.to.line &&
        cursor.ch >= range.from.ch &&
        cursor.ch <= range.to.ch;
    }

    function getCompletionRange() {
      return {from: args[0].find().from, to: _.last(args).find().to};
    }

    function markParameters(from, to) {
      var paramsString = cm.getRange(from, to);
      var positions = [];
      _.reduce(params, function(positionAccumulator, p) {
        var position = paramsString.indexOf(p.name, positionAccumulator);
        positions.push([position, position + p.name.length - 1]);
        return positionAccumulator + p.name.length + 2; // including comma and a space after comma
      }, 0);
      args = _.map(positions, function(p) {
        var start = _.merge({}, from, {ch: from.ch + p[0]});
        var end = _.merge({}, from, {ch: from.ch + p[1] + 1});
        return markWithClass(start, end, 'marked-argument-unchanged');
      });
    }

    function markWithClass(start, end, className) {
      return cm.markText(start, end, _.merge({}, {className: className}, markConfig));
    }

    function nextParameter() {
      toParam(_.isUndefined(currentParam) || currentParam === params.length - 1? 0 : currentParam + 1);
    }

    function previousParameter() {
      toParam(_.isUndefined(currentParam) || currentParam === 0 ? params.length - 1 : currentParam - 1);
    }

    function toParam(index) {
      if (! _.isUndefined(currentParam)) {
        params[currentParam].argument = args[currentParam].find();
        markArgumentIfChanged();
      }
      currentParam = index;
      selectArgument(currentParam);
      showParameterDocumentation(params[currentParam]);
    }

    function markArgumentIfChanged() {
      var p = params[currentParam]
      if (cm.getRange(p.argument.from, p.argument.to) !== p.name) {
        args[currentParam].clear();
        args[currentParam] = markWithClass(p.argument.from, p.argument.to, 'marked-argument-changed');
      }
    }

    function isActive() {
      return !(_.isEmpty(params));
    }

    function endCompletion() {
      removeOptionalParams();
      cm.off('cursorActivity', endCompletionIfCursorOutOfRange);
      hideParameterDocumentation();
      clearMarks();
      cm = void 0;
      currentParam = void 0;
      scope = void 0;
      params = [];
      args = [];
    }

    function getAllValues() {
      var currentValues = [];
      for (var i = 0; i < args.length; ++i) {
        var arg = args[i].find();
        currentValues[i] = cm.doc.getRange(arg.from, arg.to);
      }
      return currentValues;
    }

    function getIndexOfLastChangedParam() {
      for (var i = initialValues.length - 1; i >= 0; --i) {
        // that means value was changed
        if (initialValues[i] !== currentValues[i]) {
          return i;
        }
      }
      return 0;
    }

    function removeOptionalParams() {
      try {
        currentValues = getAllValues();
        // last changed parameter
        var lastParamIndex = getIndexOfLastChangedParam();
        var lastParam = args[lastParamIndex].find();
        // last argument for current params suggestion
        var lastArg = _.last(args).find();
        // get selection of optional params
        cm.doc.setSelection(lastParam.to, lastArg.to);
        cm.doc.replaceSelection('');
      } catch(e) {
        // if we get here than there is error in editor
        console.log('unable to get selection for removing optional parameters');
      }
    }

    function endCompletionAndMoveCursor() {
      var lastArg = _.last(args).find();
      cm.setCursor(_.merge({}, lastArg.to, {ch: lastArg.to.ch + 1}));
      endCompletion();
    }

    function selectArgument(i) {
      var arg = args[i].find();
      cm.setSelection(arg.from, arg.to);
    }

    function clearMarks() {
      _.forEach(args, function(arg) {
        arg.clear();
      });
    }

    function showParameterDocumentation(param) {
      if (!param.description || _.isEmpty(param.description)) {
        return;
      }
      _.defer(function() {scope.$broadcast('showParameterDocumentation', param.description, cm.getScrollInfo().left, DOCUMENTATION_WIDTH);});
    }

    function hideParameterDocumentation() {
      scope.$broadcast('hideParameterDocumentation');
    }

    return {
      startParameterCompletion: startParameterCompletion,
      isActive: isActive,
      nextParameter: nextParameter,
      previousParameter: previousParameter,
      endCompletion: endCompletion,
      endCompletionAndMoveCursor: endCompletionAndMoveCursor
    };

  });
})();
