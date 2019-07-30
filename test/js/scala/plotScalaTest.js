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

describe('Scala notebook', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/scala/PlotScalaTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  describe('Run cell with stems', function(){
    it('Plot has 6 stems', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(0);
      var plotStems = svgElement.$$('g > line.plot-resp.normal');
      expect(plotStems.length).toEqual(6);
    }, 2);
  });

  describe('Run cell with bars', function(){
    it('Plot has 4 bars', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(1);
      expect(svgElement.$$('g > rect.plot-resp').length).toEqual(4);
    });
  });

  describe('Run cell with points', function() {
    it('Plot has points', function () {
      var svgElement = beakerxPO.runCellToGetSvgElement(2);
      expect(svgElement.$$('g.plot-point').length).toBeGreaterThan(0);
    });
  });

  describe('Run cell with points', function(){
    it('Should sets point colors using lists', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(3);
      expect(svgElement.$('rect#i0_0').getCSSProperty('fill').value).toEqual('rgb(0,0,0)');
      expect(svgElement.$('rect#i0_1').getCSSProperty('fill').value).toEqual('rgb(255,0,0)');
    });
  });

  describe('Run cell with areas', function() {
    it('Plot has 2 areas', function () {
      var svgElement = beakerxPO.runCellToGetSvgElement(4);
      expect(svgElement.$$('g > polygon.plot-area').length).toEqual(2);
    });
  });

  describe('Run cell with areas', function(){
    it('Plot has area with base', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(5);
      expect(svgElement.$$('g > polygon.plot-area').length).toEqual(1);
    });
  });

  //TODO cell with XYStacker hasn't worked yet

  describe('Run cell with constant lines', function(){
    it('Plot has 3 constant lines', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(7);
      expect(svgElement.$$('g.plot-constline').length).toEqual(3);
    });
  });

  describe('Run cell with constant bands', function(){
    it('Plot has constant band', function () {
      var svgElement = beakerxPO.runCellToGetSvgElement(8);
      expect(svgElement.$$('g.plot-constband').length).toEqual(1);
    });
  });

  describe('Run cell with constant bands', function(){
    it('Should sets constant band color', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(9);
      expect(svgElement.$('#i1.plot-constband').getCSSProperty('fill').value).toEqual('rgb(128,128,128)');
    });
  });

  describe('Run with text', function(){
    it('Plot has 8 text elements', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(10);
      expect(svgElement.$$('g.plot-text').length).toEqual(8);
    });
  });

  describe('Run cell with crosshair', function(){
    it('Plot has crosshair', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(11);
      beakerxPO.performMouseMove(svgElement.$('g#maing'), 100, 100);
      var dtcontainer = beakerxPO.getDtContainerByIndex(11);
      expect(dtcontainer.$('div#cursor_xlabel').isDisplayed()).toBeTruthy();
      expect(dtcontainer.$('div#cursor_ylabel').isDisplayed()).toBeTruthy();
    });
  });

  describe('Run "Simple Time Plot" cell', function(){
    it('Time Plot has 2 lines and time axis', function(){
      beakerxPO.kernelIdleIcon.waitForEnabled();
      var svgElement = beakerxPO.runCellToGetSvgElement(12);
      expect(svgElement.$$('g#i0 > circle').length).toBeGreaterThan(0);
      expect(svgElement.$$('g#i1 > circle').length).toBeGreaterThan(0);
      expect(svgElement.$('g#i0 > path.plot-line').isDisplayed()).toBeTruthy();
      expect(svgElement.$('g#i1 > path.plot-line').isDisplayed()).toBeTruthy();
      expect(svgElement.$('text#label_x_0').getText()).toEqual('1990');
    });
  });

  describe('Run "Logarithmic Scale" cells', function(){
    it('Plot has 2 lines', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(13);
      expect(svgElement.$$('path.plot-line').length).toEqual(2);
      svgElement = beakerxPO.runCellToGetSvgElement(14);
      expect(svgElement.$$('path.plot-line').length).toEqual(2);
    });
  });

  describe('Run "Date Objects for the Time Coordinate" cell', function(){
    it('Plot has points elements', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(15);
      expect(svgElement.$('#i0.plot-point').isDisplayed()).toBeTruthy();
      expect(svgElement.$('#i1.plot-point').isDisplayed()).toBeTruthy();
    });
  });

  describe('Run "Nanosecond Resolution" cell', function(){
    it('Plot has points elements', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(16);
      expect(svgElement.$('#i0.plot-point').isDisplayed()).toBeTruthy();
    });
  });

  describe('Run cell with advanced styling', function(){
    it("Plot has advanced styling", function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(17);
      expect(svgElement.$$('g#labelg > text.plot-label')[0].getCSSProperty('fill').value).toEqual('rgb(0,128,0)');
    });
  });


  describe('Run "Raster" cell', function(){
    it('Plot has 3 raster elements', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(18);
      expect(svgElement.$$('g.plot-raster').length).toEqual(3);
    });
  });

  //TODO cell with axis bounds hasn't worked yet

});