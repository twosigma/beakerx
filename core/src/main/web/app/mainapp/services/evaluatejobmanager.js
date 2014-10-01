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

(function() {
  'use strict';
  var module = angular.module('bk.evaluateJobManager', ['bk.utils', 'bk.evaluatorManager']);
  module.factory('bkEvaluateJobManager', function(bkUtils, bkEvaluatorManager) {

    var setOutputCellText = function(cell, text) {
      if (!cell.output) {
        cell.output = {};
      }
      cell.output.result = text;
    };

    var jobQueue = (function() {
      var RETRY_MAX = 120;
      var RETRY_DELAY = 500; // ms
      var errorMessage = function(msg) {
        return {
          type: "BeakerDisplay",
          innertype: "Error",
          object: msg
        }
      };
      var ERROR_MESSAGE_ON_EARLIER_FAILURE =
          errorMessage("Evaluation cancelled due to a failure of an earlier cell evaluation");
      var MESSAGE_WAITING_FOR_EVALUTOR_INIT =
          "waiting for evaluator initialization ...";

      var _queue = [];
      var _jobInProgress = undefined;

      var evaluateJob = function(job) {
        job.evaluator = bkEvaluatorManager.getEvaluator(job.evaluatorId);
        if (job.evaluator) {
          bkUtils.log("evaluate", {
            plugin: job.evaluator.pluginName,
            length: job.code.length });
          return job.evaluator.evaluate(job.code, job.output);
        } else {
          if (job.retry > RETRY_MAX) {
            return bkUtils.fcall(function() {
              var err = job.evaluatorId + " failed to start";
              job.output.result = errorMessage(err);
              throw new Error(err);
            });
          }
          job.retry++;
          job.output.result = MESSAGE_WAITING_FOR_EVALUTOR_INIT;
          return bkUtils.delay(RETRY_DELAY).then(function () {
            return evaluateJob(job);
          });
        }
      };

      var doNext = function() {
        if (_jobInProgress) {
          return;
        }
        _jobInProgress = _queue.shift();
        if (_jobInProgress) {
          return evaluateJob(_jobInProgress)
              .then(_jobInProgress.resolve, function(err) {
                // empty result of all pending cells
                _queue.forEach(function(job) {
                  job.output.result = ERROR_MESSAGE_ON_EARLIER_FAILURE;
                });
                // clear the queue
                _queue.splice(0, _queue.length);
                // reject current job so whoever is waiting for it is notified
                _jobInProgress.reject(err);
              })
              .finally(function () {
                _jobInProgress = undefined;
              })
              .then(doNext);
        }
      };

      return {
        add: function(job) {
          _queue.push(job);
          bkUtils.fcall(doNext);
        },
        getCurrentJob: function() {
          return _jobInProgress;
        },
        empty: function() {
          _jobInProgress = undefined;
          _queue.splice(0, _queue.length);
        }
      };
    })();

    return {
      evaluate: function(cell) {
        var deferred = bkUtils.newDeferred();
        setOutputCellText(cell, "pending");
        var evalJob = {
          cellId: cell.id,
          evaluatorId: cell.evaluator,
          code: cell.input.body,
          output: cell.output,
          retry: 0,
          resolve: function(ret) {
            deferred.resolve(ret);
          },
          reject: function(error) {
            deferred.reject(error);
          }
        };
        jobQueue.add(evalJob);
        return deferred.promise;
      },
      evaluateAll: function(cells) {
        var self = this;
        var promises = _(cells).map(function(cell) {
          self.evaluate(cell);
        });
        return bkUtils.all(promises);
      },
      isCancellable: function() {
        var currentJob = jobQueue.getCurrentJob();
        return !!(currentJob && currentJob.evaluator && currentJob.evaluator.cancelExecution);
      },
      cancel: function() {
        var currentJob = jobQueue.getCurrentJob();

        if (currentJob && currentJob.evaluator) {
          if (currentJob.evaluator.cancelExecution) {
            currentJob.evaluator.cancelExecution();
          } else {
            throw "cancel is not supported for the current evaluator";
          }
        }
      },
      isAnyInProgress: function() {
        return !!jobQueue.getCurrentJob();
      },
      reset: function() {
        jobQueue.empty();
      }
    };
  });

})();
