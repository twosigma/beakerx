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
    beakerxPO.runNotebookByUrl('/test/ipynb/python/TableAPIPythonTest.ipynb');
  });

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  function checkRowValues(dtContainer, rowIndex, cell1, cell2, cell3){
      expect(tableHelper.getCellOfTableBody(dtContainer, rowIndex, 0).getText()).toMatch(cell1);
      expect(tableHelper.getCellOfTableBody(dtContainer, rowIndex, 1).getText()).toMatch(cell2);
      expect(tableHelper.getCellOfTableBody(dtContainer, rowIndex, 2).getText()).toMatch(cell3);
  }

  function checkHeaderValues(dtContainer, value1, value2){
    expect(tableHelper.getCellOfTableHeader(dtContainer, 1).getText()).toMatch(value1);
    expect(tableHelper.getCellOfTableHeader(dtContainer, 2).getText()).toMatch(value2);
  }

  function checkTableRows(dtContainer, lenght){
    expect(tableHelper.getAllRowsOfTableBody(dtContainer).length).toEqual(lenght);
  }

  var cellIndex;

  describe("Data types for TableDisplay", function(){

    it('Can use Array of Integers parameter', function () {
      cellIndex = 0;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      checkRowValues(dtContainer, 0, '0', 'a', '100');
      checkTableRows(dtContainer, 3);
      checkHeaderValues(dtContainer, 'Key', 'Value');
    });

    it('Can use 2D Array of Integers parameter', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      checkRowValues(dtContainer, 0, '0', '1', '');
      checkTableRows(dtContainer, 2);
    });

    it('Can use Array of Decimals parameter', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      checkRowValues(dtContainer, 0, '0', 'a', '0\.1');
      checkTableRows(dtContainer, 3);
      checkHeaderValues(dtContainer, 'Key', 'Value');
    });

    it('Can use 2D Array of Decimals parameter', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      checkRowValues(dtContainer, 0, '0', '0\.1', '');
      checkTableRows(dtContainer, 2);
    });

    it('Can use Array of Strings parameter', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      checkRowValues(dtContainer, 0, '0', 'a', 'a a a');
      checkTableRows(dtContainer, 3);
      checkHeaderValues(dtContainer, 'Key', 'Value');
    });

    it('Can use 2D Array of Strings parameter', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      checkRowValues(dtContainer, 0, '0', 'a', '');
      checkTableRows(dtContainer, 2);
    });

    it('Can use Array of Integer Arrays parameter', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      checkRowValues(dtContainer, 0, '0', 'a', '[1, 2, 3]');
      checkTableRows(dtContainer, 3);
      checkHeaderValues(dtContainer, 'Key', 'Value');
    });

    it('Can use 2D Array of Integer Arrays parameter', function () {
      cellIndex +=1 ;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      checkRowValues(dtContainer, 0, '0', '[1,2,3]', '');
      checkTableRows(dtContainer, 2);
    });

    it('Can use 2D Array of Integer,Decimal,String,Array Arrays parameter', function () {
      cellIndex +=1 ;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      checkRowValues(dtContainer, 0, '0', '100', '200');
      checkRowValues(dtContainer, 1, '1', '0\.1', '0\.05');
      checkRowValues(dtContainer, 2, '2', 'a a a', 'b b b');
      checkRowValues(dtContainer, 3, '3', '[1,2,3]', '[10,20,30]');
      checkTableRows(dtContainer, 4);
    });

    it('Can use [Integer,Decimal,String,Array] parameter', function () {
      cellIndex +=1 ;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      checkRowValues(dtContainer, 0, '0', 'a', '100');
      checkRowValues(dtContainer, 1, '1', 'b',  '0\.05');
      checkRowValues(dtContainer, 2, '2', 'c', 'c c c');
      checkRowValues(dtContainer, 3, '3', 'd', '[1,2,3]');
      checkTableRows(dtContainer, 4);
      checkHeaderValues(dtContainer, 'Key', 'Value');
    });

    it('Can use 2D Arrays of [Integer,Decimal,String,Array] parameter', function () {
      cellIndex +=1 ;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      checkRowValues(dtContainer, 0, '0', '10', '0\.1');
      checkRowValues(dtContainer, 1, '1', '100',  '0\.05');
      checkTableRows(dtContainer, 2);
    });

    it('Can use numbers as name of Array keys (Array parameter)', function () {
      cellIndex +=1 ;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      checkRowValues(dtContainer, 0, '0', '10', '20');
      checkRowValues(dtContainer, 1, '1', '0\.1', '0\.05');
      checkTableRows(dtContainer, 4);
      checkHeaderValues(dtContainer, 'Key', 'Value');
    });

    it('Can use numbers as name of Array keys (2D Array parameter)', function () {
      cellIndex +=1 ;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      checkRowValues(dtContainer, 0, '0', '10', '0\.1');
      checkRowValues(dtContainer, 1, '1', '20',  '0\.05');
      checkTableRows(dtContainer, 2);
      checkHeaderValues(dtContainer, '10', '0\.1');
    });
  });

  describe("TableDisplay(pandas DataFrame)", function() {
    it('TableDisplay should display table from pandas dataFrame', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      expect(tableHelper.getCellOfTableBody(dtContainer, 0, 1).getText()).toMatch('24');
      expect(tableHelper.getCellOfTableBody(dtContainer, 1, 1).getText()).toMatch('36L');
    });
  });

  describe('Pandas read csv ', function(){
    it('Should display table ', function() {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      expect(tableHelper.getCellOfTableHeader(dtContainer, 1).getText()).toMatch(/m3/);
      expect(tableHelper.getCellOfTableHeader(dtContainer, 8).getText()).toMatch(/time/);
      expect(tableHelper.getCellOfTableBody(dtContainer, 0, 1).getText()).toMatch(/7.898/);
      expect(tableHelper.getCellOfTableBody(dtContainer, 0, 8).getText()).toMatch(/1990-01-30 19:00:00/);
      expect(dtContainer.$('div.bko-table-selector').isEnabled()).toBeTruthy();
      expect(dtContainer.$('div.bko-table-pagenum').isEnabled()).toBeTruthy();
      expect(dtContainer.$('div.bko-table-use-pagination').isEnabled()).toBeTruthy();
    });
  });

  describe('Set alignment provider for "m3" column ', function () {
    var dtContainer2;

    it('Column "y30" has default alignment equals "right" ', function() {
      cellIndex += 1;
      dtContainer2 = beakerxPO.runCellToGetDtContainer(cellIndex);
      expect(tableHelper.getCellOfTableHeader(dtContainer2, 1).getText()).toMatch(/m3/);
      expect(tableHelper.getCellOfTableBody(dtContainer2, 0, 1).getAttribute('class')).toMatch(/dtcenter/);
    });

    it('Column "m3" has center alignment ', function() {
      expect(tableHelper.getCellOfTableHeader(dtContainer2, 1).getText()).toMatch(/m3/);
      expect(tableHelper.getCellOfTableBody(dtContainer2, 0, 1).getAttribute('class')).toMatch(/dtcenter/);
    });
  });


  describe('Set renderer for "y10" column ', function () {
    var dtContainer2;

    it('Column "y10" has bar element ', function() {
      dtContainer2 = beakerxPO.getDtContainerByIndex(cellIndex);
      expect(tableHelper.getCellOfTableHeader(dtContainer2, 6).getText()).toMatch(/y10/);
      expect(tableHelper.getCellOfTableBody(dtContainer2, 0, 6).$('.dt-bar-data-cell').isEnabled()).toBeTruthy();
    });

    it('Column "y10" doesn\'t have text element ', function() {
      expect(tableHelper.getCellOfTableBody(dtContainer2, 0, 6).$('.dt-cell-text').isVisible()).toBeFalsy();
    });
  });

  describe('Set renderer for "double" type ', function () {
    var dtContainer2;

    it('Column "y3" has bar element ', function() {
      dtContainer2 = beakerxPO.getDtContainerByIndex(cellIndex);
      expect(tableHelper.getCellOfTableHeader(dtContainer2, 7).getText()).toMatch(/y3/);
      expect(tableHelper.getCellOfTableBody(dtContainer2, 0, 7).isExisting('.dt-bar-data-cell')).toBeTruthy();
    });

    it('Column "time" doesn\'t have bar element ', function() {
      expect(tableHelper.getCellOfTableHeader(dtContainer2, 8).getText()).toMatch(/time/);
      expect(tableHelper.getCellOfTableBody(dtContainer2, 0, 8).isExisting('.dt-bar-data-cell')).toBeFalsy();
    });
  });

  describe('Set string format for times ', function () {
    it('Column "time" display date by "DAYS" format ', function() {
      cellIndex += 1;
      var dtContainer3 = beakerxPO.runCellToGetDtContainer(cellIndex);
      expect(tableHelper.getCellOfTableHeader(dtContainer3, 8).getText()).toMatch(/time/);
      expect(tableHelper.getCellOfTableBody(dtContainer3, 0, 8).getText()).toMatch('19900330');
    });
  });

  describe('Set string format for "double" type ', function () {
    it('Column "y30" display 4 digits after decimal point ', function() {
      var dtContainer3 = beakerxPO.getDtContainerByIndex(cellIndex);
      expect(tableHelper.getCellOfTableHeader(dtContainer3, 2).getText()).toMatch(/y30/);
      expect(tableHelper.getCellOfTableBody(dtContainer3, 0, 2).getText()).toMatch(/\d.\d{3}/);
    });
  });

  describe('Set string format for "y3" column ', function () {
    it('Column "y3" display only integer part of number ', function() {
      var dtContainer3 = beakerxPO.getDtContainerByIndex(cellIndex);
      expect(tableHelper.getCellOfTableHeader(dtContainer3, 1).getText()).toMatch(/m3/);
      expect(tableHelper.getCellOfTableBody(dtContainer3, 0, 1).getText()).toMatch(/\d{1}/);
    });
  });

});