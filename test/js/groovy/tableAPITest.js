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

var tableAPIBaseObject = require('../tableAPIBase.js').prototype;
var BeakerXPageObject = require('../beakerx.po.js');
var beakerxPO;

describe('(Groovy) Testing of table ', function () {

  tableAPIBaseObject.constructor.apply(this, ['Groovy']);

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/groovy/TableAPITest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;
  var imageDir = 'groovy/tableAPI';

  describe('Count of types more then number of columns ', function () {
    it('should display java.lang.IllegalStateException', function () {
      cellIndex = 33;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var errorOutput = beakerxPO.getAllOutputsStderr(codeCell)[0];
      expect(errorOutput.getText()).toMatch('java.lang.IllegalStateException: The length of types should be same');
    });
  });

  describe('ImageFormat for local files ', function () {
    it('Should display formatted table ', function() {
      cellIndex += 2;
      var width = 740, height = 240;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell16_case1.png');
    });
  });

  describe('ImageFormat for encoded data ', function () {
    it('Should display formatted table ', function() {
      cellIndex += 2;
      var width = 150, height = 150;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell18_case1.png');
    });
  });

  describe('sendModel() method ', function () {
    it('Should display table before updating ', function() {
      cellIndex += 2;
      var width = 160, height = 90;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell19_case1.png');
    });
    it('Should display table after updating ', function() {
      cellIndex += 1;
      var width = 160, height = 90;
      beakerxPO.runCodeCellByIndex(cellIndex);
      var canvas = beakerxPO.getCodeCellByIndex(cellIndex - 1).$('canvas');
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell19_case2.png');
    });
  });

  describe('RowFilter ', function () {
    it('Should display formatted table ', function() {
      cellIndex += 3;
      var width = 230, height = 70;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell20_case1.png');
    });
  });

});
