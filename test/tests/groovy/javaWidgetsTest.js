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

describe('Java widgets notebook', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/notebooks/test/notebooks/groovy/JavaWidgetsTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  describe('IntSlider widget', function () {
    it('Cell has IntSlider widget', function () {
      var widget = beakerxPO.runCellToGetWidgetElement(0);
      expect(widget.$('div.slider-container').isEnabled()).toBeTruthy();
    }, 2);

    it('Widget value = 60', function () {
      beakerxPO.runCellAndCheckOutputText(1, '60');
      var codeCell = beakerxPO.getCodeCellByIndex(0);
      expect(codeCell.$('div.widget-readout').getText()).toBe('60')
    });

    it('Widget value = 76', function () {
      beakerxPO.runCellAndCheckOutputText(2, '76');
      var codeCell = beakerxPO.getCodeCellByIndex(0);
      expect(codeCell.$('div.widget-readout').getText()).toBe('76')
    });

    it('Widget description = "desc1"', function () {
      beakerxPO.runCellAndCheckOutputText(3, 'desc1');
      var codeCell = beakerxPO.getCodeCellByIndex(0);
      expect(codeCell.$('label.widget-label').getText()).toBe('desc1')
    });

    it('Cell output contains "false"', function () {
      beakerxPO.runCellAndCheckOutputText(4, 'false');
    });

    it('Cell output contains "50"', function () {
      beakerxPO.runCellAndCheckOutputText(5, '50');
    });

    it('Cell output contains "horizontal"', function () {
      beakerxPO.runCellAndCheckOutputText(6, 'horizontal');
      var codeCell = beakerxPO.getCodeCellByIndex(0);
      expect(codeCell.$('div.ui-slider-horizontal').isExisting()).toBeTruthy();
    });

    it('Cell output contains "20"', function () {
      beakerxPO.runCellAndCheckOutputText(8, '20');
    });

    it('Cell output contains "true"', function () {
      beakerxPO.runCellAndCheckOutputText(9, 'true');
      //TODO visible hasn't worked yet
    });
  });

  describe('IntProgress widget', function () {
    it('Cell has IntProgress widget', function () {
      var widget = beakerxPO.runCellToGetWidgetElement(10);
      expect(widget.$('div.progress').isEnabled()).toBeTruthy();
    }, 2);

    it('Widget value = 10', function () {
      beakerxPO.runCellAndCheckOutputText(11, '10');
    });

    it('Widget value = 110', function () {
      beakerxPO.runCellAndCheckOutputText(12, '110');
    });

    it('Cell output contains "50"', function () {
      beakerxPO.runCellAndCheckOutputText(13, '50');
    });

    it('Cell output contains "20"', function () {
      beakerxPO.runCellAndCheckOutputText(14, '20');
    });

    it('Cell output contains "horizontal"', function () {
      beakerxPO.runCellAndCheckOutputText(15, 'horizontal');
    });
  });

});