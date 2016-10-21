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
 * Module bk.sessionManager
 */
(function() {
  'use strict';
  var module = angular.module('bk.sessionManager',[
    'bk.utils',
    'bk.session',
    'bk.notebookManager',
    'bk.notebookCellModelManager',
    'bk.notebookNamespaceModelManager',
    'bk.recentMenu',
    'bk.evaluatorManager',
    'bk.electron',
    'bk.plotapi',
    'bk.categoryplotapi'
  ]);

  module.factory('bkSessionManager', function(
      bkUtils,
      bkSession,
      bkNotebookManager,
      bkNotebookCellModelManager,
      bkNotebookCellModelManagerFactory,
      bkNotebookNamespaceModelManager,
      bkEvaluatorManager,
      bkRecentMenu,
      bkElectron,
      bkPlotApi,
      bkCategoryPlotApi) {

    // we have copypasted piece of code from this line up to the end of 'transformBack' method in
    // plugin/node/src/dist/app/transformation.js. If you make some changes there, please bring them
    // to Node plugin too

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
        this.hasIndex = false;
      } else {
        this.columnNames = data.columnNames.slice(0);
        this.types = data.types.slice(0);
        this.values = [];
        this.hasIndex = data.hasIndex || false;
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
        s = s + '    '+this.columnNames[i]+'   '+this.types[i]+(this.hasIndex && i==0 ? ' *Index*\n' : '\n');
      }
      return s;
    };

    DataFrame.prototype.hasIndex = function() {
      return this.hasIndex;
    };

    DataFrame.prototype.columns = function() {
      return this.columnNames;
    };

    DataFrame.prototype.dtypes = function() {
      return this.types;
    };

    DataFrame.prototype.getIndex = function() {
      if(!this.hasIndex)
        return undefined;
      var o = [];
      for (var j in this.values) {
        o.push(this.values[j][0]);
      }
      return o;
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
      if (i==0)
        this.hasIndex = false;
      for (var j in this.values) {
        this.values[j].splice(i,1);
      }
      this.columnNames.splice(i,1);
      this.types.splice(i,1);
      return true;
    };

    DataFrame.prototype.addColumn = function(name, data, type) {
      var i = this.columnNames.indexOf(name);
      if (i >= 0 || data === undefined || data.length === 0)
          return false;

      this.columnNames.push(name);
      this.types.push((type === undefined) ? getDataType(data[0]) : type);
      var min = (data.length > this.values.length) ? this.values.length : data.length;
      var j;
      for (j = 0; j < min; j++) {
        this.values[j].push(data[j]);
      }
      if (this.values.length > data.length) {
        for (; j < this.values.length; j++) {
          this.values[j].push(null);
        }
      } else {
        for (; j < data.length; j++) {
          this.values.push([]);
          for (var k = 0; k < this.columnNames.length - 1; k++) {
            this.values[j].push(null);
          }
          this.values[j].push(data[j]);
        }
      }
      return true;
    };

    DataFrame.prototype.addRow = function(row) {
      var r = [];
      for(var c in this.columnNames) {
        if (row[this.columnNames[c]] !== undefined)
          r.push(row[this.columnNames[c]]);
        else
          r.push(null);
      }
      this.values.push(r);
    };

    function isPrimitiveType(v) {
      if (_.isDate(v) || _.isString(v) || _.isNumber(v) || _.isBoolean(v) || _.isNaN(v) || _.isNull(v) || _.isUndefined(v))
        return true;
      return false;
    };

    function getDataType(v) {
      if (_.isDate(v))
        return "datetime";
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

    function transform(v, norecurse) {
      if (_.isFunction(v) || _.isUndefined(v))
        return null;

      if (_.isDate(v)) {
        var o = {}
        o.type = "Date";
        o.timestamp = v.valueOf();
        return o
      }

      if (isPrimitiveType(v))
        return v;

      if (v instanceof ImageIcon && norecurse === undefined) {
        var o = {}
        o.type = "ImageIcon";
        o.imageData = v.imageData;
        o.width = v.width;
        o.height = v.height;
        return o
      }

      if (v instanceof DataFrame && norecurse === undefined) {
        var o = {}
        o.type = "TableDisplay";
        o.subtype = "TableDisplay";
        o.hasIndex = v.hasIndex ? 'true' : 'false';
        o.values = [];
        for (var i in v.values) {
          var row = [ ];
          for (var j in v.values[i]) {
            row.push(transform(v.values[i][j], true));
          }
          o.values.push(row);
        }
        o.types = [ ];
        if (_.isArray(v.types)) o.types = o.types.concat(v.types.slice(0));
        o.columnNames = [ ];
        if (_.isArray(v.columnNames)) o.columnNames = o.columnNames.concat(v.columnNames.slice(0));
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
        if (doit && norecurse === undefined) {
          var o = {}
          o.type = "TableDisplay";
          o.values = [];
          for (var i in v) {
            var row = [];
            for (var item in v[i])
              row.push(transform(v[i][item], true));
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
          if (doit && norecurse === undefined) {
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
                  o2.push(transform(v[i][n], true));
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
        return v.map(function(e) {return transform(e, true)});
      }

      if (bkPlotApi.instanceOfPlotApi(v) && norecurse === undefined) {
        return _.cloneDeep(v);
      }
      if (bkCategoryPlotApi.instanceOfCategoryPlotApi(v) && norecurse === undefined) {
        return _.cloneDeep(v);
      }

      if (_.isObject(v) && isDictionary(v) && norecurse === undefined) {
        var o = {}
        o.type = "TableDisplay";
        o.values = [];
        o.subtype = "Dictionary";
        o.columnNames= ['Key','Value'];
        for (var i in v) {
          var r = [];
          r.push(i);
          r.push(transform(v[i],true));
          o.values.push(r);
        }
        return o;
      }
      var o = {};
      for(var p in v) {
        o[p] = transform(v[p], true);
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
              if (typeof(v.values[r][0]) === 'object') {
                o[transformBack(v.values[r][0])] = transformBack(v.values[r][1]);
              } else {
                o[v.values[r][0]] = transformBack(v.values[r][1]);
              }
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
      return v.map(transformBack);
    };


    var _notebookUri = (function() {
      var DEFAULT_VALUE = null;
      var _v = DEFAULT_VALUE;
      return {
        reset: function() {
          this.set(DEFAULT_VALUE);
        },
        get: function() {
          return _v;
        },
        set: function(v) {
          _v = v;
        }
      };
    })();

    var _uriType = null;
    var _readOnly = null;
    var _format = null;
    var _sessionId = null;
    var _edited = false;
    var _needsBackup = false;

    var BeakerObject = function(nbmodel) {
      this.knownBeakerVars = { };
      this.getCache = { };
      this.setCache = { };
      this.beakerObj = { };
      this.nbmodel = nbmodel;
    };

    BeakerObject.prototype.isBeakerObject = function(obj) {
      return obj === this.beakerObj;
    };
    
    BeakerObject.prototype.setupBeakerObject = function(modelOutput) {
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
          bkHelper.printEvaluationProgress(self._beaker_model_output, input, 'out');
        }, writeable: false, enumerable: true });
        Object.defineProperty(this.beakerObj, 'printError', {value: function(input) {
          bkHelper.printEvaluationProgress(self._beaker_model_output, input, 'err');
        }, writeable: false, enumerable: true });
        Object.defineProperty(this.beakerObj, 'loadLibrary', { value: function (path) {
          return bkHelper.loadLibrary(path, self._beaker_model_output);
        }, writeable: false, enumerable: true});
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
        Object.defineProperty(this.beakerObj, 'getVersionNumber', { value: bkHelper.getVersionNumber, writeable: false, enumerable: true });
        Object.defineProperty(this.beakerObj, 'getVersion', { value: bkHelper.getVersionString, writeable: false, enumerable: true });
        _.extend(this.beakerObj, bkPlotApi.list());
        _.extend(this.beakerObj, bkCategoryPlotApi.list());
        this.predefined = Object.keys(this.beakerObj);
      }
      this._beaker_model_output_result = modelOutput.result; // XXX obviated by next line
      this._beaker_model_output = modelOutput;
    };

    BeakerObject.prototype.clearOutput = function() {
      this._beaker_model_output_result.object = undefined;
    };

    BeakerObject.prototype.beakerGetter = function(name) {
      if (this.setCache[name] !== undefined) {
        return this.setCache[name];
      }
      if (this.getCache[name] === undefined && this.nbmodel.namespace !== undefined)
        this.getCache[name] = transformBack(this.nbmodel.namespace[name]);
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
      // clear getcache
      this.getCache = { };

      // check if some other language removed a binding
      for (var p in this.knownBeakerVars) {
        if (this.nbmodel.namespace !== undefined && this.nbmodel.namespace[p] === undefined) {
          delete this.knownBeakerVars[p];
          delete this.beakerObj[p];
          delete this.setCache[p];
        }
      }

      // check if some other language added a binding
      if (this.nbmodel.namespace !== undefined) {
        for (var p in this.nbmodel.namespace) {
          var t = this.nbmodel.namespace[p];
          if (this.predefined.indexOf(p)>=0) {
            delete this.nbmodel.namespace[p];
          } else if (this.knownBeakerVars[p] === undefined) {
            delete this.beakerObj[p];
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
      }
    };

    BeakerObject.prototype.beakerObjectToNotebook = function() {
      var keys = Object.keys(this.beakerObj);
      var stuff = Object.keys(this.knownBeakerVars);
      var diff = $(keys).not(stuff).get();
      diff = $(diff).not(this.predefined).get();

      // check if javascript removed a binding
      if ( this.nbmodel.namespace !== undefined ) {
        for (var p in this.nbmodel.namespace) {
          if (this.knownBeakerVars[p] !== undefined && keys.indexOf(p) < 0) {
            delete this.nbmodel.namespace[p];
            delete this.knownBeakerVars[p];
          }
        }
      }

      // check if javascript set any NEW variable
      _.forEach(diff, function(p) {
        if (this.knownBeakerVars[p] === undefined) {
          if (this.nbmodel.namespace === undefined)
            this.nbmodel.namespace = { };
          var t = this.beakerObj[p];
          if ((this.predefined.indexOf(p)>=0 || _.isFunction(t))) {
            // we do NOT put functions in the namespace
            delete this.nbmodel.namespace[p];
            delete this.knownBeakerVars[p];
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
      }.bind(this));

      // check if javascript set any new variable
      for (var p in this.setCache) {
        if (this.nbmodel.namespace === undefined)
          this.nbmodel.namespace = { };
        if (this.isCircularObject2(this.setCache[p]))
          this.nbmodel.namespace[p] = "ERROR: circular objects are not supported";
        else
          this.nbmodel.namespace[p] = transform(this.setCache[p]);
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

    BeakerObject.prototype.transform = function(obj) {
      if (obj === this.beakerObj) {
        var its = [];
        var nms = [];
        for (var p in this.nbmodel.namespace) {
          if (this.predefined.indexOf(p)<0 && p != 'prefs' && p != 'language' && p != 'client') {
            var t = this.nbmodel.namespace[p];
            its.push(t);
            nms.push(p);
          }
        }
        obj = {
          type: 'OutputContainer',
          items: its,
          labels: nms,
          layout:{
            borderDisplayed: false,
            type: "BeakerObjectLayoutManager"
          }
        };
      }
      return transform(obj);
    };
    
    BeakerObject.prototype.isCircularObject = function(node, parents) {
      if (node === this.beakerObj)
        return true;
      
      return this.isCircularObject2(node, parents);
    };

    BeakerObject.prototype.isCircularObject2 = function(node, parents) {
      parents = parents || [];
      if (!node || typeof node != "object"){
        return false;
      }
      parents.push(node);
      for (var key in node) {
        var value = node[key];
        if (value && typeof value == "object") {
          if (parents.indexOf(value)>=0) {
            return true;
          }
          if (this.isCircularObject2(value, parents)) {
            return true;
          }
        }
      }
      parents.pop(node);
      return false;
    };

    var _bo = {};

    var _notebookModel = (function() {
      var _v = {};
      return {
        reset: function() {
          this.set({});
        },
        get: function() {
          return _v;
        },
        getBeakerObject: function() {
          return _bo;
        },
        set: function(v) {
          _v = v;
          // this removes legacy data previously saved
          if (_v._beaker_model_output_result !== undefined) {
            delete _v._beaker_model_output_result;
          }
          //if (_v.namespace === undefined)
          //  _v.namespace = { };
          _bo = new BeakerObject(_v);
          if (this.isEmpty()) {
            bkNotebookCellModelManager.reset([]);
          } else {
            bkNotebookCellModelManager.reset(_v.cells);
          }
        },
        isEmpty: function() {
          return _.isEmpty(_v);
        },
        isLocked: function() {
          return !this.isEmpty() && !!_v.locked;
        },
        toJson: function() {
          return angular.toJson(_v);
        },
        toCleanPrettyJson: function() {
          return bkHelper.sanitizeNotebookModel(_v);
        }
      };
    })();

    var generateBackupData = function() {
      return {
        notebookUri: _notebookUri.get(),
        uriType: _uriType,
        readOnly: _readOnly,
        format: _format,
        notebookModelJson: _notebookModel.toJson(),
        edited: _edited
      };
    };
    var generateRecentDocumentItem = function () {
      var data = {
        uri: _notebookUri.get(),
        type: _.isEmpty(_uriType) ? "" : _uriType,
        readOnly: !!_readOnly ? true : false,
        format: _.isEmpty(_format) ? "" : _format
      };
      return angular.toJson(data);
    };

    var recordRecentNotebook = function () {
      if (_notebookUri.get()) {
        bkRecentMenu.recordRecentDocument(generateRecentDocumentItem());
      }
    };

    var generateSaveData = function() {
      return {
        uriType: _uriType,
        notebookUri: _notebookUri.get(),
        notebookModelAsString: _notebookModel.toCleanPrettyJson()
      };
    };

    var _subscriptions = {};
    var connectcontrol = function(sessionId) {
      _subscriptions[sessionId] =
          $.cometd.subscribe("/notebookctrl/" + sessionId, function(req) {
            try {
              var name = "bkHelper."+req.data.method;
              var numargs = req.data.numargs;
              var args = [];
              var i;
              for ( i = 0; i < numargs; i++ ) {
                args.push( req.data["arg"+i] );
              }
              var publish = true;
              var reply2 = { session: sessionId };
              reply2.value = eval(name).apply(this, args);
              if(typeof reply2.value === 'object') {
                if(typeof reply2.value.promise === 'object' && typeof reply2.value.promise.then === 'function') {
                  reply2.value = reply2.value.promise;
                }
                if(typeof reply2.value.then === 'function') {
                  // must wait for result to be ready
                  publish = false;
                  reply2.value.then(function(res) {
                    reply2.value=res;
                    $.cometd.publish("/service/notebookctrl/receive", JSON.stringify(reply2));
                  }, function(err) {
                    reply2.value=err;
                    $.cometd.publish("/service/notebookctrl/receive", JSON.stringify(reply2));
                  });
                }
              }
              else if (reply2.value === undefined)
                reply2.value = true;
              if (publish) {
                $.cometd.publish("/service/notebookctrl/receive", JSON.stringify(reply2));
              }
            } catch (err) {
              console.log("CATCH "+err);
              $.cometd.publish("/service/notebookctrl/receive", JSON.stringify( { session: sessionId, value: false } ));
            }
          });
      };

      var disconnectcontrol = function(sessionId) {
        if (sessionId) {
          $.cometd.unsubscribe(_subscriptions[sessionId]);
          delete _subscriptions[sessionId];
        }
      };

    return {
      reset: function(notebookUri, uriType, readOnly, format, notebookModel, edited, sessionId) {

        // backup existing session if it's not empty.
        if (_sessionId && !_notebookModel.isEmpty()) {
          bkSession.backup(_sessionId, generateBackupData());
        }

        if (_sessionId)
          disconnectcontrol(_sessionId);
        bkNotebookManager.reset();
        bkEvaluatorManager.reset();

        // check inputs
        if (!sessionId) {
          sessionId = bkUtils.generateId(6);
        }

        // reset
        _uriType = uriType;
        _readOnly = readOnly;
        _format = format;
        _notebookUri.set(notebookUri);
        _notebookModel.set(notebookModel);
        bkHelper.initBeakerPrefs();
        this.setNotebookModelEdited(!!edited);
        _sessionId = sessionId;
        bkNotebookNamespaceModelManager.init(sessionId, notebookModel, generateSaveData);
        connectcontrol(sessionId);
        bkSession.backup(_sessionId, generateBackupData());
        bkNotebookManager.init(this);
      },
      setSessionId: function(sessionId) {
        if (!sessionId) {
          sessionId = bkUtils.generateId(6);
        }
        _sessionId = sessionId;
        return _sessionId;
      },
      setup: function(notebookUri, uriType, readOnly, format, notebookModel, edited, sessionId) {

        // check inputs
        if (!sessionId) {
          sessionId = bkUtils.generateId(6);
        }

        // tell main thread that session lives in this window
        if (bkUtils.isElectron) {
          bkElectron.IPC.send('window-session', {
            windowId: bkElectron.remote.getCurrentWindow().id,
            sessionId: sessionId
          });
        }

        // reset
        _uriType = uriType;
        _readOnly = readOnly;
        _format = format;
        _notebookUri.set(notebookUri);
        _notebookModel.set(notebookModel);
        bkHelper.initBeakerPrefs();
        _sessionId = sessionId;

        _needsBackup = _edited;
        bkNotebookNamespaceModelManager.init(sessionId, notebookModel);
        bkNotebookManager.init(this);
        connectcontrol(sessionId);
        bkSession.backup(_sessionId, generateBackupData());
        recordRecentNotebook();
      },
      clear: function() {
        disconnectcontrol(_sessionId);
        bkEvaluatorManager.reset();
        bkNotebookNamespaceModelManager.clear(_sessionId);
        bkNotebookManager.reset();
        _notebookUri.reset();
        _uriType = null;
        _readOnly = null;
        _format = null;
        _notebookModel.reset();
        _sessionId = null;
        _edited = false;
        _needsBackup = false;
      },
      close: function() {
        var self = this;
        var close = function() {
          bkEvaluatorManager.exitAndRemoveAllEvaluators();
          self.clear();
        };
        if (_sessionId) {
          return bkSession.close(_sessionId).then(close);
        } else{
          close();
          return bkUtils.newPromise();
        }
      },
      backup: function() {
        if (_sessionId && !_notebookModel.isEmpty() && _needsBackup) {
          _needsBackup = false;
          return bkSession.backup(_sessionId, generateBackupData())
          .catch(function(err) {
            _needsBackup = true;
            throw err;
          });
        } else {
          return bkUtils.newPromise();
        }
      },
      updateNotebookUri: function(notebookUri, uriType, readOnly, format) {
        // to be used by save-as
        _uriType = uriType;
        _readOnly = readOnly;
        _format = format;
        _notebookUri.set(notebookUri);
      },
      recordRecentNotebook: recordRecentNotebook,
      updateRecentDocument: function (oldUrl) {
        bkRecentMenu.updateRecentDocument(oldUrl, generateRecentDocumentItem());
      },
      getNotebookPath: function() {
        if (_notebookUri.get()) {
          return _notebookUri.get();
        } else {
          return "New Notebook";
        }
      },
      getNotebookUriType: function() {
        return _uriType;
      },
      getNotebookTitle: function() {
        if (_uriType === 'ajax') {
          var pieces = _notebookUri.get().split(":");
          return pieces[3];
        }
        else if (_notebookUri.get()) {
          return _notebookUri.get().replace(/^.*[\\\/]/, '');
        } else {
          return "New Notebook";
        }
      },
      isSavable: function() {
        return _notebookUri && !_readOnly;
      },
      /*
       * This function triggers all display implementations to save the current output status.
       * This save is asynchronous and happens in the current digest loop.
       * Users must schedule a timeout to execute code that requires the dumped state.
       */
      dumpDisplayStatus: function() {
        this.getNotebookCellOp().dumpDisplayStatus();
        return true;
      },
      getSaveData: function() {
        bkHelper.updateCellsFromDOM(this.getRawNotebookModel().cells);
        return generateSaveData();
      },
      getNotebookModelAsString: function() {
        return _notebookModel.toJson();
      },
      getRawNotebookModel: function() {
        return _notebookModel.get();
      },
      getBeakerObject: function() {
        return _notebookModel.getBeakerObject();
      },
      getSessionId: function() {
        return _sessionId;
      },
      isSessionValid: function() {
        if (!_sessionId) {
          return bkUtils.newPromise("false");
        } else {
          return bkSession.getSessions().then(function(sessions) {
            return _(sessions).keys().contains(_sessionId);
          });
        }
      },
      // TODO, move the following impl to a dedicated notebook model manager
      // but still expose it here
      setNotebookModelEdited: function(edited) {
        _needsBackup = edited;
        _edited = edited;
        bkUtils.httpPost(bkUtils.serverUrl('beaker/rest/session-backup/setEdited'), {
          sessionid: _sessionId,
          edited: edited
        });
      },
      isNotebookModelEdited: function() {
        return _edited;
      },
      isNotebookLocked: function() {
        return _notebookModel.isLocked();
      },
      toggleNotebookLocked: function() {
        if (!_notebookModel.isEmpty()) {
          if (!_notebookModel.isLocked()) {
            _notebookModel.get().locked = true;
          } else {
            _notebookModel.get().locked = undefined;
          }
          this.setNotebookModelEdited(true);
        }
      },
      evaluatorUnused: function(plugin) {
        var n = _.find(_notebookModel.get().cells, function (c) {
          return c.type == "code" && c.evaluator == plugin;
        });
        return !n;
      },
      addEvaluator: function(evaluator) {
        _notebookModel.get().evaluators.push(evaluator);
        this.setNotebookModelEdited(true);
      },
      removeEvaluator: function(plugin) {
        var model = _notebookModel.get();
        model.evaluators = _.reject(model.evaluators, function(e) {
          return e.plugin == plugin;
        });
        this.setNotebookModelEdited(true);
      },
      reconnectEvaluators: function() {
        return bkEvaluatorManager.reconnectEvaluators();
      },
      getNotebookCellOp: function() {
        return bkNotebookCellModelManager;
      },
      getNotebookNewCellFactory: function() {
        return {
          newCodeCell: function(evaluator, id) {
            if (!evaluator) {
              evaluator = _notebookModel.get().evaluators[0].name;
            }
            if (!id) {
              id = "code" + bkUtils.generateId(6);
            }
            return {
              "id": id,
              "type": "code",
              "evaluator": evaluator,
              "input": {
                "body": ""
              },
              "output": {}
            };
          },
          newSectionCell: function(level, title, id) {
            var levelNumberToWordMapping = {1 : "One", 2 : "Two", 3 : "Three", 4 : "Four"};
            if (!level && level !== 0) {
              level = 1;
            }
            if (level <= 0) {
              throw "creating section cell with level " + level + " is not allowed";
            }
            if (!title && levelNumberToWordMapping[level]) {
              title = "Section Level " + levelNumberToWordMapping[level];
            }

            if (!id) {
              id = "section" + bkUtils.generateId(6);
            }
            return {
              "id": id,
              "type": "section",
              "title": title,
              "level": level
            };
          },
          newMarkdownCell: function(id) {
            var tail = _notebookModel.get().cells.length - 1;
            if (!id) {
              id = "markdown" + bkUtils.generateId(6);
            }
            return {
              "id": id,
              "type": "markdown",
              "body": ""
            };
          }
        };
      },
      isRootCellInitialization: function() {
        return _notebookModel.get().initializeAll;
      },
      setRootCellInitialization: function(initialization) {
        if (initialization === true) {
          _notebookModel.get().initializeAll = true;
        } else {
          _notebookModel.get().initializeAll = undefined;
        }
      },
      notebookModelAddEvaluator: function(newEvaluator) {
        _notebookModel.get().evaluators.push(newEvaluator);
      },
      notebookModelGetInitializationCells: function() {
        if (_notebookModel.get().initializeAll) {
          return this.getNotebookCellOp().getAllCodeCells("root");
        } else {
          return this.getNotebookCellOp().getInitializationCells();
        }
      },
      undo: function() {
        bkNotebookCellModelManager.undo();
      },
      redo: function() {
        bkNotebookCellModelManager.redo();
      }
    };
  });
})();
