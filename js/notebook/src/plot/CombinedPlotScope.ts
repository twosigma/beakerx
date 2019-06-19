/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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

import * as _ from "underscore";
import * as $ from "jquery";
import PlotLayout from "./PlotLayout";
import CombinedPlotModel from "./models/CombinedPlotModel";
import PlotScope from './PlotScope';
import CombinedPlotScopeUtils from './combinedPlotScopeUtils';
import PlotFocus from './zoom/PlotFocus';
import ContextMenu from './contextMenu/plotContextMenu';
import { GistPublisherUtils } from "../GistPublisherUtils";

import "jquery-ui/ui/widgets/resizable";
import CommonUtils from "beakerx_shared/lib/utils/CommonUtils";
import PlotUtils from "./utils/PlotUtils";
import PlotStyleUtils from "beakerx_shared/lib/utils/PlotStyleUtils";
import CombinedPlotFormatter from "./CombinedPlotFormatter";

const bkoChartExtender = require('./chartExtender');


export default class CombinedPlotScope {
  wrapperId: string;
  id: string = null;
  childScopeNo: number = 1;
  scopes: any[] = [];
  saveAsMenuContainer = null;
  plotFocus: PlotFocus;
  stdmodel: any;
  width: number;
  prefs: any;
  element: JQuery<HTMLElement>;
  models: any[] = [];
  plotDisplayView: any;
  childScopeNumber: number;
  contextMenu: any;
  canvas: HTMLCanvasElement;

  model: {
    model: any,
    getCellModel: () => any,
    getDumpState?: () => any,
    setDumpState?: (state: any) => any
  };

  constructor(wrapperId) {
    this.wrapperId = wrapperId;
    this.id = null;
    this.childScopeNo = 1;
    this.scopes = [];
    this.saveAsMenuContainer = null;
    this.plotFocus = new PlotFocus(this);

    this.model = {
      model: {},
      getCellModel: function() {
        return this.model;
      }
    };
  }

  initLayout() {
    if (this.stdmodel.title == null) {
      return;
    }

    this.element.find("#combplotTitle")
      .text(this.stdmodel.title)
      .css("width", this.width || this.stdmodel.plotSize.width);
  }

  standardizeData() {
    const model = this.model.getCellModel();

    this.stdmodel = CombinedPlotFormatter.standardizeModel(model, this.prefs);

    model.saveAsSvg = () => this.saveAsSvg();
    model.saveAsPng = () => this.saveAsPng();
  }

  preparePlotModels() {
    if (this.models.length) {
      return;
    }
    const plots = this.stdmodel.plots;

    // create a plot model and a saved state for each plot
    for (let i = 0; i < plots.length; i++) {
      let plotmodel = plots[i];

      plotmodel.xAxis.showGridlineLabels = this.model.getCellModel().x_tickLabels_visible;
      plotmodel.yAxis.showGridlineLabels = this.model.getCellModel().y_tickLabels_visible;
      plotmodel.plotIndex = i;

      this.models.push(new CombinedPlotModel(plotmodel, this));
    }
  }

  sendEvent(eventName, plotId, itemId, params) {
    this.plotDisplayView.model.send({
      event: eventName,
      plotId: plotId,
      itemId: itemId,
      params: params
    }, this.plotDisplayView.model.callbacks(this.plotDisplayView));
  }

  updateModelData(data) {
    if (this.model && this.model.model && data) {
      this.model.model = _.extend(this.model.model, data);
    }
  }

  updatePlot() {
    this.resetChildScopes();

    this.standardizeData();
    this.preparePlotModels();
    this.initLayout();
    this.calcRange();
    this.runChildCharts();
  }

  resetChildScopes() {
    this.element.find('.combplot-plotcontainer').empty();
    this.scopes = [];
    this.childScopeNumber = 1;
  }

  calcRange(): { xl: number, xr: number } {
    let xl = 1E100;
    let xr = 0;
    const plots = this.stdmodel.plots;

    for (let i = 0; i < plots.length; i++) {
      let plotmodel = plots[i]; // models are already standardized at this point
      let ret = PlotFocus.getDefault(plotmodel);

      this.plotFocus.setDefault(ret.defaultFocus);

      xl = Math.min(xl, ret.defaultFocus.xl);
      xr = Math.max(xr, ret.defaultFocus.xr);
    }

    return { xl, xr };
  }

  dumpState() {
    let ret = {
      focus: this.plotFocus.getFocus(),
      width: this.width,
      subplots: []
    };

    for (let i = 0; i < this.models.length; i++) {
      ret.subplots.push(this.models[i].state);
    }

    return ret;
  }

  getMinScopesWidth() {
    return Math.min.apply(
      null,
      this.scopes
        .map(scope => scope.width)
        .filter(width => !!width)
    );
  }

  doDestroy() {
    this.contextMenu && this.contextMenu.destroy();
  }

  init() {
    this.canvas = <HTMLCanvasElement>this.element.find("canvas")[0];
    this.canvas.style.display = "none";

    this.id = `bko-plot-${CommonUtils.generateId(6)}`;
    this.element.find('.combplot-plotcontainer').attr('id', this.id);
    this.element.find('.plot-title').attr('class', `plot-title plot-title-${this.id}`);
    this.saveAsMenuContainer = $(`#${this.id}`);
    this.contextMenu = new ContextMenu(this);

    this.standardizeData();
    this.preparePlotModels();
    this.initLayout();
    this.calcRange();
    this.runChildCharts();
    this.restoreState();
  }

