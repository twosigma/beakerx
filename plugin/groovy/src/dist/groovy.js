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
 * Groovy eval plugin
 * For creating and config evaluators that evaluate Groovy code and update code cell results.
 */
define(function(require, exports, module) {
  'use strict';
  var PLUGIN_NAME = "Groovy";
  var COMMAND = "groovy/groovyPlugin";

  var serviceBase = null;
  var subscriptions = {};

  var cometd = new $.Cometd();
  var initialized = false;
  var cometdUtil = {
    init: function() {
      if (!initialized) {
        cometd.unregisterTransport("websocket");
        cometd.init(serviceBase + "/cometd");
        initialized = true;
      }
    },
    subscribe: function(update_id, callback) {
      if (!update_id) {
        return;
      }
      if (subscriptions[update_id]) {
        cometd.unsubscribe(subscriptions[update_id]);
        subscriptions[update_id] = null;
      }
      var cb = function(ret) {
        callback(ret.data);
      };
      var s = cometd.subscribe('/object_update/' + update_id, cb);
      subscriptions[update_id] = s;
    },
    unsubscribe: function(update_id) {
      if (!update_id) {
        return;
      }
      if (subscriptions[update_id]) {
        cometd.unsubscribe(subscriptions[update_id]);
        subscriptions[update_id] = null;
      }
    },
    addStatusListener: function(cb) {
      cometd.addListener("/meta/connect", cb);
    }
  };
  var GroovyCancelFunction = null;
  var Groovy = {
    pluginName: PLUGIN_NAME,
    cmMode: "groovy",
    background: "#E0FFE0",
    bgColor: "#6497A9",
    fgColor: "#FFFFFF",
    borderColor: "",
    shortName: "Gv",
    newShell: function(shellId, cb) {
      if (!shellId) {
        shellId = "";
      }
      bkHelper.httpPost(serviceBase + "/rest/groovysh/getShell", { shellId: shellId, sessionId: bkHelper.getSessionId() })
          .success(cb)
          .error(function() {
            console.log("failed to create shell", arguments);
          });
    },
    evaluate: function(code, modelOutput) {
      var deferred = Q.defer();
      var self = this;
      var progressObj = {
        type: "BeakerDisplay",
        innertype: "Progress",
        object: {
          message: "submitting ...",
          startTime: new Date().getTime()
        }
      };
      modelOutput.result = progressObj;
      $.ajax({
        type: "POST",
        datatype: "json",
        url: serviceBase + "/rest/groovysh/evaluate",
        data: {shellId: self.settings.shellID, code: code}
      }).done(function(ret) {
        GroovyCancelFunction = function () {
          $.ajax({
            type: "POST",
            datatype: "json",
            url: serviceBase + "/rest/groovysh/cancelExecution",
            data: {shellId: self.settings.shellID}
          }).done(function (ret) {
            console.log("done cancelExecution",ret);
          });
          progressObj.object.message = "cancelling...";
          modelOutput.result = progressObj;
        }
        var onUpdatableResultUpdate = function(update) {
          modelOutput.result = update;
          bkHelper.refreshRootScope();
        };
        var onEvalStatusUpdate = function(evaluation) {
          modelOutput.result.status = evaluation.status;
          if (evaluation.status === "FINISHED") {
            cometdUtil.unsubscribe(evaluation.update_id);
            modelOutput.result = evaluation.result;
            if (evaluation.result.update_id) {
              cometdUtil.subscribe(evaluation.result.update_id, onUpdatableResultUpdate);
            }
            modelOutput.elapsedTime = new Date().getTime() - progressObj.object.startTime;
            deferred.resolve();
          } else if (evaluation.status === "ERROR") {
            cometdUtil.unsubscribe(evaluation.update_id);
            modelOutput.result = {
              type: "BeakerDisplay",
              innertype: "Error",
              object: evaluation.result
            };
            modelOutput.elapsedTime = new Date().getTime() - progressObj.object.startTime;
            deferred.resolve();
          } else if (evaluation.status === "RUNNING") {
            if(evaluation.result !== undefined) {
              if(evaluation.result === Object(evaluation.result)) {
                modelOutput.result.object.message = evaluation.result.message;
                modelOutput.result.object.progressBar = evaluation.result.progressBar;
                modelOutput.result.object.payload = evaluation.result.payload;
              } else {
                modelOutput.result.object.message = evaluation.result;
              }
            } else {
              modelOutput.result.object.message = "evaluating ...";
            }
          }
          bkHelper.refreshRootScope();
        };
        onEvalStatusUpdate(ret);
        if (ret.update_id) {
          cometdUtil.subscribe(ret.update_id, onEvalStatusUpdate);
        }
      });
      deferred.promise.finally(function () {
        GroovyCancelFunction = null;
      });
      return deferred.promise;
    },
    interrupt: function() {
      this.cancelExecution();
    },
    cancelExecution: function () {
      if (GroovyCancelFunction) {
        GroovyCancelFunction();
      }
    },
    resetEnvironment: function () {
      $.ajax({
        type: "POST",
        datatype: "json",
        url: serviceBase + "/rest/groovysh/resetEnvironment",
        data: {shellId: this.settings.shellID}
      }).done(function (ret) {
        console.log("done resetEnvironment",ret);
      });
    },
    killAllThreads: function () {
      $.ajax({
        type: "POST",
        datatype: "json",
        url: serviceBase + "/rest/groovysh/killAllThreads",
        data: {shellId: this.settings.shellID}
      }).done(function (ret) {
        console.log("done killAllThreads",ret);
      });
    },
    autocomplete: function(code, cpos, cb) {
      var self = this;
      $.ajax({
        type: "POST",
        datatype: "json",
        url: serviceBase + "/rest/groovysh/autocomplete",
        data: {shellId: self.settings.shellID, code: code, caretPosition: cpos}
      }).done(function(x) {
        cb(x, undefined, true);
      });
    },
    exit: function(cb) {
      var self = this;
      this.cancelExecution();
      GroovyCancelFunction = null;
      $.ajax({
        type: "POST",
        datatype: "json",
        url: serviceBase + "/rest/groovysh/exit",
        data: { shellId: self.settings.shellID }
      }).done(cb);
    },
    updateShell: function (cb) {
      bkHelper.httpPost(serviceBase + "/rest/groovysh/setShellOptions", {
        shellId: this.settings.shellID,
        classPath: this.settings.classPath,
        imports: this.settings.imports,
        outdir: this.settings.outdir}).success(cb);
    },
    spec: {
      outdir:    {type: "settableString", action: "updateShell", name: "Dynamic classes directory"},
      classPath: {type: "settableString", action: "updateShell", name: "Class path (jar files, one per line)"},
      imports:   {type: "settableString", action: "updateShell", name: "Imports (classes, one per line)"},
      resetEnv:  {type: "action", action: "resetEnvironment", name: "Reset Environment" },
      killAllThr:  {type: "action", action: "killAllThreads", name: "Kill All Threads" }
    },
    cometdUtil: cometdUtil
  };
  var defaultImports = [
    "com.twosigma.beaker.NamespaceClient",
    "com.twosigma.beaker.BeakerProgressUpdate",
    "com.twosigma.beaker.chart.Color",
    "com.twosigma.beaker.chart.xychart.*",
    "com.twosigma.beaker.chart.xychart.plotitem.*"];
  var shellReadyDeferred = bkHelper.newDeferred();
  var init = function() {
    bkHelper.locatePluginService(PLUGIN_NAME, {
      command: COMMAND,
      startedIndicator: "Server started",
      waitfor: "Started SelectChannelConnector",
      recordOutput: "true"
    }).success(function(ret) {
      serviceBase = ret;
      cometdUtil.init();
      var GroovyShell = function(settings, doneCB) {
        var self = this;
        var setShellIdCB = function(id) {
          if (id !== settings.shellID) {
            // console.log("A new Groovy shell was created.");
          }
          settings.shellID = id;
          self.settings = settings;
          var imports = [];
          if ("imports" in self.settings) {
            imports = self.settings.imports.split('\n');
          }
          self.settings.imports = _.union(imports, defaultImports).join('\n');
          var cb = function() {
            if (bkHelper.hasSessionId()) {
              var initCode = "import com.twosigma.beaker.NamespaceClient\n" +
                "beaker = NamespaceClient.getBeaker('" + bkHelper.getSessionId() + "')\n";
              self.evaluate(initCode, {}).then(function () {
                if (doneCB) {
                  doneCB(self);
                }});
            } else {
              if (doneCB) {
                doneCB(self);
              }
            }
          };
          self.updateShell(cb);
        };
        if (!settings.shellID) {
          settings.shellID = "";
        }
        this.newShell(settings.shellID, setShellIdCB);
        this.perform = function(what) {
          var action = this.spec[what].action;
          this[action]();
        };
      };
      GroovyShell.prototype = Groovy;
      shellReadyDeferred.resolve(GroovyShell);
    }).error(function() {
      console.log("failed to locate plugin service", PLUGIN_NAME, arguments);
      shellReadyDeferred.reject("failed to locate plugin service");
    });
  };
  init();

  exports.getEvaluatorFactory = function() {
    return shellReadyDeferred.promise.then(function(Shell) {
      return {
        create: function(settings) {
          var deferred = bkHelper.newDeferred();
          new Shell(settings, function(shell) {
            deferred.resolve(shell);
          });
          return deferred.promise;
        }
      };
    },
    function(err) { return err; });
  };

  exports.name = PLUGIN_NAME;
});
