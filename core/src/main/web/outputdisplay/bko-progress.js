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
  beakerRegister.bkoDirective("Progress", ["$interval", "$compile", "$rootScope", "bkEvaluateJobManager", "bkUtils", "bkNotificationService", "bkOutputDisplayFactory", function(
      $interval, $compile, $rootScope, bkEvaluateJobManager, bkUtils, bkNotificationService, bkOutputDisplayFactory) {
    return {
      template: JST['mainapp/components/notebook/output-progress'],
      require: '^bkOutputDisplay',
      link: function(scope, element, attrs, outputDisplayCtrl) {
        scope.elapsed = 0;
        var computeElapsed = function() {
          var now = new Date().getTime();
          var start;
          if ( scope.model.getCellModel() !== undefined)
            start = scope.model.getCellModel().startTime;
          else
            start = now;
          scope.elapsed = now - start;
          if (!(scope.$$phase || $rootScope.$$phase)) {
            // we don't execute the $interval within $apply so we have to manually refresh it. This refreshes only this scope.
            scope.$digest();
          }
        };
        var intervalPromise = $interval(function() {
          computeElapsed();
          if (scope.elapsed > 60 * 1000) {
            $interval.cancel(intervalPromise);
            intervalPromise = $interval(function() {
              computeElapsed();
            }, 1000, 0, false);
          }
        }, 100, 0, false);
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
        scope.hasOutputData = function() {
          return scope.model.getCellModel().outputdata !== undefined && scope.model.getCellModel().outputdata.length > 0;
        };
        scope.hasPayload = function() {
          return scope.model.getCellModel().payload !== undefined;
        };
        scope.getPayloadType = function() {
          if (scope.hasPayload())
            return scope.model.getCellModel().payload.type;
          return undefined;
        };
        scope.getPayload = function() {
          return scope.model.getCellModel().payload;
        };
        scope.cancel = function() {
          bkEvaluateJobManager.cancel();
        };
        scope.isCancellable = function() {
          return bkEvaluateJobManager.isCancellable();
        };
        scope.toggleNotifyWhenDone = function () {
          if(!scope.isNotifyWhenDone()) {
            bkNotificationService.checkPermissions();
          }
          outputDisplayCtrl.toggleNotifyWhenDone();
        };
        scope.isNotifyWhenDone = function () {
          return outputDisplayCtrl.isNotifyWhenDone();
        };
        scope.$on("$destroy", function() {
          $interval.cancel(intervalPromise);
        });
        scope.getOutputResult = function() {
          return scope.model.getCellModel().payload;
        };

        scope.isShowMenu = function() { return false; };
        
        scope.$watch('getPayload()', function() {
          if (scope.hasPayload()) {
            scope.outputDisplayModel = {
                result : scope.getPayload()
            };
          }
        });
      }
    };
  }]);
})();
