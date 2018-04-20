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
var PlotHelperObject = require('../plot.helper.js');
var beakerxPO;
var plotHelper;

describe('(Python) Plot API Tests', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    plotHelper = new PlotHelperObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/python/PlotJSAPITest.ipynb');
  });

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;
  var dtContainer;

  describe('Draw a plot', function () {
    var svgElement

    it('Plot has Title and Axes Labels', function () {
      cellIndex = 0;
      dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);

      plotHelper.checkPlotTitle(dtContainer, 'Title');
      plotHelper.checkXLabel(dtContainer, 'Horizontal');
      plotHelper.checkYLabel(dtContainer, 'Vertical');
    });
  });

  describe('Draw a bar chart and a line chart', function () {
    it('Plot has 5 bars', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex;

      cellIndex += 1;
      svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);

      expect(plotHelper.getAllGBarRects(svgElement, 0).length).toEqual(5);
    });

    it('Plot has points', function () {
      expect(plotHelper.getAllPointsByGIndexAndMultipleTypes(svgElement, 2, 'diamond', 'polygon').length).toBeGreaterThan(0);
    });
  });

  describe('Draw an area chart', function () {
    it('Draw an area chart correctly', function () {
      cellIndex += 1;
      svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);

      expect(plotHelper.getAllAreas(svgElement).length).toBeGreaterThan(0);
    });
  });

  describe('Draw a band chart', function () {
    it('Draw a band chart correctly', function () {
      cellIndex += 1;
      svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);

      expect(plotHelper.getAllConstBands(svgElement).length).toBeGreaterThan(0);
    });
  });

  describe('Draw a line chart and a band chart', function () {
    it('Draw a line chart correctly', function () {
      cellIndex += 1;
      svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);

      expect(plotHelper.getAllLines(svgElement).length).toBeGreaterThan(0);
    });

    it('Draw a band chart correctly', function () {
      svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);

      expect(plotHelper.getAllConstBands(svgElement).length).toBeGreaterThan(0);
    });
  });

  describe('Draw a plot', function () {
    it('Draw a plot correctly', function () {
      cellIndex += 1;
      svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);

      expect(plotHelper.getAllPointsByGIndexAndType(svgElement, 0, 'rect').length).toBeGreaterThan(0);
    });
  });

  describe('Draw a plot with XYStacker', function () {
    it('Draw a plot with an XYStack correctly', function () {
      cellIndex += 1;
      svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);

      expect(plotHelper.getAllAreas(svgElement).length).toBeGreaterThan(0);
    });
  });

  describe('Draw two line charts', function () {
    it('Draw two line charts correctly', function () {
      cellIndex += 1;
      svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);

      expect(svgElement.$('g#i0 > circle').isEnabled).toBeTruthy();
      expect(svgElement.$('g#i1 > circle').isEnabled).toBeTruthy();
    });
  });
});
