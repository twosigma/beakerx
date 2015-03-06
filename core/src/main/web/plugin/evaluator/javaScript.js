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
 * JavaScript eval plugin
 * For creating and config evaluators that evaluate JavaScript code and update code cell results.
 */
define(function(require, exports, module) {
  'use strict';
  var PLUGIN_NAME = "JavaScript";
  var stringProps = ("charAt charCodeAt indexOf lastIndexOf substring substr slice trim trimLeft trimRight " +
      "toUpperCase toLowerCase split concat match replace search").split(" ");
  var arrayProps = ("length concat join splice push pop shift unshift slice reverse sort indexOf " +
      "lastIndexOf every some filter forEach map reduce reduceRight ").split(" ");
  var funcProps = "prototype apply call bind".split(" ");
  var javascriptKeywords = ("break case catch continue debugger default delete do else false finally for function " +
      "if in instanceof new null return switch throw true try typeof var void while with").split(" ");
  var coffeescriptKeywords = ("and break catch class continue delete do else extends false finally for " +
      "if in instanceof isnt new no not null of off on or return switch then throw true try typeof until void while with yes").split(" ");

  var getCompletions = function(token, context, keywords, options) {
    var found = [], start = token.string;

    function maybeAdd(str) {
      if (str.indexOf(start) === 0 && !arrayContains(found, str))
        found.push(str);
    }

    function gatherCompletions(obj) {
      if (typeof obj === "string")
        forEach(stringProps, maybeAdd);
      else if (obj instanceof Array)
        forEach(arrayProps, maybeAdd);
      else if (obj instanceof Function)
        forEach(funcProps, maybeAdd);
      for (var name in obj)
        maybeAdd(name);
    }

    if (context) {
      // If this is a property, see if it belongs to some object we can
      // find in the current environment.
      var obj = context.pop(), base;
      if (obj.type.indexOf("variable") === 0) {
        if (options && options.additionalContext)
          base = options.additionalContext[obj.string];
        base = base || window[obj.string];
      } else if (obj.type === "string") {
        base = "";
      } else if (obj.type === "atom") {
        base = 1;
      } else if (obj.type === "function") {
        if (window.jQuery !== null && (obj.string === '$' || obj.string === 'jQuery') &&
            (typeof window.jQuery === 'function'))
          base = window.jQuery();
        else if (window._ !== null && (obj.string === '_') && (typeof window._ === 'function'))
          base = window._();
      }
      while (base !== null && context.length)
        base = base[context.pop().string];
      if (base !== null)
        gatherCompletions(base);
    }
    else {
      // If not, just look in the window object and any local scope
      // (reading into JS mode internals to get at the local and global variables)
      for (var v = token.state.localVars; v; v = v.next)
        maybeAdd(v.name);
      for (var v = token.state.globalVars; v; v = v.next)
        maybeAdd(v.name);
      gatherCompletions(window);
      forEach(keywords, maybeAdd);
    }
    return found;
  };
  var Pos = CodeMirror.Pos;

  function forEach(arr, f) {
    for (var i = 0, e = arr.length; i < e; ++i)
      f(arr[i]);
  }

  function arrayContains(arr, item) {
    if (!Array.prototype.indexOf) {
      var i = arr.length;
      while (i--) {
        if (arr[i] === item) {
          return true;
        }
      }
      return false;
    }
    return arr.indexOf(item) !== -1;
  }

  function scriptHint(editor, keywords, getToken, options) {
    // Find the token at the cursor
    var cur = editor.getCursor(), token = getToken(editor, cur), tprop = token;
    token.state = CodeMirror.innerMode(editor.getMode(), token.state).state;

    // If it's not a 'word-style' token, ignore the token.
    if (!/^[\w$_]*$/.test(token.string)) {
      token = tprop = {start: cur.ch, end: cur.ch, string: "", state: token.state,
        type: token.string === "." ? "property" : null};
    }
    // If it is a property, find out what it is a property of.
    while (tprop.type === "property") {
      tprop = getToken(editor, Pos(cur.line, tprop.start));
      if (tprop.string !== ".")
        return;
      tprop = getToken(editor, Pos(cur.line, tprop.start));
      if (tprop.string === ')') {
        var level = 1;
        do {
          tprop = getToken(editor, Pos(cur.line, tprop.start));
          switch (tprop.string) {
            case ')':
              level++;
              break;
            case '(':
              level--;
              break;
            default:
              break;
          }
        } while (level > 0);
        tprop = getToken(editor, Pos(cur.line, tprop.start));
        if (tprop.type.indexOf("variable") === 0)
          tprop.type = "function";
        else
          return; // no clue
      }
      if (!context)
        var context = [];
      context.push(tprop);
    }
    return getCompletions(token, context, keywords, options);
  }

  var JavascriptCancelFunction = null;

  var JavaScript_0 = {
    pluginName: PLUGIN_NAME,
    cmMode: "javascript",
    background: "#FFE0F0",
    bgColor: "#EFDB52",
    fgColor: "#4A4A4A",
    borderColor: "",
    shortName: "Js",
    evaluate: function(code, modelOutput, refreshObj) {
        var deferred = bkHelper.newDeferred();
        bkHelper.timeout(function () {
          try {
            var beaker = bkHelper.getNotebookModel().namespace; // this is visible to JS code in cell
            if (undefined === beaker) {
              bkHelper.getNotebookModel().namespace = {};
              beaker = bkHelper.getNotebookModel().namespace;
            }
            var progressObj = {
                type: "BeakerDisplay",
                innertype: "Progress",
                object: {
                  message: "running...",
                  startTime: new Date().getTime()
                }
              };
            modelOutput.result = progressObj;
            if (refreshObj !== undefined)
              refreshObj.outputRefreshed();
            else
              bkHelper.refreshRootScope();
            
            beaker._beaker_model_output_result = modelOutput.result;
            beaker.showProgressUpdate = function (a,b,c) {
              if ( a === undefined || beaker._beaker_model_output_result === undefined || beaker._beaker_model_output_result.object === undefined)
                return;
              if ( typeof a === 'string' )
                beaker._beaker_model_output_result.object.message = a;
              else if ( typeof a === 'number' )
                beaker._beaker_model_output_result.object.progressBar = a;
              else if ( a !== null )
                beaker._beaker_model_output_result.object.payload = a;

              if ( typeof b === 'string' )
                beaker._beaker_model_output_result.object.message = b;
              else if ( typeof b === 'number' )
                beaker._beaker_model_output_result.object.progressBar = b;
              else if ( b !== null )
                beaker._beaker_model_output_result.object.payload = b;

              if ( typeof c === 'string' )
                beaker._beaker_model_output_result.object.message = c;
              else if ( typeof c === 'number' )
                beaker._beaker_model_output_result.object.progressBar = c;
              else if ( c !== null )
                beaker._beaker_model_output_result.object.payload = c;
            };
            
            beaker.showStatus = bkHelper.showStatus;
            beaker.clearStatus = bkHelper.clearStatus;
            beaker.showTransientStatus = bkHelper.showTransientStatus;
            beaker.getEvaluators = bkHelper.getEvaluators;
            beaker.getCodeCells = bkHelper.getCodeCells;
            beaker.setCodeCellBody = bkHelper.setCodeCellBody;
            beaker.setCodeCellEvaluator = bkHelper.setCodeCellEvaluator;
            beaker.setCodeCellTags = bkHelper.setCodeCellTags;
            beaker.evaluate = bkHelper.evaluate;
            beaker.evaluateCode = bkHelper.evaluateCode;
            beaker.loadJS = bkHelper.loadJS;
            beaker.loadCSS = bkHelper.loadCSS;
            beaker.loadList = bkHelper.loadList;
            beaker.httpGet = bkHelper.httpGet;
            beaker.httpPost = bkHelper.httpPost;
            beaker.newDeferred = bkHelper.newDeferred;
            beaker.newPromise = bkHelper.newPromise;
            beaker.all = bkHelper.all;
            beaker.timeout = bkHelper.timeout;

            var output = eval(code);
            if ( typeof output === 'object' ) {
              if(typeof output.promise === 'object' && typeof output.promise.then === 'function') {
                output = output.promise;
              }
              if(typeof output.then === 'function') {
                JavascriptCancelFunction = function () {
                  modelOutput.result = {
                      type: "BeakerDisplay",
                      innertype: "Error",
                      object: "cancelled..."
                  };
                  modelOutput.elapsedTime = new Date().getTime() - progressObj.object.startTime;
                  JavascriptCancelFunction = null;
                  if ( typeof output.reject === 'function') {
                    output.reject();
                    output = undefined;
                  } else {
                    deferred.reject();
                  }
                }
                output.then(function(o) {
                  modelOutput.result = o;
                  deferred.resolve(o);
                  delete beaker._beaker_model_output_result;
                }, function(e) {
                  modelOutput.result = {
                      type: "BeakerDisplay",
                      innertype: "Error",
                      object: "" + e
                  };
                  deferred.reject(e);
                  delete beaker._beaker_model_output_result;
                });
              } else {
                modelOutput.result = output;  
                deferred.resolve(output);
                delete beaker._beaker_model_output_result;
              }
            } else {
              modelOutput.result = output;
              deferred.resolve(output);
              delete beaker._beaker_model_output_result;
            }
          } catch (err) {
            modelOutput.result = {
                type: "BeakerDisplay",
                innertype: "Error",
                object: "" + err
            };
            deferred.reject(modelOutput.result);
          }
        }, 0);
        return deferred.promise;
      },
      interrupt: function() {
        this.cancelExecution();
      },
      cancelExecution: function () {
        if (JavascriptCancelFunction) {
          JavascriptCancelFunction();
        }
      },

    autocomplete2: function(editor, options, cb) {
      var ret = scriptHint(editor, javascriptKeywords,
          function(e, cur) {
            return e.getTokenAt(cur);
          },
          options);
      cb(ret,undefined,true);
    },
    updateJsSetting1: function() {
      //console.log("dummy Setting#1", this.settings.pySetting1);
    },
    updateJsSetting2: function() {
      //console.log("dummy Setting#2", this.settings.jsSetting2);
    },
    updateAll: function() {
      this.updateJsSetting1();
      this.updateJsSetting2();
    },
    exit: function(cb) {
      this.cancelExecution();
      JavascriptCancelFunction = null;
    },
    spec: {
    }
  };
  var JavaScript0 = function(settings) {
    if (!settings.jsSetting2) {
      settings.jsSetting2 = "";
    }
    if (!settings.jsSetting1) {
      settings.jsSetting1 = "";
    }
    if (!settings.view) {
      settings.view = {};
    }
    if (!settings.view.cm) {
      settings.view.cm = {};
    }
    settings.view.cm.mode = JavaScript_0.cmMode;
    settings.view.cm.background = JavaScript_0.background;
    this.settings = settings;
    this.updateAll();
    this.perform = function(what) {
      var action = this.spec[what].action;
      this[action]();
    };
  };
  JavaScript0.prototype = JavaScript_0;

  exports.getEvaluatorFactory = function() {
    return bkHelper.getEvaluatorFactory(bkHelper.newPromise(JavaScript0));
  };
  exports.name = PLUGIN_NAME;
});
