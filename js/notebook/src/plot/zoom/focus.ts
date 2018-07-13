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

const plotUtils = require('../plotUtils');

export namespace PlotFocus {

  export function reset(scope: any) {
    const svgNode = scope.svg.node();
    const mx = d3.mouse(svgNode)[0];
    const my = d3.mouse(svgNode)[1];

    const t = d3.zoomIdentity.translate(0, 0).scale(1);
    scope.svg.call(scope.plotZoom.zoomObj.transform, t);

    const lMargin = scope.layout.leftLayoutMargin;
    const bMargin = scope.layout.bottomLayoutMargin;
    const H = plotUtils.safeHeight(scope.jqsvg);

    if (mx < lMargin && my < H - bMargin) {
      _.extend(scope.focus, _.pick(scope.defaultFocus, "yl", "yr", "yspan", "yl_r", "yr_r", "yspan_r"));
    } else if (my > H - bMargin && mx > lMargin) {
      _.extend(scope.focus, _.pick(scope.defaultFocus, "xl", "xr", "xspan"));
    } else {
      _.extend(scope.focus, scope.defaultFocus);
    }

    scope.fixFocus(scope.focus);
    scope.calcMapping(true);
    scope.emitZoomLevelChange();
    scope.update();
  }

  export function transformX(focus, value) {
    transform(focus, value, 'xl', 'xr', 'xspan');
  }

  export function transformY(focus, value) {
    transform(focus, value, 'yl', 'yr', 'yspan');
  }

  export function transformYRight(focus, valueR, valueY) {
    if (!focus.yl_r === undefined && focus.yr_r === undefined) {
      return;
    }

    if (focus.yl_r + valueY >= 0 && focus.yr_r + valueR <= 1) {
      return transformBounds(focus, 'yl_r', 'yr_r', valueR);
    }

    if (focus.yl_r + valueR < 0) {
      return transformLeftBound(focus, 'yl_r', 'yr_r', 'yspan_r');
    }

    if (focus.yr_r + valueR > 1) {
      transformRightBound(focus, 'yl_r', 'yr_r', 'yspan_r');
    }
  }

  function transform(focus, value, left, right, span) {
    if (focus[left] + value >= 0 && focus[right] + value <= 1) {
      return transformBounds(focus, left, right, value);
    }

    if (focus[left] + value < 0) {
      return transformLeftBound(focus, left, right, span);
    }

    if (focus[right] + value > 1) {
      transformRightBound(focus, left, right, span);
    }
  }

  function transformBounds(focus, left, right, value) {
    focus[left] += value;
    focus[right] += value;
  }

  function transformLeftBound(focus, left, right, span) {
    focus[left] = 0;
    focus[right] = focus[left] + focus[span];
  }

  function transformRightBound(focus, left, right, span) {
    focus[right] = 1;
    focus[left] = focus[right] - focus[span];
  }
}
