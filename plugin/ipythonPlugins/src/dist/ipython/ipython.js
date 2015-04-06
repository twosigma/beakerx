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
 * IPython eval plugin
 * For creating and config evaluators that uses a IPython kernel for evaluating python code
 * and updating code cell outputs.
 */
define(function(require, exports, module) {
  'use strict';

  var PLUGIN_NAME = "IPython";
  var COMMAND = "ipythonPlugins/ipython/ipythonPlugin";
  var kernels = {};
  var _theCancelFunction = null;
  var gotError = false;
  var serviceBase = null;
  var ipyVersion = false;
  var myPython = null;
  var now = function() {
    return new Date().getTime();
  };
  var IPythonProto = {
      pluginName: PLUGIN_NAME,
      cmMode: "python",
      background: "#EAEAFF",
      bgColor: "#EEBD48",
      fgColor: "#FFFFFF",
      borderColor: "",
      shortName: "Py",
      newShell: function(shellID, cb) {

        var kernel = null;
        var self = this;

        if (kernels[shellID]) {
          bkHelper.fcall(function() {  cb(shellID);  });
          return;
        }
        if (_.isEmpty(shellID)) {
          shellID = myPython.utils.uuid();
        }

        var base = _.string.startsWith(serviceBase, "/") ? serviceBase : "/" + serviceBase;
        bkHelper.httpGet("../beaker/rest/plugin-services/getIPythonPassword", {pluginId: PLUGIN_NAME})
        .success(function(result) {
          bkHelper.httpPost(base + "/login?next=%2E", {password: result})
          .success(function(result) {
            if (ipyVersion == '1') {
              self.kernel = new myPython.Kernel(base + "/kernels/");
              kernels[shellID] = self.kernel;
              self.kernel.start("kernel." + bkHelper.getSessionId() + "." + shellID);
            } else {
              // Required by ipython backend, but not used.
              var model = (ipyVersion == '2') ? {
                notebook : {
                  name : "fakename" + shellID,
                  path : "/some/path" + shellID
                }
              } : {
                kernel: {
                  id: shellID,
                  name: "python"
                },
                notebook: {
                  path: "/fake/path"
                }
              };
              var fakeNotebook = {
                events: {on: function (){},
                         trigger: function (){}}
              };
              var ajaxsettings = {
                  processData : false,
                  cache: false,
                  type: "POST",
                  data: JSON.stringify(model),
                  dataType: "json",
                  success: function (data, status, xhr) {
                    self.kernel = (ipyVersion == '2') ?
                      (new myPython.Kernel(base + "/api/kernels")) :
                      (new myPython.Kernel(base + "/api/kernels",
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
              var url = myPython.utils.url_join_encode(serviceBase, 'api/sessions/');
              $.ajax(url, ajaxsettings);
            }
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
        var timeout = now() + 10 * 1000; // time out 10 sec
        var spin = function() {
          if (self.kernel !== undefined && self.kernel.running) {
            cb(shellID);
          } else if (now() < timeout) {
            setTimeout(spin, 100);
          } else {
            console.error("TIMED OUT - waiting for ipython kernel to start");
          }
        };
        bkHelper.fcall(spin);
      },
      evaluate: function(code, modelOutput, refreshObj) {
        var deferred = bkHelper.newDeferred();

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
          var result = _(msg.payload).map(function(payload) {
            // XXX can other mime types appear here?
            var text = (ipyVersion == '3') ? payload.data["text/plain"] : payload.text;
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
            bkHelper.timeout(doFinish,250);
          }
        }
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

          if ((ipyVersion == '3') ? (type === "error") : (type === "pyerr")) {
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
            var text = (ipyVersion == '3') ? content.text : content.data;
            evaluation.outputdata.push({type: (content.name === "stderr") ? 'err' : 'out',
                                        value: text});
          } else {
            var jsonres;
            if(content.data['application/json'] !== undefined) {
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
	      var oa = (ipyVersion == '3') ?
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
            bkHelper.timeout(doFinish,150);
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
        kernel.restart();
      },
      interrupt: function() {
        this.cancelExecution();
      },
      cancelExecution: function() {
        if (_theCancelFunction) {
          _theCancelFunction();
        }
      },
      spec: {
        interrupt: {type: "action", action: "interrupt", name: "Interrupt"}
      }
  };

  var shellReadyDeferred = bkHelper.newDeferred();
  var init = function() {
    var onSuccess = function() {
      if (ipyVersion == '3') {
        require('ipython3_namespace');
        require('ipython3_kernel');
        require('ipython3_utils');
        require('ipython3_outputarea');
      }
      myPython = (ipyVersion == '1') ? IPython1 : ((ipyVersion == '2') ? IPython2 : IPython);
      bkHelper.locatePluginService(PLUGIN_NAME, {
        command: COMMAND,
        nginxRules: (ipyVersion == '1') ? "ipython1" : "ipython2",
        startedIndicator: "NotebookApp] The IPython Notebook is running at: http://127.0.0.1:",
        startedIndicatorStream: "stderr"
      }).success(function(ret) {
        serviceBase = ret;
        var IPythonShell = function(settings, doneCB) {
          var self = this;
          var setShellIdCB = function(shellID) {
            settings.shellID = shellID;

            // XXX these are not used by python, they are leftover from groovy
            if (!settings.imports) {
              settings.imports = "";
            }
            if (!settings.supplementalClassPath) {
              settings.supplementalClassPath = "";
            }
            self.settings = settings;
            var finish = function () {
              if (bkHelper.hasSessionId()) {
                var initCode = ("%matplotlib inline\n" +
                    "import numpy\n" +
                    "import matplotlib\n" +
                    "from matplotlib import pylab, mlab, pyplot\n" +
                    "np = numpy\n" +
                    "plt = pyplot\n" +
                    "from IPython.display import display\n" +
                    "from IPython.core.pylabtools import figsize, getfigs\n" +
                    "from pylab import *\n" +
                    "from numpy import *\n" +
                    "import beaker_runtime as beaker_runtime\n" +
                    "beaker = beaker_runtime.Beaker()\n" +
                    "beaker.register_output()\n" +
                    "beaker.set_session('" + bkHelper.getSessionId() + "')\n");
                self.evaluate(initCode, {}).then(function () {
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
              if ((ipyVersion == '3') ?
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
          this.newShell(settings.shellID, setShellIdCB);
          this.perform = function(what) {
            var action = this.spec[what].action;
            this[action]();
          };
        };
        IPythonShell.prototype = IPythonProto;
        shellReadyDeferred.resolve(IPythonShell);
      }).error(function() {
        console.log("failed to locate plugin service", PLUGIN_NAME, arguments);
        shellReadyDeferred.reject("failed to locate plugin service");
      });
    };
    var onFail = function() {
      console.log("failed to load ipython libs");
    };

    bkHelper.httpGet("../beaker/rest/plugin-services/getIPythonVersion",
        {pluginId: PLUGIN_NAME, command: COMMAND})
        .success(function(result) {
          var backendVersion = result;
          ipyVersion = backendVersion[0];
          console.log("Using ipython compatibility mode: " + ipyVersion);
          if (ipyVersion == '1') {
            bkHelper.loadList(["./plugins/eval/ipythonPlugins/vendor/ipython/namespace.js",
                               "./plugins/eval/ipythonPlugins/vendor/ipython/utils.js",
                               "./plugins/eval/ipythonPlugins/vendor/ipython/kernel.js",
                               "./plugins/eval/ipythonPlugins/vendor/ipython/outputarea.js"
                               ], onSuccess, onFail);
          } else if (ipyVersion == '2') {
            bkHelper.loadList(["./plugins/eval/ipythonPlugins/vendor/ipython2/namespace.js",
                               "./plugins/eval/ipythonPlugins/vendor/ipython2/utils.js",
                               "./plugins/eval/ipythonPlugins/vendor/ipython2/kernel.js",
                               "./plugins/eval/ipythonPlugins/vendor/ipython2/session.js",
                               "./plugins/eval/ipythonPlugins/vendor/ipython2/comm.js",
                               "./plugins/eval/ipythonPlugins/vendor/ipython2/outputarea.js"
                               ], onSuccess, onFail);
          } else {
            bkHelper.loadList(["./plugins/eval/ipythonPlugins/vendor/ipython3/namespace.js",
                               "./plugins/eval/ipythonPlugins/vendor/ipython3/utils.js",
                               "./plugins/eval/ipythonPlugins/vendor/ipython3/kernel.js",
                               "./plugins/eval/ipythonPlugins/vendor/ipython3/session.js",
                               "./plugins/eval/ipythonPlugins/vendor/ipython3/serialize.js",
                               "./plugins/eval/ipythonPlugins/vendor/ipython3/comm.js",
                               "./plugins/eval/ipythonPlugins/vendor/ipython3/outputarea.js"
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
          });
          return deferred.promise;
        }
      };
    },
    function(err) { return err; });
  };

  exports.name = PLUGIN_NAME;
});
