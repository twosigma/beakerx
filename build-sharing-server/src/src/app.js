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
                                                      'ui.bootstrap',
        'bk.utils',
        'bk.outputDisplay',
        "bk.notebookCellModelManager"        
    ]);

    window.bkHelper = {
        getNotebookModel: function() {
          return window.notebookModel;
        },
        getBeakerObject: function() {
          return window.notebookModel.namespace;
        }
    };
    window.beaker = {};
    window.beaker.toBeAddedToOutputDisplayFactory = {};
    window.beaker.toBeAddedToOutputDisplayType = {};
    window.beaker.bkoDirective = function(type, impl) {
      if (window.beaker.outputDisplayFactory) {
        window.beaker.outputDisplayFactory.add(type, impl);
      } else {
        window.beaker.toBeAddedToOutputDisplayFactory[type] = impl;
      }
    };
    window.beaker.bkoFactory = function(name, list) {
        module.factory(name, list);
    };
    window.beaker.registerOutputDisplay = function(type, displays) {
      if (window.beaker.outputDisplayFactory) {
        window.beaker.outputDisplayFactory.addOutputDisplayType(type, displays);
      } else {
        window.beaker.toBeAddedToOutputDisplayType[type] = displays;
      }
    };
 
    module.factory("bkCellMenuPluginManager", function() {
        return {
            getPlugin: function() {

            },
            getMenuItems: function() {

            }
        };
    });

    module.factory('bkEvaluateJobManager', function() {
      return {
        isCancellable: function() { return false; }
      };
    });
    
    module.factory("notebookModel", function() {
        return window.notebookModel;
    });

    module.directive("bkNotebook", ["notebookModel", "bkNotebookCellModelManager", "$timeout",
        function(notebookModel, bkNotebookCellModelManager,$timeout) {
        return {
            restrict: 'E',
            template:
                    '<div class="bkcell">' +
                    '  <bk-cell ng-repeat="cell in getChildren()" cellmodel="cell"></bk-cell>' +
                    '</div>',
            scope: {},
            link: function(scope) {
              
              bkHelper.timeout = function (func, ms) {
                return $timeout(func, ms);
              };
              
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
                scope.isShowOutput = function() {
                  return !cellmodel.output.hidden;
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
            template: '<div class="textcell-wrapper" style="min-height: 14px; min-width: 14px;"></div>',
            link: function(scope, element, attrs) {
                element.find('div').html(scope.cellmodel.body);
            }
        };
    });

    var bkRenderer = new marked.Renderer();
    bkRenderer.link = function(href, title, text) {
      var prot;
      if (this.options.sanitize) {
        try {
          prot = decodeURIComponent(unescape(href))
          .replace(/[^\w:]/g, '')
          .toLowerCase();
        } catch (e) {
          return '';
        }
        //jshint ignore:start
        if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
          //jshint ignore:end
          return '';
        }
      };
      var out = '<a href="' + href + '"';
      if (title) {
        out += ' title="' + title + '"';
      }
      out += ' target="_blank"'; // < ADDED THIS LINE ONLY
      out += '>' + text + '</a>';
      return out;
    }

    bkRenderer.paragraph = function(text) {
      // Allow users to write \$ to escape $
      return marked.Renderer.prototype.paragraph.call(this, text.replace(/\\\$/g, '$'));
    };

    module.directive('bkMarkdownEditable', [function() {
      return {
        restrict: 'E',
        template: '<div class="markup"></div>',
        scope: {
          cellmodel: '='
        },
        link: function(scope, element, attrs) {
          var contentAttribute = scope.cellmodel.type === "section" ? 'title' : 'body';
          var doktex = function(markdownFragment) {
            try {
              renderMathInElement(markdownFragment[0], {
                delimiters: [
                  {left: "$$", right: "$$", display: true},
                  {left: "$", right:  "$", display: false},
                  {left: "\\[", right: "\\]", display: true},
                  {left: "\\(", right: "\\)", display: false}
                ]
              });
            } catch(err) {
            }
          }
          
          var preview = function() {
            var markdownFragment = $('<div>' + scope.cellmodel[contentAttribute] + '</div>');
            doktex(markdownFragment);
            element.find('.markup').html(marked(markdownFragment.html(), {gfm: true, renderer: bkRenderer}));
            markdownFragment.remove();
          };
          preview();
        }
        };
      }]);
    
    module.directive('bkMarkdownCell', function() {
        return {
            restrict: 'E',
            template: '<bk-markdown-editable cellmodel="cellmodel"></bk-markdown-editable>',
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
                var evalData =  {
                    "Html": { bgColor: "#E3502B", fgColor: "#FFFFFF", borderColor: "",        shortName: "Ht" },
                    "Latex": { bgColor: "#FFFFFF", fgColor: "#030303", borderColor: "#3D4444", shortName: "La" },
                    "JavaScript": { bgColor: "#EFDB52", fgColor: "#4A4A4A", borderColor: "",        shortName: "Js" },
                    "IPython": { bgColor: "#EEBD48", fgColor: "#FFFFFF", borderColor: "", shortName: "Py" },
                    "Python3": { bgColor: "#EEBD48", fgColor: "#FFFFFF", borderColor: "", shortName: "Py" },
                    "IRuby": { bgColor: "#AF1712", fgColor: "#FFFFFF", borderColor: "", shortName: "Rb" },
                    "Julia": { bgColor: "#6EAC5E", fgColor: "#FFFFFF", borderColor: "", shortName: "Jl" },
                    "Groovy": { bgColor: "#6497A9", fgColor: "#FFFFFF", borderColor: "", shortName: "Gv" },
                    "Java": { bgColor: "#EB0000", fgColor: "#FFFFFF", borderColor: "", shortName: "Jv" },
                    "R": { bgColor: "#8495BB", fgColor: "#FFFFFF", borderColor: "", shortName: "R" },
                    "Scala": { bgColor: "#B41703", fgColor: "#FFFFFF", borderColor: "", shortName: "Sc" },
                    "Clojure": { bgColor: "#5881d8", fgColor: "#FFFFFF", borderColor: "", shortName: "Cj" },
                    "Node": { bgColor: "#8EC453", fgColor: "#FFFFFF", borderColor: "", shortName: "N" },
                    "Kdb": { bgColor: "#005e99", fgColor: "#FFFFFF", borderColor: "", shortName: "K" }
                    };
                
                scope.isLocked = function() {
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
                scope.getEvaluator = function() {
                  return evalData[scope.cellmodel.evaluator];
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

    module.directive('bkLanguageLogo', function() {
      return {
        restrict: 'E',
        template: '<span ng-style="style">{{name}}</span>',
        scope: {
          name: '@',
          bgColor: '@',
          fgColor: '@',
          borderColor: '@'
        },
        link: function(scope, element, attrs) {
          scope.style = {
            'background-color': scope.bgColor,
            'color': scope.fgColor
          };
          var updateStyle = function() {
            scope.style = {
              'background-color': scope.bgColor,
              'color': scope.fgColor
            };
            if (scope.borderColor) {
              scope.style['border-width'] = '1px';
              scope.style['border-color'] = scope.borderColor;
              scope.style['border-style'] = 'solid';
            } else {
              delete scope.style['border-width'];
              delete scope.style['border-color'];
              delete scope.style['border-style'];
            }
          };
          scope.$watch('bgColor', updateStyle);
          scope.$watch('fgColor', updateStyle);
          scope.$watch('borderColor', updateStyle);
        }
      };
    });
    
    module.directive('bkCodeCellOutput', function() {
        return {
            restrict: "E",
            template: '<bk-output-display ng-show="isShowOutput()" model="outputDisplayModel" type="{{getOutputDisplayType()}}" show-separator="false"></bk-output-display>',
            link: function($scope, outputDisplayFactory) {
              
              $scope.getOutputResult = function() {
                if ($scope.cellmodel !== undefined)
                  return $scope.cellmodel.output.result;
                if ($scope.$parent.cellmodel)
                  return $scope.$parent.cellmodel.output.result;
              };

              var dummy = {};
              
              $scope.outputDisplayModel = {
                  getCellModel: function() {
                    var result = $scope.getOutputResult();
                    if (result && result.type === "BeakerDisplay") {
                      return result.object;
                    } else if (result && result.type === "UpdatableEvaluationResult") {
                        return result.payload;
                    } else {
                      return result;
                    }
                  },
                  isShowOutput: function() {
                    return $scope.$parent.isShowOutput();
                  },
                  getDumpState: function() {
                    return undefined;
                  },
                  setDumpState: function(s) {
                  },
                  resetShareMenuItems: function(newItems) {
                  },
                  getCometdUtil: function() {
                    return undefined;
                  },
                  getEvaluatorId: function() {
                    var id = $scope;
                    while (id !== undefined) {
                      if (id.evaluatorId !== undefined)
                        return id.evaluatorId;
                      id = id.$parent;
                    }
                    return undefined;
                  }
                };

                $scope.getOutputDisplayType = function() {
                  if ($scope.cellmodel === undefined)
                    return "Text";
                  var type = $scope.cellmodel.output.selectedType;
                  if (type === "BeakerDisplay") {
                    var result = $scope.cellmodel.output.result;
                    type = result ? result.innertype : "Hidden";
                  }
                  return type;
                };
               
                $scope.type = $scope.getOutputDisplayType();
                
                $scope.isShowOutput = function() {
                  if ($scope.$parent!== undefined && $scope.$parent.isShowOutput !== undefined)
                    return $scope.$parent.isShowOutput();
                };
              
            }
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
