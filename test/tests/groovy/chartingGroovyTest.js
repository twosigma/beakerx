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

describe('Charting groovy tests', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/notebooks/test/notebooks/groovy/ChartingTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  describe('Histogram', function () {
    it('Widget area has dtcontainer', function () {
      beakerxPO.runCodeCellByIndex(0);
      var dtContainer = beakerxPO.runCellToGetDtContainer(1);
      dtContainer.$('#maing > g.plot-bar').waitForEnabled();
      expect(dtContainer.$('#maing > g.plot-bar').isEnabled()).toBeTruthy();
    });

    it('Histogram has Title and Axes Labels', function () {
      var dtContainer = beakerxPO.runCellToGetDtContainer(2);
      dtContainer.$('#plotTitle').waitForEnabled();
      expect(dtContainer.$('#plotTitle').getText()).toEqual('Wide Histogram with Manual Parameters');
      expect(dtContainer.$('#xlabel').getText()).toEqual('Size');
      expect(dtContainer.$('#ylabel').getText()).toEqual('Count');
    });

    it('Plot has two histograms (Overlap)', function () {
      var svgElement = beakerxPO.runCellToGetSvgElement(3);
      var g0 = svgElement.$('#maing > g#i0');
      var g1 = svgElement.$('#maing > g#i1');
      expect(g0.getCssProperty('fill').value).toEqual('rgb(0,154,166)');
      expect(g0.getCssProperty('fill-opacity').value).toEqual(1);
      expect(g1.getCssProperty('fill').value).toEqual('rgb(230,50,50)');
      expect(g1.getCssProperty('fill-opacity').value.toFixed(1)).toEqual('0.5');
      expect(g0.$$('rect').length).toEqual(25);
      expect(g1.$$('rect').length).toEqual(25);
    });

    it('Plot has two histograms (Stack)', function () {
      var svgElement = beakerxPO.runCellToGetSvgElement(4);
      var g0 = svgElement.$('#maing > g#i0');
      var g1 = svgElement.$('#maing > g#i1');
      expect(g0.$$('rect').length).toEqual(25);
      expect(g1.$$('rect').length).toEqual(25);
    });

    it('Plot has two histograms (Side by Side)', function () {
      var svgElement = beakerxPO.runCellToGetSvgElement(5);
      var g0 = svgElement.$('#maing > g#i0');
      var g1 = svgElement.$('#maing > g#i1');
      expect(g0.$$('rect').length).toEqual(25);
      expect(g1.$$('rect').length).toEqual(25);
    });

    it('Plot has Cumulative histogram', function () {
      var svgElement = beakerxPO.runCellToGetSvgElement(6);
      var g0 = svgElement.$('#maing > g#i0');
      expect(g0.$$('rect').length).toEqual(55);
    });

    it('Plot has Normed histogram', function () {
      var svgElement = beakerxPO.runCellToGetSvgElement(7);
      var g0 = svgElement.$('#maing > g#i0');
      expect(g0.$$('rect').length).toBeGreaterThan(1);
    });

    it('Plot has Log histogram', function () {
      var svgElement = beakerxPO.runCellToGetSvgElement(8);
      var g0 = svgElement.$('#maing > g#i0');
      expect(g0.$$('rect').length).toBeGreaterThan(1);
    });
  });

  describe('Heatmap', function () {
    it('Widget area has dtcontainer', function () {
      beakerxPO.runCodeCellByIndex(9);
      beakerxPO.kernelIdleIcon.waitForEnabled();
      var dtContainer = beakerxPO.runCellToGetDtContainer(10);
      expect(dtContainer.$('#maing > g.heatmap').isEnabled()).toBeTruthy();
    });

    var dtContainerLg;
    it('Heatmap has Title and Axes Labels', function () {
      dtContainerLg = beakerxPO.runCellToGetDtContainer(11);
      expect(dtContainerLg.$('#plotTitle').getText()).toEqual('Heatmap Second Example');
      expect(dtContainerLg.$('#xlabel').getText()).toEqual('X Label');
      expect(dtContainerLg.$('#ylabel').getText()).toEqual('Y Label');
      expect(dtContainerLg.$$('svg').length).toBe(2);
    });

    it('Top position for legend', function(){
      expect(dtContainerLg.getLocation('svg#svgg', 'y')).toBeGreaterThan(dtContainerLg.getLocation('svg#legends', 'y'));
    });

    it('Heatmap has gradient color', function () {
      var svgElement = beakerxPO.runCellToGetSvgElement(12);
      var rect0 = svgElement.$('rect#i0_0');
      expect(rect0.getCssProperty('fill').value).toEqual('rgb(45,185,0)');
    });

    it('Heatmap has custom gradient color', function () {
      var svgElement = beakerxPO.runCellToGetSvgElement(13);
      var rect0 = svgElement.$('rect#i0_0');
      expect(rect0.getCssProperty('fill').value).toEqual('rgb(93,93,0)');
    });

    it('Heatmap without legend', function () {
      var dtContainer = beakerxPO.runCellToGetDtContainer(14);
      dtContainer.$('#maing > g.heatmap').waitForEnabled();
      expect(dtContainer.$('#maing > g.heatmap').isEnabled()).toBeTruthy();
      expect(dtContainer.$$('svg').length).toBe(1);
    });
  });

  describe('Levels Of Detail', function () {
    it('Plot has two polygon elements', function () {
      beakerxPO.runCodeCellByIndex(15);
      var svgElement = beakerxPO.runCellToGetSvgElement(16);
      svgElement.waitForEnabled();
      expect(svgElement.$('#i0 polygon').isVisible()).toBeTruthy();
      expect(svgElement.$('#i1 polygon').isVisible()).toBeTruthy();
    });
  });

});