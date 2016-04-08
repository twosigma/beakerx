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

  var LANGUAGE_VERSIONS = {
    "ES5": {name: "ECMAScript 5"},
    "ES2015": {name: "ECMAScript 2015", babel: true, defaultVersion: true}
  };

  function getDefaultLanguageVersion() {
    return _.findKey(LANGUAGE_VERSIONS, function (version) {
      return version.defaultVersion;
    });
  }

  // Not using the es2015 plugin preset because it includes the "transform-es2015-modules-commonjs" plugin which puts forces strict mode on
  var ES2015Plugins = [
  "check-es2015-constants",
  "transform-es2015-arrow-functions",
  "transform-es2015-block-scoped-functions",
  "transform-es2015-block-scoping",
  "transform-es2015-classes",
  "transform-es2015-computed-properties",
  "transform-es2015-destructuring",
  "transform-es2015-for-of",
  "transform-es2015-function-name",
  "transform-es2015-literals",
  "transform-es2015-object-super",
  "transform-es2015-parameters",
  "transform-es2015-shorthand-properties",
  "transform-es2015-spread",
  "transform-es2015-sticky-regex",
  "transform-es2015-template-literals",
  "transform-es2015-typeof-symbol",
  "transform-es2015-unicode-regex",
  "transform-regenerator"
  ];

  var getCompletions = function(token, context, keywords, options) {
    var found = [], start = token.string;

    function maybeAdd(str) {
      if (str.indexOf(start) === 0 && !_.contains(found, str))
        found.push(str);
    }

    function gatherCompletions(obj) {
      if (typeof obj === "string")
        _.each(stringProps, maybeAdd);
      else if (obj instanceof Array)
        _.each(arrayProps, maybeAdd);
      else if (obj instanceof Function)
        _.each(funcProps, maybeAdd);
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
      _.each(keywords, maybeAdd);
    }
    return found;
  };
  var Pos = CodeMirror.Pos;

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

  function showErrorState(err) {
    bkHelper.receiveEvaluationUpdate(err.modelOutput,
        {status: "ERROR", payload: err.payload},
        PLUGIN_NAME);
  }

  var JavaScript_0 = {
    pluginName: PLUGIN_NAME,
    cmMode: "javascript",
    background: "#FFE0F0",
    bgColor: "#EFDB52",
    fgColor: "#4A4A4A",
    borderColor: "",
    shortName: "Js",
    tooltip: "JavaScript is the native scripting language of the web.",
    evaluate: function(code, modelOutput, refreshObj) {
      var deferred = bkHelper.newDeferred();
      var self = this;
      bkHelper.timeout(function () {
        // this is visible to JS code in cell
        var beakerObj = bkHelper.getBeakerObject();
        try {
          var progressObj = {
            type: "BeakerDisplay",
            innertype: "Progress",
            object: {
              message: "running...",
              startTime: new Date().getTime(),
              outputdata: []
            }
          };
          modelOutput.result = progressObj;
          if (refreshObj !== undefined)
            refreshObj.outputRefreshed();
          else
            bkHelper.refreshRootScope();

          beakerObj.setupBeakerObject(modelOutput);
          beakerObj.notebookToBeakerObject();
          window.beaker = beakerObj.beakerObj;
          try {
            if (LANGUAGE_VERSIONS[self.settings.languageVersion].babel) {
              code = Babel.transform(code, { plugins: ES2015Plugins }).code;
            } else {
              acorn.parse(code);
            }
          } catch (e) {
            showErrorState({
              modelOutput: modelOutput,
              payload: e.message
            });
            beakerObj.clearOutput();
            return deferred.reject();
          }
          // (0, eval) is an indirect eval call to evaluate in non-strict mode
          // more info: http://stackoverflow.com/questions/19357978/indirect-eval-call-in-strict-mode
          var output = (0, eval)(code);
          beakerObj.beakerObjectToNotebook();
          if ( typeof output === 'object' ) {
            if(typeof output.promise === 'object' && typeof output.promise.then === 'function') {
              output = output.promise;
            }
            if(typeof output.then === 'function') {
              JavascriptCancelFunction = function () {
                showErrorState({
                  modelOutput: modelOutput,
                  payload: 'cancelled...'
                });
                if (modelOutput !== undefined && modelOutput.object !== undefined)
                  modelOutput.elapsedTime = new Date().getTime() - modelOutput.object.startTime;
                JavascriptCancelFunction = null;
                beakerObj.beakerObjectToNotebook();
                if ( typeof output.reject === 'function') {
                  output.reject();
                  output = undefined;
                } else {
                  deferred.reject();
                }
              };
              output.then(function(o) {
                JavascriptCancelFunction = null;
                if (beakerObj.isCircularObject(o))
                  o = "ERROR: circular objects are not supported";
                else
                  o = beakerObj.transform(o);
                bkHelper.receiveEvaluationUpdate(modelOutput, {status: "FINISHED", payload: o}, PLUGIN_NAME);
                beakerObj.beakerObjectToNotebook();
                deferred.resolve(o);
                beakerObj.clearOutput();
              }, function(e) {
                JavascriptCancelFunction = null;
                bkHelper.receiveEvaluationUpdate(modelOutput,
                    {status: "ERROR", payload: e}, PLUGIN_NAME);
                console.log(e);
                beakerObj.beakerObjectToNotebook();
                var r;
                if (beakerObj.isCircularObject(modelOutput.result))
                  r = "ERROR: circular objects are not supported";
                else
                  r = beakerObj.transform(modelOutput.result);
                deferred.reject(r);
                beakerObj.clearOutput();
              });
            } else {
              if (!beakerObj.isBeakerObject(output) && beakerObj.isCircularObject(output))
                output = "ERROR: circular objects are not supported";
              else
                output = beakerObj.transform(output);
              bkHelper.receiveEvaluationUpdate(modelOutput, {status: "FINISHED", payload: output}, PLUGIN_NAME);
              deferred.resolve(output);
              beakerObj.clearOutput();
            }
          } else {
            bkHelper.receiveEvaluationUpdate(modelOutput, {status: "FINISHED", payload: output}, PLUGIN_NAME);
            deferred.resolve(output);
            beakerObj.clearOutput();
          }
        } catch (err) {
          // detect chrome or firefox stack traces
          var stack = [];
          try {
            if (err.fileName !== undefined) {
              var stackin = err.stack.split(/\n/);
              stack.push(err.name+': '+err.message);
              var stage = 0;
              for(var i=0; i<stackin.length; i++) {
                var line = stackin[i];
                if (line.indexOf(' > eval:')>=0) {
                  var a = line.indexOf('@');
                  var b = line.indexOf(' > eval:');
                  stage = 1;
                  stack.push('    at '+line.substring(0,a)+' &lt;codecell&gt;'+line.substring(b+7));
                } else if(stage==0) {
                  stack.push(line);
                } else
                  break;
              }
              if (stack.length>1)
                stack.pop();
            } else {
              var stackin = err.stack.split(/\n/);

              stack.push(stackin[0]);
              for(var i=1; i<stackin.length; i++) {
                var line = stackin[i];
                if (line.indexOf(' at eval (eval at <anonymous> ')>=0)
                    break;
                    if (line.indexOf(' (eval at <anonymous>')>=0 && line.indexOf(', <anonymous>:')>=0 ) {
                      var a = line.indexOf(' (eval at <anonymous>');
                          var b = line.indexOf(', <anonymous>:')+13;
                          var c = line.indexOf(')',b);
                          stack.push(line.substring(0,a)+' &lt;codecell&gt;'+line.substring(b,c));
                          } else
                          stack.push(line);
                          }
                          }
                          } catch(e) { }
                          showErrorState({
                            modelOutput: modelOutput,
                            payload: stack
                          });
                          console.log(stack);
                          beakerObj.clearOutput();
                          var r;
                          if (beakerObj.isCircularObject(modelOutput.result))
                          r = "ERROR: circular objects are not supported";
                          else
                          r = beakerObj.transform(modelOutput.result);
                          deferred.reject(r);
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
    exit: function(cb) {
      this.cancelExecution();
      JavascriptCancelFunction = null;
    },
    spec: {
      languageVersion: {
        type: "settableEnum",
        name: "JavaScript Version",
        values: _.mapValues(LANGUAGE_VERSIONS, function(version) {return version.name;})
      },
      libraries: {
        type: "settableSelect",
        remote: "https://api.cdnjs.com/libraries"
      }
    }
  };
  var JavaScript0 = function(settings) {
    if (!settings.view) {
      settings.view = {};
    }
    if (!settings.view.cm) {
      settings.view.cm = {};
    }
    settings.view.cm.mode = JavaScript_0.cmMode;
    settings.view.cm.background = JavaScript_0.background;
    this.settings = settings;

    if (!_.contains(_.keys(LANGUAGE_VERSIONS), this.settings.languageVersion)) {
      this.settings.languageVersion = getDefaultLanguageVersion();
    }
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
