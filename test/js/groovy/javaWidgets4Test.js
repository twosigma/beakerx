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
    beakerxPO.runNotebookByUrl('/test/ipynb/groovy/JavaWidgets4Test.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe('Image widget ', function () {
    var widget;
    it('Cell has Image widget ', function () {
      cellIndex = 0;
      beakerxPO.kernelIdleIcon.waitForEnabled();
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      widget = codeCell.$('.jupyter-widgets');
      expect(widget.getTagName()).toBe('img');
      expect(widget.getAttribute('class')).toMatch(/widget-image/);
      expect(widget.getAttribute('src')).toMatch('blob:http');
    });
  });

  describe('DatePicker widget ', function () {
    var widget;
    it('Cell has DatePicker widget ', function () {
      cellIndex += 1;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.getAttribute('class')).toMatch(/datepicker-container/);
    });

    it('Should select 25th day ', function () {
      cellIndex += 1;
      widget.$('a.date-picker-button').click();
      browser.$('span.flatpickr-day=25').click();
      expect(widget.$('input[type="text"]').getValue()).toMatch('25');
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var result = beakerxPO.getAllOutputsExecuteResult(codeCell)[0].getText();
      expect(result).toMatch('25');
    });

    it('Should select 27th day by code ', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      expect(widget.$('input[type="text"]').getValue()).toMatch('27');
    });

    it('Set description to "happy day" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /happy day/);
      expect(widget.$('label.widget-label').getText()).toBe('happy day');
    });

    it('Disable widget ', function () {
      cellIndex += 1;
      expect(widget.$('input').isEnabled()).toBeTruthy();
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /true/);
      expect(widget.$('input').isEnabled()).toBeFalsy();
    });
  });

  describe('ColorPicker widget ', function () {
    var widget;
    it('Cell has ColorPicker widget ', function () {
      cellIndex += 1;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.getAttribute('class')).toMatch(/widget-colorpicker/);
    });

    it('Get value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /blue/);
      expect(widget.$('input').getValue()).toBe('blue');
    });

    it('Set value by code ', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      expect(widget.$('input[type="text"]').getValue()).toMatch('red');
    });

    it('Set "concise" property to true ', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      expect(widget.$('input').isDisplayed()).toBeFalsy();
    });

    it('Set description to "happy color" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /happy color/);
      expect(widget.$('label.widget-label').getText()).toBe('happy color');
    });

    it('Disable widget ', function () {
      cellIndex += 1;
      expect(widget.$('input').isEnabled()).toBeTruthy();
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /true/);
      expect(widget.$('input').isEnabled()).toBeFalsy();
    });
  });

  describe('Container widgets ', function () {
    var widget;
    it('Cell has VBox widget ', function () {
      cellIndex += 1;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.getAttribute('class')).toMatch(/widget-vbox/);
      expect(widget.$$('div.widget-inline-hbox').length).toBe(2);
    });

    it('Cell has HBox widget ', function () {
      cellIndex += 1;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.getAttribute('class')).toMatch(/widget-hbox/);
      expect(widget.$$('div.widget-inline-hbox').length).toBe(2);
    });

    it('Cell has Tabs widget ', function () {
      cellIndex += 1;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.getAttribute('class')).toMatch(/widget-tab/);
      expect(widget.$$('li.p-TabBar-tab').length).toBe(2);
    });

    it('Cell has Accordion widget ', function () {
      cellIndex += 1;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.getAttribute('class')).toMatch(/widget-accordion/);
      expect(widget.$$('div.p-Accordion-child').length).toBe(2);
    });
  });

  describe('Play widget ', function () {
    var widget;
    cellIndex += 1;
    it('(Link) Cell has Play widget ', function () {
      cellIndex += 1;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.$('div.widget-play').isEnabled()).toBeTruthy();
    });

    it('(Link) Start play ', function () {
      expect(widget.$('div.widget-readout').getText()).toBe('10');
      widget.$$('button')[0].click();
      browser.pause(1000);
      expect(parseInt(widget.$('div.widget-readout').getText())).toBeGreaterThan(10);
    });

    it('(jslink) Cell has Play widget ', function () {
      cellIndex += 1;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.$('div.widget-play').isEnabled()).toBeTruthy();
    });

    it('(jslink) Start play ', function () {
      expect(widget.$('div.widget-readout').getText()).toBe('20');
      widget.$$('button')[0].click();
      browser.pause(1000);
      expect(parseInt(widget.$('div.widget-readout').getText())).toBeGreaterThan(20);
    });

    it('(DirectionalLink) Cell has Play widget ', function () {
      cellIndex += 1;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.$('div.widget-play').isEnabled()).toBeTruthy();
    });

    it('(DirectionalLink) Start play ', function () {
      expect(widget.$('div.widget-readout').getText()).toBe('30');
      widget.$$('button')[0].click();
      browser.pause(1000);
      expect(parseInt(widget.$('div.widget-readout').getText())).toBeGreaterThan(30);
    });

    it('(jsdlink) Cell has Play widget ', function () {
      cellIndex += 1;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.$('div.widget-play').isEnabled()).toBeTruthy();
    });

    it('(jsdlink) Start play ', function () {
      expect(widget.$('div.widget-readout').getText()).toBe('40');
      widget.$$('button')[0].click();
      browser.pause(1000);
      expect(parseInt(widget.$('div.widget-readout').getText())).toBeGreaterThan(40);
    });
  });

});