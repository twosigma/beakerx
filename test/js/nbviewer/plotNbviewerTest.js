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
var TableHelperObject = require('../table.helper.js');
var beakerxPO;
var plotHelper;
var tableHelper;

describe('Publish plot groovy notebook js', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    plotHelper = new PlotHelperObject();
    tableHelper = new TableHelperObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/nbviewer/PlotNbviewerTest.ipynb');
  }, 2);

  afterAll(function () {
    browser.window(browser.windowHandles().value[0]);
    beakerxPO.closeAndHaltNotebook();
  });

  function waitAllDtContainers() {
    browser.waitUntil(function () {
      var dtContainers = $$('div.dtcontainer');
      return (dtContainers.length > 10) ;
    }, 60000, 'expected 11 cells outputs are not exist');
  }

  describe('Run all cells on local notebook', function () {
    it('(local notebook) should run all cells ', function () {
      beakerxPO.clickRunAllCells();
      beakerxPO.kernelIdleIcon.waitForEnabled();
    });
    it('(local notebook) 11 dtContainers are exists', function(){
      waitAllDtContainers();
    })
  });

  describe('Publish notebook', function () {
    it('Should open nbviewer window', function () {
      beakerxPO.publishAndOpenNbviewerWindow();
    });
    it('(published notebook) 11 dtContainers are exists', function(){
      browser.window(browser.windowHandles().value[1]);
      waitAllDtContainers();
    })
  });

  var cellIndex;

  describe('Check cells with lines', function(){
    var dtContainer;

    it('Widget area has dtcontainer', function () {
      cellIndex = 0;
      dtContainer = beakerxPO.getDtContainerByIndex(cellIndex);
      expect(dtContainer.isEnabled()).toBeTruthy();
    });

    it('Plot has Title and Axes Labels', function () {
      plotHelper.checkPlotTitle(dtContainer, 'We Will Control the Title');
      plotHelper.checkXLabel(dtContainer, 'Horizontal');
      plotHelper.checkYLabel(dtContainer, 'Vertical');
    });

    it('Should specify color, width and style of line', function(){
      var svgElement = beakerxPO.getSvgElementByIndex(cellIndex);
      var plotLine = plotHelper.getLineByGIndex(svgElement, 3);
      expect(plotLine.getCSSProperty('stroke').value).toEqual('rgb(212,57,59)');
      expect(plotLine.getCSSProperty('stroke-width').value).toEqual('2px');
      expect(plotLine.getCSSProperty('stroke-dasharray').value).toEqual('2px, 2px');
    });
  });

  describe('Check cell with crosshair', function(){
    it('Plot has crosshair', function(){
      cellIndex +=1;
      var svgElement = beakerxPO.getSvgElementByIndex(cellIndex);
      var pointElement = svgElement.$('rect#i2_0');
      pointElement.scroll();
      pointElement.click();
      svgElement.moveToObject('rect#i2_1');
      var divPlot = beakerxPO.getCodeCellByIndex(cellIndex).$('#svgg');
      expect(divPlot.$('#cursor_xlabel').isDisplayed()).toBeTruthy();
      expect(divPlot.$('#cursor_ylabel').isDisplayed()).toBeTruthy();
    });
  });

  describe('Check "Simple Time Plot" cell', function(){
    it('Time Plot has points elements', function(){
      cellIndex +=2;
      var svgElement = beakerxPO.getSvgElementByIndex(cellIndex);
      expect(svgElement.$('#i0.plot-point').isDisplayed()).toBeTruthy();
      expect(svgElement.$('#i1.plot-point').isDisplayed()).toBeTruthy();
    });
  });

  describe('Check "Date Objects for the Time Coordinate" cell', function(){
    it('Plot has points elements', function(){
      cellIndex +=1;
      var svgElement = beakerxPO.getSvgElementByIndex(cellIndex);
      expect(svgElement.$('#i0.plot-point').isDisplayed()).toBeTruthy();
      expect(svgElement.$('#i1.plot-point').isDisplayed()).toBeTruthy();
    });
  });

  describe('Check Histogram', function () {
    it('Histogram has Title and Axes Labels', function () {
      cellIndex +=2;
      var dtContainer = beakerxPO.getDtContainerByIndex(cellIndex);
      expect(dtContainer.$('#maing > g.plot-bar').isEnabled()).toBeTruthy();
      plotHelper.checkPlotTitle(dtContainer, 'Wide Histogram with Manual Parameters');
      plotHelper.checkXLabel(dtContainer, 'Size');
      plotHelper.checkYLabel(dtContainer, 'Count');
    });
  });

  describe('Check Heatmap', function () {
    it('Heatmap has Title and Axes Labels', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.getDtContainerByIndex(cellIndex);
      expect(dtContainer.$('#maing > g.heatmap').isEnabled()).toBeTruthy();
      plotHelper.checkPlotTitle(dtContainer, 'Heatmap Second Example');
      plotHelper.checkXLabel(dtContainer, 'X Label');
      plotHelper.checkYLabel(dtContainer, 'Y Label');
      expect(dtContainer.$$('svg').length).toBe(2);
    });
  });

  describe('Check Levels Of Detail', function () {
    it('Plot has two polygon elements', function () {
      cellIndex +=2;
      var svgElement = beakerxPO.getSvgElementByIndex(cellIndex);
      expect(svgElement.$('#i0 polygon').isDisplayed()).toBeTruthy();
      expect(svgElement.$('#i1 polygon').isDisplayed()).toBeTruthy();
    });
  });

  describe('Check TreeMap', function () {
    it('Plot has TreeMap', function () {
      cellIndex +=2;
      var svgElement = beakerxPO.getSvgElementByIndex(cellIndex);
      expect(svgElement.$$('g.cell').length).toBe(13);
    });
  });

  describe('Check Category bars)', function(){
    it('Plot has 6 bars', function(){
      cellIndex += 1;
      var dtContainer = beakerxPO.getDtContainerByIndex(cellIndex);
      expect(dtContainer.$$('g#maing rect').length).toEqual(6);
    });
  });

  describe('Check Tables)', function(){
    it('Plot has Table', function () {
      cellIndex +=1 ;
      var dtContainer = beakerxPO.getDtContainerByIndex(cellIndex);
      expect(tableHelper.getAllRowsOfTableBody(dtContainer).length).toEqual(25);
      expect(tableHelper.getCellOfTableBody(dtContainer, 0, 1).getText()).toMatch(/8/);
      expect(tableHelper.getCellOfTableBody(dtContainer, 0, 2).getText()).toMatch(/8.2586/);
      expect(tableHelper.getCellOfTableBody(dtContainer, 0, 7).getText()).toMatch(/:\)/);
    });

    it('Plot has Table with Highlighters', function () {
      cellIndex +=1 ;
      var dtContainer = beakerxPO.getDtContainerByIndex(cellIndex);
      expect(tableHelper.getAllRowsOfTableBody(dtContainer).length).toEqual(9);
      var cell1_2 = tableHelper.getCellOfTableBody(dtContainer, 0, 2);
      var cell2_2 = tableHelper.getCellOfTableBody(dtContainer, 1, 2);
      var cell3_2 = tableHelper.getCellOfTableBody(dtContainer, 2, 2);
      expect(cell1_2.getText()).toMatch(/2.000/);
      expect(cell2_2.getText()).toMatch(/4.000/);
      expect(cell3_2.getText()).toMatch(/2.000/);
      var color1_2 = cell1_2.getCSSProperty('background-color').value;
      expect(color1_2).not.toEqual(cell2_2.getCSSProperty('background-color').value);
      expect(color1_2).toEqual(cell3_2.getCSSProperty('background-color').value);
    });
  });

});