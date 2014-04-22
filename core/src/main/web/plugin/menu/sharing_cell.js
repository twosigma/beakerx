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
 * notebook sharing menu item
 * Add an item to the notebook menu to share it via the web
 */
define(function(require, exports, module) {
  "use strict";
  var publishToWeb = function(scope) {
    var ev = scope.getEvaluator().evaluator;
    var display = undefined;
    if (scope.cellmodel.output && scope.cellmodel.output.layoutToDisplay) {
      display = scope.cellmodel.output.layoutToDisplay.normal;
    }
    var cellData = {
      cellModel: scope.cellmodel,
      viewModel: {
        cm: {
          background: ev.background ? ev.background : "white",
          mode: ev.cmMode
        },
        display: display
      }
    };
    var future = bkHelper.httpPost("/beaker/rest/publish/github",
                                   {type: "cell", json: angular.toJson(cellData)})
      .then(function (reply) {
        window.open(reply.data);
      });
  };
  var plugin = function(scope) {
    return [
      {
        name: "public web...",
        tooltip: "using an anonymous github gist",
        action: function() {
          publishToWeb(scope);
        }
      }];
  };
  exports.cellType = "codeCell";
  exports.plugin = plugin;
});
