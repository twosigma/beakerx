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
    beakerxPO.runNotebookByUrl('/test/ipynb/scala/SparkUITest.ipynb');
  });

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  function startSparkSession(codeCell){
    var output = beakerxPO.getAllOutputsWidget(codeCell)[0];
    output.click('button.p-Widget.bx-spark-connect');
    browser.waitUntil(function(){
      return output.$('div.p-Widget.bx-status-panel').isVisible();
    });
  }

  function stopSparkSession(codeCell){
    var output = beakerxPO.getAllOutputsWidget(codeCell)[0];
    output.click('button.bx-button.icon-close');
    browser.waitUntil(function(){
      return !output.isExisting('div.p-Widget.bx-status-panel');
    });
  }

  function runSparkCell(cellIndex){
    var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
    browser.waitUntil(function(){
      return codeCell.$$('div.bx-spark-stagePanel').length > 0;
    });
    expect(codeCell.$('div.bx-spark-stagePanel').isEnabled()).toBeTruthy();
    return codeCell;
  }

  var imageDir = 'scala/sparkgui';
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
    var codeCell;

    it('Should display GUI dialog', function () {
      cellIndex += 1;
      codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      output = beakerxPO.getAllOutputsWidget(codeCell)[0];
      expect(output.$('button.p-Widget.bx-spark-connect').isEnabled()).toBeTruthy();
      expect(output.$('div.p-Widget.bx-spark-profile').isEnabled()).toBeTruthy();
      expect(output.$('div.p-Widget.bx-spark-master-url').isEnabled()).toBeTruthy();
      expect(output.$('div.p-Widget.bx-spark-executor-cores').isEnabled()).toBeTruthy();
      expect(output.$('div.p-Widget.bx-spark-executor-memory').isEnabled()).toBeTruthy();
    });

    it('Should start spark session', function () {
      startSparkSession(codeCell);
      expect(output.$('div.p-Widget.bx-status-panel').isEnabled()).toBeTruthy();
    });

    it('Should stop spark session', function () {
      stopSparkSession(codeCell);
      expect(output.isExisting('div.p-Widget.bx-status-panel')).toBeFalsy();
    });
  });

  describe('Spark session', function () {
    it('Should calculate PI', function () {
      var codeCellSpark1 = beakerxPO.getCodeCellByIndex(1);
      startSparkSession(codeCellSpark1);

      cellIndex += 1;
      runSparkCell(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfStdout(cellIndex, /Pi is roughly \d.\d*/);
    });

    it('Should display header of table', function () {
      cellIndex += 1;
      var codeCell = runSparkCell(cellIndex);
      browser.waitUntil(function(){
        return codeCell.$$('canvas').length > 0;
      });
      var canvas = codeCell.$('canvas');
      var imageData = beakerxPO.getCanvasImageData(canvas, 630, 46);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell4_case1.png');
    });

    it('Should display table', function () {
      cellIndex += 2;
      var codeCell = runSparkCell(cellIndex);
      browser.waitUntil(function(){
        return codeCell.$$('canvas').length > 0;
      });
      var canvas = codeCell.$('canvas');
      var imageData = beakerxPO.getCanvasImageData(canvas, 630, 46);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell5_case1.png');
    });
  });

  describe('Auto Connect', function () {
    it('Should auto connect to spark session', function () {
      var codeCellSpark1 = beakerxPO.getCodeCellByIndex(1);
      stopSparkSession(codeCellSpark1);

      cellIndex += 2;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var output = beakerxPO.getAllOutputsWidget(codeCell)[0];
      browser.waitUntil(function(){
        return output.$('div.p-Widget.bx-status-panel').isVisible();
      });
      expect(output.$('div.p-Widget.bx-status-panel').isEnabled()).toBeTruthy();
      stopSparkSession(codeCell);
    });
  });

});