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

describe('(Groovy) Java Properties and Heap Size tests', function () {
  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runJupyterRoot();
    beakerxPO.goToJVMOptions();
    beakerxPO.setHeapSize('4');

    if (!beakerxPO.getPropertyFormGroupByIndex(0)) {
      beakerxPO.addPropertyPair();
    }

    beakerxPO.setProperty('myproperty', 'cookies');

    beakerxPO.runNotebookByUrl('/test/ipynb/groovy/JavaArgsTest.ipynb');
  });

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe('Java Properties and Heap Size', function () {
    it('Proper max memory is displayed', function () {
      cellIndex = 0;

      var output = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(output.$('.output_subarea').getText()).toBe('3.817865216');
    });

    it('Correct property is set', function () {
      cellIndex += 1;

      output = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(output.$('.output_subarea').getText()).toBe('cookies');
    });
  });
});