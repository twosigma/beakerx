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
 * M_bkOutputDisplay
 * This module is the central control of all output displays. It fulfills actual angular directives
 * lazily when user load output display plugins.
 */
(function() {
  "use strict";
  var MAX_CAPACITY = 100;

  var module = angular.module('M_bkOutputDisplay', [

  ]);
  module.factory("outputDisplayService", function($injector) {
    var services = {};
    var factory = {
      getServices: function() {
        return services;
      },
      addService: function(key, impl) {
        if (typeof impl === "function") {
          services[key] = impl($injector);
        } else if (Object.prototype.toString.call(impl) === '[object Array]') {
          var args = [];
          for (var j = 0; j < impl.length; ++j) {
            var it = impl[j];
            if (typeof it === "string") {
              if (services.hasOwnProperty(it)) {
                args.push(services[it]);
              } else if ($injector.has(it)) {
                args.push($injector.get(it));
              }
              continue;
            }
            if (typeof it === "function") {
              services[key] = it.apply(this, args);
              break;
            }
          }
          ;
        } else {
          services[key] = impl;
        }
      },
      has: function(key) {
        return services.hasOwnProperty(key);
      },
      get: function(key) {
        return services[key];
      }
    };

    for (var key in beaker.toBeAddedToOutputDisplayService) {
      var impl = beaker.toBeAddedToOutputDisplayService[key];
      factory.addService(key, impl);
    }
    beaker.toBeAddedToOutputDisplayService = null;
    beaker.outputDisplayService = factory;
    return factory;
  });

  module.factory("outputDisplayFactory", function($rootScope) {

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
      "Warning": {
        template: "<pre class='out_warning'>{{model.getCellModel().message}}</pre>"
      },
      "Error": {
        template: "<pre class='out_error' ng-hide='expanded'>" +
            "<i class='fa fa-plus-square-o' ng-click='expanded=!expanded' ng-show='model.getCellModel()[1]'></i> " +
            "<span></span>" + // first span
            "</pre>" +
            "<pre class='out_error' ng-show='expanded'>" +
            "<i class='fa fa-minus-square-o' ng-click='expanded=!expanded'></i> " +
            "<span></span>" + // last span
            "</pre>",
        controller: function($scope, $element) {
          $scope.expanded = false;
          $scope.$watch('model.getCellModel()', function(cellModel) {
            if (_.isArray(cellModel)) {
              $element.find('span').first().html(cellModel[0]);
              $element.find('span').last().html(cellModel[1]);
            } else {
              $element.find('span').first().html(cellModel);
              $element.find('span').last().html("");
            }
          });
        }
      },
      "Html": {
        template: "<div></div>",
        controller: function($scope, bkCellPluginManager) {
          $scope.getShareMenuPlugin = function() {
            // the following cellType needs to match
            //plugin.cellType = "outputDisplayHtml"; in dynamically loaded outputDisplay_bkTableDisplay.js
            var cellType = "outputDisplayHtml";
            return bkCellPluginManager.getPlugin(cellType);
          };
          $scope.$watch("getShareMenuPlugin()", function(getShareMenu) {
            if (getShareMenu && $scope.model.resetShareMenuItems) {
              $scope.model.resetShareMenuItems(getShareMenu($scope));
            }
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
        }
      }
    };

    var types = ["Text", "Warning", "Error", "Html", "OutputContainer"];
    var refresh = function(what, scope) {
      if (!what) {
        what = "all";
      }
      if (!scope) {
        scope = $rootScope;
      }
      scope.$broadcast("outputDisplayFactory", what);
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
      "TableDisplay": ["Table", "Text"],
      "html": ["Html"],
      "ImageIcon": ["Image", "Text"],
      "BeakerDisplay": ["BeakerDisplay", "Text"],
      "Plot": ["Chart", "Text"],
      "TimePlot": ["Chart", "Text"],
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
        //console.log("getImpl", type);
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
        //console.log('getDirectiveName', type, "bko" + index);
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
              //ret.splice(0, 0, "JSON", "Vega");
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
  for (var i = 0; i < MAX_CAPACITY; ++i) {
    (function() {
      var ii = i;
      module.directive("bko" + ii, function(outputDisplayFactory, outputDisplayService, $injector) {
        var impl = outputDisplayFactory.get(ii);
        if (typeof impl === "function") {
          return impl(outputDisplayService, $injector);
        } else if (Object.prototype.toString.call(impl) === '[object Array]') {
          var args = [];
          for (var j = 0; j < impl.length; ++j) {
            var it = impl[j];
            if (typeof it === "string") {
              if (outputDisplayService.has(it)) {
                args.push(outputDisplayService.get(it));
              } else if ($injector.has(it)) {
                args.push($injector.get(it));
              } else {
                throw "beaker could not find provider for bkoFactory " + it;
              }
              continue;
            }
            if (typeof it === "function") {
              return it.apply(this, args);
            }
          }
          ;
        } else {
          return impl;
        }
      });
    })();
  }
  module.directive('bkOutputDisplay', function($compile, $rootScope, outputDisplayFactory) {
    return {
      restrict: "E",
      template: "<div>OUTPUT</div>",
      scope: {
        type: "@",
        model: "=" // assume ref to model doesn't change after directive is created
      },
      link: function(scope, element, attrs) {
        var childScope = null;
        var refresh = function(type) {
          if (childScope) {
            childScope.$destroy();
          }
          childScope = $rootScope.$new();
          childScope.model = scope.model;
          var directiveName = outputDisplayFactory.getDirectiveName(type);
          element.html("<div " + directiveName + " model='model'></div>");
          $compile(element.contents())(childScope);
        };
        scope.$watch("type", function(newType, oldType) {
          refresh(newType);
        });
        scope.$on("outputDisplayFactoryUpdated", function(event, what) {
          if (what === "all" || what === scope.type) {
            refresh(scope.type);
          }
        });
      }
    };
  });
})();
