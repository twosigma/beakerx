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

import * as _ from 'underscore';
import * as d3 from 'd3';
import plotTip from './PlotTip';
import zoomHelpers from './zoom/helpers';
import PlotUtils from "./utils/PlotUtils";
import PlotKeyboardUtils from "beakerx_shared/lib/utils/PlotKeyboardUtils";

export default class PlotInteraction {
  scope: any;
  tipTimeout: any;
  onKeyListeners: any = {}; //map: item.id -> listener function

  constructor(scope) {
    this.scope = scope;

    this.mouseDown = this.mouseDown.bind(this);
    this.onClickAction = this.onClickAction.bind(this);
    this.onKeyAction = this.onKeyAction.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseEnterTooltip = this.onMouseEnterTooltip.bind(this);
    this.onMouseMoveTooltip = this.onMouseMoveTooltip.bind(this);
    this.onMouseLeaveTooltip = this.onMouseLeaveTooltip.bind(this);
    this.onClickrespTooltip = this.onClickrespTooltip.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }

  bindEvents() {
    const scope = this.scope;

    this.scope.svg
      .on("mousedown", () => {
        scope.jqcontainer.addClass('bko-focused');

        return scope.plotInteraction.mouseDown();
      });

    scope.jqcontainer.on("mouseleave", () => {
      scope.jqcontainer.removeClass('bko-focused');

      return zoomHelpers.disableZoomWheel(scope);
    });

    scope.jqsvg
      .mousemove((e) => scope.plotCursor.render(e))
      .mouseleave((e) => scope.plotCursor.clear());
  }

  mouseDown() {
    if (this.scope.interactMode === "other") {
      this.scope.interactMode = "zoom";
      return;
    } else if (this.scope.interactMode === "remove") {
      this.scope.interactMode = "other";
      return;
    }

    if (d3.event.target.nodeName.toLowerCase() === "div") {
      this.scope.interactMode = "other";
      zoomHelpers.disableZoomWheel(this.scope);
      return;
    }

    if (d3.event.button === 0) {
      this.scope.interactMode = 'zoom';
      zoomHelpers.enableZoomWheel(this.scope, d3);
    } else {
      this.scope.interactMode = 'locate';
    }
  }

  emitZoomLevelChange() {
    const data = this.scope.stdmodel.data;

    for (let i = 0; i < data.length; i++) {
      if (data[i].isLodItem === true) {
        data[i].zoomLevelChanged(this.scope);
      }
    }
  }

  prepare() {
    const model = this.scope.stdmodel;

    this.scope.svg.selectAll(".item-clickable").on('click.action', this.onClickAction);

    //TODO add listeners only for elements that have keys or keyTags
    this.scope.svg.selectAll(".item-onkey")
      .on("mouseenter.plot-click", this.onMouseEnter)
      .on("mouseleave.plot-click", this.onMouseLeave);

    if (model.useToolTip) {
      this.bindTooltipEvents();
    }
  }

  onMouseEnter(item) {
    if (this.onKeyListeners[item.id]) {
      return;
    }

    this.onKeyListeners[item.id] = (onKeyEvent) => {
      this.onKeyAction(item, onKeyEvent);
    };

    $(document).on("keydown.plot-action", this.onKeyListeners[item.id]);
  }

  onMouseLeave(item) {
    const keyListener = this.onKeyListeners[item.id];

    if (keyListener) {
      delete this.onKeyListeners[item.id];

      $(document).off("keydown.plot-action", keyListener);
    }
  }

  onClickAction(event: MouseEvent) {
    const model = this.scope.stdmodel;

    for (let i = 0; i < model.data.length; i++) {
      this.runClickAction(event, model.data[i]);
    }
  }

  runClickAction(event, item) {
    if (
      !item.hasClickAction
      || (item.id !== event.id && event.id.indexOf(item.id + "_") !== 0)
    ) {
      return;
    }

    if (!_.isEmpty(item.clickTag)) {
      return this.sendOnClickTagAction(event, item);
    }

    this.runOnClickAction(event, item)
  }

