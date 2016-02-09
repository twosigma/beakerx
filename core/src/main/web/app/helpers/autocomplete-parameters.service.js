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

    var params = [];
    var completedParams = [];
    var cm;
    var scope;
    var currentParam;
    var args = [];

    function startParameterCompletion(codeMirror, documentation, selectionStart, selectionEnd, $scope) {
      cm = codeMirror;
      params = documentation.parameters;
      scope = $scope;
      markParameters(selectionStart, selectionEnd);
      nextParameter();
    }

    function markParameters(from, to) {
      var paramsString = cm.getRange(from, to);
      args = _(params).map(function(p) {
        var position = paramsString.indexOf(p.name);
        return [position, position + p.name.length - 1];
      }).map(function(p) {
        var start = _.merge({}, from, {ch: from.ch + p[0]});
        var end = _.merge({}, from, {ch: from.ch + p[1] + 1});
        return cm.markText(start, end, {className: 'marked-parameter', clearWhenEmpty: false, inclusiveLeft: true, inclusiveRight: true});
      }).value();
    }

    function nextParameter() {
      if (_.isEmpty(params)) {
        return endParameterCompletion();
      }

      if (! _.isUndefined(currentParam)) {
        currentParam.argument = args[completedParams.length].find();
        completedParams.push(currentParam);
      }

      currentParam = params.shift();
      selectNextParameter();
    }

    function isActive() {
      return !(_.isEmpty(params) && _.isEmpty(completedParams));
    }

    function endParameterCompletion() {
      console.log(args);
      cm.setCursor(_.last(args).find().to);
      clearMarks()
      cm = void 0;
      currentParam = void 0;
      scope = void 0;
      completedParams = [];
      args = [];
    }

    function selectNextParameter() {
      var arg = args[completedParams.length].find();
      cm.setSelection(arg.from, arg.to);
    }

    function clearMarks() {
      _.forEach(args, function(arg) {
        arg.clear();
      });
    }

    return {
      startParameterCompletion: startParameterCompletion,
      isActive: isActive,
      nextParameter: nextParameter
    };

  });
})();
