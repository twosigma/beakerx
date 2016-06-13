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
    beakerPO.waitUntilLoadingFinished().then(done);
  });

  afterAll(function (done) {
    beakerPO.closeNotebook().then(done);
  });

  describe('Simple Table', function () {
    it('should have Key and Value columns', function (done) {
      beakerPO.getCodeOutputCellIdBySectionTitle('Key Value Table').then(function (v) {
        beakerPO.waitCodeCellOutputTablePresentByIdCell(v);
        beakerPO.checkDataTableHeadByIdCell(v, 'Key\nValue');
        done();
      });
    });

    it('should have 3 columns (index, name, mass)', function (done) {
      beakerPO.getCodeOutputCellIdBySectionTitle('Table with Index column').then(function (v) {
        beakerPO.waitCodeCellOutputTablePresentByIdCell(v);
        expect(beakerPO.getDataTablesTHeadByIdCell(v).all(by.css('th')).count()).toBe(6);//column names row and filter row
        beakerPO.checkDataTableHeadByIdCell(v, 'index name\nmass');
        done();
      });
    });

    it('should be sorted by 1 column (asc)', function (done) {
      beakerPO.getCodeOutputCellIdBySectionTitle('Table with Index column').then(function (v) {
        beakerPO.waitCodeCellOutputTablePresentByIdCell(v);
        beakerPO.checkClass(beakerPO.getDataTablesColumnByIdCell(v, 0), 'sorting_1');
        beakerPO.checkDataTableBodyByIdCell(v, 5, '0 strange 95000000.0000');
        done();
      });
    });

    it('should have 1st column fixed', function (done) {
      beakerPO.getCodeOutputCellIdBySectionTitle('Key Value Table').then(function (v) {
        beakerPO.waitCodeCellOutputTablePresentByIdCell(v);
        expect(beakerPO.getDTFCLeftBody(v).get(0).all(by.css('td')).count()).toBe(1);
        expect(beakerPO.getDTFCRightBody(v).count()).toBe(0);
        done();
      });
    });

    it('should have horizontal scroll', function (done) {
      beakerPO.getCodeOutputCellIdBySectionTitle('Horizontal scroll').then(function (v) {
        beakerPO.waitCodeCellOutputTablePresentByIdCell(v);
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
        beakerPO.waitCodeCellOutputTablePresentByIdCell(v);
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
      actualItems.each(function (element, index) {
        element.getInnerHtml().then(function (text) {
          expect(text.trim()).toBe(expectedItems[index]);
          if (done && index === expectedItems.length - 1) {
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
      beakerPO.getCodeOutputCellIdBySectionTitle('Table Header').then(function (v) {
        beakerPO.waitCodeCellOutputTablePresentByIdCell(v);
      });
      var firstLevelItems = beakerPO.getDataTableMenuFirstLevelItems('Table Header');
      checkMenus(expectedItems, firstLevelItems, done);
    });

    it('should contain Rows to Show submenus', function (done) {
      var menusExpected = ['10', '25', '50', '100', 'All'];
      var menusActual = beakerPO.getDataTableSubmenu('Table Header', 'Rows to Show').all(by.css('a'));
      checkMenus(menusExpected, menusActual, done);
    });

    it('should contain Show Column submenus', function (done) {
      var menusExpected = ['A', 'B', 'C', 'D'];
      var menusActual = beakerPO.getDataTableSubmenu('Table Header', 'Show Column').all(by.css('a'));
      checkMenus(menusExpected, menusActual, done);
    });

    it('should have menu icons', function(done){
      var section = 'Table Header';
      beakerPO.getDataTableMenuToggle(section).click().then(function(){
        beakerPO.checkDataTableMenuItemHasIcon(beakerPO.getDataTableMenuItem(section, 'Search...'), 'fa-search', true);
        beakerPO.checkDataTableMenuItemHasIcon(beakerPO.getDataTableMenuItem(section, 'Filter...'), 'fa-filter', true);
        done();
      });
    });

    describe('Table Menu Toggle', function () {

      it('should be in the left-most column header', function (done) {
        beakerPO.getCodeOutputCellIdBySectionTitle('Table Header').then(function (v) {
          beakerPO.waitCodeCellOutputTablePresentByIdCell(v);
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


    describe('Table Menu Interactions', function () {
      it('should hide pagination', function (done) {
        var section = 'Table with pagination';
        var paginationMenu = beakerPO.getDataTableMenuItem(section, 'Use pagination');
        beakerPO.getCodeOutputCellIdBySectionTitle(section).then(function (v) {
          beakerPO.waitCodeCellOutputTablePresentByIdCell(v);
          expect(beakerPO.getDataTablePaginationControl(v).isPresent()).toBe(true);
          beakerPO.getDataTableMenuToggle(section).click().then(function(){
            beakerPO.checkDataTableMenuItemHasIcon(paginationMenu, 'glyphicon-ok', true);
            paginationMenu.element(by.css('a[ng-click="doUsePagination()"]')).click().then(function(){
              expect(beakerPO.getDataTablePaginationControl(v).isPresent()).toBe(false);
              beakerPO.checkDataTableMenuItemHasIcon(paginationMenu, 'glyphicon-ok', false);
              done();
            });
          });
        });
      });

      it('should display 10 rows', function (done) {
        var section = 'Table with pagination';
        var rowsToShowMenu = beakerPO.getDataTableMenuItem(section, 'Rows to Show');

        beakerPO.getCodeOutputCellIdBySectionTitle(section).then(function (v) {
          beakerPO.waitCodeCellOutputTablePresentByIdCell(v);
          beakerPO.getDataTableMenuToggle(section).click().then(function () {
            browser.actions().mouseMove(rowsToShowMenu).perform();
            var show10 = beakerPO.getDataTableSubMenuItem(rowsToShowMenu, '10');
            show10.element(by.css('a[ng-click="changePageLength(length)"]')).click().then(function () {
                expect(beakerPO.isDTRowInViewPort(beakerPO.getDataTablesScrollBodyByIdCell(v, 0), 10)).toBe(true);
                expect(beakerPO.isDTRowInViewPort(beakerPO.getDataTablesScrollBodyByIdCell(v, 0), 11)).toBe(false);
                done();
            });
          });
        });
      });

      var allRowsCount = 50;
      it('should display All rows', function (done) {
        var section = 'Table with pagination';
        browser.driver.manage().window().maximize();
        var rowsToShowMenu = beakerPO.getDataTableMenuItem(section, 'Rows to Show');

        beakerPO.getCodeOutputCellIdBySectionTitle(section).then(function (v) {
          beakerPO.waitCodeCellOutputTablePresentByIdCell(v);
          beakerPO.getDataTableMenuToggle(section).click().then(function () {
            browser.actions().mouseMove(rowsToShowMenu).perform();
            var showAll = beakerPO.getDataTableSubMenuItem(rowsToShowMenu, 'All');
            showAll.element(by.css('a[ng-click="changePageLength(length)"]')).click().then(function () {
              expect(beakerPO.isDTRowInViewPort(beakerPO.getDataTablesScrollBodyByIdCell(v, 0), allRowsCount)).toBe(true);
            });
            done();
          });
        });
      });

      it('should select all rows', function (done) {
        var section = 'Table with pagination';
        beakerPO.getCodeOutputCellIdBySectionTitle(section).then(function (v) {
          beakerPO.waitCodeCellOutputTablePresentByIdCell(v);
          beakerPO.getDataTableMenuToggle(section).click();
          var selectAllMenu = beakerPO.getDataTableMenuItem(section, 'Select All');
          selectAllMenu.element(by.css('a[ng-click="doSelectAll()"]')).click();
          beakerPO.getDataTablesTBodyByIdCell(v).each(function (row, index) {
            beakerPO.checkClass(row, 'selected');
            if(index === allRowsCount-1){
              done();
            }
          });
        });
      });

      var deselectRows = function (sectionTitle) {
        beakerPO.getCodeOutputCellIdBySectionTitle(sectionTitle).then(function (v) {
          beakerPO.waitCodeCellOutputTablePresentByIdCell(v);
          beakerPO.getDataTableMenuToggle(sectionTitle).click();
          var deselectAllMenu = beakerPO.getDataTableMenuItem(sectionTitle, 'Deselect All');
          deselectAllMenu.element(by.css('a[ng-click="doDeselectAll()"]')).click();
        });
      };

      it('should deselect all rows', function (done) {
        var section = 'Table with pagination';
        deselectRows(section);
        beakerPO.getCodeOutputCellIdBySectionTitle(section).then(function (v) {
          beakerPO.getDataTablesTBodyByIdCell(v).each(function (row, index) {
            expect(beakerPO.hasClass(row, 'selected')).toBe(false);
            if(index === allRowsCount-1){
              done();
            }
          });
        });
      });

      var selectRows = function (rowsToSelect, sectionTitle) {
        beakerPO.getCodeOutputCellIdBySectionTitle(sectionTitle).then(function (v) {
          beakerPO.waitCodeCellOutputTablePresentByIdCell(v);
          for (var i = 0; i < rowsToSelect.length; i++) {
            beakerPO.getDTRow(v, rowsToSelect[i]).click();
          }
        });
      };

      it('should reverse rows selection', function (done) {
        var section = 'Table with pagination';
        var selectedRows = [0, 3, 5];
        selectRows(selectedRows, section);
        beakerPO.getCodeOutputCellIdBySectionTitle(section).then(function (v) {
          beakerPO.getDataTablesTBodyByIdCell(v).each(function (row, index) {
            expect(beakerPO.hasClass(row, 'selected')).toBe(selectedRows.indexOf(index) !== -1);
          });
          beakerPO.getDataTableMenuToggle(section).click();
          var reverseSelectionMenu = beakerPO.getDataTableMenuItem(section, 'Reverse Selection');
          reverseSelectionMenu.element(by.css('a[ng-click="doReverseSelection()"]')).click();
          beakerPO.getDataTablesTBodyByIdCell(v).each(function (row, index) {
            expect(beakerPO.hasClass(row, 'selected')).toBe(selectedRows.indexOf(index) === -1);
            if(index === allRowsCount-1){
              done();
            }
          });
        });
      });

      var clickShowColumnMenuItem = function (section, colName) {
        var showColumnMenu = beakerPO.getDataTableMenuItem(section, 'Show Column');
        var colMenuItem = beakerPO.getDataTableSubMenuItem(showColumnMenu, colName);
        colMenuItem.element(by.css('a[ng-click="showColumn($index+1, $event)"]')).click();
      };

      it('should hide all columns', function (done) {
        var section = 'Show/Hide columns';
        var hideAllColumnsMenu = beakerPO.getDataTableMenuItem(section, 'Hide All Columns');

        beakerPO.getCodeOutputCellIdBySectionTitle(section).then(function (v) {
          beakerPO.waitCodeCellOutputTablePresentByIdCell(v);
          beakerPO.getDataTableMenuToggle(section).click();
          hideAllColumnsMenu.element(by.css('a[ng-click="toggleColumnsVisibility(false)"]')).click();
          beakerPO.checkDataTableHeadByIdCell(v, '');
          done();
        });

      });

      it('should show all columns', function (done) {
        var section = 'Show/Hide columns';
        var showAllColumnsMenu = beakerPO.getDataTableMenuItem(section, 'Show All Columns');

        beakerPO.getCodeOutputCellIdBySectionTitle(section).then(function (v) {
          beakerPO.waitCodeCellOutputTablePresentByIdCell(v);
          beakerPO.getDataTableMenuToggle(section).click();
          showAllColumnsMenu.element(by.css('a[ng-click="toggleColumnsVisibility(true)"]')).click();
          beakerPO.checkDataTableHeadByIdCell(v, 'first\nsecond\nthird');
          done();
        });

      });

      it('should show only second column', function (done) {
        var section = 'Show/Hide columns';
        var showColumnMenu = beakerPO.getDataTableMenuItem(section, 'Show Column');

        beakerPO.getCodeOutputCellIdBySectionTitle(section).then(function (v) {
          beakerPO.waitCodeCellOutputTablePresentByIdCell(v);
          beakerPO.getDataTableMenuToggle(section).click();
          browser.actions().mouseMove(showColumnMenu).perform();
          clickShowColumnMenuItem(section, 'first');
          clickShowColumnMenuItem(section, 'third');
          beakerPO.checkDataTableHeadByIdCell(v, 'second');
          done();
        });
      });

      var tableSearchSection = 'Table search';
      var showTableSearch = function () {
        var section = tableSearchSection;
        var tableSearchMenu = beakerPO.getDataTableMenuItem(tableSearchSection, 'Search...');
        beakerPO.getCodeOutputCellIdBySectionTitle(tableSearchSection).then(function (v) {
          beakerPO.waitCodeCellOutputTablePresentByIdCell(v);
          beakerPO.getDataTableMenuToggle(section).click();
          tableSearchMenu.element(by.css('a[ng-click="doShowFilter(table.column(0), true)"]')).click();
        });
      };
      it('should show table search', function (done) {
        beakerPO.getCodeOutputCellIdBySectionTitle(tableSearchSection).then(function (v) {
          beakerPO.waitCodeCellOutputTablePresentByIdCell(v);
          showTableSearch();
          expect(beakerPO.getDataTableSearchField(v).element(by.tagName('input')).getInnerHtml())
            .toBe(browser.driver.switchTo().activeElement().getInnerHtml());
          done();
        });
      });

      it('should hide empty search row on blur', function (done) {
        beakerPO.getCodeOutputCellIdBySectionTitle(tableSearchSection).then(function (v) {
          beakerPO.waitCodeCellOutputTablePresentByIdCell(v);
          showTableSearch();
          expect(beakerPO.getDataTableFilterRow(v).isDisplayed()).toBe(true);
          beakerPO.getDataTablesScrollBodyByIdCell(v).click();
          expect(beakerPO.getDataTableFilterRow(v).isDisplayed()).toBe(false);
          done();
        });
      });

    });

  });
});