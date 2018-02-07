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

describe('(Groovy) Testing of showing the null execution result', function() {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/notebooks/test/notebooks/groovy/ShowNullExecutionResultTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  describe('(Groovy) Show null execution result as true', function() {
    it('Cell displays true output', function () {
      cellIndex = 0;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(codeCell.$('div.output_result').isEnabled()).toBeTruthy();
      expect(codeCell.$('div.output_result').getText()).toBe('true');
    });
  });

  describe('(Groovy) Show null execution result as null', function() {
    it('Cell displays null output', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(codeCell.$('div.output_result').isEnabled()).toBeTruthy();
      expect(codeCell.$('div.output_result').getText()).toBe('null');
    });
  });

  describe('(Groovy) Do not show null execution result', function() {
    it('Cell displays no output', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(codeCell.$('div.output').childNodes).toBe(undefined);
    });
  });
});
