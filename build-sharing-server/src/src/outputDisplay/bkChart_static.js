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
    var module = angular.module('M_bkChart_static', []);
    module.directive("bkoChart", function () {
        return {
            restrict: 'E',
            template: "<div class='tschartcontainer'></div>",
            controller: ["$scope", "flotr2ViewUtils", function ($scope, flotr2ViewUtils) {
                $scope.options = {
                    title: $scope.model.chart_title,
                    selection: {mode: 'xy', fps: 30},
                    xaxis: {
                        title: $scope.model.domain_axis_label,
                        mode: ($scope.model.type === "TimePlot") ? "time" : "normal"
                    },
                    yaxis: {
                        title: $scope.model.y_label,
                        scaling: $scope.model.rangeAxes[0]["use_log"] ? "logarithmic" : "linear"
                    },
                    shadowSize: 0
                };
                if ($scope.model.type === "TimePlot") {
                    $scope.options.mouse = {
                        track: true,
                        relative: true,
                        trackFormatter: function (o) {
                            var n = parseFloat(o.x);
                            var d = new Date(n);
                            return "(" + d.toDateString() + "," + o.y + ")";
                        }
                    };
                } else {
                    $scope.options.mouse = {
                        track: true,
                        relative: true
                    };
                }

                $scope.data = _.map($scope.model.graphics_list, function (g) {
                    return flotr2ViewUtils.fromGraphicsToData(g);
                });

                $scope.$watch('model', function () {
                    if ($scope.model) {
                        $scope.data = _.map($scope.model.graphics_list, function (g) {
                            return flotr2ViewUtils.fromGraphicsToData(g);
                        });
                    }
                }, true);

                $scope.$watch('data', function () {
                    $scope.draw();
                });
            }],
            link: function (scope, element, attrs) {
                var container = $(element).parent().find(".tschartcontainer")[0];
                scope.draw = function () {
                    var options = _.extend({}, scope.options, scope.zoomOptions);
                    Flotr.draw(container, scope.data, options);
                };

                var zoomMove = function (area) {
                    if (area.xfirst < area.xsecond && area.yfirst > area.ysecond) {
                        scope.zoomOptions = {
                            xaxis: {min: area.x1, max: area.x2},
                            yaxis: {min: area.y1, max: area.y2}
                        };
                    } else {
                        scope.zoomOptions = {};
                    }
                    scope.draw();
                };
                Flotr.EventAdapter.observe(container, 'flotr:select', zoomMove);
            }
        };
    });
    module.factory('flotr2ViewUtils', function () {
        return {
            argbToRgb: function (color) {
                if (typeof color === "string" && color.length === 9) {
                    color = "#" + color.substr(3);
                }
                return color;
            },
            fromGraphicsToData: function (g) {
                var gData = {
                    label: g.display_name,
                    color: this.argbToRgb(g.color)
                };
                if (g.type === "Line") {
                    gData.data = _.zip(g.x, g.y);
                    gData.lines = {show: true};
                } else if (g.type === "Points") {
                    gData.data = g.sizes ? _.zip(g.x, g.y, g.sizes) : _.zip(g.x, g.y);
                    if (g.sizes) {
                        gData.bubbles = {show: true, baseRadius: 0.5};
                    } else {
                        gData.points = {show: true, shadowSize: 0};
                    }
                } else if (g.type === "Bars") {
                    gData.data = _.zip(g.x, g.y);
                    gData.bars = {
                        show: true,
                        horizontal: false,
                        shadowSize: 0,
                        barWidth: 0.5
                    };
                }
                return gData;
            }
        };
    });
})();
