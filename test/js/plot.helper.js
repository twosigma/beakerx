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

var PlotHelperObject = function () {

  this.getPlotTitle = function (dtContainer) {
    return dtContainer.$('#plotTitle');
  };

  this.checkPlotTitle = function (dtContainer, textValue) {
    expect(this.getPlotTitle(dtContainer).getText()).toEqual(textValue);
  };

  this.getXLabel = function (dtContainer) {
    return dtContainer.$('#xlabel');
  };

  this.checkXLabel = function (dtContainer, textValue) {
    expect(this.getXLabel(dtContainer).getText()).toEqual(textValue);
  };

  this.getYLabel = function (dtContainer) {
    return dtContainer.$('#ylabel');
  };

  this.checkYLabel = function (dtContainer, textValue) {
    expect(this.getYLabel(dtContainer).getText()).toEqual(textValue);
  };



  this.getAllGStemLines = function (svgElement, indexG) {
    return svgElement.$('g#i' + indexG + '.plot-stem').$$('line.plot-resp.normal');
  };

  this.getStemByGAndLineIndexes = function (svgElement, indexG, indexLine) {
    return this.getAllGStemLines(svgElement, indexG)[indexLine];
  };

  this.getAllGBarRects = function (svgElement, indexG) {
    return svgElement.$('g#i' + indexG + '.plot-bar').$$('rect.plot-resp');
  };

  this.getBarByGAndRectIndexes = function (svgElement, indexG, indexRect) {
    return this.getAllGBarRects(svgElement, indexG)[indexRect];
  };

  this.getGPointByGIndex = function (svgElement, indexG) {
    return svgElement.$('g#i' + indexG + '.plot-point');
  };


  this.getAllPointsByGIndexAndType = function (svgElement, indexG, type) {
    return this.getGPointByGIndex(svgElement, indexG).$$('g#' + type + ' > ' + type);
  };

  this.getAllPointsByGIndexAndMultipleTypes = function (svgElement, indexG, type, subtype) {
    return this.getGPointByGIndex(svgElement, indexG).$$('g#' + type + ' > ' + subtype);
  };

  this.getAllConstLines = function (svgElement) {
    return svgElement.$$('g.plot-constline > line');
  };

  this.getAllTexts = function (svgElement) {
    return svgElement.$$('g.plot-text > text');
  };

  this.getAllRasters = function (svgElement) {
    return svgElement.$$('g.plot-raster > image');
  };

  this.getAllAreas = function (svgElement) {
    return svgElement.$$('g > polygon.plot-area');
  };

  this.getAllConstBands = function (svgElement) {
    return svgElement.$$('g.plot-constband > rect');
  };

  this.getAllLines = function (svgElement) {
    return svgElement.$$('g > path.plot-line');
  };

  this.getLineByGIndex = function (svgElement, indexG) {
    return svgElement.$('g#i' + indexG + ' > path.plot-line');
  };

};
module.exports = PlotHelperObject;