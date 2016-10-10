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
  var PLUGIN_ID = "R";
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
    tooltip: "GNU R is a language for statistical computing and graphics.",
    newShell: function(shellID, cb, ecb) {
      if (!shellID)
        shellID = "";
      bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/rest/rsh/getShell"), { shellid: shellID, sessionId: bkHelper.getSessionId() })
        .success(cb)
        .error(function() {
          console.log("failed to create shell", arguments);
          ecb("failed to create shell");
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
        bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/rest/rsh/interrupt"), {shellID: self.settings.shellID}).success(function (ret) {
          console.log("done cancelExecution",ret);
        });
        bkHelper.setupCancellingOutput(modelOutput);
      }
      bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/rest/rsh/evaluate"), {shellID: self.settings.shellID, code: code }).success(function(ret) {
        var onEvalStatusUpdate = function(evaluation) {
          if (bkHelper.receiveEvaluationUpdate(modelOutput, evaluation, PLUGIN_NAME, self.settings.shellID)) {
            cometdUtil.unsubscribe(evaluation.update_id);
            RCancelFunction = null;
            if (evaluation.status === "ERROR")
              deferred.reject(evaluation.payload);
            else
              deferred.resolve(evaluation.jsonres !== undefined ? evaluation.jsonres : evaluation.payload);
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
    autocomplete: function(code, cpos, cb) {
      var self = this;
      bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/rest/rsh/autocomplete"), {shellID: self.settings.shellID, code: code, caretPosition: cpos}).success(function(x) {
        var matchedText = undefined;
        if (x !== undefined) {
          var i, shortest;
          shortest = undefined;
          for (i=0; i<x.length; i++) {
            if (shortest === undefined || shortest.length > x[1].length)
              shortest = x[i];            
          }
          for (i=shortest.length; i>0; i--) {
            var a = code.substring(cpos-i,cpos);
            var b = shortest.substring(0,i);
            if (a === b)
              break;
          }
          if (i>0)
            matchedText = shortest.substring(0,i);
          else if(code.charAt(cpos-1) === '(') {
            for (i=0; i<x.length; i++) {
              x[i] = '(' + x[i];
            }
          } else if(code.charAt(cpos-1) === ',') {
            for (i=0; i<x.length; i++) {
              x[i] = ',' + x[i];
            }
          } else if(code.charAt(cpos-1) === ' ') {
            for (i=0; i<x.length; i++) {
              x[i] = ' ' + x[i];
            }
          }
        }
        cb(x, matchedText, false);
      });
    },
    exit: function(cb) {
      this.cancelExecution();
      RCancelFunction = null;
      var self = this;
      bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/rest/rsh/exit"), { shellID: self.settings.shellID }).success(cb);
    },
    resetEnvironment: function () {
      var deferred = bkHelper.newDeferred();
      var self = this;
      bkHelper.asyncCallInLanguageManager({
        url: bkHelper.serverUrl(serviceBase + "/rest/rsh/resetEnvironment"),
        data: {shellID: self.settings.shellID},
        pluginName: PLUGIN_NAME,
        onSuccess: function (data) {
          deferred.resolve();
        },
        onFail: function (err) {
          deferred.reject(err);
        }
      });
      return deferred.promise;
    },
    interrupt: function () {
      this.cancelExecution();
    },
    cancelExecution: function() {
      if (RCancelFunction) {
        RCancelFunction();
      }
    },
    spec: {
      reset: {type: "action", action: "resetEnvironment", name: "Reset Environment"}
    },
    cometdUtil: cometdUtil
  };
  var shellReadyDeferred = bkHelper.newDeferred();
  
  var init = function() {
    bkHelper.locatePluginService(PLUGIN_ID, {
        command: COMMAND,
        waitfor: "Started SelectChannelConnector",
        recordOutput: "true"
    }).success(function(ret) {
      serviceBase = ret;
      bkHelper.spinUntilReady(bkHelper.serverUrl(serviceBase + "/rest/rsh/ready")).then(function () {
        if (window.languageServiceBase == undefined) {
          window.languageServiceBase = {};
        }
        window.languageServiceBase[PLUGIN_NAME] = bkHelper.serverUrl(serviceBase + '/rest/rsh');
        if (window.languageUpdateService == undefined) {
          window.languageUpdateService = {};
        }
        window.languageUpdateService[PLUGIN_NAME] = cometdUtil;
        cometdUtil.init(PLUGIN_NAME, serviceBase);

        var RShell = function(settings, doneCB, ecb) {
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
          var newShellErrorCb = function(reason) {
            if (ecb) {
              ecb(reason);
            }
          };
          this.newShell(settings.shellID, setShellIdCB, newShellErrorCb);
          this.perform = function(what) {
            var action = this.spec[what].action;
            return this[action]();
          };
        };
        RShell.prototype = R;
        shellReadyDeferred.resolve(RShell);
      }, function () {
        console.log("plugin service failed to become ready", PLUGIN_NAME, arguments);
        shellReadyDeferred.reject("plugin service failed to become ready");
      });
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
          }, function(reason) {
            deferred.reject(reason);
          });
          return deferred.promise;
        }
      };
    },
    function(err) { return err; });
  };

  exports.name = PLUGIN_NAME;
});
