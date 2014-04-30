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
  var module = angular.module('bk.pluginManager');

  module.directive('bkPluginManager', function(
      bkCoreManager, bkSessionManager, bkMenuPluginManager, bkEvaluatePluginManager,
      bkEvaluatorManager) {
    return {
      restrict: 'E',
      templateUrl: "./app/mainapp/components/pluginmanager/pluginmanager.html",
      controller: function($scope) {
        $scope.isHideEvaluators = function() {
          return bkCoreManager.getBkApp().getBkNotebookWidget().getViewModel().isHideEvaluators();
        };
        $scope.hideEvaluators = function() {
          return bkCoreManager.getBkApp().getBkNotebookWidget().getViewModel().hideEvaluators();
        };
        $scope.evalTabOp = {
          newPluginNameOrUrl: "",
          getAllEvaluators: function() {
            return bkEvaluatorManager.getAllEvaluators();
          },
          getLoadingEvaluators: function() {
            return bkEvaluatorManager.getLoadingEvaluators();
          },
          getKnownEvaluatePlugins: function(name) {
            return bkEvaluatePluginManager.getKnownEvaluatorPlugins();
          },
          setNewPluginNameOrUrl: function(pluginNameOrUrl) {
            this.newPluginNameOrUrl = pluginNameOrUrl;
          },
          addPlugin: function() {
            var plugin = this.newPluginNameOrUrl;
            var newEvaluatorObj = {
              name: "",
              plugin: plugin
            };
            bkSessionManager.getRawNotebookModel().evaluators.push(newEvaluatorObj);
            bkCoreManager.getBkApp().addEvaluator(newEvaluatorObj);
          }
        };

        $scope.menuTabOp = {
          newMenuPluginUrl: "./plugin/menu/debug.js",
          addMenuPlugin: function () {
            bkMenuPluginManager.loadMenuPlugin(this.newMenuPluginUrl);
          },
          getMenuPlugins: function () {
            return bkMenuPluginManager.getMenuPlugins();
          },
          getLoadingPlugins: function() {
            return bkMenuPluginManager.getLoadingPlugins();
          }
        };
      }
    };
  });

})();
