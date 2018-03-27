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
var TableHelperObject = require('../table.helper.js');
var beakerxPO;
var tableHelper;

describe('Testing of table Actions ', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    tableHelper = new TableHelperObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/groovy/TableActionsTest.ipynb');
    beakerxPO.openUIWindow();
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  function getTableRowElement(codeCellIndex, rowIndex, colIndex){
    var dtContainer = beakerxPO.getDtContainerByIndex(codeCellIndex);
    return tableHelper.getCellOfTableBody(dtContainer, rowIndex, colIndex);
  };

  var cellIndex;

  describe('UI options. ', function () {
    it("Disable PhosphorJS DataGrid for TableDisplay Widget. ", function () {
      beakerxPO.setDataGridForTable(false, false);
    });
  });

  describe('ContextMenuItem action ', function(){
    var rowIndex = 0;

    it('ContextMenuItem should change table cell value ', function () {
      cellIndex = 0;
      var colIndex = 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      var cell_0 = tableHelper.getCellOfTableBody(dtContainer, rowIndex, colIndex);
      var value1 = parseInt(cell_0.getText());
      cell_0.rightClick();
      browser.click('div.p-Menu-itemLabel=plusOne');
      beakerxPO.kernelIdleIcon.waitForEnabled();
      var value2 = parseInt(getTableRowElement(cellIndex, rowIndex, colIndex).getText());
      expect(value2).toBeGreaterThan(value1);
    });

    it('ContextMenuItem should run tag (by string) ', function () {
      var colIndex = 2;
      var cell_1 = getTableRowElement(cellIndex, rowIndex, colIndex);
      cell_1.rightClick();
      browser.click('div.p-Menu-itemLabel=tag1ByStr');
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.waitAndCheckOutputTextOfStdout(cellIndex + 1, /0:1=2/);
    });

    it('ContextMenuItem should run tag (by closure) ', function () {
      var colIndex = 3;
      var cell_2 = getTableRowElement(cellIndex, rowIndex, colIndex);
      cell_2.rightClick();
      browser.click('div.p-Menu-itemLabel=tag1ByClosure');
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.waitAndCheckOutputTextOfStdout(cellIndex + 1, /0:2=3/);
    });
  });

  describe('DoubleClickAction action ', function(){
    var rowIndex = 0;

    it('DoubleClickAction should change table cell value ', function () {
      cellIndex += 2;
      var colIndex = 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      var cell_0 = tableHelper.getCellOfTableBody(dtContainer, rowIndex, colIndex);
      var value1 = parseInt(cell_0.getText());
      cell_0.doubleClick();
      beakerxPO.kernelIdleIcon.waitForEnabled();
      var value2 = parseInt(getTableRowElement(cellIndex, rowIndex, colIndex).getText());
      expect(value2).toBeGreaterThan(value1);
    });

    it('DoubleClickAction should run tag (by string) ', function () {
      cellIndex += 1;
      var colIndex = 2;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      var cell_1 = tableHelper.getCellOfTableBody(dtContainer, rowIndex, colIndex);
      cell_1.doubleClick();
      beakerxPO.kernelIdleIcon.waitForEnabled();
      cellIndex += 1;
      beakerxPO.waitAndCheckOutputTextOfStdout(cellIndex, /0:1=2/);
    });

    it('DoubleClickAction should run tag (by closure) ', function () {
      cellIndex += 1;
      var colIndex = 3;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      var cell_2 = tableHelper.getCellOfTableBody(dtContainer, rowIndex, colIndex);
      cell_2.doubleClick();
      beakerxPO.kernelIdleIcon.waitForEnabled();
      cellIndex += 1;
      beakerxPO.waitAndCheckOutputTextOfStdout(cellIndex, /0:2=3/);
    });
  });

});