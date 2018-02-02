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

describe('Testing of table (python)', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    tableHelper = new TableHelperObject();
    beakerxPO.runNotebookByUrl('/notebooks/test/notebooks/python/TableAPIPythonTest.ipynb');
  });

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  function checkRowValues(tblElement, rowIndex, cell1, cell2, cell3){
      expect(tableHelper.getTableBodyCell(tblElement, rowIndex, 0).getText()).toMatch(cell1);
      expect(tableHelper.getTableBodyCell(tblElement, rowIndex, 1).getText()).toMatch(cell2);
      expect(tableHelper.getTableBodyCell(tblElement, rowIndex, 2).getText()).toMatch(cell3);
  }

  function checkHeaderValues(tblElement, value1, value2){
    expect(tableHelper.getTableHeaderCell(tblElement, 1).getText()).toMatch(value1);
    expect(tableHelper.getTableHeaderCell(tblElement, 2).getText()).toMatch(value2);
  }

  function checkTableRows(tblElement, lenght){
    expect(tableHelper.getTableAllRows(tblElement).length).toEqual(lenght);
  }

  var cellIndex;

  describe("Data types for TableDisplay", function(){

    it('Can use Array of Integers parameter', function () {
      cellIndex = 0;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      var tBody = tableHelper.getDataTableBody(dtContainer);
      var tHead = tableHelper.getDataTablesScrollHead(dtContainer);
      checkRowValues(tBody, 0, '0', 'a', '100');
      checkTableRows(tBody, 3);
      checkHeaderValues(tHead, 'Key', 'Value');
    });

    it('Can use 2D Array of Integers parameter', function () {
      cellIndex += 1;
      var tBody = beakerxPO.runCellToGetTableElement(cellIndex).$('tbody');
      checkRowValues(tBody, 0, '0', '1', '');
      checkTableRows(tBody, 2);
    });

    it('Can use Array of Decimals parameter', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      var tBody = tableHelper.getDataTableBody(dtContainer);
      var tHead = tableHelper.getDataTablesScrollHead(dtContainer);
      checkRowValues(tBody, 0, '0', 'a', '0\.1');
      checkTableRows(tBody, 3);
      checkHeaderValues(tHead, 'Key', 'Value');
    });

    it('Can use 2D Array of Decimals parameter', function () {
      cellIndex += 1;
      var tBody = beakerxPO.runCellToGetTableElement(cellIndex).$('tbody');
      checkRowValues(tBody, 0, '0', '0\.1', '');
      checkTableRows(tBody, 2);
    });

    it('Can use Array of Strings parameter', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      var tBody = tableHelper.getDataTableBody(dtContainer);
      var tHead = tableHelper.getDataTablesScrollHead(dtContainer);
      checkRowValues(tBody, 0, '0', 'a', 'a a a');
      checkTableRows(tBody, 3);
      checkHeaderValues(tHead, 'Key', 'Value');
    });

    it('Can use 2D Array of Strings parameter', function () {
      cellIndex += 1;
      var tBody = beakerxPO.runCellToGetTableElement(cellIndex).$('tbody');
      checkRowValues(tBody, 0, '0', 'a', '');
      checkTableRows(tBody, 2);
    });

    it('Can use Array of Integer Arrays parameter', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      var tBody = tableHelper.getDataTableBody(dtContainer);
      var tHead = tableHelper.getDataTablesScrollHead(dtContainer);
      checkRowValues(tBody, 0, '0', 'a', '[1, 2, 3]');
      checkTableRows(tBody, 3);
      checkHeaderValues(tHead, 'Key', 'Value');
    });

    it('Can use 2D Array of Integer Arrays parameter', function () {
      cellIndex +=1 ;
      var tBody = beakerxPO.runCellToGetTableElement(cellIndex).$('tbody');
      checkRowValues(tBody, 0, '0', '[1,2,3]', '');
      checkTableRows(tBody, 2);
    });

    it('Can use 2D Array of Integer,Decimal,String,Array Arrays parameter', function () {
      cellIndex +=1 ;
      var tBody = beakerxPO.runCellToGetTableElement(cellIndex).$('tbody');
      checkRowValues(tBody, 0, '0', '100', '200');
      checkRowValues(tBody, 1, '1', '0\.1', '0\.05');
      checkRowValues(tBody, 2, '2', 'a a a', 'b b b');
      checkRowValues(tBody, 3, '3', '[1,2,3]', '[10,20,30]');
      checkTableRows(tBody, 4);
    });

    it('Can use [Integer,Decimal,String,Array] parameter', function () {
      cellIndex +=1 ;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      var tBody = tableHelper.getDataTableBody(dtContainer);
      var tHead = tableHelper.getDataTablesScrollHead(dtContainer);
      checkRowValues(tBody, 0, '0', 'a', '100');
      checkRowValues(tBody, 1, '1', 'b',  '0\.05');
      checkRowValues(tBody, 2, '2', 'c', 'c c c');
      checkRowValues(tBody, 3, '3', 'd', '[1,2,3]');
      checkTableRows(tBody, 4);
      checkHeaderValues(tHead, 'Key', 'Value');
    });

    it('Can use 2D Arrays of [Integer,Decimal,String,Array] parameter', function () {
      cellIndex +=1 ;
      var tBody = beakerxPO.runCellToGetTableElement(cellIndex).$('tbody');
      checkRowValues(tBody, 0, '0', '10', '0\.1');
      checkRowValues(tBody, 1, '1', '100',  '0\.05');
      checkTableRows(tBody, 2);
    });

    it('Can use numbers as name of Array keys (Array parameter)', function () {
      cellIndex +=1 ;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      var tBody = tableHelper.getDataTableBody(dtContainer);
      var tHead = tableHelper.getDataTablesScrollHead(dtContainer);
      checkRowValues(tBody, 0, '0', '10', '20');
      checkRowValues(tBody, 1, '1', '0\.1', '0\.05');
      checkTableRows(tBody, 4);
      checkHeaderValues(tHead, 'Key', 'Value');
    });

    it('Can use numbers as name of Array keys (2D Array parameter)', function () {
      cellIndex +=1 ;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      var tBody = tableHelper.getDataTableBody(dtContainer);
      var tHead = tableHelper.getDataTablesScrollHead(dtContainer);
      checkRowValues(tBody, 0, '0', '10', '0\.1');
      checkRowValues(tBody, 1, '1', '20',  '0\.05');
      checkTableRows(tBody, 2);
      checkHeaderValues(tHead, '10', '0\.1');
    });
  });

  function checkColumnValues(tBody, colIndex, value1, value2, value3){
    tableHelper.getTableBodyCell(tBody, 0, colIndex).click();
    expect(tableHelper.getTableBodyCell(tBody, 0, colIndex).getText()).toMatch(value1);
    expect(tableHelper.getTableBodyCell(tBody, 1, colIndex).getText()).toMatch(value2);
    expect(tableHelper.getTableBodyCell(tBody, 2, colIndex).getText()).toMatch(value3);
    browser.keys("Left");
    browser.keys('\uE000');
  }

  describe("Pandas data types for TableDisplay", function() {

    it('Create pandas DataFrame with all types', function () {
      cellIndex += 1;
      var dtypes = beakerxPO.runCellToGetOutputTextElement(cellIndex).getText();
      expect(dtypes).toMatch(/A\s*bool/);
      expect(dtypes).toMatch(/B\s*int64/);
      expect(dtypes).toMatch(/C\s*uint64/);
      expect(dtypes).toMatch(/D\s*float64/);
      expect(dtypes).toMatch(/E\s*complex64/);
      expect(dtypes).toMatch(/F\s*datetime64.ns./);
      expect(dtypes).toMatch(/G\s*datetime64.ns, US.Eastern./);
      expect(dtypes).toMatch(/H\s*timedelta64.ns./);
      expect(dtypes).toMatch(/I\s*object/);
      expect(dtypes).toMatch(/J\s*category/);
    });

    var tBody;
    var tHead;
    it('TableDisplay should display table from pandas dataFrame', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      tBody = tableHelper.getDataTableBody(dtContainer);
      tHead = tableHelper.getDataTablesScrollHead(dtContainer);
      checkTableRows(tBody, 3);
    });

    it('TableDisplay should display values with "bool" type', function () {
      var colIndex = 1;
      checkColumnValues(tBody, colIndex, /True/, /False/, /True/);
      expect(tHead.getText()).toMatch('A');
    });

    it('TableDisplay should display values with "int64" type', function () {
      var colIndex = 2;
      checkColumnValues(tBody, colIndex, /-10/, /0/, /10/);
      expect(tHead.getText()).toMatch('B');
    });

    it('TableDisplay should display values with "uint64" type', function () {
      var colIndex = 3;
      checkColumnValues(tBody, colIndex, /100/, /0/, /10/);
      expect(tHead.getText()).toMatch('C');
    });

    it('TableDisplay should display values with "float64" type', function () {
      var colIndex = 4;
      checkColumnValues(tBody, colIndex, /-10.0/, /0.0/, /10.0/);
      expect(tHead.getText()).toMatch('D');
    });

    it('TableDisplay should display  values with "complex64" type', function () {
      var colIndex = 5;
      checkColumnValues(tBody, colIndex, /-10.1\+5j/, /(0.2\+0j)/, /(10.3-3j)/);
      expect(tHead.getText()).toMatch('E');
    });

    it('TableDisplay should display values with "datetime64[ns]" type', function () {
      var colIndex = 6;
      checkColumnValues(tBody, colIndex, /20130101 \d\d:30:00.000/, /20130102 \d\d:30:00.000/, /20130103 \d\d:30:00.000/);
      expect(tHead.getText()).toMatch('F');
    });

    it('TableDisplay should display values with "datetime64[ns, timeZone]" type', function () {
      var colIndex = 7;
      checkColumnValues(tBody, colIndex, /20130101 \d\d:30:00.000/, /20130102 \d\d:30:00.000/, /20130103 \d\d:30:00.000/);
      expect(tHead.getText()).toMatch('G');
    });

    it('TableDisplay should display values with "timedelta64[ns]" type', function () {
      var colIndex = 8;
      checkColumnValues(tBody, colIndex, /\d+ nanoseconds/, /\d+ nanoseconds/, /\d+ nanoseconds/);
      expect(tHead.getText()).toMatch('H');
    });

    it('TableDisplay should display values with "object" type', function () {
      var colIndex = 9;
      checkColumnValues(tBody, colIndex, /tst/, /123/, /0.123/);
      expect(tHead.getText()).toMatch('I');
    });

    it('TableDisplay should display values with "category" type', function () {
      var colIndex = 10;
      checkColumnValues(tBody, colIndex, /A/, /B/, /C/);
      expect(tHead.getText()).toMatch('J');
    });
  });

});