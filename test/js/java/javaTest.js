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

describe('Java base tests ', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/java/JavaTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe('Define java class ', function () {
    it('Execute result output contains "test.beaker.BeakerTest". ', function () {
      cellIndex = 0;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /test.beaker.BeakerTest/);
    });
  });

  describe('Call defined java class ', function () {
    it('Execute result output contains "Today:" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /Today:/);
    });
  });

  describe('Run java code that create Plot ', function () {
    it('PlotLegendContainer is enabled ', function () {
      cellIndex += 1;
      var dtContainer = beakerxPO.runCellToGetDtContainer(cellIndex);
      beakerxPO.plotLegendContainerIsEnabled(dtContainer);
    });
  });

  describe('Define java interface ', function () {
    it('Execute result output contains "test.beaker.DateGetter" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /test.beaker.DateGetter/);
    });
  });

  describe('Extend java class ', function () {
    it('Execute result output contains "test.beaker.DG2" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /test.beaker.DG2/);
    });
  });

  describe('Add and use jar ', function () {
    it('Add jar by %classpath magic ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfWidget(cellIndex, /Added jar:.+BeakerXClasspathTest\.jar.+/);
    });
    it('Check path of added jar ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfStdout(cellIndex,
        /beakerx.test.ipynb.*\s*.*BeakerXClasspathTest.jar exists in this folder/);
    });
    it('Call added jar ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfStdout(cellIndex, /static_123.*\s*.*object_123/);
    });
  });

  describe('(Java) Press "Tab" to autocomplete code ', function(){
    it('Autocomplete list is not empty ', function(){
      cellIndex += 1;
      var codeCell = beakerxPO.getCodeCellByIndex(cellIndex);
      var completeList = beakerxPO.callAutocompleteAndGetItsList(codeCell, 'imp');
      expect(completeList.length).toBeGreaterThan(0);
    });
  });

  describe('(Java) Press "Shift + Tab" to display doc ', function(){
    it('doc tooltip is not empty ', function(){
      cellIndex += 1;
      var codeCell = beakerxPO.getCodeCellByIndex(cellIndex);
      var tooltip = beakerxPO.callDocAndGetItsTooltip(codeCell, 'Plot');
      expect(tooltip.getText()).toMatch(/com.twosigma.beakerx.chart.xychart.Plot/);
    });
  });

});