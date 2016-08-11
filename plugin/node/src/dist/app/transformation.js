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

var _ = require('lodash');

// start of copy-pasted code from sessionmanager.js

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
}

function getDataType(v) {
  if (_.isDate(v))
    return "datetime";
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

  //if (bkPlotApi.instanceOfPlotApi(v) && norecurse === undefined) {    // todo copy-pasted code doesn't work
  //  return _.cloneDeep(v);
  //}

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
}

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
}

function isCircularObject(node, parents) {
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
      if (isCircularObject(value, parents)) {
        return true;
      }
    }
  }
  parents.pop(node);
  return false;
}

// end of copy-pasted code

exports.DataFrame = DataFrame;
exports.ImageIcon = ImageIcon;
exports.transform = transform;
exports.transformBack = transformBack;
exports.isCircularObject = isCircularObject;
