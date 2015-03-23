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

  var knownBeakerVars = { };
  var beakerObj = {}

  function setupBeakerObject(modelOutput) {
    
    if (beakerObj.showProgressUpdate === undefined) {
      console.log("setupBeakerObject");
          
      Object.defineProperty(beakerObj, 'showProgressUpdate', { value: function (a,b,c) {
        if ( a === undefined || beakerObj._beaker_model_output_result === undefined || beakerObj._beaker_model_output_result.object === undefined)
          return;
        if ( typeof a === 'string' )
          beakerObj._beaker_model_output_result.object.message = a;
        else if ( typeof a === 'number' )
          beakerObj._beaker_model_output_result.object.progressBar = a;
        else if ( a !== null )
          beakerObj._beaker_model_output_result.object.payload = a;
  
        if ( typeof b === 'string' )
          beakerObj._beaker_model_output_result.object.message = b;
        else if ( typeof b === 'number' )
          beakerObj._beaker_model_output_result.object.progressBar = b;
        else if ( b !== null )
          beakerObj._beaker_model_output_result.object.payload = b;
  
        if ( typeof c === 'string' )
          beakerObj._beaker_model_output_result.object.message = c;
        else if ( typeof c === 'number' )
          beakerObj._beaker_model_output_result.object.progressBar = c;
        else if ( c !== null )
          beakerObj._beaker_model_output_result.object.payload = c;
      }, writeable: false });
      
      Object.defineProperty(beakerObj, 'showStatus', { value: bkHelper.showStatus, writeable: false });
      Object.defineProperty(beakerObj, 'clearStatus', { value: bkHelper.clearStatus, writeable: false });
      Object.defineProperty(beakerObj, 'showTransientStatus', { value: bkHelper.showTransientStatus, writeable: false });
      Object.defineProperty(beakerObj, 'getEvaluators', { value: bkHelper.getEvaluators, writeable: false });
      Object.defineProperty(beakerObj, 'getCodeCells', { value: bkHelper.getCodeCells, writeable: false });
      Object.defineProperty(beakerObj, 'setCodeCellBody', { value: bkHelper.setCodeCellBody, writeable: false });
      Object.defineProperty(beakerObj, 'setCodeCellEvaluator', { value: bkHelper.setCodeCellEvaluator, writeable: false });
      Object.defineProperty(beakerObj, 'setCodeCellTags', { value: bkHelper.setCodeCellTags, writeable: false });
      Object.defineProperty(beakerObj, 'evaluate', { value: bkHelper.evaluate, writeable: false });
      Object.defineProperty(beakerObj, 'evaluateCode', { value: bkHelper.evaluateCode, writeable: false });
      Object.defineProperty(beakerObj, 'loadJS', { value: bkHelper.loadJS, writeable: false });
      Object.defineProperty(beakerObj, 'loadCSS', { value: bkHelper.loadCSS, writeable: false });
      Object.defineProperty(beakerObj, 'loadList', { value: bkHelper.loadList, writeable: false });
      Object.defineProperty(beakerObj, 'httpGet', { value: bkHelper.httpGet, writeable: false });
      Object.defineProperty(beakerObj, 'httpPost', { value: bkHelper.httpPost, writeable: false });
      Object.defineProperty(beakerObj, 'newDeferred', { value: bkHelper.newDeferred, writeable: false });
      Object.defineProperty(beakerObj, 'newPromise', { value: bkHelper.newPromise, writeable: false });
      Object.defineProperty(beakerObj, 'all', { value: bkHelper.all, writeable: false });
      Object.defineProperty(beakerObj, 'timeout', { value: bkHelper.timeout, writeable: false });
      console.log("setupBeakerObject - done");
    }
    Object.defineProperty(beaker, '_beaker_model_output_result', { value: modelOutput.result, writeable: false, enumerable: false });

    notebookToBeakerObject();
  }
  
  function isPrimitiveType(v) {
    if (_.isDate(v) || _.isString(v) || _.isNumber(v) || _.isBoolean(v) || _.isNaN(v) || _.isNull(v) || _.isUndefined(v))
      return true;
    return false;
  }
  
  function getDataType(v) {
    if (_.isDate(v))
      return "time";
    if(_.isNumber(v)) // can we do a better job here?
      return "double";
    if(_.isBoolean(v))
      return "boolean";
    return "string";    
  }
  
  function isDictionary(v) {
    if (!_.isObject(v))
      return false;
    for(var i in v) {
      if (!isPrimitiveType(v[i]))
        return false;
    }
    return true;
  }
  
  function transform(v) {
    if (_.isFunction(v) || _.isUndefined(v))
      return null;
    
    if (_.isDate(v)) {
      var o = {}
      o.type = "Date";
      o.value = v.toString();
      o.timestamp = v.getTime();
      return o
    }

    if (_.isArray(v) && v.length>0) {
      var doit = true;
      for(var r in v) {
        if (!_.isArray(v[r])) {
          doit = false;
          break;
        }
        for (var c in (v[r])) {
          if (!isPrimitiveType(v[r][c])) {
            doit = false;
            break;
          }
        }
      }
      if (doit) {
        var o = {}
        o.type = "TableDisplay";
        o.values = v;
        o.subtype = "Matrix";
        o.columnNames = [];
        o.types = [];
        for(var i in v[0]) {
          o.columnNames.push('c'+i);
          o.types.push(getDataType(v[0][i]));          
        }
        return o;
      } else {
        doit = true;
        for(var r in v) {
          if (!isDictionary(v[r])) {
            doit = false;
            break;
          }
        }
        if (doit) {
          console.log("is a list of maps");
          return v;
        }
      }
    }
    
    if (_.isObject(v) && isDictionary(v)) {
      var o = {}
      o.type = "TableDisplay";
      o.values = [];
      o.subtype = "Dictionary";
      o.columnNames= ['Key','Value'];
      for (var i in v) {
        var r = [];
        r.push(i);
        r.push(v[i]);
        o.values.push(r);
      }
      return o;
    }
    for(var p in v) {
      v[p] = transform(v[p]);
    }
    return v;
  }

  function transformBack(v) {
    if(v === undefined || (!_.isObject(v) && !_.isArray(v)))
      return v;

    if (v.type !== undefined) {
      if (v.type === "Date") {
        return new Date(v.value);
      }
      if (v.type === "TableDisplay") {
        if (v.subtype === "Dictionary") {
          var o = {}
          for (var r in v.values) {
            o[v.values[r][0]] = v.values[r][1];
          }
          return o;
        }
        if (v.subtype === "Matrix") {
          return v.values;
        }
        if (v.subtype === "ListOfMaps") {
          var out2 = [];
          for (var r in v.values) {
            var out3 = { };
            for (var i=0; i<v.values[r].length; i++) {
              if (v.values[r][i] !== null)
                out3[ v.columnNames[i] ] = v.values[r][i];
            }
            out2.push(out3);
          }
          return out2;
        }
        console.log("TODO DataFrame");
      }
    }
    for(var p in v) {
      v[p] = transformBack(v[p]);
    }
    return v;
  }

  function beakerGetter(name) {
    var ns = bkHelper.getNotebookModel().namespace;
    return transformBack(ns[name]);
  }

  function beakerSetter(name, v) {
    var ns = bkHelper.getNotebookModel().namespace;
    ns[name] = transform(v);
  }

  function notebookToBeakerObject() {
    var ns = bkHelper.getNotebookModel().namespace;

    for (var p in knownBeakerVars) {
      if (ns[p] === undefined) {
        console.log('remove slot for '+p);
        delete knownBeakerVars[p];
        delete beakerObj[p];
      }
    }

    for (var p in ns) {
      if (knownBeakerVars[p] === undefined && beakerObj[p] === undefined) {
        console.log('adding slot for '+p);
        knownBeakerVars[p] = true;
        Object.defineProperty(beakerObj, p,
            { writeable: true,
              get: function()  { return beakerGetter(p); },
              set: function(v) { beakerSetter(p,v); }
            });
      }
    }
  }
  
  function beakerObjectToNotebook() {
    var ns = bkHelper.getNotebookModel().namespace;
    for (var p in beakerObj) {
      if (!_.isFunction(beakerObj[p])) {
        if (knownBeakerVars[p] === undefined) {
          console.log('new slot for '+p);
          beakerSetter(p,beakerObj[p]);
          knownBeakerVars[p] = true;
          Object.defineProperty(beakerObj, p,
              { writeable: true,
                get: function()  { return beakerGetter(p); },
                set: function(v) { beakerSetter(p,v); }
              });
        }
      }
    }
  }
  
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

            bkHelper.getNotebookModel().namespace; 
            if (undefined === bkHelper.getNotebookModel().namespace) {
              bkHelper.getNotebookModel().namespace = {};
              beaker = bkHelper.getNotebookModel().namespace;
            }

            setupBeakerObject(beakerObj, modelOutput);

            var beaker = beakerObj; // this is visible to JS code in cell
 
            var output = eval(code);
            beakerObjectToNotebook();
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
                  o = transform(o);
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
                output = transform(output);
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
