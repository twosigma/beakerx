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
    beakerxPO.runNotebookByUrl('/notebooks/test/notebooks/python/PlotPythonTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  describe('Plot (python)', function () {
    it('Plot has Title and Axes Labels', function () {
      var dtContainer = beakerxPO.runCellToGetDtContainer(0);
      dtContainer.waitForEnabled();
      expect(dtContainer.$('#plotTitle').getText()).toEqual('test title');
      expect(dtContainer.$('#xlabel').getText()).toEqual('x label');
      expect(dtContainer.$('#ylabel').getText()).toEqual('y label');
    });

    it('Plot has 3 Bars', function () {
      var svgElement = beakerxPO.runCellToGetSvgElement(1);
      svgElement.waitForEnabled();
      expect(svgElement.$('g.plot-bar').isVisible()).toBeTruthy();
      expect(svgElement.$$('rect.plot-resp').length).toEqual(3);
    });

    it('Plot has Line', function () {
      var svgElement = beakerxPO.runCellToGetSvgElement(2);
      svgElement.waitForEnabled();
      expect(svgElement.$$('circle.plot-resp').length).toEqual(3);
      expect(svgElement.$('path.plot-line').isVisible()).toBeTruthy();
    });

    it('Plot has 5 Points', function () {
      var svgElement = beakerxPO.runCellToGetSvgElement(3);
      svgElement.waitForEnabled();
      expect(svgElement.$('g.plot-point').isVisible()).toBeTruthy();
      expect(svgElement.$$('polygon.plot-resp').length).toEqual(5);
    });

    it('Plot has 4 Stems', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(4);
      svgElement.waitForEnabled();
      expect(svgElement.$('g.plot-stem').isVisible()).toBeTruthy();
      expect(svgElement.$$('line.plot-resp.normal').length).toEqual(4);
    });

    it('Plot has Area', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(5);
      svgElement.waitForEnabled();
      expect(svgElement.$('polygon.plot-area').isVisible()).toBeTruthy();
    });

    it('Plot has Crosshair', function(){
      var svgElement = beakerxPO.getCodeCellByIndex(5).$('#svgg');
      svgElement.waitForEnabled();
      var rectElement = svgElement.$('rect#i0_0');
      rectElement.scroll();
      rectElement.click();
      expect(svgElement.$('#cursor_xlabel').isVisible()).toBeTruthy();
      expect(svgElement.$('#cursor_ylabel').isVisible()).toBeTruthy();
    });

    it('Plot has 3 ConstantLines', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(6);
      svgElement.waitForEnabled();
      expect(svgElement.$$('g.plot-constline').length).toEqual(2);
      expect(svgElement.$$('g.plot-constline > line').length).toEqual(3)
    });

    it('Plot has 2 ConstantBands', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(7);
      svgElement.waitForEnabled();
      expect(svgElement.$('g.plot-constband').isVisible()).toBeTruthy();
      expect(svgElement.$$('g.plot-constband > rect').length).toEqual(2);
    });

    it('Plot has 4 text elements', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(8);
      svgElement.waitForEnabled();
      expect(svgElement.$$('g.plot-text').length).toEqual(4);
      expect(svgElement.$$('g.plot-text > line').length).toEqual(4);
      expect(svgElement.$('text#i1_0').getText()).toEqual('test');
    });
  });

  describe('Pandas library', function () {
    it('Plot has over 300 Bars', function () {
      var svgElement = beakerxPO.runCellToGetSvgElement(9);
      svgElement.waitForEnabled();
      expect(svgElement.$('g.plot-bar').isVisible()).toBeTruthy();
      expect(svgElement.$$('rect.plot-resp').length).toBeGreaterThan(300);
    });

    it('Plot has Line', function () {
      var svgElement = beakerxPO.runCellToGetSvgElement(10);
      svgElement.waitForEnabled();
      expect(svgElement.$$('circle.plot-resp').length).toEqual(7);
      expect(svgElement.$('path.plot-line').isVisible()).toBeTruthy();
    });
  });

  describe('Stacking', function(){
    it('Plot has 2 areas', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(11);
      svgElement.waitForEnabled();
      expect(svgElement.$$('g > polygon.plot-area').length).toEqual(2);
    });
  });

});