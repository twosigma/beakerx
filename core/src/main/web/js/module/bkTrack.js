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
                    log: function (event, obj) {
                        // log to ga
                        if (ga && event === "open") {
                            var notebookType = obj.uri ? obj.uri.substring(0, obj.uri.indexOf(':/')) || "file" : "file";
                            ga("send", "event", "file", "open", notebookType, {
                                "dimension2": notebookType,
                                "metric3": 1
                            });
                        } else if (ga && event === "evaluate") {
                            var pluginName = obj.plugin;
                            ga("send", "event", "notebook", "evaluate", pluginName, {
                                "dimension3": pluginName,
                                "metric7": 1,
                                "metric4": 2
                            });
                        }
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
