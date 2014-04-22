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
 * M_bkOutputLog
 * This module owns the service of get output log from the server.
 */
(function() {
  'use strict';
  angular.module('M_bkOutputLog', [])
      .factory('bkOutputLog', function() {
        var getLog = function(cb) {
          var req = $.ajax({
            type: "GET",
            datatype: "json",
            url: "/beaker/rest/outputlog/get",
            data: {}
          });
          req.done(cb);
          req.error(function() {
            console.log("failed to get output log");
          });
        };
        return {getLog: getLog};
      });
})();
