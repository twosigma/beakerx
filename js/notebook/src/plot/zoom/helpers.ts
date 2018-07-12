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

/// <reference types='d3'/>
/// <reference path='../../types/index.d.ts'/>

import * as _ from 'underscore';
import * as moment from 'moment-timezone/builds/moment-timezone-with-data';
import {PlotFocus} from "./focus";
import {PlotScale} from "./scale";

const plotUtils = require('../plotUtils');

export function disableZoomWheel(scope: any): void {
  scope.svg.on('wheel.zoom', null);
  scope.jqcontainer.off('wheel.zoom');
}

export function enableZoomWheel(scope: any, d3: any): void {
  if (!scope._defaultZoomWheelFn) {
    return;
  }

  scope.svg.on('wheel.zoom', scope._defaultZoomWheelFn);
  scope.jqcontainer
    .off('wheel.zoom')
    .on('wheel.zoom', function(event) {
      d3.event = event.originalEvent;
      scope.svg.dispatch('wheel.zoom', scope._defaultZoomWheelFn);
    });
}

export function zoomBoxZooming(scope: any, d3: any): void {
  const svgNode = scope.svg.node();

  // right click zoom
  scope.mousep2 = {
    "x" : d3.mouse(svgNode)[0],
    "y" : d3.mouse(svgNode)[1]
  };
  scope.locateBox = scope.getLocateBoxCoords();
  scope.rpipeRects = [];

  renderLocateBox(scope);
}

export function renderLocateBox(scope: any) {
  scope.svg.selectAll("#locatebox").remove();

  if (!scope.locateBox) {
    return;
  }

  const box = scope.locateBox;
  scope.view = scope.svg.selectAll("#locatebox")
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

export function zoomStart(scope: any, d3: any) {
  if (scope.interactMode === "other") { return; }

  scope.zoom = true;
  scope.zoomed = false;
  scope.zoomStarted = moment();

  const d3trans = d3.event.transform || d3.event;

  scope.lastransformX = d3trans.x;
  scope.lastransformY = d3trans.y;
  scope.lastTransK = d3trans.k;

  const svgNode = scope.svg.node();
  const mousep2 = scope.mousep2 || {};

  scope.mousep1 = {
    "x" : d3.mouse(svgNode)[0],
    "y" : d3.mouse(svgNode)[1]
  };

  scope.mousep2 = {
    ...mousep2,
    ...scope.mousep1
  };

  scope.jqsvg.css("cursor", "auto");
}

export function zoomEnd(scope, d3) {
  if (scope.interactMode === "locate") {
    scope.jqsvg.css("cursor", "auto");

    return;
  }

  // trigger 'show' for save-as context menu
  if (
    _.isMatch(scope.mousep1, scope.mousep2)
    && scope.saveAsMenuContainer
    && scope.saveAsMenuContainer.contextMenu
  ) {
    const mousePosition = d3.mouse(document.body);

    scope.saveAsMenuContainer.contextMenu({
      x: mousePosition[0],
      y: mousePosition[1]
    });
  } else if (scope.shouldStartBoxZooming()) {
    // draw rectangle for zoom-area and update chart
    scope.locateFocus();
    scope.locateBox = null;
    scope.update();
    scope.interactMode = "zoom";
  } else {
    scope.locateBox = null;
  }

  enableZoomWheel(self, d3);

  const isDispatchedAsSecond = scope.zoomEventsDispatchOrder.indexOf('contextMenu') !== -1;

  if (
    isDispatchedAsSecond
    && scope.contexteMenuEvent
    && !scope.shouldStartBoxZooming()
  ) {
    scope.jqcontainer[0] && scope.jqcontainer[0].dispatchEvent(scope.contexteMenuEvent);
  }

  scope.zoomEventsDispatchOrder.length = 0;

  if (!isDispatchedAsSecond) {
    scope.zoomEventsDispatchOrder.push('zoomEnd');
  }

  scope.contexteMenuEvent = null;
  scope.jqsvg.css("cursor", "auto");
}

export function zooming(scope: any, d3: any) {
  if (scope.interactMode === "other" || !scope.zoom) {
    return;
  }

  if (scope.interactMode === "zoom") {
    zoom(scope, d3);
  }

  if (scope.interactMode === 'locate') {
    zoomBoxZooming(scope, d3);
  }
}

function zoom(scope, d3) {
  const d3trans = d3.event.transform || d3.event;
  const svgNode = scope.svg.node();
  const mx = d3.mouse(svgNode)[0];
  const my = d3.mouse(svgNode)[1];
  const focus = scope.focus;
  const ZOOM_TICK = 0.1;
  const zoomDirection = Math.sign(scope.lastTransK - d3trans.k);
  const zoomRate =  Math.abs(zoomDirection + ZOOM_TICK);

  if (Math.abs(mx - scope.mousep1.x)>0 || Math.abs(my - scope.mousep1.y)>0){
    scope.zoomed = true;
  }

  if (zoomDirection === 0) {
    moveGraph(scope, focus, d3trans);
  } else {
    scaleGraph(scope, focus, mx, my, zoomRate, d3trans);
  }

  scope.calcMapping(true);
  scope.renderCursor({ offsetX: mx, offsetY: my });
  scope.fixFocus(scope.focus);
  scope.update();
}

function moveGraph(scope, focus, d3trans) {
  const lMargin = scope.layout.leftLayoutMargin;
  const bMargin = scope.layout.bottomLayoutMargin;
  const W = plotUtils.safeWidth(scope.jqsvg) - lMargin;
  const H = plotUtils.safeHeight(scope.jqsvg) - bMargin;
  const deltaX = d3trans.x - scope.lastx;
  const deltaY = d3trans.y - scope.lasty;
  const transformX = -deltaX / W * focus.xspan;
  const transformY = deltaY / H * focus.yspan;
  const transformY_r = deltaY / H * focus.yspan_r;

  setLastTransform(scope, d3trans);

  // for translating, moving the graph
  PlotFocus.transformX(focus, transformX);
  PlotFocus.transformY(focus, transformY);
  PlotFocus.transformYRight(focus, transformY_r, transformY);

  scope.jqsvg.css("cursor", "move");
}

function scaleGraph(scope, focus, mouseX, mouseY, zoomRate, d3trans) {
  // scale only
  setLastTransform(scope, d3trans);

  let autoZoomSuccess = PlotScale.scaleBothAxes(scope, mouseX, mouseY);

  !autoZoomSuccess && PlotScale.scaleY(scope, mouseY, zoomRate);
  PlotScale.scaleX(scope, mouseX, zoomRate);

  scope.emitZoomLevelChange();
}

function setLastTransform(scope, d3trans) {
  scope.lastx = d3trans.x;
  scope.lasty = d3trans.y;
  scope.lastTransK = d3trans.k;
}

export default {
  disableZoomWheel,
  enableZoomWheel,
  renderLocateBox,
  zoomStart,
  zooming
}
