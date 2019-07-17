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
  }, 2);

  afterAll(function () {
    beakerxPO.closeAndHaltNotebook();
  });

  function getSubMenu(cellIndex, commandIndex){
    var tblDisplay = beakerxPO.getTableDisplayByIndex(cellIndex);
    return beakerxPO.getTableIndexSubMenu(beakerxPO.getTableIndexMenu(tblDisplay), commandIndex)[0];
  };

  function getTableColumnMenu(cellIndex, x, y){
    if(!x) {
      x = 50;
    }
    if(!y) {
      y = 10;
    }
    var tblDisplay = beakerxPO.getTableDisplayByIndex(cellIndex);
    beakerxPO.performMouseMove(tblDisplay.$('canvas'), x, y);
    tblDisplay.$$('span.bko-column-header-menu.bko-menu')[1].click();
    browser.waitUntil(function(){
      var menu = browser.$('ul.dropdown-menu.bko-table-menu-content');
      return menu != null && menu.isDisplayed();
    }, 10000, 'column menu is not visible');
    return browser.$('ul.dropdown-menu.bko-table-menu-content');
  };

  function checkColumnMenu(cellIndex, codeCell, menuName, fileName){
    var colMenu = getTableColumnMenu(cellIndex);
    colMenu.$('[data-command="' + menuName + '"]').click();

    var canvas = codeCell.$('canvas');
    var imageData = beakerxPO.getCanvasImageData(canvas, 250, 150);
    beakerxPO.checkImageData(imageData, imageDir, fileName);
  };

  function createColumnMenu(cellIndex, codeCell, menuName, fileName){
    var colMenu = getTableColumnMenu(cellIndex);
    colMenu.$('[data-command="' + menuName + '"]').click();

    var canvas = codeCell.$('canvas');
    var imageData = beakerxPO.getCanvasImageData(canvas, 250, 150);
    beakerxPO.createTableImage(imageData, imageDir, fileName);
  };

  var cellIndex;
  var imageDir = 'groovy/tableMenu';

  describe('Show/Hide menu Items ', function () {
    var maxWidth;

    it('Should display table ', function () {
      cellIndex = 0;
      var width = 200, height = 100;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      beakerxPO.runCodeCellByIndex(cellIndex);
      browser.pause(2000);
      var canvas = codeCell.$('canvas');
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell1_case1.png');
    });

    it('Hide All Columns', function () {
      var tblDisplay = beakerxPO.getTableDisplayByIndex(cellIndex);
      var tableMenu = beakerxPO.getTableIndexMenu(tblDisplay);
      tableMenu.$('[data-command="Show All Columns"]').click();
      browser.pause(1000);
      maxWidth = parseInt(beakerxPO.getDataGridCssPropertyByIndex(cellIndex, 'width'));
      tableMenu = beakerxPO.getTableIndexMenu(tblDisplay);
      tableMenu.$('[data-command="Hide All Columns"]').click();
      browser.pause(1000);
      var minWidth = parseInt(beakerxPO.getDataGridCssPropertyByIndex(cellIndex, 'width'));
      expect(maxWidth).toBeGreaterThan(minWidth);
    });

    it('Show All Columns', function () {
      var tblDisplay = beakerxPO.getTableDisplayByIndex(cellIndex);
      tableMenu = beakerxPO.getTableIndexMenu(tblDisplay);
      tableMenu.$('[data-command="Hide All Columns"]').click();
      browser.pause(1000);
      var width_1 = parseInt(beakerxPO.getDataGridCssPropertyByIndex(cellIndex, 'width'));
      var tableMenu = beakerxPO.getTableIndexMenu(tblDisplay);
      tableMenu.$('[data-command="Show All Columns"]').click();
      browser.pause(1000);
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
      subMenu[0].$('div.fa.fa-check').click();
      var width_2 = parseInt(beakerxPO.getDataGridCssPropertyByIndex(cellIndex, 'width'));
      expect(width_1).toBeGreaterThan(width_2);
    });

    it('Hide all columns by checking submenu items', function () {
      var width_1 = parseInt(beakerxPO.getDataGridCssPropertyByIndex(cellIndex, 'width'));
      for(var i = 1; i < subMenu.length; i += 1){
        subMenu[i].$('div.fa.fa-check').click();
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
      expect(subMenu.length).toEqual(14);
      subMenu[8].click();

      var codeCell = beakerxPO.getCodeCellByIndex(cellIndex);
      var canvas = codeCell.$('canvas');
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell2_case1.png');
    });

    it('Should format index column to "formatted integer"', function () {
      var subMenu = getSubMenu(cellIndex, 1).$$('li');
      subMenu[2].click();

      var codeCell = beakerxPO.getCodeCellByIndex(cellIndex);
      var canvas = codeCell.$('canvas');
      var imageData = beakerxPO.getCanvasImageData(canvas, width, height);
      beakerxPO.checkImageData(imageData, imageDir, 'cell2_case2.png');
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

  describe('Column menu option "Hide column"', function () {
    it('Should hide column', function () {
      cellIndex += 3;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      checkColumnMenu(cellIndex, codeCell, 'Hide column', 'cell4_case1.png');
    });
  });

  describe('Column menu option "Sort Ascending"', function () {
    it('Should sort column', function () {
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      checkColumnMenu(cellIndex, codeCell, 'Sort Ascending', 'cell4_case2.png');
    });
  });

  describe('Column menu option "Sort Descending"', function () {
    it('Should sort column', function () {
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      checkColumnMenu(cellIndex, codeCell, 'Sort Descending', 'cell4_case3.png');
    });
  });

  describe('Column menu option "No Sort"', function () {
    it('Should display column without sorting', function () {
      var codeCell = beakerxPO.getCodeCellByIndex(cellIndex);
      checkColumnMenu(cellIndex, codeCell, 'No Sort', 'cell4_case4.png');
    });
  });

  describe('Column menu option "Align Left"', function () {
    it('Should align to the left', function () {
      var codeCell = beakerxPO.getCodeCellByIndex(cellIndex);
      checkColumnMenu(cellIndex, codeCell, 'Align Left', 'cell4_case5.png');
    });
  });

  describe('Column menu option "Align Center"', function () {
    it('Should align to the center', function () {
      var codeCell = beakerxPO.getCodeCellByIndex(cellIndex);
      checkColumnMenu(cellIndex, codeCell, 'Align Center', 'cell4_case6.png');
    });
  });

  describe('Column menu option "Align Right"', function () {
    it('Should align to the right', function () {
      var codeCell = beakerxPO.getCodeCellByIndex(cellIndex);
      checkColumnMenu(cellIndex, codeCell, 'Align Right', 'cell4_case7.png');
    });
  });

  describe('Column menu option "Heatmap"', function () {
    it('Should display Heatmap in column', function () {
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      checkColumnMenu(cellIndex, codeCell, 'Heatmap', 'cell4_case8.png');
    });
  });

  describe('Column menu option "Data Bars"', function () {
    it('Should display Data Bars in column', function () {
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      checkColumnMenu(cellIndex, codeCell, 'Data Bars', 'cell4_case9.png');
    });
  });

  describe('Column menu option "Color by unique"', function () {
    it('Should display Color by unique in column', function () {
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      checkColumnMenu(cellIndex, codeCell, 'Color by unique', 'cell4_case10.png');
    });
  });

  describe('Column menu option "Reset formatting"', function () {
    it('Should reset formatting for column', function () {
      var codeCell = beakerxPO.getCodeCellByIndex(cellIndex);
      checkColumnMenu(cellIndex, codeCell, 'Reset formatting', 'cell4_case11.png');
    });
  });

  describe('Column menu option "Fix Left"', function () {
    it('Should Fix Left column', function () {
      var codeCell = beakerxPO.getCodeCellByIndex(cellIndex);
      checkColumnMenu(cellIndex, codeCell, 'Fix Left', 'cell4_case12.png');
    });
  });

  describe('Column menu option "Move column to front"', function () {
    it('Should move column to front', function () {
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var colMenu = getTableColumnMenu(cellIndex, 230, 10);
      colMenu.$('[data-command="Move column to front"]').click();

      var canvas = codeCell.$('canvas');
      var imageData = beakerxPO.getCanvasImageData(canvas, 250, 150);
      beakerxPO.checkImageData(imageData, imageDir, 'cell4_case13.png');
    });
  });

  describe('Column menu option "Move column to end"', function () {
    it('Should move column to end', function () {
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      checkColumnMenu(cellIndex, codeCell, 'Move column to end', 'cell4_case14.png');
    });
  });

  describe('Column menu option "Format double with precision is 2"', function () {
    it('Should format double with precision is 2', function () {
      cellIndex += 5;
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var colMenu = getTableColumnMenu(cellIndex);
      var subMenu1 = beakerxPO.getTableIndexSubMenu(colMenu, 0)[0];
      var subMenu2 = beakerxPO.getTableIndexSubMenu(subMenu1, 0)[1];
      subMenu2.$('li[data-command="precision_2"]').click();

      var canvas = codeCell.$('canvas');
      var imageData = beakerxPO.getCanvasImageData(canvas, 250, 150);
      beakerxPO.checkImageData(imageData, imageDir, 'cell5_case1.png');
    });
  });

  describe('Column menu option "Search for Substring"', function () {
    it('Should select values with "9"', function () {
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var colMenu = getTableColumnMenu(cellIndex);
      colMenu.$('[data-command="Search for Substring"]').click();

      var input = codeCell.$$('div.p-Widget.input-clear-growing')[0].$('input');
      input.click();
      browser.keys('9');
      var canvas = codeCell.$('canvas');
      var imageData = beakerxPO.getCanvasImageData(canvas, 250, 115);
      beakerxPO.checkImageData(imageData, imageDir, 'cell5_case2.png');
    });
  });

  describe('Index menu option "Search for Substring"', function () {
    it('Should select index with "9"', function () {
      var codeCell = beakerxPO.runCodeCellByIndex(cellIndex);
      var tblDisplay = beakerxPO.getTableDisplayByIndex(cellIndex);
      var tableMenu = beakerxPO.getTableIndexMenu(tblDisplay);
      tableMenu.$('[data-command="Search for Substring"]').click();

      var input = codeCell.$$('div.p-Widget.input-clear-growing')[11].$('input');
      input.click();
      browser.keys('9');
      var canvas = codeCell.$('canvas');
      var imageData = beakerxPO.getCanvasImageData(canvas, 250, 65);
      beakerxPO.checkImageData(imageData, imageDir, 'cell5_case3.png');
    });
  });

});
