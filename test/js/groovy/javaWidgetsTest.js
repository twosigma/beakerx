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

describe('Java widgets notebook test ', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/groovy/JavaWidgetsTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe('IntSlider widget ', function () {
    var wdgIndex;
    it('Cell has IntSlider widget ', function () {
      cellIndex = 0;
      wdgIndex = cellIndex;
      var widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.$('div.slider-container').isEnabled()).toBeTruthy();
    });

    it('Widget value = 60 ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /60/);
      var codeCell = beakerxPO.getCodeCellByIndex(wdgIndex);
      expect(codeCell.$('div.widget-readout').getText()).toBe('60')
    });

    it('Widget value = 76 ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /76/);
      var codeCell = beakerxPO.getCodeCellByIndex(wdgIndex);
      expect(codeCell.$('div.widget-readout').getText()).toBe('76')
    });

    it('Widget description = "desc1" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /desc1/);
      var codeCell = beakerxPO.getCodeCellByIndex(wdgIndex);
      expect(codeCell.$('label.widget-label').getText()).toBe('desc1')
    });

    it('Execute result output contains "false" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /false/);
    });

    it('Execute result output contains "50" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /50/);
    });

    it('Execute result output contains "horizontal" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /horizontal/);
      var codeCell = beakerxPO.getCodeCellByIndex(wdgIndex);
      expect(codeCell.$('div.ui-slider-horizontal').isExisting()).toBeTruthy();
    });

    it('Execute result output contains "20" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /20/);
    });

    it('Execute result output contains "true" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /true/);
      //TODO visible hasn't worked yet
    });
  });

  describe('IntProgress widget ', function () {
    it('Cell has IntProgress widget ', function () {
      cellIndex += 1;
      var widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.$('div.progress').isEnabled()).toBeTruthy();
    });

    it('Widget value = 10 ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /10/);
    });

    it('Widget value = 110 ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /110/);
    });

    it('Execute result output contains "50" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /50/);
    });

    it('Execute result output contains "20" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /20/);
    });

    it('Execute result output contains "horizontal" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /horizontal/);
    });
  });

});