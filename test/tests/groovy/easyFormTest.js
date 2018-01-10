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

describe('Testing of EasyForm (groovy)', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/notebooks/test/notebooks/groovy/EasyFormTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe('EasyForm widget', function () {
    it('Cell has EasyForm widget', function () {
      cellIndex = 0;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      expect(codeCell.$('fieldset').isEnabled()).toBeTruthy();
      expect(codeCell.$('legend').getText()).toBe('Legend name');
      expect(codeCell.$('div.beaker-easyform-container').isEnabled()).toBeTruthy();
    });
  });

  describe('EasyForm Text field', function () {
    it('EasyForm has Text field', function () {
      cellIndex += 1;
      var easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-text').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name2');
      expect(easyForm.$('input[type="text"]').isEnabled()).toBeTruthy();
    });
  });

  describe('EasyForm Textarea field', function () {
    it('EasyForm has Textarea field', function () {
      cellIndex = 4;
      var easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-textarea').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name3');
      expect(easyForm.$('textarea').isEnabled()).toBeTruthy();
    });
  });

  describe('EasyForm Checkbox field', function () {
    it('EasyForm has Checkbox field', function () {
      cellIndex = 7;
      var easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-checkbox').isEnabled()).toBeTruthy();
      expect(easyForm.$('span').getText()).toBe('field name4');
      expect(easyForm.$('input[type="checkbox"]').isEnabled()).toBeTruthy();
    });
  });

  describe('EasyForm Combobox field', function () {
    it('EasyForm has Combobox field', function () {
      cellIndex += 1;
      var easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-combobox').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name5');
      expect(easyForm.$('select').getValue()).toBe('one');
      expect(easyForm.$('span.easyform-combobox').isEnabled()).toBeTruthy();
    });
  });

  describe('EasyForm List field', function () {
    var easyForm;
    it('EasyForm has List field', function () {
      cellIndex += 1;
      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-select').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name6');
    });
    it('Should select "one" value', function () {
      easyForm.$('select').selectByVisibleText('one');
      expect(easyForm.$('select').getValue()).toBe('one');
    });
  });

  describe('EasyForm CheckBoxes field', function () {
    it('EasyForm has CheckBoxes field', function () {
      cellIndex += 1;
      var easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$$('div.widget-checkbox').length).toBe(3);
      expect(easyForm.$$('input[type="checkbox"]').length).toBe(3);
      expect(easyForm.$('div.widget-label').getText()).toBe('field name7');
    });
  });

  describe('EasyForm RadioButtons field', function () {
    it('EasyForm has RadioButtons field', function () {
      cellIndex += 1;
      var easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-radio-box').isEnabled()).toBeTruthy();
      expect(easyForm.$$('input[type="radio"]').length).toBe(3);
      expect(easyForm.$('label.widget-label').getText()).toBe('field name8');
    });
  });

  describe('EasyForm DatePicker field', function () {
    var easyForm;
    it('EasyForm has DatePicker field', function () {
      cellIndex += 1;
      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.datepicker-container').isEnabled()).toBeTruthy();
      expect(easyForm.$('label.widget-label').getText()).toBe('field name9');
    });
    it('Should select 25th day', function () {
      easyForm.$('a.date-picker-button').click();
      browser.$('span.flatpickr-day=25').click();
      expect(easyForm.$('input[type="text"]').getValue()).toMatch('25');
    });
  });

  describe("EasyForm Actions", function(){
    var inputs;

    it('EasyForm has two buttons', function () {
      cellIndex += 1;
      var easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      easyForm.$('button=run tag').click();
      beakerxPO.kernelIdleIcon.waitForEnabled();
      easyForm.$('button=actionPerformed').click();
    });

    it('tag should create EasyForm', function () {
      cellIndex += 2;
      beakerxPO.kernelIdleIcon.waitForEnabled();
      var codeCell_11 = beakerxPO.getCodeCellByIndex(cellIndex);
      var easyForm = codeCell_11.$('div.beaker-easyform-container');
      expect(easyForm.isEnabled()).toBeTruthy();
      inputs = easyForm.$$('input[type="text"]');
    });

    it('onChange action should change text value', function () {
      cellIndex -= 1;
      beakerxPO.runCallAndCheckOutputText(cellIndex, 'test text');
      expect(inputs[1].getValue()).toBe('test text');
      expect(inputs[2].getValue()).toBe('test text from onChange');
    });

    it('onInit action should change text value', function () {
      expect(inputs[0].getValue()).toBe('from onInit');
    });

    it('actionPerformed should change text value', function () {
      expect(inputs[3].getValue()).toBe('from actionPerformed');
    });
  });

  describe('IntSlider widget in EasyForm', function(){
    it('EasyForm has IntSlider widget', function(){
      cellIndex += 2;
      var easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.slider-container')).toBeTruthy();
    });

    it('IntSlider has value 50', function(){
      cellIndex +=1;
      beakerxPO.runCallAndCheckOutputText(cellIndex, '50');
    });
  });

});