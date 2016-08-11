/*
 *  Copyright 2016 TWO SIGMA OPEN SOURCE, LLC
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
 * bkSparkConfigurationCtrl
 */

(function() {
  'use strict';
  var module = angular.module('bk.core');

  module.controller(
    'sparkConfigurationCtrl',
    ['$scope', '$rootScope', '$uibModalInstance', 'bkCoreManager', 'bkSessionManager',
     'bkMenuPluginManager', 'bkEvaluatePluginManager', 'bkEvaluatorManager', 'GLOBALS',
     'bkUtils', 'bkSparkContextManager',
     function($scope, $rootScope, $uibModalInstance, bkCoreManager, bkSessionManager,
              bkMenuPluginManager, bkEvaluatePluginManager,
              bkEvaluatorManager, GLOBALS, bkUtils, bkSparkContextManager) {

    // hide properties that are configurable elsewhere
    var BLACKLISTED_SPARK_PROPERTIES = [
      'spark.executor.cores', 'spark.executor.memory', 'spark.master', 'spark.ui.port'
    ];
    if (window.beakerRegister.additionalHiddenSparkProperties != null) {
      BLACKLISTED_SPARK_PROPERTIES = BLACKLISTED_SPARK_PROPERTIES.concat(
        window.beakerRegister.additionalHiddenSparkProperties);
    }

    // copy settings from SparkContextManager
    $scope.configuration = angular.copy(bkSparkContextManager.configurationObjects());

    $scope.loadSparkConf = function() {
      $scope.sparkConf = _.filter(_.map(
        angular.copy(bkSparkContextManager.sparkConf()),
        function(value, key) {
          return { key: key, value: value };
        }),
        function(property) {
          return BLACKLISTED_SPARK_PROPERTIES.indexOf(property.key) < 0;
        });
      $scope.sparkConf.push({ key: '', value: '' });
      $scope.originalSparkConf = angular.copy($scope.sparkConf);
    };
    $scope.loadSparkConf();


    var digestPlaceholder = true; // used for avoiding endless digestion
    $scope.$watch('sparkConf', function(newValue, oldValue) {
      if (!digestPlaceholder) {
        digestPlaceholder = true;
        return;
      }
      if ($scope.isDisabled())
        return;
      for (var i = 0; i < newValue.length; ++i) {
        var p = newValue[i];
        if (p.key === '')
          return;
      }

      digestPlaceholder = false;
      // we have to add a new placeholder
      $scope.sparkConf.push({ key: '', value: '' });
    }, true);

    $scope.removeSparkConfProperty = function(property) {
      if ($scope.isDisabled())
        return;
      var index = $scope.sparkConf.indexOf(property);
      $scope.sparkConf.splice(index, 1);
    };

    $scope.saveSparkConf = function() {
      var conf = {};
      for (var i = 0; i < $scope.sparkConf.length; ++i) {
        var p = $scope.sparkConf[i];
        if (p.key === '')
          continue;
        if (p.key in BLACKLISTED_SPARK_PROPERTIES) {
          console.warn('SparkConf property "' + p.key + '" cannot be specified.');
          continue;
        }
        conf[p.key] = p.value;
      }
      bkSparkContextManager.setSparkConf(conf);
      $scope.loadSparkConf();
    };

    $scope.isFixedProperty = function(propertyKey) {
      if (propertyKey === '')
        return false;
      for (var i = 0; i < $scope.originalSparkConf.length; ++i) {
        if ($scope.originalSparkConf[i].key === propertyKey)
          return true;
      }
      return false;
    };

    $scope.showAdvanced = false;
    $scope.toggleAdvanced = function() {
      $scope.showAdvanced = !$scope.showAdvanced;
    };

    $scope.doClose = function() {
      $uibModalInstance.close("ok");
    };

    $scope.isDisabled = function() {
      return bkSparkContextManager.isFailing() || bkSparkContextManager.isConnected() ||
        bkSparkContextManager.isConnecting() || bkSparkContextManager.isDisconnecting() ||
        !bkSparkContextManager.isAvailable();
    };

    $scope.start = function() {
      bkSparkContextManager.setConfigurationObjects($scope.configuration);
      $scope.saveSparkConf();
      bkSparkContextManager.connect();
    };

    $scope.stop = function() {
      $scope.loadSparkConf();
      bkSparkContextManager.disconnect();
    };

    $scope.edited = function() {
      return !angular.equals($scope.configuration, bkSparkContextManager.configurationObjects())
          || !angular.equals($scope.sparkConf, $scope.originalSparkConf);
    };

    $scope.running = function() {
      return bkSparkContextManager.runningJobs();
    };

    $scope.error = function() {
      return bkSparkContextManager.getError();
    };

    $scope.closePermitted = false;
    $scope.$on('modal.closing', function(event, reason, closed) {
      if ($scope.edited()) {
        if (!$scope.closePermitted) {
          event.preventDefault();
          bkHelper.show2ButtonModal('Discard your changes to the settings?', 'Discard changes',
              function() {
                $scope.closePermitted = true;
                $scope.doClose();
              },
              function() {
                $scope.saveSparkConf();
              },
              "Ok", "Cancel", "", "");
        }
      }
    });
  }]);
})();
