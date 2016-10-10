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
 * SQL eval plugin
 * For creating and config evaluators that compile and/or evaluate SQL code and update code cell results.
 */
define(function(require, exports, module) {
  'use strict';
  var PLUGIN_ID = "SQL";
  var PLUGIN_NAME = "SQL";
  var COMMAND = "sqlsh/sqlshPlugin";
  var serviceBase = null;
  var cometdUtil = bkHelper.getUpdateService();
  var SqlShCancelFunction = null;
  
  var SqlSh = {
    pluginName: PLUGIN_NAME,
    cmMode: "text/x-sql",
    background: "#E0FFE0",
    bgColor: "##F8981C",
    fgColor: "#FFFFFF",
    borderColor: "",
    shortName: "Sq",
    tooltip: "SQL is one of the oldest and most common database query languages.",
    newShell: function(shellId, cb, ecb) {
      if (!shellId)
        shellId = "";
      bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/rest/sqlsh/getShell"), { shellId: shellId, sessionId: bkHelper.getSessionId() })
          .success(cb)
          .error(function() {
            console.log("failed to create shell", arguments);
            ecb("failed to create shell");
          });
    },
    
    evaluateWithPassword : function(code, modelOutput, refreshObj, deferred) {
      if (SqlShCancelFunction) {
        deferred.reject("An evaluation is already in progress");
        return deferred.promise;
      }
      var self = this;
      bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/rest/sqlsh/evaluate"), {shellId: self.settings.shellID, code: code})
      .success(function(ret) {
        SqlShCancelFunction = function() {
          bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/rest/sqlsh/cancelExecution"), {shellId : self.settings.shellID})
          .success(function(ret) {
            console.log("done cancelExecution", ret);
          });
          bkHelper.setupCancellingOutput(modelOutput);
        }
        var onEvalStatusUpdate = function(evaluation) {
          if (bkHelper.receiveEvaluationUpdate(modelOutput, evaluation, PLUGIN_NAME, self.settings.shellID)) {
            cometdUtil.unsubscribe(evaluation.update_id);
            SqlShCancelFunction = null;
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
    },
    
    
    evaluate : function(code, modelOutput, refreshObj) {

      var self = this;
      var deferred = Q.defer();
      
      var promise = new Promise(function(resolve, reject) {
        
        getListOfConnectiononWhoNeedDialog(self.settings.shellID).success(function(ret) {

          if (ret.length > 0) {
            for (var i = 0; i < ret.length; i++) {

              bkHelper.showSQLLoginModalDialog(ret[i].connectionName, 
                  ret[i].connectionString, 
                  ret[i].user, 
                  function(sqlConnectionData) {
                    setShellUserPassword(self.settings.shellID, 
                      sqlConnectionData.connectionName, 
                      sqlConnectionData.user, 
                      sqlConnectionData.password
                    ).success(function() {
                      resolve("OK");
                    })
              }, function() {
                resolve("CANCEL");
              });
              
            }
          } else {
            resolve("OK");
          }
        });
        
      });
      
      promise.then(
          result => {
            if(result == "OK"){
              bkHelper.setupProgressOutput(modelOutput);
              self.evaluateWithPassword(code, modelOutput, refreshObj, deferred);
            }else{
              bkHelper.printCanceledAnswer(modelOutput);
              deferred.reject();
            }
          }
      );
      
      return deferred.promise;
    },
    
    interrupt: function() {
      this.cancelExecution();
    },
    cancelExecution: function () {
      if (SqlShCancelFunction) {
        SqlShCancelFunction();
      }
    },
    resetEnvironment: function () {
      var deferred = bkHelper.newDeferred();
      bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/rest/sqlsh/resetEnvironment"), {shellId: this.settings.shellID})
      .success(function (ret) {
        console.log("done resetEnvironment",ret);
        deferred.resolve();
      }).error(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    },
    killAllThreads: function () {
      bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/rest/sqlsh/killAllThreads"), {shellId: this.settings.shellID})
      .success(function (ret) {
        console.log("done killAllThreads",ret);
      });
    },
    autocomplete: function(code, cpos, cb) {
      var self = this;
      bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/rest/sqlsh/autocomplete"), {shellId: self.settings.shellID, code: code, caretPosition: cpos})
      .success(function(x) {
        cb(x, undefined, true);
      });
    },
    exit: function(cb) {
      var self = this;
      this.cancelExecution();
      SqlShCancelFunction = null;
      bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/rest/sqlsh/exit"), { shellId: self.settings.shellID })
      .success(cb);
    },
    updateShell: function (cb) {
      bkHelper.showLanguageManagerSpinner(PLUGIN_NAME);
      bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/rest/sqlsh/setShellOptions"), {
        shellId: this.settings.shellID,
        classPath: this.settings.classPath,
        defaultDatasource: this.settings.defaultDatasource,
        datasources: this.settings.datasources
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
      defaultDatasource:  {type: "settableString", action: "updateShell", name: "Default data source"},
      datasources:  {type: "settableString", action: "updateShell", name: "Named data sources"},
      classPath:   {type: "settableString", action: "updateShell", name: "Class path (jar files, one per line)"},
      reset:    {type: "action", action: "resetEnvironment", name: "Reset Environment" },
      killAllThr:  {type: "action", action: "killAllThreads", name: "Kill All Threads" }
    },
    cometdUtil: cometdUtil
  };
  var defaultImports = [];
  var shellReadyDeferred = bkHelper.newDeferred();

  
  var setShellUserPassword = function(shellID, namedConnection, user, password) {
      return bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/rest/sqlsh/setShellUserPassword"), {
          shellId: shellID,
          namedConnection: namedConnection,
          user: user,
          password:password
         })
  }
  
  var getListOfConnectiononWhoNeedDialog = function(shellID) {
      return bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/rest/sqlsh/getListOfConnectiononWhoNeedDialog"), {
          shellId: shellID
         }).success(function(ret) {
          return ret;
        })
   };
  
  var init = function() {

    bkHelper.locatePluginService(PLUGIN_ID, {
      command: COMMAND,
      waitfor: "Started SelectChannelConnector",
      recordOutput: "true"
    }).success(function(ret) {
      serviceBase = ret;
      bkHelper.spinUntilReady(bkHelper.serverUrl(serviceBase + "/rest/sqlsh/ready")).then(function () {
        if (window.languageServiceBase == undefined) {
          window.languageServiceBase = {};
        }
        window.languageServiceBase[PLUGIN_NAME] = bkHelper.serverUrl(serviceBase + '/rest/sqlsh');
        if (window.languageUpdateService == undefined) {
          window.languageUpdateService = {};
        }
        window.languageUpdateService[PLUGIN_NAME] = cometdUtil;
        cometdUtil.init(PLUGIN_NAME, serviceBase);
        
        var SqlShell = function(settings, doneCB, ecb) {
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
            return this[action]();
          };
        };
        SqlShell.prototype = SqlSh;
        shellReadyDeferred.resolve(SqlShell);
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
