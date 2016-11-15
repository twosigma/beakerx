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

describe('Notebook', function() {

  function evalInLanguage(language, code, expected, done) {
    beakerPO.activateLanguage(language);
    beakerPO.insertCellByLanguage(language);
    beakerPO.setCellInput(code);
    beakerPO.evaluateCell();
    beakerPO.waitForCellOutput();
    return beakerPO.getCellOutput().getText()
    .then(function(output) {
      expect(output).toEqual(expected);
      done();
    });
  }

  beforeEach(function(done) {
    beakerPO = new BeakerPageObject();
    browser.get(beakerPO.baseURL).then(done);
  });

  describe('graphs', function() {
    beforeEach(function() {
      beakerPO.newEmptyNotebook.click();
      beakerPO.insertCellButton.click();
      beakerPO.notebookMenu.click();
      beakerPO.languageManagerMenuItem.click();
      beakerPO.activateLanguage('Groovy');
      beakerPO.insertCellByLanguage('Groovy');
      beakerPO.setCellInput('new Plot()')
      beakerPO.evaluateCell();
    });

    afterEach(function(done) {
      beakerPO.closeNotebook()
      .then(done);
    });

    it('can output graphs', function(done) {
      beakerPO.waitUntilGraphOutputPresent()
      .then(function(present) {
        expect(present).toEqual(true);
      });
      done();
    });

    it('can output graphs when minimized', function(done) {
      beakerPO.toggleOutputCellExpansion()
      beakerPO.evaluateCell();
      beakerPO.toggleOutputCellExpansion()
      beakerPO.waitUntilGraphOutputPresent()
      .then(function(present) {
        expect(present).toEqual(true);
      });
      done();
    });
  });

  it('can load', function() {
    beakerPO.newEmptyNotebook.click();
    expect(browser.getTitle()).toEqual('New Notebook');
    beakerPO.closeNotebook();
  });

  it('can add a cell', function() {
    beakerPO.newEmptyNotebook.click();
    beakerPO.insertCellButton.click();
    expect(beakerPO.getEvaluateButton().isDisplayed()).toBe(true);
    beakerPO.closeNotebook();
  });

  describe('evaluating JS', function() {
    beforeEach(function() {
      beakerPO.newEmptyNotebook.click();
      beakerPO.insertCellButton.click();
      browser.wait(beakerPO.EC.presenceOf(beakerPO.getCellEvaluatorMenu()), 10000);
      beakerPO.getCellEvaluatorMenu().click();
      beakerPO.cellEvaluatorMenuItem('JavaScript').click();
    });

    it('displays syntax errors correctly', function(done) {
      beakerPO.setCellInput(',');
      beakerPO.evaluateCell();
      beakerPO.waitForCellOutput();
      beakerPO.getCellOutput().getText().then(function(txt) {
        expect(txt).toContain('Unexpected token (1:0)', txt);
        done();
      });
    });

    afterEach(function() {
      beakerPO.closeNotebook();
    });
  });

  describe('evaluating languages', function() {
    beforeEach(function() {
      beakerPO.newEmptyNotebook.click();
      beakerPO.insertCellButton.click();
      beakerPO.notebookMenu.click();
      beakerPO.languageManagerMenuItem.click();
    });

    afterEach(function() {
      beakerPO.closeNotebook();
    });

    it('HTML', function(done) {
      evalInLanguage('HTML', '1+1', '1+1', done);
    });

    /*
    it('R', function(done) {
      evalInLanguage('R', '1+1', '[1] 2', done);
    });
    */

    it('JavaScript', function(done) {
      evalInLanguage('JavaScript', '1+1', '2', done);
    });

    it('Groovy', function(done) {
      evalInLanguage('Groovy', '1+1', '2', done);
    });
  });
});
