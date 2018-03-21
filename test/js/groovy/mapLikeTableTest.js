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
var TableHelperObject = require('../table.helper.js');
var beakerxPO;
var tableHelper;

describe('(Groovy) Testing Map Like Tables', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    tableHelper = new TableHelperObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/groovy/MapLikeTableTest.ipynb');
  });

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  function checkRowValues(dtContainer, rowIndex, cell1, cell2, cell3) {
    expect(tableHelper.getCellOfTableBody(dtContainer, rowIndex, 0).getText()).toMatch(cell1);
    expect(tableHelper.getCellOfTableBody(dtContainer, rowIndex, 1).getText()).toMatch(cell2);
    expect(tableHelper.getCellOfTableBody(dtContainer, rowIndex, 2).getText()).toMatch(cell3);
  }

  function checkHeaderValues(dtContainer, value1, value2) {
    expect(tableHelper.getCellOfTableHeader(dtContainer, 1).getText()).toMatch(value1);
    expect(tableHelper.getCellOfTableHeader(dtContainer, 2).getText()).toMatch(value2);
  }

  function checkTableRows(dtContainer, lenght) {
    expect(tableHelper.getAllRowsOfTableBody(dtContainer).length).toEqual(lenght);
  }

  var cellIndex;

  describe('Table display', function () {
    it('A basic table is rendered correctly', function () {
      cellIndex = 0;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);

      checkHeaderValues(dtContainer, 'Key', 'Value');
      checkRowValues(dtContainer, 0, '0', 'x', '1');
      checkRowValues(dtContainer, 1, '1', 'y', '2');
    });

    it('An ArrayList is rendered correctly', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);

      checkHeaderValues(dtContainer, 'x', 'y');
      checkRowValues(dtContainer, 0, '0', '1', '2');
      checkRowValues(dtContainer, 1, '1', '3', '4');
    });

    it('A Map is rendered correctly', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);

      checkHeaderValues(dtContainer, 'x', 'y');
      checkRowValues(dtContainer, 0, '0', '1', '2');
      checkRowValues(dtContainer, 1, '1', '3', '4');
    });

    it('A Map is rendered correctly', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);

      checkHeaderValues(dtContainer, 'test', 'test2');
      checkRowValues(dtContainer, 0, '0', '1', '2');
      checkRowValues(dtContainer, 1, '1', '2', '4');
      checkRowValues(dtContainer, 2, '2', '3', '6');
    });

    it('A List inside a List is rendered correctly', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);

      checkHeaderValues(dtContainer, 'Key', 'Value');
      checkRowValues(dtContainer, 0, '0', '1', '[[1,2,3],[2,3,4]]');
    });

    it('A Map inside a List is rendered correctly', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);

      checkHeaderValues(dtContainer, 'Key', 'Value');
      checkRowValues(dtContainer, 0, '0', '1', '{"num1":1,"num2":2}');
    });
  });
});