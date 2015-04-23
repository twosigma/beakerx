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
 * This module is the central control of all output displays. It fulfills actual angular directives
 * lazily when user load output display plugins.
 */
(function() {
  "use strict";
  var MAX_CAPACITY = 100;

  var module = angular.module('bk.outputDisplay');

  module.factory("bkOutputDisplayFactory", function($rootScope, $sce) {

    var impls = {
        "Text": {
          template: "<pre>{{getText()}}</pre>",
          controller: function($scope) {
            $scope.getText = function() {
              var model = $scope.model.getCellModel();
              return (model && model.text) ? model.text : model;
            };
          }
        },
        "Date": {
          template: "<pre>{{getDate()}}</pre>",
          controller: function($scope) {
            $scope.getDate = function() {
              var model = $scope.model.getCellModel();
              if (model && model.timestamp) {
                var m = moment.utc(model.timestamp);
                m.local();
                return m.format("YYYYMMDD HH:mm:ss.SSS ZZ");
              }
              return model;
            };
          }
        },
      "Warning": {
        template: "<div class='outline warning'></div> <pre class='out_warning'>{{model.getCellModel().message}}</pre>"
      },
      "Error": {
        template: "<pre class='out_error'>" +
            "<span ng-show='canExpand' class='toggle-error' ng-click='expanded = !expanded'>{{expanded ? '-' : '+'}}</span>" +
            "<span ng-bind-html='shortError'></span></pre>" +
            "<pre ng-show='expanded'><span ng-bind-html='longError'></span>" +
            "</pre>",
        controller: function($scope, $element) {
          $scope.expanded = false;

          $scope.$watch('model.getCellModel()', function(cellModel) {
            var outputs = $element.find('span');
            var errors  = Array.prototype.concat(cellModel);

            $scope.shortError   = $sce.trustAsHtml(errors[0]);
            $scope.canExpand    = errors.length > 1;
            $scope.longError    = $sce.trustAsHtml(errors.slice(1).join("\n"));
          });
        }
      },
      "Html": {
        template: "<div></div>",
        controller: function($scope, bkCellMenuPluginManager) {
          $scope.getShareMenuPlugin = function() {
            return bkCellMenuPluginManager.getPlugin("bko-html");
          };
          $scope.$watch("getShareMenuPlugin()", function() {
            var newItems = bkCellMenuPluginManager.getMenuItems("bko-html", $scope);
            $scope.model.resetShareMenuItems(newItems);
          });
        },
        link: function(scope, element, attrs) {
          var div = element.find("div").first();
          var cellModel = scope.model.getCellModel();
          div.html(cellModel);
          scope.$watch('model.getCellModel()', function(newValue, oldValue) {
            if (newValue !== oldValue) {
              div.html(newValue);
            }
          });
        }
      },
      "OutputContainer": {
        template: '<bk-code-cell-output ng-repeat="i in items" model="i" >' +
            '</ bk-code-cell-output>',
        scope: {
          model: "="
        },
        controller: function($scope) {
          $scope.items = _($scope.model.getCellModel().items).map(function(it) {
            return {
              result: it
            };
          });
          $scope.isShowMenu = function() { return false; };
        }
      }
    };

    var types = ["Text", "Date", "BeakerStandardOutput", "BeakerStandardError", "Warning", "Error", "Html", "OutputContainer"];
    var refresh = function(what, scope) {
      if (!what) {
        what = "all";
      }
      if (!scope) {
        scope = $rootScope;
      }
      scope.$broadcast("bkOutputDisplayFactory", what);
      scope.$$phase || scope.$apply();
    };
    var setImpl = function(index, type, impl) {
      types[index] = type;
      impls[type] = impl;
      refresh(type);
    };
    var resultType2DisplayTypesMap = {
      // The first in the array will be used as default
      "text": ["Text", "Html", "Latex"],
      "Date": ["Date", "Text"],
      "TableDisplay": ["Table", "Text"],
      "html": ["Html"],
      "ImageIcon": ["Image", "Text"],
      "BeakerDisplay": ["BeakerDisplay", "Text"],
      "Plot": ["Plot", "Chart", "Text"],
      "TimePlot": ["Plot", "Chart", "Text"],
      "NanoPlot": ["Plot", "Text"],
      "CombinedPlot": ["CombinedPlot", "Text"],
      "HiddenOutputCell": ["Hidden"],
      "Warning": ["Warning"],
      "BeakerOutputContainerDisplay": ["OutputContainer", "Text"],
      "OutputContainerCell": ["OutputContainer", "Text"],
      "OutputContainer": ["OutputContainer", "Text"]
    };
    var factory = {
      add: function(type, impl) {
        if (types.length > MAX_CAPACITY) {
          throw "Cannot add output: " + type +
              ", max output display capacity(" + MAX_CAPACITY +
              ") reached";
        }
        // add to the end
        setImpl(types.length, type, impl);
      },
      get: function(index) {
        var type = types[index];
        return this.getImpl(type);
      },
      getImpl: function(type) {
        if (type && impls[type]) {
          return impls[type];
        } else {
          return impls["text"];
        }
      },
      getDirectiveName: function(type) {
        var index = types.indexOf(type);
        if (index === -1) {
          index = types.indexOf("Text");
        }
        return "bko" + index;
      },
      addOutputDisplayType: function(type, displays, index) {
        if (index === undefined) {
          index = 0;
        }
        if (!resultType2DisplayTypesMap[type]) {
          resultType2DisplayTypesMap[type] = displays;
        } else {
          Array.prototype.splice.apply(resultType2DisplayTypesMap[type], [index, 0].concat(displays));
        }
      },
      getApplicableDisplays: (function() {
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
          return /^<[a-z][\s\S]*>/i.test(value);
        };
        return function(result) {
          if (!result) {
            return ["Hidden"];
          }
          if (!result.type) {
            var ret = ["Text", "Html", "Latex"];
            if (isJSON(result)) {
              ret.push("Json", "Vega");
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
        };
      })()
    };
    beaker.outputDisplayFactory = factory;
    for (var key in beaker.toBeAddedToOutputDisplayFactory) {
      beaker.outputDisplayFactory.add(key, beaker.toBeAddedToOutputDisplayFactory[key]);
    }
    beaker.toBeAddedToOutputDisplayFactory = null;

    for (var key in beaker.toBeAddedToOutputDisplayType) {
      var displays = beaker.toBeAddedToOutputDisplayType[key];
      factory.addOutputDisplayType(key, displays);
    }
    beaker.toBeAddedToOutputDisplayType = null;

    return factory;
  });

  _(_.range(MAX_CAPACITY)).each(function(i) {
    module.directive("bko" + i,
        function(bkOutputDisplayFactory, bkOutputDisplayServiceManager, $injector) {
      var impl = bkOutputDisplayFactory.get(i);
      if (_.isFunction(impl)) {
        return impl(bkOutputDisplayServiceManager, $injector);
      } else if (_.isArray(impl)) {
        var args = [];
          for (var j = 0; j < impl.length; ++j) {
            var it = impl[j];
            if (_.isString(it)) {
              if (bkOutputDisplayServiceManager.has(it)) {
                args.push(bkOutputDisplayServiceManager.get(it));
              } else if ($injector.has(it)) {
                args.push($injector.get(it));
              } else {
                throw "beaker could not find provider for bkoFactory " + it;
              }
            } else if (_.isFunction(it)) {
              return it.apply(this, args);
            }
          }
      } else {
        return impl;
      }
    });
  })
})();
