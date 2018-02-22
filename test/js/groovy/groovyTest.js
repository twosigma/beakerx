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
var PlotHelperObject = require('../plot.helper.js');
var TableHelperObject = require('../table.helper.js');
var beakerxPO;
var plotHelper;
var tableHelper;

describe('Groovy base tests. ', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    plotHelper = new PlotHelperObject();
    tableHelper = new TableHelperObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/groovy/GroovyTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe('Define local and global variables. ', function () {
    it('Execute result output contains "2". ', function () {
      cellIndex = 0;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /2/);
    });
  });

  describe('Run cell with error. ', function () {
    it('Stderr output contains "groovy.lang.MissingPropertyException". ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfStderr(cellIndex, /groovy.lang.MissingPropertyException/);
    });
  });

  describe('Call global variable. ', function () {
    it('Execute result output contains "2". ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /2/);
    });
  });

  describe('Define groovy closure. ', function () {
    it('Execute result output contains "run_closure". ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /run_closure/);
    });
  });

  describe('Call defined closure with number argument. ', function () {
    it('Execute result output contains "8". ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /8/);
    });
  });

  describe('Call defined closure with string argument. ', function () {
    it('Execute result output contains "Multiplying Strings!Multiplying Strings!". ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /Multiplying Strings!Multiplying Strings!/);
    });
  });

  describe('Call groovy method of Math package. ', function () {
    it('Execute result output contains "9.265". ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex,  /9.265/);
    });
  });

  function checkCyrilicString(str){
    expect(str.charCodeAt(0).toString(16)).toEqual('44d');
    expect(str.charCodeAt(1).toString(16)).toEqual('44e');
    expect(str.charCodeAt(2).toString(16)).toEqual('44f');
  }

  describe('Cyrillic symbols (Groovy). ', function () {
    var dtContainer;

    it('Stdout output contains UTF-8 hex string. ', function () {
      cellIndex += 1;
      dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfStdout(cellIndex, /d18dd18ed18f/);
    });

    it('Plot title is cyrillic (cp1521). ', function () {
      checkCyrilicString(plotHelper.getPlotTitle(dtContainer).getText());
    });

    it('Plot x label is cyrillic (utf8 from cp1521). ', function () {
      checkCyrilicString(plotHelper.getXLabel(dtContainer).getText());
    });

    it('Plot y label is cyrillic (utf-8). ', function () {
      checkCyrilicString(plotHelper.getYLabel(dtContainer).getText());
    });
  });

  describe('getCodeCells(tag) method. ', function () {

    it('Tag cell output contains "5". ', function(){
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex,  /5/);
    });

    it('Output contains table. ', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      tableHelper.dataTablesIsEnabled(dtContainer);
      expect(tableHelper.getAllRowsOfTableBody(dtContainer)[0].getText())
        .toMatch(/"text.plain":"5"/);
    });
  });

});