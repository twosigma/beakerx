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

describe('SQL base tests ', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/sql/SQLTest.ipynb');
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var imageDir = 'sql/sql';
  var cellIndex = 0;

  describe('Create and select table (H2 database) ', function () {
    it('Output contains table ', function () {
      beakerxPO.runCodeCellByIndex(0);
      beakerxPO.runCodeCellByIndex(1);

      var codeCell = beakerxPO.runCodeCellByIndex(2);
      var canvas = codeCell.$('canvas');
      var imageData = beakerxPO.getCanvasImageData(canvas, 210, 120);
      beakerxPO.checkImageData(imageData, imageDir, 'cell3_case1.png');
    });
  });

  describe('%%python magic', function () {
    it('Should display Plot with Line ', function () {
      cellIndex = 3;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.checkPlotWithLine(codeCell, cellIndex);
    });
  });

  describe('(SQL) Autocomplete cell ', function () {
    it('Autocomplete list is not empty ', function () {
      cellIndex += 1;
      var codeCell = beakerxPO.getCodeCellByIndex(cellIndex);
      var completeList = beakerxPO.callAutocompleteAndGetItsList(codeCell, 's');
      expect(completeList.length).toBeGreaterThan(0);
    });
  });

  describe('(SQL) Press "Shift + Tab" to display doc ', function(){
    it('doc tooltip is not empty ', function(){
      cellIndex += 1;
      var codeCell = beakerxPO.getCodeCellByIndex(cellIndex);
      var tooltip = beakerxPO.callDocAndGetItsTooltip(codeCell, 'Plot');
      expect(tooltip.getText()).toMatch(/com.twosigma.beakerx.chart.xychart.Plot/);
    });
  });

});