  sendOnClickTagAction(event, item) {
    const plotIndex = this.scope.stdmodel.plotIndex;

    if (this.scope.model.setActionDetails) {
      return this.scope.model.setActionDetails(plotIndex, item, event);
    }

    const plotId = this.scope.stdmodel.plotId;
    const params = PlotUtils.getActionObject(this.scope.model.getCellModel().type, event);

    params.actionType = 'onclick';
    params.tag = item.clickTag;

    this.scope.plotDisplayModel.send({
      event: 'actiondetails',
      plotId: plotId,
      itemId: item.uid,
      params: params
    }, this.scope.plotDisplayView.callbacks());
  }

  runOnClickAction(event, item) {
    const plotId = this.scope.stdmodel.plotId;
    const plotIndex = this.scope.stdmodel.plotIndex;

    this.scope.legendDone = false;
    this.scope.legendResetPosition = true;
    this.scope.doNotLoadState = true;

    if (this.scope.model.onClick) {
      return this.scope.model.onClick(plotIndex, item, event);
    }

    this.scope.plotDisplayModel.send({
      event: 'onclick',
      plotId: plotId,
      itemId: item.uid,
      params: PlotUtils.getActionObject(this.scope.model.getCellModel().type, event)
    }, this.scope.plotDisplayView.callbacks());
  }

  onKeyAction(item, onKeyEvent) {
    const key = PlotKeyboardUtils.getKeyCodeConstant(onKeyEvent.keyCode);

    for (let i = 0; i < this.scope.stdmodel.data.length; i++) {
      const data = this.scope.stdmodel.data[i];

      if (data.id !== item.id && item.id.indexOf(data.id + "_") !== 0) {
        continue;
      }

      if (data.keyTags != null && !_.isEmpty(data.keyTags[key])) {
        return this.sendOnKeyTagAction(key, data, item);
      }

      this.runOnKeyAction(key, data, item);
    }
  }

  sendOnKeyTagAction(key, data, item) {
    const plotIndex = this.scope.stdmodel.plotIndex;

    if (this.scope.model.setActionDetails) {
      this.scope.model.setActionDetails(plotIndex, data, item).then(
        () => {
          // TODO where and when did that method vanish?
          // PlotUtils.evaluateTagCell(data.keyTags[key]);
        },
        () => { console.error('set action details error'); } );

      return
    }

    const plotId = this.scope.stdmodel.plotId;
    const params = PlotUtils.getActionObject(this.scope.model.getCellModel().type, item);

    params.actionType = 'onkey';
    params.key = key;
    params.tag = data.keyTags[key];

    this.scope.plotDisplayModel.send({
      event: 'actiondetails',
      plotId: plotId,
      itemId: data.uid,
      params: params
    }, this.scope.plotDisplayView.callbacks());
  }

  runOnKeyAction(key, data, item) {
    if (data.keys == null || data.keys.indexOf(key) === -1) {
      return;
    }

    const plotIndex = this.scope.stdmodel.plotIndex;

    this.scope.legendDone = false;
    this.scope.legendResetPosition = true;
    this.scope.doNotLoadState = true;

    if (this.scope.model.onKey) {
      return this.scope.model.onKey(key, plotIndex, data, item);
    }

    const params = PlotUtils.getActionObject(this.scope.model.getCellModel().type, item);
    params.key = key;

    this.scope.plotDisplayModel.send(
      {
        event: 'onkey',
        plotId: this.scope.stdmodel.plotId,
        itemId: data.uid,
        params: params
      },
      this.scope.plotDisplayView.callbacks()
    );
  }

  removeOnKeyListeners() {
    for (let listener in this.onKeyListeners) {
      if (this.onKeyListeners.hasOwnProperty(listener)) {
        $(document).off("keydown.plot-action", this.onKeyListeners[listener]);
      }
    }

    this.onKeyListeners = {};
  }

