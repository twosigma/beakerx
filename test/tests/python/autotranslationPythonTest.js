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

describe('Autotranslation Python to JavaScript and D3 tests', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/notebooks/test/notebooks/python/AutoTranslationPythonTest.ipynb');
  });

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  describe('Python code', function(){
    it('Output contains data table', function(){
      var codeCell = beakerxPO.runCodeCellByIndex(0);
      var bkoTable = codeCell.$('div.bko-table');
      expect(bkoTable.isEnabled()).toBeTruthy();
      var headTable = bkoTable.$('div.dataTables_scrollHead');
      expect(headTable.$('th[data-column-index="1"]').getText()).toMatch('radius');
      expect(headTable.$('th[data-column-index="2"]').getText()).toMatch('colorB');
      expect(bkoTable.$('div.dataTables_scrollBody').$$('tbody > tr').length).toEqual(10);
    });
  });

  describe('JavaScript and D3 code', function(){
    var svgElement;

    it('Output contains svg tag', function(){
      beakerxPO.runCodeCellByIndex(1);
      beakerxPO.runCodeCellByIndex(2);
      var codeCell = beakerxPO.runCodeCellByIndex(3);
      browser.pause(2000);
      svgElement = codeCell.$('div#bkrx > svg');
      expect(svgElement.isEnabled()).toBeTruthy();
    });

    it('svg has our attributes', function(){
      expect(Math.round(svgElement.getAttribute('width'))).toEqual(600);
      expect(Math.round(svgElement.getAttribute('height'))).toEqual(200);
      expect(svgElement.getAttribute('transform')).toMatch('translate');
    });

    it('svg has 10 circles', function(){
      expect(svgElement.$$('circle').length).toEqual(10);
    });

  });

});