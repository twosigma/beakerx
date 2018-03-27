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
    beakerxPO.openUIWindow();
  });

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  function checkHeaderValues(dtContainer, headerCellIndex, value) {
    var headers = tableHelper.getAllCellsOfTableHeader(dtContainer);
    expect(headers[headerCellIndex].getText()).toMatch(value);
  }

  function checkRowValues(dtContainer, rowCellIndex, value) {
    var rows = tableHelper.getAllRowsOfTableBody(dtContainer
    );

    expect(rows[rowCellIndex].getText()).toBe(value);
  }

  var cellIndex;

  describe('UI options. ', function () {
    it("Disable PhosphorJS DataGrid for TableDisplay Widget. ", function () {
      beakerxPO.setDataGridForTable(false, false);
    });
  });

  describe('Table display', function () {
    it('A basic table is rendered correctly', function () {
      cellIndex = 0;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);

      checkHeaderValues(dtContainer, 1, 'Key');
      checkHeaderValues(dtContainer, 2, 'Value');

      checkRowValues(dtContainer, 0, '0 x 1');
      checkRowValues(dtContainer, 1, '1 y 2');
    });

    it('An ArrayList is rendered correctly', function () {
      cellIndex += 1;
      dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);

      checkHeaderValues(dtContainer, 1, 'x');
      checkHeaderValues(dtContainer, 2, 'y');

      checkRowValues(dtContainer, 0, '0 1 2');
      checkRowValues(dtContainer, 1, '1 3 4');
    });

    it('A Map is rendered correctly', function () {
      cellIndex += 1;
      dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);

      checkHeaderValues(dtContainer, 1, 'x');
      checkHeaderValues(dtContainer, 2, 'y');

      checkRowValues(dtContainer, 0, '0 1 2');
      checkRowValues(dtContainer, 1, '1 3 4');
    });

    it('A Map is rendered correctly', function () {
      cellIndex += 1;
      dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);

      checkHeaderValues(dtContainer, 1, 'test');
      checkHeaderValues(dtContainer, 2, 'test2');

      checkRowValues(dtContainer, 0, '0 1 2');
      checkRowValues(dtContainer, 1, '1 2 4');
      checkRowValues(dtContainer, 2, '2 3 6');
    });

    it('A List inside a List is rendered correctly', function () {
      cellIndex += 1;
      dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);

      checkHeaderValues(dtContainer, 1, 'Key');
      checkHeaderValues(dtContainer, 2, 'Value');

      checkRowValues(dtContainer, 0, '0 1 [[1,2,3],[2,3,4]]');
    });

    it('A Map inside a List is rendered correctly', function () {
      cellIndex += 1;
      dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);

      checkHeaderValues(dtContainer, 1, 'Key');
      checkHeaderValues(dtContainer, 2, 'Value');

      checkRowValues(dtContainer, 0, '0 1 {"num1":1,"num2":2}');
    });

    it('Display a 3-column table', function () {
      cellIndex += 1;
      dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);

      checkHeaderValues(dtContainer, 1, 'col1');
      checkHeaderValues(dtContainer, 2, 'col2');
      checkHeaderValues(dtContainer, 3, 'col3');

      checkRowValues(dtContainer, 0, '0 This & that This / that This > that');

    });

    it('Display object is rendered correctly', function () {
      cellIndex += 1;
      dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);

      checkHeaderValues(dtContainer, 1, 'myclass');
      checkRowValues(dtContainer, 0, '0 {"value":"print this"}');
    });
  });
});
