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

describe('(Groovy) Testing of EasyForm', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/groovy/EasyFormTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe('(Groovy) EasyForm widget ', function () {
    it('Cell has EasyForm widget ', function () {
      cellIndex = 0;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      expect(codeCell.$('fieldset').isEnabled()).toBeTruthy();
      expect(codeCell.$('legend').getText()).toBe('Legend name');
      expect(codeCell.$('div.beaker-easyform-container').isEnabled()).toBeTruthy();
    });
  });

  describe('(Groovy) EasyForm Text field ', function () {
    var easyForm;

    it('EasyForm has Text field ', function () {
      cellIndex += 1;
      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-text').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name2');
      expect(easyForm.$('input[type="text"]').isEnabled()).toBeTruthy();
    });

    it('Should input text ', function () {
      var tstText = 'text from user input';
      cellIndex += 1;
      easyForm.$('input[type="text"]').setValue(tstText);
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

  describe('(Groovy) EasyForm Textarea field ', function () {
    var easyForm;

    it('EasyForm has Textarea field ', function () {
      cellIndex += 1;
      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-textarea').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name3');
      expect(easyForm.$('textarea').isEnabled()).toBeTruthy();
    });

    it('Should input text ', function () {
      var tstText = 'text from user input';
      cellIndex += 1;
      easyForm.$('textarea').setValue(tstText);
      expect(easyForm.$('textarea').getValue()).toBe(tstText);
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, tstText);
    });

    it('Should setup text value by code ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var tstText = beakerxPO.getAllOutputsExecuteResult(codeCell)[0].getText();
      expect(easyForm.$('textarea').getValue()).toBe(tstText);
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
      expect(easyForm.$('label').getText()).toBe('field name3');
      expect(easyForm.$('textarea').getValue()).toBe('3c initial value 3c');
    });
  });

  describe('(Groovy) EasyForm Checkbox field ', function () {
    var easyForm;

    it('EasyForm has Checkbox field ', function () {
      cellIndex += 1;
      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-checkbox').isEnabled()).toBeTruthy();
      expect(easyForm.$('span').getText()).toBe('field name4');
      expect(easyForm.$('input[type="checkbox"]').isEnabled()).toBeTruthy();
    });

    it('Checkbox should be checked ', function () {
      cellIndex += 1;
      easyForm.$('input[type="checkbox"]').click();
      expect(easyForm.$('input[type="checkbox"]').isSelected()).toBeTruthy();
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, 'true');
    });

    it('Should be unchecked by code ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var tstText = beakerxPO.getAllOutputsExecuteResult(codeCell)[0].getText();
      expect(tstText).toBe('false')
      expect(easyForm.$('input[type="checkbox"]').isSelected()).toBeFalsy();
    });

    it('Checkbox has initial value ', function () {
      cellIndex += 1;
      var easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-checkbox').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name4');
      expect(easyForm.$('input[type="checkbox"]').isSelected()).toBeTruthy();
    });
  });

  describe('(Groovy) EasyForm Combobox field ', function () {
    var easyForm;

    it('EasyForm has Combobox field ', function () {
      cellIndex += 1;
      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-combobox').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name5');
      expect(easyForm.$('input.easyform-combobox-input').getValue()).toBe('onef5');
      expect(easyForm.$('span.easyform-combobox').isEnabled()).toBeTruthy();
    });

    it('Should select Combobox value ', function () {
      var testValue = 'twof5';
      cellIndex += 1;
      easyForm.$('span.easyform-combobox > a').click();
      browser.$('div.ui-menu-item-wrapper=' + testValue).click();
      expect(easyForm.$('input.easyform-combobox-input').getValue()).toBe(testValue);
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, testValue);
    });

    it('Should select Combobox value by code ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var testValue = beakerxPO.getAllOutputsExecuteResult(codeCell)[0].getText();
      expect(easyForm.$('input.easyform-combobox-input').getValue()).toBe(testValue);
    });
  });

  function selectTwoValuesOnList(listElement, fValue, sValue){
    listElement.selectByVisibleText(fValue);
    browser.keys("Shift");
    listElement.selectByVisibleText(fValue);
    listElement.selectByVisibleText(sValue);
    browser.keys('\uE000');
  }

  describe('(Groovy) EasyForm List field ', function () {
    var easyForm;

    it('EasyForm has List field ', function () {
      cellIndex += 1;
      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-select').isEnabled()).toBeTruthy();
      expect(easyForm.$('label').getText()).toBe('field name6');
      expect(easyForm.$('select').getText()).toMatch('onef6');
      expect(easyForm.$('select').getText()).toMatch('twof6');
    });

    it('List has size equal 3 ', function () {
      expect(Math.round(easyForm.$('select').getAttribute('size'))).toBe(3);
    });

    it('Should select "twof6" value ', function () {
      var testValue = 'twof6';
      cellIndex += 1;
      easyForm.$('select').selectByVisibleText(testValue);
      expect(easyForm.$('select').getValue()).toBe(testValue);
      expect(easyForm.$('option=' + testValue).isSelected()).toBeTruthy();
      expect(easyForm.$('option=threef6').isSelected()).toBeFalsy();
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, testValue);
    });

    it('Should select "twof6" and "threef6" values ', function () {
      selectTwoValuesOnList(easyForm.$('select'), 'twof6', 'threef6');
      expect(easyForm.$('option=twof6').isSelected()).toBeTruthy();
      expect(easyForm.$('option=threef6').isSelected()).toBeTruthy();
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var result = beakerxPO.getAllOutputsExecuteResult(codeCell)[0].getText();
      expect(result).toMatch('twof6');
      expect(result).toMatch('threef6');
    });

    it('Should select List value by code ', function () {
      cellIndex += 1;
      var testValue = "onef6";
      beakerxPO.runCodeCellByIndex(cellIndex);
      expect(easyForm.$('option=' + testValue).isSelected()).toBeTruthy();
      expect(easyForm.$('select').getValue()).toBe(testValue);
    });

    it('SingleSelected List should select single value ', function () {
      cellIndex += 1;
      var easyForm6b = beakerxPO.runCellToGetEasyForm(cellIndex);
      selectTwoValuesOnList(easyForm6b.$('select'), 'twof6b', 'threef6b');
      expect(easyForm6b.$('option=twof6b').isSelected()).toBeFalsy();
      expect(easyForm6b.$('option=threef6b').isSelected()).toBeTruthy();
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var result = beakerxPO.getAllOutputsExecuteResult(codeCell)[0].getText();
      expect(result).not.toMatch('twof6b');
      expect(result).toMatch('threef6b');
    });

    it('List has size equal 2 ', function () {
      cellIndex += 1;
      var easyForm6c = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm6c.$('div.widget-select').isEnabled()).toBeTruthy();
      expect(Math.round(easyForm6c.$('select').getAttribute('size'))).toBe(2);
    });
  });

  describe('(Groovy) EasyForm CheckBoxes field ', function () {
    var easyForm;

    it('EasyForm has CheckBoxes field ', function () {
      cellIndex += 1;
      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$$('div.widget-checkbox').length).toBe(4);
      expect(easyForm.$$('input[type="checkbox"]').length).toBe(4);
      expect(easyForm.$('div.widget-label').getText()).toBe('field name7');
    });

    it('CheckBoxes has vertical orientation ', function () {
      expect(easyForm.$('div.widget-hbox > div.widget-vbox').isEnabled()).toBeTruthy();
      expect(easyForm.$('div.widget-hbox > div.widget-vbox')
        .getCssProperty('flex-direction').value).toBe('column');
    });

    it('Should select "twof7" value ', function () {
      cellIndex += 1;
      easyForm.$$('input[type="checkbox"]')[1].click();
      expect(easyForm.$$('input[type="checkbox"]')[1].isSelected()).toBeTruthy();
      expect(easyForm.$$('input[type="checkbox"]')[2].isSelected()).toBeFalsy();
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, 'twof7');
    });

    it('Should select "fourf7" and "threef7" values ', function () {
      easyForm.$$('input[type="checkbox"]')[2].click();
      easyForm.$$('input[type="checkbox"]')[3].click();
      expect(easyForm.$$('input[type="checkbox"]')[2].isSelected()).toBeTruthy();
      expect(easyForm.$$('input[type="checkbox"]')[3].isSelected()).toBeTruthy();
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var result = beakerxPO.getAllOutputsExecuteResult(codeCell)[0].getText();
      expect(result).toMatch('fourf7');
      expect(result).toMatch('threef7');
    });

    it('Should select CheckBoxes value by code ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var result = beakerxPO.getAllOutputsExecuteResult(codeCell)[0].getText();
      expect(result).toMatch('onef7');
      expect(easyForm.$$('input[type="checkbox"]')[0].isSelected()).toBeTruthy();
    });

    it('CheckBoxes has horizontal orientation ', function () {
      cellIndex += 1;
      var easyForm7b = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm7b.$$('div.widget-checkbox').length).toBe(3);
      expect(easyForm7b.$$('input[type="checkbox"]').length).toBe(3);
      expect(easyForm7b.$('div.widget-label').getText()).toBe('field name7');
      expect(easyForm7b.$('div.widget-hbox > div.widget-hbox').isEnabled()).toBeTruthy();
      expect(easyForm7b.$('div.widget-hbox > div.widget-hbox')
        .getCssProperty('flex-direction').value).toBe('row');
    });
  });

  describe('(Groovy) EasyForm RadioButtons field ', function () {
    var easyForm;

    it('EasyForm has RadioButtons field ', function () {
      cellIndex += 1;
      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.widget-radio-box').isEnabled()).toBeTruthy();
      expect(easyForm.$$('input[type="radio"]').length).toBe(3);
      expect(easyForm.$('label.widget-label').getText()).toBe('field name8');
    });

    it('RadioButtons has vertical orientation ', function () {
      expect(easyForm.$('div.widget-radio-box').isEnabled()).toBeTruthy();
      expect(easyForm.$('div.widget-radio-box')
        .getCssProperty('flex-direction').value).toBe('column');
    });

    it('RadioButtons does not have default selected button ', function () {
      var buttonsf8 = easyForm.$$('input[type="radio"]');
      expect(buttonsf8[0].isSelected()).toBeFalsy();
      expect(buttonsf8[1].isSelected()).toBeFalsy();
      expect(buttonsf8[2].isSelected()).toBeFalsy();
    });

    it('Should select "twof8" value ', function () {
      cellIndex += 1;
      easyForm.$$('input[type="radio"]')[1].click();
      expect(easyForm.$$('input[type="radio"]')[1].isSelected()).toBeTruthy();
      expect(easyForm.$$('input[type="radio"]')[0].isSelected()).toBeFalsy();
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, 'twof8');
    });

    it('Should select RadioButtons value by code ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var result = beakerxPO.getAllOutputsExecuteResult(codeCell)[0].getText();
      expect(result).toMatch('threef8');
      expect(easyForm.$$('input[type="radio"]')[2].isSelected()).toBeTruthy();
    });

    it('RadioButtons has horizontal orientation ', function () {
      cellIndex += 1;
      var easyForm8b = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm8b.$('div.widget-radio-box').isEnabled()).toBeTruthy();
      expect(easyForm8b.$$('input[type="radio"]').length).toBe(3);
      expect(easyForm8b.$('label.widget-label').getText()).toBe('field name8');
      expect(easyForm8b.$('div.widget-radio-box').isEnabled()).toBeTruthy();
      expect(easyForm8b.$('div.widget-radio-box')
        .getCssProperty('flex-direction').value).toBe('row');
    });
  });

  describe('(Groovy) EasyForm DatePicker field ', function () {
    var easyForm;

    it('EasyForm has DatePicker field ', function () {
      cellIndex += 1;
      easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.datepicker-container').isEnabled()).toBeTruthy();
      expect(easyForm.$('label.widget-label').getText()).toBe('field name9');
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
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var result = beakerxPO.getAllOutputsExecuteResult(codeCell)[0].getText();
      expect(result).toMatch('27');
      expect(easyForm.$('input[type="text"]').getValue()).toMatch('27');
    });
  });

  describe('(Groovy) EasyForm Actions ', function(){
    var inputs;

    it('EasyForm has two buttons ', function () {
      cellIndex += 1;
      var easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      easyForm.$('button=run tag').click();
      beakerxPO.kernelIdleIcon.waitForEnabled();
      easyForm.$('button=actionPerformed').click();
    });

    it('tag should create EasyForm ', function () {
      cellIndex += 2;
      beakerxPO.kernelIdleIcon.waitForEnabled();
      var codeCell_11 = beakerxPO.getCodeCellByIndex(cellIndex);
      var easyForm = codeCell_11.$('div.beaker-easyform-container');
      expect(easyForm.isEnabled()).toBeTruthy();
      inputs = easyForm.$$('input[type="text"]');
    });

    it('onChange action should change text value ', function () {
      cellIndex -= 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, 'test text');
      expect(inputs[1].getValue()).toBe('test text');
      expect(inputs[2].getValue()).toBe('test text from onChange');
    });

    it('onInit action should change text value ', function () {
      expect(inputs[0].getValue()).toBe('from onInit');
    });

    it('actionPerformed should change text value ', function () {
      expect(inputs[3].getValue()).toBe('from actionPerformed');
    });
  });

  describe('(Groovy) IntSlider widget in EasyForm ', function(){
    it('EasyForm has IntSlider widget', function(){
      cellIndex += 2;
      var easyForm = beakerxPO.runCellToGetEasyForm(cellIndex);
      expect(easyForm.$('div.slider-container')).toBeTruthy();
    });

    it('IntSlider has value 50 ', function(){
      cellIndex +=1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, '50');
    });
  });

});