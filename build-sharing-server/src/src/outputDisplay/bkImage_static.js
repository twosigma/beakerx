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
(function () {
    var module = angular.module('M_bkImage_static', []);
    module.directive("bkoImage", function () {
        return {
            restrict: 'E',
            template: "<img />",
            link: function (scope, element, attrs) {
                var img = element.find("img").first();
                if (scope.model && scope.model.imageData) {
                    img.attr("src", "data:image/png;base64," +
                        scope.model.imageData);
                }
            }
        };
    });
})();
