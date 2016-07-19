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

  module.directive('bkSparkMenu', 
    function($compile, $timeout, bkSparkContextManager, GLOBALS, bkUtils, bkSessionManager) {

    return {
      restrict: 'E',
      template: JST["mainapp/components/spark/sparkmenu"](),      
      replace: true,
      controller: function($scope) {
      },
      link: function(scope, element, attrs) {
        scope.showSparkConfiguration = function() {
          bkHelper.showSparkConfiguration();
        };

        scope.statusClass = function() {
          if (bkSparkContextManager.isFailing())
            return 'plugin-error';
          if (bkSparkContextManager.isConnecting() || bkSparkContextManager.isDisconnecting())
            return 'plugin-loading';
          if (bkSparkContextManager.isConnected())
            return 'plugin-active';
          return 'plugin-known';
        };

        scope.isConnected = function() {
          return bkSparkContextManager.isConnected();
        };

        scope.isConnecting = function() {
          return bkSparkContextManager.isConnecting();
        };

        scope.isDisconnecting = function() {
          return bkSparkContextManager.isDisconnecting();
        };

        scope.isInactive = function() {
          return !bkSparkContextManager.isAvailable();
        };

        scope.start = function() {
          bkSparkContextManager.connect();
        };

        scope.stop = function() {
          bkSparkContextManager.disconnect();
        };

        scope.showSparkUi = function() {
          bkSparkContextManager.openSparkUi();
        };
      }
    };
  });

})();
