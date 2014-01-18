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
/**
 * M_bkTrack
 * This module owns the service that can be configured to 3rd party provided usage metric logging services.
 */
(function () {
    'use strict';
    var module = angular.module('M_bkTrack', []);

    module.provider('trackingService', function () {
        var _trackingService = null;
        this.config = function (trackingService) {
            _trackingService = trackingService;
        };
        this.$get = function () {
            if (!_trackingService) {
                return {
                    log: function () {
                        // do nothing
                    }
                };
            }
            return {
                log: function (event, object) {
                    _trackingService.log(event, object);
                }
            };
        };
    });
})();
