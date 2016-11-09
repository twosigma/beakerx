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
 * Module bk.delayManager
 */
(function() {
  'use strict';
  var module = angular.module('bk.delayManager', []);

  module.factory('bkDelayManager', function(
    $timeout
  ) {

    var queue = {},
      defaultDelayMs = 500;

    return {
      create: create
    };

    // ------

    /***
     * Create delay instance in queue
     * @param {string} name
     * @param {function} cb
     * @param {number} delayMs
     * @returns {*} $timeout promise
     */
    function create(name, cb, delayMs) {
      if (name === undefined || typeof name !== 'string') {
        console.warn('DelayManager: name is required');
        return false;
      }

      delayMs = delayMs === undefined ? defaultDelayMs : delayMs;

      _clear(name);

      var timer = $timeout(function() {
        cb();
        _remove(name);
      }, delayMs);

      queue[name] = timer;

      return timer;
    }

    // ------

    function _clear(name) {
      if (queue[name]) {
        $timeout.cancel(queue[name]);
      }
    }

    function _remove(name) {
        delete queue[name];
    }

  });

})();
