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

describe('Plot groovy js', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    plotHelper = new PlotHelperObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/groovy/PlotGroovyTest.ipynb');
  });

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe('Run "Title and Axis Labels" cell. ', function () {
    var dtContainer;

    it('Widget area has dtcontainer', function () {
      cellIndex = 0;
      dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      expect(dtContainer.isEnabled()).toBeTruthy();
    });

    it('Plot has Title and Axes Labels', function () {
      plotHelper.checkPlotTitle(dtContainer, 'We Will Control the Title');
      plotHelper.checkXLabel(dtContainer, 'Horizontal');
      plotHelper.checkYLabel(dtContainer, 'Vertical');
    });
  });

  describe('Run cells with lines', function(){
    it('Plot has line', function(){
      cellIndex += 1;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(plotHelper.getLineByGIndex(svgElement, 0).getAttribute('d')).not.toBeNull();
    });

    it('Should specify color, width and style of line', function(){
      cellIndex += 1;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      var plotLine = plotHelper.getLineByGIndex(svgElement, 3);
      expect(plotLine.getCSSProperty('stroke').value).toEqual('rgb(212,57,59)');
      expect(plotLine.getCSSProperty('stroke-width').value).toEqual('2px');
      expect(plotLine.getCSSProperty('stroke-dasharray').value).toEqual('2px, 2px');
    });
  });

  describe('Run cell with stems', function(){
    it('Plot has 6 stems', function(){
      cellIndex += 1;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(plotHelper.getAllGStemLines(svgElement, 0).length).toEqual(6);
    });

    it('Should set the base of stems', function(){
      cellIndex += 1;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      var baseY1 = Math.round(svgElement.$('#gridline_y_0').getAttribute('y1'));
      var stemY1 = Math.round(plotHelper.getStemByGAndLineIndexes(svgElement, 0, 1).getAttribute('y1'));
      expect(baseY1).toEqual(stemY1);
    });
  });

  describe('Run cell with bars', function(){
    it('Plot has 5 bars', function(){
      cellIndex += 1;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(plotHelper.getAllGBarRects(svgElement, 0).length).toEqual(5);
    });
  });

  describe('Run cell with points', function(){
    it('Plot has points', function(){
      cellIndex += 1;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(plotHelper.getAllPointsByGIndexAndType(svgElement, 0, 'rect').length).toBeGreaterThan(0);
    });

    it('Should sets point colors using lists', function(){
      cellIndex += 1;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(svgElement.$('rect#i0_0').getCSSProperty('fill').value).toEqual('rgb(0,0,0)');
      expect(svgElement.$('rect#i0_1').getCSSProperty('fill').value).toEqual('rgb(255,0,0)');
    });
  });

  describe('Run cell with areas', function(){
    it('Plot has 2 areas', function(){
      cellIndex += 1;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(plotHelper.getAllAreas(svgElement).length).toEqual(2);
    });

    it('Plot has area with base', function(){
      cellIndex += 1;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(plotHelper.getAllAreas(svgElement).length).toEqual(1);
    });
  });

  describe('Run cell with stacking', function(){
    it('Plot has 2 areas', function(){
      cellIndex += 1;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(plotHelper.getAllAreas(svgElement).length).toEqual(2);
    });
  });

  describe('Run cell with constant lines', function(){
    it('Plot has 4 constant lines', function(){
      cellIndex += 1;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(plotHelper.getAllConstLines(svgElement).length).toEqual(4);
    });
  });

  describe('Run cell with constant bands', function(){
    it('Plot has constant band', function(){
      cellIndex += 1;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(plotHelper.getAllConstBands(svgElement).length).toBeGreaterThan(0);
    });

    it('Should sets constant band color', function(){
      cellIndex += 1;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(svgElement.$('#i1.plot-constband').getCSSProperty('fill').value).toEqual('rgb(128,128,128)');
    });
  });

  describe('Run cell with text', function(){
    it('Plot has 8 text elements', function(){
      cellIndex += 1;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(plotHelper.getAllTexts(svgElement).length).toEqual(8);
    });
  });

  describe('Run cell with crosshair', function(){
    it('Plot has crosshair', function(){
      cellIndex += 1;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      beakerxPO.performMouseMove(svgElement.$('g#maing'), 100, 100);
      var dtcontainer = beakerxPO.getDtContainerByIndex(cellIndex);
      expect(dtcontainer.$('div#cursor_xlabel').isDisplayed()).toBeTruthy();
      expect(dtcontainer.$('div#cursor_ylabel').isDisplayed()).toBeTruthy();
    });
  });

  describe('Run "Simple Time Plot" cell', function(){
    it('Time Plot has points elements', function(){
      cellIndex += 2;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.kernelIdleIcon.waitForEnabled();
      cellIndex += 1;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(svgElement.$('#i0.plot-point').isDisplayed()).toBeTruthy();
      expect(svgElement.$('#i1.plot-point').isDisplayed()).toBeTruthy();
    });
  });

  describe('Run "Second Y Axis" cell', function(){
    it('Plot has second Y Axis', function(){
      cellIndex += 1;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(svgElement.$('#yrlabel').isDisplayed()).toBeTruthy();
      expect(svgElement.$('#label_yr_1').isDisplayed()).toBeTruthy();
    });
  });

  describe('Run "Logarithmic Scale" cells', function(){
    it('Plot has 2 lines', function(){
      cellIndex += 1;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(plotHelper.getAllLines(svgElement).length).toEqual(2);
      cellIndex += 1;
      svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(plotHelper.getAllLines(svgElement).length).toEqual(2);
    });
  });

  describe('Run "Date Objects for the Time Coordinate" cell', function(){
    it('Plot has points elements', function(){
      cellIndex += 1;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(svgElement.$('#i0.plot-point').isDisplayed()).toBeTruthy();
      expect(svgElement.$('#i1.plot-point').isDisplayed()).toBeTruthy();
    });
  });

  describe('Run "Nanosecond Resolution" cell', function(){
    it('Plot has points elements', function(){
      cellIndex += 1;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(svgElement.$('#i0.plot-point').isDisplayed()).toBeTruthy();
    });
  });

  describe('Run "Formating control" cells', function(){
    it("Plot doesn't have tick labels", function(){
      cellIndex += 1;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(svgElement.$$('g#labelg > text.plot-label').length).toEqual(0);
    });

    it("Plot has advanced styling", function(){
      cellIndex += 1;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(svgElement.$$('g#labelg > text.plot-label')[0].getCSSProperty('fill').value).toEqual('rgb(0,128,0)');
    });
  });

  describe('Run "Raster" cell', function(){
    it('Plot has 3 raster elements', function(){
      cellIndex += 1;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(plotHelper.getAllRasters(svgElement).length).toBeGreaterThan(0);
    });
  });

  describe('Run cell with axis bounds', function(){
    it('Plot has 2 axis bounds', function(){
      cellIndex += 1;
      var svgElement = beakerxPO.runCellToGetSvgElement(cellIndex);
      expect(svgElement.$('text#label_y_0').getText()).toEqual('1\.0');
      expect(svgElement.$('text#label_yr_0').getText()).toEqual('3\.0');
    });
  });

});