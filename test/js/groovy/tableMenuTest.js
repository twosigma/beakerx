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

    it('Hide All Columns', function(){
      var tblDisplay = beakerxPO.getTableDisplayByIndex(cellIndex);
      maxWidth = parseInt(beakerxPO.getDataGridCssPropertyByIndex(cellIndex, 'width'));
      var tableMenu = beakerxPO.getTableIndexMenu(tblDisplay);
      tableMenu.click('[data-command="Hide All Columns"]');
      var minWidth = parseInt(beakerxPO.getDataGridCssPropertyByIndex(cellIndex, 'width'));
      expect(maxWidth).toBeGreaterThan(minWidth);
    });

    it('Show All Columns', function(){
      var tblDisplay = beakerxPO.getTableDisplayByIndex(cellIndex);
      var width_1 = parseInt(beakerxPO.getDataGridCssPropertyByIndex(cellIndex, 'width'));
      var tableMenu = beakerxPO.getTableIndexMenu(tblDisplay);
      tableMenu.click('[data-command="Show All Columns"]');
      var width_2 = parseInt(beakerxPO.getDataGridCssPropertyByIndex(cellIndex, 'width'));
      expect(width_2).toBeGreaterThan(width_1);
      expect(maxWidth).toEqual(width_2);
    });

    var subMenu;

    it('Hide "m3" column', function(){
      var tblDisplay = beakerxPO.getTableDisplayByIndex(cellIndex);
      var width_1 = parseInt(beakerxPO.getDataGridCssPropertyByIndex(cellIndex, 'width'));
      var tblSubMenu = beakerxPO.getTableIndexSubMenu(beakerxPO.getTableIndexMenu(tblDisplay), 0);
      subMenu = tblSubMenu.$$('li');
      expect(subMenu.length).toEqual(11);
      expect(subMenu[0].getText()).toEqual('m3');
      subMenu[0].click('div.fa.fa-check');
      var width_2 = parseInt(beakerxPO.getDataGridCssPropertyByIndex(cellIndex, 'width'));
      expect(width_1).toBeGreaterThan(width_2);
    });

    it('Hide all columns by checking submenu items', function(){
      var width_1 = parseInt(beakerxPO.getDataGridCssPropertyByIndex(cellIndex, 'width'));
      for(var i = 1; i < subMenu.length; i += 1){
        subMenu[i].click('div.fa.fa-check');
      }
      var width_2 = parseInt(beakerxPO.getDataGridCssPropertyByIndex(cellIndex, 'width'));
      expect(width_1).toBeGreaterThan(width_2);
    });
  });

});