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

import * as d3 from 'd3';
import * as moment from 'moment-timezone/builds/moment-timezone-with-data';
import PlotStyleUtils from "beakerx_shared/lib/utils/PlotStyleUtils";

const QUICK_ZOOM_DEBOUNCE_TIME = 50;

export default class BoxZoom {
  scope: any;
  locateBox: any;

  constructor(scope: any) {
    this.scope = scope;
    this.locateBox = null;
  }

  shouldStartBoxZooming(zoomStarted: any) {
    return (
      Math.abs(this.scope.mousep1.x - this.scope.mousep2.x) > 10
      && Math.abs(this.scope.mousep1.y - this.scope.mousep2.y) > 10
      && moment() - zoomStarted > QUICK_ZOOM_DEBOUNCE_TIME
    );
  };

  getLocateBoxCoords() {
    const p1 = this.scope.mousep1;
    const p2 = this.scope.mousep2;
    const xl = Math.min(p1.x, p2.x);
    let xr = Math.max(p1.x, p2.x);
    let yl = Math.min(p1.y, p2.y);
    let yr = Math.max(p1.y, p2.y);

    if (xr === xl) { xr = xl + 1; }
    if (yr === yl) { yr = yl + 1; }

    return { x: xl, y: yl, w: xr - xl, h: yr - yl };
  };

  resetLocateBox() {
    this.locateBox = null;
  }

  zoomBoxZooming(): void {
    const svgNode = this.scope.svg.node();

    // right click zoom
    this.scope.mousep2 = {
      x: d3.mouse(svgNode)[0],
      y: d3.mouse(svgNode)[1]
    };
    this.locateBox = this.getLocateBoxCoords();
    this.scope.rpipeRects = [];
    this.renderLocateBox();
  }

  locateFocus() {
    const box = this.locateBox;

    if (!box) {
      return;
    }

    const p1 = {
      "x" : this.scope.plotRange.scr2dataXp(box.x),
      "y" : this.scope.plotRange.scr2dataYp(box.y)
    };

    const p2 = {
      "x" : this.scope.plotRange.scr2dataXp(box.x + box.w),
      "y" : this.scope.plotRange.scr2dataYp(box.y + box.h)
    };

    p1.x = Math.max(0, p1.x);
    p1.y = Math.max(0, p1.y);
    p2.x = Math.min(1, p2.x);
    p2.y = Math.min(1, p2.y);

    let focus = this.scope.plotFocus.getFocus();
    let ofocus = { ...focus };

    focus.xl = ofocus.xl + ofocus.xspan * p1.x;
    focus.xr = ofocus.xl + ofocus.xspan * p2.x;
    focus.yl = ofocus.yl + ofocus.yspan * p2.y;
    focus.yr = ofocus.yl + ofocus.yspan * p1.y;
    focus.yl_r = ofocus.yl_r + ofocus.yspan_r * p2.y;
    focus.yr_r = ofocus.yl_r + ofocus.yspan_r * p1.y;
    focus.xspan = focus.xr - focus.xl;
    focus.yspan = focus.yr - focus.yl;
    focus.yspan_r = focus.yr_r - focus.yl_r;

    // Calculate zoom level
    const W = PlotStyleUtils.safeWidth(this.scope.jqsvg);
    const H = PlotStyleUtils.safeHeight(this.scope.jqsvg);
    const zoomLevel: number = (this.scope.plotZoom.lastTransform.k || 1) + ((W / box.w + H / box.h) / 2); // Calculate average zoom level
    const transform: any = d3.zoomTransform(this.scope.svg.node());

    this.scope.plotZoom.lastTransform.k = zoomLevel;
    transform.k = zoomLevel;

    this.scope.plotRange.calcMapping(true);
    this.scope.emitZoomLevelChange();
  }

  renderLocateBox() {
    this.scope.svg.selectAll("#locatebox").remove();

    if (!this.locateBox) {
      return;
    }

    const box = this.locateBox;
    this.scope.view = this.scope.svg.selectAll("#locatebox")
      .data([{}])
      .enter()
      .append("rect")
      .attr("id", "locatebox")
      .attr("class", "plot-locatebox")
      .attr("x", box.x)
      .attr("y", box.y)
      .attr("width", box.w)
      .attr("height", box.h);
  }
}
