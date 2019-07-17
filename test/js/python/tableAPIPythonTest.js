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

describe('Testing of table (python)', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/python/TableAPIPythonTest.ipynb');
  });

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;
  var imageDir = 'python/tableAPI';

  describe("Data types for TableDisplay", function(){

    it('Can use Array of Integers parameter', function () {
      cellIndex = 0;
      var width = 120, height = 92;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell1_case1.png');
    });

    it('Table have index column menu. ', function () {
      var tblDisplay = beakerxPO.getTableDisplayByIndex(cellIndex);
      expect(beakerxPO.getTableIndexMenu(tblDisplay)).not.toBe(null);
    });

    it('Can use 2D Array of Integers parameter', function () {
      cellIndex += 2;
      var width = 124, height = 67;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell2_case1.png');
    });

    it('Can use Array of Decimals parameter', function () {
      cellIndex += 2;
      var width = 125, height = 92;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell3_case1.png');
    });

    it('Can use 2D Array of Decimals parameter', function () {
      cellIndex += 2;
      var width = 130, height = 67;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell4_case1.png');
    });

    it('Can use Array of Strings parameter', function () {
      cellIndex += 2;
      var width = 144, height = 92;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell5_case1.png');
    });

    it('Can use 2D Array of Strings parameter', function () {
      cellIndex += 2;
      var width = 110, height = 68;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell6_case1.png');
    });

    it('Can use Array of Integer Arrays parameter', function () {
      cellIndex += 2;
      var width = 130, height = 92;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell7_case1.png');
    });

    it('Can use 2D Array of Integer Arrays parameter', function () {
      cellIndex += 2;
      var width = 180, height = 68;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell8_case1.png');
    });

    it('Can use 2D Array of Integer,Decimal,String,Array Arrays parameter', function () {
      cellIndex += 2;
      var width = 164, height = 116;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell9_case1.png');
    });

    it('Can use [Integer,Decimal,String,Array] parameter', function () {
      cellIndex += 2;
      var width = 129, height = 116;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell10_case1.png');
    });

    it('Can use 2D Arrays of [Integer,Decimal,String,Array] parameter', function () {
      cellIndex += 2;
      var width = 252, height = 67;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell11_case1.png');
    });

    it('Can use numbers as name of Array keys (Array parameter)', function () {
      cellIndex += 2;
      var width = 156, height = 116;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell12_case1.png');
    });

    it('Can use numbers as name of Array keys (2D Array parameter)', function () {
      cellIndex += 2;
      var width = 256, height = 67;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell13_case1.png');
    });
  });

  describe("TableDisplay(pandas DataFrame)", function() {
    it('TableDisplay should display table from pandas dataFrame', function () {
      cellIndex += 2;
      var width = 100, height = 67;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell14_case1.png');
    });

    it('Table have index column menu', function () {
      var tblDisplay = beakerxPO.getTableDisplayByIndex(cellIndex);
      expect(beakerxPO.getTableIndexMenu(tblDisplay)).not.toBe(null);
    });

  });

  describe("Use index in pandas DataFrame. ", function() {
    it('Table have index column menu. ', function () {
      cellIndex += 2;
      beakerxPO.runCodeCellByIndex(cellIndex);
      var tblDisplay = beakerxPO.getTableDisplayByIndex(cellIndex);
      expect(beakerxPO.getTableIndexMenu(tblDisplay)).not.toBe(null);
    });
  });

  describe("Pandas read csv with index_col parameter. ", function() {
    it('Should display table. ', function () {
      cellIndex += 1;
      var width = 70, height = 44;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell15_case1.png');
    });
  });

  describe('Pandas read csv ', function(){
    it('Should display table ', function() {
      cellIndex += 2;
      var width = 646, height = 92;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell16_case1.png');
    });
  });

  describe('Set alignment provider for column ', function () {
    it('Should display formatted table ', function() {
      cellIndex += 2;
      var width = 420, height = 92;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
       beakerxPO.checkImageData(imageData, imageDir, 'cell162_case1.png');
    });
  });

  describe('Set alignment provider for type ', function () {
    it('Should display formatted table ', function() {
      cellIndex += 2;
      var width = 404, height = 92;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
       beakerxPO.checkImageData(imageData, imageDir, 'cell163_case1.png');
    });
  });

  describe('Set bar render for type ', function () {
    it('Should display formatted table ', function() {
      cellIndex += 2;
      var width = 648, height = 92;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
       beakerxPO.checkImageData(imageData, imageDir, 'cell17_case1.png');
    });
  });

  describe('Set string format for times, type and column ', function () {
    it('Should display formatted table ', function() {
      cellIndex += 2;
      var width = 520, height = 92;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell18_case1.png');
    });
  });

  describe('Set HTML format for column ', function () {
    it('Should display formatted table ', function() {
      cellIndex += 2;
      var width = 300, height = 102;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
       beakerxPO.checkImageData(imageData, imageDir, 'cell182_case1.png');
    });
  });

  describe('Set column visible ', function () {
    it('Should display formatted table ', function() {
      cellIndex += 2;
      var width = 646, height = 92;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
       beakerxPO.checkImageData(imageData, imageDir, 'cell19_case1.png');
    });
  });

  describe('Set column order ', function () {
    it('Should display formatted table ', function() {
      cellIndex += 2;
      var width = 417, height = 92;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell20_case1.png');
    });
  });

  describe('Add HeatmapHighlighter ', function () {
    it('Should display formatted table ', function() {
      cellIndex += 2;
      var width = 464, height = 92;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell21_case1.png');
    });
  });

  describe('Remove all CellHighlighters ', function () {
    var width6 = 464, height6 = 92;

    it('Should display formatted table ', function() {
      cellIndex += 2;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width6, height6);
       beakerxPO.checkImageData(imageData, imageDir, 'cell21_case2.png');
    });
    it('Should remove all CellHighlighters ', function() {
      var codeCell = beakerxPO.getCodeCellByIndex(cellIndex - 2);
      var canvas = codeCell.$('canvas');
      var imageData = beakerxPO.getCanvasImageData(canvas, width6, height6);
       beakerxPO.checkImageData(imageData, imageDir, 'cell21_case2.png');
    });
  });

  describe('Add UniqueEntriesHighlighter ', function () {
    it('Should display formatted table ', function() {
      cellIndex += 2;
      var width = 480, height = 92;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
       beakerxPO.checkImageData(imageData, imageDir, 'cell22_case1.png');
    });
  });

  describe('Add Highlighter for column ', function () {
    it('Should display formatted table ', function() {
      cellIndex += 2;
      var width = 250, height = 192;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell23_case1.png');
    });
  });

  describe('Add Font size ', function () {
    it('Should display formatted table ', function() {
      cellIndex += 2;
      var width = 450, height = 92;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
       beakerxPO.checkImageData(imageData, imageDir, 'cell24_case1.png');
    });
  });

  describe('Set headers as vertical ', function () {
    it('Should display formatted table ', function() {
      cellIndex += 2;
      var width = 500, height = 92;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
       beakerxPO.checkImageData(imageData, imageDir, 'cell25_case1.png');
    });
  });

  describe('Add Color provider ', function () {
    it('Should display formatted table ', function() {
      cellIndex += 2;
      var width = 162, height = 92;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
       beakerxPO.checkImageData(imageData, imageDir, 'cell26_case1.png');
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
