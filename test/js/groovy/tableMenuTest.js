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

  function getSubMenu(cellIndex, commandIndex){
    var tblDisplay = beakerxPO.getTableDisplayByIndex(cellIndex);
    return beakerxPO.getTableIndexSubMenu(beakerxPO.getTableIndexMenu(tblDisplay), commandIndex);
  };

  var cellIndex;
  var imageDir = 'groovy/tableMenu';

  describe('UI options. ', function () {
    it("Use PhosphorJS DataGrid for TableDisplay Widget. ", function () {
      beakerxPO.setDataGridForTable(true, false);
    });
  });

  describe('Show/Hide menu Items ', function () {
    var maxWidth;

    it('Should display table ', function () {
      cellIndex = 0;
      var width = 685, height = 312;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var canvas = codeCell.$('canvas');
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell1_case1.png');
    });

    it('Hide All Columns', function () {
      var tblDisplay = beakerxPO.getTableDisplayByIndex(cellIndex);
      maxWidth = parseInt(beakerxPO.getDataGridCssPropertyByIndex(cellIndex, 'width'));
      var tableMenu = beakerxPO.getTableIndexMenu(tblDisplay);
      tableMenu.click('[data-command="Hide All Columns"]');
      var minWidth = parseInt(beakerxPO.getDataGridCssPropertyByIndex(cellIndex, 'width'));
      expect(maxWidth).toBeGreaterThan(minWidth);
    });

    it('Show All Columns', function () {
      var tblDisplay = beakerxPO.getTableDisplayByIndex(cellIndex);
      var width_1 = parseInt(beakerxPO.getDataGridCssPropertyByIndex(cellIndex, 'width'));
      var tableMenu = beakerxPO.getTableIndexMenu(tblDisplay);
      tableMenu.click('[data-command="Show All Columns"]');
      var width_2 = parseInt(beakerxPO.getDataGridCssPropertyByIndex(cellIndex, 'width'));
      expect(width_2).toBeGreaterThan(width_1);
      expect(maxWidth).toEqual(width_2);
    });

    var subMenu;

    it('Hide "m3" column', function () {
      var width_1 = parseInt(beakerxPO.getDataGridCssPropertyByIndex(cellIndex, 'width'));
      subMenu = getSubMenu(cellIndex, 0).$$('li');
      expect(subMenu.length).toEqual(11);
      expect(subMenu[0].getText()).toEqual('m3');
      subMenu[0].click('div.fa.fa-check');
      var width_2 = parseInt(beakerxPO.getDataGridCssPropertyByIndex(cellIndex, 'width'));
      expect(width_1).toBeGreaterThan(width_2);
    });

    it('Hide all columns by checking submenu items', function () {
      var width_1 = parseInt(beakerxPO.getDataGridCssPropertyByIndex(cellIndex, 'width'));
      for(var i = 1; i < subMenu.length; i += 1){
        subMenu[i].click('div.fa.fa-check');
      }
      var width_2 = parseInt(beakerxPO.getDataGridCssPropertyByIndex(cellIndex, 'width'));
      expect(width_1).toBeGreaterThan(width_2);
    });
  });

  describe('Menu option "Format"', function () {
    var width = 150, height = 150;

    it('Should format index column to "date"', function () {
      cellIndex += 2;
      beakerxPO.runCodeCellByIndex(cellIndex);
      var subMenu = getSubMenu(cellIndex, 1).$$('li');
      expect(subMenu.length).toEqual(9);
      subMenu[4].click();

      var codeCell = beakerxPO.getCodeCellByIndex(cellIndex);
      var canvas = codeCell.$('canvas');
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell2_case1.png');
    });

    it('Should format index column to "formatted integer"', function () {
      var subMenu = getSubMenu(cellIndex, 1).$$('li');
      subMenu[2].click();

      var codeCell = beakerxPO.getCodeCellByIndex(cellIndex);
      var canvas = codeCell.$('canvas');
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell2_case2.png');
    });
  });

  describe('Menu option "Rows to show"', function () {
    it('Select "show 10 rows"', function () {
      beakerxPO.runCodeCellByIndex(cellIndex);
      var hight_1 = parseInt(beakerxPO.getDataGridCssPropertyByIndex(cellIndex, 'height'));
      var subMenu = getSubMenu(cellIndex, 2).$$('li');
      expect(subMenu.length).toEqual(5);
      subMenu[0].click();

      var hight_2 = parseInt(beakerxPO.getDataGridCssPropertyByIndex(cellIndex, 'height'));
      expect(hight_1).toBeGreaterThan(hight_2);
    });

    it('Select "show All rows"', function () {
      var hight_1 = parseInt(beakerxPO.getDataGridCssPropertyByIndex(cellIndex, 'height'));
      var subMenu = getSubMenu(cellIndex, 2).$$('li');
      subMenu[4].click();

      var hight_2 = parseInt(beakerxPO.getDataGridCssPropertyByIndex(cellIndex, 'height'));
      expect(hight_2).toBeGreaterThan(hight_1);
    });
  });

  describe('Menu option "Clear selection"', function () {
    var width = 250, height = 150;

    it('Should select values', function () {
      cellIndex += 3;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      codeCell.leftClick('canvas', 60, 60);
      browser.keys('Shift');
      codeCell.leftClick('canvas', 120, 120);
      browser.keys('\uE000');

      var canvas = codeCell.$('canvas');
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell3_case1.png');
    });

    it('Should clear selection', function () {
      var tblDisplay = beakerxPO.getTableDisplayByIndex(cellIndex);
      var tableMenu = beakerxPO.getTableIndexMenu(tblDisplay);
      tableMenu.click('[data-command="Clear selection"]');

      var codeCell = beakerxPO.getCodeCellByIndex(cellIndex);
      var canvas = codeCell.$('canvas');
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData.value, imageDir, 'cell3_case2.png');
    });
  });

});