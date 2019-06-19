/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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

import * as d3 from "d3";
import * as _ from "underscore";
import {Focus} from "./interface";
import PlotUtils from "../utils/PlotUtils";
import BigNumberUtils from "beakerx_shared/lib/utils/BigNumberUtils";
import PlotStyleUtils from "beakerx_shared/lib/utils/PlotStyleUtils";
import { Big } from 'big.js';

export default class PlotFocus {
  defaultFocus: Focus;
  focus: Focus;
  scope: any;

  constructor(scope: any) {
    this.scope = scope;
    this.defaultFocus = null;
    this.focus = null;

    this.onModelFocusUpdate = this.onModelFocusUpdate.bind(this);
  }

  static remapFocusRegion(model) {
    const focus = model.userFocus;

    if (focus.xl != null) {
      focus.xl = model.xAxis.getPercent(focus.xl);
    }

    if (focus.xr != null) {
      focus.xr = model.xAxis.getPercent(focus.xr);
    }

    if (focus.yl != null) {
      focus.yl = model.yAxis.getPercent(focus.yl);
    }

    if (focus.yr != null) {
      focus.yr = model.yAxis.getPercent(focus.yr);
    }

    if (focus.yl_r != null && model.yAxisR) {
      focus.yl_r = model.yAxisR.getPercent(focus.yl_r);
    }

    if (focus.yr_r != null && model.yAxisR) {
      focus.yr_r = model.yAxisR.getPercent(focus.yr_r);
    }
  }

  setDefault(focus: Focus) {
    this.defaultFocus = focus;
  }

  setFocus(focus: Focus, base: Focus = this.defaultFocus) {
    this.focus = {
      ...base,
      ...focus
    };
  }

  getFocus() {
    return this.focus;
  }

  static getDefault(model): {
    defaultFocus: Focus,
    visibleItem?: any,
    legendableItem?: any,
  } {
    const yAxisData = [];
    const yAxisRData = [];

    for (let i = 0; i < model.data.length; i++) {
      const item = model.data[i];

      if(PlotUtils.useYAxisR(model, item)){
        yAxisRData.push(item);
      } else {
        yAxisData.push(item);
      }
    }

    const ret = PlotUtils.getDataRange(yAxisData);
    const retR = PlotUtils.getDataRange(yAxisRData);
    const range = ret.dataRange;
    const rangeR = retR.dataRange;
    const margin = model.margin;

    if(ret.visibleItems === 0) { // for empty plot, focus needs to be adjusted
      range.xl = model.xAxis.getPercent(range.xl);
      range.xr = model.xAxis.getPercent(range.xr);
      range.yl = model.yAxis.getPercent(range.yl);
      range.yr = model.yAxis.getPercent(range.yr);

      if (model.yAxisR) {
        rangeR.yl = model.yAxisR.getPercent(rangeR.yl);
        rangeR.yr = model.yAxisR.getPercent(rangeR.yr);
      }
    }

    const focus: Focus = {
      xl : model.userFocus.xl,
      xr : model.userFocus.xr,
      yl : model.userFocus.yl,
      yr : model.userFocus.yr,
      yl_r : model.yAxisR !== null ? model.userFocus.yl_r : model.userFocus.yl,
      yr_r : model.yAxisR !== null ? model.userFocus.yr_r : model.userFocus.yr
    };

    if (focus.xl == null) {
      focus.xl = BigNumberUtils.minus(range.xl, BigNumberUtils.mult(range.xSpan, margin.left));
    }

    if (focus.xr == null) {
      focus.xr = BigNumberUtils.plus(range.xr, BigNumberUtils.mult(range.xSpan, margin.right));
    }

    if (focus.xl instanceof Big) {
      focus.xl = parseFloat(focus.xl.toString());
    }

    if (focus.xr instanceof Big) {
      focus.xr = parseFloat(focus.xr.toString());
    }

    if (focus.yl == null) {
      if (model.yIncludeZero === true) {
        const yl = model.vrange.yspan * range.yl + model.vrange.yl;

        if(yl > 0){
          range.yl = (0 - model.vrange.yl) / model.vrange.yspan;
          range.ySpan = range.yr - range.yl;
        }
      }

      focus.yl = range.yl - range.ySpan * margin.bottom;
    }

    if (focus.yr == null) {
      focus.yr = range.yr + range.ySpan * margin.top;
    }

    if (focus.yl_r == null) {
      if (model.yIncludeZero === true && model.vrangeR) {
        const yl_r = model.vrangeR.yspan * rangeR.yl + model.vrangeR.yl;

        if(yl_r > 0){
          rangeR.yl = (0 - model.vrangeR.yl) / model.vrangeR.yspan;
          rangeR.ySpan = rangeR.yr - rangeR.yl;
        }
      }

      focus.yl_r = rangeR.yl - rangeR.ySpan * (_.isNumber(margin.bottom_r) ? margin.bottom_r : 0);
    }

    if (focus.yr_r == null) {
      focus.yr_r = rangeR.yr + rangeR.ySpan * (_.isNumber(margin.top_r) ? margin.top_r : 0);
    }

    focus.xspan = focus.xr - focus.xl;
    focus.yspan = focus.yr - focus.yl;
    focus.yspan_r = focus.yr_r - focus.yl_r;

    let result = { defaultFocus: focus };

    _.extend(result, _.omit(ret, "datarange"));

    return result;
  }

