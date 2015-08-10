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
    var PlotAxis = function(type) {
      this.type = "axis";
      this.axisType = type == null ? "linear" : type; // linear, log, time, [nanotime, category]
      this.axisBase = 10;
      this.axisTime = 0;
      this.axisTimezone = "America/New_York";
      this.axisValL = 0;
      this.axisValR = 1;
      this.axisValSpan = 1;
      this.axisPctL = 0;
      this.axisPctR = 1;
      this.axisPctSpan = 1;
      this.axisLabel = "";
      this.axisGridlines = [];
      this.axisGridlineLabels = [];
      this.axisStep = 1;
      this.axisFixed = 0;

      this.axisMarginValL = 0;
      this.axisMarginValR = 0;
    };
    var numIntws = [], numFixs = [];
    var bs = 1E-6;
    for (var i = 0; i < 18; i++) {
      var f = Math.max(6 - i, 0);
      numIntws = numIntws.concat([1.0 * bs, 2.5 * bs, 5.0 * bs]);  // generate 1s, 5s
      numFixs = numFixs.concat([f, i <= 6 ? f + 1 : f, f]);
      bs *= 10;
    }

    var calcTimeIncrement = function (valL, valR, count) {
      var span = (valR - valL) / count;
      var t = new Date(valL + span);
      if (span <= 1000 * 60) {
        return t - valL;
      } else if (span <= 1000 * 60 * 60) {
        return new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds()).getTime() - valL;
      } else if (span <= 1000 * 60 * 60 * 24) {
        return new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes()).getTime() - valL;
      } else if (span <= 1000 * 60 * 60 * 24 * 30) {
        return new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() - valL;
      } else if (span <= 1000 * 60 * 60 * 24 * 365) {
        return new Date(t.getFullYear(), t.getMonth() + 1, 1).getTime() - valL;
      } else {
        return new Date(t.getFullYear() + 1, 0, 1).getTime() - valL;
      }
    };

    PlotAxis.prototype.numIntws = numIntws;
    PlotAxis.prototype.numFixs = numFixs;

    PlotAxis.prototype.axisPow = function(pct) {
      return Math.pow(this.axisBase, pct * this.axisValSpan + this.axisValL);
    };
    PlotAxis.prototype.setLabel = function(label) {
      this.axisLabel = label;
    };
    PlotAxis.prototype.setRange = function(vl, vr, para) {
      if (vl != null) { this.axisValL = vl; }
      if (vr != null) { this.axisValR = vr; }
      if (this.axisType === "log") {
        if (para != null ) { this.axisBase = para; }
        if (this.axisBase <= 1) {
          this.axisBase = 10;
          console.error("cannot set base to <= 1");
        }
      } else if (this.axisType === "time"){
        if (para != null) { this.axisTimezone = para; }
      }
      this.axisValSpan = this.axisValR - this.axisValL;
    };



    PlotAxis.prototype.setGridlines = function(pl, pr, count, ml, mr) {
      if (pr < pl) {
        console.error("cannot set right coord < left coord");
        return;
      }
      if (count == null) {
        console.error("missing setCoords count");
        count = 1;
      }
      this.axisPctL = pl;
      this.axisPctR = pr;
      this.axisPctSpan = pr - pl;

      if (this.axisType === "time") {
        this.axisMarginValL = ml * this.axisValSpan;
        this.axisMarginValR = mr * this.axisValSpan;
      }

      var span = this.axisPctSpan * this.axisValSpan;
      var intws, fixs;
      if (this.axisType !== "time") {
        intws = this.numIntws;
        fixs = this.numFixs;
      }
      var w, f, mindiff = 1E100;

      var diff = mindiff;
      var i = 0;

      var calcW = function (i) {
        if (i >= intws.length) {
          var bs = (intws[intws.length - 1] / 0.5) * 10;
          intws = intws.concat([1.0 * bs, 2.5 * bs, 5.0 * bs])
        }
        return intws[i];
      };

      var calcF = function (i) {
        if (i >= fixs.length) {
          var f = Math.max(6 - i, 0);
          fixs = fixs.concat([f, i <= 6 ? f + 1 : f, f]);
        }
        return fixs[i];
      };

      if (this.axisType === "time") {
        w = calcTimeIncrement(this.getValue(pl), this.getValue(pr), count);
      } else {
        while (diff === mindiff) {
          var nowcount = span / calcW(i);
          diff = Math.abs(nowcount - count);
          if (diff < mindiff) {
            w = calcW(i);
            f = calcF(i);
            mindiff = diff;
          }
          i++;
        }
      }

      this.axisStep = w;
      this.axisFixed = f;
      var val = Math.ceil(this.getValue(pl) / w) * w,
          valr = this.getValue(pr);
      var lines = [],
          labels = [];
      while(val < valr) {
        var pct = this.getPercent(val);
        labels.push(this.getString(pct));
        lines.push(pct);
        val += w;
      }
      this.axisGridlines = lines;
      this.axisGridlineLabels = labels;
    };
    PlotAxis.prototype.getGridlines = function() { return _.without(this.axisGridlines); };
    PlotAxis.prototype.getGridlineLabels = function() { return _.without(this.axisGridlineLabels); };
    PlotAxis.prototype.getPercent = function(val) {
      if (val < this.axisValL) { val = this.axisValL; }
      if (val > this.axisValR) { val = this.axisValR; }
      return (val - this.axisValL) / this.axisValSpan;
    };
    PlotAxis.prototype.getValue = function(pct) {
      if (pct < 0) { pct = 0; }
      if (pct > 1) { pct = 1; }
      return this.axisValSpan * pct + this.axisValL;
    };
    PlotAxis.prototype.getString = function(pct) {
      if (this.axisType != "time" && this.axisType != "nanotime") {
        if (this.axisType === "log") {
          return "" + this.axisBase + "^" + this.getValue(pct).toFixed(this.axisFixed);
        } else {
          return "" + this.getValue(pct).toFixed(this.axisFixed);
        }
      }
      var val = this.getValue(pct);
      var span = (this.axisValSpan - (this.axisMarginValL + this.axisMarginValR)) * this.axisPctSpan;

      var d, ret = "";
      if (this.axisType === "time") {
        d = Math.ceil(val * 1000) / 1000;
      }
      else if (this.axisType === "nanotime"){
        var bval = new Big(val).plus(this.axisOffset).div(1000000);
        d = new Date(bval.toFixed(0));
      }

      var padStr = function(val, len) {
        var str = "" + val;
        while (str.length < len) str = "0" + str;
        return str;
      };
      if (span <= 1000) {
        ret = val + "  ";
        ret = moment(d).tz(this.axisTimezone).format(".SSS") + ( (d - Math.floor(d)).toFixed(this.axisFixed));
      } else if (span <= 1000 * 60) {
        ret = moment(d).tz(this.axisTimezone).format("mm:ss.SSS");
      } else if (span <= 1000 * 60 * 60) {
        ret = moment(d).tz(this.axisTimezone).format("HH:mm:ss");
      } else if (span <= 1000 * 60 * 60 * 24) {
        ret = moment(d).tz(this.axisTimezone).format("MMM DD ddd, HH:mm");
      } else if (span <= 1000 * 60 * 60 * 24 * 30) {
        ret = moment(d).tz(this.axisTimezone).format("MMM DD ddd");
      } else if (span <= 1000 * 60 * 60 * 24 * 365) {
        ret = moment(d).tz(this.axisTimezone).format("YYYY MMM");
      } else {
        ret = moment(d).tz(this.axisTimezone).format("YYYY");
      }

      /*
      // Nanoplot TODO
      if (this.axisType === "nanotime"  && span < 1000000) {
        var digits = bval.mod(1000000000).toFixed(0);
        if (span < 1000) {
          ret += "." + padStr(Math.floor(digits / 1), 9);
        } else if (span < 1000000) {
          ret += "." + padStr(Math.floor(digits / 1000), 6);
        } else {
          ret += "." + padStr(Math.floor(digits / 1000000), 3);
        }
      }
      */
      return ret;
    };
    return PlotAxis;
  };
  beaker.bkoFactory('PlotAxis', [retfunc]);
})();
