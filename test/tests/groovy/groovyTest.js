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

describe('Groovy tests', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/notebooks/test/notebooks/groovy/GroovyTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  describe('Run first cell. ', function () {
    it('Output contains "2"', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCallAndCheckOutputText(0, '2');
    });
  });

  describe('Run 2nd cell. ', function () {
    it('Output contains "groovy.lang.MissingPropertyException"', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCallAndCheckOutputText(1, 'groovy.lang.MissingPropertyException');
    });
  }, 2);

  describe('Run 3rd cell. ', function () {
    it('Output contains "2"', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCallAndCheckOutputText(2, '2');
    });
  }, 2);

  describe('Run 4th cell. ', function () {
    it('Output contains "run_closure"', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCallAndCheckOutputText(3, 'run_closure');
    });
  }, 2);

  describe('Run 5th cell. ', function () {
    it('Output contains "8"', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCallAndCheckOutputText(4, '8');
    });
  }, 2);

  describe('Run 6th cell. ', function () {
    it('Output contains "Multiplying Strings!Multiplying Strings!"', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCallAndCheckOutputText(5, 'Multiplying Strings!Multiplying Strings!');
    });
  }, 2);

  describe('Run 7th cell. ', function () {
    it('Output contains "9.265"', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCallAndCheckOutputText(6, '9.265');
    });
  }, 2);

  function checkCyrilicString(str){
    expect(str.charCodeAt(0).toString(16)).toEqual('44d');
    expect(str.charCodeAt(1).toString(16)).toEqual('44e');
    expect(str.charCodeAt(2).toString(16)).toEqual('44f');
  }

  describe('Cyrillic symbols', function () {
    var codeCell;

    it('Output contains UTF-8 hex string', function () {
      codeCell = beakerxPO.runCodeCellByIndex(7);
      beakerxPO.kernelIdleIcon.waitForEnabled();
      expect(codeCell.$('.output_subarea.output_text').getText()).toMatch('d18dd18ed18f');
    });

    it('Plot title is cyrillic (cp1521)', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      checkCyrilicString(codeCell.$('div#plotTitle').getText());
    });

    it('Plot x label is cyrillic (utf8 from cp1521)', function () {
      var svg = codeCell.$('#svgg');
      checkCyrilicString(svg.$('text#xlabel').getText());
    });

    it('Plot y label is cyrillic (utf-8)', function () {
      var svg = codeCell.$('#svgg');
      checkCyrilicString(svg.$('text#ylabel').getText());
    });
  }, 2);

  describe('getCodeCells(tag) method', function () {

    it('Tag cell output contains "5"', function(){
      beakerxPO.runCallAndCheckOutputText(8, '5');
    });

    it('Output contains table', function () {
      var codeCell = beakerxPO.runCodeCellByIndex(9);
      beakerxPO.kernelIdleIcon.waitForEnabled();
      var bkoTable = codeCell.$('div.bko-table');
      bkoTable.waitForEnabled();
      expect(bkoTable.isVisible()).toBeTruthy();
      expect(bkoTable.$('tbody > tr').getText()).toMatch('"text/plain":"5"');
    });
  }, 2);

});