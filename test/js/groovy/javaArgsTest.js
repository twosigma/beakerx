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

    $('input#heap_GB').waitForEnabled();
    beakerxPO.setHeapSize('5');

    beakerxPO.addPropertyPair();
    beakerxPO.setProperty('myproperty', 'cookies');
  });

  afterEach(function () {

    beakerxPO.clickCellAllOutputClear();
    beakerxPO.clickSaveNotebook();
    browser.waitUntil(function () {
      var autosaveStatus = $('span.autosave_status').getText();

      return autosaveStatus === '(autosaved)';
    }, 4000);
    browser.click('=File');
    browser.waitForEnabled('=Close and Halt');
    browser.click('=Close and Halt');

  });

  var cellIndex;

  describe('Test Java properties and heap size', function () {

    it('Proper max memory is displayed when setting heap size to 5GB', function () {
      beakerxPO.runNotebookByUrl('/test/ipynb/groovy/JavaArgsTest.ipynb');

      cellIndex = 0;
      var output = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(parseFloat(output.$('.output_subarea').getText()).toFixed(1)).toBe('4.8');
    });

    it('Correct property is set', function () {
      beakerxPO.runNotebookByUrl('/test/ipynb/groovy/JavaArgsTest.ipynb');
      cellIndex += 1;

      output = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(output.$('.output_subarea').getText()).toBe('cookies');
    });

    it('Proper max memory is displayed when setting heap size to 3GB', function () {
      beakerxPO.runJupyterRoot();
      beakerxPO.goToJVMOptions();

      $('input#heap_GB').waitForEnabled();
      beakerxPO.setHeapSize('3');

      beakerxPO.addPropertyPair();
      beakerxPO.setProperty('myproperty', 'cream');

      beakerxPO.runNotebookByUrl('/test/ipynb/groovy/JavaArgsTest.ipynb');

      cellIndex = 0;
      var output = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(parseFloat(output.$('.output_subarea').getText()).toFixed(1)).toBe('2.9');
    });

    it('Correct property is set after change', function () {
      beakerxPO.runNotebookByUrl('/test/ipynb/groovy/JavaArgsTest.ipynb');
      cellIndex += 1;

      output = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(output.$('.output_subarea').getText()).toBe('cream');
    });

    it('Correct property is displayed after clearing the form', function () {
      beakerxPO.runJupyterRoot();
      beakerxPO.goToJVMOptions();

      beakerxPO.removeProperty();

      beakerxPO.runNotebookByUrl('/test/ipynb/groovy/JavaArgsTest.ipynb');
      cellIndex = 1;

      output = beakerxPO.runCodeCellByIndex(cellIndex);

      expect(output.$('.output_subarea').getText()).toBe('null');
    });
  });
});