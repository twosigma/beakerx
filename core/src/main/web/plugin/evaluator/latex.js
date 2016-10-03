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
 * LaTex eval plugin
 * For creating and config evaluators that evaluate LaTex code and update code cell results.
 */
define(function(require, exports, module) {
  'use strict';
  var PLUGIN_NAME = "TeX";
  var Latex = {
    pluginName: PLUGIN_NAME,
    cmMode: "stex",
    bgColor: "#FFFFFF",
    fgColor: "#030303",
    borderColor: "3D4444",
    shortName: "Tx",
    tooltip: "TeX is Donald Knuth's mathematical typesetting language.",
    evaluate: function(code, modelOutput, refreshObj) {
      var startTime = new Date().getTime();
      var deferred = bkHelper.newDeferred();

      var progressObj = {
        type: "BeakerDisplay",
        innertype: "Progress",
        object: {
          message: "running...",
          startTime: new Date().getTime(),
          outputdata: []
        }
      };
      modelOutput.result = progressObj;

      bkHelper.timeout(function() {
        try {
          var tempElement = document.createElement('span');
          katex.render(code, tempElement, {throwOnError: false});
          deferred.resolve(code);
          return bkHelper.fcall(function() {
            modelOutput.result = {
              type: "BeakerDisplay",
              innertype: "Latex",
              object: code
            };
            modelOutput.elapsedTime = new Date().getTime() - startTime;
          });
        } catch (err) {
          var r = err.message;
          bkHelper.receiveEvaluationUpdate(modelOutput,
            {status: "ERROR", payload: r},
            PLUGIN_NAME);
          deferred.reject(r);
        }
      }, 0);

      return deferred.promise;
    },
    spec: {
    }
  };
  var Latex0 = function(settings) {
    if (!settings.view) {
      settings.view = {};
    }
    if (!settings.view.cm) {
      settings.view.cm = {};
    }
    settings.view.cm.mode = Latex.cmMode;
    settings.view.cm.background = Latex.background;
    this.settings = settings;
  };
  Latex0.prototype = Latex;

  exports.getEvaluatorFactory = function() {
    return bkHelper.getEvaluatorFactory(bkHelper.newPromise(Latex0));
  };
  exports.name = PLUGIN_NAME;
});