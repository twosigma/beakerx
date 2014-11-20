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
 * bkoProgress
 */
(function() {
  'use strict';
  beaker.bkoDirective("Progress", ["$interval", "bkEvaluateJobManager", "bkUtils", function(
      $interval, bkEvaluateJobManager, bkUtils) {
    return {
      template: "<table><tr><td><div ng-if='hasMessage()'> {{getMessage()}}</div></td><td><div ng-if='elapsed > 200'> <i class='fa fa-cog fa-spin fa-lg'></i> " +
          "<span> Elapsed: {{getElapsedTime()}} </span>" +
          "<i class='fa fa-times-circle fa-lg text-danger cursor_hand' ng-click='cancel()' ng-if='isCancellable()' title='cancel'></i> </div></td>" +
          "<td><div ng-if='hasProgressBar()'> Progress: {{getProgressBar()}} %</div></td></table>",
      link: function(scope, element, attrs) {
        scope.elapsed = 0;
        var computeElapsed = function() {
          var now = new Date().getTime();
          var start = scope.model.getCellModel().startTime;
          scope.elapsed = now - start;
        };
        var intervalPromise = $interval(function() {
          computeElapsed();
          if (scope.elapsed > 60 * 1000) {
            $interval.cancel(intervalPromise);
            intervalPromise = $interval(function() {
              computeElapsed();
            }, 1000);
          }
        }, 100);
        scope.getElapsedTime = function() {
          return bkUtils.formatTimeString(scope.elapsed);
        };
        scope.getMessage = function() {
          return scope.model.getCellModel().message;
        };
        scope.hasMessage = function() {
          return scope.model.getCellModel().message !== undefined;
        };
        scope.getProgressBar = function() {
          return scope.model.getCellModel().progressBar;
        };
        scope.hasProgressBar = function() {
          return scope.model.getCellModel().progressBar >= 0;
        };
        scope.cancel = function() {
          bkEvaluateJobManager.cancel();
        };
        scope.isCancellable = function() {
          return bkEvaluateJobManager.isCancellable();
        };
        scope.$on("$destroy", function() {
          $interval.cancel(intervalPromise);
        });
      }
    };
  }]);
})();
