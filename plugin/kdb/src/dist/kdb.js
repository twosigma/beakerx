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
 * Kdb evaluator plugin.
 */
define(function(require, exports, module) {
  'use strict';
  var PLUGIN_ID = "Kdb";
  var PLUGIN_NAME = "Kdb";
  var COMMAND = "kdb/kdbPlugin";
  var serviceBase = null;
  var cometdUtil = bkHelper.getUpdateService();
  var kdbCancelFunction = null;
  
  var KDB = {
    pluginName: PLUGIN_NAME,
    cmMode: "q",
    background: "#C0CFF0",
    bgColor: "#005e99",
    fgColor: "#FFFFFF",
    borderColor: "",
    shortName: "K",
    tooltip: "Kdb is a high-performance column-store database with a built-in query and programming language, q.",
    newShell: function(shellId, cb, ecb) {
      if (!shellId) shellId = "";
      bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/rest/kdb/getShell"), { shellid: shellId, sessionId: bkHelper.getSessionId() })
        .success(cb)
        .error(function() {
          console.log("failed to create shell", arguments);
          ecb("failed to create shell");
        });
    },
    evaluate: function(code, modelOutput, refreshObj) {
      var deferred = Q.defer();
      
      if (kdbCancelFunction) {
        deferred.reject("An evaluation is already in progress");
        return deferred.promise;
      }

      var self = this;
      bkHelper.setupProgressOutput(modelOutput);
      
      kdbCancelFunction = function () {
        bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/rest/kdb/interrupt"), {shellID: self.settings.shellID})
        .success(function (ret) {
          console.log("done cancelExecution",ret);
        });
        bkHelper.setupCancellingOutput(modelOutput);
      }
      bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/rest/kdb/evaluate"), {shellID: self.settings.shellID, code: code })
      .success(function(ret) {
        var onEvalStatusUpdate = function(evaluation) {
          if (bkHelper.receiveEvaluationUpdate(modelOutput, evaluation, PLUGIN_NAME, self.settings.shellID)) {
            cometdUtil.unsubscribe(evaluation.update_id);
            kdbCancelFunction = null;
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
    autocomplete: function(code, cpos, cb) {
      var self = this;
      bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/rest/kdb/autocomplete"), {shellID: self.settings.shellID, code: code, caretPosition: cpos})
      .success(function(x) {
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
            console.log("'"+a+"' '"+b+"'");
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
      kdbCancelFunction = null;
      var self = this;
      bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/rest/kdb/exit"), { shellID: self.settings.shellID })
      .success(cb);
    },
    interrupt: function() {
      this.cancelExecution();
    },
    cancelExecution: function() {
      if (kdbCancelFunction) {
        kdbCancelFunction();
      }
    },
    spec: {},
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
      bkHelper.spinUntilReady(bkHelper.serverUrl(serviceBase + "/rest/kdb/ready")).then(function () {
        if (window.languageServiceBase == undefined) {
          window.languageServiceBase = {};
        }
        window.languageServiceBase[PLUGIN_NAME] = bkHelper.serverUrl(serviceBase + '/rest/kdb');
        if (window.languageUpdateService == undefined) {
          window.languageUpdateService = {};
        }
        window.languageUpdateService[PLUGIN_NAME] = cometdUtil;
        cometdUtil.init(PLUGIN_NAME, serviceBase);

        var kdbShell = function(settings, doneCallback, ecb) {
          var self = this;
          var setShellIdCB = function(id) {
            settings.shellID = id;
            self.settings = settings;
            if (doneCallback) {
              doneCallback(self);
            }
          };
          var newShellErrorCb = function(reason) {
            if (ecb) {
              ecb(reason);
            }
          };
          if (!settings.shellID) settings.shellID = "";
          this.newShell(settings.shellID, setShellIdCB, newShellErrorCb);
          this.perform = function(what) {
            var action = this.spec[what].action;
            return this[action]();
          };
        };
        kdbShell.prototype = KDB;
        shellReadyDeferred.resolve(kdbShell);
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
