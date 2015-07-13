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

var _ = require('underscore');

var BeakerPageObject = function() {
  this.baseURL = 'http://localhost:8801/';
  this.mainmenu = element.all(by.repeater('m in getMenus()'));
  //jscs:disable
  this.submenu = element.all(by.repeater("item in getMenuItems() | filter:isHidden | orderBy:'sortorder'"))
  //jscs:enable
    .filter(function(e, i) { return e.isDisplayed(); });

  this.openMenuAtIndex = function(index) {
    return this.mainmenu.get(index).element(by.css('.dropdown-toggle')).click();
  };

  this.toggleLanguageCellMenu = function(opts) {
    return element.all(by.css('.dropdown-toggle bk-language-logo'))
    .get(opts.cellIndex)
    .then(function(elm) {
      return elm.click();
    });
  };

  this.isLanguageCellMenuOpen = function() {
    return browser.executeScript('return $(".inputcellmenu:visible").length > 0');
  };

  this.toggleCellMenu = function(opts) {
    return element.all(by.css('.bkcell .dropdown-promoted'))
    .get(opts.cellIndex)
    .then(function(elm) {
      return elm.click();
    });
  };

  this.toggleAdvancedMode = function() {
    return element(by.css('.view-menu'))
    .click()
    .then(element(by.partialLinkText('Advanced Mode')).click);
  };

  this.isCellMenuOpen = function(opts) {
    return element.all(by.css('.bkcell .open.toggle-menu.bkr'))
    .get(opts.cellIndex)
    .then(function(elm) {
      return elm.isDisplayed()
      .then(function() {
        return true;
      });
    })
    .thenCatch(function() {
      return false;
    });
  };

  this.createMarkdownCell = function(text) {
    element(by.css('bk-new-cell-menu .dropdown-toggle'))
    .click()
    .then(function() {
      return element(by.css('a[ng-click="newMarkdownCell()"]'));
    })
    .then(function(el) {
      return el.click();
    })
    .then(function() {
      return this.setCellInput(text);
    }.bind(this));
  }.bind(this);

  this.newEmptyNotebook = element(by.className('new-empty-notebook'));

  this.fileMenu = element(by.className('file-menu'));
  this.viewMenu = element(by.className('view-menu'));
  this.notebookMenu = element(by.className('notebook-menu'));
  this.helpMenu = element(by.className('help-menu'));

  this.languageManagerMenuItem = element(by.className('language-manager-menuitem'));
  this.closeMenuItem = element(by.className('close-menuitem'));

  this.closeNotebook = function() {
    return this.fileMenu.click()
    .then(this.closeMenuItem.click)
    .then(this.modalDialogNoButton.click)
    .thenCatch(function(e) {
      //if there has been no change do not fail here;
    });
  }.bind(this);

  this.codeCell = function(index) {
    return _.extend(element.all(by.css('.bkcell.code')).get(index),
                    require('./mixins/cell.js'));
  };
  this.waitForPlugin = function(plugin) {
    browser.wait(function() {
      var deferred = protractor.promise.defer();
      this.languageManagerButtonActive(plugin).isPresent()
        .then(function(result) {
          deferred.fulfill(result);
        });
      return deferred.promise;
    }.bind(this));
  };

  this.readMarkdownCell = function() {
    return element(by.css('body'))
    .then(function(el) {
      // click on the body to refocus editor
      return el.click();
    })
    .then(function() {
      return element(by.css('.markup p'));
    })
    .then(function(el) {
      return el.getText();
    });
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

  this.languageManagerCloseButton = element(by.className('language-manager-close-button'));
  this.insertCellButton = element(by.className('insert-cell'));
  this.evaluateButton = element(by.className('evaluate-script'));

  this.modalDialogYesButton = element(by.css('.modal .yes'));
  this.modalDialogNoButton = element(by.css('.modal .no'));
  this.modalDialogCancelButton = element(by.css('.modal .cancel'));

  this.cellEvaluatorMenu = element(by.css('.code-cell-area .cell-evaluator-menu'));
  this.cellEvaluatorMenuItem = function(language) {
    return element(by.css('.code-cell-area .' + language + '-menuitem'));
  };
  this.cellEvaluatorDisplay = element(by.css('.code-cell-area .cell-evaluator-menu b'));
  this.setCellInput = function(code) {
    browser.executeScript('$(".CodeMirror")[0].CodeMirror.setValue("' + code + '")');
  };
  this.waitForCellOutput = function(plugin) {
    return browser.wait(function() {
      return this.getCellOutput().isPresent();
    }.bind(this));
  };
  this.getCellOutput = function() {
    return element(by.css('bk-output-display > div'));
  };
};
module.exports = BeakerPageObject;
