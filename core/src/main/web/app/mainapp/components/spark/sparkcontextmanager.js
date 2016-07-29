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
    var serviceBase = null;
    var uiPort = 4040;
    var shellId = undefined;

    $rootScope.connected = false;
    $rootScope.connecting = false;
    $rootScope.disconnecting = false;
    $rootScope.error = '';
    $rootScope.running = 0;

    $rootScope.sparkConf = null;

    $rootScope.jobsPerCell = {};
    $rootScope.activeCell = null;

    function ConfigurationString(id, value, name, customSerializer) {
      this.id = id;
      this.value = value;
      this.type = 'string';
      this.name = typeof name === 'string' ? name : id;
      if (typeof customSerializer === 'function')
        this.serializer = customSerializer;
      else
        this.serializer = function(value) { return value; }
      
      this.serializedValue = function() {
        return this.serializer(this.value);
      };
    }

    function ConfigurationChoice(id, value, name, options) {
      ConfigurationString.apply(this, [id, value, name]);
      this.options = typeof options === 'object' ?
        options : [value];
      this.type = 'choice';
    }

    function ConfigurationBoolean(id, value, name) {
      ConfigurationString.apply(this, [id, value, name]);
      this.type = 'boolean';
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

    $rootScope.configurationObjects = {
      executorCores: new ConfigurationString(
        'spark.executor.cores',
        '10',
        'Executor cores',
        integerSerializer(1, 128)
      ),
      executorMemory: new ConfigurationString(
        'spark.executor.memory',
        '8g',
        'Executor memory'
      ),
      datacenter: new ConfigurationChoice(
        'datacenter',
        'dft',
        'Datacenter',
        window.beakerRegister.sparkDatacenters || ['aws', 'local']
      ),
      advanced: {
        persistent: new ConfigurationBoolean(
          'persistent',
          false,
          'Persistent'
        ),
        sc: new ConfigurationString(
          'sparkContextAlias',
          'sc',
          'SparkContext alias'
        ),
        sqlContext: new ConfigurationString(
          'sqlContextAlias',
          'sqlContext',
          'SQLContext alias'
        )
      }
    };

    function readConfiguration(config, applyOnSuccess) {
      var r = {
        configurationObjects: jQuery.extend(true, {}, $rootScope.configurationObjects),
        uiPort: null,
        sparkConf: null,
        success: false
      }
      try {
        r.configurationObjects.advanced.sc.value = config["sparkContextAlias"];
        r.configurationObjects.advanced.sqlContext.value = config["sqlContextAlias"];
        r.configurationObjects.advanced.persistent.value = config["persistent"];
        r.sparkConf = config["sparkConf"];
        r.configurationObjects.executorCores.value = r.sparkConf["spark.executor.cores"];
        r.configurationObjects.executorMemory.value = r.sparkConf["spark.executor.memory"];
        r.configurationObjects.datacenter.value = config["datacenter"];
        r.uiPort = parseInt(r.sparkConf["spark.ui.port"]);

        if (applyOnSuccess) {
          $rootScope.configurationObjects = r.configurationObjects;
          uiPort = r.uiPort;
          $rootScope.sparkConf = r.sparkConf;
        }

        r.success = true;
      } catch (e) {
        console.warn("Failed to deserialize configuration:", e);
      }
      return r;
    }

    function Stage(id, total, failed, completed, active) {
      this.total = total;
      this.id = id;
      this.url = bkSparkContextManager.sparkUiUrl() + '/stages/stage/?id=' + id + '&attempt=0';
      this.failed = failed;
      this.completed = completed;
      this.active = active;

      if (this.total > 0) {
        this.failedP = Math.min(100, this.failed / this.total * 100);
        this.completedP = Math.min(100, this.completed / this.total * 100);
        this.activeP = Math.min(100, this.active / this.total * 100);
      }
      else {
        this.failedP = 0;
        this.completedP = 0;
        this.activeP = 0;
      }
    };

    function Job(id, stageObjects, stages, running) {
      this.id = id;
      this.stages = stageObjects;
      this.running = running;
      if (id == null)
        this.url = null;
      else
        this.url = bkSparkContextManager.sparkUiUrl() + '/jobs/job/?id=' + id;
      this.totalTasks = 0;
      this.failedTasks = 0;
      this.succeededTasks = 0;
      this.activeTasks = 0;
      for (var index in stages) {
        this.totalTasks += stages[index].totalTasks;
        this.failedTasks += stages[index].failedTasks;
        this.activeTasks += stages[index].activeTasks;
        this.succeededTasks += stages[index].succeededTasks;
      }
    };
    
    $rootScope.getEvaluator = function() {
      return bkEvaluatorManager.getEvaluator(PLUGIN_NAME);
    };

    var appSubscription = null, jobSubscription = null;

    // retrieve service base to send http requests
    $rootScope.$watch('getEvaluator()', function(newValue, oldValue) {
      if (typeof newValue === 'undefined' || newValue == null) {
        serviceBase = null;
        return;
      }
      bkHelper.locatePluginService(PLUGIN_NAME, {
        command: COMMAND,
        recordOutput: "true"
      }).success(function(ret) {
        serviceBase = ret;
        var evaluator = bkEvaluatorManager.getEvaluator(PLUGIN_NAME);
        if (typeof evaluator !== 'undefined' && evaluator != null)
          shellId = evaluator.settings.shellID;

        $.cometd.init({
          url: bkHelper.serverUrl(serviceBase) + '/cometd/'
        });
        appSubscription = $.cometd.subscribe('/sparkAppProgress', function(progress) {
          console.log("Spark app progress", progress);
        });
        jobSubscription = $.cometd.subscribe('/sparkJobProgress', function(progress) {
          $rootScope.running = 0;
          for (var index in progress.data) {
            $rootScope.running += progress.data[index].running ? 1 : 0;
          }
          if ($rootScope.activeCell != null) {
            var jobs = [];
            for (var jindex in progress.data) {
              var j = progress.data[jindex];
              var stages = [];
              for (var sindex in j.stages) {
                var s = j.stages[sindex];
                stages.push(new Stage(
                  s.stageId,
                  s.totalTasks,
                  s.failedTasks,
                  s.succeededTasks,
                  s.activeTasks));
              }
              jobs.push(new Job(
                j.id,
                stages,
                j.stages,
                j.running));
            }
            $rootScope.jobsPerCell[$rootScope.activeCell] = jobs;
          }

          $rootScope.$digest();
        });

        // get current Spark status (has the context already been started?)
        bkHelper.httpPost(
          bkHelper.serverUrl(serviceBase + "/rest/scalash/configuration"),
          { shellId: shellId }
        ).success(function(ret) {
          if (ret === "offline")
            return;
          var confReadResult = readConfiguration(ret, true);
          if (confReadResult.success) {
            $rootScope.connecting = false;
            $rootScope.connected = true;
            $rootScope.running = 0;
            console.log("SparkContext already started, port:", uiPort);
          } else {
            $rootScope.connecting = false;
            $rootScope.connected = false;
            $rootScope.running = 0;
            $rootScope.error = 'Error during configuration deserialization';
          }
          bkHelper.clearStatus("Creating Spark context");
        });
      }).error(function(ret) {
        serviceBase = undefined;
        console.warn('Failed to obtain service base.', ret);
      });
    });

    $rootScope.$on('$destroy', function() {
      $.cometd.unsubscribe(appSubscription);
      $.cometd.unsubscribe(jobSubscription);
    });

    return {
      isAvailable: function() {
        return serviceBase != null;
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
      getError: function() {
        return $rootScope.error;
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
          var confReadResult = readConfiguration(ret, true);
          if (confReadResult.success) {
            console.log("done startSparkContext, port:", uiPort);
            $rootScope.connected = true;
            $rootScope.error = '';
            $rootScope.jobsPerCell = {};
          } else {
            $rootScope.connected = false;
            $rootScope.error = 'Error during configuration deserialization';
          }
          $rootScope.connecting = false;
          $rootScope.running = 0;
          bkHelper.clearStatus("Creating Spark context");
        }).error(function(ret) {
          if (ret == null) {
            // connection issue, Spark is just not available
            serviceBase = null;
            $rootScope.error = '';
          }
          else {
            // something erroneous happened
            console.error("SparkContext could not be started.", ret);
            $rootScope.error = 'ERROR';
          }
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
          $rootScope.error = '';
          bkHelper.clearStatus("Stopping Spark context");
        }).error(function(ret) {
          if (ret == null) {
            // connection issue, Spark is just not available
            serviceBase = null;
            $rootScope.error = '';
          }
          else {
            // something erroneous happened
            console.error("SparkContext could not be stopped.", ret);
            $rootScope.error = 'ERROR';
          }
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
          var obj = $rootScope.configurationObjects.advanced[key];
          config[obj.id] = obj.serializedValue();
        }
        for (var key in $rootScope.sparkConf) {
          config[key] = $rootScope.sparkConf[key];
        }
        return config;
      },
      sparkConf: function() {
        return $rootScope.sparkConf;
      },
      setSparkConf: function(conf) {
        $rootScope.sparkConf = conf;
      },
      setSparkConfProperty: function(key, value) {
        $rootScope.sparkConf[key] = value;
      },
      getJobsPerCell: function(cellId) {
        if (cellId in $rootScope.jobsPerCell)
          return $rootScope.jobsPerCell[cellId];
        return null;
      },
      setJobsPerCell: function(cellId, jobs) {
        $rootScope.jobsPerCell[cellId] = jobs;
      },
      registerCell: function(cellId) {
        $rootScope.jobsPerCell[cellId] = [];
        $rootScope.activeCell = cellId;
      }
    };
  });
})();
