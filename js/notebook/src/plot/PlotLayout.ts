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
import sanitize from './plotSanitize';

const plotUtils = require('../../plotUtils');

const DEFAULT_MARGIN = 30;

export default class PlotLayout {
  scope: any;
  element: HTMLElement;
  intervalStepHint: { x: number, y: number };
  container: any;
  svg: SVGElement;
  canvas: HTMLCanvasElement;
  jqsvg: JQuery<HTMLElement>;
  jqcontainer: JQuery<HTMLElement>;
  jqlegendcontainer: JQuery<HTMLElement>;
  jqplottitle: JQuery<HTMLElement>;
  jqgridg: JQuery<HTMLElement>;

  labelPadding: { x: number, y: number } = { x: 10, y: 10 };
  plotSize: { width?: string, height?: string };
  bottomLayoutMargin: number = DEFAULT_MARGIN;
  topLayoutMargin: number = DEFAULT_MARGIN;
  leftLayoutMargin: number;
  rightLayoutMargin: number;
  legendMargin: number = 10;
  legendBoxSize: number = 10;
  legendResetPosition: boolean = true;

  maing: d3.Selection<SVGGElement, any, HTMLElement, any>;
  gridg: d3.Selection<SVGGElement, any, HTMLElement, any>;
  labelg: d3.Selection<SVGGElement, any, HTMLElement, any>;

  constructor(scope) {
    this.scope = scope;
    this.element = scope.element[0];
    this.scope.renderFixed = 1;
    this.scope.cursor = { x : -1, y : -1 };

    this.assignElements();
    this.init();
  }

  init() {
    const stdmodel = this.scope.stdmodel;

    this.setPlotSize(stdmodel);
    this.applyCssRules();
    this.applyCustomStyles(stdmodel);
    this.setTitle(stdmodel);
    this.applyElementStyles(stdmodel);
    this.setIntervals(stdmodel);
    this.setMargins(stdmodel);
    this.bindEvents();
  }

  assignElements() {
    this.container = d3.select(this.scope.element[0]).select(".plot-plotcontainer");
    this.jqcontainer = this.scope.element.find(".plot-plotcontainer");
    this.jqlegendcontainer = this.scope.element.find("#plotLegendContainer");
    this.svg = this.container.select("svg");
    this.jqsvg = this.scope.element.find("#svgg");
    this.canvas = this.scope.element.find("canvas")[0];
    this.jqplottitle = this.scope.element.find("#plotTitle");
    this.jqgridg = this.scope.element.find("#gridg");
    this.maing = d3.select(this.scope.element[0]).select("#maing");
    this.gridg = d3.select(this.scope.element[0]).select("#gridg");
    this.labelg = d3.select(this.scope.element[0]).select("#labelg");
  }

  setPlotSize(stdmodel) {
    this.plotSize = stdmodel.plotSize ? { ...stdmodel.plotSize } : {};
  }

  applyCssRules() {
    this.jqcontainer.css(this.plotSize);
    this.jqsvg.css(this.plotSize);

    this.scope.element.find(".ui-icon-gripsmall-diagonal-se")
      .removeClass("ui-icon-gripsmall-diagonal-se")
      .addClass("ui-icon-grip-diagonal-se");
    this.canvas.style.display = "none";
  }

  setTitle(stdmodel) {
    this.jqplottitle.text(stdmodel.title).css("width", this.plotSize.width);
  }

  applyCustomStyles(stdmodel) {
    if (!stdmodel.customStyles) {
      return;
    }

    const customStyleString = stdmodel.customStyles.map(
      (s) => `#${this.scope.wrapperId} #${this.scope.id} ${s}`
    ).join('\n');

    // this string needs to be sanitized
    $(`<style>${sanitize(customStyleString)}</style>`)
      .prependTo(this.scope.element.find('.plot-plotcontainer'));
  }

