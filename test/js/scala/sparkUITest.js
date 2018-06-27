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

describe('Spark UI', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/scala/SparkUI_example.ipynb');
  });

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;

  describe('Add Spark jars ', function () {
    it('Should add Spark jars ', function () {
      cellIndex = 0;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.waitAndCheckOutputTextOfWidget(cellIndex, /spark-sql/, 1);
      beakerxPO.waitAndCheckOutputTextOfWidget(cellIndex, /spark-core/, 1);
    });
  });

  describe('Spark cell magic ', function () {
    var output;

    it('Should display GUI dialog', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      output = beakerxPO.getAllOutputsWidget(codeCell)[0];
      expect(output.$('button.p-Widget.bx-spark-connect').isEnabled()).toBeTruthy();
      expect(output.$('div.p-Widget.bx-spark-profile').isEnabled()).toBeTruthy();
      expect(output.$('div.p-Widget.bx-spark-master-url').isEnabled()).toBeTruthy();
      expect(output.$('div.p-Widget.bx-spark-executor-cores').isEnabled()).toBeTruthy();
      expect(output.$('div.p-Widget.bx-spark-executor-memory').isEnabled()).toBeTruthy();
    });

    it('Should start spark session', function () {
      output.click('button.p-Widget.bx-spark-connect');
      browser.waitUntil(function(){
        return output.$('div.p-Widget.bx-status-panel').isVisible();
      });
      expect(output.$('div.p-Widget.bx-status-panel').isEnabled()).toBeTruthy();
    });

    it('Should stop spark session', function () {
      output.click('button.bx-button.icon-close');
      browser.waitUntil(function(){
        return !output.isExisting('div.p-Widget.bx-status-panel');
      });
      expect(output.isExisting('div.p-Widget.bx-status-panel')).toBeFalsy();
    });
  });

});