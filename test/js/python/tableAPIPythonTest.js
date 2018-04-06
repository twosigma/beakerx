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
    beakerxPO.openUIWindow();
  });

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;
  var imageDir = 'python/tableAPI';

  describe('UI options. ', function () {
    it("Use PhosphorJS DataGrid for TableDisplay Widget. ", function () {
      beakerxPO.setDataGridForTable(true, false);
    });
  });

  describe("Data types for TableDisplay", function(){

    it('Can use Array of Integers parameter', function () {
      cellIndex = 0;
      var width = 120, height = 90;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell1_case1.png');
    });

    it('Table have index column menu. ', function () {
      var tblDisplay = beakerxPO.getTableDisplayByIndex(cellIndex);
      expect(beakerxPO.getTableIndexMenu(tblDisplay)).not.toBe(null);
    });

    it('Can use 2D Array of Integers parameter', function () {
      cellIndex += 2;
      var width = 120, height = 65;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell2_case1.png');
    });

    it('Can use Array of Decimals parameter', function () {
      cellIndex += 2;
      var width = 120, height = 90;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell3_case1.png');
    });

    it('Can use 2D Array of Decimals parameter', function () {
      cellIndex += 2;
      var width = 128, height = 65;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell4_case1.png');
    });

    it('Can use Array of Strings parameter', function () {
      cellIndex += 2;
      var width = 130, height = 90;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell5_case1.png');
    });

    it('Can use 2D Array of Strings parameter', function () {
      cellIndex += 2;
      var width = 110, height = 65;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell6_case1.png');
    });

    it('Can use Array of Integer Arrays parameter', function () {
      cellIndex += 2;
      var width = 128, height = 90;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell7_case1.png');
    });

    it('Can use 2D Array of Integer Arrays parameter', function () {
      cellIndex += 2;
      var width = 180, height = 65;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell8_case1.png');
    });

    it('Can use 2D Array of Integer,Decimal,String,Array Arrays parameter', function () {
      cellIndex += 2;
      var width = 220, height = 115;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell9_case1.png');
    });

    it('Can use [Integer,Decimal,String,Array] parameter', function () {
      cellIndex += 2;
      var width = 128, height = 115;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell10_case1.png');
    });

    it('Can use 2D Arrays of [Integer,Decimal,String,Array] parameter', function () {
      cellIndex += 2;
      var width = 220, height = 65;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell11_case1.png');
    });

    it('Can use numbers as name of Array keys (Array parameter)', function () {
      cellIndex += 2;
      var width = 125, height = 115;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell12_case1.png');
    });

    it('Can use numbers as name of Array keys (2D Array parameter)', function () {
      cellIndex += 2;
      var width = 250, height = 65;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell13_case1.png');
    });
  });

  describe("TableDisplay(pandas DataFrame)", function() {
    it('TableDisplay should display table from pandas dataFrame', function () {
      cellIndex += 2;
      browser.log('browser'); // reset log
      var width = 100, height = 65;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell14_case1.png');
    });

    it('Table have index column menu', function () {
      var tblDisplay = beakerxPO.getTableDisplayByIndex(cellIndex);
      expect(beakerxPO.getTableIndexMenu(tblDisplay)).not.toBe(null);
    });

    it("Log doesn't have 'SEVERE' level errors. ", function () {
      beakerxPO.checkBrowserLogError('SEVERE');
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
      browser.log('browser'); // reset log
      var width = 70, height = 42;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell15_case1.png');
    });

    it("Log doesn't have 'SEVERE' level errors. ", function () {
      beakerxPO.checkBrowserLogError('SEVERE');
    });
  });

  describe('Pandas read csv ', function(){
    it('Should display table ', function() {
      cellIndex += 2;
      var width = 650, height = 90;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell16_case1.png');
    });
  });

  describe('Set alignment provider for "m3" column ', function () {
    it('Should display formatted table ', function() {
      cellIndex += 2;
      var width = 650, height = 90;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell17_case1.png');
    });
  });

  describe('Set string format for times, type and column ', function () {
    it('Should display formatted table ', function() {
      cellIndex += 2;
      var width = 500, height = 90;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell18_case1.png');
    });
  });

  describe('Set column visible ', function () {
    it('Should display formatted table ', function() {
      cellIndex += 2;
      var width = 550, height = 90;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell19_case1.png');
    });
  });

  describe('Set column order ', function () {
    it('Should display formatted table ', function() {
      cellIndex += 2;
      var width = 410, height = 90;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell20_case1.png');
    });
  });

  describe('Add CellHighlighter ', function () {
    it('Should display formatted table ', function() {
      cellIndex += 2;
      var width = 440, height = 90;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell21_case1.png');
    });
  });

});