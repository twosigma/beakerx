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
    output.$('button.p-Widget.bx-spark-connect').click();
    browser.waitUntil(function(){
      return output.$$('div.p-Widget.bx-status-panel').length > 0;
    });
  }

  function stopSparkSession(codeCell){
    var output = beakerxPO.getAllOutputsWidget(codeCell)[0];
    output.$('button.bx-button.icon-close').click();
    browser.waitUntil(function(){
      return !output.$('div.p-Widget.bx-status-panel').isExisting();
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
      expect(output.$('div.p-Widget.bx-status-panel').isExisting()).toBeFalsy();
    });
  });

  function clickSaveProfile(output) {
    output.$('button[title="Save profile"]').click();
  }

  function clickAddProperty(output) {
    cleanProfileProperties(output);
    output.$('button.bx-properties-add-button').click();
  }
  
  function checkProfileError(output, msg) {
    expect(output.$('div.bx-spark-connect-error').getText()).toEqual(msg);
  }

  function cleanProfileProperties(output){
    while(output.$$('button.icon-close').length > 1){
      output.$$('button.icon-close')[1].click();
      browser.pause(500);
    }
  }

  describe('Add property to Spark profile', function () {
    var output;

    it("Can't save when 'name' property is empty ", function () {
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      output = beakerxPO.getAllOutputsWidget(codeCell)[0];
      expect(output.$('div.p-Widget.bx-spark-configuration').isEnabled()).toBeTruthy();
      clickAddProperty(output);
      browser.pause(1000);
      clickSaveProfile(output);
      checkProfileError(output, "Property 'name' can not be empty");
    });
    it("Can't start when 'name' property is empty ", function () {
      output.$$('button.icon-close')[1].click();
      clickAddProperty(output);
      output.$('button.p-Widget.bx-spark-connect').click();
      browser.pause(1000);
      checkProfileError(output, "Property 'name' can not be empty");
    });
    it("Can't save when 'value' property is empty ", function () {
      output.$$('button.icon-close')[1].click();
      clickAddProperty(output);
      output.$('div.bx-spark-configuration').$$('input')[0].click();
      browser.keys('g');
      clickSaveProfile(output);
      checkProfileError(output, "Property 'value' can not be empty");
    });
    it("Can't start when 'value' property is empty ", function () {
      output.$$('button.icon-close')[1].click();
      clickAddProperty(output);
      output.$('div.bx-spark-configuration').$$('input')[0].click();
      browser.keys('g');
      output.$('button.p-Widget.bx-spark-connect').click();
      checkProfileError(output, "Property 'value' can not be empty");
    });
    it("Should save not empty property ", function () {
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      output = beakerxPO.getAllOutputsWidget(codeCell)[0];
      expect(output.$('div.p-Widget.bx-spark-configuration').isEnabled()).toBeTruthy();
      clickAddProperty(output);
      output.$('div.bx-spark-configuration').$$('input')[0].click();
      browser.keys('n');
      output.$('div.bx-spark-configuration').$$('input')[1].click();
      browser.keys('v');
      clickSaveProfile(output);
      expect(output.$('div.bx-spark-connect-error').getText().length).toEqual(0);
    });
    it("Should remove property ", function () {
      expect(output.$('div.bx-spark-configuration').$$('input').length).toEqual(2);
      output.$$('button.icon-close')[1].click();
      clickSaveProfile(output);
      expect(output.$('div.bx-spark-connect-error').getText().length).toEqual(0);
    });
  });

  describe('Spark session', function () {
    it('Should calculate PI', function () {
      var codeCellSpark1 =  beakerxPO.runCodeCellByIndex(1);
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
      beakerxPO.checkImageData(imageData, imageDir, 'cell4_case1.png');
    });

    it('Should display table', function () {
      cellIndex += 2;
      var codeCell = runSparkCell(cellIndex);
      browser.waitUntil(function(){
        return codeCell.$$('canvas').length > 0;
      });
      var canvas = codeCell.$('canvas');
      var imageData = beakerxPO.getCanvasImageData(canvas, 630, 46);
      beakerxPO.checkImageData(imageData, imageDir, 'cell5_case1.png');
    });
  });

  describe('Auto Connect', function () {
    it('Should auto connect to spark session', function () {
      var codeCellSpark1 = beakerxPO.getCodeCellByIndex(1);
      stopSparkSession(codeCellSpark1);

      cellIndex += 2;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var output = beakerxPO.getAllOutputsWidget(codeCell)[0];
      startSparkSession(codeCell);
      expect(output.$('div.p-Widget.bx-status-panel').isEnabled()).toBeTruthy();
      stopSparkSession(codeCell);
    });
  });

});