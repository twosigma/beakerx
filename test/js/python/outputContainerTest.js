/*
 *  Copyright 2018 TWO SIGMA OPEN SOURCE, LLC
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

describe('(Groovy) Output Containers ', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/python/OutputContainersTest.ipynb');
    beakerxPO.openUIWindow();
  });

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  function widgetPlotIsVisible(widget){
    return widget.isVisible('div#plotLegendContainer');
  }

  function widgetTableIsVisible(widget){
    return widget.isVisible('div.p-Widget.p-DataGrid-viewport');
  }

  describe('UI options. ', function () {
    it("Use new table widget. ", function () {
      beakerxPO.setDataGridForTable(true, false);
    });
  });

  describe('(Python) Without output. ', function() {
    it("Cell doesn't have output. ", function () {
      cellIndex = 0;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      expect(beakerxPO.getAllOutputAreaChildren(codeCell).length).toBe(0);
    });
  });

  describe('(Python) Stacked Output Containers ', function() {
    it('Cell output contains 4 output containers ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var outputs = beakerxPO.getAllOutputAreaChildren(codeCell);
      expect(outputs.length).toBe(4);
      expect(outputs[0].getText()).toMatch(/simplest example/);
      expect(outputs[1].getText()).toMatch(/2, 3, 5, 7/);
      expect(outputs[2].$('h1').getText()).toMatch(/title/);
      expect(outputs[3].getText()).toMatch(/None/);
    });
  });

  function clickOnTabByName(output, name){
    output.click('div.p-TabBar-tabLabel=' + name);
  }

  function getTabLabelText(output, tabIndex){
    return output.$$('div.p-TabBar-tabLabel')[tabIndex].getText();
  }

  describe('(Python) Tabbed Output Containers ', function() {
    var output;
    var widgets;

    it('Cell contains Tabbed Output with 4 tabs ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      output = beakerxPO.getAllOutputsWidget(codeCell)[0];
      widgets =  output.$$('div.widget-tab-contents > div.p-Widget > div');
      expect(widgets.length).toBe(4);
      expect(getTabLabelText(output, 0)).toMatch(/Scatter with History/);
      expect(getTabLabelText(output, 1)).toMatch(/Short Term/);
      expect(getTabLabelText(output, 2)).toMatch(/Long Term/);
      expect(getTabLabelText(output, 3)).toMatch(/1990\/01/);
    });

    it('Tabbed Output contains 3 plots and 1 table ', function () {
      clickOnTabByName(output, 'Scatter with History');
      expect(widgetPlotIsVisible(widgets[0])).toBeTruthy();

      clickOnTabByName(output, 'Short Term');
      expect(widgetPlotIsVisible(widgets[1])).toBeTruthy();

      clickOnTabByName(output, 'Long Term');
      expect(widgetPlotIsVisible(widgets[2])).toBeTruthy();

      clickOnTabByName(output, '1990/01');
      expect(widgetTableIsVisible(widgets[3])).toBeTruthy();
    });
  });

  describe('(Python) Grid Output Containers ', function() {
    var widgets;

    it('Cell contains Grid Output with 6 items ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var output = beakerxPO.getAllOutputsWidget(codeCell)[0];
      widgets =  output.$$('div.widget-hbox > div.p-Widget > div');
      expect(widgets.length).toBe(6);
    });

    it('Grid Output contains 5 plots and 1 table ', function () {
      expect(widgetPlotIsVisible(widgets[0])).toBeTruthy();
      expect(widgetPlotIsVisible(widgets[1])).toBeTruthy();
      expect(widgetPlotIsVisible(widgets[2])).toBeTruthy();
      expect(widgetPlotIsVisible(widgets[3])).toBeTruthy();
      expect(widgetTableIsVisible(widgets[4])).toBeTruthy();
      expect(widgetPlotIsVisible(widgets[5])).toBeTruthy();
    });
  });

  function waitWidgetPlotIsVisible(output, lastId){
    var widgetId;
    browser.waitUntil(function() {
      var widget = output.$('div.widget-box > div.p-Widget > div');
      widgetId = widget.getAttribute('id');
      return (lastId != widgetId) && widgetPlotIsVisible(widget);
    });
    return widgetId;
  };

  function waitWidgetTableIsVisible(output, lastId){
    var widgetId;
    browser.waitUntil(function() {
      var widget = output.$('div.widget-box > div.p-Widget > div');
      widgetId = widget.getAttribute('id');
      return (lastId != widgetId) && widgetTableIsVisible(widget);
    });
    return widgetId;
  };

  describe('(Python) Cycling Output Container ', function() {
    var output;
    var time1, time2, time3;

    it('Cell output contains widget container ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      output = beakerxPO.getAllOutputsWidget(codeCell)[0];
      expect(output.$('div.widget-container.widget-box').isVisible()).toBeTruthy();
    });

    it('Cycling Output contains 3 plots and 1 table ', function () {
      var wdgId = waitWidgetPlotIsVisible(output, 'firstPlot');

      wdgId = waitWidgetPlotIsVisible(output, wdgId);
      time1 = new Date().getTime();

      wdgId = waitWidgetTableIsVisible(output, wdgId);
      time2 = new Date().getTime();

      waitWidgetPlotIsVisible(output, wdgId);
      time3 = new Date().getTime();
    });

    it('Cycling period approximately equals 3 seconds ', function () {
      expect(time2 - time1).toBeGreaterThan(2500);
      expect(time2 - time1).toBeLessThan(3500);
      expect(time3 - time2).toBeGreaterThan(2500);
      expect(time3 - time2).toBeLessThan(3500);
    });
  });

});
