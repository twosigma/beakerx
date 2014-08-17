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
 * This is the module for the UI that shows the list of evaluators and their corresponding
 * settings panel.
 */

(function() {
  'use strict';
  var module = angular.module('bk.pluginManager');

  module.directive('bkPluginManagerEvaluatorSettings', function(
      $compile, bkSessionManager) {
    return {
      restrict: 'E',
      template: '<div class="bbody"></div>',
      controller: function($scope) {
        $scope.set = function(val) {
          $scope.evaluator.perform(val);
          bkSessionManager.setNotebookModelEdited(true);
        };
      },
      link: function(scope, element, attrs) {
        var evaluator = scope.evaluator;
        for (var property in evaluator.spec) {
          if (evaluator.spec.hasOwnProperty(property)) {
            var name = evaluator.spec[property].hasOwnProperty('name') ? evaluator.spec[property].name : property;
            if (evaluator.spec[property].type === "settableString") {
              element.find('.bbody').append($compile(
                      "<div>" + name + ":<br><textarea ng-model='evaluator.settings." + property +
                      "'></textarea><button ng-click='set(\"" + property +
                      "\")'>set</button></div>")(scope));
            } else if (evaluator.spec[property].type === "action") {
              element.find('.bbody').append($compile("<div><button ng-click='evaluator.perform(\"" + property +
                  "\")'>" + name + "</button></div>")(scope));
            }
          }
        }
      }
    };
  });

})();
