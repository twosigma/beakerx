/*
 *  Copyright 2014 TWO SIGMA INVESTMENTS, LLC
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
(function() {
  'use strict';
  var url = "./plugins/eval/ipythonPlugins/ipython/ipython.js";
  var PLUGIN_NAME = "IPython";
  var COMMAND = "ipythonPlugins/ipython/ipythonPlugin";
  var kernels = {};
  var _theCancelFunction = null;
  var serviceBase = null;
  var now = function() {
    return new Date().getTime();
  };
  var IPythonProto = {
    pluginName: PLUGIN_NAME,
    cmMode: "python",
    background: "#EAEAFF",
    newShell: function(shellID, cb) {
      // check in kernel table if shellID exists, then do nothing or still callback?
      if (kernels[shellID]) {
        return;
      }

      if (_.isEmpty(shellID)) {
        shellID = IPython.utils.uuid();
      }

      var kernel = new IPython.Kernel(serviceBase + "/kernels/");
      kernels[shellID] = kernel;
      kernel.start("kernel." + bkHelper.getSessionID() + "." + shellID);
      // keepalive for the websockets
      var nil = function() {
      };
      window.setInterval(function() {
        var ignore = {
          execute_reply: nil,
          output: nil,
          clear_output: nil,
          set_next_input: nil
        };
        kernel.execute("", ignore, {silent: false});
      }, 30 * 1000);

      // cb cannot be called synchronously, see evaluatorManager.js, new Shell
      // Also, do not cb until making sure kernel is running.
      var timeout = now() + 10 * 1000; // time out 10 sec
      var r = function() {
        if (kernel.running) {
          cb(shellID);
        } else if (now() < timeout) {
          setTimeout(r, 100);
        } else {
          console.error("TIMED OUT - waiting for ipython kernel to start");
        }
      };
      r();

    },
    evaluate: function(code, modelOutput) {
      if (_theCancelFunction) {
        throw "multiple evaluation at the same time is not supported";
      }

      // utils
      var emptyOutputResult = function() {
        modelOutput.result = "";
      };
      var ensureOutputIsHtml = function() {
        if (!modelOutput.result ||
            modelOutput.result.type !== "BeakerDisplay" ||
            modelOutput.result.innertype !== "Html") {
          modelOutput.result = {
            type: "BeakerDisplay",
            innertype: "Html",
            object: ""
          };
        }
      }
      var setOutputResult = function(result) {
        ensureOutputIsHtml();
        modelOutput.result.object = result;
      };
      var appendToResult = function(txtToAppend) {
        ensureOutputIsHtml();
        modelOutput.result.object += txtToAppend;
      };

      // begin
      var deferred = bkHelper.newDeferred();
      var self = this;
      var startTime = new Date().getTime();
      var kernel = kernels[self.settings.shellID];
      var progressObj = {
        type: "BeakerDisplay",
        innertype: "Progress",
        object: {
          message: "evaluating ...",
          startTime: startTime
        }
      };
      modelOutput.result = progressObj;
      modelOutput.outputArrived = false;
      _theCancelFunction = function() {
        var kernel = kernels[self.settings.shellID];
        kernel.interrupt();
        deferred.reject("cancelled by user");
        modelOutput.result = "canceling ...";
      };
      var callbacks = {
        execute_reply: function execute_reply(msg) {
          var result = _(msg.payload).map(function(payload) {
            return IPython.utils.fixCarriageReturn(IPython.utils.fixConsole(payload.text));
          }).join("");
          if (!_.isEmpty(result)) {
            setOutputResult("<pre>" + result + "</pre>");
          } else if (!modelOutput.outputArrived) {
            emptyOutputResult();
          }
          modelOutput.elapsedTime = now() - startTime;
          deferred.resolve();
          bkHelper.refreshRootScope();
        },
        output: function output(type, value) {
          modelOutput.outputArrived = true;
          if (type === "pyerr") {
            var trace = _.reduce(value.traceback, function(memo, line) {
              return  memo + "<br>" + IPython.utils.fixCarriageReturn(IPython.utils.fixConsole(line));
            }, value.evalue);
            modelOutput.result = {
              type: "BeakerDisplay",
              innertype: "Error",
              object: (value.ename === "KeyboardInterrupt") ? "Interrupted" : [value.evalue, trace]
            };
          } else if (type === "stream") {
            var json = JSON.stringify({evaluator: "ipython",
              type: (type === "stream" ? "text" : "html"),
              line: value.data});
            $.cometd.publish("/service/outputlog/put", json);
            appendToResult("");
          } else {
            var elem = $(document.createElement("div"));
            var oa = new IPython.OutputArea(elem);
            oa.append_mime_type(oa.convert_mime_types({}, value.data), elem, true);
            var table = bkHelper.findTable(elem[0]);
            if (table) {
              modelOutput.result = table;
            } else {
              appendToResult(elem.html());
            }
          }
          modelOutput.elapsedTime = now() - startTime;
          deferred.resolve();
          bkHelper.refreshRootScope();
        },
        clear_output: function(msg) {
          console.log("clear_output: " + msg);
        },
        set_next_input: function(msg) {
          console.log("set_next_input: " + msg);
        }
      };
      kernel.execute(code, callbacks, {silent: false});
      deferred.promise.finally(function() {
        _theCancelFunction = null;
      });
      return deferred.promise;
    },
    autocomplete: function(code, cpos, cb) {
      var kernel = kernels[this.settings.shellID];
      kernel.complete(code, cpos, {'complete_reply': function(reply) {
        cb(reply.matches, reply.matched_text);
      }});
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

  var init = function() {
    var onSuccess = function() {
      /* chrome has a bug where websockets don't support authentication so we
       disable it. http://code.google.com/p/chromium/issues/detail?id=123862
       this is safe because the URL has the kernel ID in it, and that's a 128-bit
       random number, only delivered via the secure channel. */
      var nginxRules =
          "location %(base_url)s/kernels/ {" +
          "  proxy_pass http://127.0.0.1:%(port)s/kernels;" +
          "}" +
          "location ~ %(base_url)s/kernels/[0-9a-f-]+/  {" +
          "  rewrite ^%(base_url)s/(.*)$ /$1 break; " +
          "  proxy_pass http://127.0.0.1:%(port)s; " +
          "  proxy_http_version 1.1; " +
          "  proxy_set_header Upgrade $http_upgrade; " +
          "  proxy_set_header Connection \"upgrade\"; " +
          "  proxy_set_header Origin \"$scheme://$host\"; " +
          "  proxy_set_header Host $host;" +
          "}";
      bkHelper.locatePluginService(PLUGIN_NAME, {
          command: COMMAND,
          nginxRules: nginxRules,
          startedIndicator: "[NotebookApp] The IPython Notebook is running at: http://127.0.0.1:",
          startedIndicatorStream: "stderr"
      }).success(function(ret) {
        serviceBase = ret;
        var IPythonShell = function(settings, cb) {
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
            if (cb) {
              cb();
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
        IPythonShell.prototype = IPythonProto;
        bkHelper.getLoadingPlugin(url).onReady(IPythonShell);
      }).error(function() {
        console.log("failed to locate plugin service", PLUGIN_NAME, arguments);
      });
    };
    var onFail = function() {
      console.log("failed to load ipython libs");
    };
    bkHelper.loadList([
      "./plugins/eval/ipythonPlugins/vendor/ipython/namespace.js",
      "./plugins/eval/ipythonPlugins/vendor/ipython/utils.js",
      "./plugins/eval/ipythonPlugins/vendor/ipython/kernel.js",
      "./plugins/eval/ipythonPlugins/vendor/ipython/outputarea.js"],
        onSuccess, onFail);
  };
  init();
})();
