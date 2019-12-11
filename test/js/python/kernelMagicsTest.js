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

describe('Tests for kernel magic. ', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/python/KernelMagicsTest.ipynb');
  });

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;
  var imageDir = 'python/kernelMagics';

  describe('%%groovy ', function () {
    it('Should display stdout and execute results ', function () {
      cellIndex = 0;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var output = beakerxPO.getAllOutputsStdout(codeCell)[0];
      expect(output.getText()).toMatch(/stdout works/);
      var result = beakerxPO.getAllOutputsExecuteResult(codeCell)[0];
      expect(result.getText()).toMatch(/results work/);
    });

    it('Should add jar to classpath ', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfWidget(cellIndex, /arpack_combined_all.+jar/, 1);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex, /org.netlib.blas.Daxpy/);
    });

    it('Should display table ', function () {
      cellIndex += 1;
      var fileName = 'cell3_case1.png';
      var width = 130, height = 70;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, fileName);
    });

    it('Should display error ', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfStderr(cellIndex, /groovy.lang.MissingMethodException/);
    });

    it('Should display HTML ', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfExecuteResult(cellIndex, /HTML works/);
    });

    it('Should display Plot with Line ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.checkPlotWithLine(codeCell, cellIndex);
    });
  });

  describe('%%java ', function () {
    it('Should display Plot with Line ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.checkPlotWithLine(codeCell, cellIndex);
    });
  });

  describe('%%scala ', function () {
    it('Should display Plot with Line ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.checkPlotWithLine(codeCell, cellIndex);
    });
  });

  describe('%%kotlin ', function () {
    it('Should display Plot with Line ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.checkPlotWithLine(codeCell, cellIndex);
    });
  });

  describe('%%clojure ', function () {
    it('Should display Plot with Line ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.checkPlotWithLine(codeCell, cellIndex);
    });
  });

  describe('%%sql ', function () {
    it('Should display table ', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.waitAndCheckOutputTextOfStdout(cellIndex, /Sql started successfully/);

      cellIndex += 1;
      var fileName = 'cell12_case1.png';
      var width = 200, height = 100;
      var canvas = beakerxPO.runCellToGetCanvas(cellIndex);
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, fileName);
    });
  });
/* disabled till it will be fixed
  describe('interrupt %%groovy magic ', function () {
    it('Should display KeyboardInterrupt error ', function () {
      cellIndex += 1;
      beakerxPO.runCodeCellByIndex(cellIndex);
      browser.pause(500);
      beakerxPO.clickInterruptKernel();
      beakerxPO.waitAndCheckOutputTextOfStderr(cellIndex, /KeyboardInterrupt/);
    });
  });
*/
});
