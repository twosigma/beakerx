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
  var PLUGIN_ID = "Groovy";
  var PLUGIN_NAME = "Groovy";
  var COMMAND = "groovy/groovyPlugin";
  var serviceBase = null;
  var cometdUtil = bkHelper.getUpdateService();
  var GroovyCancelFunction = null;

  var Groovy = {
    pluginName: PLUGIN_NAME,
    cmMode: "groovy",
    background: "#E0FFE0",
    bgColor: "#6497A9",
    fgColor: "#FFFFFF",
    borderColor: "",
    shortName: "Gv",
    tooltip: "Groovy is the language that deserves the name JavaScript.",
    newShell: function(shellId, cb, ecb) {
      if (!shellId)
        shellId = "";
      bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/rest/groovysh/getShell"), { shellId: shellId, sessionId: bkHelper.getSessionId() })
          .success(cb)
          .error(function() {
            console.log("failed to create shell", arguments);
            ecb("failed to create shell");
          });
    },
    evaluate: function(code, modelOutput, refreshObj) {
      var deferred = Q.defer();
      
      if (GroovyCancelFunction) {
        deferred.reject();
        return deferred.promise;
      }
      
      var self = this;
      bkHelper.setupProgressOutput(modelOutput);
      bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/rest/groovysh/evaluate"), {shellId: self.settings.shellID, code: code})
      .success(function(ret) {
        GroovyCancelFunction = function () {
          bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/rest/groovysh/cancelExecution"), {shellId: self.settings.shellID})
          .success(function (ret) {
            console.log("done cancelExecution",ret);
          });
          bkHelper.setupCancellingOutput(modelOutput);
        }
        var onEvalStatusUpdate = function(evaluation) {
          if (evaluation.status === "ERROR" && evaluation.payload != null){
            evaluation.payload = _.escape(evaluation.payload);
            var stacktraceInd = evaluation.payload.indexOf("\n	at");
            if (stacktraceInd < 0) { stacktraceInd = evaluation.payload.length; }
            var shortError = evaluation.payload.substring(0, stacktraceInd + 1);
            shortError = shortError.replace(/\n/g, "<br/>");
            evaluation.payload = shortError +
              (stacktraceInd < evaluation.payload.length ? evaluation.payload.substring(stacktraceInd) : "");
          }
          if (bkHelper.receiveEvaluationUpdate(modelOutput, evaluation, PLUGIN_NAME, self.settings.shellID)) {
            cometdUtil.unsubscribe(evaluation.update_id);
            GroovyCancelFunction = null;
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
      if (GroovyCancelFunction) {
        GroovyCancelFunction();
      }
    },
    resetEnvironment: function () {
      var deferred = bkHelper.newDeferred();
      bkHelper.asyncCallInLanguageManager({
        url: bkHelper.serverUrl(serviceBase + "/rest/groovysh/resetEnvironment"),
        data: {shellId: this.settings.shellID},
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
    killAllThreads: function () {
      bkHelper.asyncCallInLanguageManager({
        url: bkHelper.serverUrl(serviceBase + "/rest/groovysh/killAllThreads"),
        data: {shellId: this.settings.shellID},
        pluginName: PLUGIN_NAME
      });
    },
    autocomplete: function(code, cpos, cb) {
      var self = this;
      bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/rest/groovysh/autocomplete"), {shellId: self.settings.shellID, code: code, caretPosition: cpos})
      .success(function(x) {
        cb(x, undefined, true);
      });
    },
    getAutocompleteDocumentation: function(matchedWord, callback) {
      bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/rest/groovysh/autocompleteDocumentation"), {match: matchedWord})
        .success(function(documentation) {
          callback(documentation);
      });
    },
    exit: function(cb) {
      var self = this;
      this.cancelExecution();
      GroovyCancelFunction = null;
      bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/rest/groovysh/exit"), { shellId: self.settings.shellID })
      .success(cb);
    },
    updateShell: function (cb) {
      bkHelper.showLanguageManagerSpinner(PLUGIN_NAME);
      bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/rest/groovysh/setShellOptions"), {
        shellId: this.settings.shellID,
        classPath: this.settings.classPath,
        imports: this.settings.imports,
        outdir: this.settings.outdir})
      .success(function() {
        if (cb && _.isFunction(cb)) {
          cb();
        }
        bkHelper.hideLanguageManagerSpinner();
      })
      .error(function(err) {
        bkHelper.hideLanguageManagerSpinner(err);
        bkHelper.show1ButtonModal('ERROR: ' + err, PLUGIN_NAME + ' restart failed');
      });
    },
    spec: {
      outdir:      {type: "settableString", action: "updateShell", name: "Dynamic classes directory"},
      classPath:   {type: "settableString", action: "updateShell", name: "Class path (jar files, one per line)"},
      imports:     {type: "settableString", action: "updateShell", name: "Imports (classes, one per line)"},
      reset:    {type: "action", action: "resetEnvironment", name: "Reset Environment" },
      killAllThr:  {type: "action", action: "killAllThreads", name: "Kill All Threads" }
    },
    cometdUtil: cometdUtil
  };
  var defaultImports = [
    "graxxia.*",
    "java.util.concurrent.TimeUnit",
    "com.twosigma.beaker.NamespaceClient",
    "com.twosigma.beaker.BeakerProgressUpdate",
    "com.twosigma.beaker.chart.Color",
    "com.twosigma.beaker.chart.GradientColor",
    "com.twosigma.beaker.chart.legend.*",
    "com.twosigma.beaker.chart.Filter",
    "com.twosigma.beaker.chart.xychart.*",
    "com.twosigma.beaker.chart.xychart.plotitem.*",
    "com.twosigma.beaker.chart.categoryplot.*",
    "com.twosigma.beaker.chart.categoryplot.plotitem.*",
    "com.twosigma.beaker.chart.histogram.*",
    "com.twosigma.beaker.chart.treemap.*",
    "com.twosigma.beaker.chart.treemap.util.*",
    "net.sf.jtreemap.swing.*",
    "com.twosigma.beaker.chart.heatmap.HeatMap",
    "com.twosigma.beaker.chart.KeyboardCodes",
    "com.twosigma.beaker.jvm.object.*",
    "com.twosigma.beaker.easyform.*",
    "com.twosigma.beaker.easyform.formitem.*",
    "com.twosigma.beaker.table.*",
    "com.twosigma.beaker.table.format.*",
    "com.twosigma.beaker.table.renderer.*",
    "com.twosigma.beaker.table.highlight.*"];
  var shellReadyDeferred = bkHelper.newDeferred();
  
  var init = function() {
    bkHelper.locatePluginService(PLUGIN_ID, {
      command: COMMAND,
      waitfor: "Started SelectChannelConnector",
      recordOutput: "true"
    }).success(function(ret) {
      serviceBase = ret;
      bkHelper.spinUntilReady(bkHelper.serverUrl(serviceBase + "/rest/groovysh/ready")).then(function () {
        if (window.languageServiceBase == undefined) {
          window.languageServiceBase = {};
        }
        window.languageServiceBase[PLUGIN_NAME] = bkHelper.serverUrl(serviceBase + '/rest/groovysh');
        if (window.languageUpdateService == undefined) {
          window.languageUpdateService = {};
        }
        window.languageUpdateService[PLUGIN_NAME] = cometdUtil;
        cometdUtil.init(PLUGIN_NAME, serviceBase);

        var GroovyShell = function(settings, doneCB, ecb) {
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
            // XXX should use promise cb to avoid silent failure
            return this[action]();
          };
        };
        GroovyShell.prototype = Groovy;
        shellReadyDeferred.resolve(GroovyShell);
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
