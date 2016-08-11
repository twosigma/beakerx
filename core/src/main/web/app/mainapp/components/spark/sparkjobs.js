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
 * bkSparkJobsCtrl
 */

(function() {
  'use strict';
  var module = angular.module('bk.core');

  module.controller(
    'sparkJobsCtrl',
    ['$scope', '$rootScope', '$uibModalInstance', 'bkCoreManager', 'bkSessionManager',
     'bkMenuPluginManager', 'bkEvaluatePluginManager', 'bkEvaluatorManager', 'GLOBALS',
     'bkUtils', 'bkSparkContextManager',
     function($scope, $rootScope, $uibModalInstance, bkCoreManager, bkSessionManager,
              bkMenuPluginManager, bkEvaluatePluginManager,
              bkEvaluatorManager, GLOBALS, bkUtils, bkSparkContextManager) {

    var cellId = $scope.$parent.$parent.cellId;
    $scope.jobs = [];
    $scope.retrieveJobs = function() {
      return bkSparkContextManager.getJobsPerCell(cellId);
    };
    $scope.$watch('retrieveJobs()', function(newValue, oldValue) {
      if (newValue == null || newValue.length == 0)
        return;
      // remember expanded states
      var expanded = [];
      for (var index in $scope.jobs) {
        expanded[index] = $scope.jobs[index]["expanded"] == true;
      }
      $scope.jobs = newValue;
      for (var index in expanded) {
        $scope.jobs[index]["expanded"] = expanded[index];
      }
    });

    $scope.toggle = function(job) {
      if (job.expanded == null || !job.expanded)
        job["expanded"] = true;
      else
        job["expanded"] = false;
    };

    $scope.doClose = function() {
      $uibModalInstance.close("ok");
    };

    $scope.openUrl = function($event, url) {
      $event.stopPropagation();
      var win = window.open(url, '_blank');
      win.focus();
    };

    $scope.expandAll = function() {
      for (var index in $scope.jobs) {
        $scope.jobs[index]["expanded"] = true;
      }
    };

    $scope.collapseAll = function() {
      for (var index in $scope.jobs) {
        $scope.jobs[index]["expanded"] = false;
      }
    };
  }]);
})();
