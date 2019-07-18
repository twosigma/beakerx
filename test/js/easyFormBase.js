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

var BeakerXPageObject = require('./beakerx.po.js');
var beakerxPO;

function easyFormBase() {

  this.kernelName = arguments[0];

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
  });

  var cellIndex;

  describe('(' + this.kernelName + ') EasyForm widget ', function () {
    it('Cell has EasyForm widget ', function () {
      cellIndex = 0;
      beakerxPO.runCodeCellByIndex(cellIndex);
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      browser.pause(1000);
      expect(codeCell.$('legend').getText()).toBe('form0');
      expect(codeCell.$('div.beaker-easyform-container').isEnabled()).toBeTruthy();
    });
  });

  describe('(' + this.kernelName + ') EasyForm Text field ', function () {
    var easyForm;

    it('EasyForm has Text field ', function () {
      cellIndex += 1;
      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-text').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name');
      expect(easyForm.$('input[type="text"]').isEnabled()).toBeTruthy();
    });

    it('Should input text ', function () {
      var tstText = 'test';
      cellIndex += 1;
      easyForm.$('input[type="text"]').click();
      browser.keys('t'); browser.pause(100);
      browser.keys('e'); browser.pause(100);
      browser.keys('s'); browser.pause(100);
      browser.keys('t'); browser.pause(100);
      expect(easyForm.$('input[type="text"]').getValue()).toBe(tstText);
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, tstText);
    });

    it('Should setup text value by code ', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      expect(easyForm.$('input[type="text"]').getValue()).toBe('1text from code1');
    });

    it('Text field size equal 10 ', function () {
      cellIndex += 1;
      var easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-text').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name');
      expect(Math.round(easyForm.$('input[type="text"]').getAttribute('size'))).toBe(10);
    });
  });

  describe('(' + this.kernelName + ') EasyForm Textarea field ', function () {
    var easyForm;

    it('EasyForm has Textarea field ', function () {
      cellIndex += 1;
      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-textarea').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name');
      expect(easyForm.$('textarea').isEnabled()).toBeTruthy();
    });

    it('Should input text ', function () {
      var tstText = 'test';
      cellIndex += 1;
      easyForm.$('textarea').click();
      browser.keys('t'); browser.pause(100);
      browser.keys('e'); browser.pause(100);
      browser.keys('s'); browser.pause(100);
      browser.keys('t'); browser.pause(100);
      expect(easyForm.$('textarea').getValue()).toBe(tstText);
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, tstText);
    });

    it('Should setup text value by code ', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      browser.pause(1000);
      expect(easyForm.$('textarea').getValue()).toBe('3text from code3');
    });

    it('Textarea has 5 rows and 20 cols ', function () {
      cellIndex += 1;
      var easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-textarea').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name');
      expect(Math.round(easyForm.$('textarea').getAttribute('rows'))).toBe(5);
      expect(Math.round(easyForm.$('textarea').getAttribute('cols'))).toBe(20);
    });

    it('Textarea has initial value ', function () {
      cellIndex += 1;
      var easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-textarea').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name');
      expect(easyForm.$('textarea').getValue()).toBe('5initial value5');
    });
  });

  describe('(' + this.kernelName + ') EasyForm Checkbox field ', function () {
    var easyForm;

    it('EasyForm has Checkbox field ', function () {
      cellIndex += 1;
      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-checkbox').isEnabled()).toBeTruthy();
      expect(easyForm.$('span').getText()).toBe('field name');
      expect(easyForm.$('input[type="checkbox"]').isEnabled()).toBeTruthy();
    });

    it('Checkbox should be checked ', function () {
      cellIndex += 1;
      easyForm.$('input[type="checkbox"]').click();
      expect(easyForm.$('input[type="checkbox"]').isSelected()).toBeTruthy();
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /(T|t)rue/);
    });

    it('Should be unchecked by code ', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      expect(easyForm.$('input[type="checkbox"]').isSelected()).toBeFalsy();
    });

    it('Checkbox has initial value ', function () {
      cellIndex += 1;
      var easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-checkbox').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name');
      expect(easyForm.$('input[type="checkbox"]').isSelected()).toBeTruthy();
    });
  });

  describe('(' + this.kernelName + ') EasyForm Combobox field ', function () {
    var easyForm;

    it('EasyForm has Combobox field ', function () {
      cellIndex += 1;
      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-combobox').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name');
      expect(easyForm.$('input.easyform-combobox-input').getValue()).toBe('one');
      expect(easyForm.$('span.easyform-combobox').isEnabled()).toBeTruthy();
    });

    it('Should select Combobox value ', function () {
      var testValue = 'two';
      cellIndex += 1;
      easyForm.$('span.easyform-combobox > a').click();
      browser.$('div.ui-menu-item-wrapper=' + testValue).click();
      expect(easyForm.$('input.easyform-combobox-input').getValue()).toBe(testValue);
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, testValue);
    });

    it('Should select Combobox value by code ', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      expect(easyForm.$('input.easyform-combobox-input').getValue()).toBe('three');
    });
  });

  function selectTwoValuesOnList(listElement, fValue, sValue){
    listElement.selectByVisibleText(fValue);
    browser.keys("Shift");
    listElement.selectByVisibleText(fValue);
    listElement.selectByVisibleText(sValue);
    browser.keys('\uE000');
  }

  describe('(' + this.kernelName + ') EasyForm List field ', function () {
    var easyForm;

    it('EasyForm has List field ', function () {
      cellIndex += 1;
      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-select').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name');
      expect(easyForm.$('select').getText()).toMatch('one');
      expect(easyForm.$('select').getText()).toMatch('two');
    });

    it('List has size equal 3 ', function () {
      expect(Math.round(easyForm.$('select').getAttribute('size'))).toBe(3);
    });

    it('Should select "two" value ', function () {
      var testValue = 'two';
      cellIndex += 1;
      easyForm.$('select').selectByVisibleText(testValue);
      expect(easyForm.$('select').getValue()).toBe(testValue);
      expect(easyForm.$('option=' + testValue).isSelected()).toBeTruthy();
      expect(easyForm.$('option=three').isSelected()).toBeFalsy();
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, testValue);
    });

    it('Should select "two" and "three" values ', function () {
      selectTwoValuesOnList(easyForm.$('select'), 'two', 'three');
      expect(easyForm.$('option=two').isSelected()).toBeTruthy();
      expect(easyForm.$('option=three').isSelected()).toBeTruthy();
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var result = beakerxPO.getAllOutputsExecuteResult(codeCell)[0].getText();
      expect(result).toMatch('two');
      expect(result).toMatch('three');
    });

    it('Should select List value by code ', function () {
      cellIndex += 1;
      var testValue = "one";
      beakerxPO.runCodeCellByIndex(cellIndex);
      expect(easyForm.$('option=' + testValue).isSelected()).toBeTruthy();
      expect(easyForm.$('select').getValue()).toBe(testValue);
    });

    it('SingleSelected List should select single value ', function () {
      cellIndex += 1;
      var easyForm6b = beakerxPO.runCellToGetEasyForm(cellIndex);
      selectTwoValuesOnList(easyForm6b.$('select'), 'two', 'three');
      expect(easyForm6b.$('option=two').isSelected()).toBeFalsy();
      expect(easyForm6b.$('option=three').isSelected()).toBeTruthy();
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var result = beakerxPO.getAllOutputsExecuteResult(codeCell)[0].getText();
      expect(result).not.toMatch('two');
      expect(result).toMatch('three');
    });

    it('List has size equal 2 ', function () {
      cellIndex += 1;
      var easyForm6c = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm6c.$('div.widget-select').isEnabled()).toBeTruthy();
      expect(Math.round(easyForm6c.$('select').getAttribute('size'))).toBe(2);
    });
  });

  describe('(' + this.kernelName + ') EasyForm CheckBoxes field ', function () {
    var easyForm;

    it('EasyForm has CheckBoxes field ', function () {
      cellIndex += 1;
      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$$('div.widget-checkbox').length).toBe(4);
      expect(easyForm.$$('input[type="checkbox"]').length).toBe(4);
      expect(easyForm.$('div.widget-label').getText()).toBe('field name');
    });

    it('CheckBoxes has vertical orientation ', function () {
      expect(easyForm.$('div.widget-hbox > div.widget-vbox').isEnabled()).toBeTruthy();
      expect(easyForm.$('div.widget-hbox > div.widget-vbox')
        .getCSSProperty('flex-direction').value).toBe('column');
    });

    it('Should select "two" value ', function () {
      cellIndex += 1;
      easyForm.$$('input[type="checkbox"]')[1].click();
      expect(easyForm.$$('input[type="checkbox"]')[1].isSelected()).toBeTruthy();
      expect(easyForm.$$('input[type="checkbox"]')[2].isSelected()).toBeFalsy();
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, 'two');
    });

    it('Should select "four" and "three" values ', function () {
      easyForm.$$('input[type="checkbox"]')[2].click();
      easyForm.$$('input[type="checkbox"]')[3].click();
      expect(easyForm.$$('input[type="checkbox"]')[2].isSelected()).toBeTruthy();
      expect(easyForm.$$('input[type="checkbox"]')[3].isSelected()).toBeTruthy();
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var result = beakerxPO.getAllOutputsExecuteResult(codeCell)[0].getText();
      expect(result).toMatch('four');
      expect(result).toMatch('three');
    });

    it('Should select CheckBoxes value by code ', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      browser.pause(1000);
      expect(easyForm.$$('input[type="checkbox"]')[0].isSelected()).toBeTruthy();
    });

    it('CheckBoxes has horizontal orientation ', function () {
      cellIndex += 1;
      var easyForm7b = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm7b.$$('div.widget-checkbox').length).toBe(3);
      expect(easyForm7b.$$('input[type="checkbox"]').length).toBe(3);
      expect(easyForm7b.$('div.widget-label').getText()).toBe('field name');
      expect(easyForm7b.$('div.widget-hbox > div.widget-hbox').isEnabled()).toBeTruthy();
      expect(easyForm7b.$('div.widget-hbox > div.widget-hbox')
        .getCSSProperty('flex-direction').value).toBe('row');
    });
  });

  describe('(' + this.kernelName + ') EasyForm RadioButtons field ', function () {
    var easyForm;

    it('EasyForm has RadioButtons field ', function () {
      cellIndex += 1;
      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-radio-box').isEnabled()).toBeTruthy();
      expect(easyForm.$$('input[type="radio"]').length).toBe(3);
      expect(easyForm.$('label.widget-label').getText()).toBe('field name');
    });

    it('RadioButtons has vertical orientation ', function () {
      expect(easyForm.$('div.widget-radio-box').isEnabled()).toBeTruthy();
      expect(easyForm.$('div.widget-radio-box')
        .getCSSProperty('flex-direction').value).toBe('column');
    });

    it('RadioButtons does not have default selected button ', function () {
      var buttonsf8 = easyForm.$$('input[type="radio"]');
      expect(buttonsf8[0].isSelected()).toBeFalsy();
      expect(buttonsf8[1].isSelected()).toBeFalsy();
      expect(buttonsf8[2].isSelected()).toBeFalsy();
    });

    it('Should select "two" value ', function () {
      cellIndex += 1;
      easyForm.$$('input[type="radio"]')[1].click();
      expect(easyForm.$$('input[type="radio"]')[1].isSelected()).toBeTruthy();
      expect(easyForm.$$('input[type="radio"]')[0].isSelected()).toBeFalsy();
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, 'two');
    });

    it('Should select RadioButtons value by code ', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      browser.pause(1000);
      expect(easyForm.$$('input[type="radio"]')[2].isSelected()).toBeTruthy();
    });

    it('RadioButtons has horizontal orientation ', function () {
      cellIndex += 1;
      var easyForm8b = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm8b.$('div.widget-radio-box').isEnabled()).toBeTruthy();
      expect(easyForm8b.$$('input[type="radio"]').length).toBe(3);
      expect(easyForm8b.$('label.widget-label').getText()).toBe('field name');
      expect(easyForm8b.$('div.widget-radio-box').isEnabled()).toBeTruthy();
      expect(easyForm8b.$('div.widget-radio-box')
        .getCSSProperty('flex-direction').value).toBe('row');
    });
  });

  describe('(' + this.kernelName + ') EasyForm DatePicker field ', function () {
    var easyForm;

    it('EasyForm has DatePicker field ', function () {
      cellIndex += 1;
      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.datepicker-container').isEnabled()).toBeTruthy();
      expect(easyForm.$('label.widget-label').getText()).toBe('field name');
    });

    it('Should select 25th day ', function () {
      cellIndex += 1;
      easyForm.$('a.date-picker-button').click();
      browser.$('span.flatpickr-day=25').click();
      expect(easyForm.$('input[type="text"]').getValue()).toMatch('25');
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var result = beakerxPO.getAllOutputsExecuteResult(codeCell)[0].getText();
      expect(result).toMatch('25');
    });

    it('Should select 27th day by code ', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      expect(easyForm.$('input[type="text"]').getValue()).toMatch('27');
    });
  });

}

module.exports = easyFormBase;