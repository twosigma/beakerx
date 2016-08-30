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
    browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:..%2Ftest%2Fnotebooks%2Ftables-test.bkr&readOnly=true");
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

    it('should be sorted by server (jscript)', function (done) {
      beakerPO.getCodeOutputCellIdBySectionTitle('Table with Index column').then(function (v) {
        beakerPO.waitCodeCellOutputTablePresentByIdCell(v);
        beakerPO.checkDataTableBodyByIdCell(v, 5, '4 up 2300000.0000');
        beakerPO.getDataTablesScrollHeadByIdCell(v).all(by.css('th')).get(0).click();
        beakerPO.waitCodeCellOutputTablePresentByIdCell(v);
        beakerPO.checkDataTableBodyByIdCell(v, 5, '0 strange 95000000.0000');
        done();
      });
    });

    function checkColumn(idCell, columnIndx, values){
      var i;
      for(i = 0; i < values.length; i++){
        beakerPO.checkSubString(beakerPO.getDataTablesTBodyByIdCell(idCell).get(i).all(by.css('td')).get(columnIndx), values[i], 0, 1);
      }
    }

    it("Column 'A' should be timedelta (IPython)", function (done) {
      beakerPO.getCodeOutputCellIdBySectionTitle('Table with timedelta column').then(function (v) {
        beakerPO.clickCodeCellInputButtonByIdCell(v, 'Table');
        var arrTd0 = beakerPO.getDataTablesTBodyByIdCell(v).get(0).all(by.css('td'));
        expect(arrTd0.count()).toBe(4);
        arrTd0.get(1).getText().then(function (str) {
          expect(str).toMatch(/\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/);
        });
        checkColumn(v, 2, ['3', '7', '1']);
        done();
      });
    });

    it("Column 'B' should be sorted (IPython)", function (done) {
      beakerPO.getCodeOutputCellIdBySectionTitle('Sort values').then(function (v) {
        beakerPO.clickCodeCellInputButtonByIdCell(v, 'Table');
        checkColumn(v, 2, ['1', '3', '7']);
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
        'Download All as CSV',
        'Download Selected as CSV',
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

      describe('Table Search', function () {
        var tableSearchSection = 'Table search';
        var cellId;
        var showTableSearch = function (section) {
          var tableSearchMenu = beakerPO.getDataTableMenuItem(section, 'Search...');
          beakerPO.getDataTableMenuToggle(section).click();
          tableSearchMenu.element(by.css('a[ng-click="doShowFilter(table.column(0), true)"]')).click();
        };
        var clickOutsideHeader = function(cellId){
          beakerPO.getDataTablesScrollBodyByIdCell(cellId).click();
        };
        var getClearIcon = function (searchField) {
          return searchField.element(by.css('.clear-filter'));
        };

        beforeAll(function (done) {
          beakerPO.getCodeOutputCellIdBySectionTitle(tableSearchSection).then(function (id) {
            cellId = id;
            beakerPO.waitCodeCellOutputTablePresentByIdCell(cellId);
            done();
          });
        });

        beforeEach(function (done) {
          showTableSearch(tableSearchSection);
          beakerPO.getDataTableSearchInput(cellId).clear();
          done();
        });

        afterEach(function (done) {
          clickOutsideHeader(cellId);
          done();
        });

        it('should have focus on opening', function () {
          expect(beakerPO.getDataTableSearchInput(cellId).getInnerHtml())
            .toBe(browser.driver.switchTo().activeElement().getInnerHtml());
        });

        it('should have search icon', function () {
          var searchIcon = beakerPO.getDataTableSearchField(cellId).element(by.css('.filter-icon'));
          expect(beakerPO.hasClass(searchIcon, 'fa-search')).toBe(true);
          expect(beakerPO.hasClass(searchIcon, 'fa-filter')).toBe(false);
        });

        it('should be hidden on blur if row is empty', function () {
          beakerPO.getDataTableSearchInput(cellId).clear();
          expect(beakerPO.getDataTableFilterRow(cellId).isDisplayed()).toBe(true);
          clickOutsideHeader(cellId);
          expect(beakerPO.getDataTableFilterRow(cellId).isDisplayed()).toBe(false);
        });

        it('should not be hidden on blur if row is not empty', function () {
          beakerPO.getDataTableSearchInput(cellId).sendKeys('2');
          clickOutsideHeader(cellId);
          expect(beakerPO.getDataTableFilterRow(cellId).isDisplayed()).toBe(true);
        });

        it('should find "2 a2 b2 c2" row', function () {
          beakerPO.getDataTableSearchInput(cellId).sendKeys('2');
          beakerPO.checkDataTableBodyByIdCell(cellId, 1, '2 a2 b2 c2');
        });

        it('should grow on typing', function (done) {
          var input = beakerPO.getDataTableSearchInput(cellId);
          var iconsWidth = 30;
          var padding = 15;
          input.sendKeys('222222222222222');
          var lengthEl = beakerPO.getDataTableSearchField(cellId).element(by.css('.hidden-length'));
          browser.executeScript('return $(arguments[0]).width()', lengthEl.getWebElement()).then(function(width){
            var expectedWidth = width + iconsWidth + padding;
            input.getSize().then(function(inputSize){
              expect(inputSize.width).toEqual(expectedWidth);
              done();
            });
          });
        });

        it('should have clear icon', function () {
          var clearIcon = getClearIcon(beakerPO.getDataTableSearchField(cellId));
          expect(beakerPO.hasClass(clearIcon, 'fa-times')).toBe(true);
        });

        it('should be empty after clear icon click', function () {
          var searchInput = beakerPO.getDataTableSearchInput(cellId);
          searchInput.sendKeys('2');
          expect(searchInput.getAttribute('value')).toEqual('2');
          var clearIcon = getClearIcon(beakerPO.getDataTableSearchField(cellId));
          clearIcon.click();
          expect(searchInput.getAttribute('value')).toEqual('');
        });

        it('should update search results on clear', function () {
          var searchInput = beakerPO.getDataTableSearchInput(cellId);
          searchInput.sendKeys('2');
          beakerPO.checkDataTableBodyByIdCell(cellId, 1, '2 a2 b2 c2');
          getClearIcon(beakerPO.getDataTableSearchField(cellId)).click();
          beakerPO.checkDataTableBodyByIdCell(cellId, 5, '0 a0 b0 c0');
        });

        it('should hide search row', function () {
          beakerPO.getDataTableSearchInput(cellId).sendKeys('2');
          beakerPO.getDataTableMenuToggle(tableSearchSection).click();
          var hideFilterMenu = beakerPO.getDataTableMenuItem(tableSearchSection, 'Hide Filter');
          hideFilterMenu.element(by.css('a[ng-click="hideFilter()"]')).click();
          expect(beakerPO.getDataTableFilterRow(cellId).isDisplayed()).toBe(false);
          beakerPO.checkDataTableBodyByIdCell(cellId, 5, '0 a0 b0 c0');
        });

      });
    });
  });
});