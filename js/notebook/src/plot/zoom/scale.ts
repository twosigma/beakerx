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

import {INITIAL_ZOOM_LEVEL} from "./consts";
import PlotStyleUtils from "beakerx_shared/lib/utils/PlotStyleUtils";

export namespace PlotScale {
  export function scaleBothAxes(scope, mouseX, mouseY): boolean {
    const focus = scope.plotFocus.getFocus();
    const data = scope.stdmodel.data;

    if (
      mouseY > PlotStyleUtils.safeHeight(scope.jqsvg) - scope.layout.bottomLayoutMargin
      || mouseX < scope.layout.leftLayoutMargin
      || !scope.model.model.auto_zoom
      || !data.map(item => item.getRange ? true : false).every(b => b)
    ) {
      return false;
    }

    // Zooming in the middle of the chart, autoscale Y
    const ranges = data.map(item => item.getRange(item.elements.filter(el => el.x >= focus.xl && el.x <= focus.xr)));
    const minYValue = Math.min(...ranges.map(r => r.yl).filter(y => !isNaN(y) && isFinite(y)));
    const maxYValue = Math.max(...ranges.map(r => r.yr).filter(y => !isNaN(y) && isFinite(y)));

    if (
      !isNaN(minYValue)
      && isFinite(minYValue)
      && !isNaN(maxYValue)
      && isFinite(maxYValue)
    ) {
      focus.yl = minYValue;
      focus.yr = maxYValue;
      focus.yspan = focus.yr - focus.yl;

      return true;
    }

    return false;
  }

  export function scaleY(scope, mouseY, zoomRate) {
    if (mouseY > PlotStyleUtils.safeHeight(scope.jqsvg) - scope.layout.bottomLayoutMargin) {
      return;
    }

    scaleYAxis(scope, mouseY, zoomRate, 'yl', 'yr', 'yspan');
    scaleYAxis(scope, mouseY, zoomRate, 'yl_r', 'yr_r', 'yspan_r');
  }

  function scaleYAxis(scope, mouseY, zoomRate, l, r, span) {
    const focus = scope.plotFocus.getFocus();
    const level = INITIAL_ZOOM_LEVEL;
    const yMiddle = focus[l] + scope.plotRange.scr2dataYp_r(mouseY) * focus[span];
    const newYl = yMiddle - zoomRate * (yMiddle - focus[l]);
    const newYr = yMiddle + zoomRate * (focus[r] - yMiddle);
    const newYSpan = newYr - newYl;

    if (newYSpan >= level.minSpanY && newYSpan <= level.maxScaleY) {
      focus[l] = newYl;
      focus[r] = newYr;
      focus[span] = newYSpan;

      return;
    }

    if (newYSpan > level.maxScaleY) {
      focus[r] = focus[l] + level.maxScaleY;
    } else if (newYSpan < level.minSpanY) {
      focus[r] = focus[l] + level.minSpanY;
    }

    focus[span] = focus[r] - focus[l];
  }

  export function scaleX(scope, mouseX, zoomRate) {
    let focus = scope.plotFocus.getFocus();
    let level = INITIAL_ZOOM_LEVEL;

    if (mouseX < scope.layout.leftLayoutMargin) {
      return;
    }

    let xm = focus.xl + scope.plotRange.scr2dataXp(mouseX) * focus.xspan;
    let nxl = xm - zoomRate * (xm - focus.xl);
    let nxr = xm + zoomRate * (focus.xr - xm);
    let nxspan = nxr - nxl;

    if(nxspan >= level.minSpanX && nxspan <= level.maxScaleX) {
      focus.xl = nxl;
      focus.xr = nxr;
      focus.xspan = nxspan;

      return;
    }

    if(nxspan > level.maxScaleX) {
      focus.xr = focus.xl + level.maxScaleX;
    } else if (nxspan < level.minSpanX) {
      focus.xr = focus.xl + level.minSpanX;
    }

    focus.xspan = focus.xr - focus.xl;
  }
}
