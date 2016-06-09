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
    var PlotSampler = function(xs, ys, _ys){
      this.xs = xs;
      this.ys = ys;
      this._ys = _ys;
      this.n = xs.length;

      if (this.debug) {
        console.log("data size: ", this.n);
        var t = Date.now();
      }

      this.buildCoordTable();

      if (this.debug) {
        console.log("coord table: ", Date.now() - t, "ms");
        t = Date.now();
      }

      this.buildSegTree();

      if (this.debug) {
        console.log("seg tree: ", Date.now() - t, "ms");
      }
    };

    PlotSampler.prototype.debug = false;  // set time estimation

    PlotSampler.prototype.sample = function(xl, xr, step) {
      if (step <= 0 || xr < xl) {
        console.error("incorrect sample parameters");
        return [];
      }
      var ret = [];
      this.hashes = {};
      var nsl = xl, sl, sr;
      while (nsl < xr) {
        sl = nsl;
        nsl += step;
        sr = sl + step - 1E-12; // [sl,sr) closed open, be ware of precision problem

        var qret = this.query(sl, sr);
        if (qret == null) {
          continue;
        }
        var h = qret.l + "_" + qret.r;
        if (this.hashes[h] != null) {
          continue;
        } else {
          this.hashes[h] = 1;
        }
        // prevent segtree from being modified
        var avg = qret.sum / qret.cnt;
        var count = 0;
        var index;
        _.forEach(this.xs, function (x, i) {
          if (x >= sl && x < sr) {
            count++;
            index = i;
          }
        });
        if(!count){ continue; }
        var ele = {
          min : qret.min,
          max : qret.max,
          _min : qret._min,
          _max : qret._max,
          xl : sl,
          xr : sr,
          avg : avg,
          x : count === 1 ? this.xs[index] : (sl + sr) / 2,
          y : avg,
          hash : h,
          count: count
        };
        ret.push(ele);
      }
      delete this.hashes;
      return ret;
    };

    PlotSampler.prototype.query = function(xl, xr) {
      if (xr < this.xs[0] || xl > this.xs[this.xs.length - 1]) {
        return null;
      }
      var l = this.mapIndex(xl),
          r = this.mapIndex(xr);
      l = Math.max(l, 0);
      r = Math.min(r, this.n - 1);
      if (l > r || r == -1) {
        return null;
      }
      var ret = this.querySegTree(0, 0, this.n - 1, l, r);
      ret.l = l;
      ret.r = r;
      return ret;
    };

    PlotSampler.prototype.buildCoordTable = function() {
      this.x = this.xs.slice(0); // copy xs to x

      if (this.debug) {
        var t = Date.now();
      }

      _.uniq(this.xs, true); // keep unique values in xs

      if (this.debug) {
        console.log("uniq ", Date.now() - t, "ms");
        t = Date.now();
      }

      for (var i = 0; i < this.n; i++) {
        //if (this.x[i] == null || isNaN(this.x[i]) === true) {
        //  console.error("invalid value passed to sampler");
        //}
        this.x[i] = this.mapIndex(this.x[i]);
      }

      if (this.debug) {
        console.log("map ", Date.now() - t, "ms");
      }
    };

    PlotSampler.prototype.buildSegTree = function() {
      this.mins = [];
      this.maxs = [];
      this.sums = [];
      this.cnts = [];
      this._mins = [];
      this._maxs = [];
      this.initSegTree(0, 0, this.n - 1);
    };

    PlotSampler.prototype.initSegTree = function(k, nl, nr) {
      if (nl == nr) {
        this.mins[k] = this.ys[nl];
        this.maxs[k] = this.ys[nl];
        this.sums[k] = this.ys[nl];
        this._mins[k] = this._ys[nl];
        this._maxs[k] = this._ys[nl];
        this.cnts[k] = 1;
        return;
      }
      var nm = Math.floor((nl + nr) / 2),
          kl = 2 * k + 1,
          kr = 2 * k + 2;
      this.initSegTree(kl, nl, nm);
      this.initSegTree(kr, nm + 1, nr);
      this.mins[k] = Math.min(this.mins[kl], this.mins[kr]);
      this.maxs[k] = Math.max(this.maxs[kl], this.maxs[kr]);
      this._mins[k] = Math.min(this._mins[kl], this._mins[kr]);
      this._maxs[k] = Math.max(this._maxs[kl], this._maxs[kr]);
      this.sums[k] = this.sums[kl] + this.sums[kr];
      this.cnts[k] = this.cnts[kl] + this.cnts[kr];
    };

    PlotSampler.prototype.querySegTree = function(k, nl, nr, l, r) {
      if (r < nl || l > nr || l > r) {
        return null;
      }
      if (l <= nl && r >= nr) {
        return {
          min : this.mins[k],
          max : this.maxs[k],
          _min : this._mins[k],
          _max : this._maxs[k],
          sum : this.sums[k],
          cnt : this.cnts[k]
        };
      }
      var nm = Math.floor((nl + nr) / 2),
          kl = 2 * k + 1,
          kr = 2 * k + 2;
      var retl = this.querySegTree(kl, nl, nm, l, r),
          retr = this.querySegTree(kr, nm + 1, nr, l, r);
      if (retl == null && retr == null) {
        return null;
      } else if (retl == null) {
        return retr;
      } else if (retr == null) {
        return retl;
      } else {
        return {
          min : Math.min(retl.min, retr.min),
          max : Math.max(retl.max, retr.max),
          _min : Math.min(retl._min, retr._min),
          _max : Math.max(retl._max, retr._max),
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
  beakerRegister.bkoFactory('PlotSampler', ['plotUtils', retfunc]);
})();
