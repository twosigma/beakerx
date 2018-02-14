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

describe('Charting groovy js', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/notebooks/groovy/ChartingTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  describe('Histogram', function () {
    it('Widget area has dtcontainer', function () {
      beakerxPO.runCodeCellByIndex(0);
      var dtContainer = beakerxPO.runCellToGetDtContainer(1);
      expect(dtContainer.$('#maing > g.plot-bar').isEnabled()).toBeTruthy();
    });

    it('Histogram has Title and Axes Labels', function () {
      var dtContainer = beakerxPO.runCellToGetDtContainer(2);
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
      expect(g1.getCssProperty('fill-opacity').value).toBeLessThan(1);
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
      expect(dtContainer.$('#maing > g.heatmap').isEnabled()).toBeTruthy();
      expect(dtContainer.$$('svg').length).toBe(1);
    });
  });

  describe('Levels Of Detail', function () {
    it('Plot has two polygon elements', function () {
      beakerxPO.runCodeCellByIndex(15);
      var svgElement = beakerxPO.runCellToGetSvgElement(16);
      expect(svgElement.$('#i0 polygon').isVisible()).toBeTruthy();
      expect(svgElement.$('#i1 polygon').isVisible()).toBeTruthy();
    });
  });

  function calculateSquare(rectElement){
    return Math.round(rectElement.getAttribute('height')) * Math.round(rectElement.getAttribute('width'));
  }

  describe('TreeMap', function () {
    it('Plot has TreeMap', function () {
      beakerxPO.runCodeCellByIndex(17);
      var svgElement = beakerxPO.runCellToGetSvgElement(18);
      expect(svgElement.$$('g.cell').length).toBe(13);
    });

    var svgElement1;
    it('(Mode.SQUARIFY) 1st and 2nd elements have the same colors and squares', function () {
      svgElement1 = beakerxPO.runCellToGetSvgElement(19);
      var rect2 = svgElement1.$('g#i2.cell > rect');
      var rect3 = svgElement1.$('g#i3.cell > rect');
      expect(rect2.getCssProperty('fill').value).toEqual(rect3.getCssProperty('fill').value);
      expect(calculateSquare(rect2)).toEqual(calculateSquare(rect3));
    });

    it('(Mode.SQUARIFY) 1st and 13th elements have the differents colors and squares', function () {
      var rect2 = svgElement1.$('g#i2.cell > rect');
      var rect16 = svgElement1.$('g#i16.cell > rect');
      expect(rect2.getCssProperty('fill').value).not.toEqual(rect16.getCssProperty('fill').value);
      expect(calculateSquare(rect2)).not.toEqual(calculateSquare(rect16));
    });

    it('(Mode.SLICE) 1st and 13th elements have the same widths', function () {
      var svgElement = beakerxPO.runCellToGetSvgElement(20);
      var rect2 = svgElement.$('g#i2.cell > rect');
      var rect16 = svgElement.$('g#i16.cell > rect');
      expect(Math.round(rect2.getAttribute('width'))).toEqual(Math.round(rect16.getAttribute('width')));
    });

    it('(Mode.DICE) 1st and 13th elements have the same heights', function () {
      var svgElement = beakerxPO.runCellToGetSvgElement(21);
      var rect2 = svgElement.$('g#i2.cell > rect');
      var rect16 = svgElement.$('g#i16.cell > rect');
      expect(Math.round(rect2.getAttribute('height'))).toEqual(Math.round(rect16.getAttribute('height')));
    });

    it('(Mode.SLICE_DIC) 1st and 13th elements have the differents heights', function () {
      var svgElement = beakerxPO.runCellToGetSvgElement(22);
      var rect2 = svgElement.$('g#i2.cell > rect');
      var rect16 = svgElement.$('g#i16.cell > rect');
      var maing = svgElement.$('g#maing');
      expect(Math.round(maing.getElementSize('height'))).toEqual(Math.round(rect16.getElementSize('height')));
      expect(Math.round(rect2.getAttribute('height'))).not.toEqual(Math.round(rect16.getAttribute('height')));
    });
  });

});