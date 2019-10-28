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

describe('Testing of Plot (python)', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    plotHelper = new PlotHelperObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/python/PlotPythonTest.ipynb');
  }, 2);

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

});