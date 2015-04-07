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

  var ImageIcon = function(data) {
    if (data === undefined || data.type !== "ImageIcon") {
      this.imageData = [];
      this.width = 0;
      this.height = 0;
    } else {
      this.imageData = data.imageData;
      this.width = data.width;
      this.height = data.height;
    }
  };

  var DataFrame = function(data) {
    if (data === undefined || data.type !== "TableDisplay" || data.subtype !== "TableDisplay") {
      this.columnNames = [];
      this.types = [];
      this.values = [];
    } else {
      this.columnNames = data.columnNames.slice(0);
      this.types = data.types.slice(0);
      this.values = [];
      for (var j in data.values) {
        var vals = [];
        for (var i in data.values[j]) {
          vals.push( transformBack(data.values[j][i]));
        }
        this.values.push(vals);
      }
    }
  };

  DataFrame.prototype.toString = function() {
    var s = '';
    s = 'DataFrame:'+
      '  Rows: '+this.values.length+'\n' +
      '  Data columns (total '+this.columnNames.length+' columns):\n';
    for (var i in this.columnNames) {
      s = s + '    '+this.columnNames[i]+'   '+this.types[i]+'\n';
    }
    ;
    return s;
  };

  DataFrame.prototype.columns = function() {
    return this.columnNames;
  };

  DataFrame.prototype.dtypes = function() {
    return this.types;
  };

  DataFrame.prototype.getColumn = function(name) {
    var i = this.columnNames.indexOf(name);
    if (i < 0)
        return null;
    var o = [];
    for (var j in this.values) {
      o.push(this.values[j][i]);
    }
    return o;
  };

  DataFrame.prototype.getRow = function(i) {
    if (i < 0 || i > this.values.length)
      return null;
    var o = {};
    for (var j in this.columnNames) {
      o[this.columnNames[j]] = this.values[i][j];
    }
    return o;
  };

  DataFrame.prototype.length = function() {
    return this.values.length;
  };

  DataFrame.prototype.removeColumn = function(name) {
    var i = this.columnNames.indexOf(name);
    if (i < 0)
        return false;
    for (var j in this.values) {
      this.values[j].splice(i,1);
    }
    this.columnNames.splice(i,1);
    this.types.splice(i,1);
    return true;
  };

  DataFrame.prototype.addColumn = function(name, data) {
    var i = this.columnNames.indexOf(name);
    if (i >= 0 || data === undefined || data.length === 0)
        return false;

    this.columnNames.push(name);
    this.types.push(getDataType(data[0]));
    var min = data.length > this.values.length ? this.values.length : data.length;
    var j;
    for(j=0; j<min; j++) {
      this.values[j].push(data[j]);
    }
    for(; j<this.values.length; j++) {
      this.values[j].push(null);
    }
    return true;
  };

  DataFrame.prototype.addRow = function(row) {
    var r = [];
    for(c in this.columnNames) {
      if (row[this.columnNames[c]] !== undefined)
        r.push(row[this.columnNames[c]]);
      else
        r.push(null);
    }
    this.values.push(r);
  };

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
  };

  var JavascriptCancelFunction = null;

  function isPrimitiveType(v) {
    if (_.isDate(v) || _.isString(v) || _.isNumber(v) || _.isBoolean(v) || _.isNaN(v) || _.isNull(v) || _.isUndefined(v))
      return true;
    return false;
  };

  function getDataType(v) {
    if (_.isDate(v))
      return "time";
    if(_.isNumber(v)) // can we do a better job here?
      return "double";
    if(_.isBoolean(v))
      return "boolean";
    return "string";
  };

  function isDictionary(v) {
    if (!_.isObject(v))
      return false;
    for(var i in v) {
      if (!isPrimitiveType(v[i]))
        return false;
    }
    return true;
  };

  function transform(v) {
    if (_.isFunction(v) || _.isUndefined(v))
      return null;

    if (_.isDate(v)) {
      var o = {}
      o.type = "Date";
      o.timestamp = v.getTime();
      return o
    }

    if (isPrimitiveType(v))
      return v;

    if (v instanceof ImageIcon) {
      var o = {}
      o.type = "ImageIcon";
      o.imageData = v.imageData;
      o.width = v.width;
      o.height = v.height;
      return o
    }

    if (v instanceof DataFrame) {
      var o = {}
      o.type = "TableDisplay";
      o.subtype = "TableDisplay";
      o.values = [];
      for (var i in v.values) {
        var row = [];
        for (var j in v.values[i]) {
          row.push(transform(v.values[i][j]));
        }
        o.values.push(row);
      }
      o.types = _.isArray(v.types) ? v.types.slice(0) : undefined;
      o.columnNames = _.isArray(v.columnNames) ? v.columnNames.slice(0) : undefined;
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
        o.values = [];
        for (var i in v) {
          var row = [];
          for (var item in v[i])
            row.push(transform(item));
          o.values.push(row);
        }
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
          var o = {};
          o.type = "TableDisplay";
          o.subtype = "ListOfMaps";
          o.columnNames = [];
          for (var i in v) {
            for (var j in v[i]) {
              if (o.columnNames.indexOf(j)<0)
                o.columnNames.push(j);
            }
          }
          o.values = [];
          for (var i in v) {
            var o2 = [];
            for (var j in o.columnNames) {
              var n = o.columnNames[j];
              if (v[i][n] !== undefined)
                o2.push(transform(v[i][n]));
              else
                o2.push(null);
            }
            o.values.push(o2);
          }
          o.types = [];
          for (var j in o.columnNames) {
            var n = o.columnNames[j];
            for (var i in v) {
              if (v[i][n] !== undefined) {
                o.types.push(getDataType(v[i][n]));
                break;
              }
            }
          }
          return o;
        }
      }
    }

    if (_.isArray(v)) {
      var o = [];
      for(var p in v) {
        o.push(transform(v[p]));
      }
      return o;
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
    var o = {};
    for(var p in v) {
      o[p] = transform(v[p]);
    }
    return o;
  };

  function transformBack(v) {
    if(v === undefined || (!_.isObject(v) && !_.isArray(v)))
      return v;

    if (v.type !== undefined) {
      if (v.type === "Date") {
        return new Date(v.timestamp);
      }
      if (v.type === "TableDisplay") {
        if (v.subtype === "Dictionary") {
          var o = {}
          for (var r in v.values) {
            o[v.values[r][0]] = transformBack(v.values[r][1]);
          }
          return o;
        }
        if (v.subtype === "Matrix") {
          var o = [];
          for (var i in v.values) {
            o.push(v.values[i].slice(0));
          }
          return o;
        }
        if (v.subtype === "ListOfMaps") {
          var out2 = [];
          for (var r in v.values) {
            var out3 = { };
            for (var i=0; i<v.values[r].length; i++) {
              if (v.values[r][i] !== null)
                out3[ v.columnNames[i] ] = transformBack(v.values[r][i]);
            }
            out2.push(out3);
          }
          return out2;
        }
        var out = new DataFrame(v);
        return out;
      }
      if (v.type === "ImageIcon")
        return new ImageIcon(v);
    }
    if (!_.isArray(v)) {
      var o = {};
      for(var p in v) {
        o[p] = transformBack(v[p]);
      }
      return o;
    }
    var o = [];
    for(var p in v) {
      o.push(transformBack(v[p]));
    }
    return o;
  };

  var BeakerObject = function() {
    this.knownBeakerVars = { };
    this.getCache = { };
    this.setCache = { };
    this.beakerObj = { }
  };

  BeakerObject.prototype.setupBeakerObject = function(modelOutput, evaluation) {
    var self = this;

    if (this.beakerObj.showProgressUpdate === undefined) {
      Object.defineProperty(this.beakerObj, 'showProgressUpdate', { value: function (a,b,c) {
        if ( a === undefined || self._beaker_model_output_result === undefined ||
            self._beaker_model_output_result.object === undefined)
          return;
        if ( typeof a === 'string' )
          self._beaker_model_output_result.object.message = a;
        else if ( typeof a === 'number' )
          self._beaker_model_output_result.object.progressBar = a;
        else if ( a !== null )
          self._beaker_model_output_result.object.payload = a;

        if ( typeof b === 'string' )
          self._beaker_model_output_result.object.message = b;
        else if ( typeof b === 'number' )
          self._beaker_model_output_result.object.progressBar = b;
        else if ( b !== null )
          self._beaker_model_output_result.object.payload = b;

        if ( typeof c === 'string' )
          self._beaker_model_output_result.object.message = c;
        else if ( typeof c === 'number' )
          self._beaker_model_output_result.object.progressBar = c;
        else if ( c !== null )
          self._beaker_model_output_result.object.payload = c;
      }, writeable: false, enumerable: true });

      Object.defineProperty(this.beakerObj, 'showStatus', { value: bkHelper.showStatus, writeable: false, enumerable: true });
      Object.defineProperty(this.beakerObj, 'clearStatus', { value: bkHelper.clearStatus, writeable: false, enumerable: true });
      Object.defineProperty(this.beakerObj, 'showTransientStatus', { value: bkHelper.showTransientStatus, writeable: false, enumerable: true });
      Object.defineProperty(this.beakerObj, 'getEvaluators', { value: bkHelper.getEvaluators, writeable: false, enumerable: true });
      Object.defineProperty(this.beakerObj, 'getCodeCells', { value: bkHelper.getCodeCells, writeable: false, enumerable: true });
      Object.defineProperty(this.beakerObj, 'setCodeCellBody', { value: bkHelper.setCodeCellBody, writeable: false, enumerable: true });
      Object.defineProperty(this.beakerObj, 'setCodeCellEvaluator', { value: bkHelper.setCodeCellEvaluator, writeable: false, enumerable: true });
      Object.defineProperty(this.beakerObj, 'setCodeCellTags', { value: bkHelper.setCodeCellTags, writeable: false, enumerable: true });
      Object.defineProperty(this.beakerObj, 'evaluate', { value: function(a) {
          var d = bkHelper.newDeferred();
          self.beakerObjectToNotebook();
          bkHelper.evaluate(a).then(function (r) { self.notebookToBeakerObject(); d.resolve(transformBack(r)); }, function (r) { self.notebookToBeakerObject(); d.reject(r); });
          return d.promise;
        }, writeable: false, enumerable: true });
      Object.defineProperty(this.beakerObj, 'evaluateCode', { value: function(a,b) {
        var d = bkHelper.newDeferred();
          self.beakerObjectToNotebook();
          bkHelper.evaluateCode(a,b).then(function (r) { self.notebookToBeakerObject(); d.resolve(transformBack(r)); }, function (r) { self.notebookToBeakerObject(); d.reject(r); });
          return d.promise;
        }, writeable: false, enumerable: true });
      Object.defineProperty(this.beakerObj, 'print', {value: function(input) {
        bkHelper.receiveEvaluationUpdate(modelOutput, {outputdata:[{type:'out', value: input+"\n"}]}, PLUGIN_NAME);
        bkHelper.refreshRootScope();
      }, writeable: false, enumerable: true });
      Object.defineProperty(this.beakerObj, 'printErr', {value: function(input) {
        self.evaluation.outputdata.push({
          type: 'err',
          value: input + "\n"
        });
      }, writeable: false, enumerable: true });
      Object.defineProperty(this.beakerObj, 'loadJS', { value: bkHelper.loadJS, writeable: false, enumerable: true });
      Object.defineProperty(this.beakerObj, 'loadCSS', { value: bkHelper.loadCSS, writeable: false, enumerable: true });
      Object.defineProperty(this.beakerObj, 'loadList', { value: bkHelper.loadList, writeable: false, enumerable: true });
      Object.defineProperty(this.beakerObj, 'httpGet', { value: bkHelper.httpGet, writeable: false, enumerable: true });
      Object.defineProperty(this.beakerObj, 'httpPost', { value: bkHelper.httpPost, writeable: false, enumerable: true });
      Object.defineProperty(this.beakerObj, 'newDeferred', { value: bkHelper.newDeferred, writeable: false, enumerable: true });
      Object.defineProperty(this.beakerObj, 'newPromise', { value: bkHelper.newPromise, writeable: false, enumerable: true });
      Object.defineProperty(this.beakerObj, 'all', { value: bkHelper.all, writeable: false, enumerable: true });
      Object.defineProperty(this.beakerObj, 'timeout', { value: bkHelper.timeout, writeable: false, enumerable: true });
      Object.defineProperty(this.beakerObj, 'DataFrame', { value: DataFrame, writeable: false, enumerable: true });
      Object.defineProperty(this.beakerObj, 'ImageIcon', { value: ImageIcon, writeable: false, enumerable: true });
      this.predefined = Object.keys(this.beakerObj);
    }
    this._beaker_model_output_result = modelOutput.result;
  };


  BeakerObject.prototype.beakerGetter = function(name) {
    if (this.setCache[name] !== undefined) {
      return this.setCache[name];
    }
    var ns = bkHelper.getNotebookModel().namespace;
    if (this.getCache[name] === undefined)
      this.getCache[name] = transformBack(ns[name]);
    // this is required to support subobject modification
    this.setCache[name] = this.getCache[name];
    return this.getCache[name];
  };

  BeakerObject.prototype.beakerSetter = function(name, v) {
    this.setCache[name] = v;
    if (this.beakerSetterTimeout !== undefined)
      bkHelper.cancelTimeout(this.beakerSetterTimeout);
    var makeTimeout = function(self) {
      return function() {
        self.beakerSetterTimeout = undefined;
        self.beakerObjectToNotebook();
      };
    };
    this.beakerSetterTimeout = bkHelper.timeout(makeTimeout(this),500);
  };

  BeakerObject.prototype.notebookToBeakerObject = function() {
    var ns = bkHelper.getNotebookModel().namespace;

    // clear getcache
    this.getCache = { };

    // check if some other language removed a binding
    for (var p in this.knownBeakerVars) {
      if (ns[p] === undefined) {
        delete this.knownBeakerVars[p];
        delete this.beakerObj[p];
        delete this.setCache[p];
      }
    }

    // check if some other language added a binding
    for (var p in ns) {
      var t = ns[p];
      if (this.predefined.indexOf(p) < 0 && _.isFunction(t)) {
        this.beakerObj[p] = t;
      } else if (this.knownBeakerVars[p] === undefined && this.beakerObj[p] === undefined) {
        this.knownBeakerVars[p] = true;
        var makeGetter = function(self, name) {
          return function() { return self.beakerGetter(name); }
        }
        var makeSetter = function(self, name) {
          return function(v) { self.beakerSetter(name,v); }
        }
        Object.defineProperty(this.beakerObj, p,
            { writeable: true,
              get: makeGetter(this, p),
              set: makeSetter(this, p),
              enumerable: true,
              configurable: true
            });
      }
    }
  };

  BeakerObject.prototype.clearOutput = function() {
    this._beaker_model_output_result.object = undefined;
  };

  BeakerObject.prototype.beakerObjectToNotebook = function() {
    var ns = bkHelper.getNotebookModel().namespace;

    var keys = Object.keys(this.beakerObj);
    var stuff = Object.keys(this.knownBeakerVars);
    var diff = $(keys).not(stuff).get();
    diff = $(diff).not(this.predefined).get();

    // check if javascript removed a binding
    for (var p in ns) {
      if (this.knownBeakerVars[p] !== undefined && keys.indexOf(p) <0) {
        delete ns[p];
        delete this.knownBeakerVars[p];
      }
    }

    // check if javascript set any NEW variable
    for (var p in diff) {
      if (this.knownBeakerVars[p] === undefined) {
        var t = this.beakerObj[p];
        if (this.predefined.indexOf(p) < 0 && _.isFunction(t)) {
          // just put functions in the namespace
          ns[p] = t;
        } else {
          this.setCache[p] = t;
          this.knownBeakerVars[p] = true;
          var makeGetter = function(self, name) {
            return function() { return self.beakerGetter(name); }
          }
          var makeSetter = function(self, name) {
            return function(v) { self.beakerSetter(name,v); }
          }
          Object.defineProperty(this.beakerObj, p,
              { writeable: true,
                get: makeGetter(this,p),
                set: makeSetter(this,p),
                enumerable: true,
                configurable: true
              });
        }
      }
    }

    // check if javascript set any new variable
    for (var p in this.setCache) {
      ns[p] = transform(this.setCache[p]);
      if (this.knownBeakerVars[p] === undefined && this.beakerObj[p] === undefined) {
          this.knownBeakerVars[p] = true;
          var makeGetter = function(self, name) {
            return function() { return self.beakerGetter(name); }
          }
          var makeSetter = function(self, name) {
            return function(v) { self.beakerSetter(name,v); }
          }
          Object.defineProperty(this.beakerObj, p,
              { writeable: true,
                get: makeGetter(this,p),
                set: makeSetter(this,p),
                enumerable: true,
                configurable: true
              });
      }
    }
    // clear setcache and getcache
    this.setCache = { };
    this.getCache = { };
  };

  var beakerObj = new BeakerObject(); // this is visible to JS code in cell

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
            modelOutput.result.object.outputdata = [];
            if (refreshObj !== undefined)
              refreshObj.outputRefreshed();
            else
              bkHelper.refreshRootScope();

            var ns = bkHelper.getNotebookModel().namespace;
            if (undefined === ns) {
              bkHelper.getNotebookModel().namespace = {};
            } else if(ns._beaker_model_output_result !== undefined) {
              delete ns._beaker_model_output_result;
            }

            if (window.beaker !== undefined)
              window.beaker.beaker = beakerObj.beakerObj;

            var evaluation = { status: 'RUNNING', outputdata: [] };
            beakerObj.setupBeakerObject(modelOutput, evaluation);
            bkHelper.setupProgressOutput(modelOutput); // this prob makes some of the above unnecessary

            beakerObj.notebookToBeakerObject();
            var beaker = beakerObj.beakerObj;
            acorn.parse(code);
            var output = eval(code);
            beakerObj.beakerObjectToNotebook();
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
                }
                output.then(function(o) {
                  o = transform(o);
                  evaluation.status = 'FINISHED';
                  evaluation.payload = output;
                  bkHelper.receiveEvaluationUpdate(modelOutput, evaluation, PLUGIN_NAME);
                  beakerObj.beakerObjectToNotebook();
                  deferred.resolve(o);
                  beakerObj.clearOutput();
                }, function(e) {
                  modelOutput.result = {
                      type: "BeakerDisplay",
                      innertype: "Error",
                      object: "" + e
                  };
                  console.log(e);
                  beakerObj.beakerObjectToNotebook();
                  deferred.reject(transform(modelOutput.result));
                  beakerObj.clearOutput();
                });
              } else {
                output = transform(output);
                evaluation.status = 'FINISHED';
                evaluation.payload = output;
                bkHelper.receiveEvaluationUpdate(modelOutput, evaluation, PLUGIN_NAME);
                deferred.resolve(output);
                beakerObj.clearOutput();
              }
            } else {
              evaluation.status = 'FINISHED';
              evaluation.payload = output;
              bkHelper.receiveEvaluationUpdate(modelOutput, evaluation, PLUGIN_NAME);
              deferred.resolve(output);
              beakerObj.clearOutput();
            }
          } catch (err) {
            modelOutput.result = {
                type: "BeakerDisplay",
                innertype: "Error",
                object: err.stack.split(/\n/)
            };
            console.log(err);
            deferred.reject(transform(modelOutput.result));
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
