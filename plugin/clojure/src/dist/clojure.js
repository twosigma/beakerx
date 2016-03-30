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
  var servicePort = null;
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
      newShell: function(shellId, cb, ecb) {
        if (!shellId) {
          shellId = "";
        }
        bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/rest/clojuresh/getShell"), { shellId: shellId, sessionId: bkHelper.getSessionId() })
        .success(cb)
        .error(function() {
          console.log("failed to create shell", arguments);
          ecb("failed to create shell");
        });
      },
      evaluate: function(code, modelOutput, refreshObj) {
        var deferred = Q.defer();
        var self = this;
        bkHelper.setupProgressOutput(modelOutput);

        $.ajax({
          type: "POST",
          datatype: "json",
          url: bkHelper.serverUrl(serviceBase + "/rest/clojuresh/evaluate"),
          data: {shellId: self.settings.shellID, code: code}
        }).done(function(ret) {
          cancelFunction = function () {
            $.ajax({
              type: "POST",
              datatype: "json",
              url: bkHelper.serverUrl(serviceBase + "/rest/clojuresh/cancelExecution"),
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
        bkHelper.showLanguageManagerSpinner(PLUGIN_NAME);
        $.ajax({
          type: "POST",
          datatype: "json",
          url: bkHelper.serverUrl(serviceBase + "/rest/clojuresh/resetEnvironment"),
          data: {shellId: this.settings.shellID}
        }).done(function (ret) {
          bkHelper.hideLanguageManagerSpinner();
          console.log("done resetEnvironment", ret);
        }).fail(function(jqXHR, textStatus) {
          bkHelper.hideLanguageManagerSpinner(textStatus);
          console.error("Request failed: " + textStatus);
        });
      },
      killAllThreads: function () {
        bkHelper.showLanguageManagerSpinner(PLUGIN_NAME);
        $.ajax({
          type: "POST",
          datatype: "json",
          url: bkHelper.serverUrl(serviceBase + "/rest/clojuresh/killAllThreads"),
          data: {shellId: this.settings.shellID}
        }).done(function (ret) {
          bkHelper.hideLanguageManagerSpinner();
          console.log("done killAllThreads", ret);
        }).fail(function(jqXHR, textStatus) {
          bkHelper.hideLanguageManagerSpinner(textStatus);
          console.error("Request failed: " + textStatus);
        });
      },
      autocomplete: function(code, cpos, cb) {
        var self = this;
        $.ajax({
          type: "POST",
          datatype: "json",
          url: bkHelper.serverUrl(serviceBase + "/rest/clojuresh/autocomplete"),
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
          url: bkHelper.serverUrl(serviceBase + "/rest/clojuresh/exit"),
          data: { shellId: self.settings.shellID }
        }).done(cb);
      },
      updateShell: function (cb) {
        bkHelper.showLanguageManagerSpinner(PLUGIN_NAME);
        bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/rest/clojuresh/setShellOptions"), {
          shellId: this.settings.shellID,
          classPath: this.settings.classPath,
          imports: this.settings.imports,
          outdir: this.settings.outdir,
          requirements: this.settings.requirements
        }).success(function() {
          if (cb && _.isFunction(cb)) {
            cb();
          }
          bkHelper.hideLanguageManagerSpinner();
        }).error(function(err) {
          bkHelper.hideLanguageManagerSpinner(err);
          bkHelper.show1ButtonModal('ERROR: ' + err, PLUGIN_NAME + ' restart failed');
        });
      },
      spec: {
        classPath:   {type: "settableString", action: "updateShell", name: "Class path (jar files, one per line)"},
        imports:     {type: "settableString", action: "updateShell", name: "Imports (classes, one per line)"},
        outdir:      {type: "settableString", action: "updateShell", name: "Dynamic classes directory"},
        requirements:     {type: "settableString", action: "updateShell", name: "Require (Clojure libs, one per line)"},
        resetEnv:    {type: "action", action: "resetEnvironment", name: "Reset Environment" },
        killAllThr:  {type: "action", action: "killAllThreads", name: "Kill All Threads" }
      },
      cometdUtil: cometdUtil
  };

  var defaultImports = [
    "com.twosigma.beaker.chart.Color",
    "com.twosigma.beaker.chart.Filter",
    "com.twosigma.beaker.BeakerProgressUpdate",
    "com.twosigma.beaker.NamespaceClient"
   ];

  var shellReadyDeferred = bkHelper.newDeferred();

  var init = function() {
    bkHelper.locatePluginService(PLUGIN_NAME, {
      command: COMMAND,
      waitfor: "Started SelectChannelConnector",
      recordOutput: "true"
    }).success(function(ret) {
      serviceBase = ret.baseUrl;
      servicePort = ret.port;
      bkHelper.spinUntilReady(bkHelper.serverUrl(serviceBase + "/rest/clojuresh/ready")).then(function () {
        if (window.languageServiceBase == undefined) {
          window.languageServiceBase = {};
        }
        window.languageServiceBase[PLUGIN_NAME] = bkHelper.serverUrl(serviceBase + '/rest/clojuresh');
        if (window.languageUpdateService == undefined) {
          window.languageUpdateService = {};
        }
        window.languageUpdateService[PLUGIN_NAME] = cometdUtil;
        cometdUtil.init(PLUGIN_NAME, servicePort);

        var clojureshell = function(settings, doneCB, ecb) {
          var self = this;
          var setShellIdCB = function(id) {
            settings.shellID = id;
            self.settings = settings;
            var imports = [];
            if ("imports" in self.settings) {
              imports = self.settings.imports.split('\n');
            }
            self.settings.imports = _.union(imports, defaultImports).join('\n');
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
          var newShellErrorCb = function(reason) {
            if (ecb) {
              ecb(reason);
            }
          };
          this.newShell(settings.shellID, setShellIdCB, newShellErrorCb);
          this.perform = function(what) {
            var action = this.spec[what].action;
            this[action]();
          };
        };
        clojureshell.prototype = Clojure;
        shellReadyDeferred.resolve(clojureshell);
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
    return shellReadyDeferred.promise.then(function(shell) {
      return {
        create: function(settings) {
          var deferred = bkHelper.newDeferred();
          new shell(settings, function(shell) {
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
