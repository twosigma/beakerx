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
  var PLUGIN_NAME = "Latex";
  var Latex = {
    pluginName: PLUGIN_NAME,
    cmMode: "stex",
    evaluate: function(code, modelOutput) {
      var startTime = new Date().getTime();
      return bkHelper.fcall(function() {
        modelOutput.result = {
          type: "BeakerDisplay",
          innertype: "Latex",
          object: code};
        modelOutput.elapsedTime = new Date().getTime() - startTime;
      });
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
