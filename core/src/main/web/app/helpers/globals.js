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
 * Module bk.datatables
 */
(function() {
  'use strict';
  angular.module('bk.globals', []).factory('GLOBALS', function() {
    return {
      DEFAULT_EVALUATOR: 'JavaScript',
      REQUIREJS_TIMEOUT: 30,
      RECONNECT_TIMEOUT: 90000, // 90 seconds
      EVENTS: {
      	RECONNECT_FAILED: 'reconnect-failed',
        LANGUAGE_MANAGER_SHOW_SPINNER: 'language-manager-show-spinner',
        LANGUAGE_MANAGER_HIDE_SPINNER: 'language-manager-hide-spinner',
        CELL_OUTPUT_EXPANDED: 'cell-output-expanded'
      },
      FILE_LOCATION: {
        FILESYS: "file",
        HTTP: "http",
        AJAX: "ajax"
      }
    };
  });
})();
