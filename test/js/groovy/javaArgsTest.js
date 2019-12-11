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
  });

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe('Test Java properties and heap size', function () {

    it('Proper max memory is displayed when setting heap size to 5GB', function () {
      beakerxPO.setJVMProperties('5', 'myproperty', 'cookies', '/test/ipynb/groovy/JavaArgsTest.ipynb');
      beakerxPO.runNotebookByUrl('/test/ipynb/groovy/JavaArgsTest.ipynb');

      cellIndex = 0;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var heapSize = parseFloat(beakerxPO.getAllOutputsExecuteResult(codeCell)[0].getText()).toFixed(1);
      expect(heapSize).toBeGreaterThan(4.7);
      expect(heapSize).toBeLessThan(5.3);
    });

    it('Correct property is set', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      expect(beakerxPO.getAllOutputsExecuteResult(codeCell)[0].getText()).toBe('cookies');
      beakerxPO.saveAndCloseNotebook();
    });

    it('Proper max memory is displayed when setting heap size to 3GB', function () {
      beakerxPO.setJVMProperties('3', 'myproperty', 'cream');
      beakerxPO.runNotebookByUrl('/test/ipynb/groovy/JavaArgsTest.ipynb');

      cellIndex = 0;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var heapSize = parseFloat(beakerxPO.getAllOutputsExecuteResult(codeCell)[0].getText()).toFixed(1);
      expect(heapSize).toBeGreaterThan(2.7);
      expect(heapSize).toBeLessThan(3.3);
    });

    it('Correct property is set after change', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      expect(beakerxPO.getAllOutputsExecuteResult(codeCell)[0].getText()).toBe('cream');
      beakerxPO.saveAndCloseNotebook();
    });

    it('Correct property is displayed after clearing the form', function () {
      beakerxPO.setJVMProperties('', null, null);
      beakerxPO.runNotebookByUrl('/test/ipynb/groovy/JavaArgsTest.ipynb');

      cellIndex = 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      expect(beakerxPO.getAllOutputsExecuteResult(codeCell)[0].getText()).toBe('null');
    });
  });
});