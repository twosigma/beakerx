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
 * Module bk.outputLog
 * This module owns the service of get output log from the server.
 */
(function() {
  'use strict';
  var module = angular.module('bk.outputLog', ['bk.utils', 'bk.cometdUtils']);
  module.factory('bkOutputLog', function (bkUtils, cometdUtils) {
    return {
      getLog: function (cb) {
        bkUtils.httpGet(bkUtils.serverUrl("beaker/rest/outputlog/get"), {})
            .success(cb)
            .error(function () {
              console.log("failed to get output log");
            });
      },
      subscribe: function (cb) {
        return cometdUtils.addOutputlogUpdateListener(cb);
      }
    };
  });
})();
