/*
 *  Copyright 2014 TWO SIGMA INVESTMENTS, LLC
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

;(function(app) {
  var module = angular.module('bk.bunsen');

  module.service('bkWindowMessageService', [
    '$window',
    '$location',
    'bkHelper',
    function(
      $window,
      $location,
      bkHelper
    )
  {
    function receiveWindowMessage(e) {
      if (new URL(event.origin).hostname !== $location.host()) {
        throw "message received from unauthorized host " + event.origin.host;
      }

      switch (e.data.action) {
        case 'save':
          bkBunsenHelper.saveNotebook(e.data.name);
          break;
        case 'showStdoutStderr':
          bkHelper.getBkNotebookViewModel().showOutput();
          break;
      }
    }

    $window.addEventListener('message', receiveWindowMessage, false);

    // no public API
    return {};
  }]);
})(window.bunsen);
