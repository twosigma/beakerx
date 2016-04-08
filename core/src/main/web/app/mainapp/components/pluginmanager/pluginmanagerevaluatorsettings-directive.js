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
 * This is the module for the UI that shows the list of evaluators and their corresponding
 * settings panel.
 */

(function() {
  'use strict';

  var module = angular.module('bk.core');

  module.directive('bkPluginManagerEvaluatorSettings', function(
      $compile, bkSessionManager, GLOBALS, bkUtils) {
    return {
      restrict: 'E',
      template: JST["mainapp/components/pluginmanager/pluginmanager_evaluator_settings"](),
      controller: function($scope) {
        $scope.savedSettings = angular.copy($scope.evaluator.settings);
        $scope.highlight = false;

        $scope.$on(GLOBALS.EVENTS.DISCARD_LANGUAGE_SETTINGS, function(event, data) {
          $scope.evaluator.settings = $scope.savedSettings;
        });

        $scope.$on(GLOBALS.EVENTS.HIGHLIGHT_EDITED_LANGUAGE_SETTINGS, function(event, data) {
          $scope.highlight = true;
        });

        $scope.searchRemote = function(url, scopeProperty) {
          console.log(url);
          bkUtils.httpGet(url).then(function(response) {
            $scope[scopeProperty] = _.take(response.data.results, 20);
            console.log(response);
          });
        };

        $scope.set = function(property) {
          if (property.action) {
            $scope.evaluator.perform(property.key);
          }
          bkSessionManager.setNotebookModelEdited(true);
          property.edited = false;
          var noMoreUnsavedProperties = true;
          for (var i = 0; i < $scope.properties.length; i++) {
            if ($scope.properties[i].edited) {
              noMoreUnsavedProperties = false;
              break;
            }
          }
          if (noMoreUnsavedProperties) {
            $scope.$emit(GLOBALS.EVENTS.SET_LANGUAGE_SETTINGS_EDITED, {
              edited: false,
              editedEvalutor: $scope.evaluatorName
            });
          }
          $scope.savedSettings[property.key] = $scope.evaluator.settings[property.key];
          bkHelper.updateLanguageManagerSettingsInBeakerObject( $scope.evaluatorName,
                                                                property.key,
                                                                $scope.evaluator.settings[property.key])
        };

        $scope.perform = function (action) {
          action.running = true;
          var promise;
          try {
            promise = $scope.evaluator.perform(action.key);
          } catch (e) {
            console.error(e);
          }
          if(promise) {
            promise.finally(function () {
              action.running = false;
            });
          } else {
            action.running = false;
          }
        };
      },
      link: function(scope, element, attrs) {
        scope.availableProperties = GLOBALS.EVALUATOR_SPEC.PROPERTIES;

        var spec = _.map(scope.evaluator.spec, function(value, key) {
          return _.extend({ name: key, key: key }, value);
        });

        scope.properties = _.filter(spec, function(option) {
          return _(GLOBALS.EVALUATOR_SPEC.PROPERTIES)
            .values()
            .contains(option.type);
        });

        var getEditedListener = function (property) {
          return function (newValue, oldValue) {
            if (newValue !== oldValue) {
              property.edited = scope.evaluator.settings[property.key]
                  !== scope.savedSettings[property.key];
              scope.$emit(GLOBALS.EVENTS.SET_LANGUAGE_SETTINGS_EDITED, {
                edited: property.edited,
                editedEvalutor: scope.evaluatorName
              });
            }
          };
        };

        for (var i = 0; i < scope.properties.length; i++) {
          scope.properties[i].edited = false;
          if (!scope.savedSettings[scope.properties[i].key]) {
            scope.savedSettings[scope.properties[i].key] = "";
          }
          scope.$watch('evaluator.settings[\'' + scope.properties[i].key + '\']', getEditedListener(scope.properties[i]));
        }

        scope.actions = _.filter(spec, function(option) {
          return option.type === "action";
        });
      }
    };
  });

})();
