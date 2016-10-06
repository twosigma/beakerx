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
  "use strict";
  var module = angular.module('bk.outputDisplay');
  module.directive('bkOutputDisplay', function($compile, bkOutputDisplayFactory, bkUtils, bkNotificationService) {
    var getResultType = function(model) {
      if (model && model.getCellModel()) {
        if (_.isString(model.getCellModel())) {
          return "String";
        } else {
          return model.getCellModel().type;
        }
      }
    };
    return {
      restrict: "E",
      template: "<div>OUTPUT</div>",
      scope: {
        type: "@",
        model: "=" // assume ref to model doesn't change after directive is created
      },
      controllerAs: 'outputDisplayCtrl',
      controller: function ($scope) {

        var evaluationCompleteNotificationMethods = [];
        
        this.initAvailableNotificationMethods = function () {
          evaluationCompleteNotificationMethods = bkNotificationService.initAvailableNotificationMethods();
        };
        
        this.getAvailableNotificationMethods = function () {
          return evaluationCompleteNotificationMethods;
        };
        this.toggleNotifyWhenDone = function (notificationMethod) {
          notificationMethod.selected = !notificationMethod.selected;
          if(notificationMethod.selected && notificationMethod.checkPermissions) {
            notificationMethod.checkPermissions();
          }
        };
        this.isNotifyWhenDone = function (notificationMethod) {
          return notificationMethod.selected;
        };

        $scope.model.getOutputSummary = function () {
          var result = $scope.model.getCellModel();
          var type = $scope.type;

          function getItemsText(itemTitle, items) {
            return items + ' ' + (items > 1 ? itemTitle + 's' : itemTitle);
          }

          function strip(html) {
            var div = document.createElement('div');
            div.innerHTML = html;
            var scripts = div.getElementsByTagName('script');
            var i = scripts.length;
            while (i--) {
              scripts[i].parentNode.removeChild(scripts[i]);
            }
            return div.textContent || div.innerText || "";
          }

          function firstString(str) {
            if (str) {
              var arr = str.split('\n');
              for (var i = 0; i < arr.length; i++) {
                if (arr[i].length > 0)
                  return arr[i]
              }
            }
            return '';
          }

          function firstNChars(str, count) {
            if (str) {
              if (str.length > count){
                str = str.substr(0, count);
              }
              return str.replace(/\n/g, "");
            }
            return '';
          }

          function getOutputSummary(type, result) {
            type = type || 'Text';
            switch (type) {
              case 'CombinedPlot':
                if (result.plots && result.plots.length > 0) {
                  return result.plots.length + ' plots';
                }
                break;
              case 'Plot':
                if (result.graphics_list && result.graphics_list.length > 0) {
                  var items = result.graphics_list.length;
                  return 'a plot with ' + getItemsText('item', items);
                }
                break;
              case 'OutputContainer':
                if(result.items) {
                  return 'Container with ' + getItemsText('item', result.items.length);
                }
                break;
              case 'Table':
              case 'TableDisplay':
                var names = result.columnNames.join(", ");
                return 'a table with ' + result.values.length + ' rows and ' + result.columnNames.length + ' columns (' + names + ')';
              case 'Results':
                var out = 0, err = 0;
                if (result.outputdata && result.outputdata.length > 0) {
                  _.forEach(result.outputdata, function (outputLine) {
                    if (outputLine.type === 'err') {
                      err++;
                    } else {
                      out++;
                    }
                  })
                }
                var summary = [];
                var getLinesSummary = function (num, s) {
                  return num + ' ' + (num > 1 ? 'lines' : 'line') + ' of ' + s;
                };
                if (out > 0) {
                  summary.push(getLinesSummary(out, 'stdout'));
                }
                if (err > 0) {
                  summary.push(getLinesSummary(err, 'stderr'));
                }
                if(result.payload) {
                  summary.push(getOutputSummary(result.payload.type, result.payload));
                }
                return summary.join(', ');
                break;
              case 'Progress':
                return null;
                break;
              case 'Text':
                return firstString((typeof result === 'string') ? result : JSON.stringify(result));
              case 'Html':
                return firstNChars(strip(result), 1000);
            }
            return type;
          }
          return result !== undefined && getOutputSummary(result.innertype || type, result);
        };
      },
      link: function(scope, element, attr, ctrl) {
        var childScope = null;
        var refresh = function(type) {
          if (childScope) {
            childScope.$destroy();
          }
          childScope = scope.$new();
          childScope.model = scope.model;
          var lodT = (bkHelper.getBkNotebookViewModel() === undefined || bkHelper.getBkNotebookViewModel().getLodThreshold() === "") ? 5000 : bkHelper.getBkNotebookViewModel().getLodThreshold();
          childScope.prefs = {
              lodThreshold : lodT
          };
          var resultType = getResultType(scope.model);
          if (resultType) {
            bkUtils.log("outputDisplay", {
              resultType: resultType,
              displayType: type
            });
          }
          var directiveName = bkOutputDisplayFactory.getDirectiveName(type);
          element.html("<div class='output-padding'" + directiveName + " model='model'></div>");
          $compile(element.contents())(childScope);
        };
        scope.$watch("type", function(newType, oldType) {
          if(evaluationFinished(oldType)) {
            _.filter(ctrl.getAvailableNotificationMethods(), 'selected').forEach(function (notificationMethod) {
              notificationMethod.action.call(notificationMethod, 'Evaluation completed',
                scope.model.getOutputSummary() || 'no output', 'beakerCellEvaluationDone')
            })
          }

          refresh(newType);
        });
        scope.$on("outputDisplayFactoryUpdated", function(event, what) {
          if (what === "all" || what === scope.type) {
            refresh(scope.type);
          }
        });
        scope.$on("$destroy", function () {
          if (childScope) {
            childScope.$destroy();
          }
        });

        function evaluationFinished(oldType) {
          return oldType === 'Progress';
        }
      }
    };
  });
})();
