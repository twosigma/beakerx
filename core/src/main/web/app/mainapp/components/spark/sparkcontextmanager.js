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

    var PLUGIN_ID = "Scala";
    var PLUGIN_NAME = "Scala";
    var COMMAND = "scala/scalaPlugin";
    var serviceBase = null;
    var uiPort = 4040;
    var shellId = undefined;

    var connected = false;
    var connecting = false;
    var disconnecting = false;
    var error = '';
    var running = 0;

    var sparkConf = null;

    var jobsPerCell = {};
    var activeCell = null;

    var executorIds = [];

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

    function responseContainsError(response) {
      return typeof response === "string" && response.toLowerCase().indexOf('error') >= 0;
    }

    var configurationObjects = {
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
        configurationObjects: jQuery.extend(true, {}, configurationObjects),
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
          configurationObjects = r.configurationObjects;
          uiPort = r.uiPort;
          sparkConf = r.sparkConf;
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
      bkHelper.locatePluginService(PLUGIN_ID, {
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
          running = 0;
          for (var index in progress.data.jobs) {
            running += progress.data.jobs[index].running ? 1 : 0;
          }
          if (activeCell != null) {
            var jobs = [];
            for (var jindex in progress.data.jobs) {
              var j = progress.data.jobs[jindex];
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
            jobsPerCell[activeCell] = jobs;
          }          
          executorIds = progress.data.executorIds;
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
            connecting = false;
            connected = true;
            running = 0;
            console.log("SparkContext already started, port:", uiPort);
          } else {
            connecting = false;
            connected = false;
            running = 0;

            if (responseContainsError(ret))
              error = ret;
            else
              error = 'Error during configuration deserialization';
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
        return connecting;
      },
      isDisconnecting: function() {
        return disconnecting;
      },
      isFailing: function() {
        return error.length > 0;
      },
      isConnected: function() {
        return connected;
      },
      runningJobs: function() {
        return running;
      },
      isRunning: function() {
        return running > 0;
      },
      getError: function() {
        return error;
      },
      connect: function() {
        if (connected)
          return;

        bkHelper.showStatus(
          "Creating Spark context",
          bkHelper.serverUrl(serviceBase + "/rest/scalash/startSparkContext")
        );
        connecting = true;
        
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
            connected = true;
            error = '';
            jobsPerCell = {};
          } else {
            connected = false;
            if (responseContainsError(ret))
              error = ret;
            else
              error = 'Error during configuration deserialization';
          }
          connecting = false;
          running = 0;
          executorIds = [];
          bkHelper.clearStatus("Creating Spark context");

          // get Spark executor IDs
          bkHelper
            .httpGet(bkHelper.serverUrl(serviceBase + "/rest/scalash/sparkExecutorIds"))
            .success(function(ret) {
              if (ret instanceof Array)
                executorIds = ret;
              else
                console.warn("Error while deserializing Spark executor IDs. Given:", ret);
            })
            .error(function(ret) {
              console.warn("Error while retrieving Spark executor IDs:", ret);
            });
        }).error(function(ret) {
          if (ret == null) {
            // connection issue, Spark is just not available
            serviceBase = null;
            error = '';
          }
          else {
            // something erroneous happened
            console.error("SparkContext could not be started.", ret);
            if (responseContainsError(ret))
              error = ret;
            else
              error = 'Error: SparkContext could not be started.';
          }
          bkHelper.clearStatus("Creating Spark context");
          connecting = false;
          running = 0;
          executorIds = [];
        });
      },
      disconnect: function() {
        if (!connected)
          return;

        bkHelper.showStatus("Stopping Spark context");
        disconnecting = true;

        bkHelper.httpPost(
          bkHelper.serverUrl(serviceBase + "/rest/scalash/stopSparkContext"),
          {shellId: shellId}
        ).success(function(ret) {
          console.log("done stopSparkContext", ret);
          disconnecting = false;
          connected = false;
          running = 0;
          error = '';
          bkHelper.clearStatus("Stopping Spark context");
        }).error(function(ret) {
          if (ret == null) {
            // connection issue, Spark is just not available
            serviceBase = null;
            error = '';
          }
          else {
            // something erroneous happened
            console.error("SparkContext could not be stopped.", ret);
            if (responseContainsError(ret))
              error = ret;
            else
              error = 'Error: SparkContext could not be stopped.';
          }
          bkHelper.clearStatus("Stopping Spark context");
          disconnecting = false;
          running = 0;
        });
      },
      sparkUiUrl: function() {
        return 'http://' + window.location.hostname + ':' + uiPort;
      },
      openSparkUi: function() {
        if (!connected)
          return;
        var win = window.open(this.sparkUiUrl(), '_blank');
        win.focus();
      },
      configurationObjects: function() {
        return configurationObjects;
      },
      setConfigurationObjects: function(config) {
        configurationObjects = config;
      },
      configuration: function() {
        // serialize configuration objects to plain string dictionary
        var config = {};
        for (var key in configurationObjects) {
          if (key === 'advanced')
            continue;
          var obj = configurationObjects[key];
          config[obj.id] = obj.serializedValue();
        }
        for (var key in configurationObjects.advanced) {
          var obj = configurationObjects.advanced[key];
          config[obj.id] = obj.serializedValue();
        }
        for (var key in sparkConf) {
          config[key] = sparkConf[key];
        }
        return config;
      },
      sparkConf: function() {
        return sparkConf;
      },
      setSparkConf: function(conf) {
        sparkConf = conf;
      },
      setSparkConfProperty: function(key, value) {
        sparkConf[key] = value;
      },
      getJobsPerCell: function(cellId) {
        if (cellId in jobsPerCell)
          return jobsPerCell[cellId];
        return null;
      },
      setJobsPerCell: function(cellId, jobs) {
        jobsPerCell[cellId] = jobs;
      },
      registerCell: function(cellId) {
        jobsPerCell[cellId] = [];
        activeCell = cellId;
      },
      executorIds: function() {
        return executorIds;
      }
    };
  });
})();
