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

//var _ = require('underscore');
var path = require('path');
var fs = require('fs');

var BeakerPageObject = function() {

  this.EC = protractor.ExpectedConditions;
  this.baseURL = 'http://127.0.0.1:8801/';
  this.mainmenu = element.all(by.repeater('m in getMenus()'));
  //jscs:disable
  this.submenu = element.all(by.repeater("item in getMenuItems() | filter:isHidden | orderBy:'sortorder'"))
  //jscs:enable
    .filter(function(e, i) { return e.isDisplayed(); });

  this.waitForInstantiationCells = function(screenshotName) {
    var self = this;
    var dialogIsPresent = this.EC.presenceOf($('.modal-dialog'));
    // First wait for the modal to show up when opening a URL
    browser.wait(dialogIsPresent, 10000).then(function(){
      // wait for the modal to close
      browser.wait(self.EC.not(dialogIsPresent), 100000).then(function(){
        return true;
      },
      function(error){
        beakerPO.createScreenshot(screenshotName);
        expect(error).toBe('Cells have been initialized');
      });
    });
  };

  this.openFile = function(path) {
    this.openMenuAtIndex(0);

    browser.sleep(1000); // mouseMove happens too fast and the menu doesnt display sometimes. Couldn't find a better solution.
    browser.actions().mouseMove(element(by.css('#open-menuitem'))).perform();

    element(by.css('a[title="Open a bkr notebook file"]')).click();
    browser.wait(function() {
      return element(by.css('input.form-control')).sendKeys(path)
        .then(function() {
          return true;
        })
        .thenCatch(function() {
          return false;
        });
    }, 100000);

    return element(by.css('.modal-submit')).click();
  };

  this.waitUntilGraphOutputPresent = function() {
    return browser.wait(function() {
      return element(by.css('bk-output-display[type="Plot"]')).isDisplayed()
      .then(function() {
        return true;
      })
      .thenCatch(function() {
        return false;
      });
    }, 100000);
  };

  this.openMenuAtIndex = function(index) {
    return this.mainmenu.get(index).element(by.css('.dropdown-toggle')).click();
  };

  this.toggleLanguageCellMenu = function(opts) {
    return element.all(by.css('.dropdown-toggle bk-language-logo'))
    .get(opts.cellIndex).click();
  };

  this.isLanguageCellMenuOpen = function() {
    return browser.executeScript('return $(".inputcellmenu:visible").length > 0');
  };

  this.toggleCellMenu = function(opts) {
    return element.all(by.css('.bkcell .toggle-menu .dropdown-promoted'))
    .get(opts.cellIndex)
    .click();
  };

  this.toggleAdvancedMode = function() {
    return element(by.css('.view-menu'))
    .click()
    .then(element(by.partialLinkText('Advanced Mode')).click);
  };

  this.setNormalEditMode = function() {
    var self = this;
    this.setEditMode();
    $('#normal-edit-mode-menuitem').click().then(
        function(resolve){
          return true;
        },
        function(reject){
          console.log("normal-edit-mode-menuitem hasn't displayed");
          self.createScreenshot('errorSetEditMode');
          browser.actions().mouseMove(element(by.css('#edit-mode-menuitem'))).perform();
          $('#normal-edit-mode-menuitem').click();
        }
    );
  };

  this.setEmacsEditMode = function() {
    this.setEditMode();
    element(by.css('#emacs-edit-mode-menuitem')).click();
  };

  this.setVimEditMode = function () {
    var self = this;
    this.setEditMode();
    $('#vim-edit-mode-menuitem').click().then(
        function(resolve){
          return true;
        },
        function(reject){
          console.log("vim-edit-mode-menuitem hasn't displayed");
          self.createScreenshot('errorSetEditMode');
          browser.actions().mouseMove(element(by.css('#edit-mode-menuitem'))).perform();
          $('#vim-edit-mode-menuitem').click();
        }
    );

  };

  this.setSublimeEditMode = function() {
    this.setEditMode().then(element(by.css('#sublime-edit-mode-menuitem')).click);
  };

  this.setEditMode = function() {
    $('.notebook-menu').click();
    return browser.actions().mouseMove($('#edit-mode-menuitem')).perform();
  };

  this.isCellMenuOpen = function(opts) {
    return element.all(by.css('.bkcell .open.toggle-menu-items.bkr'))
    .get(opts.cellIndex)
    .isDisplayed()
    .then(function() {
      return true;
    })
    .thenCatch(function() {
      return false;
    });
  };

  this.newEmptyNotebook = element(by.css('a.new-empty-notebook'));
  this.newEmptyNotebookClick = function() {
    this.clickElementWithHandlingError($('a.new-empty-notebook'), 'newEmptyNotebook');
  };

  this.logLocationElement = function(elem, name){
    elem.getLocation().then(
        function(locat){
          console.log(name + " x : " + locat.x + " y : " + locat.y);
        }
    );
  }

  this.fileMenu = element(by.className('file-menu'));
  this.viewMenu = element(by.className('view-menu'));
  this.notebookMenu = element(by.className('notebook-menu'));
  this.helpMenu = element(by.className('help-menu'));

  this.languageManagerMenuItem = element(by.className('language-manager-menuitem'));
  this.runAllCellsMenuItem = element(by.className('run-all-cells-menuitem'));
  this.closeMenuItem = element(by.className('close-menuitem'));

  this.closeNotebook = function() {
    return this.fileMenu.click()
    .then(this.closeMenuItem.click)
    .then(this.modalDialogNoButton.click)
    .thenCatch(function(e) {
      //if there has been no change do not fail here;
    });
  }.bind(this);

  this.waitForPlugin = function(plugin) {
    var self = this;
    browser.wait(function() {
      var deferred = protractor.promise.defer();
      this.languageManagerButtonActive(plugin).isPresent()
        .then(function(result) {
          deferred.fulfill(result);
        },
        function(error){
          deferred.rejected(error);

        });
      return deferred.promise;
    }.bind(this), 99000).then(null,
    function(){
      self.createScreenshot('waitForPlugin' + plugin);
    });
  };

  this.readMarkdownCell = function() {
    return this.getCellInput();
  };

  this.activateLanguageInManager = function(language) {
    this.languageManagerButtonActive(language).isPresent()
    .then(function(isActive) {
      if (!isActive) {
        return this.languageManagerButton(language).click();
      }
    }.bind(this));
  };

  this.activateLanguage = function(language) {
    this.activateLanguageInManager(language);
    this.waitForPlugin(language);
    this.languageManagerCloseButton.click();
  };

  this.insertCellOfType = function(language) {
    var self = this;
    browser.sleep(1000);
    browser.wait(this.EC.visibilityOf(this.getCellEvaluatorMenu()), 10000)
      .then(function(isVisible){ console.log('CellEvaluatorMenu is visible - ' + isVisible); },
            function(error){ console.log('error'); self.createScreenshot("errorCellEvaluatorMenu");  })
      .then(function(){ self.getCellEvaluatorMenu().click();})
      .then(function(){ self.activateCellEvaluatorMenu(language);  browser.sleep(1000);})
      .then(function(){ browser.wait(self.EC.visibilityOf(self.cellEvaluatorMenuItem(language)), 10000)})
      .then(function(){ console.log('cellEvaluatorMenuItem is visible');
        self.cellEvaluatorMenuItem(language).click();});
  };

  this.insertCellByLanguage = function(language) {
    var self = this;
    this.getCellEvaluatorMenu().click()
        .then(function(){ self.cellEvaluatorMenuItem(language).click(); });
  };

  this.activateCellEvaluatorMenu = function(language) {
    this.cellEvaluatorMenuItem(language).isDisplayed()
        .then(function(isVisible) {
          console.log('cellEvaluatorMenuItem dislayed - ' + isVisible);
          if (!isVisible) {
            return this.getCellEvaluatorMenu().click();
          }
        }.bind(this));
  };

  this.languageManager = element(by.className('plugin-manager'));
  this.languageManagerButtonKnown = function(language) {
    return element(by.css('.plugin-manager .' + language + ' .plugin-known'));
  };
  this.languageManagerButtonActive = function(language) {
    return element(by.css('.plugin-manager .' + language + ' .plugin-active'));
  };
  this.languageManagerButton = function(language) {
    return element(by.css('.plugin-manager .' + language));
  };

  this.getEvaluateButton = function() {
    return element(by.css('a.evaluate-script[ng-click="evaluate($event)"]'));
  };

  this.languageManagerCloseButton = element(by.className('language-manager-close-button'));
  this.insertCellButton = element.all(by.className('insert-cell')).get(0);
  this.deleteCellButton = element(by.className('delete-cell'));
  this.evaluateButton = this.getEvaluateButton();
  this.modalDialogYesButton = element(by.css('.modal .yes'));
  this.modalDialogNoButton = element(by.css('.modal .no'));
  this.modalDialogCancelButton = element(by.css('.modal .cancel'));

  this.getCellEvaluatorMenu = function(){
    return element.all(by.css('.code-cell-area .cell-evaluator-menu')).get(0);
  }
  this.cellEvaluatorMenuItem = function(language) {
    return element.all(by.css('.code-cell-area .' + language + '-menuitem')).get(0);
  };
  this.cellEvaluatorDisplay = element(by.css('.code-cell-area .cell-evaluator-menu b'));

  //Functions for access to plot elements

  this.getPlotLabelgByIdCell = function (idCell, containerIdx) {
    return this.getPlotSvgByIdCell(idCell, containerIdx).element(By.id('labelg'));
  };

  //End Functions for access to plot elements

  //CodeMirror API. See for information https://sharpkit.net/help/SharpKit.CodeMirror/SharpKit.CodeMirror/CodeMirror/

  this.setCellInput = function(code) {
    return browser.executeScript("$('.CodeMirror')[0].CodeMirror.setValue('" + code + "')");
  };

  this.getCellInput = function() {
    return browser.executeScript('return $(".CodeMirror")[0].CodeMirror.getValue()');
  };

  //Set the selection range. start and end should be {line, ch} objects.
  this.setCellInputSelection = function(start, end) {
    return browser.executeScript('$(".CodeMirror")[0].CodeMirror.setSelection({' + start.line + ', ' + start.ch + '}, {' + start.line + ', ' + start.ch + '})');
  };

  //Set the cursor position. You can either pass a single {line, ch} object, or the line and the
  // character as two separate parameters.
  this.setCellInputCursor = function(pos) {
    return browser.executeScript('$(".CodeMirror")[0].CodeMirror.setCursor({' + pos.line + ', ' + pos.ch + '})');
  };

  //start is a boolean indicating whether the start or the end of the selection must be retrieved.
  //If it is not given, the current cursor pos, i.e. the side of the selection that would move if
  //you pressed an arrow key, is chosen. A {line, ch} object will be returned.
  this.getCellInputCursor = function() {
    return browser.executeScript('return $(".CodeMirror")[0].CodeMirror.getCursor()');
  };

  //end CodeMirror API

  this.toggleOutputCellExpansion = function() {
    return element(by.css('bk-code-cell-output div[ng-click="toggleExpansion()"]')).click();
  };

  this.evaluateCell = function() {
    var self = this;

    return browser.wait(function() {
      return self.getEvaluateButton().click()
      .then(function() {
        return true;
      })
      .thenCatch(function() {
        return false;
      });
    }, 100000);
  };

  this.insertNewCell = function() {
    element(by.css('bk-new-cell-menu')).click();
    return this.insertCellButton.click();
  };

  this.getCellOutput = function() {
    return element(by.css('bk-output-display > div'));
  };

  this.getLoadingIndicator = function() {
    return element(by.css('.navbar-text > i'));
  };

  this.waitForCellOutput = function() {
    var self = this;
    browser.wait(this.EC.presenceOf($('bk-code-cell-output')), 5000)
      .then(function(){
    browser.wait(self.EC.not(self.EC.textToBePresentInElement(element(by.css('bk-code-cell-output pre')), 'waiting for evaluator initialization ...')), 20000); })
      .then(function(){
    browser.wait(self.EC.not(self.EC.textToBePresentInElement($('bk-code-cell-output'), 'Elapsed:'), 10000));
    });
  };

  this.waitForCellOutputByIdCell = function(idCell) {
    var self = this;
    browser.wait(this.getCodeCellOutputByIdCell(idCell).isDisplayed(), 10000).then(function(){
      browser.wait(self.EC.not(self.EC.textToBePresentInElement(self.getCodeCellOutputByIdCell(idCell), 'Elapsed:'), 10000));
    });
  };

  this.waitUntilLoadingFinished = function() {
    var self = this;
    return browser.wait(function() {
      return self.getLoadingIndicator().isPresent()
        .then(function(present) {
        return !present;
      })
      .thenCatch(function() {
        return false;
      });
    }, 100000);
  };

  this.waitUntilLoadingCellOutput = function() {
    return browser.wait(this.EC.presenceOf($('bk-code-cell-output')), 10000);
  }

  this.hasClass =  function  (element, cls) {
    return element.getAttribute('class').then(function (classes) {
      return classes && classes.split(' ').indexOf(cls) !== -1;
    });
  };

  this.checkClass =  function (element, expectedClass){
    expect(this.hasClass(element, expectedClass)).toBe(true);
  };

  this.checkCount =  function (elements, expectedCount){
    expect(elements.count()).toBe(expectedCount);
  };

  this.checkSize = function (element, width, height) {
    expect(element.getSize().then(function (size) {
      return size.height
    })).toBe(height);
    expect(element.getSize().then(function (size) {
      return size.width
    })).toBe(width);
  };

  this.checkPlotLegentdLabelByIdCell = function (idCell, containerIdx, legentdLabelIndex, text) {
    expect(this.getPlotLegendContainerByIdCell(idCell, containerIdx)
        .all(By.tagName('label')).get(legentdLabelIndex).getText()).toBe(text);
  }

  this.checkLegendIsPresentByIdCell = function (codeCellOutputId, containerIdx) {
    if (!containerIdx)
      containerIdx = 0;
    expect(this.getPlotLegendContainerByIdCell(codeCellOutputId, containerIdx).element(By.css('#plotLegend')).isPresent()).toBe(true);
  };

  this.getCodeCellOutputCombplotTitleByIdCell = function (codeCellOutputId) {
    return this.getCodeCellOutputByIdCell(codeCellOutputId).element(by.id('combplotTitle')).getText();
  };

  this.getCodeCellOutputContainerYLabelByIdCell = function (codeCellOutputId, containerIdx) {
    if (!containerIdx)
      containerIdx = 0;

    return this.getPlotLegendContainerByIdCell(codeCellOutputId, containerIdx).element(by.id('ylabel')).getText();
  };

  this.getCodeCellOutputContainerTitleByIdCell = function (codeCellOutputId, containerIdx) {
    if (!containerIdx)
      containerIdx = 0;

    return this.getCodeCellOutputByIdCell(codeCellOutputId)
        .all(by.id("plotTitle"))
        .get(containerIdx).getText();
  };

  this.getCodeCellOutputContainerXLabelByIdCell = function (codeCellOutputId, containerIdx) {
    if (!containerIdx)
      containerIdx = 0;

    return this.getPlotLegendContainerByIdCell(codeCellOutputId, containerIdx).element(by.id('xlabel')).getText();
  };

  this.getCodeCellOutputContainerYRLabelByIdCell = function (codeCellOutputId, containerIdx) {
    if (!containerIdx)
      containerIdx = 0;

    return this.getPlotLegendContainerByIdCell(codeCellOutputId, containerIdx).element(by.id('yrlabel')).getText();
  };

  this.scrollToCodeCellOutputByIdCell = function (idCell) {
    return browser.executeScript("$('[cell-id=" + idCell +"]')[0].scrollIntoView();");
  };

  this.getCodeCellOutputByIdCell = function (idCell) {
    return element.all(by.css('[cell-id=' + idCell + ']')).get(0);
  };

  this.checkPlotIsPresentByIdCell = function (codeCellOutputId, containerIdx){
    if (!containerIdx)
      containerIdx = 0;
    this.scrollToCodeCellOutputByIdCell(codeCellOutputId);
    this.scrollHeaderElement();
    browser.wait(this.EC.presenceOf($('bk-code-cell-output[cell-id=' + codeCellOutputId + ']'), 20000));
    expect(this.getPlotMaingByIdCell(codeCellOutputId, containerIdx).isPresent()).toBe(true);
  };

  this.scrollHeaderElement = function(){
    var self = this;
    element(by.css('header')).getCssValue('height').then(function(height){
      browser.executeScript("window.scrollBy(0, -" + parseInt(height) + ");");
    });
  }

  this.getPlotMaingByIdCell = function (codeCellOutputId, containerIdx) {
    return this.getPlotSvgByIdCell(codeCellOutputId, containerIdx).element(By.id('maing'));
  };

  this.getPlotSvgByIdCell = function (codeCellOutputId, containerIdx) {
    return this.getPlotLegendContainerByIdCell(codeCellOutputId, containerIdx).element(By.id('svgg'));
  };

  this.getPlotLegendContainerByIdCell = function (codeCellOutputId, containerIdx) {
    if (!containerIdx)
      containerIdx = 0;
    return this.getCodeCellOutputByIdCell(codeCellOutputId).all(By.css('.plot-plotlegendcontainer')).get(containerIdx);
  };

  this.getPlotContainerByIdCell = function (codeCellOutputId, containerIdx) {
    if (!containerIdx)
      containerIdx = 0;
    return this.getPlotLegendContainerByIdCell(codeCellOutputId, containerIdx).element(by.css('.plot-plotcontainer'));
  };

  this.getPlotSvgElementByIndexByIdCell = function (codeCellOutputId, containerIdx, elementIndex) {
    return this.getPlotSvgByIdCell(codeCellOutputId, containerIdx).all(by.css("#maing > g")).get(elementIndex);
  };

  this.checkDtContainerByIdCell = function(idCell, containerIdx){
    if (!containerIdx)
      containerIdx = 0;
    this.scrollToCodeCellOutputByIdCell(idCell);
    browser.wait(this.EC.presenceOf($('[cell-id=' + idCell + ']'), 10000));
    expect(this.getDtContainerByIdCell(idCell, containerIdx).isPresent()).toBe(true);
  }

  this.getDtContainerByIdCell = function(idCell, containerIdx) {
    if (!containerIdx)
      containerIdx = 0;
    return this.getCodeCellOutputByIdCell(idCell).all(By.css('.dtcontainer')).get(containerIdx);
  }

  this.getDataTablesScrollHeadByIdCell = function(idCell, containerIdx){
    if (!containerIdx)
      containerIdx = 0;
    return this.getDtContainerByIdCell(idCell, containerIdx).element(By.css('.dataTables_scrollHead'));
  }

  this.getDataTablesScrollBodyByIdCell = function(idCell, containerIdx){
    if (!containerIdx)
      containerIdx = 0;
    return this.getDtContainerByIdCell(idCell, containerIdx).element(By.css('.dataTables_scrollBody'));
  }

  this.getDataTablesTBodyByIdCell = function (idCell) {
    return this.getDataTablesScrollBodyByIdCell(idCell).$$('tbody > tr');
  }

  this.getDataTablesColumnByIdCell = function (cellId, colIndex) {
    return this.getDataTablesTBodyByIdCell(cellId).all(by.css('td')).get(colIndex);
  };

  this.getDTFCLeftContainer = function (cellId) {
    return this.getDtContainerByIdCell(cellId, 0).all(by.css('.DTFC_LeftWrapper'));
  };

  this.getDTFCRightContainer = function (cellId) {
    return this.getDtContainerByIdCell(cellId, 0).all(by.css('.DTFC_RightWrapper'));
  };

  this.getDTFCLeftBody = function (cellId) {
    return this.getDTFCLeftContainer(cellId).all(by.css('tbody > tr'));
  };

  this.getDTFCRightBody = function (cellId) {
    return this.getDTFCRightContainer(cellId).all(by.css('tbody > tr'));
  };

  this.getDTFCLeftHeader = function (cellId) {
    return this.getDTFCLeftContainer(cellId).all(by.css('thead > tr'));
  };

  this.getDTFCLeftColumn = function (cellId, colInd) {
    return this.getDTFCLeftBody(cellId).all(by.css('td')).get(colInd);
  };

  this.getDTFCLeftColumnHeader = function (cellId, colInd) {
    return this.getDTFCLeftHeader(cellId).all(by.css('th')).get(colInd);
  };

  this.getDTRow = function (cellId, rowInd) {
    return this.getDataTablesTBodyByIdCell(cellId).get(rowInd);
  };

  this.scrollDataTableHorizontally = function (cellId, x) {
    browser.executeScript("$('bk-code-cell-output[cell-id=" + cellId + "').find('.dataTables_scrollBody').scrollLeft(" + x + ");");
  };

  this.getDataTableMenu = function (sectionTitle) {
    return this.getCodeCellOutputBySectionTitle(sectionTitle).element(by.css('.dtmenu>ul'));
  };

  this.getDataTableMenuToggle = function (sectionTitle) {
    return this.getCodeCellOutputBySectionTitle(sectionTitle).element(by.css('a[ng-click="menuToggle()"]'));
  };

  this.getDataTableSubmenu = function (sectionTitle, menuTitle) {
    return this.getCodeCellOutputBySectionTitle(sectionTitle)
      .element(by.cssContainingText('.dtmenu>ul>li', menuTitle))
      .all(by.css('li'));
  };

  this.getDataTableMenuFirstLevelItems = function (sectionTitle) {
    return this.getCodeCellOutputBySectionTitle(sectionTitle).all(by.css('.dtmenu>ul>li>a'));
  };

  this.getDataTableMenuItem = function(sectionTitle, menuTitle) {
    return this.getDataTableMenu(sectionTitle).element(by.cssContainingText('li', menuTitle));
  };

  this.getDataTableSubMenuItem = function(menu, submenu) {
    return menu.element(by.cssContainingText('li', submenu));
  };

  this.checkDataTableMenuItemHasIcon = function(menuItem, icon, has) {
    expect(menuItem.element(by.css('i.' + icon)).isDisplayed()).toBe(has);
  };

  this.getDataTablePaginationControl = function (cellId) {
    return this.getDtContainerByIdCell(cellId, 0).element(by.css('.bko-table-bottom'));
  };

  this.isDTRowInViewPort = function (scrollBody, rowInd, advancedMode) {
    var ROW_HEIGHT = 27;
    var ROW_HEIGHT_ADVANCED_MODE = 22;
    var rowHeight = advancedMode ? ROW_HEIGHT_ADVANCED_MODE : ROW_HEIGHT;
    var bodyBorder = 1;
    return scrollBody.getSize().then(function (size) {
      return size.height - bodyBorder === rowHeight * rowInd;
    });
  };

  this.getDataTablesTHeadByIdCell = function(idCell){
    return this.getDataTablesScrollHeadByIdCell(idCell).all(By.css('thead > tr'));
  }

  this.checkTablesColumnsByIdCell = function(idCell, countColumn){
    expect(this.getDataTablesTHeadByIdCell(idCell).get(0).all(by.css('th')).count()).toBe(countColumn);
  }

  this.checkTablesRowsByIdCell = function(idCell, countRows){
    expect(this.getDataTablesTBodyByIdCell(idCell).count()).toBe(countRows);
  }

  this.checkDataTableHeadByIdCell = function(idCell, headLabels){
    expect(this.getDataTablesScrollHeadByIdCell(idCell).getText()).toBe(headLabels);
  }

  this.checkDataTableBodyByIdCell = function(idCell, rowsCount, firstRow){
    var tBody = this.getDataTablesTBodyByIdCell(idCell);
    expect(tBody.count()).toBe(rowsCount);
    expect(tBody.get(0).getText()).toBe(firstRow);
  }

  this.getDataTableFilterRow = function (cellId) {
    return this.getDataTablesScrollHeadByIdCell(cellId).element(by.css('.filterRow'));
  };

  this.getDataTableSearchField = function (cellId) {
    return this.getDTFCLeftHeader(cellId).all(by.css('.filterRow th')).get(0);
  };

  this.getDataTableSearchInput = function (cellId) {
    return this.getDataTableSearchField(cellId).element(by.css('.filter-input'));
  };

  this.checkCellOutputTextByIdCell = function(idCell, outputText){
    expect(this.getCodeCellOutputByIdCell(idCell).element(By.css('pre')).getText()).toBe(outputText);
  }

  this.checkCellOutputSubTextByIdCell = function(idCell, outputText, inxStart, lenght){
    expect(this.getCodeCellOutputByIdCell(idCell).element(By.css('pre')).isPresent()).toBe(true);
    this.getCodeCellOutputByIdCell(idCell).element(By.css('pre')).getText()
        .then(function(value){
          expect(value.substring(inxStart, lenght)).toBe(outputText);
        });
  }

  this.checkImageByIdCell = function(idCell){
    expect(this.getCodeCellOutputByIdCell(idCell).element(By.css('img')).isPresent()).toBe(true);
    this.getCodeCellOutputByIdCell(idCell).element(By.css('img')).getAttribute('src')
        .then(function(attr){
          expect(attr.substring(0, 21)).toBe('data:image/png;base64');
        });
  }

  this.checkSubString = function(strPromise, toBeStr, indxStart, lenght){
    if(!indxStart){
      indxStart = 0;
    }
    if(!lenght){
      lenght = 100;
    }
    strPromise.getText().then(function(value){
      expect(value.substring(indxStart, lenght)).toBe(toBeStr);
    });
  }

  this.getSection = function (sectionTitle) {
    return element(by.cssContainingText('.bk-section-title p', sectionTitle))
      .element(by.xpath('ancestor::bk-section-cell'));
  };

  this.getCodeCellOutputBySectionTitle = function (sectionTitle) {
    var section = this.getSection(sectionTitle);
    browser.executeScript('return arguments[0].scrollIntoView();', section.getWebElement());
    return section.element(by.tagName('bk-code-cell-output'));
  };

  this.getCodeOutputCellIdBySectionTitle = function (sectionTitle) {
    return this.getCodeCellOutputBySectionTitle(sectionTitle).getAttribute('cell-id');
  };

  this.waitCodeCellOutputPresentByIdCell = function(idCell, outputType) {
    browser.wait(this.EC.presenceOf($('bk-code-cell-output[cell-id=' + idCell + '] bk-output-display[type="' + outputType + '"]')), 20000);
  }

  this.waitCodeCellOutputTablePresentByIdCell = function(idCell) {
    this.waitCodeCellOutputPresentByIdCell(idCell, 'Table');
  }

  this.checkAttribute = function(strPromise, attrName, toBeStr, indxStart, lenght){
    if(!indxStart){
      indxStart = 0;
    }
    if(!lenght){
      lenght = 100;
    }
    strPromise.getAttribute(attrName).then(function(value){
      expect(value.substring(indxStart, lenght)).toBe(toBeStr);
    });
  }

  this.checkHexCharCode = function(strPromise, charCode1, charCode2){
    strPromise.getText().then(function(value){
      expect(value.charCodeAt(0).toString(16)).toBe(charCode1);
      if(charCode2){
        expect(value.charCodeAt(1).toString(16)).toBe(charCode2);
      }
    });
  }

  this.checkHexCharCodeSubString = function(strPromise, indxStart, lenght, charCode1, charCode2){
    strPromise.getText().then(function(value){
      expect(value.substring(indxStart, lenght).charCodeAt(0).toString(16)).toBe(charCode1);
      if(charCode2){
        expect(value.substring(indxStart, lenght).charCodeAt(1).toString(16)).toBe(charCode2);
      }
    });
  }

  this.getPreviewBkCellByIdCell = function(idCell){
    return this.getBkCellByIdCell(idCell).element(by.css('div[ng-show="mode==\'preview\'"]'));
  }

  this.getEditBkCellByIdCell = function(idCell){
    return this.getBkCellByIdCell(idCell).element(by.css('div[ng-show="mode==\'edit\'"]'));
  }

  this.checkPreviewBkCellByIdCell = function(idCell){
    var elemPreview = this.getPreviewBkCellByIdCell(idCell);
    expect(elemPreview.isDisplayed()).toBe(true);
    expect(this.getEditBkCellByIdCell(idCell).isDisplayed()).toBe(false);
    return elemPreview;
  }

  this.checkEditBkCellByIdCell = function(idCell){
    this.clickElementWithHandlingError(this.getBkCellByIdCell(idCell).$('[ng-click="edit($event)"]'), 'editBkCell');
    browser.wait(this.EC.visibilityOf($('bk-cell[cellid=' + idCell + '] div[ng-show="mode==\'edit\'"'), 10000));
    expect(this.getPreviewBkCellByIdCell(idCell).isDisplayed()).toBe(false);
    expect(this.getEditBkCellByIdCell(idCell).isDisplayed()).toBe(true);
    return this.getEditBkCellByIdCell(idCell);
  }

  this.getFormulaSubElement = function(elemPromise, subIndex){
    if(!subIndex){
      subIndex = 0;
    }
    return elemPromise.all(by.css('span.mord.scriptstyle.cramped > span')).get(subIndex);
  }

  this.getBkCellByIdCell = function (idCell) {
    return element.all(by.css('[cellid=' + idCell + '] > div')).get(0);
  };

  this.scrollToBkCellByIdCell = function (idCell) {
    return browser.executeScript("$('[cellid=" + idCell +"]')[0].scrollIntoView();");
  };

  this.clickCodeCellInputButtonByIdCell = function(idCell, outputType, screenshotName, timeOut){
    var self = this;
    if(!timeOut){
      timeOut = 60000;
    }
    this.runBkCellDefaultButtonByIdCell(idCell);
    browser.wait(this.EC.presenceOf($('bk-code-cell-output[cell-id=' + idCell + ']')), 5000)
        .then(browser.wait(this.EC.presenceOf($('bk-code-cell-output[cell-id=' + idCell + '] bk-output-display[type="' + outputType + '"]')), timeOut)
            .then(
                function(isPresent){
                  expect(isPresent).toBe(true);
                },
                function(value){
                  self.createScreenshot(screenshotName);
                  expect(value).toBe('Output cell have displayed');
                  expect(self.getCodeCellOutputByIdCell(idCell).element(by.css('.out_error')).getText()).toBe('out error');
                }
            ));
  }

  this.checkBkCellByIdCell  = function (idCell) {
    browser.wait(this.EC.presenceOf($('bk-cell[cellid=' + idCell + '] > div'), 10000));
    this.scrollToBkCellByIdCell(idCell);
    expect(this.getBkCellByIdCell(idCell).isPresent()).toBe(true);
  };

  this.checkSubStringIfDisplayed = function(strPromise, toBeStr, indxStart, lenght){
    var self = this;
    strPromise.isDisplayed().then(function(isVisible){
      if(isVisible){
        self.checkSubString(strPromise, toBeStr, indxStart, lenght);
      }
    });
  }

  this.createScreenshot = function(fileName, dirPath){
    if(!dirPath){
      dirPath = path.join(__dirname, '../' ,"screenshots");
    }
    if(!fileName){
      fileName = 'noname';
    }
    browser.takeScreenshot().then(function(png){
      var filename = fileName + new Date().getTime() + '.png';
      if(!fs.existsSync(dirPath)){
        fs.mkdirSync(dirPath);
      }
      var stream = fs.createWriteStream(path.join(dirPath, filename));
      stream.write(new Buffer(png, 'base64'));
      stream.end();
    });
  }

  this.runCellWithoutDisplayResultByIdCell = function(idCell, timeOut){
    if(!timeOut){
      timeOut = 60000;
    }
    this.scrollToBkCellByIdCell(idCell);
    this.runBkCellDefaultButtonByIdCell(idCell);
    browser.wait(this.EC.not(this.EC.presenceOf($('bk-code-cell-output[cell-id=' + idCell + ']'))), timeOut);
  }

  this.getUserHome = function() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
  }

  this.checkSaveAsSvgPngByIdCell = function(idCell, filename){
    var dir = this.clearTmpDir();

    this.clickCellMenuSavePlotAs(idCell, 'SVG');
    var filenameSvg = path.join(dir, (filename + ".svg"));
    browser.wait(fs.existsSync.bind(this, filenameSvg), 10000).then(function(){
      expect(fs.statSync(filenameSvg).isFile() && fs.existsSync(filenameSvg)).toBe(true);
      browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
    });

    this.scrollHeaderElement();
    this.clickCellMenuSavePlotAs(idCell, 'PNG');
    var filenamePng = path.join(dir, (filename + ".png"));
    browser.wait(fs.existsSync.bind(this, filenamePng), 10000).then(function(){
      expect(fs.statSync(filenamePng).isFile() && fs.existsSync(filenamePng)).toBe(true);
      browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
    });
  }

  this.clickCellMenuSavePlotAs = function(idCell, fileExt){
    this.clickElementWithHandlingError(this.getCodeCellOutputByIdCell(idCell).$('.cell-menu-item.cell-dropdown.dropdown-toggle'), 'cellMenuDropdown');
    browser.wait(this.EC.presenceOf(element.all(by.css('bk-notebook > ul.dropdown-menu')).get(0)), 10000);
    var savePlotAs = element.all(by.css('bk-notebook > ul.dropdown-menu')).get(0).element(by.cssContainingText('li', 'Save Plot As'));
    browser.actions().mouseMove(savePlotAs).perform();
    var subMenu = savePlotAs.element(by.cssContainingText('a', fileExt));
    browser.actions().mouseMove(subMenu).perform();
    subMenu.click();
  }

  this.checkSaveAsCsvByIdCell = function(idCell, filename){
    var self = this;
    var dir = this.clearTmpDir();
    // Save All as csv
    this.getCodeCellOutputByIdCell(idCell).element(by.css('a[ng-click="menuToggle()"]')).click()
        .then(self.getCodeCellOutputByIdCell(idCell).element(by.css('a[ng-click="doCSVExport(false)"]')).click);
    this.checkSaveTableAsCsv(self, dir, filename + "All.csv");
    // Save Selected as csv
    this.clickElementWithHandlingError(this.getDataTablesTBodyByIdCell(idCell).first(), 'trElement');
    this.clickElementWithHandlingError(this.getCodeCellOutputByIdCell(idCell).element(by.css('a[ng-click="menuToggle()"]')), 'menuToggle');
    browser.sleep(1000);
    this.clickElementWithHandlingError(this.getCodeCellOutputByIdCell(idCell).element(by.css('a[ng-click="doCSVExport(true)"]')), 'saveSelectedMenu');
    this.checkSaveTableAsCsv(self, dir, filename + "Selected.csv");
  }

  this.checkSaveTableAsCsv = function(self, dir, filename){
    browser.wait(this.EC.presenceOf(element(by.css('input#file-dlg-selected-path'))), 10000).then(function(){
      browser.wait(self.EC.not(self.EC.presenceOf(element(by.css('div.elfinder-notify-open')))), 20000).then(function(){
        self.createScreenshot(filename);
        var arrPath = dir.split(path.sep);
        arrPath.forEach(function(item, i, arrPath) {
          element(by.cssContainingText('span', item)).isPresent().then(function(present){
            self.hasClass(element(by.cssContainingText('span', item)), 'elfinder-navbar-expanded').then(function(expand){
              if(present && !expand){
                element(by.cssContainingText('span', item)).click().then(null,
                  function(error){
                    console.log('error click span ' + item);
                    browser.sleep(1000);
                    element(by.cssContainingText('span', item)).click();
                  }
                );
              }
            })
          })
        });
        element(by.id('file-dlg-selected-path')).sendKeys(filename);
        element(by.cssContainingText('button', 'Save')).click();
        var filenameCsv = path.join(dir, (filename));
        browser.wait(fs.existsSync.bind(this, filenameCsv), 20000).then(function(){
          expect(fs.statSync(filenameCsv).isFile()).toBe(true);
        });
      });
    });
  }

  this.clearTmpDir = function(){
    var dir = path.join(__dirname, '../' ,"tmp");
    if(!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
    var list = fs.readdirSync(dir);
    list.forEach(function(file) {
      file = path.join(dir, file);
      var stat = fs.statSync(file)
      if (stat && stat.isFile()){
        fs.unlinkSync(file);
      }
    });
    return dir;
  }

  this.runBkCellDefaultButtonByIdCell = function(idCell){
    this.clickElementWithHandlingError(this.getBkCellByIdCell(idCell).$('[ng-click="evaluate($event)"].btn-default'), 'CellDefaultButton');
  }

  this.clickElementWithHandlingError = function(elem, name){
    var self = this;
    elem.click().then(null,
        function(error){
          self.scrollHeaderElement();
          elem.click().then(null,
              function(error){
                self.logLocationElement(elem, 'error click ' + name);
                self.createScreenshot('error' + name);
                browser.executeScript('return arguments[0].click()', elem.getWebElement());
              });
        }
    );
  }

  this.doubleClickElementWithHandlingError = function(elem, name){
    var self = this;
    browser.actions().doubleClick(elem).perform().then(null,
        function(error){
          self.logLocationElement(elem, 'error doubleClick ' + name);
          self.createScreenshot('errorDoubleClick' + name);
          self.scrollHeaderElement();
          browser.actions().doubleClick(elem).perform();
        }
    );
  }

  this.collapseCellMenuByIdCell = function(idCell){
    this.clickElementWithHandlingError(this.getBkCellByIdCell(idCell).$('div[ng-click="collapseCellMenu[cellmodel.type].click()"]'), 'collapseCellMenu');
  }

  this.checkEvaluatorByIdCell = function(idCell, langName){
    expect(this.getBkCellByIdCell(idCell).element(by.css('.evaluator')).getAttribute('evaluator-type')).toBe(langName);
  }

  this.getLiOutputcontainerByIdCell = function(idCell) {
    return this.getCodeCellOutputByIdCell(idCell).all(by.css('li.outputcontainer-li'));
  }

  this.checkAutocomplete = function(nameHint) {
    browser.actions().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, protractor.Key.SPACE)).perform();
    browser.wait(this.EC.presenceOf(element(by.cssContainingText('li.CodeMirror-hint', nameHint))), 10000);
  };

  this.insertNewDefaultCell = function(language){
    this.clickElementWithHandlingError($$('button[ng-click="newDefaultCodeCell()"]').first(), 'newDefaultCode');
    this.insertCellOfType(language);
    var bkcell = element.all(by.css('bk-cell')).get(0);
    bkcell.element(by.css('div.CodeMirror-code')).click();
    return bkcell;
  }

  this.selectItem = function(itemName){
    var item = element(by.cssContainingText('li.CodeMirror-hint', itemName));
    this.clickElementWithHandlingError(item, 'codeMirrorHint');
    this.doubleClickElementWithHandlingError(item, 'codeMirrorHint');
  }

  this.checkDownloadCSV = function(idCell){
    var self = this;
    var dir = this.clearTmpDir();
    this.getCodeCellOutputByIdCell(idCell).element(by.css('a[ng-click="menuToggle()"]')).click()
        .then(self.getCodeCellOutputByIdCell(idCell).element(by.css('a[ng-click="doCSVDownload(false)"]')).click);
    var filename = path.join(dir, "tableRows.csv");
    browser.driver.wait(fs.existsSync.bind(this, filename), 20000).then(
        function() {
          expect(fs.readFileSync(filename, { encoding: 'utf8' }).replace(/[\n\r]/g,'')).toEqual('"col1","col2","col3""This & that","This / that","This > that"');
        }
    );
  }

};
module.exports = BeakerPageObject;
