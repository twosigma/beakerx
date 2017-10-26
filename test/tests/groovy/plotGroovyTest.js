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

describe('Plot groovy tests', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/notebooks/test/notebooks/groovy/PlotGroovyTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  describe('Run "Title and Axis Labels" cell. ', function () {
    it('Widget area has dtcontainer', function () {
      var dtContainer = beakerxPO.runCellToGetDtContainer(0);
      dtContainer.waitForEnabled();
    });

    it('Plot has Title and Axes Labels', function () {
      var dtContainer = beakerxPO.runCellToGetDtContainer(0);
      dtContainer.waitForEnabled();
      expect(dtContainer.$('#plotTitle').getText()).toEqual('We Will Control the Title');
      expect(dtContainer.$('#xlabel').getText()).toEqual('Horizontal');
      expect(dtContainer.$('#ylabel').getText()).toEqual('Vertical');
    });
  });

  describe('Run cells with lines', function(){
    it('Plot has line', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(1);
      svgElement.waitForEnabled();
      var plotLine = svgElement.$('path.plot-line');
      expect(plotLine.getAttribute('d')).not.toBeNull();
    });

    it('Should specify color, width and style of line', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(2);
      svgElement.waitForEnabled();
      var plotLine = svgElement.$('#i3 > path.plot-line');
      expect(plotLine.getCssProperty('stroke').value).toEqual('rgb(212,57,59)');
      expect(plotLine.getCssProperty('stroke-width').value).toEqual('2px');
      expect(plotLine.getCssProperty('stroke-dasharray').value).toEqual('2px, 2px');
    });
  });

  describe('Run cell with stems', function(){
    it('Plot has 6 stems', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(3);
      svgElement.waitForEnabled();
      var plotStems = svgElement.$$('g > line.plot-resp.normal');
      expect(plotStems.length).toEqual(6);
    });

    it('Should set the base of stems', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(4);
      svgElement.waitForEnabled();
      var baseY1 = Math.round(svgElement.$('#gridline_y_0').getAttribute('y1'));
      var stemY1 = Math.round(svgElement.$$('#i0 > line.plot-resp.normal')[1].getAttribute('y1'));
      expect(baseY1).toEqual(stemY1);
    });
  });

  describe('Run cell with bars', function(){
    it('Plot has 5 bars', function(){
      var svgElement5 = beakerxPO.runCellToGetSvgElement(5);
      svgElement5.waitForEnabled();
      expect(svgElement5.$$('g#i0 > rect.plot-resp').length).toEqual(5);
    });
  });

  describe('Run cell with points', function(){
    it('Plot has points', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(6);
      svgElement.waitForEnabled();
      expect(svgElement.$$('g.plot-point').length).toBeGreaterThan(0);
    });

    it('Should sets point colors using lists', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(7);
      svgElement.waitForEnabled();
      expect(svgElement.$('rect#i0_0').getCssProperty('fill').value).toEqual('rgb(0,0,0)');
      expect(svgElement.$('rect#i0_1').getCssProperty('fill').value).toEqual('rgb(255,0,0)');
    });
  });

  describe('Run cell with areas', function(){
    it('Plot has 2 areas', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(8);
      svgElement.waitForEnabled();
      expect(svgElement.$$('g > polygon.plot-area').length).toEqual(2);
    });

    it('Plot has area with base', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(9);
      svgElement.waitForEnabled();
      expect(svgElement.$$('g > polygon.plot-area').length).toEqual(1);
    });
  });

  describe('Run cell with stacking', function(){
    it('Plot has 2 areas', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(10);
      svgElement.waitForEnabled();
      expect(svgElement.$$('g > polygon.plot-area').length).toEqual(2);
    });
  });

  describe('Run cell with constant lines', function(){
    it('Plot has 3 constant lines', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(11);
      svgElement.waitForEnabled();
      expect(svgElement.$$('g.plot-constline').length).toEqual(3);
    });
  });

  describe('Run cell with constant bands', function(){
    it('Plot has constant band', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(12);
      svgElement.waitForEnabled();
      expect(svgElement.$$('g.plot-constband').length).toEqual(1);
    });

    it('Should sets constant band color', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(13);
      svgElement.waitForEnabled();
      expect(svgElement.$('#i1.plot-constband').getCssProperty('fill').value).toEqual('rgb(128,128,128)');
    });
  });

  describe('Run cell with text', function(){
    it('Plot has 8 text elements', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(14);
      svgElement.waitForEnabled();
      expect(svgElement.$$('g.plot-text').length).toEqual(8);
    });
  });

  describe('Run cell with crosshair', function(){
    it('Plot has crosshair', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(15);
      svgElement.waitForEnabled();
      var pointElement = svgElement.$('rect#i2_0');
      pointElement.waitForEnabled();
      pointElement.scroll();
      pointElement.click();
      svgElement.moveToObject('rect#i2_1');
      var divPlot = beakerxPO.getCodeCellByIndex(15).$('#svgg');
      divPlot.$('line#cursor_x').waitForEnabled();
      expect(divPlot.$('#cursor_xlabel').isVisible()).toBeTruthy();
      expect(divPlot.$('#cursor_ylabel').isVisible()).toBeTruthy();
    });
  });

  describe('Run "Simple Time Plot" cell', function(){
    it('Time Plot has points elements', function(){
      beakerxPO.runCodeCellByIndex(17);
      beakerxPO.kernelIdleIcon.waitForEnabled();
      var svgElement = beakerxPO.runCellToGetSvgElement(18);
      svgElement.waitForEnabled();
      expect(svgElement.$('#i0.plot-point').isVisible()).toBeTruthy();
      expect(svgElement.$('#i1.plot-point').isVisible()).toBeTruthy();
    });
  });

  describe('Run "Second Y Axis" cell', function(){
    it('Plot has second Y Axis', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(19);
      svgElement.waitForEnabled();
      expect(svgElement.$('#yrlabel').isVisible()).toBeTruthy();
      expect(svgElement.$('#label_yr_1').isVisible()).toBeTruthy();
    });
  });

  describe('Run "Logarithmic Scale" cells', function(){
    it('Plot has 2 lines', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(20);
      svgElement.waitForEnabled();
      expect(svgElement.$$('path.plot-line').length).toEqual(2);
      svgElement = beakerxPO.runCellToGetSvgElement(21);
      svgElement.waitForEnabled();
      expect(svgElement.$$('path.plot-line').length).toEqual(2);
    });
  });

  describe('Run "Date Objects for the Time Coordinate" cell', function(){
    it('Plot has points elements', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(22);
      svgElement.waitForEnabled();
      expect(svgElement.$('#i0.plot-point').isVisible()).toBeTruthy();
      expect(svgElement.$('#i1.plot-point').isVisible()).toBeTruthy();
    });
  });

  describe('Run "Nanosecond Resolution" cell', function(){
    it('Plot has points elements', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(23);
      svgElement.waitForEnabled();
      expect(svgElement.$('#i0.plot-point').isVisible()).toBeTruthy();
    });
  });

  describe('Run "Formating control" cells', function(){
    it("Plot doesn't have tick labels", function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(24);
      svgElement.waitForEnabled();
      expect(svgElement.$$('g#labelg > text.plot-label').length).toEqual(0);
    });

    it("Plot has advanced styling", function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(25);
      svgElement.waitForEnabled();
      expect(svgElement.$$('g#labelg > text.plot-label')[0].getCssProperty('fill').value).toEqual('rgb(0,128,0)');
    });
  });

  describe('Run "Raster" cell', function(){
    it('Plot has 3 raster elements', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(26);
      svgElement.waitForEnabled();
      expect(svgElement.$$('g.plot-raster').length).toEqual(3);
    });
  });

  describe('Run cell with axis bounds', function(){
    it('Plot has 2 axis bounds', function(){
      var svgElement = beakerxPO.runCellToGetSvgElement(27);
      svgElement.waitForEnabled();
      expect(svgElement.$('text#label_y_0').getText()).toEqual('1.0');
      expect(svgElement.$('text#label_yr_0').getText()).toEqual('3.0');
    });
  });

});