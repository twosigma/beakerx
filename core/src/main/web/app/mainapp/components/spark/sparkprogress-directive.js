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
 * This directive provides the spark progress bars indicating the tasks and stages.
 */

(function() {
  'use strict';

  var module = angular.module('bk.core');

  module.directive('bkSparkProgress', 
    function($compile, $timeout, bkSparkContextManager, GLOBALS, bkUtils, bkSessionManager) {
      return {
        restrict: 'E',
        template: JST["mainapp/components/spark/sparkprogress"](),
        replace: true,
        controller: function($scope) {
        },
        link: function(scope, element, attrs) {
          var cellId = scope.model.getCellId();
          scope.jobs = [];
          scope.retrieveJobs = function() {
            return bkSparkContextManager.getJobsPerCell(cellId);
          };
          scope.$watch('retrieveJobs()', function(newValue, oldValue) {
            if (newValue == null || newValue.length == 0)
              return;
            scope.jobs = newValue;
          });

          scope.isConnected = function() {
            return bkSparkContextManager.isConnected();
          };

          scope.isConnecting = function() {
            return bkSparkContextManager.isConnecting();
          };

          scope.isDisconnecting = function() {
            return bkSparkContextManager.isDisconnecting();
          };
        }
      };
  });

})();
