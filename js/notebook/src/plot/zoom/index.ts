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
import * as _ from 'underscore';
import * as moment from 'moment-timezone/builds/moment-timezone-with-data';
import {enableZoomWheel} from "./helpers";
import BoxZoom from "./BoxZoom";
import EventDispatcher from "./EventDispatcher";
import {PlotScale} from "./scale";
import PlotStyleUtils from "beakerx_shared/lib/utils/PlotStyleUtils";

export default class PlotZoom {
  scope: any;
  boxZoom: BoxZoom;
  zoomStarted: boolean;
  lastTransform: { x: number, y: number, k: number };
  eventDispatcher: EventDispatcher;

  zoomObj: any = null;

  constructor(scope) {
    this.scope = scope;
    this.boxZoom = new BoxZoom(scope);
    this.eventDispatcher = new EventDispatcher();
    this.zoomStart = this.zoomStart.bind(this);
    this.zoomEnd = this.zoomEnd.bind(this);
    this.zooming = this.zooming.bind(this);
    this.handleContextMenuEvent = this.handleContextMenuEvent.bind(this);
  }

  initZoomObject() {
    this.zoomObj = d3.zoom();
  }

  init() {
    this.zoomObj
      .on("start", this.zoomStart)
      .on("zoom", this.zooming)
      .on("end", this.zoomEnd);

    this.scope.svg.on("dblclick", () => this.scope.plotFocus.reset());

    const svgElement = this.scope.svg.node();

    svgElement.removeEventListener('contextmenu', this.handleContextMenuEvent);
    svgElement.addEventListener('contextmenu', this.handleContextMenuEvent);

    // enable zoom events for mouse right click
    const filterFn = () => true;
    this.zoomObj.filter(filterFn);
    this.scope.svg.call(this.zoomObj);

    // disbale zoom events on double click
    this.scope.svg.on("dblclick.zoom", null);
  }

  zoomStart() {
    if (this.scope.interactMode === "other") { return; }

    this.scope.zoom = true;
    this.scope.zoomed = false;
    this.zoomStarted = moment();

    const d3trans = d3.event.transform || d3.event;

    this.setLastTransform(d3trans);

    const svgNode = this.scope.svg.node();
    const mousep2 = this.scope.mousep2 || {};

    this.scope.mousep1 = {
      "x" : d3.mouse(svgNode)[0],
      "y" : d3.mouse(svgNode)[1]
    };

    this.scope.mousep2 = {
      ...mousep2,
      ...this.scope.mousep1
    };

    this.scope.jqsvg.css("cursor", "auto");
  }

  zooming() {
    if (this.scope.interactMode === "other" || !this.scope.zoom) {
      return;
    }

    if (this.scope.interactMode === "zoom") {
      this.zoom();
    }

    if (this.scope.interactMode === 'locate') {
      this.boxZoom.zoomBoxZooming();
    }
  }

  zoomEnd() {
    if (this.scope.interactMode !== "locate") {
      this.scope.jqsvg.css("cursor", "auto");

      return;
    }

    // trigger 'show' for save-as context menu
    if (
      _.isMatch(this.scope.mousep1, this.scope.mousep2)
      && this.scope.saveAsMenuContainer
      && this.scope.saveAsMenuContainer.contextMenu
    ) {
      const mousePosition = d3.mouse(document.body);

      this.scope.saveAsMenuContainer.contextMenu({
        x: mousePosition[0],
        y: mousePosition[1]
      });
    } else if (this.boxZoom.shouldStartBoxZooming(this.zoomStarted)) {
      // draw rectangle for zoom-area and update chart
      this.boxZoom.locateFocus();
      this.boxZoom.resetLocateBox();
      this.scope.update();
      this.scope.interactMode = "zoom";
    } else {
      this.boxZoom.resetLocateBox();
    }

    enableZoomWheel(this.scope, d3);

    const isDispatchedAsSecond = this.eventDispatcher.contains('contextMenu');

    if (
      isDispatchedAsSecond
      && this.scope.contexteMenuEvent
      && !this.boxZoom.shouldStartBoxZooming(this.zoomStarted)
    ) {
      this.scope.jqcontainer[0] && this.scope.jqcontainer[0].dispatchEvent(this.scope.contexteMenuEvent);
    }

    this.eventDispatcher.reset();

    if (!isDispatchedAsSecond) {
      this.eventDispatcher.add('zoomEnd');
    }

    this.scope.contexteMenuEvent = null;
    this.scope.jqsvg.css("cursor", "auto");
  }

  private handleContextMenuEvent(event) {
    const locateBox = this.boxZoom.getLocateBoxCoords();
    const isDispatchedAsSecond = this.eventDispatcher.contains('zoomEnd');

    this.eventDispatcher.reset();

    if (!isDispatchedAsSecond) {
      this.scope.contexteMenuEvent = event;
      this.eventDispatcher.add('contextMenu');
    }

    if (!isDispatchedAsSecond || isDispatchedAsSecond && (locateBox.w > 1 || locateBox.h > 1)) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  private zoom() {
    const d3trans = d3.event.transform || d3.event;
    const svgNode = this.scope.svg.node();
    const mx = d3.mouse(svgNode)[0];
    const my = d3.mouse(svgNode)[1];
    const focus = this.scope.plotFocus.getFocus();
    const ZOOM_TICK = 0.1;
    const zoomDirection = Math.sign(this.lastTransform.k - d3trans.k);
    const zoomRate =  Math.abs(zoomDirection + ZOOM_TICK);

    if (Math.abs(mx - this.scope.mousep1.x)>0 || Math.abs(my - this.scope.mousep1.y)>0){
      this.scope.zoomed = true;
    }

    if (zoomDirection === 0) {
      this.moveGraph(focus, d3trans);
    } else {
      this.scaleGraph(mx, my, zoomRate, d3trans);
    }

    this.scope.plotRange.calcMapping(true);
    this.scope.plotCursor.render({ offsetX: mx, offsetY: my });
    this.scope.plotFocus.fix(this.scope.plotFocus.getFocus());
    this.scope.update();
  }

  private moveGraph(focus, d3trans) {
    const lMargin = this.scope.layout.leftLayoutMargin;
    const bMargin = this.scope.layout.bottomLayoutMargin;
    const W = PlotStyleUtils.safeWidth(this.scope.jqsvg) - lMargin;
    const H = PlotStyleUtils.safeHeight(this.scope.jqsvg) - bMargin;
    const deltaX = d3trans.x - this.lastTransform.x;
    const deltaY = d3trans.y - this.lastTransform.y;
    const transformX = -deltaX / W * focus.xspan;
    const transformY = deltaY / H * focus.yspan;
    const transformY_r = deltaY / H * focus.yspan_r;

    this.setLastTransform(d3trans);

    // for translating, moving the graph
    this.scope.plotFocus.transformX(focus, transformX);
    this.scope.plotFocus.transformY(focus, transformY);
    this.scope.plotFocus.transformYRight(focus, transformY_r, transformY);

    this.scope.jqsvg.css("cursor", "move");
  }

  private scaleGraph(mouseX, mouseY, zoomRate, d3trans) {
    // scale only
    this.setLastTransform(d3trans);

    let autoZoomSuccess = PlotScale.scaleBothAxes(this.scope, mouseX, mouseY);

    !autoZoomSuccess && PlotScale.scaleY(this.scope, mouseY, zoomRate);
    PlotScale.scaleX(this.scope, mouseX, zoomRate);

    this.scope.emitZoomLevelChange();
  }

  private setLastTransform(d3trans) {
    this.lastTransform = { ...d3trans };
  }
}
