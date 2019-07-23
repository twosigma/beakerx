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

var BeakerXPageObject = require('../beakerx.po.js');
var beakerxPO;

describe('Testing of Plot (python)', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/python/PlotPythonTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  describe('Plot (python)', function () {
    it('Plot has Title and Axes Labels', function () {
      var dtContainer = beakerxPO.runCellToGetDtContainer(0);
      expect(dtContainer.$('#plotTitle').getText()).toEqual('test title');
      expect(dtContainer.$('#xlabel').getText()).toEqual('x label');
      expect(dtContainer.$('#ylabel').getText()).toEqual('y label');
    });

    it('Plot has 3 Bars', function () {
      var svgElement = beakerxPO.runCellToGetSvgElement(1);
      expect(svgElement.$('g.plot-bar').isDisplayed()).toBeTruthy();
      expect(svgElement.$$('rect.plot-resp').length).toEqual(3);
    });

    it('Plot has Line', function () {
      var svgElement = beakerxPO.runCellToGetSvgElement(2);
      expect(svgElement.$$('circle.plot-resp').length).toEqual(3);
      expect(svgElement.$('path.plot-line').isDisplayed()).toBeTruthy();
    });

    it('Plot has 5 Points', function () {
      var svgElement = beakerxPO.runCellToGetSvgElement(3);
      expect(svgElement.$('g.plot-point').isDisplayed()).toBeTruthy();
      expect(svgElement.$$('polygon.plot-resp').length).toEqual(5);
    });

    it('Plot has 4 Stems', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(4);
      expect(svgElement.$('g.plot-stem').isDisplayed()).toBeTruthy();
      expect(svgElement.$$('line.plot-resp.normal').length).toEqual(4);
    });

    it('Plot has Crosshair', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(5);
      beakerxPO.performMouseMove(svgElement.$('g#maing'), 100, 100);
      var dtcontainer = beakerxPO.getDtContainerByIndex(5);
      expect(dtcontainer.$('div#cursor_xlabel').isDisplayed()).toBeTruthy();
      expect(dtcontainer.$('div#cursor_ylabel').isDisplayed()).toBeTruthy();
    });

    it('Plot has Area', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(5);
      expect(svgElement.$('polygon.plot-area').isDisplayed()).toBeTruthy();
    });

    it('Plot has 3 ConstantLines', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(6);
      expect(svgElement.$$('g.plot-constline').length).toEqual(2);
      expect(svgElement.$$('g.plot-constline > line').length).toEqual(3)
    });

    it('Plot has 2 ConstantBands', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(7);
      expect(svgElement.$('g.plot-constband').isDisplayed()).toBeTruthy();
      expect(svgElement.$$('g.plot-constband > rect').length).toEqual(2);
    });

    it('Plot has 4 text elements', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(8);
      expect(svgElement.$$('g.plot-text').length).toEqual(4);
      expect(svgElement.$$('g.plot-text > line').length).toEqual(4);
      expect(svgElement.$('text#i1_0').getText()).toEqual('test');
    });
  });

  describe('Pandas library', function () {
    it('Plot has Bars', function () {
      var svgElement = beakerxPO.runCellToGetSvgElement(9);
      expect(svgElement.$('g.plot-bar').isDisplayed()).toBeTruthy();
      expect(svgElement.$$('rect.plot-resp').length).toBeGreaterThan(0);
    });

    it('Plot has Line', function () {
      var svgElement = beakerxPO.runCellToGetSvgElement(10);
      expect(svgElement.$$('circle.plot-resp').length).toEqual(7);
      expect(svgElement.$('path.plot-line').isDisplayed()).toBeTruthy();
    });
  });

  describe('Plot Stacking', function(){
    it('Plot has 2 Areas', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(11);
      expect(svgElement.$$('g > polygon.plot-area').length).toEqual(2);
      expect(svgElement.$('rect#i0_0').getLocation('y')).toBeGreaterThan(svgElement.$('rect#i1_0').getLocation('y'));
      expect(svgElement.$('rect#i0_0').getLocation('x')).toBe(svgElement.$('rect#i1_0').getLocation('x'));
    });
  });

  describe('Simple Time Plot', function(){
    it('Time Plot has 2 lines and time axis', function(){
      beakerxPO.kernelIdleIcon.waitForEnabled();
      var svgElement = beakerxPO.runCellToGetSvgElement(12);
      expect(svgElement.$$('g#i0 > circle').length).toBeGreaterThan(0);
      expect(svgElement.$$('g#i1 > circle').length).toBeGreaterThan(0);
      expect(svgElement.$('g#i0 > path.plot-line').isDisplayed()).toBeTruthy();
      expect(svgElement.$('g#i1 > path.plot-line').isDisplayed()).toBeTruthy();
      expect(svgElement.$('text#label_x_0').getText()).toEqual('1990');
    });

    it('Time Plot has millisecond resolution', function(){
      beakerxPO.kernelIdleIcon.waitForEnabled();
      var dtContainer = beakerxPO.runCellToGetDtContainer(13);
      var svgElement = dtContainer.$('#svgg');
      svgElement.$('rect#i0_0').click();
      var tipElement = dtContainer.$('div#tip_i0_0');
      expect(tipElement.getText()).toMatch('x: 2017 Oct 09 Mon, 05:26:41 .624');
    });

    it('Time Plot has nanosecond resolution', function(){
      beakerxPO.kernelIdleIcon.waitForEnabled();
      var dtContainer = beakerxPO.runCellToGetDtContainer(14);
      var svgElement = dtContainer.$('#svgg');
      svgElement.$('rect#i0_1').click();
      var tipElement = dtContainer.$('div#tip_i0_1');
      expect(tipElement.getText()).toMatch('x: 2017 Oct 09 Mon, 09:26:41.624000007');
    });
  });

  describe('Second Y Axis', function(){
    it('Plot has second Y Axis', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(15);
      expect(svgElement.$('text#yrlabel').getText()).toEqual('Test y axis');
      expect(svgElement.$('text#label_yr_0').getText()).toEqual('10');
      expect(svgElement.$('line#tick_yr_0').isEnabled()).toBeTruthy();
    });
  });

  function getCircleAttr(elem, index, attribute){
    return elem.$('circle#' + index).getAttribute(attribute)
  }

  function getMaingG(elem, index){
    return elem.$$('div.dtcontainer')[index].$('g#i0');
  }

  describe('Logarithmic Scale', function(){
    var combPlot;

    it('Combined plot has 3 plots', function(){
      combPlot = beakerxPO.runCodeCellByIndex(16).$('div.combplot-plotcontainer');
      expect(combPlot.isDisplayed()).toBeTruthy();
      expect(combPlot.$$('div.dtcontainer').length).toEqual(3);
    });

    it('Second plot has Log Y axis', function(){
      var g0 = getMaingG(combPlot, 0);
      var g1 = getMaingG(combPlot, 1);
      expect(getCircleAttr(g0, 'i0_0', 'cy')).toBe(getCircleAttr(g1, 'i0_0', 'cy'));
      expect(getCircleAttr(g0, 'i0_50', 'cy')).toBeGreaterThan(getCircleAttr(g1, 'i0_50', 'cy'));
    });

    it('Third plot has Log X axis', function(){
      var g0 = getMaingG(combPlot, 0);
      var g2 = getMaingG(combPlot, 2);
      expect(getCircleAttr(g0, 'i0_0', 'cx')).toBe(getCircleAttr(g2, 'i0_0', 'cx'));
      expect(getCircleAttr(g0, 'i0_50', 'cx')).toBeLessThan(getCircleAttr(g2, 'i0_50', 'cx'));
    });
  });


});