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

describe('Testing of table Actions', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/notebooks/groovy/TableActionsTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  function getTableElement(index){
    return beakerxPO.getCodeCellByIndex(index).$('div.dataTables_scrollBody');
  }

  describe("ContextMenuItem action", function(){

    it('ContextMenuItem should change table cell value', function () {
      var tblcell_index = 1;
      var tblElement = beakerxPO.runCellToGetTableElement(0);
      var cell_0 = tblElement.$$('td.ui-selectee')[tblcell_index];
      var value1 = parseInt(cell_0.getText());
      cell_0.rightClick();
      browser.click('div.p-Menu-itemLabel=plusOne');
      beakerxPO.kernelIdleIcon.waitForEnabled();
      var value2 = parseInt(getTableElement(0).$$('td.ui-selectee')[tblcell_index].getText());
      expect(value2).toBeGreaterThan(value1);
    });

    it('ContextMenuItem should run tag (by string)', function () {
      var cell_1 = getTableElement(0).$$('td.ui-selectee')[2];
      cell_1.rightClick();
      browser.click('div.p-Menu-itemLabel=tag1ByStr');
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.checkCellOutputText(1, '0:1=2');
    });

    it('ContextMenuItem should run tag (by closure)', function () {
      var cell_2 = getTableElement(0).$$('td.ui-selectee')[3];
      cell_2.rightClick();
      browser.click('div.p-Menu-itemLabel=tag1ByClosure');
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.checkCellOutputText(1, '0:2=3');
    });

  });

  describe("DoubleClickAction action", function(){

    it('DoubleClickAction should change table cell value', function () {
      var tblcell_index = 1;
      var cell_0 = beakerxPO.runCellToGetTableElement(2).$$('td.ui-selectee')[tblcell_index];
      var value1 = parseInt(cell_0.getText());
      cell_0.doubleClick();
      beakerxPO.kernelIdleIcon.waitForEnabled();
      var value2 = parseInt(getTableElement(2).$$('td.ui-selectee')[tblcell_index].getText());
      expect(value2).toBeGreaterThan(value1);
    });

    it('DoubleClickAction should run tag (by string)', function () {
      var tblElement = beakerxPO.runCellToGetTableElement(3);
      var cell_1 = tblElement.$$('td.ui-selectee')[2];
      cell_1.doubleClick();
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.checkCellOutputText(4, '0:1=2');
    });

    it('DoubleClickAction should run tag (by closure)', function () {
      var tblElement = beakerxPO.runCellToGetTableElement(5);
      var cell_1 = tblElement.$$('td.ui-selectee')[3];
      cell_1.doubleClick();
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.checkCellOutputText(6, '0:2=3');
    });
  });

});