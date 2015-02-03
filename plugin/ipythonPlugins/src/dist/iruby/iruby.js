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
 * IRuby eval plugin
 * For creating and config evaluators that uses a IRuby kernel for evaluating ruby code
 * and updating code cell outputs.
 */
define(function(require, exports, module) {
  'use strict';

  var PLUGIN_NAME = "IRuby";
  var COMMAND = "ipythonPlugins/iruby/irubyPlugin";
  var kernels = {};
  var _theCancelFunction = null;
  var serviceBase = null;
  var ipyVersion1 = false;
  var now = function() {
    return new Date().getTime();
  };
  var IRubyProto = {
    pluginName: PLUGIN_NAME,
    cmMode: "ruby",
    background: "#F29F9B",
    bgColor: "#AF1712",
    fgColor: "#FFFFFF",
    borderColor: "",
    shortName: "Rb",
    newShell: function(shellID, cb) {

      var kernel = null;
      var self = this;

      if (kernels[shellID]) {
        bkHelper.fcall(function() {
          cb(shellID);
        });
        return;
      }
      if (_.isEmpty(shellID)) {
        shellID = IPython.utils.uuid();
      }

      var base = _.string.startsWith(serviceBase, "/") ? serviceBase : "/" + serviceBase;
      bkHelper.httpGet("../beaker/rest/plugin-services/getIPythonPassword", {pluginId: PLUGIN_NAME})
        .success(function(result) {
          bkHelper.httpPost(base + "/login?next=%2E", {password: result})
            .success(function(result) {
              if (ipyVersion1) {
                self.kernel = new IPython.Kernel(base + "/kernels/");
                kernels[shellID] = self.kernel;
                self.kernel.start("kernel." + bkHelper.getSessionId() + "." + shellID);
              } else {
                // Required by ipython backend, but not used.
                var model = {
                  notebook : {
                    name : "fakename" + shellID,
                    path : "/some/path" + shellID
                  }
                };
                var ajaxsettings = {
                  processData : false,
                  cache : false,
                  type : "POST",
                  data: JSON.stringify(model),
                  dataType : "json",
                  success : function (data, status, xhr) {
                    self.kernel = new IPython.Kernel(base + "/api/kernels");
                    kernels[shellID] = self.kernel;
                    // the data.id is the session id but it is not used yet
                    self.kernel._kernel_started({id: data.kernel.id});
                  }
                };
                var url = IPython.utils.url_join_encode(serviceBase, 'api/sessions/');
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
      // begin
      var deferred = bkHelper.newDeferred();
      
      if (_theCancelFunction) {
        deferred.reject("An evaluation is already in progress");
        return deferred.promise;
      }
      var self = this;
      var startTime = new Date().getTime();
      var kernel = kernels[self.settings.shellID];
      bkHelper.setupProgressOutput(modelOutput);

      _theCancelFunction = function() {
        var kernel = kernels[self.settings.shellID];
        kernel.interrupt();
        bkHelper.setupCancellingOutput(modelOutput);
      };
      var execute_reply = function(msg) {
        // this is called when processing is completed
        if (!ipyVersion1) {
          msg = msg.content;
        }
        var result = _(msg.payload).map(function(payload) {
          return IPython.utils.fixCarriageReturn(IPython.utils.fixConsole(payload.text));
        }).join("");
        var evaluation = { };
        if (msg.status === "error")
          evaluation.status = "ERROR";
        else
          evaluation.status = "FINISHED";

        if (!_.isEmpty(result)) {
          evaluation.payload = "<pre>" + result + "</pre>";
        }
        if (bkHelper.receiveEvaluationUpdate(modelOutput, evaluation,  PLUGIN_NAME, self.settings.shellID)) {
          deferred.resolve();
        }
        if (refreshObj !== undefined)
          refreshObj.outputRefreshed();
        else
          bkHelper.refreshRootScope();     
      }
      var output = function output(a0, a1) {
        // this is called to write output
        var type;
        var content;
        if (ipyVersion1) {
          type = a0;
          content = a1;
        } else {
          type = a0.msg_type;
          content = a0.content;
        }
        var evaluation = { };
        evaluation.status = "RUNNING";

        if (type === "pyerr") {
          var trace = _.reduce(content.traceback, function(memo, line) {
            return  memo + "<br>" + IPython.utils.fixCarriageReturn(IPython.utils.fixConsole(line));
          }, content.evalue);
          evaluation.payload = (content.ename === "KeyboardInterrupt") ? "Interrupted" : [content.evalue, trace];
        } else if (type === "stream") {
          evaluation.outputdata = [];
          if (content.name === "stderr") {
            evaluation.outputdata.push( { type : 'out', value : content.data } );
          } else {
            evaluation.outputdata.push( { type : 'err', value : content.data } );
          }
        } else {
          var elem = $(document.createElement("div"));
          var oa = new IPython.OutputArea(elem);
          // twiddle the mime types? XXX
          if (ipyVersion1) {
            oa.append_mime_type(oa.convert_mime_types({}, content.data), elem, true);
          } else {
            oa.append_mime_type(content.data, elem);
          }
          var table = bkHelper.findTable(elem[0]);
          if (table) {
            evaluation.payload = table;
          } else {
            evaluation.payload = elem.html();
          }
        }
        bkHelper.receiveEvaluationUpdate(modelOutput, evaluation,  PLUGIN_NAME, self.settings.shellID);
        if (refreshObj !== undefined)
          refreshObj.outputRefreshed();
        else
          bkHelper.refreshRootScope();
      };
      var callbacks = ipyVersion1 ? {
        execute_reply: execute_reply,
        output: output
      } : {
        shell: {reply: execute_reply},
        iopub: {output: output}
      };
      kernel.execute(code, callbacks, {silent: false});
      deferred.promise.finally(function() {
        _theCancelFunction = null;
      });
      return deferred.promise;
    },
    autocomplete: function(code, cpos, cb) {
      var kernel = kernels[this.settings.shellID];
      if (ipyVersion1) {
	kernel.complete(code, cpos, {'complete_reply': function(reply) {
	    cb(reply.matches, reply.matched_text);
	}});
      } else {
        kernel.complete(code, cpos, function(reply) {
            cb(reply.content.matches, reply.matched_text);
	});
      }
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
      bkHelper.locatePluginService(PLUGIN_NAME, {
          command: COMMAND,
          nginxRules: ipyVersion1 ? "ipython1" : "ipython2",
          startedIndicator: "[NotebookApp] The IPython Notebook is running at: http://127.0.0.1:",
          startedIndicatorStream: "stderr"
      }).success(function(ret) {
        serviceBase = ret;
        var IRubyShell = function(settings, doneCB) {
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
            if (doneCB) {
              doneCB(self);
            }
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
        IRubyShell.prototype = IRubyProto;
        shellReadyDeferred.resolve(IRubyShell);
      }).error(function() {
        console.log("failed to locate plugin service", PLUGIN_NAME, arguments);
        shellReadyDeferred.reject("failed to locate plugin service");
      });
    };
    var onFail = function() {
      console.log("failed to load ipython libs");
    };

    bkHelper.httpGet("../beaker/rest/plugin-services/getIPythonVersion")
      .success(function(result) {
        var backendVersion = result;
        if (backendVersion[0] == "1") {
          ipyVersion1 = true;
        }
        console.log("Using ipython 1.x compatibility mode: " + ipyVersion1);
        if (ipyVersion1) {
          bkHelper.loadList(["./plugins/eval/ipythonPlugins/vendor/ipython/namespace.js",
                             "./plugins/eval/ipythonPlugins/vendor/ipython/utils.js",
                             "./plugins/eval/ipythonPlugins/vendor/ipython/kernel.js",
                             "./plugins/eval/ipythonPlugins/vendor/ipython/outputarea.js"
                            ], onSuccess, onFail);
        } else {
          bkHelper.loadList(["./plugins/eval/ipythonPlugins/vendor/ipython2/namespace.js",
                             "./plugins/eval/ipythonPlugins/vendor/ipython2/utils.js",
                             "./plugins/eval/ipythonPlugins/vendor/ipython2/kernel.js",
                             "./plugins/eval/ipythonPlugins/vendor/ipython2/session.js",
                             "./plugins/eval/ipythonPlugins/vendor/ipython2/comm.js",
                             "./plugins/eval/ipythonPlugins/vendor/ipython2/outputarea.js"
                            ], onSuccess, onFail);
        }
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
          });
          return deferred.promise;
        }
      };
    },
    function(err) { return err; });
  };

  exports.name = PLUGIN_NAME;
});
