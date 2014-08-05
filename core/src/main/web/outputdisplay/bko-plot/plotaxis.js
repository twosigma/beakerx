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

(function() {
  'use strict';
  var retfunc = (function() {
    return function(_type, _vl, _vr, _scale, _numIntvs) {
      var type = _type;
      var vl = _vl, vr = _vr;
      var scale = _scale;
      var numIntvs = _numIntvs;
      var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", 
          "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
      var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      
      if (type == null) { type = "linear"; }  // linear, log, time, nanotime, category
      if (vl == null) { vl = 0.0; }
      if (vr == null) { vr = 0.0; }
      if (vr < vl) { vr = vl; }
      if (scale == null) { scale = "linear"; }
      if (numIntvs == null || numIntvs < 1) { numIntvs = 1; }
      
      var dateIntws = [
        1, 5, 10, 50, 100, 500,   // milliseconds
        1000, 5000, 10000, 30000, 60000, // 1, 5, 10, 30, 60 seconds
        300000, 600000, 1800000, 3600000, // 5, 10, 30, 60 minutes
        10800000, 21600000, 43200000, 86400000, // 3, 6, 12, 24 hours
        604800000, 2592000000, 7776000000, 15552000000, 31104000000 // 7, 30, 90, 180, 360 days
      ];
      var numIntws = [];
      var bs = 1E-6;
      for (var i = 0; i < 18; i++) {
        numIntws.concat([1.0 * bs, 5.0 * bs]);  // generate 1s, 5s
        bs *= 10;
      }
      
      this.setRange = function(_vl, _vr) {
        vl = _vl;
        vr = _vr;
        if (vr - vl < 1E-6) {
          console.error("axis range too small");
          vr = vl + 1E-6;
        }
      };
      this.getCoords = function(lpc, rpc, count) {
        var span = (rpc - lpc) * (vr - vl);
        var intvs;
        if(type === "time") { intvs = dateIntvs; }
        else { intvs = numIntvs; }
        
        var w;
        for (var i = intvs.length - 1; i >= 0; i--) {
          if (span / intvs[i] >= count) {
            w = intvs[i];
            break;
          } 
        }
        
        var val = this.getValue(lpc), rval = this.getValue(rpc);
        val = Math.ceil(val / w) * w;
        var ret = [];
        while(val < rval) {
          ret.push( (val - vl) / (vr - vl) );
          val += w;
        }
        console.log(ret);
        return ret;
      };
      this.getValue = function(pc) {
        return (vr - vl) * pc + vl;
      };
      this.getString = function(pc, pspan, nanoOffset) {
        if (type != "time" && type != "nanotime") {
          return "" + this.getValue(pc);
        }
        
        var val = this.getValue(pc);
        var span = (vr - vl) * pspan;
        
        var d, ret = "";
        if (type === "time") {
          d = new Date(val.toFixed(0));
        }
        else if (type === "nanotime"){
          var bval = new Big(val).plus(nanoOffset).div(1000000);
          d = new Date(bval.toFixed(0));
        }
        
        var span = pspan * (vr - vl);
        var padStr = function(val, len) {
          var str = "" + val;
          while (str.length < len) str = "0" + str;
          return str;
        };
        if (span <= 1000 * 60 * 60) 
          ret = padStr(d.getHours(),2) + ":" + 
              padStr(d.getMinutes(),2) + ":" +
              padStr(d.getSeconds(),2); // minute:seconds
        else if (span <= 1000 * 60 * 60 * 24) 
          ret = days[d.getDay()] + " " + 
              padStr(d.getHours(),2) + ":" + 
              padStr(d.getMinutes(),2); // date day hour:minutes
        else if (span <= 1000 * 60 * 60 * 24 * 30) 
          ret = months[d.getMonth()] + " " + 
              d.getDate() + " " + 
              days[d.getDay()]; // month date day
        else 
          ret = d.getFullYear() + " " + 
              months[d.getMonth()]; //year month
        
        if (type === "time" && span < 1000) {
          ret += "." + padStr(val % 1000, 3);
        }
        if (type === "nanotime"  && span < 1000000) {
          var digits = bval.mod(1000000000).toFixed(0);
          if (span < 1000) {
            ret += "." + padStr(Math.floor(digits / 1), 9);
          } else if (span < 1000000) {
            ret += "." + padStr(Math.floor(digits / 1000), 6);
          } else {
            ret += "." + padStr(Math.floor(digits / 1000000), 3);
          }
        }
        return ret;
      };
    };
  })();
  beaker.bkoFactory('plotAxis', [retfunc]);
})();
