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

      function Stage(id, total, failed, completed, active) {
        this.total = total;
        this.id = id;
        this.url = bkSparkContextManager.sparkUiUrl() + '/stages/stage/?id=' + id + '&attempt=0';
        this.failed = failed;
        this.completed = completed;
        this.active = active;

        if (this.total > 0) {
          this.failedP = Math.min(100, this.failed / this.total * 100);
          this.completedP = Math.min(100, this.completed / this.total * 100);
          this.activeP = Math.min(100, this.active / this.total * 100);
        }
        else {
          this.failedP = 0;
          this.completedP = 0;
          this.activeP = 0;
        }
      };      

      return {
        restrict: 'E',
        template: JST["mainapp/components/spark/sparkprogress"](),      
        replace: true,
        controller: function($scope) {
        },
        link: function(scope, element, attrs) {
          scope.stages = [];
          scope.jobId = null;

          $.cometd.subscribe('/sparkStageProgress', function(progress) {
            scope.stages = [];
            for (var index in progress.data) {
              var s = progress.data[index];
              scope.stages.push(new Stage(
                s.stageId,
                s.totalTasks,
                s.failedTasks,
                s.succeededTasks,
                s.activeTasks));
            }
            scope.$digest();
          });

          $.cometd.subscribe('/sparkJobProgress', function(progress) {
            scope.jobId = progress.data.jobId;
            scope.$digest();
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

          scope.jobUrl = function() {
            if (scope.jobId == null)
              return null;
            return bkSparkContextManager.sparkUiUrl() + '/jobs/job/?id=' + scope.jobId;
          };
        }
      };
  });

})();
