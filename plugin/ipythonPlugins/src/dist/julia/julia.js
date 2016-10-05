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
 * Julia eval plugin
 * For creating and config evaluators that uses a IPython kernel for evaluating julia code
 * and updating code cell outputs.
 */
define(function(require, exports, module) {
  'use strict';

  var PLUGIN_ID = "Julia";
  var PLUGIN_NAME = "Julia";
  var COMMAND = "ipythonPlugins/julia/juliaPlugin";
  var kernels = {};
  var _theCancelFunction = null;
  var gotError = false;
  var serviceBase = null;
  var ipyVersion = false;
  var myPython = null;
  var now = function() {
    return new Date().getTime();
  };
  function isIpythonVersion3OrAbove() {
    return ipyVersion == '3' || ipyVersion == '4' || ipyVersion == '5';
  }
  var JuliaProto = {
      pluginName: PLUGIN_NAME,
      cmMode: "julia",
      background: "#EAFAEF",
      bgColor: "#6EAC5E",
      fgColor: "#FFFFFF",
      borderColor: "",
      shortName: "Jl",
      indentSpaces: 4,
      tooltip: "Julia is a high performance dynamic langauge for technical computing.",
      newShell: function(shellID, cb, ecb) {

        var kernel = null;
        var self = this;

        if (kernels[shellID]) {
          bkHelper.fcall(function() {  cb(shellID);  });
          return;
        }
        if (_.isEmpty(shellID)) {
          shellID = myPython.utils.uuid();
        }

        if (!bkHelper.isIPythonCookiesCleaned()) {
          var theCookies = document.cookie.split(';');
          for (var i = 0; i < theCookies.length; i++) {
            if (theCookies[i].indexOf(' username-127-0-0-1-') === 0) {
              var theCookie = theCookies[i].split('=');
              document.cookie = theCookie[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/";
            }
          }
          bkHelper.setIPythonCookiesCleaned(true);
        }

        var loadKernel = function(baseurl, kernelName){
            if (ipyVersion == '1') {
              self.kernel = new myPython.Kernel(baseurl + "/kernels/");
              kernels[shellID] = self.kernel;
              self.kernel.start("kernel." + bkHelper.getSessionId() + "." + shellID);
            } else {
              // Required by ipython backend, but not used.
              var model = (ipyVersion == '2') ?
              {
                notebook: {
                  name: "fakename" + shellID,
                  path: "/some/path" + shellID
                }
              } :
              {
                kernel: {
                  id: shellID,
                  name: kernelName
                },
                notebook: {path: "/fake/path" + shellID}
              };
              var fakeNotebook = {
                events: {
                  on: function () {
                  },
                  trigger: function () {
                  }
                }
              };
              var ajaxsettings = {
                processData: false,
                cache: false,
                type: "POST",
                data: JSON.stringify(model),
                dataType: "json",
                success: function (data, status, xhr) {
                  self.kernel = (ipyVersion == '2') ?
                    (new myPython.Kernel(baseurl + "/api/kernels")) :
                    (new myPython.Kernel(baseurl + "/api/kernels",
                      undefined,
                      fakeNotebook,
                      "fakename"));
                  kernels[shellID] = self.kernel;
                  // the data.id is the session id but it is not used yet
                  if (ipyVersion == '2') {
                    self.kernel._kernel_started({id: data.kernel.id});
                  } else {
                    self.kernel._kernel_created({id: data.kernel.id});
                    self.kernel.running = true;
                  }
                }
              };

              var url = myPython.utils.url_join_encode(baseurl, 'api/sessions/');
              $.ajax(url, ajaxsettings);
            }
        };

        bkHelper.httpGet(bkHelper.serverUrl("beaker/rest/plugin-services/getIPythonPassword"),
          {pluginId: PLUGIN_NAME}).success(function(result) {
            bkHelper.spinUntilReady(bkHelper.serverUrl(serviceBase + "/login")).then(function () {
              bkHelper.httpPost(bkHelper.serverUrl(serviceBase + "/login?next=%2F"),
                {password: result}).success(function(result) {
                  var baseurl = bkHelper.serverUrl(serviceBase);
                  var t = baseurl.indexOf('//');
                  if (t >= 0) {
                    baseurl = baseurl.substring(t+2);
                    t = baseurl.indexOf('/');
                    if (t >= 0) {
                      baseurl = baseurl.substring(t);
                    }
                  }
                  if (ipyVersion == '2') {
                    loadKernel(baseurl);
                  } else {
                    var juliaDefaultKernel = 'julia-0.4';
                    var url = myPython.utils.url_join_encode(baseurl, 'api/kernelspecs');
                    $.ajax(url, {
                      type: "GET",
                      dataType: "json",
                      success: function (kernelspecs, status, xhr) {
                        var kernelNames = Object.keys(kernelspecs['kernelspecs']);
                        var kernelsCount = kernelNames.length;
                        for (var i = 0; i < kernelsCount; i++) {
                          if (kernelNames[i].indexOf('julia') !== -1) {
                            loadKernel(baseurl, kernelNames[i]);
                            return;
                          }
                        }
                        loadKernel(baseurl, juliaDefaultKernel);
                      },
                      error: function () {
                        loadKernel(baseurl, juliaDefaultKernel);
                      }
                    });
                  }
                });
            });
          });

        // keepalive for the websockets
        var nil = function() {
        };
        window.setInterval(function() {
          // XXX this is wrong (ipy1 layout) maybe it doesn't matter??
          var ignore = {
            execute_reply: nil,
            output: nil,
            clear_output: nil,
            set_next_input: nil
          };
          self.kernel.execute("", ignore, {silent: false});
        }, 30 * 1000);

        // cb cannot be called synchronously, see evaluatorManager.js, new Shell
        // Also, do not cb until making sure kernel is running.
        var timeout = now() + 30 * 1000; // time out 30 sec
        var spin = function() {
          if (self.kernel !== undefined && self.kernel.running) {
            cb(shellID);
          } else if (now() < timeout) {
            setTimeout(spin, 100);
          } else {
            console.error("TIMED OUT - waiting for julia kernel to start");
            ecb("TIMED OUT - waiting for julia kernel to start");
          }
        };
        bkHelper.fcall(spin);
      },
      evaluate: function(code, modelOutput, refreshObj) {
        var deferred = bkHelper.newDeferred();
        var start = new Date();

        if (_theCancelFunction) {
          deferred.reject("An evaluation is already in progress");
          return deferred.promise;
        }

        var self = this;
        var startTime = new Date().getTime();
        var kernel = kernels[self.settings.shellID];
        var finalStuff = undefined;
        bkHelper.setupProgressOutput(modelOutput);
        gotError = false;

        _theCancelFunction = function() {
          var kernel = kernels[self.settings.shellID];
          kernel.interrupt();
          bkHelper.setupCancellingOutput(modelOutput);
        };

        var doFinish = function() {
          if (bkHelper.receiveEvaluationUpdate(modelOutput, finalStuff, PLUGIN_NAME, self.settings.shellID)) {
            _theCancelFunction = null;
            if (finalStuff.status === "ERROR")
              deferred.reject(finalStuff.payload);
            else
              deferred.resolve(finalStuff.jsonres !== undefined ? finalStuff.jsonres : finalStuff.payload);
          }
          if (refreshObj !== undefined)
            refreshObj.outputRefreshed();
          else
            bkHelper.refreshRootScope();       
          finalStuff = undefined;
        }

        var execute_reply = function(msg) {
          if (_theCancelFunction === null)
            return;
          // this is called when processing is completed
          if (ipyVersion != '1') {
            msg = msg.content;
          }

          var exitFlag = _(msg.payload).find(function(payload) {
            if (payload.source !== undefined && payload.source == 'ask_exit') {
              return true;
            }
          });

          if (exitFlag) {
            bkHelper.show1ButtonModal('Kernel exited, restart completed','Success');
          }

          var result = _(msg.payload).map(function(payload) {
            // XXX can other mime types appear here?
            var text = "";
            if (isIpythonVersion3OrAbove()) {
              text = payload.data ? payload.data["text/plain"] : "";
            } else {
              text = payload.text;
            }
            return myPython.utils.fixCarriageReturn(myPython.utils.fixConsole(text));
          }).join("");
          if (finalStuff !== undefined) {
            if (msg.status === "error")
              finalStuff.status = "ERROR";
            else
              finalStuff.status = "FINISHED";

            if (!_.isEmpty(result) && finalStuff.payload === undefined) {
              finalStuff.payload = "<pre>" + result + "</pre>";
            }
          } else {
            var evaluation = { };
            if (msg.status === "error")
              evaluation.status = "ERROR";
            else
              evaluation.status = "FINISHED";
            if (!_.isEmpty(result)) {
              evaluation.payload = "<pre>" + result + "</pre>";
            }
            finalStuff = evaluation;
            var duration = new Date() - start;
            bkHelper.timeout(doFinish, duration/3);
          }
        };
        var output = function output(a0, a1) {
          if (_theCancelFunction === null || gotError)
            return;
          // this is called to write output
          var type;
          var content;
          if (ipyVersion == '1') {
            type = a0;
            content = a1;
          } else {
            type = a0.msg_type;
            content = a0.content;
          }

          var evaluation = { };
          evaluation.status = "RUNNING";

          if (isIpythonVersion3OrAbove() ? (type === "error") : (type === "pyerr")) {
            gotError = true;
            var trace = _.reduce(content.traceback, function(memo, line) {
              return  memo + "<br>" + myPython.utils.fixCarriageReturn(myPython.utils.fixConsole(line));
            }, myPython.utils.fixConsole(content.evalue));

            evaluation.payload = (content.ename === "KeyboardInterrupt") ?
                "Interrupted" : [myPython.utils.fixConsole(content.evalue), trace];
            if (finalStuff !== undefined) {
              finalStuff.payload = evaluation.payload
            }
          } else if (type === "stream") {
            evaluation.outputdata = [];
            if (finalStuff !== undefined && finalStuff.outputdata !== undefined)
              evaluation.outputdata = finalStuff.outputdata;
            var text = isIpythonVersion3OrAbove() ? content.text : content.data;
            evaluation.outputdata.push({type: (content.name === "stderr") ? 'err' : 'out',
                value: text});
          } else {
            var jsonres;
            if(content.data && content.data['application/json'] !== undefined) {
              jsonres = JSON.parse(content.data['application/json']);
            }
            if (jsonres !== undefined && _.isObject(jsonres) && jsonres.type !== undefined) {
              evaluation.payload = jsonres;
              if (finalStuff !== undefined) {
                finalStuff.payload = evaluation.payload;
              }
            } else {
              evaluation.jsonres = jsonres;
              var elem = $(document.createElement("div"));
              var oa = isIpythonVersion3OrAbove() ?
                  (new myPython.OutputArea({events: {trigger: function(){}},
                    keyboard_manager: {register_events: function(){}}})) :
                      (new myPython.OutputArea(elem));
                  // twiddle the mime types? XXX
                  if (ipyVersion == '1') {
                    oa.append_mime_type(oa.convert_mime_types({}, content.data), elem, true);
                  } else if (ipyVersion == '2') {
                    oa.append_mime_type(content.data, elem);
                  } else {
                    oa.append_mime_type(content, elem);
                  }
                  evaluation.payload = elem.html();
                  if (finalStuff !== undefined) {
                    finalStuff.payload = evaluation.payload;
                    finalStuff.jsonres = evaluation.jsonres;
                  }
            }
            if (finalStuff !== undefined) {
              finalStuff.payload = evaluation.payload;
            }
          }
          if (finalStuff === undefined) {            
            finalStuff = evaluation;
            bkHelper.timeout(doFinish, 250);
          }
        };
        var callbacks = (ipyVersion == '1') ? {
          execute_reply: execute_reply,
          output: output
        } : {
          shell: {reply: execute_reply},
          iopub: {output: output}
        };
        kernel.execute(code, callbacks, {silent: false});
        return deferred.promise;
      },
      autocomplete: function(code, cpos, cb) {
        var kernel = kernels[this.settings.shellID];
        if (ipyVersion == '1') {
          kernel.complete(code, cpos, {'complete_reply': function(reply) {
            cb(reply.matches, reply.matched_text);
          }});
        } else if (ipyVersion == '2')  {
          kernel.complete(code, cpos, function(reply) {
            cb(reply.content.matches, reply.content.matched_text);
          });
        } else {
          kernel.complete(code, cpos, function(reply) {
            cb(reply.content.matches, code.substring(reply.content.cursor_start,
                reply.content.cursor_end));
          });
        }
      },
      exit: function(cb) {
        this.cancelExecution();
        _theCancelFunction = null;
        var kernel = kernels[this.settings.shellID];
        kernel.kill();
      },
      reconnect: function() {
        var kernel = kernels[this.settings.shellID];
        kernel.reconnect();
      },
      interrupt: function() {
        this.cancelExecution();
      },
      cancelExecution: function() {
        if (_theCancelFunction) {
          _theCancelFunction();
        }
      },
      initCode: function() {
        return 'include(string(ENV["beaker_julia_init"], "/beaker.jl"))\n' +
	       'Beaker.setsession("' + bkHelper.getSessionId() + '")\n' +
	       this.settings.setup + "\n";
      },
      reset: function() {
        var deferred = bkHelper.newDeferred();
        var kernel = kernels[this.settings.shellID];
        var self = this;
        bkHelper.showLanguageManagerSpinner(PLUGIN_NAME);
        kernel.restart(function () {
          var waitForKernel = function() {
            if (isIpythonVersion3OrAbove() ?
                (kernel.ws.readyState == 1) :
                  (kernel.shell_channel.readyState == 1 &&
                      kernel.stdin_channel.readyState == 1 &&
                      kernel.iopub_channel.readyState == 1)) {
              self.evaluate(self.initCode(), {}).then(function() {
                bkHelper.hideLanguageManagerSpinner();
                deferred.resolve();
              }, function(err) {
                bkHelper.hideLanguageManagerSpinner(err);
                deferred.reject(err);
                bkHelper.showErrorModal('ERROR: ' + err[0], PLUGIN_NAME + ' kernel restart failed', err[1]);
              });
            } else {
              setTimeout(waitForKernel, 50);
            }
          };
          waitForKernel();
        });
        return deferred.promise;
      },
      updateShell: function() {
        this.reset();
      },
      spec: {
        interrupt: {type: "action", action: "interrupt", name: "Interrupt"},
        reset: {type: "action", action: "reset", name: "Restart"},
        setup: {type: "settableString", action: "updateShell", name: "Setup Code"}
      }
  };
  var defaultSetup = "";

  var shellReadyDeferred = bkHelper.newDeferred();
  var init = function() {
    var onSuccess = function() {
      if (ipyVersion == '3') {
        require('ipython3_namespace');
        require('ipython3_kernel');
        require('ipython3_utils');
        require('ipython3_outputarea');
      } else if(ipyVersion == '4') {
        require('base/js/namespace');
        require('services/kernels/kernel');
        require('base/js/utils');
        require('notebook/js/outputarea');
        require('jupyter-js-widgets');
      }
      myPython = (ipyVersion == '1') ? IPython1 : ((ipyVersion == '2') ? IPython2 : ((ipyVersion == '3') ? IPython3 : IPython));
      bkHelper.locatePluginService(PLUGIN_ID, {
        command: COMMAND,
        nginxRules: (ipyVersion == '1') ? "ipython1" : "ipython2"
      }).success(function(ret) {
        serviceBase = ret;
        var JuliaShell = function(settings, doneCB, ecb) {
          var self = this;
          var setShellIdCB = function(shellID) {
            var isNewShell = (shellID !== settings.shellID);
            settings.shellID = shellID;
            if (!("setup" in settings)) {
              settings.setup = defaultSetup;
            }
            self.settings = settings;
            var finish = function () {
              if (bkHelper.hasSessionId() && isNewShell) {
                self.evaluate(self.initCode(), {}).then(function () {
                  if (doneCB) {
                    doneCB(self);
                  }}, function(err) {
                    bkHelper.showErrorModal('ERROR: ' + err[0], 'julia initialization failed', err[1]);
                    if (doneCB) {
                      doneCB(self);
                    }});
              } else {
                if (doneCB) {
                  doneCB(self);
                }
              }
            };
            var kernel = kernels[shellID];
            var waitForKernel = function () {
              if (isIpythonVersion3OrAbove() ?
                  (kernel.ws.readyState == 1) :
                    (kernel.shell_channel.readyState == 1 &&
                        kernel.stdin_channel.readyState == 1 &&
                        kernel.iopub_channel.readyState == 1)) {
                finish();
              } else {
                setTimeout(waitForKernel, 50);
              }
            }
            waitForKernel();
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
        JuliaShell.prototype = JuliaProto;
        shellReadyDeferred.resolve(JuliaShell);
      }).error(function() {
        console.log("failed to locate plugin service", PLUGIN_NAME, arguments);
        shellReadyDeferred.reject("failed to locate plugin service");
      });
    };
    var onFail = function() {
      console.log("failed to load ipython libs");
    };

    bkHelper.httpGet(bkHelper.serverUrl("beaker/rest/plugin-services/getIPythonVersion"),
        {pluginId: PLUGIN_NAME, command: COMMAND})
        .success(function(result) {
          var backendVersion = result;
          ipyVersion = backendVersion[0];
          console.log("Using ipython compatibility mode: " + ipyVersion);
          if (ipyVersion == '1') {
            bkHelper.loadList([bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython/namespace.js"),
                               bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython/utils.js"),
                               bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython/kernel.js"),
                               bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython/outputarea.js")
                               ], onSuccess, onFail);
          } else if (ipyVersion == '2') {
            bkHelper.loadList([bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython2/namespace.js"),
                               bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython2/utils.js"),
                               bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython2/kernel.js"),
                               bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython2/session.js"),
                               bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython2/comm.js"),
                               bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython2/outputarea.js")
                               ], onSuccess, onFail);
          } else if (ipyVersion == '3') {
            bkHelper.loadList([bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython3/namespace.js"),
                               bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython3/utils.js"),
                               bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython3/kernel.js"),
                               bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython3/session.js"),
                               bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython3/serialize.js"),
                               bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython3/comm.js"),
                               bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython3/outputarea.js")
                               ], onSuccess, onFail);
          } else {
            bkHelper.loadList([bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython4/namespace.js"),
                               bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython4/kernel.js"),
                               bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython4/utils.js"),
                               bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython4/outputarea.js"),
                               bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython4/jupyter-js-widgets.js"),
                               ], onSuccess, onFail);
          }
        }).error(function() {
          console.log("failed to locate plugin service", PLUGIN_NAME, arguments);
          shellReadyDeferred.reject("failed to locate plugin service");
        });;
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
