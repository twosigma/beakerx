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
var beakerxPO;

describe('(Scala) Testing of EasyForm', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/scala/EasyFormTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe('(Scala) EasyForm widget ', function () {
    it('Cell has EasyForm widget ', function () {
      cellIndex = 0;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      expect(codeCell.$('legend').getText()).toBe('Legend name');
      expect(codeCell.$('div.beaker-easyform-container').isEnabled()).toBeTruthy();
    });
  });

  describe('(Scala) EasyForm Text field ', function () {
    var easyForm;

    it('EasyForm has Text field ', function () {
      cellIndex += 1;
      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-text').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name2');
      expect(easyForm.$('input[type="text"]').isEnabled()).toBeTruthy();
    });

    it('Should input text ', function () {
      var tstText = 'test';
      cellIndex += 1;
      easyForm.$('input[type="text"]').click();
      browser.keys('t').keys('e').keys('s').keys('t');
      expect(easyForm.$('input[type="text"]').getValue()).toBe(tstText);
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, tstText);
    });

    it('Should setup text value by code ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var tstText = beakerxPO.getAllOutputsExecuteResult(codeCell)[0].getText();
      expect(easyForm.$('input[type="text"]').getValue()).toBe(tstText);
    });

    it('Text field size equal 10 ', function () {
      cellIndex += 1;
      var easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-text').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name2');
      expect(Math.round(easyForm.$('input[type="text"]').getAttribute('size'))).toBe(10);
    });
  });

});