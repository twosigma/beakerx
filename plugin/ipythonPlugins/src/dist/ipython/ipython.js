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
  var keyboard_manager = null;
  var IPythonProto = {
      pluginName: PLUGIN_NAME,
      cmMode: "python",
      background: "#EAEAFF",
      bgColor: "#EEBD48",
      fgColor: "#FFFFFF",
      borderColor: "",
      shortName: "Py",
      indentSpaces: 4,
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

        var theCookies = document.cookie.split(';');
        for (var i = 0 ; i < theCookies.length; i++) {
          if (theCookies[i].indexOf(' username-127-0-0-1-') === 0) {
            var theCookie = theCookies[i].split('=');
            document.cookie = theCookie[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/";
          }
        }

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
              if (ipyVersion == '1') {
                self.kernel = new myPython.Kernel(baseurl + "/kernels/");
                kernels[shellID] = self.kernel;
                self.kernel.start("kernel." + bkHelper.getSessionId() + "." + shellID);
              } else {
                // Required by ipython backend, but not used.
                var model = (ipyVersion == '2') ?
                  {notebook : {name : "fakename" + shellID,
                               path : "/some/path" + shellID}} :
                {kernel: {id: shellID,
                          name: "python"},
                 notebook: {path: "/fake/path" + shellID}
                };
                var fakeNotebook = {
                  events: {
                    on: function () {},
                    trigger: function () {}
                  },
                  keyboard_manager: keyboard_manager
                };
                var ajaxsettings = {
                  processData : false,
                  cache: false,
                  type: "POST",
                  data: JSON.stringify(model),
                  dataType: "json",
                  success: function (data, status, xhr) {
                    self.kernel = (ipyVersion == '2') ?
                      (new myPython.Kernel(baseurl+ "/api/kernels")) :
                      (new myPython.Kernel(baseurl+ "/api/kernels",
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
            bkHelper.timeout(spin, 100);
          } else {
            console.error("TIMED OUT - waiting for ipython kernel to start");
            ecb("TIMED OUT - waiting for ipython kernel to start");
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
        var kernel = kernels[self.settings.shellID];
        var finalStuff = undefined;
        var outputUpdate;
        bkHelper.setupProgressOutput(modelOutput);
        gotError = false;
        kernel.appendToWidgetOutput = false;
        kernel.view = null;

        _theCancelFunction = function() {
          var kernel = kernels[self.settings.shellID];
          kernel.interrupt();
          bkHelper.setupCancellingOutput(modelOutput);
        };

        var doFinish = function() {
          console.log("DO FINISH", finalStuff);
          if (!finalStuff) return;

          if (bkHelper.receiveEvaluationUpdate(modelOutput, finalStuff, PLUGIN_NAME, self.settings.shellID)) {
            _theCancelFunction = null;
            if (finalStuff.status === "ERROR")
              deferred.reject(finalStuff.payload);
            else
              deferred.resolve(finalStuff.jsonres !== undefined ? finalStuff.jsonres : finalStuff.payload);
          }
          if (refreshObj)
            refreshObj.outputRefreshed();
          else
            bkHelper.refreshRootScope();

          if (finalStuff.status === "FINISHED")
            finalStuff = undefined;
        }

        var execute_reply = function(msg) {
          var //localDeferred = bkHelper.newDeferred(),
              proceed = false;

          if (_theCancelFunction === null)
            return; //localDeferred.reject();

          // this is called when processing is completed
          if (ipyVersion != '1') msg = msg.content;

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
            if (ipyVersion == '3' || ipyVersion == '4') {
              text = payload.data ? payload.data["text/plain"] : "";
            } else {
              text = payload.text;
            }
            return myPython.utils.fixCarriageReturn(myPython.utils.fixConsole(text));
          }).join("");

          if (_.isUndefined(finalStuff)) {
            finalStuff = {};
            proceed = true;
          }

          console.log("execute_reply");
          finalStuff.status = (msg.status === "error") ? "ERROR" : "FINISHED";

          if (!_.isEmpty(result) && !finalStuff.payload) {
            finalStuff.payload = "<pre>" + result + "</pre>";
          }

          if (proceed)
            bkHelper.timeout(doFinish, 250);

          //localDeferred.resolve(doFinish);
          //return localDeferred.promise;
        };

        function output(a0, a1) {
          var type, content,
              proceed = false;
              //localDeferred = bkHelper.newDeferred();

          if (_theCancelFunction === null || gotError)
            return; //localDeferred.reject();

          // this is called to write output
          type = (ipyVersion == '1') ? a0 : a0.msg_type;
          content =  (ipyVersion == '1') ? a1 : a0.content;
          console.log('MESSAGE TYPE', type, finalStuff);

          var evaluation = {};
          evaluation.status = "RUNNING";

          // if output is a python error
          if (_.indexOf(["error", "pyerr"], type) !== -1) {
            gotError = true;
            var trace = _.reduce(content.traceback, function(memo, line) {
              return  memo + "<br>" + myPython.utils.fixCarriageReturn(myPython.utils.fixConsole(line));
            }, myPython.utils.fixConsole(content.evalue));

            evaluation.payload = (content.ename === "KeyboardInterrupt") ? "Interrupted" : [myPython.utils.fixConsole(content.evalue), trace];
            /*
            if (finalStuff) {
              finalStuff.payload = evaluation.payload
            }
            */
          }
          //fault??
          /*
          else if (kernel.appendToWidgetOutput && kernel.view) {
            kernel.view.outputBuffer = kernel.view.outputBuffer || [];
            kernel.view.outputBuffer.push(a0);
          }
          */
          // if output is a print statement
          else if (type === "stream") {
            evaluation.outputdata = [];
            if (finalStuff && finalStuff.outputdata) {
              evaluation.outputdata = finalStuff.outputdata;
            }

            var text = (ipyVersion == '3' || ipyVersion == '4') ? content.text : content.data;
            evaluation.outputdata.push({type: (content.name === "stderr") ? 'err' : 'out', value: text});
            /*
            if (finalStuff) {
              finalStuff.outputdata = evaluation.outputdata;
            }
            */
          }
          //if output is some data to display
          else {
            var jsonres;
            if(content.data && content.data['application/json']) {
              jsonres = JSON.parse(content.data['application/json']);
            }
            if (jsonres && jsonres.type) {
              if (finalStuff !== undefined && finalStuff.payload !== undefined) {
                // if we already received an output we should append this output to it
                var temp = finalStuff.payload;
                if (temp.type === 'OutputContainer' && temp.psubtype === 'OutputContainer' && _.isArray(temp.items)) {
                  temp.items.push(jsonres);
                  jsonres = temp;
                } else {
                  var temp2 = { 'type' : 'OutputContainer', 'psubtype': 'OutputContainer', 'items' : []};
                  temp2.items.push(temp);
                  temp2.items.push(jsonres);
                  jsonres = temp2;
                }
              }
              evaluation.payload = jsonres;
              /*
              if (finalStuff) {
                finalStuff.payload = evaluation.payload;
              }
              */
            } else {
              if (finalStuff && finalStuff.jsonres) {
                // if we already received an output we should append this output to it
                var temp = finalStuff.jsonres;
                if (temp.type === 'OutputContainer' && temp.psubtype === 'OutputContainer' && _.isArray(temp.items)) {
                  temp.items.push(jsonres);
                  jsonres = temp;
                } else {
                  var temp2 = { 'type' : 'OutputContainer', 'psubtype': 'OutputContainer', 'items' : []};
                  temp2.items.push(temp);
                  temp2.items.push(jsonres);
                  jsonres = temp2;
                }
              }

              evaluation.jsonres = jsonres;
              var elem = $(document.createElement("div"));
              var oa = (ipyVersion == '3' || ipyVersion == '4') ?
                  (new myPython.OutputArea({events: {trigger: function(){}}, keyboard_manager: keyboard_manager})) :
                  (new myPython.OutputArea(elem));

              // twiddle the mime types? XXX
              if (ipyVersion == '1') {
                oa.append_mime_type(oa.convert_mime_types({}, content.data), elem, true);
              } else if (ipyVersion == '2') {
                oa.append_mime_type(content.data, elem);
              } else {
                console.log("1 - appending contnent to the OA...", content);
                oa.append_mime_type(content, elem);
              }

              //content after appending, but not yet in finalStuff
              var payload = elem.html();

              if (finalStuff && finalStuff.payload) {
                // if we already received an output we should append this output to it
                var temp = finalStuff.payload;
                console.log('2 - appending payload to the finalStuff...');

                if (temp.type === 'OutputContainer' && temp.psubtype === 'OutputContainer' && _.isArray(temp.items)) {
                  temp.items.push(payload);
                  payload = temp;
                } else {
                  var temp2 = {'type' : 'OutputContainer', 'psubtype': 'OutputContainer', 'items' : []};
                  temp2.items.push(temp);
                  temp2.items.push(payload);
                  payload = temp2;
                }
              }

              evaluation.payload = payload;
              /*
              if (finalStuff) {
                console.log('3- assigning evaluation result to finalStuff....');
                finalStuff.payload = evaluation.payload;
                finalStuff.jsonres = evaluation.jsonres;
              }
              */
            }
          }

          if (finalStuff) {
            finalStuff.payload = evaluation.payload || finalStuff.payload;
            finalStuff.jsonres = evaluation.jsonres || finalStuff.jsonres;
            finalStuff.outputdata = evaluation.outputdata || finalStuff.outputdata;
          } else {
            finalStuff = evaluation;
            //proceed = false;
            //bkHelper.timeout(doFinish,150);
          }

          //localDeferred.resolve(proceed);
          //return localDeferred.promise;
          bkHelper.timeout(doFinish, 150);
        };

        var outputCB = function (a0, a1) {
          output(a0, a1);
        };

        var shellCB = function(msg) {
          execute_reply(msg);
        };

        var callbacks = (ipyVersion == '1') ? {
          execute_reply: shellCB,
          output: outputCB
        } : {
          shell: {reply: shellCB},
          iopub: {output: outputCB}
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
      showDocs: function(code, cpos, cb) {
        var kernel = kernels[this.settings.shellID];
        if (ipyVersion == '1') {
          //no method to show docs
        } else if (ipyVersion == '2') {
          //no method to show docs
        } else {
          kernel.inspect(code, cpos, function(reply) {
            cb({
              ansiHtml: reply.content.data['text/plain']
            });
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
        return ("import beaker_runtime as beaker_runtime\n" +
            "beaker = beaker_runtime.Beaker()\n" +
            "beaker.register_output()\n" +
            "beaker.set_session('" + bkHelper.getSessionId() + "')\n" +
            this.settings.setup + "\n");
      },
      reset: function() {
        var kernel = kernels[this.settings.shellID];
        var self = this;
        kernel.restart(function () {
          var waitForKernel = function() {
            if ((ipyVersion == '3' || ipyVersion == '4') ?
                (kernel.ws.readyState == 1) :
                  (kernel.shell_channel.readyState == 1 &&
                      kernel.stdin_channel.readyState == 1 &&
                      kernel.iopub_channel.readyState == 1)) {
              self.evaluate(self.initCode(), {}).then(function() {
                bkHelper.show1ButtonModal('Kernel restart completed','Success');
              }, function(err) {
                bkHelper.show1ButtonModal('ERROR: '+err[0],'IPython kernel restart failed');
              });
            } else {
              setTimeout(waitForKernel, 50);
            }
          };
          waitForKernel();
        });
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
  var defaultSetup = ("%matplotlib inline\n" +
      "import numpy\n" +
      "import matplotlib\n" +
      "from matplotlib import pylab, mlab, pyplot\n" +
      "np = numpy\n" +
      "plt = pyplot\n" +
      "from IPython.display import display\n" +
      "from IPython.core.pylabtools import figsize, getfigs\n" +
      "from pylab import *\n" +
  "from numpy import *\n");

  var shellReadyDeferred = bkHelper.newDeferred();
  var init = function() {
    var onSuccess = function() {
      if (ipyVersion == '3' || ipyVersion == '4') {
        require('ipython3_namespace');
        require('ipython3_kernel');
        require('ipython3_utils');
        require('ipython3_outputarea');
        require('ipython3_keyboardmanager');
        var events = require('ipython3_events');
        keyboard_manager = new IPython.KeyboardManager({events: events});
      }
      myPython = (ipyVersion == '1') ? IPython1 : ((ipyVersion == '2') ? IPython2 : IPython);

      bkHelper.locatePluginService(PLUGIN_NAME, {
        command: COMMAND,
        nginxRules: (ipyVersion == '1') ? "ipython1" : "ipython2"
      }).success(function(ret) {
        serviceBase = ret;
        var IPythonShell = function(settings, doneCB, ecb) {
          var self = this;
          var setShellIdCB = function(shellID) {
            settings.shellID = shellID;
            if (!("setup" in settings)) {
              settings.setup = defaultSetup;
            }
            self.settings = settings;
            var finish = function () {
              if (bkHelper.hasSessionId()) {
                self.evaluate(self.initCode(), {}).then(function () {
                  if (doneCB) {
                    doneCB(self);
                  }}, function(err) {
                    var errorHtml =
                      'See <a target="_blank" href="https://github.com/twosigma/beaker-notebook/wiki/Python-Mismatch-Errors">our wiki</a> for how to handle this.';
                    bkHelper.show1ButtonModal('ERROR: ' + err[0].replace('_beaker_python_mismatch_', errorHtml),
                                              'IPython initialization failed');
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
              if ((ipyVersion == '3' || ipyVersion == '4') ?
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
          } else {
            bkHelper.loadList([bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython3/namespace.js"),
                               bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython3/utils.js"),
                               bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython3/kernel.js"),
                               bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython3/session.js"),
                               bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython3/serialize.js"),
                               bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython3/comm.js"),
                               bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython3/outputarea.js")
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
