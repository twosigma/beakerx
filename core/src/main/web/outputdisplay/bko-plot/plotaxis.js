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
  var retfunc = function() {
    return function(type) {
      var axisType = type;
      var axisBase = 10;
      var axisTime = 0, axisTimezone = "America/New_York";
      var axisValL = 0, axisValR = 1, axisValSpan;
      var axisPctL, axisPctR, axisPctSpan;
      var axisLabel;
      
      var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", 
          "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
      var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      
      if (type == null) { type = "linear"; }  // linear, log, time, nanotime, category
      
      var dateIntws = [
        1, 5, 10, 50, 100, 500,   // milliseconds
        1000, 5000, 10000, 30000, 60000, // 1, 5, 10, 30, 60 seconds
        300000, 600000, 1800000, 3600000, // 5, 10, 30, 60 minutes
        10800000, 21600000, 43200000, 86400000, // 3, 6, 12, 24 hours
        604800000, 2592000000, 7776000000, 15552000000, 31104000000 // 7, 30, 90, 180, 360 days
      ];
      var numIntws = [], numFixs = [];
      var bs = 1E-6;
      for (var i = 0; i < 18; i++) {
        var f = Math.max(7-i, 0);
        numIntws = numIntws.concat([1.0 * bs, 2.5 * bs, 5.0 * bs]);  // generate 1s, 5s
        numFixs = numFixs.concat([f, f, f]);
        bs *= 10;
      }
      
      var axisCoords, axisCoordLabels, axisStep, axisFixed;
      
      this.axisPow = function(pct) {
        return Math.pow(axisBase, pct * axisValSpan + axisValL);
      };
      this.setLabel = function(label) {
        axisLabel = label;
      };
      this.setRange = function(vl, vr, para) {
        if (vl != null) { axisValL = vl; }
        if (vr != null) { axisValR = vr; }
        if (axisType === "log") {
          if (para != null ) { axisBase = para; }
          if (axisBase <= 1) {
            axisBase = 10;
            console.error("cannot set base to <= 1");
          }
        } else if (axisType === "time"){
          if (para != null) { axisTimezone = para; }
        }
        /*
        if (axisValR - axisValL < 1E-12) {
          console.error("axis range too small");
          axisValR = axisValL + 1E-12;
        }
        */
        axisValSpan = axisValR - axisValL;
      };
      this.setCoords = function(pl, pr, count) {
        if (pr < pl) {
          console.error("cannot set right coord < left coord");
          return;
        }
        if (count == null) { 
          console.error("missing setCoords count");
          count = 1;
        }
        axisPctL = pl;
        axisPctR = pr;
        axisPctSpan = pr - pl;
        var span = axisPctSpan * axisValSpan;
        var intws, fixs;
        if (axisType === "time") { 
          intws = dateIntws;
          fixs = {};
        } else {
          intws = numIntws;
          fixs = numFixs;
        }
       
        var w, f, mindiff = 1E100;
        for (var i = intws.length - 1; i >= 0; i--) {
          var nowcount = span / intws[i];
          var diff = Math.abs(nowcount - count);
          if (diff < mindiff) {
            mindiff = diff;
            w = intws[i];
            f = fixs[i];
          } 
        }
        axisStep = w;
        axisFixed = f;
        
        var val = Math.ceil(this.getValue(pl) / w) * w,
            valr = this.getValue(pr);
        var coords = [],
            labels = [];
        while(val < valr) {
          var pct = this.getPercent(val);
          labels.push(this.getString(pct));
          coords.push(pct);
          val += w;
        }
        axisCoords = coords;
        axisCoordLabels = labels;
      };
      this.getType = function() { return axisType; };
      this.getTimezone = function() { return axisTimezone; };
      this.getCoords = function() { return _.without(axisCoords); };
      this.getCoordLabels = function() { return _.without(axisCoordLabels); };
      this.getStep = function() { return axisStep; };
      this.getFixed = function() { return axisFixed; };
      this.getLabel = function() { return axisLabel; };
      this.getPercent = function(val) {
        if (val < axisValL) { val = axisValL; }
        if (val > axisValR) { val = axisValR; }
        return (val - axisValL) / axisValSpan;        
      };
      this.getValue = function(pct) {
        if (pct < 0) { pct = 0; }
        if (pct > 1) { pct = 1; }
        return axisValSpan * pct + axisValL;
      };
      this.getString = function(pct) {
        if (axisType != "time" && axisType != "nanotime") {
          if (axisType === "log") {
            return "" + axisBase + "^" + this.getValue(pct).toFixed(axisFixed);
          } else {
            return "" + this.getValue(pct).toFixed(axisFixed);
          }
        }
        var val = this.getValue(pct);
        var span = axisValSpan * axisPctSpan;
        
        var d, ret = "";
        if (axisType === "time") {
          d = Math.ceil(val * 1000) / 1000;
        }
        else if (axisType === "nanotime"){
          var bval = new Big(val).plus(axisOffset).div(1000000);
          d = new Date(bval.toFixed(0));
        }
        
        var padStr = function(val, len) {
          var str = "" + val;
          while (str.length < len) str = "0" + str;
          return str;
        };
        if (span <= 1000) {
          ret = val + "  ";
          ret = moment(d).tz(axisTimezone).format(".SSS") + ( (d - Math.floor(d)).toFixed(axisFixed));
        } else if (span <= 1000 * 60) {
          ret = moment(d).tz(axisTimezone).format("mm:ss.SSS");
        } else if (span <= 1000 * 60 * 60) {
          ret = moment(d).tz(axisTimezone).format("HH:mm:ss");
        } else if (span <= 1000) {
          ret = moment(d).tz(axisTimeozne).format("MMM DD ddd, HH:mm");
        } else if (span <= 1000 * 60 * 60 * 24 * 30) {
          ret = moment(d).tz(axisTimezone).format("MMM DD ddd");
        } else {
          ret = moment(d).tz(axisTimezone).format("YYYY MMM");
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
  };
  beaker.bkoFactory('plotAxis', [retfunc]);
})();
