/*
 *  Copyright 2016 TWO SIGMA OPEN SOURCE, LLC
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
 * This directive provides the more detailed Spark status indicator.
 */

(function() {
  'use strict';

  var module = angular.module('bk.core');

  module.directive('bkSparkStatus', 
    function($compile, $timeout, bkSparkContextManager, GLOBALS, bkUtils, bkSessionManager) {
      return {
        restrict: 'E',
        template: JST["mainapp/components/spark/sparkstatus"](),
        replace: true,
        controller: function($scope) {
        },
        link: function(scope, element, attrs) {
          scope.isAvailable = function() {
            return bkSparkContextManager.isAvailable();
          }

          scope.isConnected = function() {
            return !bkSparkContextManager.isFailing() && bkSparkContextManager.isConnected() && !bkSparkContextManager.isDisconnecting() && !bkSparkContextManager.isConnecting();
          };

          scope.isConnecting = function() {
            return !bkSparkContextManager.isFailing() && bkSparkContextManager.isConnecting();
          };

          scope.isFailing = function() {
            return bkSparkContextManager.isFailing();
          };

          scope.error = function() {
            return bkSparkContextManager.getError();
          };

          scope.isDisconnecting = function() {
            return !bkSparkContextManager.isFailing() && bkSparkContextManager.isDisconnecting();
          };

          scope.isOffline = function() {
            return !bkSparkContextManager.isFailing() && !scope.isConnected() && !scope.isConnecting() && !scope.isDisconnecting();
          };

          scope.running = function() {
            return bkSparkContextManager.runningJobs();
          };
        }
      };
  });

})();
