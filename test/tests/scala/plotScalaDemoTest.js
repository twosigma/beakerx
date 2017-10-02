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
    beakerxPO.runNotebookByUrl('/notebooks/doc/contents/scala/plotScalaDemo.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  describe('Run cell with stems', function(){
    it('Plot has 6 stems', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(0);
      svgElement.waitForEnabled();
      var plotStems = svgElement.$$('g > line.plot-resp.normal');
      expect(plotStems.length).toEqual(6);
    }, 2);
  });

  describe('Run cell with bars', function(){
    it('Plot has 4 bars', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(1);
      svgElement.waitForEnabled();
      expect(svgElement.$$('g > rect.plot-resp').length).toEqual(4);
    });
  });

  describe('Run cell with points', function() {
    it('Plot has points', function () {
      var svgElement = beakerxPO.runCellToGetSvgElement(2);
      svgElement.waitForEnabled();
      expect(svgElement.$$('g.plot-point').length).toBeGreaterThan(0);
    });
  });

  describe('Run cell with points', function(){
    it('Should sets point colors using lists', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(3);
      svgElement.waitForEnabled();
      expect(svgElement.$('rect#i0_0').getCssProperty('fill').value).toEqual('rgb(0,0,0)');
      expect(svgElement.$('rect#i0_1').getCssProperty('fill').value).toEqual('rgb(255,0,0)');
    });
  });

  describe('Run cell with areas', function() {
    it('Plot has 2 areas', function () {
      var svgElement = beakerxPO.runCellToGetSvgElement(4);
      svgElement.waitForEnabled();
      expect(svgElement.$$('g > polygon.plot-area').length).toEqual(2);
    });
  });

  describe('Run cell with areas', function(){
    it('Plot has area with base', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(5);
      svgElement.waitForEnabled();
      expect(svgElement.$$('g > polygon.plot-area').length).toEqual(1);
    });
  });

  //TODO cell with XYStacker hasn't worked yet

  describe('Run cell with constant lines', function(){
    it('Plot has 3 constant lines', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(7);
      svgElement.waitForEnabled();
      expect(svgElement.$$('g.plot-constline').length).toEqual(3);
    });
  });

  describe('Run cell with constant bands', function(){
    it('Plot has constant band', function () {
      var svgElement = beakerxPO.runCellToGetSvgElement(8);
      svgElement.waitForEnabled();
      expect(svgElement.$$('g.plot-constband').length).toEqual(1);
    });
  });

  describe('Run cell with constant bands', function(){
    it('Should sets constant band color', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(9);
      svgElement.waitForEnabled();
      expect(svgElement.$('#i1.plot-constband').getCssProperty('fill').value).toEqual('rgb(128,128,128)');
    });
  });

  describe('Run with text', function(){
    it('Plot has 8 text elements', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(10);
      svgElement.waitForEnabled();
      expect(svgElement.$$('g.plot-text').length).toEqual(8);
    });
  });

  describe('Run cell with crosshair', function(){
    it('Plot has crosshair', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(11);
      svgElement.waitForEnabled();
      var pointElement = svgElement.$('rect#i2_0');
      pointElement.scroll();
      pointElement.click();
      expect(svgElement.$('#cursor_xlabel').isVisible()).toBeTruthy();
      expect(svgElement.$('#cursor_ylabel').isVisible()).toBeTruthy();
    });
  });

  describe('Run "Simple Time Plot" cell', function(){
    it('Time Plot has points elements', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(12);
      svgElement.waitForEnabled();
      expect(svgElement.$('#i0.plot-point').isVisible()).toBeTruthy();
      expect(svgElement.$('#i1.plot-point').isVisible()).toBeTruthy();
    });
  });

  describe('Run "Logarithmic Scale" cells', function(){
    it('Plot has 2 lines', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(13);
      svgElement.waitForEnabled();
      expect(svgElement.$$('path.plot-line').length).toEqual(2);
      svgElement = beakerxPO.runCellToGetSvgElement(14);
      svgElement.waitForEnabled();
      expect(svgElement.$$('path.plot-line').length).toEqual(2);
    });
  });

  describe('Run "Date Objects for the Time Coordinate" cell', function(){
    it('Plot has points elements', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(15);
      svgElement.waitForEnabled();
      expect(svgElement.$('#i0.plot-point').isVisible()).toBeTruthy();
      expect(svgElement.$('#i1.plot-point').isVisible()).toBeTruthy();
    });
  });

  describe('Run "Nanosecond Resolution" cell', function(){
    it('Plot has points elements', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(16);
      svgElement.waitForEnabled();
      expect(svgElement.$('#i0.plot-point').isVisible()).toBeTruthy();
    });
  });

  describe('Run cell with advanced styling', function(){
    it("Plot has advanced styling", function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(17);
      svgElement.waitForEnabled();
      expect(svgElement.$$('g#labelg > text.plot-label')[0].getCssProperty('fill').value).toEqual('rgb(0,128,0)');
    });
  });


  describe('Run "Raster" cell', function(){
    it('Plot has 3 raster elements', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(18);
      svgElement.waitForEnabled();
      expect(svgElement.$$('g.plot-raster').length).toEqual(3);
    });
  });

  //TODO cell with axis bounds hasn't worked yet

});