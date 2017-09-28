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

describe('Testing of table Actions', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/notebooks/test/notebooks/TableActionsTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  function checkCellOutput(index, text){
    var codeCell = beakerxPO.getCodeCellByIndex(index);
    codeCell.scroll();
    var outputText = codeCell.$('.output_subarea.output_text');
    outputText.waitForEnabled();
    expect(outputText.getText()).toMatch(text);
  }

  function getTableElement(index){
    return beakerxPO.getCodeCellByIndex(index).$('div.dataTables_scrollBody');
  }

  describe("ContextMenuItem action", function(){

    it('ContextMenuItem should change table cell value', function () {
      var index = 1;
      var tblElement = beakerxPO.runCellToGetTableElement(0);
      var cell_0 = tblElement.$$('td.ui-selectee')[index];
      var value1 = parseInt(cell_0.getText());
      cell_0.rightClick();
      browser.click('span=plusOne');
      beakerxPO.kernelIdleIcon.waitForEnabled();
      var value2 = parseInt(getTableElement(0).$$('td.ui-selectee')[index].getText());
      expect(value2).toBeGreaterThan(value1);
    });

    it('ContextMenuItem should run tag (by string)', function () {
      var cell_1 = getTableElement(0).$$('td.ui-selectee')[2];
      cell_1.rightClick();
      browser.click('span=tag1ByStr');
      beakerxPO.kernelIdleIcon.waitForEnabled();
      checkCellOutput(1, '0:1=2');
    });
  });

});