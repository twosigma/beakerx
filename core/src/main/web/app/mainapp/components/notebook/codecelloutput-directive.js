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
 * This module is the abstract container for types of output displays. While we plan to make the output display loading
 * mechanism more pluggable, right now, this module serves as the registration output display types and holds the logic
 * for switch between applicable output display through UI.
 */
(function() {
  'use strict';
  var module = angular.module('bk.notebook');

  module.directive('bkCodeCellOutput', function(
      $rootScope, bkUtils, bkOutputDisplayFactory, bkEvaluatorManager, bkEvaluateJobManager, bkSessionManager, GLOBALS) {
    return {
      restrict: "E",
      template: JST["mainapp/components/notebook/codecelloutput"](),
      scope: {
        model: "=",
        evaluatorId: "@",
        cellId: "@"
      },
      controller: function($scope) {
        var _shareMenuItems = [];
        var _saveAsItems = [];

        $scope.getOutputResult = function() {
          return $scope.model.result;
        };
        $scope.$on('$destroy', function () {
          if ($scope.subscribedTo) {
            if ($scope.model.pluginName && window.languageUpdateService && window.languageUpdateService[$scope.model.pluginName]) {
              window.languageUpdateService[$scope.model.pluginName].unsubscribe($scope.subscribedTo);
            }
          }
          if ($scope.cellId !== undefined)
            bkEvaluateJobManager.deRegisterOutputCell($scope.cellId);
        });
        $scope.applicableDisplays = [];
        $scope.$watch('getOutputResult()', function(result) {
          if ($scope.subscribedTo && $scope.subscribedTo !== result.update_id) {
            if ($scope.model.pluginName && window.languageUpdateService && window.languageUpdateService[$scope.model.pluginName]) {
              window.languageUpdateService[$scope.model.pluginName].unsubscribe($scope.subscribedTo);
            }
            $scope.subscribedTo = null;
          }
          if (!$scope.subscribedTo && result !== undefined && result.update_id) {
            if ($scope.model.pluginName && window.languageUpdateService && window.languageUpdateService[$scope.model.pluginName]) {
              var onUpdatableResultUpdate = function(update) {
                $scope.model.result = update;
                bkHelper.refreshRootScope();
              };
              window.languageUpdateService[$scope.model.pluginName].subscribe(result.update_id, onUpdatableResultUpdate);
              $scope.subscribedTo = result.update_id;
            }
          }

          if (result !== undefined && result.type === "UpdatableEvaluationResult")
            $scope.applicableDisplays = bkOutputDisplayFactory.getApplicableDisplays(result.payload);
          else
            $scope.applicableDisplays = bkOutputDisplayFactory.getApplicableDisplays(result);
          $scope.model.selectedType = $scope.applicableDisplays[0];
        });

        // to be used in bkOutputDisplay
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
          getCellId: function() {
            return $scope.cellId;
          },
          isShowOutput: function() {
            return $scope.isShowOutput();
          },
          getDumpState: function() {
            var result = $scope.model.state;
            return result;
          },
          setDumpState: function(s) {
            $scope.model.state = s;
          },
          resetShareMenuItems: function(newItems) {
            _shareMenuItems = newItems;
          },
          getCometdUtil: function() {
            var id = $scope.getEvaluatorId();
            if (id) {
              var evaluator = bkEvaluatorManager.getEvaluator(id);
              if (evaluator) {
                return evaluator.cometdUtil;
              }
            }
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
          if ($scope.model === undefined)
              return "Text";
          var type = $scope.model.selectedType;
          // if BeakerDisplay or UpdatableEvaluationResult, use the inner type instead
          if (type === "BeakerDisplay") {
            var result = $scope.getOutputResult();
            type = result ? result.innertype : "Hidden";
          }
          return type;
        };

        $scope.$watch('getOutputDisplayType()', function() {
            $scope.outputCellMenuModel.refreshMenu();
        });

        var getElapsedTimeString = function() {
          if ($scope.model.elapsedTime || $scope.model.elapsedTime === 0) {
            var elapsedTime = $scope.model.elapsedTime;
            return "Elapsed time: " + bkUtils.formatTimeString(elapsedTime);
          }
          return "";
        };

        var getEvaluationSequenceNumber = function() {
          if ($scope.model.evaluationSequenceNumber) {
            return "Run Sequence: " + $scope.model.evaluationSequenceNumber;
          }
          return null;
        };

        $scope.isShowOutput = function() {
          if ($scope.$parent !== undefined && $scope.$parent.isShowOutput !== undefined)
            return $scope.$parent.isShowOutput();
          return true;
        };

        $scope.isShowMenu = function() {
          if ($scope.$parent !== undefined && $scope.$parent.isShowMenu !== undefined)
            return $scope.$parent.isShowMenu();
          return true;
        };

        $scope.toggleExpansion = function() {
          if ($scope.$parent.cellmodel !== undefined && $scope.$parent.cellmodel.output !== undefined) {
            if ($scope.$parent.cellmodel.output.hidden) {
              delete $scope.$parent.cellmodel.output.hidden;
              $scope.$broadcast(GLOBALS.EVENTS.CELL_OUTPUT_EXPANDED);
            } else {
              $scope.$parent.cellmodel.output.hidden = true;
            }
            bkSessionManager.setNotebookModelEdited(true);
          }
        };

        $scope.isExpanded = function() {
          if ($scope.$parent.cellmodel !== undefined && $scope.$parent.cellmodel.output !== undefined)
            return !$scope.$parent.cellmodel.output.hidden;
          return true;
        };

        $scope.isShowOutputSummary = function () {
          return !$scope.isExpanded() && !bkSessionManager.isNotebookLocked() && $scope.outputDisplayModel.getOutputSummary;
        };

        $scope.getOutputSummary = function () {
          return $scope.outputDisplayModel.getOutputSummary ? $scope.outputDisplayModel.getOutputSummary() : '';
        };

        $scope.getAdditionalMenuItems = function() {

          var getDisplayType = function(){
            var displayType = $scope.getOutputDisplayType() != null ? $scope.getOutputDisplayType() : $scope.applicableDisplays[0];

            if (displayType === "Results" && $scope.getOutputResult() && $scope.getOutputResult().payload){
              displayType = $scope.getOutputResult().payload.type;
            }
            return displayType;
          };

          var displayType = getDisplayType();
          if(displayType === "Plot" || displayType === "CombinedPlot"){
            _saveAsItems = [
              {
                name: "SVG",
                action: function () {
                  $scope.outputDisplayModel.getCellModel().saveAsSvg ?
                    $scope.outputDisplayModel.getCellModel().saveAsSvg() : $scope.outputDisplayModel.getCellModel().payload.saveAsSvg();
                }
              },
              {
                name: "PNG",
                action: function () {
                  $scope.outputDisplayModel.getCellModel().saveAsPng ?
                    $scope.outputDisplayModel.getCellModel().saveAsPng() : $scope.outputDisplayModel.getCellModel().payload.saveAsPng();
                }
              }];
          }else{
            _saveAsItems = [];
          }
          return [
            {
              name: "Toggle Cell Output",
              isChecked: function() {
                $scope.isExpanded();
              },
              action: function() {
                $scope.toggleExpansion();
              }
            },
            {
              name: "Delete Output",
              action: function() {
                $scope.model.result = undefined;
              }
            },
            {
              name: "Save Plot As",
              items: _saveAsItems
            },
            {
              name: getElapsedTimeString,
              action: null
            },
            {
              name: getEvaluationSequenceNumber,
              action: null
            }
          ];
        };

        // to be used in output cell menu
        $scope.outputCellMenuModel = (function() {
          var _additionalMenuItems = $scope.getAdditionalMenuItems();
          return {
            getApplicableDisplays: function() {
              return $scope.applicableDisplays;
            },
            getSelectedDisplay: function() {
              return $scope.model.selectedType;
            },
            setSelectedDisplay: function(display) {
              $scope.model.selectedType = display;
            },
            getAdditionalMenuItems: function() {
              return _additionalMenuItems;
            },
            refreshMenu: function() {
              _additionalMenuItems = $scope.getAdditionalMenuItems();
            }
          };
        })();

        $scope.outputRefreshed = function() {
          if (!($scope.$$phase || $rootScope.$$phase))
            $scope.$digest();
        };
        if ( $scope.cellId !== undefined )
          bkEvaluateJobManager.registerOutputCell($scope.cellId, $scope);
      }
    };
  });

})();
