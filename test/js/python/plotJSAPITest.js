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
      expect(plotHelper.getAllPointsByGIndexAndType(svgElement, 0, 'rect').length).toBeGreaterThan(0);
    });
  });
});
