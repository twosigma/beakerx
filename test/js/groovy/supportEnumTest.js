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

describe('(Groovy) Testing Enum Support', function () {
  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/groovy/SupportEnum.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe('(Groovy) Enum', function () {
    var testValues = {
      null: 'null',
      colors: '[BLUE, RED, WHITE]',
      car: 'Car@'
    };

    it('Cell enumerates colors', function () {
      cellIndex = 0;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(codeCell.$('div.output_result').getText()).toBe(testValues.null);
    });

    it('Cell properly displays a list of colors', function () {
      cellIndex += 1;
      codeCell = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(codeCell.$('div.output_result').getText()).toBe(testValues.colors);
    });

    it('Cell sets up a car class', function () {
      cellIndex += 1;
      codeCell = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(codeCell.$('div.output_result').getText()).toBe(testValues.null);
    });

    it('Cell properly displays a list of colors', function () {
      cellIndex += 1;
      codeCell = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(codeCell.$('div.output_result').getText()).toContain(testValues.car);
    });
  });
});
