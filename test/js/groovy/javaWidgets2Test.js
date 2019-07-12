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

describe('Java widgets test ', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/groovy/JavaWidgets2Test.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe('IntText widget ', function () {
    var widget;
    it('Cell has IntText widget ', function () {
      cellIndex = 0;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.$('input').getAttribute('type')).toEqual('number');
      expect(widget.$('input').getAttribute('step')).toEqual('1');
    });

    it('Get value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /55/);
      expect(widget.$('input').getValue()).toBe('55');
    });

    it('Set new value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /12345/);
      expect(widget.$('input').getValue()).toBe('12345');
    });

    it('Set description to "intText" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /intText/);
      expect(widget.$('label.widget-label').getText()).toBe('intText');
    });

    it('Disable widget ', function () {
      cellIndex += 1;
      expect(widget.$('input').isEnabled()).toBeTruthy();
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /true/);
      expect(widget.$('input').isEnabled()).toBeFalsy();
    });
  });

  describe('FloatText widget ', function () {
    var widget;
    it('Cell has FloatText widget ', function () {
      cellIndex += 1;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.$('input').getAttribute('type')).toEqual('number');
      expect(widget.$('input').getAttribute('step')).toEqual('any');
    });

    it('Get value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /11.1/);
      expect(widget.$('input').getValue()).toBe('11.1');
    });

    it('Set new value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /0.33/);
      expect(widget.$('input').getValue()).toBe('0.33');
    });

    it('Set description to "floatText" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /floatText/);
      expect(widget.$('label.widget-label').getText()).toBe('floatText');
    });

    it('Disable widget ', function () {
      cellIndex += 1;
      expect(widget.$('input').isEnabled()).toBeTruthy();
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /true/);
      expect(widget.$('input').isEnabled()).toBeFalsy();
    });
  });

  describe('BoundedIntText widget ', function () {
    var widget;
    it('Cell has BoundedIntText widget ', function () {
      cellIndex += 1;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.$('input').getAttribute('type')).toEqual('number');
      expect(widget.$('input').getAttribute('min')).toEqual('30');
      expect(widget.$('input').getAttribute('max')).toEqual('100');
    });

    it('Get value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /37/);
      expect(widget.$('input').getValue()).toBe('37');
    });

    it('Set max value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /150/);
      expect(widget.$('input').getValue()).toBe('100');
      widget.$('input').click();
      browser.keys('ArrowDown');
      expect(widget.$('input').getValue()).toBe('99');
    });

    it('Set min value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /10/);
      expect(widget.$('input').getValue()).toBe('30');
      widget.$('input').click();
      browser.keys('ArrowUp');
      expect(widget.$('input').getValue()).toBe('31');
    });

    it('Set description to "bit" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /bit/);
      expect(widget.$('label.widget-label').getText()).toBe('bit');
    });

    it('Set step value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /37/);
      widget.$('input').click();
      browser.keys('ArrowUp');
      expect(widget.$('input').getValue()).toBe('40');
    });

    it('Disable widget ', function () {
      cellIndex += 1;
      expect(widget.$('input').isEnabled()).toBeTruthy();
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /true/);
      expect(widget.$('input').isEnabled()).toBeFalsy();
    });
  });

  describe('BoundedFloatText widget ', function () {
    var widget;
    it('Cell has BoundedFloatText widget ', function () {
      cellIndex += 1;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.$('input').getAttribute('type')).toEqual('number');
      expect(widget.$('input').getAttribute('min')).toEqual('3.5');
      expect(widget.$('input').getAttribute('max')).toEqual('10.5');
    });

    it('Get value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /3.7/);
      expect(widget.$('input').getValue()).toBe('3.7');
    });

    it('Set max value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /15/);
      expect(widget.$('input').getValue()).toBe('10.5');
      widget.$('input').click();
      browser.keys('ArrowDown');
      expect(widget.$('input').getValue()).toBe('10.4');
    });

    it('Set min value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /1/);
      expect(widget.$('input').getValue()).toBe('3.5');
      widget.$('input').click();
      browser.keys('ArrowUp');
      expect(widget.$('input').getValue()).toBe('3.6');
    });

    it('Set description to "bft" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /bft/);
      expect(widget.$('label.widget-label').getText()).toBe('bft');
    });

    it('Set step value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /4.123/);
      widget.$('input').click();
      browser.keys('ArrowUp');
      expect(widget.$('input').getValue()).toBe('4.5');
    });

    it('Disable widget ', function () {
      cellIndex += 1;
      expect(widget.$('input').isEnabled()).toBeTruthy();
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /true/);
      expect(widget.$('input').isEnabled()).toBeFalsy();
    });
  });

  describe('ToggleButton widget ', function () {
    var widget;
    it('Cell has ToggleButton widget ', function () {
      cellIndex += 1;
      beakerxPO.kernelIdleIcon.waitForEnabled();
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      widget = codeCell.$('.jupyter-widgets.widget-toggle-button');
      expect(widget.getTagName()).toEqual('button');
      expect(widget.getAttribute('title')).toEqual('tooltip1');
      expect(widget.getText()).toEqual('tggl');
    });

    it('Get value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /false/);
    });

    it('Set value by code ', function () {
      cellIndex += 1;
      expect(widget.getAttribute('class')).not.toMatch(/mod-active/);
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /true/);
      expect(widget.getAttribute('class')).toMatch(/mod-active/);
    });

    it('Set icon by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /check/);
      expect(widget.$('i.fa-check').isExisting()).toBeTruthy();
    });

    it('Set style to "success" ', function () {
      cellIndex += 1;
      expect(widget.getAttribute('class')).not.toMatch(/mod-success/);
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /success/);
      expect(widget.getAttribute('class')).toMatch(/mod-success/);
    });

    it('Disable widget ', function () {
      cellIndex += 1;
      expect(widget.isEnabled()).toBeTruthy();
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /true/);
      expect(widget.isEnabled()).toBeFalsy();
    });
  });

  describe('CheckBox widget ', function () {
    var widget;
    it('Cell has CheckBox widget ', function () {
      cellIndex += 1;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.getAttribute('class')).toMatch(/widget-checkbox/);
      expect(widget.$('input').getAttribute('type')).toEqual('checkbox');
      expect(widget.getText()).toEqual('chb1')
    });

    it('Get value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /false/);
    });

    it('Set value by code ', function () {
      cellIndex += 1;
      expect(widget.$('input').getAttribute('checked')).toBeFalsy();
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /true/);
      expect(widget.$('input').getAttribute('checked')).toBeTruthy();
    });

    it('Disable widget ', function () {
      cellIndex += 1;
      expect(widget.$('input').isEnabled()).toBeTruthy();
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /true/);
      expect(widget.$('input').isEnabled()).toBeFalsy();
    });
  });

  describe('Valid widget ', function () {
    var widget;
    it('Cell has Valid widget ', function () {
      cellIndex += 1;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.getAttribute('class')).toMatch(/widget-valid/);
      expect(widget.$('label').getText()).toEqual('year');
    });

    it('Get value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /false/);
    });

    it('Set value by code ', function () {
      cellIndex += 1;
      expect(widget.getAttribute('class')).toMatch(/mod-invalid/);
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /true/);
      expect(widget.getAttribute('class')).toMatch(/mod-valid/);
    });
  });

  describe('Dropdown widget ', function () {
    var widget;
    it('Cell has Dropdown widget ', function () {
      cellIndex += 1;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.getAttribute('class')).toMatch('widget-dropdown');
      expect(widget.$$('option').length).toEqual(3);
    });

    it('Get value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /2018/);
      expect(widget.$('select').getValue()).toBe('2018');
    });

    it('Set value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /2019/);
      expect(widget.$('select').getValue()).toBe('2019');
    });

    it('Set description to "year" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /year/);
      expect(widget.$('label.widget-label').getText()).toBe('year');
    });

    it('Disable widget ', function () {
      cellIndex += 1;
      expect(widget.$('select').isEnabled()).toBeTruthy();
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /true/);
      expect(widget.$('select').isEnabled()).toBeFalsy();
    });
  });

  describe('RadioButtons widget ', function () {
    var widget;
    it('Cell has RadioButtons widget ', function () {
      cellIndex += 1;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.getAttribute('class')).toMatch('widget-radio');
      expect(widget.$$('input[type="radio"]').length).toEqual(3);
    });

    it('Get value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /April/);
      expect(widget.$$('input[type="radio"]')[0].isSelected()).toBeFalsy();
      expect(widget.$$('input[type="radio"]')[1].isSelected()).toBeTruthy();
    });

    it('Set value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /May/);
      expect(widget.$$('input[type="radio"]')[1].isSelected()).toBeFalsy();
      expect(widget.$$('input[type="radio"]')[2].isSelected()).toBeTruthy();
    });

    it('Set description to "month" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /month/);
      expect(widget.$('label.widget-label').getText()).toBe('month');
    });

    it('Disable widget ', function () {
      cellIndex += 1;
      expect(widget.$$('input[type="radio"]')[0].isEnabled()).toBeTruthy();
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /true/);
      expect(widget.$$('input[type="radio"]')[0].isEnabled()).toBeFalsy();
    });
  });
});