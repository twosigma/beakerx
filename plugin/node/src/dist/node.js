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
 * Node eval plugin
 * For creating and configuring evaluators that evaluate Javascript code on
 *   a remote node server and update code cell results.
 */
define(function(require, exports, module) {
    'use strict';
    var PLUGIN_ID = "Node";
    var PLUGIN_NAME = "Node";
    var COMMAND = "node/nodePlugin";

    var serviceBase = null;

    var nodeProto = {
        pluginName: PLUGIN_NAME,
        cmMode: "javascript",
        background: "#dbecb5",
        bgColor: "#8EC453",
        fgColor: "#FFFFFF",
        borderColor: "",
        shortName: "N",
        tooltip: "Node is a JavaScript runtime built on Chrome's V8 engine, running on the server.",
        newShell: function (shellID, cb, ecb) {
            var self = this;

            if (!shellID) {
                shellID = "";
            }
            //verify server is up and running before a new shell call is attempted
            function checkNodeServerRunning() {
              bkHelper.httpGet(bkHelper.serverUrl(serviceBase + "/pulse"))
                .error(function(){
                    setTimeout(function () {
                        checkNodeServerRunning();
                    }, 2000)
                }).success(function(){
                  bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/shell"), {shellid: shellID})
                    .success(function(response){
                        shellID = response.shellID;
                        cb(shellID);
                    }).error(function () {
                        console.log("failed to create shell", arguments);
                        ecb("failed to create shell");
                    });
                })
            }
            checkNodeServerRunning();
        },
        evaluate: function (code, modelOutput) {
          var deferred = Q.defer();
            var self = this;
            bkHelper.setupProgressOutput(modelOutput);
            bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/evaluate"), {shellID: self.settings.shellID, code: encodeURIComponent(code)})
            .success(function(ret) {
                modelOutput.result = ret;
                bkHelper.refreshRootScope();
                deferred.resolve(ret);
            }).error(function(xhr, textStatus, error) {
              var errorText = xhr.status !== 502 ? xhr.responseText : error;
              modelOutput.result = {
                    type: "BeakerDisplay",
                    innertype: "Error",
                    object: errorText
                };
                deferred.reject(errorText);
            });
          return deferred.promise;
        },
        autocomplete: function (code, cpos, cb) {
            console.log("Autocomplete Called: Not implemented");
        },
        addModulePath: function (callback) {
          if(!this.settings.modulePath) {
            if (callback) {
              callback();
            }
            return;
          }
          bkHelper.showLanguageManagerSpinner(PLUGIN_NAME);
          bkHelper.httpPost(bkHelper.serverUrl(serviceBase + '/add-module-path'), {
            shellId: this.settings.shellID,
            path: this.settings.modulePath
          }).success(function() {
            bkHelper.hideLanguageManagerSpinner();
            if (callback) {
              callback();
            }
          }).error(function(err) {
            bkHelper.hideLanguageManagerSpinner(err);
            bkHelper.show1ButtonModal('ERROR: ' + err, 'Failed to add module path');
          });
        },
        setSessionId: function (callback) {
          return bkHelper.httpPost(bkHelper.serverUrl(serviceBase + '/session'), {
            shellID: this.settings.shellID,
            session: bkHelper.getSessionId()
          }).success(function () {
            if (callback) {
              callback();
            }
          });
        },
        exit: function (cb) {
            console.log("Exit Called");
            var self = this;
            bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/rest/node/exit"), { shellID: self.settings.shellID })
            .success(cb);
        },
        spec: {
          modulePath: {type: 'settableString', action: 'addModulePath', name: 'Modules path'}
        }
    };

    var shellReadyDeferred = bkHelper.newDeferred();
    var init = function () {
      bkHelper.locatePluginService(PLUGIN_ID, {
        command: COMMAND,
        startedIndicator: "Server Starting",
        recordOutput: "true"
        }).success(function (ret) {
            serviceBase = ret;
            var NodeShell = function (settings, doneCB, ecb) {
                var self = this;
                var setShellIdCB = function (id) {
                    if (id !== settings.shellID) {
                        console.log("A new Node shell was created.");
                    }
                    settings.shellID = id;
                    self.settings = settings;
                    self.setSessionId(function () {
                      self.addModulePath(function () {
                        if (doneCB) {
                          doneCB(self);
                        }
                      });
                    });
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
                this.perform = function (what) {
                    var action = this.spec[what].action;
                    this[action]();
                };
            };
            NodeShell.prototype = nodeProto;
            shellReadyDeferred.resolve(NodeShell);
        }).error(function () {
            shellReadyDeferred.reject("failed to locate plugin service");
            console.log("process start failed", arguments);
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
