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
    var module = angular.module('M_latexDisplay_static', []);
    module.directive('bkoLatex', ["$compile", function ($compile) {
        var generateID = function (length) {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };
        return {
            restrict: 'E',
            template: "<div id='aaa'>MATH_JAX_INLINE_BEGIN{{model}}MATH_JAX_INLINE_END<button ng-click='update()'>[debug] force update</button></div>",
            controller: ["$scope", function ($scope) {
                var model = $scope.model;
                $scope.$watch('model', function () {
                    $scope.update();
                });
            }],
            link: function (scope, element) {
                var id = "latex_" + generateID(6);
                scope.update = function () {
                    var div = element.find('div');
                    div.replaceWith($compile("<div id='" + id + "'>MATH_JAX_INLINE_BEGIN{{model}}MATH_JAX_INLINE_END</div>")(scope));
                    setTimeout(function () {
                        MathJax.Hub.Queue(["Typeset", MathJax.Hub, id]);
                    }, 100);
                };
            }
        };
    }]);
})();