  restoreState() {
    if (!this.model.getDumpState) {
      return;
    }

    const savedstate = this.model.getDumpState();

    if (savedstate !== undefined && savedstate.subplots !== undefined) {
      for (let i = 0; i < this.models.length; i++) {
        this.models[i].state = savedstate.subplots[i];
      }

      this.width = savedstate.width;
      this.plotFocus.setFocus(savedstate.focus);

      return;
    }

    if (!this.models.length) {
      return;
    }

    this.plotFocus.setFocus(this.calcRange());

    for (let i = 0; i < this.models.length; i++) {
      this.models[i].state = { };
    }

    if (this.model.setDumpState !== undefined) {
      this.model.setDumpState(this.dumpState());
    }
  }

  getCellModel() {
    return this.model.getCellModel();
  }

  getSvgToSave(): HTMLElement {
    const plots = this.stdmodel.plots;
    const combinedSvg = $("<svg></svg>")
      .attr('xmlns', 'http://www.w3.org/2000/svg')
      .attr('class', 'svg-export');

    if (document.body.classList.contains('improveFonts')) {
      combinedSvg.addClass('improveFonts');
    }

    const plotTitle = this.element.find("#combplotTitle");

    PlotUtils.addTitleToSvg(combinedSvg[0], plotTitle, {
      width: plotTitle.width(),
      height: PlotStyleUtils.getActualCss(plotTitle, "outerHeight")
    });

    let combinedSvgHeight = PlotStyleUtils.getActualCss(plotTitle, "outerHeight",  true);
    let combinedSvgWidth = 0;

    for (let i = 0; i < plots.length; i++) {
      let svg = plots[i].getSvgToSave();

      PlotUtils.translateChildren(svg, 0, combinedSvgHeight);
      combinedSvgHeight += parseInt(svg.getAttribute("height"));
      combinedSvgWidth = Math.max(parseInt(svg.getAttribute("width")), combinedSvgWidth);
      combinedSvg.append(svg.children);
    }

    combinedSvg.attr("width", combinedSvgWidth);
    combinedSvg.attr("height", combinedSvgHeight);

    return combinedSvg[0];
  }

  saveAsSvg() {
    const svgToSave = this.getSvgToSave();

    PlotUtils.addInlineFonts(svgToSave);

    const html = PlotStyleUtils.convertToXHTML(svgToSave.outerHTML);
    const fileName = _.isEmpty(this.stdmodel.title) ? 'combinedplot' : this.stdmodel.title;

    PlotUtils.download(
      `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(html)))}`,
      `${fileName}.svg`
    );
  }

  saveAsPng(scale?) {
    const svg = this.getSvgToSave();
    PlotUtils.addInlineFonts(svg);

    scale = scale === undefined ? 1 : scale;

    this.canvas.width = Number(svg.getAttribute("width")) * scale;
    this.canvas.height = Number(svg.getAttribute("height")) * scale;

    const html = PlotStyleUtils.convertToXHTML(svg.outerHTML);
    const imgsrc = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(html)));
    const fileName = _.isEmpty(this.stdmodel.title) ? 'combinedplot' : this.stdmodel.title;

    PlotUtils.drawPng(this.canvas, imgsrc, `${fileName}.png`);
  }

  publish() {
    GistPublisherUtils.publishScope(this);
  }

  updateModels(updateType) {
    this.scopes.forEach((scope) => {
      if (updateType === 'focus') {
        scope.plotFocus.onModelFocusUpdate(this.plotFocus.getFocus());
      } else if (updateType === 'width') {
        scope.plotSize.updateModelWidth(this.width);
      }
    });
  }

  setModelData(data) {
    // TODO quick hack -> standardize all input data
    if (data.getCellModel) {
      this.model = data;
    } else {
      this.model.model = data;
    }

    if (this.model.getCellModel().type === "TreeMap"){
      bkoChartExtender.extend(this, this.element);
    }
  }

  setWidgetView(plotDisplayView) {
    this.plotDisplayView = plotDisplayView;
  }

  setElement(el) {
    this.element = el;
  }

  buildTemplate() {
    return `
      <div id='${this.wrapperId}'>
        <canvas></canvas>
        <div id='combplotTitle' class='plot-title'></div>
        <div class='combplot-plotcontainer'></div>
      </div>
    `;
  }

  runChildCharts() {
    this.models.forEach(this.runChildChart.bind(this));

    CombinedPlotScopeUtils.adjustLayoutMargin(this.scopes);
  }

  runChildChart(model) {
    const childId = `${this.wrapperId}_child${this.childScopeNo}`;
    const currentScope = new PlotScope(childId);

    this.scopes.push(currentScope);

    const tmpl = PlotLayout.buildTemplate(currentScope);
    const tmplElement = $(tmpl);
    const container = this.element.children('.combplot-plotcontainer');

    tmplElement.appendTo(container);

    currentScope.setModelData(model);
    currentScope.setElement(tmplElement.children('.dtcontainer'));
    currentScope.init();

    this.childScopeNo++;
  }
}
