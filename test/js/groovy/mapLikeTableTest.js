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

describe('(Groovy) Testing Map Like Tables', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/groovy/MapLikeTableTest.ipynb');
  });

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  function clickOnTable(codeCell, x, y) {
    codeCell.$('div.p-DataGrid-viewport', x, y).click();
    beakerxPO.kernelIdleIcon.waitForEnabled();
  };

  var cellIndex;
  var imageDir = 'groovy/mapLikeTable';

  describe('Table display ', function () {
    it('A basic table is rendered correctly ', function () {
      cellIndex = 0;
      var fileName = 'cell1_case1.png';
      var width = 130, height = 67;
      beakerxPO.runCodeCellByIndex(cellIndex);
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, fileName);
    });

    it('An ArrayList is rendered correctly ', function () {
      cellIndex += 2;
      var fileName = 'cell2_case1.png';
      var width = 122, height = 67;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, fileName);
    });

    it('A Map is rendered correctly ', function () {
      cellIndex += 2;
      var fileName = 'cell3_case1.png';
      var width = 122, height = 67;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, fileName);
    });

    it('A Map is rendered correctly ', function () {
      cellIndex += 2;
      var fileName = 'cell4_case1.png';
      var width = 130, height = 92;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, fileName);
    });

    it('A List inside a List is rendered correctly ', function () {
      cellIndex += 2;
      var fileName = 'cell5_case1.png';
      var width = 178, height = 44;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, fileName);
    });

    it('A Map inside a List is rendered correctly ', function () {
      cellIndex += 2;
      var fileName = 'cell6_case1.png';
      var width = 208, height = 44;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, fileName);
    });

    it('Table with "&", "/", ">" values ', function () {
      cellIndex += 2;
      var fileName = 'cell7_case1.png';
      var width = 254, height = 44;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, fileName);
    });

    it('Display object is rendered correctly ', function () {
      cellIndex += 2;
      var fileName = 'cell8_case1.png';
      var width = 158, height = 44;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, fileName);
    });

    it('HTML table format ', function () {
      cellIndex += 2;
      var fileName = 'cell9_case1.png';
      var width = 184, height = 122;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, fileName);
      // beakerxPO.createTableImage(imageData, imageDir, fileName);
    });

    it('Links are rendered correctly ', function () {
      cellIndex += 2;
      var fileName = 'cell10_case1.png';
      var width = 390, height = 67;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, fileName);
    });

    it('Links work correctly', function () {
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      browser.pause(1000);
      clickOnTable(codeCell, 200, 40);
      browser.pause(3000);
      browser.switchWindow('https://www.twosigma.com/');
      browser.pause(1000);
      expect(browser.getTitle()).toBe('Two Sigma');
      browser.switchWindow('/test/ipynb/groovy/MapLikeTableTest');
    });
  });
});
