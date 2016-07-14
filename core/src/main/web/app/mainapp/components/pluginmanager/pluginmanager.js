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

  module.controller('pluginManagerCtrl', ['$scope', '$rootScope', '$uibModalInstance', 'bkCoreManager', 'bkSessionManager', 'bkMenuPluginManager', 'bkEvaluatePluginManager',
                                          'bkEvaluatorManager', 'GLOBALS', 'bkUtils', function($scope, $rootScope, $uibModalInstance, bkCoreManager, bkSessionManager, bkMenuPluginManager, bkEvaluatePluginManager,
                                              bkEvaluatorManager, GLOBALS, bkUtils) {


    $scope.$on(GLOBALS.EVENTS.SET_LANGUAGE_SETTINGS_EDITED, function(event, data) {
      $scope.edited = data.edited;
      $scope.editedEvalutor = data.editedEvalutor;
    });

    $scope.edited = false;
    $scope.editedEvalutor = "";

    $scope.discardChanges = function() {
      $scope.$broadcast(GLOBALS.EVENTS.DISCARD_LANGUAGE_SETTINGS);
    };
    window.discardPluginManagerChanges = $scope.discardChanges;

    $scope.navigateToModifiedTab = function() {
      $scope.$broadcast(GLOBALS.EVENTS.HIGHLIGHT_EDITED_LANGUAGE_SETTINGS);
      $scope.evalTabOp.setActiveTab($scope.editedEvalutor);
    };

    $scope.doClose = function() {
      $uibModalInstance.close("ok");
    }

    $scope.performOnClosingCleanup = function() {
      $scope.evalTabOp.showURL = false;
      $scope.evalTabOp.showWarning = false;
      $scope.evalTabOp.showSecurityWarning = false;
      $scope.evalTabOp.forceLoad = false;
      $scope.evalTabOp.newPluginNameOrUrl = "";
    };

    $scope.closePermitted = false;
    $scope.$on('modal.closing', function(event, reason, closed) {
      if ($scope.edited) {
        if (!$scope.closePermitted) {
          event.preventDefault();
          bkHelper.show2ButtonModal('Discard your changes to the settings?', 'Discard changes',
              function() {
                $scope.discardChanges();
                $scope.performOnClosingCleanup();
                $scope.closePermitted = true;
                $scope.doClose();
              },
              function() {
                $scope.navigateToModifiedTab();
              },
              "Ok", "Cancel", "", "");
        }
      } else {
        $scope.performOnClosingCleanup();
      }
    });

    $scope.getEvaluatorDetails = function(name) {
      return bkEvaluatorManager.getVisualParams(name);
    };

    $scope.allowFromUrl = function() {
      return (window.beakerRegister === undefined || window.beakerRegister.disablePluginLoadFromUrl === undefined || !window.beakerRegister.disablePluginLoadFromUrl);
    };

    $scope.getEvaluatorTooltipText = function (pluginName, pluginStatus) {
      var pluginDescription = $scope.getEvaluatorDetails(pluginName).tooltip;
      if(pluginDescription) {
        var suffix;
        switch(pluginStatus) {
          case 'known':
                suffix = ' Click to start.';
                break;
          case 'loading':
                suffix = ' Starting...';
                break;
          case 'active':
                suffix = ' Click to remove from notebook.';
                break;
        }
        return pluginDescription + suffix;
      }
    };

    $scope.evalTabOp = {
      newPluginNameOrUrl: "",
      showURL: false,
      showWarning: false,
      showSecurityWarning: false,
      forceLoad: false,
      tabs: [],
      activateThisTab: null,
      getLoadedEvaluators: function() {
        return bkEvaluatorManager.getLoadedEvaluators();
      },
      isTabActive: function(name) {
        for (var i = 0; i < this.tabs.length; i++) {
          if (this.tabs[i].evaluatorName === name) {
            return this.tabs[i].active;
          }
        }
        return false;
      },
      setActiveTab: function(name) {
        for (var i = 0; i < this.tabs.length; i++) {
          this.tabs[i].active = (this.tabs[i].evaluatorName === name);
        }
      },
      getActiveTab: function() {
        for (var i = 0; i < this.tabs.length; i++) {
          if (this.tabs[i].evaluatorName === name) {
            return this.tabs[i].active;
          }
        }
      },
      initTabs: function() {
        $scope.evalTabOp.tabs = [];
        var evaluators = $scope.evalTabOp.getEvaluatorsWithSpec();
        Object.keys(evaluators).forEach(function(evaluatorName) {
          var evaluator = evaluators[evaluatorName];
          evaluator.evaluatorName = evaluator.settings.name;
          $scope.evalTabOp.tabs.push(evaluator);
        });
        if ($scope.evalTabOp.activateThisTab && $scope.evalTabOp.tabs.length > 0) {
          $scope.evalTabOp.setActiveTab($scope.evalTabOp.activateThisTab);
          $scope.evalTabOp.activateThisTab = null;
        }
      },
      getEvaluatorsWithSpec: function() {
        var activePlugins = bkEvaluatorManager.getLoadedEvaluators();
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
      getEvaluatorStatuses: function(name) {
        var knownPlugins = bkEvaluatePluginManager.getKnownEvaluatorPlugins();
        var knownPluginsNamesSorted = Object.keys(knownPlugins).sort();
        var activePlugins = bkEvaluatorManager.getLoadedEvaluators();
        var loadingPlugins = bkEvaluatorManager.getLoadingEvaluators();
        var result = {};
        for (var index = 0; index < knownPluginsNamesSorted.length; index++) {
          var status = false;
          var pluginName = knownPluginsNamesSorted[index];
          if (activePlugins[pluginName]) {
            status = "active";
          } else {
            for (var l in loadingPlugins) {
              if (loadingPlugins[l].plugin == pluginName) {
                status = "loading";
                break;
              }
            }
            if (!status) {
              status = "known";
            }
          }
          result[pluginName] = status;
        }
        return result;
      },
      setNewPluginNameOrUrl: function(pluginNameOrUrl) {
        this.newPluginNameOrUrl = pluginNameOrUrl;
      },
      togglePlugin: function(name) {
        var plugin = name || this.newPluginNameOrUrl;
        var fromUrl = name ? false : true;
        var status = this.getEvaluatorStatuses()[plugin];

        if (!fromUrl && !_.includes(['active', 'known'], status)) return;
        // for now, if the plugin isn't from a URL or active or known
        // (namely loading) return.
        // TODO: other states we should support: failed and exiting.

        if (status === 'active') {
          // turn off evaluator if on
          if (!bkSessionManager.evaluatorUnused(plugin)) {
            return $scope.evalTabOp.showWarning = true;
          }

          bkSessionManager.removeEvaluator(plugin);
          bkCoreManager.getBkApp().removeEvaluator(plugin);
        } else {
          // otherwise, turn on evaluator
          if (fromUrl) {
            var r = new RegExp('^(?:[a-z]+:)?//', 'i');
            if (r.test(plugin) && !$scope.evalTabOp.forceLoad) {
              return $scope.evalTabOp.showSecurityWarning = true;
            }

            $scope.evalTabOp.forceLoad = false;
            $scope.evalTabOp.newPluginNameOrUrl = "";
          }
          $scope.evalTabOp.activateThisTab = plugin;
          bkCoreManager.getBkApp().addEvaluatorToNotebook(plugin);
        }
      }
    };

    $scope.$watchCollection('evalTabOp.getEvaluatorsWithSpec()', $scope.evalTabOp.initTabs);

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

    $scope.navigationGrid = [];
    $scope.onInit = function () {
      setTimeout(function () { //wait for the DOM elements to appear
        $scope.navigationElements = $('.navigate-btn');
        $scope.navigationElements.each(function (index, el) {
          var currentRow = _.last($scope.navigationGrid);
          if (!currentRow) {
            currentRow = [];
            $scope.navigationGrid.push(currentRow);
          } else {
            var prevElement = $(_.last(currentRow));
            if ($(el).position().top > prevElement.position().top) {
              currentRow = [];
              $scope.navigationGrid.push(currentRow);
            }
          }
          currentRow.push(el);
        });
      }, 0);
    };

    var getNavigationIndex = function (el) {
      var index = [];
      _.forEach($scope.navigationGrid, function (row, i) {
        _.forEach(row, function (item, j) {
          if (item == el) {
            index.push(i);
            index.push(j);
          }
        });
      });
      return index;
    };

    var getElementAtPosition = function (i, j) {
      if (i < 0) {
        i = $scope.navigationGrid.length - 1;
      }
      if (i >= $scope.navigationGrid.length) {
        i = 0;
      }
      var row = $scope.navigationGrid[i];
      if (j < 0) {
        j = row.length - 1;
      }
      if (j >= row.length) {
        row = $scope.navigationGrid[0];
      }
      return row[j];
    };

    var KEY_CODES = {
      ARROW_LEFT:  37,
      ARROW_UP:    38,
      ARROW_RIGHT: 39,
      ARROW_DOWN:  40
    };
    $scope.navigate = function (event) {
      var curElement = event.target;
      switch (event.keyCode) {
        case KEY_CODES.ARROW_LEFT:
          var index = $scope.navigationElements.index(curElement);
          $scope.navigationElements.get(index - 1).focus();
          event.preventDefault();
          break;
        case KEY_CODES.ARROW_UP:
          var index = getNavigationIndex(curElement);
          getElementAtPosition(index[0] - 1, index[1]).focus();
          event.preventDefault();
          break;
        case KEY_CODES.ARROW_RIGHT:
          var index = $scope.navigationElements.index(curElement);
          if (index >= $scope.navigationElements.length - 1) { index = -1; }
          $scope.navigationElements.get(index + 1).focus();
          event.preventDefault();
          break;
        case KEY_CODES.ARROW_DOWN:
          var index = getNavigationIndex(curElement);
          getElementAtPosition(index[0] + 1, index[1]).focus();
          event.preventDefault();
          break;
      }
    };

    $(document.body).on('keydown.plugin-manager', function (event) {
      if (_.values(KEY_CODES).indexOf(event.keyCode) > -1 && $('.plugin-manager').find(':focus').length === 0) {
        $scope.navigationElements.get(0).focus();
        event.preventDefault();
      }
    });

    $scope.$on('$destroy', function () {
      $(document.body).off('keydown.plugin-manager');
      delete $scope.navigationGrid;
      delete $scope.navigationElements;
    });

    $rootScope.$on(GLOBALS.EVENTS.LANGUAGE_MANAGER_SHOW_SPINNER, function(event, data) {
      $scope.showSpinner = true;
      $scope.showMessage = true;
      $scope.loadingMessage = 'Starting ' + data.pluginName + '...';
    });

    $rootScope.$on(GLOBALS.EVENTS.LANGUAGE_MANAGER_HIDE_SPINNER, function(event, data) {
      if (data.error) {
        $scope.loadingMessage += ' failed';
      } else {
        $scope.loadingMessage += ' done';
      }
      $scope.showSpinner = false;
      bkUtils.timeout(function() {
        $scope.showMessage = false;
      }, 3000);
    });

  }]);
})();
