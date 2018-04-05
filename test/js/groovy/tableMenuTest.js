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

describe('Testing of table Actions ', function () {

  beforeAll(function () {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByUrl('/test/ipynb/groovy/TableMenuTest.ipynb');
    beakerxPO.openUIWindow();
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  var cellIndex;
  var imageDir = 'groovy/tableMenu';

  describe('UI options. ', function () {
    it("Use PhosphorJS DataGrid for TableDisplay Widget. ", function () {
      beakerxPO.setDataGridForTable(true, false);
    });
  });

  describe('Index Table menu ', function () {
    it('Should display table ', function () {
      cellIndex = 0;
      var width = 685, height = 312;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var canvas = codeCell.$('canvas');
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell1_case1.png');
    });

    it('Table has index menu. ', function () {
      var tblDisplay = beakerxPO.getTableDisplayByIndex(cellIndex);
      expect(beakerxPO.getTableIndexMenu(tblDisplay)).not.toBe(null);
    });
  });

});