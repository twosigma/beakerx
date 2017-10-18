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

describe('Testing of EasyForm (python)', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/notebooks/test/notebooks/python/EasyFormPythonTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  describe('EasyForm widget', function () {
    it('Cell has EasyForm widget', function () {
      var codeCell = beakerxPO.runCodeCellByIndex(0);
      expect(codeCell.$('fieldset').isEnabled()).toBeTruthy();
      expect(codeCell.$('legend').getText()).toBe('Legend name');
      expect(codeCell.$('div.beaker-easyform-container').isEnabled()).toBeTruthy();
    }, 2);

    it('EasyForm has Text field', function () {
      var easyForm = beakerxPO.runCellToGetEasyForm(1);
      expect(easyForm.$('div.widget-text').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name2');
      expect(easyForm.$('input[type="text"]').isEnabled()).toBeTruthy();
    });

    it('EasyForm has Textarea field', function () {
      var easyForm = beakerxPO.runCellToGetEasyForm(2);
      expect(easyForm.$('div.widget-textarea').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name3');
      expect(easyForm.$('textarea').isEnabled()).toBeTruthy();
    });

    it('EasyForm has Checkbox field', function () {
      var easyForm = beakerxPO.runCellToGetEasyForm(3);
      expect(easyForm.$('div.widget-checkbox').isEnabled()).toBeTruthy();
      expect(easyForm.$('span').getText()).toBe('field name4');
      expect(easyForm.$('input[type="checkbox"]').isEnabled()).toBeTruthy();
    });

    it('EasyForm has Combobox field', function () {
      var easyForm = beakerxPO.runCellToGetEasyForm(4);
      expect(easyForm.$('div.widget-combobox').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name5');
      expect(easyForm.$('select').getValue()).toBe('one');
      expect(easyForm.$('span.easyform-combobox').isEnabled()).toBeTruthy();
    });

    it('EasyForm has List field', function () {
      var easyForm = beakerxPO.runCellToGetEasyForm(5);
      expect(easyForm.$('div.widget-select').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name6');
      easyForm.$('select').selectByVisibleText('one');
      expect(easyForm.$('select').getValue()).toBe('one');
    });

    it('EasyForm has CheckBoxes field', function () {
      var easyForm = beakerxPO.runCellToGetEasyForm(6);
      expect(easyForm.$$('div.widget-checkbox').length).toBe(3);
      expect(easyForm.$$('input[type="checkbox"]').length).toBe(3);
      expect(easyForm.$('div.widget-label').getText()).toBe('field name7');
    });

    it('EasyForm has RadioButtons field', function () {
      var easyForm = beakerxPO.runCellToGetEasyForm(7);
      expect(easyForm.$('div.widget-radio-box').isEnabled()).toBeTruthy();
      expect(easyForm.$$('input[type="radio"]').length).toBe(3);
      expect(easyForm.$('label.widget-label').getText()).toBe('field name8');
    });

    it('EasyForm has DatePicker field', function () {
      var easyForm = beakerxPO.runCellToGetEasyForm(8);
      expect(easyForm.$('div.datepicker-container').isEnabled()).toBeTruthy();
      expect(easyForm.$('label.widget-label').getText()).toBe('field name9');
      easyForm.$('a.date-picker-button').click();
      browser.$('span.flatpickr-day=25').click();
      expect(easyForm.$('input[type="text"]').getValue()).toMatch('25');
    });
  });

  describe("EasyForm Actions", function(){
    var inputs;

    it('EasyForm has button', function () {
      var easyForm = beakerxPO.runCellToGetEasyForm(9);
      easyForm.$('button=run tag').click();
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.kernelIdleIcon.waitForEnabled();
      easyForm.$('button=actionPerformed').click();
    });

    it('tag should create EasyForm', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      var codeCell_11 = beakerxPO.getCodeCellByIndex(11);
      var easyForm = codeCell_11.$('div.beaker-easyform-container');
      expect(easyForm.isEnabled()).toBeTruthy();
      inputs = easyForm.$$('input[type="text"]');
    });

    it('should change text value', function () {
      beakerxPO.runCodeCellByIndex(10);
      expect(inputs[0].getValue()).toBe('test text');
    });

    it('actionPerformed should change text value', function () {
      expect(inputs[1].getValue()).toBe('from actionPerformed');
    });
  });

});