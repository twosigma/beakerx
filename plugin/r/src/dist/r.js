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
 * R eval plugin
 * For creating and config evaluators that evaluate R code and update code cell results.
 */
define(function(require, exports, module) {
  'use strict';
  var PLUGIN_NAME = "R";
  var COMMAND = "r/rPlugin";
  var serviceBase = null;
  var cometdUtil = bkHelper.getUpdateService();
  var RCancelFunction = null;
  
  var R = {
    pluginName: PLUGIN_NAME,
    cmMode: "r",
    background: "#C0CFF0",
    bgColor: "#8495BB",
    fgColor: "#FFFFFF",
    borderColor: "",
    shortName: "R",
    newShell: function(shellID, cb) {
      if (!shellID)
        shellID = "";
      bkHelper.httpPost(serviceBase + "/rest/rsh/getShell", { shellid: shellID, sessionId: bkHelper.getSessionId() })
        .success(cb)
        .error(function() {
          console.log("failed to create shell", arguments);
        });
    },
    evaluate: function(code, modelOutput, refreshObj) {
      var deferred = Q.defer();
      
      if (RCancelFunction) {
        deferred.reject("An evaluation is already in progress");
        return deferred.promise;
      }

      var self = this;
      bkHelper.setupProgressOutput(modelOutput);
      
      RCancelFunction = function () {
        $.ajax({
          type: "POST",
          datatype: "json",
          url: serviceBase + "/rest/rsh/interrupt",
          data: {shellID: self.settings.shellID}
        }).done(function (ret) {
          console.log("done cancelExecution",ret);
        });
        bkHelper.setupCancellingOutput(modelOutput);
      }
      $.ajax({
        type: "POST",
        datatype: "json",
        url: serviceBase + "/rest/rsh/evaluate",
        data: {shellID: self.settings.shellID, code: code }
      }).done(function(ret) {
        var onEvalStatusUpdate = function(evaluation) {
          if (bkHelper.receiveEvaluationUpdate(modelOutput, evaluation, PLUGIN_NAME, self.settings.shellID)) {
            cometdUtil.unsubscribe(evaluation.update_id);
            deferred.resolve();
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
      deferred.promise.finally(function () {
        RCancelFunction = null;
      });
      return deferred.promise;
    },
    autocomplete: function(code, cpos, cb) {
      var self = this;
      $.ajax({
        type: "POST",
        datatype: "json",
        url: serviceBase + "/rest/rsh/autocomplete",
        data: {shellID: self.settings.shellID, code: code, caretPosition: cpos}
      }).done(function(x) {
            cb(x);
          });
    },
    exit: function(cb) {
      this.cancelExecution();
      RCancelFunction = null;
      var self = this;
      $.ajax({
        type: "POST",
        datatype: "json",
        url: serviceBase + "/rest/rsh/exit",
        data: { shellID: self.settings.shellID }
      }).done(cb);
    },
    interrupt: function() {
      this.cancelExecution();
    },
    cancelExecution: function() {
      if (RCancelFunction) {
        RCancelFunction();
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
      window.languageServiceBase[PLUGIN_NAME] = serviceBase + '/rest/rsh';
      if (window.languageUpdateService == undefined) {
        window.languageUpdateService = {};
      }
      window.languageUpdateService[PLUGIN_NAME] = cometdUtil;
      cometdUtil.init(PLUGIN_NAME, serviceBase);

      var RShell = function(settings, doneCB) {
        var self = this;
        var setShellIdCB = function(id) {
          settings.shellID = id;
          self.settings = settings;
          if (doneCB) {
            doneCB(self);
          }
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
      RShell.prototype = R;
      shellReadyDeferred.resolve(RShell);
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
