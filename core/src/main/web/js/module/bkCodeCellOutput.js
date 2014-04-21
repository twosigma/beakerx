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
 * M_bkCodeCellOutput
 * This module is the abstract container for types of output displays. While we plan to make the output display loading
 * mechanism more pluggable, right now, this module serves as the registration output display types and holds the logic
 * for switch between applicable output display through UI.
 */
(function() {
  'use strict';
  var module = angular.module('M_bkCodeCellOutput', [
    'M_generalUtils',
    'M_bkOutputDisplay'
  ]);

  module.directive('bkCodeCellOutput', function(
      generalUtils, outputDisplayFactory, evaluatorManager) {
    return {
      restrict: "E",
      template: '<div class="bkcell"><bk-output-display ' +
          '   model="outputDisplayModel" ' +
          '   type="{{ getOutputDisplayType() }}" >' +
          '</bk-output-display>' +
          "<bk-code-cell-output-menu" +
          '   model="outputCellMenuModel" ' +
          "</bk-code-cell-output-menu></div>",
      scope: {
        model: "=",
        evaluatorId: "@"
      },
      controller: function($scope) {
        var _shareMenuItems = [];

        $scope.getOutputResult = function() {
          return $scope.model.result;
        };
        $scope.applicableDisplays = [];
        $scope.$watch('getOutputResult()', function(result) {
          $scope.applicableDisplays = outputDisplayFactory.getApplicableDisplays(result);
          $scope.model.selectedType = $scope.applicableDisplays[0];
        });

        // to be used in bkOutputDisplay
        $scope.outputDisplayModel = {
          getCellModel: function() {
            var result = $scope.getOutputResult();
            if (result && result.type === "BeakerDisplay") {
              return result.object;
            } else {
              return result;
            }
          },
          resetShareMenuItems: function(newItems) {
            _shareMenuItems = newItems;
          },
          getCometdUtil: function() {
            if ($scope.evaluatorId) {
              var evaluator = evaluatorManager.getEvaluator($scope.evaluatorId);
              if (evaluator) {
                return evaluator.evaluator.cometdUtil;
              }
            }
          }
        };

        $scope.getOutputDisplayType = function() {
          var type = $scope.model.selectedType;
          // if BeakerDisplay, use the inner type instead
          if (type === "BeakerDisplay") {
            var result = $scope.getOutputResult();
            type = result ? result.innertype : "Hidden";
          }
          return type;
        };

        var getElapsedTimeString = function() {
          if ($scope.model.elapsedTime || $scope.model.elapsedTime === 0) {
            var elapsedTime = $scope.model.elapsedTime;
            return "Elapsed time: " + generalUtils.formatTimeString(elapsedTime);
          }
          return "";
        };

        // to be used in output cell menu
        $scope.outputCellMenuModel = (function() {
          var _additionalMenuItems = [
            {
              name: "Share",
              items: function() {
                return _shareMenuItems;
              }
            },
            {
              name: "Delete",
              action: function() {
                $scope.model.result = undefined;
              }
            },
            {
              name: getElapsedTimeString,
              action: null
            }
          ];
          return {
            getApplicableDisplays: function() {
              return $scope.applicableDisplays;
            },
            getSelectedDisplay: function() {
              return $scope.model.selectedType;
            },
            setSelectedDisplay: function(display) {
              console.log("setSelectedDisplay", display, $scope.model);
              $scope.model.selectedType = display;
            },
            getAdditionalMenuItems: function() {
              return _additionalMenuItems;
            }
          };
        })();
      }
    };
  });

  module.directive('bkCodeCellOutputMenu', function(generalUtils) {
    return {
      restrict: 'E',
      templateUrl: "./template/bkCodeCellOutputMenu.html",
      scope: {
        model: '='
      },
      controller: function($scope) {
        $scope.getItemName = function(item) {
          if (_.isFunction(item.name)) {
            return item.name();
          } else {
            return item.name;
          }
        };
        $scope.getItemClass = function(item) {
          var result = [];
          if (item.items) {
            var subItems = $scope.getSubItems(item);
            if (subItems.length > 0) {
              result.push("dropdown-submenu");
              result.push("pull-left");
            } else {
              result.push("display-none");
            }
          } else if ($scope.getItemName(item) === "") {
            result.push("display-none");
          }
          return result.join(" ");
        };
        $scope.getSubmenuItemClass = function(item) {
          var result = [];
          if (item.disabled) {
            result.push("disabled-link");
          }
          return result.join(" ");
        };
        $scope.getSubItems = function(parentItem) {
          if (_.isFunction(parentItem.items)) {
            return parentItem.items();
          }
          return parentItem.items;
        };
      },
      link: function(scope, element, attrs) {
        var outputMenuDiv = element.parent('.bkcell');
        outputMenuDiv.click(function(event) {
          //click in the border or padding should trigger menu
          if (generalUtils.eventOffsetX(outputMenuDiv, event) >= outputMenuDiv.width()) {
            var menu = outputMenuDiv.find('.dropdown').last();
            menu.css("top", event.clientY);
            menu.css("left", event.clientX - 150);
            menu.find('.dropdown-toggle').first().dropdown('toggle');
            event.stopPropagation();
          }
        });
        outputMenuDiv.mousemove(function(event) {
          if (generalUtils.eventOffsetX(outputMenuDiv, event) >= outputMenuDiv.width()) {
            outputMenuDiv.css('cursor', 'pointer');
          } else {
            outputMenuDiv.css('cursor', 'default');
          }
        });
      }
    };
  });
})();
