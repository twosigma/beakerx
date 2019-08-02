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
    beakerxPO.runNotebookByUrl('/test/ipynb/groovy/JavaWidgets3Test.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe('Select widget ', function () {
    var widget;
    it('Cell has Select widget ', function () {
      cellIndex = 0;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.getAttribute('class')).toMatch(/widget-select/);
      expect(widget.$$('option').length).toEqual(3);
    });

    it('Get value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /Windows/);
      expect(widget.$('select').getValue()).toBe('Windows');
    });

    it('Set new value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /Linux/);
      expect(widget.$('select').getValue()).toBe('Linux');
    });

    it('Set description to "os" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /os/);
      expect(widget.$('label.widget-label').getText()).toBe('os');
    });

    it('Disable widget ', function () {
      cellIndex += 1;
      expect(widget.$('select').isEnabled()).toBeTruthy();
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /true/);
      expect(widget.$('select').isEnabled()).toBeFalsy();
    });
  });

  describe('SelectionSlider widget ', function () {
    var widget;
    it('Cell has SelectionSlider widget ', function () {
      cellIndex += 1;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.getAttribute('class')).toMatch(/widget-slider/);
      expect(widget.$('div.slider-container').isEnabled()).toBeTruthy();
    });

    it('Get value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /sunny side up/);
      expect(widget.$('span').getAttribute('style')).toMatch(/left: 25%/);
      expect(widget.$('div.widget-readout').getText()).toBe('sunny side up');
    });

    it('Set new value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /poached/);
      expect(widget.$('span').getAttribute('style')).toMatch(/left: 50%/);
      expect(widget.$('div.widget-readout').getText()).toBe('poached');
    });

    it('Set description to "I like my eggs" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /I like my eggs/);
      expect(widget.$('label.widget-label').getText()).toMatch(/I like my eggs/);
    });

    it('Set to vertical orientation ', function () {
      cellIndex += 1;
      expect(widget.$('div.ui-slider').getAttribute('class')).toMatch(/ui-slider-horizontal/);
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /vertical/);
      expect(widget.$('div.ui-slider').getAttribute('class')).toMatch(/ui-slider-vertical/);
      expect(widget.$('span').getAttribute('style')).toMatch(/bottom: 50%/)
    });

    it('Disable widget ', function () {
      cellIndex += 1;
      expect(widget.$('div.ui-slider').getAttribute('class')).not.toMatch(/ui-slider-disabled/);
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /true/);
      expect(widget.$('div.ui-slider').getAttribute('class')).toMatch(/ui-slider-disabled/);
    });
  });

  describe('ToggleButtons widget ', function () {
    var widget;
    it('Cell has ToggleButtons widget ', function () {
      cellIndex += 1;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.getAttribute('class')).toMatch(/widget-toggle-buttons/);
      expect(widget.$$('button').length).toEqual(3);
    });

    it('ToggleButtons has tooltips ', function () {
      expect(widget.$$('button')[0].getAttribute('title')).toBe('SL');
      expect(widget.$$('button')[1].getAttribute('title')).toBe('RE');
      expect(widget.$$('button')[2].getAttribute('title')).toBe('Fast');
    });

    it('Get value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /Slow/);
    });

    it('Set value by code ', function () {
      cellIndex += 1;
      expect(widget.$$('button')[1].getAttribute('class')).not.toMatch(/mod-active/);
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /Regular/);
      expect(widget.$$('button')[1].getAttribute('class')).toMatch(/mod-active/);
    });

    it('Set description to "Speed" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /Speed:/);
      expect(widget.$('label.widget-label').getText()).toBe('Speed:');
    });

    it('Set style to "info" ', function () {
      cellIndex += 1;
      expect(widget.$$('button')[1].getAttribute('class')).not.toMatch(/mod-info/);
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /info/);
    });

    it('Set icon by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /check/);
      expect(widget.$$('button')[1].getAttribute('class')).toMatch(/mod-info/);
      expect(widget.$$('button')[2].getAttribute('class')).toMatch(/mod-info/);
      expect(widget.$$('button')[1].$('i.fa-check').isExisting()).toBeTruthy();
      expect(widget.$$('button')[2].$('i.fa-check').isExisting()).toBeTruthy();
    });

    it('Disable widget ', function () {
      cellIndex += 1;
      expect(widget.$$('button')[0].isEnabled()).toBeTruthy();
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /true/);
      expect(widget.$$('button')[0].isEnabled()).toBeFalsy();
      expect(widget.$$('button')[1].isEnabled()).toBeFalsy();
    });
  });

  describe('SelectMultiple widget ', function () {
    var widget;
    it('Cell has SelectMultiple widget ', function () {
      cellIndex += 1;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.getAttribute('class')).toMatch(/widget-select-multiple/);
      expect(widget.$$('option').length).toEqual(3);
    });

    it('Get value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /Windows.*Linux/);
      expect(widget.$('option=Windows').isSelected()).toBeTruthy();
      expect(widget.$('option=Linux').isSelected()).toBeTruthy();
      expect(widget.$('option=OSX').isSelected()).toBeFalsy();
    });

    it('Set new value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /Linux/);
      expect(widget.$('select').getValue()).toBe('Linux');
      expect(widget.$('option=Linux').isSelected()).toBeTruthy();
      expect(widget.$('option=OSX').isSelected()).toBeTruthy();
      expect(widget.$('option=Windows').isSelected()).toBeFalsy();
    });

    it('Set description to "os" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /os/);
      expect(widget.$('label.widget-label').getText()).toBe('os');
    });

    it('Disable widget ', function () {
      cellIndex += 1;
      expect(widget.$('select').isEnabled()).toBeTruthy();
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /true/);
      expect(widget.$('select').isEnabled()).toBeFalsy();
    });
  });

  describe('Text widget ', function () {
    var widget;
    it('Cell has Text widget ', function () {
      cellIndex += 1;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.getAttribute('class')).toMatch(/widget-text/);
      expect(widget.$('input').getAttribute('type')).toEqual('text');
    });

    it('Get value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /Test Text/);
      expect(widget.$('input').getValue()).toMatch(/Test Text/);
    });

    it('Set new value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /new value/);
      expect(widget.$('input').getValue()).toMatch(/new value/);
    });

    it('Set description to "desc" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /desc/);
      expect(widget.$('label.widget-label').getText()).toBe('desc');
    });

    it('Disable widget ', function () {
      cellIndex += 1;
      expect(widget.$('input').isEnabled()).toBeTruthy();
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /true/);
      expect(widget.$('input').isEnabled()).toBeFalsy();
    });
  });

  describe('TextArea widget ', function () {
    var widget;
    it('Cell has TextArea widget ', function () {
      cellIndex += 1;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.getAttribute('class')).toMatch(/widget-textarea/);
      expect(widget.$('textarea').isExisting()).toBeTruthy();
    });

    it('Get value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /Textarea example/);
      expect(widget.$('textarea').getValue()).toMatch(/Textarea example/);
    });

    it('Set new value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /new value/);
      expect(widget.$('textarea').getValue()).toMatch(/new value/);
    });

    it('Set description to "desc" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /desc/);
      expect(widget.$('label.widget-label').getText()).toBe('desc');
    });

    it('Disable widget ', function () {
      cellIndex += 1;
      expect(widget.$('textarea').isEnabled()).toBeTruthy();
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /true/);
      expect(widget.$('textarea').isEnabled()).toBeFalsy();
    });
  });

  describe('Label widget ', function () {
    var widget;
    it('Cell has Label widget ', function () {
      cellIndex += 1;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.getAttribute('class')).toMatch(/widget-label/);
    });

    it('Get value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /Lbl123/);
      expect(widget.getText()).toMatch(/Lbl123/);
    });

    it('Set new value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /new value/);
      expect(widget.getText()).toMatch(/new value/);
    });
  });

  describe('HTML widget ', function () {
    var widget;
    it('Cell has HTML widget ', function () {
      cellIndex += 1;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.getAttribute('class')).toMatch(/widget-html/);
      expect(widget.$('input').getAttribute('type')).toEqual('text');
    });

    it('Get value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /<input type="text"/);
      expect(widget.$('input').getValue()).toMatch(/test/);
    });

    it('Set new value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /<b>Hello World/);
      expect(widget.$('b').getText()).toBe('Hello World');
    });

    it('Set description to "some HTML" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /some HTML:/);
      expect(widget.$('label.widget-label').getText()).toBe('some HTML:');
    });
  });

  describe('HTML Math widget ', function () {
    var widget;
    it('Cell has HTML Math widget ', function () {
      cellIndex += 1;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.getAttribute('class')).toMatch(/widget-htmlmath/);
      expect(widget.$('.MathJax').isExisting()).toBeTruthy();
    });

    it('Get value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /x squared looks as \$x\^2\$/);
      expect(widget.$('mi').getText()).toMatch(/x/);
    });

    it('Set new value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /y squared looks as \$y\^2\$/);
      browser.pause(1000);
      expect(widget.$('mi').getText()).toMatch(/y/);
    });

    it('Set description to "formula" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /formula:/);
      expect(widget.$('label.widget-label').getText()).toBe('formula:');
    });
  });

  describe('Button widget ', function () {
    var widget;
    it('Cell has Button widget ', function () {
      cellIndex += 1;
      beakerxPO.kernelIdleIcon.waitForEnabled();
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      widget = codeCell.$('.jupyter-widgets.widget-button');
      expect(widget.getTagName()).toEqual('button');
      expect(widget.getAttribute('title')).toEqual('tooltip1');
      expect(widget.getText()).toEqual('click me');
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

});