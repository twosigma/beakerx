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

describe('Clojure base tests ', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/clojure/ClojureTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe('Run first cell ', function () {
    it('Execute result output contains "0, 1, 1, 2, 3, 5" ', function () {
      cellIndex = 0;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /0, 1, 1, 2, 3, 5/);
    });
  });

  describe('Run 2nd cell ', function () {
    it('Stdout output contains "Will print" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfStdout(cellIndex, /Will print/);
    });
  });

  describe('Run 3rd cell ', function () {
    it('Execute result output contains "Distinct: 36" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfStdout(cellIndex, /Distinct: 36/);
    });
  });

  describe('(Clojure) Press "Tab" to autocomplete code ', function(){
    it('Autocomplete list is not empty ', function(){
      cellIndex += 1;
      var codeCell = beakerxPO.getCodeCellByIndex(cellIndex);
      var completeList = beakerxPO.callAutocompleteAndGetItsList(codeCell);
      expect(completeList.length).toBeGreaterThan(0);
    });
  });

});