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

  var cellIndex;
  var easyForm;
  var inputFieldCellIndex;
  const initialUserInputText = 'initial user input text';
  const updatedUserInputText = 'updated user input text';

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
      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-text').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name2');
      expect(easyForm.$('input[type="text"]').isEnabled()).toBeTruthy();
    });

    it('Should input text', function () {
      easyForm.$('input[type="text"]').setValue(initialUserInputText);
      expect(easyForm.$('input[type="text"]').getValue()).toBe(initialUserInputText);
    });

    it('Should display text value', function () {
      cellIndex += 1;
      beakerxPO.runCellAndCheckOutputText(cellIndex, initialUserInputText);
    });

    it('Should update input text value', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      cellIndex += 1;
      beakerxPO.runCellAndCheckOutputText(cellIndex, updatedUserInputText);

    });

    it('Text field width should equal 15', function () {
      cellIndex += 1;
      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-text').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name2');
      expect(Math.round(easyForm.$('input[type="text"]').getAttribute('size'))).toBe(15);
    });
  });

  describe('EasyForm Textarea field', function () {

    it('EasyForm has Textarea field', function () {
      cellIndex += 1;
      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-textarea').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name3');
      expect(easyForm.$('textarea').isEnabled()).toBeTruthy();
    });

    it('Should input text', function () {
      easyForm.$('textarea').setValue(initialUserInputText);
      expect(easyForm.$('textarea').getValue()).toBe(initialUserInputText);
    });

    it('Should display text value', function () {
      cellIndex += 1;
      beakerxPO.runCellAndCheckOutputText(cellIndex, initialUserInputText);
    });

    it('Should update input text value and value should be displayed', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      cellIndex += 1;
      beakerxPO.runCellAndCheckOutputText(cellIndex, updatedUserInputText);
    });

    it('Textarea has 10 rows and 15 columnss', function () {
      cellIndex += 1;

      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-textarea').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name3');
      expect(Math.round(easyForm.$('textarea').getAttribute('rows'))).toBe(10);
      expect(Math.round(easyForm.$('textarea').getAttribute('cols'))).toBe(5);
    });

    it('Textarea has initial value', function () {
      cellIndex += 1;
      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-textarea').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name3');
      expect(easyForm.$('textarea').getValue()).toBe(initialUserInputText);
    });
  });

  describe('EasyForm Checkbox field', function () {

    it('EasyForm has Checkbox field', function () {
      cellIndex += 1;
      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-checkbox').isEnabled()).toBeTruthy();
      expect(easyForm.$('span').getText()).toBe('field name4');
      var checkbox = easyForm.$('input[type="checkbox"]');
      expect(checkbox.isEnabled()).toBeTruthy();
      expect(checkbox.isSelected()).toBeFalsy();
    });

    it('Checkbox should be selected and state should be displayed', function () {
      cellIndex += 1;
      easyForm.$('input[type="checkbox"]').click();
      var checkbox = easyForm.$('input[type="checkbox"]');
      expect(checkbox.isSelected()).toBeTruthy();
      beakerxPO.runCellAndCheckOutputText(cellIndex, 'True');
    });

    it('Should be unselected by code and state should be displayed', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      cellIndex += 1;
      var checkBoxText = beakerxPO.runCellToGetOutputTextElement(cellIndex).getText();
      expect(checkBoxText).toBe('False')
    });

    it('Checkbox has initial value', function () {
      cellIndex += 1;
      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-checkbox').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name4');
      expect(easyForm.$('input[type="checkbox"]').isSelected()).toBeTruthy();
    });
  });

  describe('EasyForm Combobox field', function () {
    
    it('EasyForm has Combobox field', function () {
      cellIndex += 1;
      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-combobox').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name5');
      expect(easyForm.$('span.easyform-combobox').isEnabled()).toBeTruthy();
    });

    it('Should select Combobox value ', function () {
      var testValue = 'twof5';
      cellIndex += 1;
      easyForm.$('span.easyform-combobox > a').click();
      browser.$('div.ui-menu-item-wrapper=' + testValue).click();
      expect(easyForm.$('input.easyform-combobox-input').getValue()).toBe(testValue);
      beakerxPO.runCellAndCheckOutputText(cellIndex, testValue);
    });

    it('Should select Combobox value by code', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      cellIndex += 1;
      var outputValue = beakerxPO.runCellToGetOutputTextElement(cellIndex).getText();
      expect(outputValue).toMatch('threef5');
    });
  });

  function selectTwoValuesOnList(listElement, fValue, sValue){
    listElement.selectByVisibleText(fValue);
    browser.keys("Shift");
    listElement.selectByVisibleText(fValue);
    listElement.selectByVisibleText(sValue);
    browser.keys('\uE000');
  }

  describe('EasyForm List field', function () {
    easyForm;

    it('EasyForm has List field', function () {
      cellIndex += 1;
      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-select').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name6');
      expect(easyForm.$('select').getText()).toMatch('onef6');
      expect(easyForm.$('select').getText()).toMatch('twof6');
    });

    it('List has size equal 3', function () {
      expect(Math.round(easyForm.$('select').getAttribute('size'))).toBe(3);
    });

    it('Should select "twof6" value', function () {
      var testValue = 'twof6';
      cellIndex += 1;
      easyForm.$('select').selectByVisibleText(testValue);
      expect(easyForm.$('select').getValue()).toBe(testValue);
      expect(easyForm.$('option=' + testValue).isSelected()).toBeTruthy();
      expect(easyForm.$('option=threef6').isSelected()).toBeFalsy();
      beakerxPO.runCellAndCheckOutputText(cellIndex, testValue);
    });

    it('Should select "twof6" and "threef6" values', function () {
      selectTwoValuesOnList(easyForm.$('select'), 'twof6', 'threef6');
      expect(easyForm.$('option=twof6').isSelected()).toBeTruthy();
      expect(easyForm.$('option=threef6').isSelected()).toBeTruthy();
      var result = beakerxPO.runCellToGetOutputTextElement(cellIndex).getText();
      expect(result).toMatch('twof6');
      expect(result).toMatch('threef6');
    });

    it('Should select List value by code', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      cellIndex += 1;
      var outputValue = beakerxPO.runCellToGetOutputTextElement(cellIndex).getText();
      expect(outputValue).toMatch('onef6');
    });

    it('SingleSelected List should select single value ', function () {
      cellIndex += 1;
      var easyForm6b = beakerxPO.runCellToGetEasyForm(cellIndex);
      selectTwoValuesOnList(easyForm6b.$('select'), 'twof6b', 'threef6b');
      expect(easyForm6b.$('option=twof6b').isSelected()).toBeFalsy();
      expect(easyForm6b.$('option=threef6b').isSelected()).toBeTruthy();
      cellIndex += 1;
      var result = beakerxPO.runCellToGetOutputTextElement(cellIndex).getText();
      expect(result).not.toMatch('twof6b');
      expect(result).toMatch('threef6b');
    });

    it('List has size equal 4', function () {
      cellIndex += 1;
      var easyForm6c = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm6c.$('div.widget-select').isEnabled()).toBeTruthy()
      expect(Math.round(easyForm6c.$('select').getAttribute('size'))).toBe(4);
    });
  });

  describe('EasyForm CheckBoxes field', function () {
    it('EasyForm has CheckBoxes field', function () {
      cellIndex += 1;
      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$$('div.widget-checkbox').length).toBe(3);
      expect(easyForm.$$('input[type="checkbox"]').length).toBe(3);
      expect(easyForm.$('div.widget-label').getText()).toBe('field name7');
    });

    it('Should select checkbox by code and display selected checkox value', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      cellIndex += 1;
      var outputValue = beakerxPO.runCellToGetOutputTextElement(cellIndex).getText();
      expect(outputValue).toMatch('onef7');
    });
  });

  describe('EasyForm DatePicker field', function () {

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

});