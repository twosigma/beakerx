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
 * Python3 eval plugin
 * For creating and config evaluators that uses a IPython kernel for evaluating python3 code
 * and updating code cell outputs.
 */
define(function(require, exports, module) {
  'use strict';

  var PLUGIN_ID = "Python3";
  var PLUGIN_NAME = "Python3";
  var COMMAND = "ipythonPlugins/python3/python3Plugin";
  var kernels = {};
  var _theCancelFunction = null;
  var _keepaliveInterval = null;
  var gotError = false;
  var serviceBase = null;
  var ipyVersion = false;
  var widgetmanager = null;
  var ipywidgetsVersion = null;
  var myPython = null;
  var now = function() {
    return new Date().getTime();
  };

  function isIpythonVersion3OrAbove() {
    return ipyVersion == '3' || ipyVersion == '4' || ipyVersion == '5';
  }

  var Python3Proto = {
      pluginName: PLUGIN_NAME,
      cmMode: "python",
      background: "#EAEAFF",
      bgColor: "#EEBD48",
      fgColor: "#FFFFFF",
      borderColor: "",
      shortName: "Py",
      tooltip: "Python 3 kernel via Jupyter, including IPython magics.",
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
                          name: "python3"},
                 notebook: {path: "/fake/path" + shellID}
                };
                var fakeNotebook = {
                    events : {
                      on : function() {
                      },
                      trigger : function() {
                      }
                    },
                    get_msg_cell : function() {
                      // there is no cell, cell emulation in:
                      // dist/vendor/ipython3/manager.js#display_widget_view
                      // dist/vendor/ipython3/manager.js#display_view_in_cell
                      // dist/vendor/ipython3/manager.js#callbacks -- for text output with widgets
                      // dist/vendor/ipython3/widget.js#_handle_comm_msg (case 'display')
                      return undefined;
                    }
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
                                           "fakename",
                                           widgetmanager));
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
        _keepaliveInterval = window.setInterval(function() {
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
            console.error("TIMED OUT - waiting for ipython kernel to start");
            ecb("TIMED OUT - waiting for ipython kernel to start");
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
            if (content.data && content.data['application/json'] !== undefined) {
              jsonres = JSON.parse(content.data['application/json']);
            }
            if (jsonres !== undefined && _.isObject(jsonres) && jsonres.type !== undefined) {
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
              if (finalStuff !== undefined) {
                finalStuff.payload = jsonres;
                finalStuff.payload = evaluation.payload;
              }
            } else {
              if (finalStuff !== undefined && finalStuff.jsonres !== undefined) {
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
                    if(content.data['application/javascript']) {
                      elem.append($('<script></script>').html(content.data['application/javascript']));
                    } else {
                      oa.append_mime_type(content, elem);
                    }
                  }
                  var payload = elem.html();
                  if (finalStuff !== undefined && finalStuff.payload !== undefined) {
                    // if we already received an output we should append this output to it
                    var temp = finalStuff.payload;
                    if (temp.type === 'OutputContainer' && temp.psubtype === 'OutputContainer' && _.isArray(temp.items)) {
                      temp.items.push(payload);
                      payload = temp;
                    } else {
                      var temp2 = { 'type' : 'OutputContainer', 'psubtype': 'OutputContainer', 'items' : []};
                      temp2.items.push(temp);
                      temp2.items.push(payload);
                      payload = temp2;
                    }
                  }
                  evaluation.payload = payload;
                  if (finalStuff !== undefined) {
                    finalStuff.payload = evaluation.payload;
                    finalStuff.jsonres = evaluation.jsonres;
                  }
            }
          }
          if (finalStuff === undefined) {            
            finalStuff = evaluation;
            bkHelper.timeout(doFinish,250);
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
          return kernel.complete(code, cpos, {'complete_reply': function(reply) {
            autocompleteCallback(reply.matches, reply.matched_text, cb);
          }});
        }
        if (ipyVersion == '2') {
          return kernel.complete(code, cpos, function(reply) {
            autocompleteCallback(reply.content.matches, reply.content.matched_text, cb);
          });
        }
        kernel.complete(code, cpos, function(reply) {
          autocompleteCallback(reply.content.matches, code.substring(reply.content.cursor_start, reply.content.cursor_end), cb);
        });
      },
      getAutocompleteDocumentation: function(matchedWord, callback) {
        this.showDocs(matchedWord, matchedWord.length - 1, function(docs) {
          var documentation = {};
          if (docs.hasOwnProperty('ansiHtml')) {
            documentation.description = docs.ansiHtml && docs.ansiHtml.length ? ansi_up.ansi_to_html(docs.ansiHtml) : '';
            documentation.parameters = matchedWord[0] === '%' ? void 0 : getParametersFromDocumentation(documentation.description);
            return callback(documentation);
          }
          documentation.description = docs;
          return callback(documentation);
        }.bind(this));
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
        if(_keepaliveInterval){
          clearInterval(_keepaliveInterval);
        }
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
      forceCancel: function() {
        _theCancelFunction = null;
      },
      initCode: function() {
        return ("import beaker_runtime3 as beaker_runtime\n" +
            "beaker = beaker_runtime.Beaker()\n" +
            "beaker.register_output()\n" +
            "beaker.set_session('" + bkHelper.getSessionId() + "')\n" +
            this.settings.setup + "\n");
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
  function autocompleteCallback(matches, matchedText, callback) {
    if (_.isEmpty(matchedText)) {
      return;
    }
    callback(_.filter(matches, function(match) {
      return _.startsWith(match, matchedText);
    }), matchedText);
  }

  function getParametersFromDocumentation(documentation) {
    // Parsing parameters from documentation
    var start = documentation.indexOf('Parameters\n');
    if (start === -1) {
      var div = document.createElement('div');
      div.innerHTML = documentation;
      return getParametersFromSection(getDocumentationSection(div.innerText, 'Signature'));
    }

    documentation = documentation.substring(start);
    documentation = documentation.substring(documentation.indexOf('-\n') + 2, documentation.indexOf('\n\n'));
    return _.map(documentation.split(/\n(?=\S)/), function(param) {
      var s = param.split(':');
      return {name: s[0].trim(), description: s[1].trim()};
    });
  }

  function getDocumentationSection(documentation, sectionName) {
    var start = documentation.indexOf(sectionName);
    if (start === -1) {
      return '';
    }
    start += sectionName.length + 1;
    var stop = documentation.lastIndexOf('\n', documentation.indexOf(':', start));
    if (stop === -1) {
      return documentation.substr(start);
    }
    return documentation.substring(start, stop).trim();
  }

  function getParametersFromSection(documentationSection) {
    if (_.isEmpty(documentationSection)) {
      return [];
    }
    var paramArray = documentationSection.substring(documentationSection.indexOf('(') + 1, documentationSection.indexOf(')')).split(',');
    return _(paramArray).filter(function(param) {
      // filtering out *args and **kwargs parameters
      return !_.includes(['*args', '**kwargs'], param.trim());
    }).map(function(param) {
      return {name: param.trim()};
    }).value();
  }

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
      }
      myPython = (ipyVersion == '1') ? IPython1 : ((ipyVersion == '2') ? IPython2 : IPython);

      bkHelper.locatePluginService(PLUGIN_ID, {
        command: COMMAND,
        nginxRules: (ipyVersion == '1') ? "ipython1" : "ipython2"
      }).success(function(ret) {
        serviceBase = ret;
        var Python3Shell = function(settings, doneCB, ecb) {
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
                    var errorHtml =
                      'See <a target="_blank" href="https://github.com/twosigma/beaker-notebook/wiki/Python-Mismatch-Errors">our wiki</a> for how to handle this.';
                    bkHelper.showErrorModal('ERROR: ' + err[0].replace('_beaker_python_mismatch_', errorHtml), 'Python3 initialization failed', err[1]);  
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
        Python3Shell.prototype = Python3Proto;
        shellReadyDeferred.resolve(Python3Shell);
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

          var values = result.split("\n");
          var versions = {};
          for(var i=0; i<values.length; i++){
            var temp = values[i].split("==");
            versions[temp[0]] = temp[1];
          }
          ipyVersion = versions.ipython[0];
          ipywidgetsVersion = versions.ipywidgets === 'NONE' ? null : versions.ipywidgets;

          console.log("Using ipython compatibility mode: " + ipyVersion);
          console.log("Using ipywidgets compatibility mode: " + versions.ipywidgets);

          var toLoad = []; 
          
          if (ipyVersion == '1') {
            toLoad.push(bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython/namespace.js"));
            toLoad.push(bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython/utils.js"));
            toLoad.push(bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython/kernel.js"));
            toLoad.push(bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython/outputarea.js"));
          } else if (ipyVersion == '2') {
            toLoad.push(bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython2/namespace.js"));
            toLoad.push(bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython2/utils.js"));
            toLoad.push(bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython2/kernel.js"));
            toLoad.push(bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython2/session.js"));
            toLoad.push(bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython2/comm.js"));
            toLoad.push(bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython2/outputarea.js"));
          } else {
            toLoad.push(bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython3/namespace.js"));
            toLoad.push(bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython3/utils.js"));
            toLoad.push(bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython3/kernel.js"));
            toLoad.push(bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython3/session.js"));
            toLoad.push(bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython3/serialize.js"));
            toLoad.push(bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython3/comm.js"));
            toLoad.push(bkHelper.fileUrl("plugins/eval/ipythonPlugins/vendor/ipython3/outputarea.js"));
          }
          
          var initwidgetsDone = function(initwidgets) {
            widgetmanager = initwidgets;
            bkHelper.loadList(toLoad, onSuccess, onFail);
          }
         
          if(ipywidgetsVersion){
            if(ipywidgetsVersion[0] == '4'){
              require(['ipywidgets_init_v4_0_3'], initwidgetsDone);
            }else{
              require(['ipywidgets_init_v4_0_3'], initwidgetsDone);//TODO implement other versions
            }
          }else{
            require(['ipywidgets_init_v4_0_3'], initwidgetsDone);
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
