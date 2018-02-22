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

describe('Large Integers in Tables ', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    tableHelper = new TableHelperObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/groovy/BigIntsTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe('64-bit Longs ', function () {
    it('Should display 64-bit Longs values ', function () {
      cellIndex = 0;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      tableHelper.dataTablesIsEnabled(dtContainer);
      expect(tableHelper.getAllRowsOfTableBody(dtContainer).length).toEqual(3);
      expect(tableHelper.getCellOfTableBody(dtContainer, 0, 1).getText()).toEqual('1234567890000007');
      expect(tableHelper.getCellOfTableBody(dtContainer, 0, 2).getText()).toEqual('1234567890000077');
      expect(tableHelper.getCellOfTableBody(dtContainer, 0, 3).getText()).toMatch(/14.600/);
    });
  });

  describe('BigNums (arbitrary precision) ', function () {
    it('Should display bignums values ', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      tableHelper.dataTablesIsEnabled(dtContainer);
      expect(tableHelper.getAllRowsOfTableBody(dtContainer).length).toEqual(3);
      expect(tableHelper.getCellOfTableBody(dtContainer, 0, 1).getText()).toEqual('1987654321000007');
      expect(tableHelper.getCellOfTableBody(dtContainer, 0, 2).getText()).toEqual('1544407407417059829');
      expect(tableHelper.getCellOfTableBody(dtContainer, 0, 3).getText()).toMatch(/3.351/);
    });
  });

});