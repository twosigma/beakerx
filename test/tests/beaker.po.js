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

var BeakerPageObject = function () {
  this.baseURL = 'http://localhost:8801/';
  this.mainmenu = element.all(by.repeater('m in getMenus()'));
  this.submenu = element.all(by.repeater('item in getMenuItems() | isHidden'))
    .filter(function(e,i) { return e.isDisplayed(); });
  this.sync = function () {
    browser.actions().mouseDown().mouseUp().perform();
  };

  this.newEmptyNotebook = element(by.id('new-empty-notebook'));
  
  this.fileMenu = element(by.id('file-menu'));
  this.viewMenu = element(by.id('view-menu'));
  this.notebookMenu = element(by.id('notebook-menu'));
  this.helpMenu = element(by.id('help-menu'));

  this.languageManagerMenuItem = element(by.id('language-manager-menuitem'));
  this.closeMenuItem = element(by.id('close-menuitem'));

  this.codeCell = function(index) {
    return _.extend(element.all(by.css('.bkcell.code')).get(index),
                    require('./mixins/cell.js'));
  };
  this.waitForPlugin = function(plugin) {
    browser.wait(function () {
      var deferred = protractor.promise.defer();
      this.languageManagerButtonActive(plugin).isPresent()
        .then(function (result) {
          deferred.fulfill(result);
        });
      return deferred.promise;
    }.bind(this));
  };

  this.languageManager = element(by.className('plugin-manager'));
  this.languageManagerButtonKnown = function(language) {
    return element(by.css('#' + language + '-button .plugin-known'));
  };
  this.languageManagerButtonActive = function(language) {
    return element(by.css('#' + language + '-button .plugin-active'));
  };
  this.languageManagerButton = function(language) {
    return element(by.id(language + '-button'));
  };
  this.languageManagerCloseButton = element(by.id('language-manager-close-button'));
  this.insertCellButton = element(by.id('insert-cell'));
  this.runCellButton = element(by.id('run-cell-button'));

  this.modalDialogYesButton = element(by.id('modal-dialog-yes'));
  this.modalDialogNoButton = element(by.id('modal-dialog-no'));
  this.modalDialogCancelButton = element(by.id('modal-dialog-cancel'));

  this.cellEvaluatorMenu = element(by.css('.code-cell-area .cell-evaluator-menu'));
  this.cellEvaluatorMenuItem = function (language) {
    return element(by.css('.code-cell-area #' + language + '-menuitem'));
  };
  this.cellEvaluatorDisplay = element(by.css('.code-cell-area .cell-evaluator-menu b'));
  this.setCellInput = function (code) {
    browser.executeScript('$(".CodeMirror")[0].CodeMirror.setValue("' + code + '")');
  };
  this.waitForCellOutput = function(plugin) {
    browser.wait(function () {
      var deferred = protractor.promise.defer();
      this.getCellOutput().isPresent()
        .then(function (result) {
          deferred.fulfill(result);
        });
      return deferred.promise;
    }.bind(this));
  };
  this.getCellOutput = function() {
    return element(by.css('bk-output-display div pre'));
  };
};
module.exports = BeakerPageObject;
