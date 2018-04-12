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

describe('Testing of table Actions ', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/groovy/TableActionsTest.ipynb');
    beakerxPO.openUIWindow();
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  function doubleClickOnTable(codeCell, x, y){
    codeCell.click('div.p-DataGrid-viewport', x, y);
    codeCell.doubleClick('div.p-DataGrid-viewport');
    beakerxPO.kernelIdleIcon.waitForEnabled();
  };

  var cellIndex;
  var imageDir = 'groovy/tableActions';
  var width = 130, height = 65;

  describe('UI options. ', function () {
    it("Use new table widget. ", function () {
      beakerxPO.setDataGridForTable(true, false);
    });
  });

  describe('ContextMenuItem action ', function () {
    var codeCell;

    it('ContextMenuItem should change table cell value ', function () {
      cellIndex = 0;
      codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var canvas = codeCell.$('canvas');
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell1_case1.png');

      codeCell.rightClick('canvas', 40, 40);
      browser.click('div.p-Menu-itemLabel=plusOne');
      beakerxPO.kernelIdleIcon.waitForEnabled();
      canvas = codeCell.$('canvas');
      imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell1_case2.png');
    });

    it('ContextMenuItem should run tag (by string) ', function () {
      codeCell.rightClick('canvas', 40, 55);
      browser.click('div.p-Menu-itemLabel=tag1ByStr');
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.waitAndCheckOutputTextOfStdout(cellIndex + 1, /1:0=4/);
    });

    it('ContextMenuItem should run tag (by closure) ', function () {
      codeCell.rightClick('canvas', 100, 55);
      browser.click('div.p-Menu-itemLabel=tag1ByClosure');
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.waitAndCheckOutputTextOfStdout(cellIndex + 1, /1:1=5/);
    });
  });

  describe('DoubleClickAction action ', function () {
    it('DoubleClickAction should change table cell value ', function () {
      cellIndex += 4;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var canvas = codeCell.$('canvas');
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell2_case1.png');

      doubleClickOnTable(codeCell, 40, 40);
      canvas = codeCell.$('canvas');
      imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell2_case2.png');
    });

    it('DoubleClickAction should run tag (by string) ', function () {
      cellIndex += 3;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var canvas = codeCell.$('canvas');
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell3_case1.png');

      doubleClickOnTable(codeCell, 40, 40);
      beakerxPO.waitAndCheckOutputTextOfStdout(cellIndex + 1, /0:0=1/);
    });

    it('DoubleClickAction should run tag (by closure) ', function () {
      cellIndex += 3;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var canvas = codeCell.$('canvas');
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell4_case1.png');

      doubleClickOnTable(codeCell, 40, 40);
      beakerxPO.waitAndCheckOutputTextOfStdout(cellIndex + 1, /0:0=1/);
    });
  });

});