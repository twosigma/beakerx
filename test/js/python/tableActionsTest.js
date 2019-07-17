/*
 *  Copyright 2019 TWO SIGMA OPEN SOURCE, LLC
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

describe('Testing of table Actions ', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/python/TableActionsTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  function doubleClickOnTable(codeCell, x, y){
    codeCell.$('div.p-DataGrid-viewport', x, y).click();
    codeCell.$('div.p-DataGrid-viewport').doubleClick();
    beakerxPO.kernelIdleIcon.waitForEnabled();
  };

  var cellIndex;
  var imageDir = 'python/tableActions';
  var width = 130, height = 67;

  describe('ContextMenuItem action ', function () {
    var codeCell;

    it('Create table with Context Menu ', function () {
      cellIndex = 0;
      beakerxPO.runCodeCellByIndex(cellIndex);
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell1_case1.png');
    });

    it('ContextMenuItem should change table cell value ', function () {
      codeCell = beakerxPO.getCodeCellByIndex(cellIndex);
      var canvas = codeCell.$('canvas');
      canvas.waitForDisplayed();
      beakerxPO.performRightClick(canvas, 40, 40);
      browser.$('div.p-Menu-itemLabel=plusOne').click();
      beakerxPO.kernelIdleIcon.waitForEnabled();
      browser.pause(1000);
      var canvas = codeCell.$('canvas');
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell1_case2.png');
    });

    it('ContextMenuItem should run tag (by string) ', function () {
      var canvas = codeCell.$('canvas');
      canvas.waitForDisplayed();
      beakerxPO.performRightClick(canvas, 40, 55);
      browser.$('div.p-Menu-itemLabel=tag1ByStr').click();
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.waitAndCheckOutputTextOfStdout(cellIndex + 1, /1:0=4/);
    });

    it('ContextMenuItem should run tag (by closure) ', function () {
      cellIndex += 4;
      codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var canvas = codeCell.$('canvas');
      canvas.waitForDisplayed();
      beakerxPO.performRightClick(canvas, 40, 55);
      browser.$('div.p-Menu-itemLabel=runTagFunc').click();
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.waitAndCheckOutputTextOfStdout(cellIndex + 1, /1:0=4/);
    });
  });

  describe('DoubleClickAction action ', function () {
    it('Create table with DoubleClick Action ', function () {
      cellIndex += 2;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell2_case1.png');
    });

    it('DoubleClickAction should change table cell value ', function () {
      var codeCell = beakerxPO.getCodeCellByIndex(cellIndex);
      doubleClickOnTable(codeCell, 40, 40);
      var canvas = codeCell.$('canvas');
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell2_case2.png');
    });

    it('DoubleClickAction should run tag (by string) ', function () {
      cellIndex += 3;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var canvas = codeCell.$('canvas');
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell3_case1.png');

      doubleClickOnTable(codeCell, 40, 40);
      beakerxPO.waitAndCheckOutputTextOfStdout(cellIndex + 1, /0:0=1/);
    });

    it('DoubleClickAction should run tag (by closure) ', function () {
      cellIndex += 3;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var canvas = codeCell.$('canvas');
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell4_case1.png');

      doubleClickOnTable(codeCell, 40, 40);
      beakerxPO.waitAndCheckOutputTextOfStdout(cellIndex + 1, /0:0=1/);
    });
  });
});

