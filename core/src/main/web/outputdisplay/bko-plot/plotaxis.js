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
  var retfunc = function(plotUtils) {
    var PlotAxis = function(type) {
      this.type = "axis";
      this.axisType = type == null ? "linear" : type; // linear, log, time, category, nanotime
      this.axisBase = 10;
      this.axisTime = 0;
      this.axisTimezone = "UTC";
      this.axisValL = type === "nanotime" ? new Big(0) : 0;
      this.axisValR = type === "nanotime" ? new Big(1) : 1;
      this.axisValSpan = type === "nanotime" ? new Big(1) : 1;
      this.axisPctL = 0;
      this.axisPctR = 1;
      this.axisPctSpan = 1;
      this.label = "";
      this.axisGridlines = [];
      this.axisGridlineLabels = [];
      this.axisStep = 1;
      this.axisFixed = 0;

      this.axisMarginValL = 0;
      this.axisMarginValR = 0;

      this.fixedLines = [];
      this.axisFixedLabels = {};

      if (this.axisType === "nanotime") {
        this.UNIT = 1000000;
      } else {
        this.UNIT = 1;
      }
      this.SECOND = 1000 * this.UNIT;
      this.MINUTE = 1000 * 60 * this.UNIT;
      this.HOUR = 1000 * 60 * 60 * this.UNIT;
      this.DAY = 1000 * 60 * 60 * 24 * this.UNIT;
      this.MONTH = 1000 * 60 * 60 * 24 * 30 * this.UNIT;
      this.YEAR = 1000 * 60 * 60 * 24 * 365 * this.UNIT;

    };

    var dateIntws = [], numIntws = [], numFixs = [];
    for (var i = 0; i < 18; i++) {
      var f = Math.max(6 - i, 0);
      numFixs = numFixs.concat([f, i <= 6 ? f + 1 : f, f]);
    }

    PlotAxis.prototype.dateIntws = dateIntws;
    PlotAxis.prototype.numIntws = numIntws;
    PlotAxis.prototype.numFixs = numFixs;

    PlotAxis.prototype.axisPow = function(pct) {
      return Math.pow(this.axisBase, pct * this.axisValSpan + this.axisValL);
    };
    PlotAxis.prototype.setLabel = function(label) {
      this.label = label;
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
      } else if (this.axisType === "time" || this.axisType === "nanotime"){
        if (para != null) { this.axisTimezone = para; }
      }
      if (this.axisType === "nanotime"){
        if(!(this.axisValL instanceof Big)){
          this.axisValL = new Big(this.axisValL)
        }
        if(!(this.axisValR instanceof Big)){
          this.axisValR = new Big(this.axisValR)
        }
      }

      this.axisValSpan = plotUtils.minus(this.axisValR, this.axisValL);

    };
    PlotAxis.prototype.setCategoryNames = function(categoryNames, categoryxs) {
      this.axisFixedLabels = {};
      for (var i = 0; i < categoryxs.length; i++) {
        this.fixedLines.push(this.getPercent(categoryxs[i]));
        this.axisFixedLabels[this.fixedLines[i]] = categoryNames[i];
      }
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

      if (this.axisType === "time" || this.axisType === "nanotime") {
        this.axisMarginValL = plotUtils.mult(this.axisValSpan, ml);
        this.axisMarginValR = plotUtils.mult(this.axisValSpan, mr);
      }

      var span;
      if (this.axisValSpan instanceof Big) {
        span = parseFloat(this.axisValSpan.times(this.axisPctSpan).toString());
      } else {
        span =this.axisPctSpan * this.axisValSpan;
      }
      var intws, fixs;
      if (this.axisType === "time" || this.axisType === "nanotime") {
        intws = this.dateIntws;
        fixs = {};
      } else {
        intws = this.numIntws;
        fixs = this.numFixs;
      }
      var w, f, mindiff = 1E100;

      var diff = mindiff;
      var i = 0;

      var self = this;
      var calcW = function (i,axisType) {
        if (i >= intws.length) {
          var prev = intws[intws.length - 1];

          if (axisType === "time" || axisType === "nanotime") {
            if (i === 0) {
              intws.push(1);
              intws.push(5);
            } else {
              if (prev < self.UNIT) {
                intws.push(prev + 5);
              } else if (prev === self.UNIT) {
                intws.push(prev + 4 * self.UNIT);
              } else if (prev < self.SECOND) {
                intws.push(prev + 5 * self.UNIT);
              } else if (prev === self.SECOND) {
                intws.push(prev + self.SECOND * 4);
              } else if (prev < self.MINUTE) {
                intws.push(prev + self.SECOND * 5);
              } else if (prev === self.MINUTE) {
                intws.push(prev + self.MINUTE * 4);
              } else if (prev < self.HOUR) {
                intws.push(prev + self.MINUTE * 5);
              }else if (prev < self.DAY) {
                intws.push(prev + self.HOUR);
              } else if (prev < self.MONTH) {
                intws.push(prev + self.DAY);
              } else if (prev < self.YEAR) {
                intws.push(prev + self.DAY * 10);
              } else {
                intws.push(prev + self.YEAR);
              }
            }
          } else {
            var bs = (i === 0) ? 1E-6 : (prev / 5.0) * 10;
            intws = intws.concat([
              1.0 * bs,
              2.5 * bs,
              5.0 * bs
            ]);
          }
        }
        return intws[i];
      };

      var calcF = function (i, axisType) {
        if (i >= fixs.length) {
          return 0;
        }
        return fixs[i];
      };

      while (diff === mindiff && w !== Infinity) {
        w = calcW(i, this.axisType);
        f = calcF(i, this.axisType);

        var nowcount = span / w;
        diff = Math.abs(nowcount - count);
        if (diff < mindiff) {
          mindiff = diff;
        }
        i++;
      }


      this.axisStep = w;
      this.axisFixed = f;

      var lines, labels;

      lines = this.calcLines(pl, pr, w);

      var margins = plotUtils.plus(this.axisMarginValL, this.axisMarginValR);
      span = plotUtils.mult(this.axisPctSpan, plotUtils.minus(this.axisValSpan, margins));

      labels = this.calcLabels(
        lines,
        span,
        this.axisType
      );

      this.axisGridlines = lines;
      this.axisGridlineLabels = labels.labels;
      if (labels.common !== ''){
        this.axisLabelWithCommon = this.label ? this.label + ' ' + labels.common : labels.common;
      }else{
        this.axisLabelWithCommon = this.label;
      }


    };

    PlotAxis.prototype.calcLines = function (pl, pr, w) {

      var self = this;

      var selectStartOrEndInterval = function(value, interval) {
        var nextIntervalStart = moment(value).tz(self.axisTimezone).endOf(interval).add(1, "ms");
        var intervalStart = moment(value).tz(self.axisTimezone).startOf(interval);
        return  ((nextIntervalStart - value) > (value - intervalStart)) ? intervalStart : nextIntervalStart;
      };

      var normalize = function (value) {
        if (self.axisType === "time") {
          if (plotUtils.gt(w, self.DAY)) {
            if (plotUtils.lte(w, self.MONTH)) {
              value = selectStartOrEndInterval(value, "day");
            } else if (plotUtils.lte(w, self.YEAR)) {
              value = selectStartOrEndInterval(value, "month");
            } else {
              value = selectStartOrEndInterval(value, "year");
            }
            console.log("line:" + moment(value).tz("UTC").format("YYYY MMM DD ddd, HH:mm:ss .SSS"));
          }
        }
        return value;
      };

      var val = this.getValue(pl);
      if(val instanceof Big){
        if(val.gte(0)){
          val = val.div(w).round(0, 3).times(w);
        }else{
          val = val.div(w).round(0, 0).times(w);
        }
      }else{
        val = normalize(Math.ceil(val / w) * w);
      }
      var valr = this.getValue(pr);
      var lines = [];

      if (this.axisType === "category") {
        for (var i = 0; i < this.fixedLines.length; i++) {
          var pct = this.fixedLines[i];
          if (pct >= this.getPercent(this.getValue(pl)) && pct <= this.getPercent(valr)) {
            lines.push(pct);
          }
        }
      } else {
        while (plotUtils.lt(val, valr)) {
          var pct = this.getPercent(val);
          lines.push(pct);
          val = normalize(plotUtils.plus(val, w));
        }
      }

      return lines;
    };

    PlotAxis.prototype.calcLabels = function (lines, span, axisType) {

      var labels = [];

      if (axisType === "category"){
        var min = Math.min.apply(null, lines);
        var max = Math.max.apply(null, lines);
        for (var key in this.axisFixedLabels) {
          var pct = parseFloat(key);
          if (!this.axisFixedLabels.hasOwnProperty(pct)) { continue; }
          if(pct >= min && pct <= max){
            labels.push(this.axisFixedLabels[pct]);
          }
        }
      } else {
        for (var i = 0; i < lines.length; i++) {
          var pct = lines[i];
          labels.push(this.getString(pct, span));
        }
      }


      if ((span > this.SECOND && axisType === "time" || axisType === "nanotime" && plotUtils.gt(span, this.UNIT)) &&
        labels.length != _.uniq(labels).length) {
        if (axisType === "nanotime" && plotUtils.lte(span, this.SECOND)){
          span = this.UNIT;
        } else if (plotUtils.lte(span, this.MINUTE)) {
          span = this.SECOND;
        } else if (plotUtils.lte(span, this.HOUR)) {
          span = this.MINUTE;
        } else if (plotUtils.lte(span, this.DAY)) {
          span = this.HOUR;
        } else if (plotUtils.lte(span, this.MONTH)) {
          span = this.DAY;
        } else if (plotUtils.lte(span, this.YEAR)) {
          span = this.MONTH;
        } else {
          span = this.YEAR;
        }
        if (axisType === "nanotime") {
          span = new Big(span).minus(1);
        } else {
          span -= 1;
        }

        return this.calcLabels(lines, span, axisType);
      }

      var self = this;
      var calcCommonPart = function () {
        var common = '';

        if ((axisType === "time" || axisType === "nanotime") && plotUtils.gte(span, self.HOUR) && labels.length > 1) {

          var tokens = labels[0].split(' ');

          var index = 0;

          var checkCommon = function (index) {

            var substring =  (common != '') ? common + ' ' + tokens[index] : tokens[index];
            for (i = 1; i < labels.length; i++) {
              if (substring !== labels[i].substring(0, substring.length)) {
                return false;
              }
            }
            return true;
          };

          while(checkCommon(index)){
            common = (common != '') ? common + ' ' + tokens[index] : tokens[index];
            index = index+1;
          }

          if (common.length > 1) {

            for (i = 1; i < labels.length; i++) {
              var label = labels[i];
              if (common != label.substring(0, common.length)) {
                common = '';
                break;
              }
            }
          }

          if (common.length > 1) {
            for (i = 0; i < labels.length; i++) {
              labels[i] = labels[i].replace(common, '').trim();
            }
          }
          common = common.replace(',', '').trim();
        }

        return common;
      };

      return {
          common : calcCommonPart(),
          labels : labels
        };
    };

    PlotAxis.prototype.getGridlines = function() { return _.without(this.axisGridlines); };
    PlotAxis.prototype.getGridlineLabels = function() { return _.without(this.axisGridlineLabels); };
    PlotAxis.prototype.getPercent = function(val) {
      if (plotUtils.lt(val, this.axisValL)) { val = this.axisValL; }
      if (plotUtils.gt(val, this.axisValR)) { val = this.axisValR; }
      if(val instanceof Big){
        return parseFloat(val.minus(this.axisValL).div(this.axisValSpan).toString());
      }else{
        return (val - this.axisValL) / this.axisValSpan;
      }
    };
    PlotAxis.prototype.getValue = function(pct) {
      if (pct < 0) { pct = 0; }
      if (pct > 1) { pct = 1; }
      return plotUtils.plus(plotUtils.mult(this.axisValSpan, pct), this.axisValL);
    };


    PlotAxis.prototype.getString = function(pct, span) {
      if (this.axisType != "time" && this.axisType != "nanotime") {
        if (this.axisType === "log") {
          return "" + Math.pow(this.axisBase, this.getValue(pct)).toFixed(this.axisFixed);
        } else {
          return "" + this.getValue(pct).toFixed(this.axisFixed);
        }
      }
      var val = this.getValue(pct);

      var padStr = function(val, len) {
        var str = "" + Math.abs(val);
        while (str.length < len) str = "0" + str;
        return str;
      };

      var d, ret = "", nanosec;
      if (this.axisType === "time") {
        d = Math.ceil(val * 1000) / 1000;
      }
      else if (this.axisType === "nanotime"){
        d = parseFloat(val.div(1000000).toFixed(0));
        nanosec = val.mod(1000000000).toFixed(0);
      }

      if (plotUtils.lte(span, this.SECOND) && this.axisType === "time") {
        ret = moment(d).tz(this.axisTimezone).format(".SSS") + ( (d - Math.floor(d)).toFixed(this.axisFixed));
      } else if (plotUtils.lte(span, this.MINUTE) && this.axisType === "time") {
        ret = moment(d).tz(this.axisTimezone).format("mm:ss.SSS");
      } else if (plotUtils.lte(span, this.HOUR)) {
        if(this.axisType === "nanotime"){
          if (moment(d) < this.SECOND) {
            ret = "." + padStr(nanosec, 9);
          } else {
            ret = moment(d).tz(this.axisTimezone).format("HH:mm:ss") + "." + padStr(nanosec, 9);
          }
        }else{
          ret = moment(d).tz(this.axisTimezone).format("HH:mm:ss");
        }
      } else if (plotUtils.lte(span, this.DAY)) {
        ret = moment(d).tz(this.axisTimezone).format("YYYY MMM DD ddd, HH:mm");
      } else if (plotUtils.lte(span, this.MONTH)) {
        ret = moment(d).tz(this.axisTimezone).format("YYYY MMM DD ddd");
      } else if (plotUtils.lte(span, this.YEAR)) {
        ret = moment(d).tz(this.axisTimezone).format("YYYY MMM");
      } else {
        ret = moment(d).tz(this.axisTimezone).format("YYYY");
      }

      return ret;
    };
    return PlotAxis;
  };
  beaker.bkoFactory('PlotAxis', ['plotUtils', retfunc]);
})();
