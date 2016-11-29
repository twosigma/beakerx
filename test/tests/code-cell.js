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
var beakerPO;

function loadGroovy() {
  beakerPO.notebookMenu.click();
  beakerPO.languageManagerMenuItem.click();
  beakerPO.languageManagerButton('Groovy').click();
  beakerPO.waitForPlugin('Groovy');
  beakerPO.languageManagerCloseButton.click();
}

describe('Code Cell', function() {
  beforeEach(function(done) {
    beakerPO = new BeakerPageObject();
    browser.get(beakerPO.baseURL).then(done);
    beakerPO.newEmptyNotebookClick();
  });

  afterEach(function() {
    beakerPO.closeNotebook();
  });

  it('can set a cell language to Groovy', function(done) {
    beakerPO.insertCellButton.click();
    loadGroovy();
    browser.wait(beakerPO.EC.presenceOf(beakerPO.getCellEvaluatorMenu()), 10000);
    beakerPO.getCellEvaluatorMenu().click();
    beakerPO.cellEvaluatorMenuItem('Groovy').click();
    expect(beakerPO.cellEvaluatorDisplay.getText()).toEqual('Groovy');
    done();
  });

  it('can hide the input', function(done) {
    beakerPO.insertCellButton.click();
    loadGroovy();
    browser.wait(beakerPO.EC.presenceOf(beakerPO.getCellEvaluatorMenu()), 10000);
    beakerPO.getCellEvaluatorMenu().click();
    beakerPO.cellEvaluatorMenuItem('Groovy').click();

    var cell = $$('.bkcell.code').get(0);
    beakerPO.clickElementWithHandlingError(cell.$$('.toggle-menu .expand-contract').get(0), 'bkCellToggleMenu');
    expect(cell.$('.code-cell-input').isDisplayed()).toBe(true);
    expect(cell.$('.code-cell-input-content').isDisplayed()).toBe(false);
    expect(cell.$('.mini-cell-stats').isDisplayed()).toBe(true);
    done();
  });

  it('can open a cells language menu in advanced mode', function(done) {
    beakerPO.insertCellButton.click()
    .then(beakerPO.toggleAdvancedMode)
    .then(function(){ browser.wait(beakerPO.EC.presenceOf(element.all(by.css('.dropdown-toggle bk-language-logo')).get(0)), 10000); })
    .then(beakerPO.toggleLanguageCellMenu.bind(this, {cellIndex: 0}))
    .then(beakerPO.isLanguageCellMenuOpen)
    .then(function(isOpen) {
      expect(isOpen).toEqual(true);
    })
    .then(beakerPO.toggleAdvancedMode)
    .then(done);
  });

  it('can close a cell language menu by clicking off', function(done) {
    beakerPO.insertCellButton.click()
    .then(beakerPO.toggleAdvancedMode)
    .then(function(){ browser.wait(beakerPO.EC.presenceOf(element.all(by.css('.dropdown-toggle bk-language-logo')).get(0)), 10000); })
    .then(beakerPO.toggleLanguageCellMenu.bind(this, {cellIndex: 0}))
    .then(element(by.css('body')).click)
    .then(beakerPO.isLanguageCellMenuOpen)
    .then(function(isOpen) {
      expect(isOpen).toEqual(false);
    })
    .then(beakerPO.toggleAdvancedMode)
    .then(done);
  });
});