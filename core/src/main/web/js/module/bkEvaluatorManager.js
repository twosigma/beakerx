/*
 *  Copyright 2014 TWO SIGMA INVESTMENTS, LLC
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
 * M_bkEvaluatorPluginManager
 */
(function() {
  'use strict';
  var module = angular.module('M_bkEvaluatorManager', [
    'M_bkUtils',
    'M_bkEvaluatePluginManager'
  ]);

  module.factory('bkEvaluatorManager', function (bkUtils, bkEvaluatePluginManager) {
    var evaluators = {};
    return {
      reset: function() {
        evaluators = {};
      },
      newEvaluator: function(settings) {
        return bkEvaluatePluginManager.getEvaluatorFactory(settings.plugin)
            .then(function(facotry) {
              return facotry.create(settings);
            })
            .then(function(evaluator) {
              evaluators[settings.name] = evaluator;
              return evaluator;
            });
      },
      getEvaluator: function(evaluatorId) {
        return evaluators[evaluatorId];
      },
      getAllEvaluators: function() {
        return evaluators
      },
      getViewModel: function() {
        var ret = {};
        _.chain(evaluators).keys().each(function(key) {
          var value = evaluators[key];
          ret[key] = {
            cm: {
              "background": value.background,
              "mode": value.cmMode
            }
          };
        });
        return ret;
      }
    };
  });
})();
