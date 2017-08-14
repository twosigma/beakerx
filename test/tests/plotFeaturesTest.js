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

var BeakerXPageObject = require('./beakerx.po.js');
var beakerxPO;

describe('PlotFeatures notebook', function () {

  beforeAll(function (done) {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByName('PlotFeatures.ipynb', done);
  });

  describe('Run "Title and Axis Labels" cell. ', function () {
    it('Widget area has dtcontainer', function (done) {
      var dtContainer = beakerxPO.runCellToGetDtContainer(0);
      dtContainer.waitForEnabled();
      browser.call(done);
    });

    it('Plot has Title and Axes Labels', function (done) {
      var dtContainer = beakerxPO.runCellToGetDtContainer(0);
      dtContainer.waitForEnabled();
      expect(dtContainer.$('#plotTitle').getText()).toEqual('We Will Control the Title');
      expect(dtContainer.$('#xlabel').getText()).toEqual('Horizontal');
      expect(dtContainer.$('#ylabel').getText()).toEqual('Vertical');
      browser.call(done);
    });
  });

  describe('Run cells with lines', function(){
    it('Plot has line', function(done){
      var svgElement = beakerxPO.runCellToGetSvgElement(1);
      svgElement.waitForEnabled();
      var plotLine = svgElement.$('path.plot-line');
      expect(plotLine.getAttribute('d')).not.toBeNull();
      browser.call(done);
    });

    it('Should specify color, width and style of line', function(done){
      var svgElement = beakerxPO.runCellToGetSvgElement(2);
      svgElement.waitForEnabled();
      var plotLine = svgElement.$('#i3 > path.plot-line');
      expect(plotLine.getCssProperty('stroke').value).toEqual('rgb(212,57,59)');
      expect(plotLine.getCssProperty('stroke-width').value).toEqual('2px');
      expect(plotLine.getCssProperty('stroke-dasharray').value).toEqual('2px, 2px');
      browser.call(done);
    });
  });

  describe('Run cell with stems', function(){
    it('Plot has 6 stems', function(done){
      var svgElement = beakerxPO.runCellToGetSvgElement(3);
      svgElement.waitForEnabled();
      var plotStems = svgElement.$$('g > line.plot-resp.normal');
      expect(plotStems.length).toEqual(6);
      browser.call(done);
    });

    it('Should set the base of stems', function(done){
      var svgElement = beakerxPO.runCellToGetSvgElement(4);
      svgElement.waitForEnabled();
      var baseY1 = Math.round(svgElement.$('#gridline_y_0').getAttribute('y1'));
      var stemY1 = Math.round(svgElement.$$('#i0 > line.plot-resp.normal')[1].getAttribute('y1'));
      expect(baseY1).toEqual(stemY1);
      browser.call(done);
    });
  });

  describe('Run cell with bars', function(){
    it('Plot has 5 bars', function(done){
      var svgElement = beakerxPO.runCellToGetSvgElement(5);
      svgElement.waitForEnabled();
      var plotBars = svgElement.$$('g > rect.plot-resp');
      expect(plotBars.length).toEqual(5);
      browser.call(done);
    });
  });

});