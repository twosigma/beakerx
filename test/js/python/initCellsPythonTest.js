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

describe('(Python) Testing of init cells', function() {
  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/python/InitCellsTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe('(Python) Init cells ', function() {
    it('Init cells display correct output ', function(){
      cellIndex = 0;
      beakerxPO.runCodeCellByIndex(cellIndex);
      var currentDate = Date().split(' ').slice(0, 4).join(' ');
      beakerxPO.waitAndCheckOutputTextOfStdout(cellIndex,  new RegExp(currentDate));
    });
  });

  describe('(Python) Press "Tab" to autocomplete code ', function(){
    it('Autocomplete list is not empty ', function(){
      cellIndex += 1;
      var codeCell = beakerxPO.getCodeCellByIndex(cellIndex);
      var completeList = beakerxPO.callAutocompleteAndGetItsList(codeCell, 'im');
      expect(completeList.length).toBeGreaterThan(0);
    });
  });

  describe('(Python) Press "Shift + Tab" to display doc ', function(){
    it('doc tooltip is not empty ', function(){
      cellIndex += 1;
      var codeCell = beakerxPO.getCodeCellByIndex(cellIndex);
      var tooltip = beakerxPO.callDocAndGetItsTooltip(codeCell, 'time');
      expect(tooltip.getText().length).toBeGreaterThan(0);
    });
  });

});
