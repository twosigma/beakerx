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

describe('Scala base tests ', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/scala/ScalaTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe('Define scala class ', function () {
    it('Execute result output contains "defined class Greeter" ', function () {
      cellIndex = 0;
      beakerxPO.runAndCheckOutputTextOfExecuteResult(cellIndex, /defined class Greeter/);
    });
  });

  describe('Call defined class ', function () {
    it('Stdout output contains "Hello, Scala developer!" ', function () {
      cellIndex += 1;
      beakerxPO.runAndCheckOutputTextOfStdout(cellIndex, /Hello, Scala developer!/);
    });
  });

  describe('(Scala) Press "Tab" to autocomplete code ', function(){
    it('Autocomplete list is not empty ', function(){
      cellIndex += 1;
      var codeCell = beakerxPO.getCodeCellByIndex(cellIndex);
      var completeList = beakerxPO.callAutocompleteAndGetItsList(codeCell, 'pr');
      expect(completeList.length).toBeGreaterThan(0);
    });
  });

});