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
    var PlotSampler = function(_x, _y){
      this.xs = _x;
      this.y = _y;
      this.n = _x.length;
      this.buildCoordTable();
      this.buildSegTree();
    };

    PlotSampler.prototype.sample = function(xl, xr, count) {
      if (count <= 0 || xr < xl) {
        console.error("incorrect sample parameters");
        return [];
      }
      var step = (xr - xl) / count;
      var ret = [];
      for (var i = 0; i < count; i++) {
        var sl = xl + i * step,
            sr = xl + (i + 1) * step - 1E-12; // [sl,sr) closed open, be ware of precision problem
        var qret = this.query(sl, sr);
        if (qret == null) {
          continue;
        }
        var ele = {};
        _(ele).extend(qret);  // prevent segtree from being modified

        ele.xl = sl;
        ele.xr = sr;
        ele.avg = ele.sum / ele.cnt;

        ele.x = (sl + sr) / 2;
        ele.y = ele.avg;

        ret.push(ele);
      }
      return ret;
    };

    PlotSampler.prototype.query = function(xl, xr) {
      var l = this.mapIndex(xl),
          r = this.mapIndex(xr);
      l = Math.max(l, 0);
      if (l > r || r == -1) {
        return null;
      }
      return this.querySegTree(0, 0, this.n - 1, l, r);
    };

    PlotSampler.prototype.buildCoordTable = function() {
      this.x = this.xs.slice(0); // copy xs to x
      _.uniq(this.xs); // keep unique values in xs
      for (var i = 0; i < this.n; i++) {
        this.x[i] = this.mapIndex(this.x[i]);
      }
    };

    PlotSampler.prototype.buildSegTree = function() {
      this.values = [];
      for (var i = 0; i < this.n; i++) {
        this.values.push({});
      }
      this.initSegTree(0, 0, this.n - 1);
    };

    PlotSampler.prototype.initSegTree = function(k, nl, nr) {
      if (nl == nr) {
        this.values[k] = {
          min : this.y[nl],
          max : this.y[nl],
          sum : this.y[nl],
          cnt : 1
        };
        return;
      }
      var nm = Math.floor((nl + nr) / 2),
          kl = 2 * k + 1,
          kr = 2 * k + 2;
      this.initSegTree(kl, nl, nm);
      this.initSegTree(kr, nm + 1, nr);
      this.values[k] = {
        min : Math.min(this.values[kl].min, this.values[kr].min),
        max : Math.max(this.values[kl].max, this.values[kr].max),
        sum : this.values[kl].sum + this.values[kr].sum,
        cnt : this.values[kl].cnt + this.values[kr].cnt
      };
    };

    PlotSampler.prototype.querySegTree = function(k, nl, nr, l, r) {
      if (r < nl || l > nl || l > r) {
        return null;
      }
      if (l <= nl && r >= nr) {
        return this.values[k];
      }
      var nm = Math.floor((nl + nr) / 2),
          kl = 2 * k + 1,
          kr = 2 * k + 2;
      var retl = this.querySegTree(kl, nl, nm, l, r),
          retr = this.querySegTree(kr, nm + 1, nr, l, r);
      if (retl == null && retr == null) {
        return null;
      } else if (retl == null || retr == null) {
        return retl == null ? retr : retl;
      } else {
        return {
          min : Math.min(retl.min, retr.min),
          max : Math.max(retl.max, retr.max),
          sum : retl.sum + retr.sum,
          cnt : retl.cnt + retr.cnt
        };
      }
    };

    PlotSampler.prototype.mapIndex = function(x) {
      // find the largest element in xs that is <= x, may return -1 (no such element)
      var l = 0, r = this.xs.length - 1;
      while (l <= r) {
        var m = Math.floor((l + r) / 2);
        if (this.xs[m] <= x) {
          l = m + 1;
        } else {
          r = m - 1;
        }
      }
      return r;
    };

    return PlotSampler;
  };
  beaker.bkoFactory('PlotSampler', ['plotUtils', retfunc]);
})();