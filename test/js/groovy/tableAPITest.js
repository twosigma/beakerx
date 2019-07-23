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

describe('Testing of table (groovy) ', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/groovy/TableAPITest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;
  var imageDir = 'groovy/tableAPI';

  describe('Set alignment provider for column ', function () {
    it('Should display formatted table ', function () {
      cellIndex = 0;
      var width = 410, height = 92;
      beakerxPO.runCodeCellByIndex(cellIndex);
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell1_case1.png');
    });
  });

  describe('Set alignment provider for type ', function () {
    it('Should display formatted table ', function () {
      cellIndex += 2;
      var width = 404, height = 92;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell2_case1.png');
    });
  });

  describe('Set bar render for type ', function () {
    it('Should display formatted table ', function () {
      cellIndex += 2;
      var width = 650, height = 190;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell3_case1.png');
    });
  });

  describe('Set string format for times, type and column ', function () {
    it('Should display formatted table ', function () {
      cellIndex += 2;
      var width = 500, height = 92;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell4_case1.png');
    });
  });

  describe('Set HTML format for column ', function () {
    it('Should display formatted table ', function () {
      cellIndex += 2;
      var width = 180, height = 116;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell5_case1.png');
    });
  });

  describe('Set column visible ', function () {
    it('Should display formatted table ', function () {
      cellIndex += 2;
      var width = 642, height = 92;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell6_case1.png');
    });
  });

  describe('Set column order ', function () {
    it('Should display formatted table ', function () {
      cellIndex += 2;
      var width = 412, height = 92;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell7_case1.png');
    });
  });

  describe('Add HeatmapHighlighter for row ', function () {
    it('Should display formatted table ', function () {
      cellIndex += 2;
      var width = 440, height = 150;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell8_case1.png');
    });
  });

  describe('Add HeatmapHighlighter for column ', function () {
    it('Should display formatted table ', function () {
      cellIndex += 2;
      var width = 440, height = 150;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell9_case1.png');
    });
  });

  describe('Remove all CellHighlighters ', function () {
    var width9 = 440, height9 = 150;

    it('Should display formatted table ', function () {
      cellIndex += 2;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width9, height9);
      beakerxPO.checkImageData(imageData, imageDir, 'cell9_case2.png');
    });
    it('Should remove all CellHighlighters ', function () {
      var codeCell = beakerxPO.getCodeCellByIndex(cellIndex - 2);
      var canvas = codeCell.$('canvas');
      var imageData = beakerxPO.getCanvasImageData(canvas, width9, height9);
      beakerxPO.checkImageData(imageData, imageDir, 'cell9_case2.png');
    });
  });

  describe('Add HeatmapHighlighter for type ', function () {
    it('Should display formatted table ', function () {
      cellIndex += 2;
      var width = 410, height = 92;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell9_case3.png');
    });
  });

  describe('Count of types more then number of columns ', function () {
    it('should display java.lang.IllegalStateException', function () {
      cellIndex += 2;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var errorOutput = beakerxPO.getAllOutputsStderr(codeCell)[0];
      expect(errorOutput.getText()).toMatch('java.lang.IllegalStateException: The length of types should be same');
    });
  });

  describe('Add UniqueEntriesHighlighter for row ', function () {
    it('Should display formatted table ', function() {
      cellIndex += 1;
      var width = 480, height = 92;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell10_case1.png');
    });
  });

  describe('Add UniqueEntriesHighlighter for column ', function () {
    it('Should display formatted table ', function() {
      cellIndex += 2;
      var width = 250, height = 192;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell11_case1.png');
    });
  });

  describe('Add Font size ', function () {
    it('Should display formatted table ', function() {
      cellIndex += 2;
      var width = 450, height = 92;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell12_case1.png');
    });
  });

  describe('Set headers as vertical ', function () {
    it('Should display formatted table ', function() {
      cellIndex += 2;
      var width = 500, height = 92;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell13_case1.png');
    });
  });

  describe('Add Color provider ', function () {
    it('Should display formatted table ', function() {
      cellIndex += 2;
      var width = 232, height = 92;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell14_case1.png');
    });
  });

  describe('Add tooltip for values ', function () {
    it('Should display tooltip ', function() {
      cellIndex += 2;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      browser.pause(1000);
      codeCell.$('canvas').moveTo(55, 55);
      browser.pause(1000);
      var tooltip = beakerxPO.getDataGridTooltip();
      expect(tooltip.getText()).toMatch(/The value is: 8.0021/);
    });
  });

});
