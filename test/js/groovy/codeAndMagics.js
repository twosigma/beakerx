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

describe('Tests for combination of code and magics', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/groovy/codeAndMagicsTest.ipynb');
  });

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex = 0;
  var timeExp = /CPU times: user \d+.+, sys: \d+.+, total: \d+.+\n+Wall Time: \d+/;
  var errorExp = /org.codehaus.groovy.control.MultipleCompilationErrorsException:/;

  describe('Combination of code and magics', function () {
    it('mixing of println code and %time magic', function () {
      var outputs = beakerxPO.runCodeCellByIndex(cellIndex).$$(beakerxPO.getAllOutputTextCss());
      browser.pause(2000);
      expect(outputs[0].getText()).toMatch(new RegExp('test1\n221\n' + timeExp.source));
      expect(outputs[0].getText()).toMatch(new RegExp('test2\n' + timeExp.source));
      expect(outputs[1].getText()).toMatch(/3/);
    });

    it('%import magic inside code', function () {
      cellIndex += 1;
      var outputs = beakerxPO.runCodeCellByIndex(cellIndex).$$(beakerxPO.getAllOutputTextCss());
      browser.pause(2000);
      expect(outputs[0].getText()).toMatch(errorExp);
      expect(outputs[1].getText()).toMatch(new RegExp('221\n' + timeExp.source));
      expect(outputs[2].getText()).toMatch(errorExp);
      expect(outputs[3].getText()).toMatch(timeExp);
      expect(outputs[4].getText()).toMatch(/3/);
    });

    it('Using of the spaces in %classpath and %import magics', function () {
      cellIndex += 1;
      beakerxPO.runCellAndCheckOutputText(cellIndex, /Added jar:.+testdemo\.jar.+/);
    });

    it('Cell has IntSlider widget', function () {
      cellIndex += 1;
      var widget = beakerxPO.runCellToGetWidgetElement(cellIndex);
      expect(widget.$('div.slider-container').isEnabled()).toBeTruthy();
    });

    it('Output contains "Demo_test_123"', function () {
      cellIndex += 1;
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCellAndCheckOutputText(cellIndex, 'Demo_test_123');
    });

    it('Using of the spaces in %time magic and println code', function () {
      cellIndex += 1;
      beakerxPO.runCellAndCheckOutputText(cellIndex, new RegExp(/x\s{4}y\n/.source + timeExp.source));
    });

    it('%classpath for jar which contains spaces in name', function () {
      cellIndex += 1;
      beakerxPO.runCellAndCheckOutputText(cellIndex, /Added jar:.+ with space\.jar.+/);
    });
  });

});