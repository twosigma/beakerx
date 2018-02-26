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

describe('(Groovy) Output Containers ', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    plotHelper = new PlotHelperObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/groovy/OutputContainersTest.ipynb');
  });

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  function getTabLabelText(output, tabIndex){
    return output.$$('div.p-TabBar-tabLabel')[tabIndex].getText();
  }

  describe('(Groovy) OutputCell.HIDDEN ', function() {
    it("Cell doesn't have output", function () {
      cellIndex = 0;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      expect(beakerxPO.getAllOutputAreaChildren(codeCell).length).toBe(0);
    });
  });

  describe('(Groovy) Stacked Output Containers ', function() {
    it('Cell output contains 4 output containers ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var outputs = beakerxPO.getAllOutputAreaChildren(codeCell);
      expect(outputs.length).toBe(4);
      expect(outputs[0].getText()).toMatch(/simplest example/);
      expect(outputs[1].getText()).toMatch(/2, 3, 5, 7/);
      expect(outputs[2].$('h1').getText()).toMatch(/title/);
      expect(outputs[3].getText()).toMatch(/null/);
    });
  });

  describe('(Groovy) Tabbed Output Containers ', function() {
    it('Cell contains Tabbed Output with 4 tabs ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var output = beakerxPO.getAllOutputsWidget(codeCell)[0];
      expect(output.$$('li.p-TabBar-tab').length).toBe(4);
      expect(getTabLabelText(output, 0)).toMatch(/Scatter with History/);
      expect(getTabLabelText(output, 1)).toMatch(/Short Term/);
      expect(getTabLabelText(output, 2)).toMatch(/Long Term/);
      expect(getTabLabelText(output, 3)).toMatch(/1990\/01/);
    });
  });

});