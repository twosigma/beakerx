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
    beakerxPO.runNotebookByUrl('/notebooks/test/notebooks/groovy/handlingCombinationOfCodeAndMagics.ipynb');
  });

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex = 0;

  describe('Combination of code and magics', function () {
    it('mixing of println code and %time magic', function () {
      var outputs = beakerxPO.runCodeCellByIndex(cellIndex).$$('div.output_subarea.output_text')
      browser.pause(2000);
      expect(outputs[0].getText()).toMatch(
        /test1\n221\nCPU times: user \d+ ns, sys: \d+ ns, total: \d+ ns.*\n+Wall Time: \d+ ms/);
      expect(outputs[0].getText()).toMatch(
        /test2\nCPU times: user \d+ ns, sys: \d+ ns, total: \d+ ns.*\n+Wall Time: \d+ ms/);
      expect(outputs[1].getText()).toMatch(/3/);
    });

    it('using of %import magic inside code', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      //TODO check output
    });

    it('%classpath and %import magics', function () {
      cellIndex += 1;
      beakerxPO.runCellAndCheckOutputText(cellIndex, /Added jar:.+testdemo\.jar.+/);
    });

    it('%time magic and println code', function () {
      cellIndex += 1;
      beakerxPO.runCellAndCheckOutputText(cellIndex,
        /x.*y\nCPU times: user \d+ ns, sys: \d+ ns, total: \d+ ns.*\n+Wall Time: \d+ ms/);
    });

    it('%classpath for jar which contains spaces in name', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      //TODO check output
    });
  });

});