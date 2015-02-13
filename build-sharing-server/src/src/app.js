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

(function() {
    'use strict';

    angular.module('bk.cometdUtils', [])
            .factory("cometdUtils", function() {
                return {
                    addConnectedStatusListener: function(cb) {
                    },
                    removeConnectedStatusListener: function() {
                    },
                    addOutputlogUpdateListener: function(cb) {
                    }
                };
            });
    angular.module('bk.track', [])
            .factory("bkTrack", function() {
                return {
                    log: function() {
                    }
                };
            });

    var module = angular.module('bk.notebook.share', [
        'bk.utils',
        "bk.notebookCellModelManager",
        "M_bkTable_static",
        "M_bkChart_static",
        "M_bkImage_static",
        "M_latexDisplay_static"
    ]);

    window.beaker = {};
    window.beaker.bkoDirective = function(name, list) {
        module.directive("bko" + name, list);
    };
    window.beaker.bkoFactory = function(name, list) {
        module.factory(name, list);
    };
    module.factory("bkCellMenuPluginManager", function() {
        return {
            getPlugin: function() {

            },
            getMenuItems: function() {

            }
        };
    });

    module.factory("notebookModel", function() {
        return window.notebookModel;
    });

    module.directive("bkNotebook", ["notebookModel", "bkNotebookCellModelManager",
        function(notebookModel, bkNotebookCellModelManager) {
        return {
            restrict: 'E',
            template:
                    '<div class="bkcell">' +
                    '  <bk-cell ng-repeat="cell in getChildren()" cellmodel="cell"></bk-cell>' +
                    '</div>',
            scope: {},
            link: function(scope) {
                window.bkNotebookCellModelManager = bkNotebookCellModelManager; // for debug only
                window.notebookModel = notebookModel; // for debug only
                bkNotebookCellModelManager.reset(notebookModel.cells);
                scope.getChildren = function() {
                    return bkNotebookCellModelManager.getChildren("root");
                };
            }
        };
    }]);

    module.directive("bkCell", function() {
        return {
            restrict: 'E',
            templateUrl: 'cell.html',
            scope: {
                cellmodel: "="
            },
            link: function(scope) {
                scope.getTypeCellUrl = function() {
                    var type = scope.cellmodel.type;
                    return type + "-cell.html";
                };
                scope.isLocked = function() {
                    return notebookModel.locked;
                };
            }
        };
    });

    module.directive("bkSectionCell", ["bkNotebookCellModelManager",
        function(bkNotebookCellModelManager) {
        return {
            restrict: 'E',
            templateUrl: 'sectioncell.html',
            link: function(scope) {
                scope.toggleShowChildren = function() {
                    if (scope.cellmodel.collapsed === undefined) {
                        scope.cellmodel.collapsed = false;
                    }
                    scope.cellmodel.collapsed = !scope.cellmodel.collapsed;
                };
                scope.isShowChildren = function() {
                    if (scope.cellmodel.collapsed === undefined) {
                        scope.cellmodel.collapsed = false;
                    }
                    return !scope.cellmodel.collapsed;
                };
                scope.getChildren = function() {
                    return bkNotebookCellModelManager.getChildren(scope.cellmodel.id);
                };
            }
        };
    }]);

    module.directive('bkTextCell', function() {
        return {
            restrict: 'E',
            template: "<div></div>",
            link: function(scope, element, attrs) {
                element.find('div').html(scope.cellmodel.body);
            }
        };
    });

    module.directive('bkMarkdownCell', function() {
        return {
            restrict: 'E',
            template: "<div></div>",
            link: function(scope, element, attrs) {
                // always overwrite mode to "preview" for "Read-Only"
                scope.cellmodel.mode = "preview";

                var div = element.find("div").first().get()[0];
                var options = {
                    basePath: 'vendor/epiceditor',
                    container: div,
		    theme: {
			editor: '../../../src/css/markdown-edit.css',
			preview: '../../../src/css/markdown-preview.css'  
		    },
                    file: {
                        defaultContent: scope.cellmodel.body
                    },
                    clientSideStorage: false,
                    button: false,
                    autogrow: {
                        minHeight: 50,
                        maxHeight: false,
                        scroll: true
                    }
                };
                var editor = new EpicEditor(options).load();
                setTimeout(function() {
                    editor.preview();
                }, 1000);
            }
        };
    });

    module.directive('bkCodeCell', ["notebookModel", function(notebookModel) {
        return {
            restrict: 'E',
            templateUrl: 'codecell.html',
            scope: {
                cellmodel: "=",
                cellmenu: "="
            },
            link: function(scope, element, attrs) {
                var isLocked = function() {
                    return notebookModel.locked;
                };
                scope.isShowInput = function() {
                    if (isLocked()) {
                        return false;
                    }
                    if (scope.cellmodel.input.hidden === true) {
                        return false;
                    }
                    return true;
                };
                scope.hasOutput = function() {
                    return scope.cellmodel.output.result;
                };
                scope.isShowOutput = function() {
                    if (scope.cellmodel.output.hidden === true) {
                        return false;
                    }
                    var result = scope.cellmodel.output.result;
                    if (result && result.hidden === true) {
                        return false;
                    }
                    return !(result === undefined || result === null);
                };

                var evaluator = _(notebookModel.evaluators).find(function(evaluator) {
                    return evaluator.name === scope.cellmodel.evaluator;
                });
                var cm = CodeMirror.fromTextArea(element.find("textarea")[0], {
                    mode: evaluator.view.cm.mode,
                    lineNumbers: true,
                    matchBrackets: true,
                    onKeyEvent: function(cm, e) {
                    },
                    extraKeys: {},
                    readOnly: true
                });
                cm.setValue(scope.cellmodel.input.body);
            }
        };
    }]);

    module.directive('bkCodeCellOutput', function() {
        return {
            restrict: "E",
            template: '<bk-output-display ng-show="isShowOutput()" model="getOutputDisplayModel()" type="getOutputDisplayType()" show-separator="false"></bk-output-display>',
            link: function($scope, outputDisplayFactory) {
                $scope.getOutputDisplayType = function() {
                    var display = $scope.cellmodel.output.selectedType;
                    if (!display) {
                        display = outputDisplayFactory.getApplicableDisplays($scope.cellmodel.output.result)[0];
                    }
                    if (display === "BeakerDisplay") {
                        return $scope.cellmodel.output.result.innertype;
                    } else {
                        return display;
                    }
                };
                var dummyPlotModel = {
                    getCellModel: function() {
                        return $scope.cellmodel.output.result;
                    },
                    resetShareMenuItems: function() {

                    }
                };
		$scope.isShowOutput = function() {
		    return $scope.$parent.isShowOutput();
		};
                $scope.getOutputDisplayModel = function() {
                    var display = $scope.cellmodel.output.selectedType;
                    if (!display) {
                        display = outputDisplayFactory.getApplicableDisplays($scope.cellmodel.output.result)[0];
                    }
                    if (display === "BeakerDisplay") {
                        return $scope.cellmodel.output.result.object;
                    } else if (display === "Plot" || display === "CombinedPlot") {
                        return dummyPlotModel;
                    } else {
                        return $scope.cellmodel.output.result;
                    }
                };
            }
        };
    });

    module.directive('bkOutputDisplay', function() {
        return {
            restrict: 'E',
            scope: {
                type: "=", // optional
                model: "=",
                showSeparator: "@"
            },
            template: '<hr ng-if="showSeparator" /><div ng-include="getType()"></div>',
            controller: ["$scope", "outputDisplayFactory", function($scope, outputDisplayFactory) {
                var getDefaultType = function(model) {
                    var display = outputDisplayFactory.getApplicableDisplays(model)[0];
                    if (display === "BeakerDisplay") {
                        if (model) {
                            return "bko" + model.innertype + ".html";
                        } else {
                            return "bkoHidden.html";
                        }
                    } else {
                        return "bko" + display + ".html";
                    }
                };
                $scope.getType = function() {
                    if ($scope.type) {
                        return "bko" + $scope.type + ".html";
                    } else if ($scope.model.getCellModel && $scope.model.getCellModel().type === "plot") {
                        return "bkoPlot.html";
                    } else {
                        return getDefaultType($scope.model);
                    }
                };
            }]
        };
    });

    module.factory('outputDisplayFactory', function() {
        var resultType2DisplayTypesMap = {
            // The first in the array will be used as default
            "text": ["Text", "Html", "Latex"],
            "TableDisplay": ["Table", "Text"],
            "html": ["Html"],
            "ImageIcon": ["Image", "Text"],
            "BeakerDisplay": ["BeakerDisplay", "Text"],
            "Plot": ["Chart", "Text"],
            "TimePlot": ["Chart", "Text"],
            "HiddenOutputCell": ["Hidden"],
            "Warning": ["Warning"],
            "BeakerOutputContainerDisplay": ["OutputContainer", "Text"],
            "OutputContainerCell": ["OutputContainer", "Text"]
        };

        var isJSON = function(value) {
            var ret = true;
            try {
                JSON.parse(value);
            } catch (err) {
                ret = false;
            }
            return ret;
        };

        var isHTML = function(value) {
            return /<[a-z][\s\S]*>/i.test(value);
        };

        // TODO: think how to dynamically add more display types
        return {
            getApplicableDisplays: function(result) {
                if (!result) {
                    return ["Text"];
                }
                if (!result.type) {
                    var ret = ["Text", "Html", "Latex"];
                    if (isJSON(result)) {
                        //ret.splice(0, 0, "JSON", "Vega");
                        ret.push("JSON", "Vega");
                    }
                    if (isHTML(result)) {
                        ret = ["Html", "Text", "Latex"];
                    }
                    if (_.isArray(result)) {
                        if (_.isObject(result[0])) {
                            ret.push("Table");
                        }
                    }
                    return ret;
                }
                if (resultType2DisplayTypesMap.hasOwnProperty(result.type)) {
                    return resultType2DisplayTypesMap[result.type];
                } else {
                    return ["Text"];
                }
            }
        };
    });

    module.directive('bkoText', function() {
        return {
            restrict: "E",
            template: "<pre>{{getText()}}</pre>",
            controller: ["$scope", function($scope) {
                $scope.getText = function() {
                    if ($scope.model && $scope.model.text) {
                        return $scope.model.text;
                    } else {
                        return $scope.model;
                    }
                };
            }]
        };
    });

    module.directive('bkoWarning', function() {
        return {
            restrict: "E",
            template: "<pre class='out_warning'>{{model.message}}</pre>"
        };
    });

    module.directive('bkoError', function() {
        return {
            restrict: "E",
            template: "<div class='outline error'></div><pre class='out_error'>" +
            "<span ng-show='canExpand' class='toggle-error' ng-click='expanded = !expanded'>{{expanded ? '-' : '+'}}</span>" +
            "<span></span></pre>" +
            "<pre ng-show='expanded'><span></span>" +
            "</pre>",
            controller: ["$scope", "$element", function($scope, $element) {
                $scope.expanded = false;
                $scope.canExpand = _.isArray($scope.model);
                $scope.$watch('model', function() {
                    if ($scope.canExpand) {
                        $($element.find('span')[1]).html($scope.model[0]);
                        $element.find('span').last().html($scope.model[1]);
                    } else {
                        $($element.find('span')[1]).html($scope.model);
                        $element.find('span').last().html("");
                    }
                });
            }]
        };
    });

    module.directive('bkoHtml', function() {
        return {
            restrict: "E",
            template: "<div></div>",
            link: function(scope, element, attrs) {
              var div = element.find("div").first();
              div.html(scope.model);
	      div.on('click', 'a', function(e) {
		var target = $(this).attr('href');
		var i = target.indexOf('http');
		if(target.indexOf('http') !== 0 && target.indexOf('ftp') !== 0) {
		  e.preventDefault();
		}
	      });
            }
        };
    });

    module.directive('bkoOutputContainer', function() {
        return {
            restrict: 'E',
            template: '<bk-output-display ng-repeat="m in model.items" model="m" show-separator="{{ $index != 0}}"></bk-output-display>'
        };
    });

    module.controller('navBarCtrl', ["$scope", function($scope) {
        $scope.download = function() {
            function cleanup(key, value) {
                if (key === '$$hashKey')
                    return undefined;
                return value;
            }

            var data = JSON.stringify(window.notebookModel, cleanup, 4) + "\n";
            var filename = "notebook_" + _(window.location.pathname.split('/')).last() + ".bkr";
            var blob = new Blob([data], {type: 'text/json'});
            var e = document.createEvent('MouseEvents');
            var a = document.createElement('a');
            a.download = filename;
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
            e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
        };
      var gistUrl = window.location.pathname.replace("/gist", "https://gist.github.com");
      $scope.isGist = _.string.startsWith(window.location.pathname, "/gist");
      $scope.openGist = function() {
        window.open(gistUrl);
      };
    }]);
})();
