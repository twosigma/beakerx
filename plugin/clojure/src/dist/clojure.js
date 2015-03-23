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
 * Clojure eval plugin
 * For creating and config evaluators that evaluate Clojure code and update code cell results.
 */
define(function(require, exports, module) {
  'use strict';
  var PLUGIN_NAME = "Clojure";
  var COMMAND = "clojure/clojurePlugin";
  var serviceBase = null;
  var cometdUtil = bkHelper.getUpdateService();
  var cancelFunction = null;

  var Clojure = {
      pluginName: PLUGIN_NAME,
      cmMode: "text/x-clojure",
      background: "#5881d8",
      bgColor: "#5881d8",
      fgColor: "#FFFFFF",
      borderColor: "",
      shortName: "Cj",
      newShell: function(shellId, cb) {
        if (!shellId) {
          shellId = "";
        }
        bkHelper.httpPost(serviceBase + "/rest/clojuresh/getShell", { shellId: shellId, sessionId: bkHelper.getSessionId() })
        .success(cb)
        .error(function() {
          console.log("failed to create shell", arguments);
        });
      },
      evaluate: function(code, modelOutput, refreshObj) {
        var deferred = Q.defer();
        var self = this;
        bkHelper.setupProgressOutput(modelOutput);

        $.ajax({
          type: "POST",
          datatype: "json",
          url: serviceBase + "/rest/clojuresh/evaluate",
          data: {shellId: self.settings.shellID, code: code}
        }).done(function(ret) {
          cancelFunction = function () {
            $.ajax({
              type: "POST",
              datatype: "json",
              url: serviceBase + "/rest/clojuresh/cancelExecution",
              data: {shellId: self.settings.shellID}
            }).done(function (ret) {
              console.log("done cancelExecution",ret);
            });
            bkHelper.setupCancellingOutput(modelOutput);
          }
          var onEvalStatusUpdate = function(evaluation) {
            if (bkHelper.receiveEvaluationUpdate(modelOutput, evaluation, PLUGIN_NAME, self.settings.shellID)) {
              cometdUtil.unsubscribe(evaluation.update_id);
              cancelFunction = null;
              if (evaluation.status === "ERROR")
                deferred.reject(evaluation.payload);
              else
                deferred.resolve(evaluation.payload);
            }
            if (refreshObj !== undefined)
              refreshObj.outputRefreshed();
            else
              bkHelper.refreshRootScope();
          };
          onEvalStatusUpdate(ret);
          if (ret.update_id) {
            cometdUtil.subscribe(ret.update_id, onEvalStatusUpdate);
          }
        });
        return deferred.promise;
      },
      interrupt: function() {
        this.cancelExecution();
      },
      cancelExecution: function () {
        if (cancelFunction) {
          cancelFunction();
        }
      },
      resetEnvironment: function () {
        $.ajax({
          type: "POST",
          datatype: "json",
          url: serviceBase + "/rest/clojuresh/resetEnvironment",
          data: {shellId: this.settings.shellID}
        }).done(function (ret) {
          console.log("done resetEnvironment",ret);
        });
      },
      killAllThreads: function () {
        $.ajax({
          type: "POST",
          datatype: "json",
          url: serviceBase + "/rest/clojuresh/killAllThreads",
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
          url: serviceBase + "/rest/clojuresh/autocomplete",
          data: {shellId: self.settings.shellID, code: code, caretPosition: cpos}
        }).done(function(x) {
          cb(x, undefined, false);
        });
      },
      exit: function(cb) {
        var self = this;
        $.ajax({
          type: "POST",
          datatype: "json",
          url: serviceBase + "/rest/clojuresh/exit",
          data: { shellId: self.settings.shellID }
        }).done(cb);
      },
      updateShell: function (cb) {
        var p = bkHelper.httpPost(serviceBase + "/rest/clojuresh/setShellOptions", {
          shellId: this.settings.shellID
        });
        if (cb) {
          p.success(cb);
        }
      },
      spec: {
        resetEnv:    {type: "action", action: "resetEnvironment", name: "Reset Environment" },
        killAllThr:  {type: "action", action: "killAllThreads", name: "Kill All Threads" }
      },
      cometdUtil: cometdUtil
  };
  var shellReadyDeferred = bkHelper.newDeferred();

  var init = function() {
    bkHelper.locatePluginService(PLUGIN_NAME, {
      command: COMMAND,
      startedIndicator: "Server started",
      waitfor: "Started SelectChannelConnector",
      recordOutput: "true"
    }).success(function(ret) {
      serviceBase = ret;
      if (window.languageServiceBase == undefined) {
        window.languageServiceBase = {};
      }
      window.languageServiceBase[PLUGIN_NAME] = serviceBase + '/rest/clojuresh';
      if (window.languageUpdateService == undefined) {
        window.languageUpdateService = {};
      }
      window.languageUpdateService[PLUGIN_NAME] = cometdUtil;
      cometdUtil.init(PLUGIN_NAME, serviceBase);

      var clojureshell = function(settings, doneCB) {
        var self = this;
        var setShellIdCB = function(id) {
          settings.shellID = id;
          self.settings = settings;
          var cb = function() {
            if (doneCB) {
              doneCB(self);
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
      clojureshell.prototype = Clojure;
      shellReadyDeferred.resolve(clojureshell);
    }).error(function() {
      console.log("failed to locate plugin service", PLUGIN_NAME, arguments);
      shellReadyDeferred.reject("failed to locate plugin service");
    });
  };
  init();

  exports.getEvaluatorFactory = function() {
    return shellReadyDeferred.promise.then(function(shell) {
      return {
        create: function(settings) {
          var deferred = bkHelper.newDeferred();
          new shell(settings, function(shell) {
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