  bindTooltipEvents() {
    this.scope.svg.selectAll(".plot-resp")
      .on('mouseenter', this.onMouseEnterTooltip)
      .on('mousemove', this.onMouseMoveTooltip)
      .on("mouseleave", this.onMouseLeaveTooltip)
      .on("click.resp", this.onClickrespTooltip);
  }

  onMouseEnterTooltip(d) {
    d3.event.stopPropagation();

    this.scope.plotLegend.drawLegendPointer(d);

    return plotTip.tooltip(this.scope, d, d3.mouse(this.scope.svg.node()));
  }

  onMouseMoveTooltip(d) {
    d3.event.stopPropagation();

    this.scope.plotLegend.removeLegendPointer();
    this.scope.plotLegend.drawLegendPointer(d);
    this.scope.tipmoving = true;

    this.tipTimeout && clearTimeout(this.tipTimeout);
    this.tipTimeout = setTimeout(() => {
      this.scope.tipmoving = false;
    }, 50);

    plotTip.movetooltip(this.scope, d, d3.mouse(this.scope.svg.node()));
  }

  onMouseLeaveTooltip(d) {
    d3.event.stopPropagation();

    this.scope.plotLegend.removeLegendPointer();

    return plotTip.untooltip(this.scope, d);
  }

  onClickrespTooltip(d) {
    const model = this.scope.stdmodel;
    let hasClickAction;

    for (let i = 0; i < model.data.length; i++) {
      let item = model.data[i];

      if(item.hasClickAction === true && (item.id === d.id || d.id.indexOf(item.id + "_") === 0)) {
        hasClickAction = true;

        break;
      }
    }

    return !hasClickAction && plotTip.toggleTooltip(this.scope, d);
  }

  toggleVisibility(e) {
    const id = e.target.id.split("_")[1];
    const data = this.scope.stdmodel.data;
    // id in the format "legendcheck_id"

    if (id == "all") {
      return this.toggleAllLines(data);
    }

    this.toggleLine(data, id);
    this.updateShowAllLines();
    this.scope.plotRange.calcRange();
    this.scope.update();
  }

  toggleAllLines(data) {
    this.scope.showAllItems = this.findLegendCheckAllElement().prop("checked");

    for (let lineId in this.scope.legendMergedLines) {
      this.toggleLine(data, lineId, this.scope.showAllItems);

      this.scope.jqlegendcontainer
        .find("#legendcheck_" + lineId)
        .prop("checked", this.scope.legendMergedLines[lineId].showItem);
    }

    this.scope.plotRange.calcRange();
    this.scope.update();
  }

  toggleLine(data, lineId, showItem: boolean = null) {
    if (!this.scope.legendMergedLines.hasOwnProperty(lineId)) {
      return;
    }

    const line = this.scope.legendMergedLines[lineId];
    line.showItem = null === showItem ? !line.showItem : showItem;

    for (let i = 0; i < line.dataIds.length; i++) {
      let item = data[line.dataIds[i]];
      item.showItem = line.showItem;

      if (item.showItem === false) {
        item.hideTips(this.scope, true);

        if (item.isLodItem === true) {
          item.lodOn = false;
        }
      } else {
        item.hideTips(this.scope, false);
      }
    }

    if (line.showItem === false) {
      if (line.isLodItem === true) {
        this.scope.setMergedLodHint(line.lodDataIds, lineId);
      }
    }
  }

  updateShowAllLines(): void {
    this.scope.showAllLines = this.calculateShowAllLines();
    this.findLegendCheckAllElement()
      .prop("checked", this.scope.showAllLines);
  }

  calculateShowAllLines(): boolean {
    return Object.entries(this.scope.legendMergedLines)
      .reduce((total, pair) => {
        const [key, value] = pair;
        // @ts-ignore
        return total && value.showItem;
      }, true);
  }

  findLegendCheckAllElement(): JQuery<HTMLElement> {
    return this.scope.jqlegendcontainer.find("[id^=legendcheck_all]");
  }
}
