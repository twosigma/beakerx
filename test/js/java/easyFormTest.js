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

describe('(Java) EasyForm tests ', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/java/EasyFormTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe('(Java) EasyForm Text field ', function () {
    var easyForm;

    it('EasyForm has Text field ', function () {
      cellIndex = 0;
      beakerxPO.runCodeCellByIndex(cellIndex);
      cellIndex += 1;
      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-text').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name0');
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
      beakerxPO.runCodeCellByIndex(cellIndex);
      expect(easyForm.$('input[type="text"]').getValue()).toBe('0text from code0');
    });

    it('Text field size equal 10 ', function () {
      cellIndex += 1;
      var easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-text').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name1');
      expect(Math.round(easyForm.$('input[type="text"]').getAttribute('size'))).toBe(10);
    });
  });

  describe('(Java) EasyForm Textarea field ', function () {
    var easyForm;

    it('EasyForm has Textarea field ', function () {
      cellIndex += 1;
      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-textarea').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name2');
      expect(easyForm.$('textarea').isEnabled()).toBeTruthy();
    });

    it('Should input text ', function () {
      var tstText = 'test';
      cellIndex += 1;
      easyForm.$('textarea').click();
      browser.keys('t').keys('e').keys('s').keys('t');
      expect(easyForm.$('textarea').getValue()).toBe(tstText);
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, tstText);
    });

    it('Should setup text value by code ', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      expect(easyForm.$('textarea').getValue()).toBe('2text from code2');
    });

    it('Textarea has 5 rows and 20 cols ', function () {
      cellIndex += 1;
      var easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-textarea').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name3');
      expect(Math.round(easyForm.$('textarea').getAttribute('rows'))).toBe(5);
      expect(Math.round(easyForm.$('textarea').getAttribute('cols'))).toBe(20);
    });

    it('Textarea has initial value ', function () {
      cellIndex += 1;
      var easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-textarea').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name4');
      expect(easyForm.$('textarea').getValue()).toBe('4 initial value 4');
    });
  });

});