  reset() {
    const svgNode = this.scope.svg.node();
    const mx = d3.mouse(svgNode)[0];
    const my = d3.mouse(svgNode)[1];

    const t = d3.zoomIdentity.translate(0, 0).scale(1);
    this.scope.svg.call(this.scope.plotZoom.zoomObj.transform, t);

    const lMargin = this.scope.layout.leftLayoutMargin;
    const bMargin = this.scope.layout.bottomLayoutMargin;
    const H = PlotStyleUtils.safeHeight(this.scope.jqsvg);

    if (mx < lMargin && my < H - bMargin) {
      _.extend(this.focus, _.pick(this.defaultFocus, "yl", "yr", "yspan", "yl_r", "yr_r", "yspan_r"));
    } else if (my > H - bMargin && mx > lMargin) {
      _.extend(this.focus, _.pick(this.defaultFocus, "xl", "xr", "xspan"));
    } else {
      _.extend(this.focus, this.defaultFocus);
    }

    this.fix(this.focus);
    this.scope.plotRange.calcMapping(true);
    this.scope.emitZoomLevelChange();
    this.scope.update();
  }

  fix(focus: Focus) {
    focus.xl = focus.xl < 0 ? 0 : focus.xl;
    focus.xr = focus.xr > 1 ? 1 : focus.xr;
    focus.yl = focus.yl < 0 ? 0 : focus.yl;
    focus.yr = focus.yr > 1 ? 1 : focus.yr;
    focus.yl_r = focus.yl_r < 0 ? 0 : focus.yl_r;
    focus.yr_r = focus.yr_r > 1 ? 1 : focus.yr_r;
    focus.xspan = focus.xr - focus.xl;
    focus.yspan = focus.yr - focus.yl;
    focus.yspan_r = focus.yr_r - focus.yl_r;

    if (focus.xl > focus.xr || focus.yl > focus.yr || focus.yl_r > focus.yr_r) {
      console.error("visible range specified does not match data range, " +
        "enforcing visible range");
      _.extend(focus, this.defaultFocus);
    }
  }

  transformX(focus, value) {
    this.transform(focus, value, 'xl', 'xr', 'xspan');
  }

  transformY(focus, value) {
    this.transform(focus, value, 'yl', 'yr', 'yspan');
  }

  transformYRight(focus, valueR, valueY) {
    if (!focus.yl_r === undefined && focus.yr_r === undefined) {
      return;
    }

    if (focus.yl_r + valueY >= 0 && focus.yr_r + valueR <= 1) {
      return this.transformBounds(focus, 'yl_r', 'yr_r', valueR);
    }

    if (focus.yl_r + valueR < 0) {
      return this.transformLeftBound(focus, 'yl_r', 'yr_r', 'yspan_r');
    }

    if (focus.yr_r + valueR > 1) {
      this.transformRightBound(focus, 'yl_r', 'yr_r', 'yspan_r');
    }
  }

  transform(focus, value, left, right, span) {
    if (focus[left] + value >= 0 && focus[right] + value <= 1) {
      return this.transformBounds(focus, left, right, value);
    }

    if (focus[left] + value < 0) {
      return this.transformLeftBound(focus, left, right, span);
    }

    if (focus[right] + value > 1) {
      this.transformRightBound(focus, left, right, span);
    }
  }

  transformBounds(focus, left, right, value) {
    focus[left] += value;
    focus[right] += value;
  }

  transformLeftBound(focus, left, right, span) {
    focus[left] = 0;
    focus[right] = focus[left] + focus[span];
  }

  transformRightBound(focus, left, right, span) {
    focus[right] = 1;
    focus[left] = focus[right] - focus[span];
  }

  onModelFocusUpdate(newFocus) {
    if (newFocus === null) {
      return;
    }

    this.setFocus(
      {
        ...this.focus,
        xl: newFocus.xl,
        xr: newFocus.xr,
        xspan: newFocus.xspan,
      },
      this.focus
    );

    this.scope.plotRange.calcMapping(false);
    this.scope.update();
  }
}
