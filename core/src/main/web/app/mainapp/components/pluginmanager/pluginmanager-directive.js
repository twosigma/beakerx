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
      template: JST["mainapp/components/pluginmanager/pluginmanager"](),
      controller: function($scope) {
        $scope.isHideEvaluators = function() {
          return bkCoreManager.getBkApp().getBkNotebookWidget().getViewModel().isHideEvaluators();
        };
        $scope.hideEvaluators = function() {
          return bkCoreManager.getBkApp().getBkNotebookWidget().getViewModel().hideEvaluators();
        };
        $scope.evalTabOp = {
          newPluginNameOrUrl: "",
	  showURL: false,
	  showWarning: false,
          getAllEvaluators: function() {
            return bkEvaluatorManager.getAllEvaluators();
          },
          getEvaluatorsWithSpec: function() {
	    var activePlugins = bkEvaluatorManager.getAllEvaluators();
            var result = {};
            for (var p in activePlugins) {
	      if (Object.keys(activePlugins[p].spec).length > 0) {
		result[p] = activePlugins[p];
	      }
	    }
	    return result;
          },
          getLoadingEvaluators: function() {
            return bkEvaluatorManager.getLoadingEvaluators();
          },
          getKnownEvaluatePlugins: function(name) {
            var knownPlugins = bkEvaluatePluginManager.getKnownEvaluatorPlugins();
            var activePlugins = bkEvaluatorManager.getAllEvaluators();
            var loadingPlugins = bkEvaluatorManager.getLoadingEvaluators();
            var result = {};
            for (var p in knownPlugins) {
              var status = false;
              if (activePlugins[p])
                status = "active";
              else {
                for (var l in loadingPlugins) {
                  if (loadingPlugins[l].plugin == p) {
                    status = "loading";
                    break;
                  }
                }
                if (!status) {
                  status = "known";
                }
              }
              result[p] = status;
            }
            return result;
          },
          setNewPluginNameOrUrl: function(pluginNameOrUrl) {
            this.newPluginNameOrUrl = pluginNameOrUrl;
          },
          togglePlugin: function(name) {
            var plugin = this.newPluginNameOrUrl;
	    $scope.evalTabOp.showURL = false;
	    if (name) {
		plugin = name;
	    }
            var status = this.getKnownEvaluatePlugins()[plugin];
            if (status == "known") {
              var newEvaluatorObj = {
                name: "",
                plugin: plugin
              };
              bkSessionManager.addEvaluator(newEvaluatorObj);
              bkCoreManager.getBkApp().addEvaluator(newEvaluatorObj);
            } else {
              // what happens if you remove a plugin that is loading?
              // could just ignore, unless it's possible for plugins
              // to try to load and fail, and get stuck loading.  then
              // you would really want to be able to delete them.
              // other states we should support: failed and exiting.
              if (bkSessionManager.evaluatorUnused(plugin)) {
                bkSessionManager.removeEvaluator(plugin);
                bkCoreManager.getBkApp().removeEvaluator(plugin);
              } else {
		$scope.evalTabOp.showWarning = true;
              }
            }
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
