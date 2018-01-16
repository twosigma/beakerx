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

describe('big ints tests', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/notebooks/test/notebooks/groovy/BigIntsTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  describe('64-bit Longs labels and values', function () {

    it('Table has proper column labels', function () {
      var tableColumnLabel;
      var cellText;
      var codeCell = beakerxPO.runCodeCellByIndex(0);
      beakerxPO.kernelIdleIcon.waitForEnabled();

      tableColumnLabel = beakerxPO.getTableColumnLabel(0, 0);
      cellText = tableColumnLabel.getText();
      expect(cellText).toMatch('time');

      tableColumnLabel = beakerxPO.getTableColumnLabel(0, 1);
      cellText = tableColumnLabel.getText();
      expect(cellText).toMatch('next_time');

      tableColumnLabel = beakerxPO.getTableColumnLabel(0, 2);
      cellText = tableColumnLabel.getText();
      expect(cellText).toMatch('temp');
      });

    it('Table has proper cell values', function () {
      var tableCell;
      var cellText;
      tableCell = beakerxPO.getTableCell(0, 0, 1);
      cellText = tableCell.getText();
      expect(cellText).toMatch('1912276048007');

      tableCell = beakerxPO.getTableCell(0, 0, 2);
      cellText = tableCell.getText();
      expect(cellText).toMatch('1912276048077');

      tableCell = beakerxPO.getTableCell(0, 0, 3);
      cellText = tableCell.getText();
      expect(cellText).toMatch('14.600');

      tableCell = beakerxPO.getTableCell(0, 1, 1);
      cellText = tableCell.getText();
      expect(cellText).toMatch('1912276048014');

      tableCell = beakerxPO.getTableCell(0, 1, 2);
      cellText = tableCell.getText();
      expect(cellText).toMatch('3824552096176');

      tableCell = beakerxPO.getTableCell(0, 1, 3);
      cellText = tableCell.getText();
      expect(cellText).toMatch('18.100');

      tableCell = beakerxPO.getTableCell(0, 2, 1);
      cellText = tableCell.getText();
      expect(cellText).toMatch('1912276048021');

      tableCell = beakerxPO.getTableCell(0, 2, 2);
      cellText = tableCell.getText();
      expect(cellText).toMatch('5736828144297');

      tableCell = beakerxPO.getTableCell(0, 2, 3);
      cellText = tableCell.getText();
      expect(cellText).toMatch('23.600');
    });
  });

  describe('BigNums (arbitrary precision) labels and values', function () {

    it('Table has proper column labels', function () {
      var tableColumnLabel;
      var cellText;
      beakerxPO.runCodeCellByIndex(1);
      beakerxPO.kernelIdleIcon.waitForEnabled();

      tableColumnLabel = beakerxPO.getTableColumnLabel(1, 0);
      cellText = tableColumnLabel.getText();
      expect(cellText).toMatch('time');

      tableColumnLabel = beakerxPO.getTableColumnLabel(1, 1);
      cellText = tableColumnLabel.getText();
      expect(cellText).toMatch('next_time');

      tableColumnLabel = beakerxPO.getTableColumnLabel(1, 2);
      cellText = tableColumnLabel.getText();
      expect(cellText).toMatch('temp');
    });

    it('Table has proper cell values', function () {
      var tableCell;
      var cellText;
      tableCell = beakerxPO.getTableCell(1, 0, 1);
      cellText = tableCell.getText();
      expect(cellText).toMatch('-915537047993');

      tableCell = beakerxPO.getTableCell(1, 0, 2);
      cellText = tableCell.getText();
      expect(cellText).toMatch('-711372286236171');

      tableCell = beakerxPO.getTableCell(1, 0, 3);
      cellText = tableCell.getText();
      expect(cellText).toMatch('3.351');

      tableCell = beakerxPO.getTableCell(1, 1, 1);
      cellText = tableCell.getText();
      expect(cellText).toMatch('-915537047986');

      tableCell = beakerxPO.getTableCell(1, 1, 2);
      cellText = tableCell.getText();
      expect(cellText).toMatch('-812996898545856');

      tableCell = beakerxPO.getTableCell(1, 1, 3);
      cellText = tableCell.getText();
      expect(cellText).toMatch('2.355');

      tableCell = beakerxPO.getTableCell(1, 2, 1);
      cellText = tableCell.getText();
      expect(cellText).toMatch('-915537047979');

      tableCell = beakerxPO.getTableCell(1, 2, 2);
      cellText = tableCell.getText();
      expect(cellText).toMatch('-914621510853099');

      tableCell = beakerxPO.getTableCell(1, 2, 3);
      cellText = tableCell.getText();
      expect(cellText).toMatch('2.728');
    });
  });

});