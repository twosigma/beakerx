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
      expect(widget.$('select').getValue()).toBe('sunny side up');
    });

    it('Set new value by code ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /poached/);
      expect(widget.$('span').getAttribute('style')).toMatch(/left: 50%/);
      expect(widget.$('select').getValue()).toBe('poached');
    });

    it('Set description to "I like my eggs" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /I like my eggs/);
      expect(widget.$('label.widget-label').getText()).toMatch(/I like my eggs/);
    });

    it('Disable widget ', function () {
      cellIndex += 1;
      expect(widget.$('div.ui-slider').getAttribute('class')).not.toMatch(/ui-slider-disabled/);
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /true/);
      expect(widget.$('div.ui-slider').getAttribute('class')).toMatch(/ui-slider-disabled/);
    });
  });

});