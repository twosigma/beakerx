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
(function() {
  'use strict';
  var url = "./plugins/eval/ipythonPlugins/ipython/ipython.js";
  var PLUGIN_NAME = "IPython";
  var COMMAND = "ipythonPlugins/ipython/ipythonPlugin";
  var kernels = {};
  var _theCancelFunction = null;
  var serviceBase = null;
  var ipyVersion1 = false;
  var now = function() {
    return new Date().getTime();
  };
  var IPythonProto = {
    pluginName: PLUGIN_NAME,
    cmMode: "python",
    background: "#EAEAFF",
    newShell: function(shellID, cb) {

      var kernel = null;
      var self = this;

      // check in kernel table if shellID exists, then do nothing or still callback?
      if (kernels[shellID]) {
        return;
      }

      if (_.isEmpty(shellID)) {
        shellID = IPython.utils.uuid();
      }

      if (ipyVersion1) {
        self.kernel = new IPython.Kernel(serviceBase + "/kernels/");
        kernels[shellID] = self.kernel;
        self.kernel.start("kernel." + bkHelper.getSessionID() + "." + shellID);
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
            self.kernel = new IPython.Kernel(serviceBase + "/api/kernels");
            kernels[shellID] = self.kernel;
            // the data.id is the session id but it is not used yet
            self.kernel._kernel_started({id: data.kernel.id});
          }
        };
        var url = IPython.utils.url_join_encode(serviceBase, 'api/sessions/');
        $.ajax(url, ajaxsettings);
      }

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
      setTimeout(spin, 0);
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
      var execute_reply = function(msg) {
        if (!ipyVersion1) {
          msg = msg.content;
        }
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
      }
      var output = function output(a0, a1) {
        var type;
        var content;
        if (ipyVersion1) {
          type = a0;
          content = a1;
        } else {
          type = a0.msg_type;
          content = a0.content;
        }
        modelOutput.outputArrived = true;
        if (type === "pyerr") {
          var trace = _.reduce(content.traceback, function(memo, line) {
            return  memo + "<br>" + IPython.utils.fixCarriageReturn(IPython.utils.fixConsole(line));
          }, content.evalue);
          modelOutput.result = {
            type: "BeakerDisplay",
            innertype: "Error",
            object: (content.ename === "KeyboardInterrupt") ? "Interrupted" : [content.evalue, trace]
          };
        } else if (type === "stream") {
          var json = JSON.stringify({evaluator: "ipython",
                                     type: content.name,
                                     line: content.data});
          $.cometd.publish("/service/outputlog/put", json);
          appendToResult("");
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
            modelOutput.result = table;
          } else {
            appendToResult(elem.html());
          }
        }
        modelOutput.elapsedTime = now() - startTime;
        deferred.resolve();
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

  var init = function() {

    
    var onSuccess = function() {
      /* chrome has a bug where websockets don't support authentication so we
       disable it. http://code.google.com/p/chromium/issues/detail?id=123862
       this is safe because the URL has the kernel ID in it, and that's a 128-bit
       random number, only delivered via the secure channel. */
      var nginxRules =
        (ipyVersion1 ? ("location %(base_url)s/kernels/ {" +
                        "  proxy_pass http://127.0.0.1:%(port)s/kernels;" +
                        "}" +
                        "location ~ %(base_url)s/kernels/[0-9a-f-]+/  {") : 
         ("location %(base_url)s/api/kernels/ {" +
          "  proxy_pass http://127.0.0.1:%(port)s/api/kernels;" +
          "}" +
          "location %(base_url)s/api/sessions/ {" +
          "  proxy_pass http://127.0.0.1:%(port)s/api/sessions;" +
          "}" +
          "location ~ %(base_url)s/api/kernels/[0-9a-f-]+/  {")) +
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

    bkHelper.httpGet("/beaker/rest/plugin-services/getIPythonVersion")
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
})();
