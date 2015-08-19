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
      this.axisTimezone = "UTC";
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

    var SECOND = 1000;
    var MINUTE = 1000 * 60;
    var HOUR = 1000 * 60 * 60;
    var DAY = 1000 * 60 * 60 * 24;
    var MONTH = 1000 * 60 * 60 * 24 * 30;
    var YEAR = 1000 * 60 * 60 * 24 * 365;

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
      if (this.axisType === "time") {
        intws = this.dateIntws;
        fixs = {};
      } else {
        intws = this.numIntws;
        fixs = this.numFixs;
      }
      var w, f, mindiff = 1E100;

      var diff = mindiff;
      var i = 0;

      var calcW = function (i,axisType) {
        if (i >= intws.length) {
          var prev = intws[intws.length - 1];

          if (axisType === "time") {
            if (i === 0) {
              intws.push(1);
              intws.push(5);
            } else {
              if (prev < SECOND) {
                intws.push(prev + 5);
              } else if (prev === SECOND) {
                intws.push(prev + 4000);
              } else if (prev < MINUTE) {
                intws.push(prev + 5000);
              } else if (prev === MINUTE) {
                intws.push(prev + MINUTE * 4);
              } else if (prev < HOUR) {
                intws.push(prev + MINUTE * 5);
              }else if (prev < DAY) {
                intws.push(prev + HOUR);
              } else if (prev < MONTH) {
                intws.push(prev + DAY);
              } else if (prev < YEAR) {
                intws.push(prev + DAY * 5);
              } else {
                intws.push(prev + YEAR);
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
      var val = Math.ceil(this.getValue(pl) / w) * w,
        valr = this.getValue(pr);

      var lines, labels;

      lines = this.calcLines(val, valr, w);
      labels = this.calcLabels(
        lines,
        (this.axisValSpan - (this.axisMarginValL + this.axisMarginValR)) * this.axisPctSpan,
        this.axisType
      );

      this.axisGridlines = lines;
      this.axisGridlineLabels = labels.labels;
      if (labels.common !== ''){
        this.axisLabelWithCommon = this.axisLabel ? this.axisLabel + ' ' + labels.common : labels.common;
      }else{
        this.axisLabelWithCommon = this.axisLabel;
      }


    };

    PlotAxis.prototype.calcLines = function (val, valr, w) {
      var lines = [];

      while (val < valr) {
        var pct = this.getPercent(val);
        lines.push(pct);
        val += w;
      }

      return lines;
    };

    PlotAxis.prototype.calcLabels = function (lines, span, axisType) {

      var labels = [];

      for (var i = 0; i < lines.length; i++) {
        var pct = lines[i];
        labels.push(this.getString(pct, span));
      }

      if (span > SECOND && axisType === "time" && labels.length != _.uniq(labels).length) {
        if (span <= MINUTE) {
          span = SECOND - 1;
        } else if (span <= HOUR) {
          span = MINUTE - 1;
        } else if (span <= DAY) {
          span = HOUR - 1;
        } else if (span <= MONTH) {
          span = DAY - 1;
        } else if (span <= YEAR) {
          span = MONTH - 1;
        } else {
          span = YEAR - 1;
        }

        return this.calcLabels(lines, span, axisType);
      }

      var calcCommonPart = function () {
        var common = '';

        if (axisType === "time" && span >= HOUR && labels.length > 1) {

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
      if (val < this.axisValL) { val = this.axisValL; }
      if (val > this.axisValR) { val = this.axisValR; }
      return (val - this.axisValL) / this.axisValSpan;
    };
    PlotAxis.prototype.getValue = function(pct) {
      if (pct < 0) { pct = 0; }
      if (pct > 1) { pct = 1; }
      return this.axisValSpan * pct + this.axisValL;
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
      if (span <= SECOND) {
        ret = val + "  ";
        ret = moment(d).tz(this.axisTimezone).format(".SSS") + ( (d - Math.floor(d)).toFixed(this.axisFixed));
      } else if (span <= MINUTE) {
        ret = moment(d).tz(this.axisTimezone).format("mm:ss.SSS");
      } else if (span <= HOUR) {
        ret = moment(d).tz(this.axisTimezone).format("HH:mm:ss");
      } else if (span <= DAY) {
        ret = moment(d).tz(this.axisTimezone).format("YYYY MMM DD ddd, HH:mm");
      } else if (span <= MONTH) {
        ret = moment(d).tz(this.axisTimezone).format("YYYY MMM DD ddd");
      } else if (span <= YEAR) {
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