  applyElementStyles(stdmodel) {
    if(stdmodel['elementStyles']) {
      return;
    }

    const styles = [];

    for(let style in stdmodel['elementStyles']) {
      styles.push(`#${this.scope.wrapperId} #${this.scope.id} ${style} { ${stdmodel['elementStyles'][style]} }`);
    }

    $(`<style>\n${sanitize(styles.join('\n'))}\n</style>`)
      .prependTo(this.scope.element.find('.plot-plotcontainer'));

    this.applyTitleElementStyles(stdmodel);
  }

  private applyTitleElementStyles(stdmodel) {
    // Title style has to be handlded separately because it sits in a separate
    // div outside the hierachy the rest of the plot is in
    if(!stdmodel['elementStyles']['.plot-title']) {
      return;
    }

    const styleString = `.plot-title-${this.scope.id} {
      ${stdmodel['elementStyles']['.plot-title']}
    }`;

    $(`<style>\n${sanitize(styleString)}\n</style>`)
      .prependTo(this.scope.element.find(`.plot-title-${this.scope.id}`));
  }

  calcVertLayoutMargin(axis) {
    let result = 0;
    let MIN_LEFT_MARGIN = 80;
    let MIN_WIDTH = 300;

    if (axis && axis.axisType === 'linear') {
      let l = axis.axisValL.toFixed(axis.axisFixed) + '';
      let r = axis.axisValR.toFixed(axis.axisFixed) + '';

      let m = l.length > r.length ? l : r;
      let size = this.measureText(m, 13);

      result = size.width + size.height * 2;
    }

    if (
      this.jqcontainer
      && this.jqcontainer.width() > MIN_WIDTH && result < MIN_LEFT_MARGIN
    ) {
      return MIN_LEFT_MARGIN;
    }

    return result;
  }

  measureText(pText, pFontSize) {
    let lDiv: HTMLElement = document.createElement('lDiv');

    lDiv.style.fontSize = `${pFontSize}px`;
    lDiv.style.position = "absolute";
    lDiv.style.left = '-1000';
    lDiv.style.top = '-1000';

    lDiv.innerHTML = pText;

    document.body.appendChild(lDiv);

    let lResult = {
      width: lDiv.clientWidth,
      height: lDiv.clientHeight
    };

    document.body.removeChild(lDiv);
    lDiv = null;

    return lResult;
  }

  setIntervals(stdmodel) {
    const isHorizontal = stdmodel.orientation === 'HORIZONTAL';
    const axisXValue = this.scope.model.getCellModel().type === 'NanoPlot' ? 130 : 75;

    this.intervalStepHint = {
      x : isHorizontal ? 30 : axisXValue,
      y : isHorizontal ? axisXValue : 30
    };

    this.scope.numIntervals = {
      x: parseInt(this.plotSize.width) / this.scope.intervalStepHint.x,
      y: parseInt(this.plotSize.height) / this.scope.intervalStepHint.y
    };
  }

  setMargins(stdmodel) {
    let factor = 2.0;

    if (stdmodel.xAxis.label == null) {
      factor -= 1.0;
    }

    if (stdmodel.xAxis.showGridlineLabels === false) {
      factor -= 1.0;
    }

    this.leftLayoutMargin = this.calcVertLayoutMargin(stdmodel.yAxis);
    this.rightLayoutMargin = stdmodel.yAxisR
      ? this.calcVertLayoutMargin(stdmodel.yAxisR)
      : DEFAULT_MARGIN;

    this.scope.plotZoom.boxZoom.resetLocateBox();
    this.bottomLayoutMargin += plotUtils.fonts.labelHeight * factor;

    if (stdmodel.yAxis.showGridlineLabels !== false) {
      this.topLayoutMargin += plotUtils.fonts.labelHeight / 2;
    }

    if (stdmodel.yAxis.label != null) {
      this.leftLayoutMargin += plotUtils.fonts.labelHeight;
    }

    if(stdmodel.yAxisR != null) {
      this.rightLayoutMargin += plotUtils.fonts.labelHeight;
    }
  }

  bindEvents() {
    $(window).resize(this.scope.resizeFunction);

    this.jqcontainer.on('resize', (e, ui) => {
      e.stopPropagation();
      e.preventDefault();

      this.scope.updateModelWidth();
    });
  }
}
