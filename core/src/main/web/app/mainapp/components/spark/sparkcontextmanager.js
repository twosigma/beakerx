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
 * bkSparkContextManager
 */
(function() {
  'use strict';
  angular.module('bk.sparkContextManager',
    [ 'bk.utils', 'bk.helper', 'bk.sessionManager', 'bk.evaluatorManager',
      'bk.evaluatePluginManager', 'bk.globals' ])
  .factory('bkSparkContextManager', function(
      $timeout, $rootScope, $http, bkUtils, bkHelper, bkSessionManager,
      bkEvaluatorManager, bkEvaluatePluginManager, GLOBALS) {
    
    var PLUGIN_NAME = "Scala";
    var COMMAND = "scala/scalaPlugin";
    var serviceBase = undefined;
    var uiPort = 4040;
    var shellId = undefined;

    $rootScope.connected = false;
    $rootScope.connecting = false;
    $rootScope.disconnecting = false;
    $rootScope.error = '';
    $rootScope.running = 0;

    function ConfigurationString(id, value, name, customSerializer) {
      this.id = id;
      this.value = value;
      this.name = typeof name === 'string' ? name : id;
      if (typeof customSerializer === 'function')
        this.serializer = customSerializer;
      else
        this.serializer = function(value) { return value; }
      
      this.serializedValue = function() {
        return this.serializer(this.value);
      };
    }

    function integerSerializer(min, max, suffix) {
      suffix = typeof suffix === 'string' ? suffix : '';
      return function(value) {
        var i = parseInt(value);
        if (isNaN(i))
          return String(min) + suffix;        
        return String(Math.min(max, Math.max(min, i))) + suffix;
      };
    }

    function ConfigurationChoice(id, value, name, options) {
      ConfigurationString.apply(this, [id, value, name]);
      this.options = typeof options === 'object' ?
        options : [value];
    }

    $rootScope.configurationObjects = {
      executorCores: new ConfigurationString(
        'spark.executor.cores',
        '10',
        'Executor cores',
        integerSerializer(1, 128)
      ),
      executorMemory: new ConfigurationString(
        'spark.executor.memory',
        '8',
        'Executor memory',
        integerSerializer(1, 128, 'g')
      ),
      datacenter: new ConfigurationChoice(
        'master',
        'dft',
        'Datacenter',
        ['dft', 'aws', 'pubcloud', 'pit', 'local']
      ),
      advanced: {
        // ...
      }
    };
    
    $rootScope.getEvaluator = function() {
      return bkEvaluatorManager.getEvaluator(PLUGIN_NAME);
    };

    $rootScope.$watch('getEvaluator()', function(newValue, oldValue) {
      if (typeof newValue === 'undefined' || newValue == null)
        return;
      bkHelper.locatePluginService(PLUGIN_NAME, {
        command: COMMAND,
        recordOutput: "true"
      }).success(function(ret) {
        serviceBase = ret;
        console.log('The service base is', ret);
        var evaluator = bkEvaluatorManager.getEvaluator(PLUGIN_NAME);
        if (typeof evaluator !== 'undefined' && evaluator != null)
          shellId = evaluator.settings.shellID;
        console.log('Setting up comet connection to', bkHelper.serverUrl(serviceBase));

        $.cometd.init({
          url: bkHelper.serverUrl(serviceBase) + '/cometd/'
        });
        $.cometd.subscribe('/sparkStageProgress', function(progress) {
          console.log("Spark stage progress", progress);
        });
        $.cometd.subscribe('/sparkAppProgress', function(progress) {
          console.log("Spark app progress", progress);
        });
        $.cometd.subscribe('/sparkJobProgress', function(progress) {
          console.log("Spark job progress", progress);
          $rootScope.running += progress.data.running ? 1 : -1;
          $rootScope.running = Math.max(0, $rootScope.running);
          $rootScope.$digest();
        });
      }).error(function(ret) {
        serviceBase = undefined;
        console.warn('Failed to obtain service base.', ret);
      });
    });

    return {
      isAvailable: function() {
        return serviceBase !== undefined;
      },
      isConnecting: function() {
        return $rootScope.connecting;
      },
      isDisconnecting: function() {
        return $rootScope.disconnecting;
      },
      isFailing: function() {
        return $rootScope.error.length > 0;
      },
      isConnected: function() {
        return $rootScope.connected;
      },
      runningJobs: function() {
        return $rootScope.running;
      },
      isRunning: function() {
        return $rootScope.running > 0;
      },
      connect: function() {
        if ($rootScope.connected)
          return;

        bkHelper.showStatus(
          "Creating Spark context",
          bkHelper.serverUrl(serviceBase + "/rest/scalash/startSparkContext")
        );
        $rootScope.connecting = true;
        
        console.log('Setting up SparkContext using configuration', this.configuration());
        bkHelper.httpPost(
          bkHelper.serverUrl(serviceBase + "/rest/scalash/startSparkContext"),
          {
            shellId: shellId,
            configuration: JSON.stringify(this.configuration())
          }
        ).success(function(ret) {
          console.log("done startSparkContext", ret);
          $rootScope.connecting = false;
          $rootScope.connected = true;
          $rootScope.running = 0;
          uiPort = parseInt(ret);
          bkHelper.clearStatus("Creating Spark context");
        }).error(function(ret) {
          $rootScope.error = 'ERROR';
          bkHelper.clearStatus("Creating Spark context");
          $rootScope.connecting = false;
          $rootScope.running = 0;
        });
      },
      disconnect: function() {
        if (!$rootScope.connected)
          return;

        bkHelper.showStatus("Stopping Spark context");
        $rootScope.disconnecting = true;

        bkHelper.httpPost(
          bkHelper.serverUrl(serviceBase + "/rest/scalash/stopSparkContext"),
          {shellId: shellId}
        ).success(function(ret) {
          console.log("done stopSparkContext", ret);
          $rootScope.disconnecting = false;
          $rootScope.connected = false;
          $rootScope.running = 0;
          bkHelper.clearStatus("Stopping Spark context");
        }).error(function(ret) {
          $rootScope.error = 'ERROR';
          bkHelper.clearStatus("Stopping Spark context");
          $rootScope.disconnecting = false;
          $rootScope.running = 0;
        });
      },
      sparkUiUrl: function() {
        return 'http://' + window.location.hostname + ':' + uiPort;
      },
      openSparkUi: function() {
        if (!$rootScope.connected)
          return;
        var win = window.open(this.sparkUiUrl(), '_blank');
        win.focus();
      },
      configurationObjects: function() {
        return $rootScope.configurationObjects;
      },
      setConfigurationObjects: function(config) {
        $rootScope.configurationObjects = config;
      },
      configuration: function() {
        // serialize configuration objects to plain string dictionary
        var config = {};
        for (var key in $rootScope.configurationObjects) {
          if (key === 'advanced')
            continue;
          var obj = $rootScope.configurationObjects[key];
          config[obj.id] = obj.serializedValue();
        }
        for (var key in $rootScope.configurationObjects.advanced) {
          var obj = $rootScope.configurationObjects[key];
          config[obj.id] = obj.serializedValue();
        }
        return config;
      }
    };
  });
})();