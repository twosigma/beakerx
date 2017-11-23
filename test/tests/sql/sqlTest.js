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

describe('SQL Examples notebook', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/notebooks/test/notebooks/sql/SQLTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  describe('Create and select table (H2 database)', function () {
    it('Output contains table', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCodeCellByIndex(0);
      beakerxPO.runCodeCellByIndex(1);
      var dtContainer = beakerxPO.runCellToGetDtContainer(2);
      beakerxPO.dataTablesIsEnabled(dtContainer);
    }, 2);
  });

  describe('Autocomplete cell', function () {
    it('Autocomplete list is not empty', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      var codeCell = beakerxPO.getCodeCellByIndex(3);
      codeCell.scroll();
      codeCell.click();
      browser.keys("Tab");
      var completeList = $$('#complete > select > option');
      expect(completeList.length).toBeGreaterThan(0);
    }, 2);
  });

});