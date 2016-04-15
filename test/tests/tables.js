/*
 *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC
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

var BeakerPageObject = require('./beaker.po.js');
var path = require('path');

var beakerPO;

describe('Beaker Tables', function () {

  beforeAll(function (done) {
    beakerPO = new BeakerPageObject();
    browser.get(beakerPO.baseURL);
    beakerPO.openFile(path.join(__dirname, '../', 'notebooks/tables-test.bkr'));
    beakerPO.waitUntilLoadingFinished();
    browser.executeScript('window.scrollTo(0,document.body.scrollHeight)').then(done);
  });

  afterAll(function (done) {
    beakerPO.closeNotebook().then(done);
  });

  describe('Simple Table', function () {
    it('should have Key and Value columns', function (done) {
      beakerPO.getCodeOutputCellIdBySectionTitle('Key Value Table').then(function (v) {
        beakerPO.checkDataTableHeadByIdCell(v, 'Key\nValue');
        done();
      });
    });

    it('should have 3 columns (index, name, mass)', function (done) {
      beakerPO.getCodeOutputCellIdBySectionTitle('Table with Index column').then(function (v) {
        expect(beakerPO.getDataTablesTHeadByIdCell(v).all(by.css('th')).count()).toBe(6);//column names row and filter row
        beakerPO.checkDataTableHeadByIdCell(v, 'index name\nmass');
        done();
      });
    });

    it('should be sorted by 1 column (asc)', function (done) {
      beakerPO.getCodeOutputCellIdBySectionTitle('Table with Index column').then(function (v) {
        beakerPO.checkClass(beakerPO.getDataTablesColumnByIdCell(v, 0), 'sorting_1');
        beakerPO.checkDataTableBodyByIdCell(v, 5, '0 strange 95000000.0000');
        done();
      });
    });

    it('should have 1st column fixed', function (done) {
      beakerPO.getCodeOutputCellIdBySectionTitle('Key Value Table').then(function (v) {
        expect(beakerPO.getDTFCLeftBody(v).get(0).all(by.css('td')).count()).toBe(1);
        expect(beakerPO.getDTFCRightBody(v).count()).toBe(0);
        done();
      });
    });

    it('should have horizontal scroll', function (done) {
      beakerPO.getCodeOutputCellIdBySectionTitle('Horizontal scroll').then(function (v) {
        beakerPO.getDataTablesColumnByIdCell(v, 1).getLocation().then(function (locationBeforeScroll) {
          var x = 300;
          beakerPO.scrollDataTableHorizontally(v, x);
          beakerPO.getDataTablesColumnByIdCell(v, 1).getLocation().then(function (locationAfterScroll) {
            expect(locationBeforeScroll.x).toBe(locationAfterScroll.x + x);
            beakerPO.scrollDataTableHorizontally(v, 0);
            done();
          });
        });
      });
    });

    it('should have 1st column fixed when scrolling horizontally', function (done) {
      beakerPO.getCodeOutputCellIdBySectionTitle('Horizontal scroll').then(function (v) {
        beakerPO.getDTFCLeftColumn(v, 0).getLocation().then(function (locationBeforeScroll) {
          beakerPO.scrollDataTableHorizontally(v, 10000);
          expect(beakerPO.getDTFCLeftColumn(v, 0).getLocation()).toEqual(locationBeforeScroll);
          done();
        });
      });
    });
  });

  describe('Table Menu', function () {

    function checkMenus(expectedItems, actualItems, done) {
      expect(actualItems.count()).toBe(expectedItems.length);
      actualItems.each(function(element, index) {
        element.getInnerHtml().then(function (text) {
          expect(text.trim()).toBe(expectedItems[index]);
          if(done && index === expectedItems.length - 1){
            done();
          }
        });
      });
    }

    it('should contain items', function (done) {
      var expectedItems = [
        'Reset All Interactions',
        'Use pagination',
        'Rows to Show',
        'Select All',
        'Deselect All',
        'Reverse Selection',
        'Copy to Clipboard',
        'Save All as CSV',
        'Save Selected as CSV',
        'Show All Columns',
        'Show Column',
        'Hide All Columns',
        'Search...',
        'Filter...',
        'Hide Filter'
      ];
      var firstLevelItems = beakerPO.getDataTableMenuFirstLevelItems('Table Header');
      checkMenus(expectedItems, firstLevelItems, done);
    });

    it('should contain submenus', function (done) {
      var rowsToShowExpected = ['10', '25', '50', '100', 'All'];
      var rowsToShowActual = beakerPO.getDataTableSubmenu('Table Header', 'Rows to Show').all(by.css('a'));
      checkMenus(rowsToShowExpected, rowsToShowActual);
      var showColumnExpected = ['A', 'B', 'C', 'D'];
      var showColumnActual = beakerPO.getDataTableSubmenu('Table Header', 'Show Column').all(by.css('a'));
      checkMenus(showColumnExpected, showColumnActual, done);
    });

    describe('Table Menu Toggle', function () {

      it('should be in the left-most column header', function (done) {
        beakerPO.getCodeOutputCellIdBySectionTitle('Table Header').then(function (v) {
          beakerPO.getDTFCLeftColumnHeader(v, 0).getLocation().then(function (headerLocation) {
            beakerPO.getDataTableMenuToggle('Table Header').getLocation().then(function (menuToggleLocation) {
              var headerBorder = 1;
              expect(menuToggleLocation.x).toBe(headerLocation.x + headerBorder);
              expect(menuToggleLocation.y).toBe(headerLocation.y + headerBorder);
              done();
            });
          });
        });
      });

      it('should be white on hover', function (done) {
        var menuToggle = beakerPO.getDataTableMenuToggle('Table Header');
        browser.actions().mouseMove(menuToggle).perform();
        expect(menuToggle.getCssValue('color')).toBe('rgba(35, 82, 124, 1)');
        expect(menuToggle.element(by.css('span')).getCssValue('background-image')).toContain('menu_white@2x.png');
        done();
      });

    });

  });
});