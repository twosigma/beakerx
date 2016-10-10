/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the 'License');
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an 'AS IS' BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
/**
 * Cpp eval plugin
 * For creating and config evaluators that compile and/or evaluate C/C++ code and update code cell results.
 */
define(function(require, exports, module) {
  'use strict';
  var PLUGIN_ID = 'cpp';
  var PLUGIN_NAME = 'C++';
  var COMMAND = 'cpp/cppPlugin';
  var serviceBase = null;
  var cometdUtil = bkHelper.getUpdateService();
  var CppCancelFunction = null;

  var CppSh = {
    pluginName: PLUGIN_NAME,
    cmMode: 'text/x-c++src',
    background: '#4757B8',
    bgColor: '#4757B8',
    fgColor: '#FFFFFF',
    borderColor: '',
    shortName: 'C',
    tooltip: "C++ is the object-oriented version of the venerable systems programming language.",
    newShell: function(shellId, cb, ecb) {
      if (!shellId) {
        shellId = '';
      }
      bkHelper.httpPost(bkHelper.serverUrl(serviceBase + '/rest/cpp/getShell'), {shellId: shellId,sessionId: bkHelper.getSessionId()})
      .success(cb)
      .error(function() {
        console.log('failed to create shell', arguments);
          ecb("failed to create shell");
      });
    },
    evaluate: function(code, modelOutput, refreshObj, cellId) {
      var deferred = Q.defer();

      if (CppCancelFunction) {
        deferred.reject('An evaluation is already in progress');
        return deferred.promise;
      }

      var self = this;
      bkHelper.setupProgressOutput(modelOutput);
      bkHelper.httpPost(bkHelper.serverUrl(serviceBase + '/rest/cpp/evaluate'), {shellId: self.settings.shellID, cellId: cellId,code: code}).success(function(ret) {
        CppCancelFunction = function() {
          bkHelper.httpPost(bkHelper.serverUrl(serviceBase + '/rest/cpp/cancelExecution'), {shellId: self.settings.shellID});
          bkHelper.setupCancellingOutput(modelOutput);
        }
        var onEvalStatusUpdate = function(evaluation) {
          if (bkHelper.receiveEvaluationUpdate(modelOutput, evaluation, PLUGIN_NAME, self.settings.shellID)) {
            cometdUtil.unsubscribe(evaluation.update_id);
            CppCancelFunction = null;
            if (evaluation.status === 'ERROR') {
              deferred.reject(evaluation.payload);
            } else {
              deferred.resolve(evaluation.payload);
            }
          }
          if (refreshObj !== undefined) {
            refreshObj.outputRefreshed();
          } else {
            bkHelper.refreshRootScope();
          }
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
    cancelExecution: function() {
      if (CppCancelFunction) {
        CppCancelFunction();
      }
    },
    resetEnvironment: function() {
      var deferred = bkHelper.newDeferred();
      bkHelper.httpPost(bkHelper.serverUrl(serviceBase + '/rest/cpp/resetEnvironment'), {shellId: this.settings.shellID})
      .success(function () {
        deferred.resolve();
      }).error(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    },
    killAllThreads: function() {
      bkHelper.httpPost(bkHelper.serverUrl(serviceBase + '/rest/cpp/killAllThreads'), {shellId: this.settings.shellID});
    },
    autocomplete: function(code, cpos, cb) {
      var self = this;
      bkHelper.httpPost(bkHelper.serverUrl(serviceBase + '/rest/cpp/autocomplete'), {shellId: self.settings.shellID, code: code, caretPosition: cpos})
      .success(function(x) {
        cb(x, undefined, true);
      });
    },
    exit: function(cb) {
      var self = this;
      this.cancelExecution();
      CppCancelFunction = null;
      bkHelper.httpPost(bkHelper.serverUrl(serviceBase + '/rest/cpp/exit'), {shellId: self.settings.shellID}).success(cb);
    },
    updateShell: function(cb) {
      bkHelper.showLanguageManagerSpinner(PLUGIN_NAME);
      bkHelper.httpPost(bkHelper.serverUrl(serviceBase + '/rest/cpp/setShellOptions'), {
        shellId: this.settings.shellID,
        flags: this.settings.flags
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
      flags:       {type: 'settableString', action: 'updateShell', name: 'Compiler flags'},
      reset:    {type: 'action', action: 'resetEnvironment', name: 'Reset Environment'},
      killAllThr:  {type: 'action', action: 'killAllThreads', name: 'Kill All Threads'}
    },
    cometdUtil: cometdUtil
  };
  var defaultImports = [];
  var shellReadyDeferred = bkHelper.newDeferred();

  var init = function() {
    bkHelper.locatePluginService(PLUGIN_ID, {
      command: COMMAND,
      waitfor: 'Started SelectChannelConnector',
      recordOutput: 'true'
    }).success(function(ret) {
      serviceBase = ret;
      bkHelper.spinUntilReady(bkHelper.serverUrl(serviceBase + '/rest/cpp/ready')).then(function() {
        if (window.languageServiceBase == undefined) {
          window.languageServiceBase = {};
        }
        window.languageServiceBase[PLUGIN_NAME] = bkHelper.serverUrl(serviceBase + '/rest/cpp');
        if (window.languageUpdateService == undefined) {
          window.languageUpdateService = {};
        }
        window.languageUpdateService[PLUGIN_NAME] = cometdUtil;
        cometdUtil.init(PLUGIN_NAME, serviceBase);

        var CppShell = function(settings, doneCB, ecb) {
          var self = this;
          var setShellIdCB = function(id) {
            settings.shellID = id;
            self.settings = settings;
            var imports = [];
            if ('imports' in self.settings) {
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
            settings.shellID = '';
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
        CppShell.prototype = CppSh;
        shellReadyDeferred.resolve(CppShell);
      }, function() {
        console.log('plugin service failed to become ready', PLUGIN_NAME, arguments);
        shellReadyDeferred.reject('plugin service failed to become ready');
      });
    }).error(function() {
      console.log('failed to locate plugin service', PLUGIN_NAME, arguments);
      shellReadyDeferred.reject('failed to locate plugin service');
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
