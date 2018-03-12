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

describe('Tests for combination of code and magics. ', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    tableHelper = new TableHelperObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/groovy/TablesawTest.ipynb');
  });

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  function checkTableCell(dtContainer, rowIndex, columnIndex, textValue) {
    expect(tableHelper.getCellOfTableBody(dtContainer, rowIndex, columnIndex).getText()).toMatch(textValue);
  };

  function checkTableHead(dtContainer, columnIndex, textValue){
    expect(tableHelper.getCellOfTableHeader(dtContainer, columnIndex).getText()).toMatch(textValue);
  };

  function checkRowValues(dtContainer, rowIndex, values){
    for(i = 1; i < values.length; i++){
      checkTableCell(dtContainer, rowIndex, i, values[i - 1]);
    };
  };

  function checkHeaderValues(dtContainer, headers){
    for(i = 1; i < headers.length; i++){
      checkTableHead(dtContainer, i, headers[i - 1]);
    };
  };

  describe('Import tablesaw jars. ', function () {
    it('Output contains names of jars. ', function () {
      cellIndex = 0;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfStdout(cellIndex, /tablesaw-plot/);
      beakerxPO.waitAndCheckOutputTextOfStdout(cellIndex, /tablesaw-smile/);
      beakerxPO.waitAndCheckOutputTextOfStdout(cellIndex, /tablesaw-beakerx/);
    });
  });

  describe('Call tech.tablesaw.beakerx.TablesawDisplayer.register() method. ', function () {
    it('Output displays "null". ', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex, /null/);
    });
  });

  describe('Call table.read() method. ', function () {
    it('Should displays table. ', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      checkHeaderValues(dtContainer, [/Date/, /Time/, /State/, /State No/, /Scale/]);
      checkRowValues(dtContainer, 0, [/2014/, /\d\d:37:00/, /GA/, /0.0/, /0.0/]);
    });
  });

  describe('Call table.structure() method. ', function () {
    it('Should displays table structure. ', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      checkHeaderValues(dtContainer, [/Index/, /Column Name/, /Column Type/]);
      checkRowValues(dtContainer, 0, [/0.0/, /Date/, /LOCAL_DATE/]);
    });
  });

  describe('Call table.columnNames() method. ', function () {
    it('Should displays column names. ', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex,
        /Date.*Time.*State.*State No.*Scale.*Injuries.*Fatalities.*Start Lat.*Start Lon.*Length.*Width/);
    });
  });

  describe('Call table.shape() method. ', function () {
    it('Should displays the row and column counts. ', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex, /908 rows.*11 cols/);
    });
  });

  describe('Call table.first(10) method. ', function () {
    it('Should displays the first 10 rows. ', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      expect(tableHelper.getAllRowsOfTableBody(dtContainer).length).toEqual(10);
    });
  });

  describe('Select all columns by "float" type. ', function () {
    it('Should display 4 columns. ', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      expect(tableHelper.getAllRowsOfTableBody(dtContainer).length).toEqual(4);
      checkHeaderValues(dtContainer, [/Index/, /Column Name/, /Column Type/]);
      checkRowValues(dtContainer, 0, [/7.0/, /Start Lat/, /FLOAT/]);
    });
  });

  describe('Call table.summary() method. ', function () {
    it('Should summarize the data in each column. ', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex, /Table summary for: tornadoes_2014.csv/);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex, /Count.*908/);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex, /GA.*32 /);
    });
  });

  describe('Mapping operations (add column). ', function () {
    it('Should display new column name. ', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex,
        /Date.*Time.*State.*State No.*Scale.*Injuries.*Fatalities.*Start Lat.*Start Lon.*Length.*Width.*Date month/);
    });
  });

  describe('Sorting by column. ', function () {
    it('Should sort "Fatalities" column. ', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      checkTableHead(dtContainer, 7, /Fatalities/);
      checkTableCell(dtContainer, 0, 7, /16.0/);
      checkTableCell(dtContainer, 1, 7, /10.0/);
      checkTableCell(dtContainer, 2, 7, /4.0/);
    });
  });

  describe('Descriptive statistics. ', function () {
    it('Should display summary statistic. ', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      checkHeaderValues(dtContainer, [/Measure/, /Value/]);
      checkRowValues(dtContainer, 0, [/n/, /908.0/]);
      checkRowValues(dtContainer, 1, [/sum/, /48.0/]);
    });
  });

  describe('Performing totals and sub-totals. ', function () {
    it('Should display totals and sub-totals. ', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      checkHeaderValues(dtContainer, [/Scale/, /Median.*Injuries/]);
      checkRowValues(dtContainer, 0, [/0.0/, /0.0/]);
      checkRowValues(dtContainer, 4, [/4.0/, /2.0/]);
    });
  });

  describe('Call CrossTab.xCount() method. ', function () {
    it('Should display cross tabs. ', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      checkHeaderValues(dtContainer, [/labels/, /0/, /1/]);
      checkRowValues(dtContainer, 0, [/AL/, /12.0/, /32.0/]);
      checkRowValues(dtContainer, 1, [/AR/, /5.0/, /12.0/]);
    });
  });

});