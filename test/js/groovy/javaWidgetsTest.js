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

describe('Java widgets notebook test ', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/groovy/JavaWidgetsTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe('IntSlider widget ', function () {
    var widget;
    it('Cell has IntSlider widget ', function () {
      cellIndex = 0;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.$('div.slider-container').isEnabled()).toBeTruthy();
    });

    it('Get value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /60/);
      expect(widget.$('div.widget-readout').getText()).toBe('60');
      expect(widget.$('div.ui-slider.ui-widget-content > span').getAttribute('style')).toMatch(/left: 60%/);
    });

    it('Set new value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /76/);
      expect(widget.$('div.widget-readout').getText()).toBe('76');
      expect(widget.$('div.ui-slider.ui-widget-content > span').getAttribute('style')).toMatch(/left: 76%/);
    });

    it('Set description to "desc1" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /desc1/);
      expect(widget.$('label.widget-label').getText()).toBe('desc1');
    });

    it('Disable widget ', function () {
      cellIndex += 1;
      expect(widget.$('div.ui-slider').getAttribute('class')).not.toMatch(/ui-slider-disabled/);
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /true/);
      expect(widget.$('div.ui-slider').getAttribute('class')).toMatch(/ui-slider-disabled/);
    });

    it('Set max to "250" and min to "50" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /50/);
      expect(widget.$('div.widget-readout').getText()).toBe('150');
      expect(widget.$('span').getAttribute('style')).toMatch(/left: 50%/);
    });

    it('Set to vertical orientation ', function () {
      cellIndex += 1;
      expect(widget.$('div.ui-slider').getAttribute('class')).toMatch(/ui-slider-horizontal/);
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /vertical/);
      expect(widget.$('div.ui-slider').getAttribute('class')).toMatch(/ui-slider-vertical/);
      expect(widget.$('span').getAttribute('style')).toMatch(/bottom: 50%/)
    });

    it('Set step to "20" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /76/);
      expect(widget.$('span').getAttribute('style')).toMatch(/bottom: 10%/)
    });

    it('Change widget color ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /#F04080/);
      expect(widget.$('span').getCssProperty('background-color').value).toEqual('rgba(240,64,128,1)');
    });
  });

  describe('IntProgress widget ', function () {
    var widget;
    it('Cell has IntProgress widget ', function () {
      cellIndex += 1;
      widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.$('div.progress').isEnabled()).toBeTruthy();
    });

    it('Get value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /60/);
    });

    it('Set value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /76/);
      expect(widget.$('div.progress-bar').getAttribute('style')).toMatch(/width: 76%/);
    });

    it('Set description to "desc2" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /desc2/);
      expect(widget.$('label.widget-label').getText()).toBe('desc2');
    });

    it('Set max to "250" and min to "50" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /150/);
      expect(widget.$('div.progress-bar').getAttribute('style')).toMatch(/width: 50%/);
    });

    it('Set to vertical orientation ', function () {
      cellIndex += 1;
      expect(widget.getAttribute('class')).toMatch(/widget-inline-hbox/);
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /vertical/);
      expect(widget.getAttribute('class')).toMatch(/widget-inline-vbox/);
    });

    it('Set step to "20" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /76/);
      expect(widget.$('div.progress-bar').getAttribute('style')).toMatch(/height: 13%/);
    });

    it('Set style to "SUCCESS" ', function () {
      cellIndex += 1;
      expect(widget.$('div.progress-bar').getAttribute('class')).not.toMatch(/progress-bar-success/);
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /SUCCESS/);
      expect(widget.$('div.progress-bar').getAttribute('class')).toMatch(/progress-bar-success/);
    });
  });

});