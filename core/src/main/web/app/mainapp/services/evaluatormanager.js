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
 * Module bk.evaluatorPluginManager
 */
(function() {
  'use strict';
  var module = angular.module('bk.evaluatorManager', ['bk.utils', 'bk.evaluatePluginManager']);

  module.factory('bkEvaluatorManager', function (bkUtils, bkEvaluatePluginManager) {
    var evaluators = {};
    var loadingInProgressEvaluators = [];
    return {
      reset: function() {
        evaluators = {};
      },
      newEvaluator: function(evaluatorSettings) {
        loadingInProgressEvaluators.push(evaluatorSettings);
        return bkEvaluatePluginManager.getEvaluatorFactory(evaluatorSettings.plugin)
            .then(function(facotry) {
              return facotry.create(evaluatorSettings);
            })
            .then(function(evaluator) {
              if (_.isEmpty(evaluatorSettings.name)) {
                if (!evaluators[evaluator.pluginName]) {
                  evaluatorSettings.name = evaluator.pluginName;
                } else {
                  evaluatorSettings.name = evaluator.pluginName + "_" + bkUtils.generateId(6);
                }
              }

              if (!evaluatorSettings.view) {
                evaluatorSettings.view = {};
              }
              if (!evaluatorSettings.view.cm) {
                evaluatorSettings.view.cm = {};
              }
              evaluatorSettings.view.cm.mode = evaluator.cmMode;

              evaluators[evaluatorSettings.name] = evaluator;
              return evaluator;
            })
            .finally(function() {
              var index = loadingInProgressEvaluators.indexOf(evaluatorSettings);
              loadingInProgressEvaluators.splice(index, 1);
            });
      },
      getEvaluator: function(evaluatorId) {
        return evaluators[evaluatorId];
      },
      getAllEvaluators: function() {
        return evaluators;
      },
      getLoadingEvaluators: function() {
        return loadingInProgressEvaluators;
      },
      exitAndRemoveAllEvaluators: function() {
        console.log(evaluators);
        _.each(evaluators, function(ev) {
          if (ev && _.isFinite(ev.exit)) {
            ev.exit();
          }
        });
        evaluators = {};
      }
    };
  });
})();
