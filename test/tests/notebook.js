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
describe('notebook', function() {
  var originalTimeout = 0;

  beakerPO = new BeakerPageObject();

  beforeEach(function() {
    browser.get(beakerPO.baseURL);
    browser.waitForAngular();
  });

  it('can load', function() {
    beakerPO.newEmptyNotebook.click();
    expect(browser.getTitle()).toEqual('New Notebook');
    beakerPO.closeNotebook();
  });

  it('can add a cell', function() {
    beakerPO.newEmptyNotebook.click();
    beakerPO.insertCellButton.click();
    expect(beakerPO.evaluateButton.isDisplayed()).toBe(true);
    beakerPO.closeNotebook();
  });

  describe('evaluating JS', function() {
    beforeEach(function() {
      beakerPO.newEmptyNotebook.click();
      beakerPO.insertCellButton.click();
      beakerPO.cellEvaluatorMenu.click();
      beakerPO.cellEvaluatorMenuItem('JavaScript').click();
    });

    it('displays syntax errors correctly', function(done) {
      beakerPO.setCellInput(',');
      beakerPO.evaluateButton.click();
      beakerPO.waitForCellOutput();
      beakerPO.getCellOutput().getText().then(function(txt) {
        expect(txt).toEqual('Unexpected token (1:0)', txt);
        done();
      });
    });

    afterEach(function() {
      beakerPO.closeNotebook();
    });
  });

  describe('evaluating languages', function() {
    function evalInLanguage(language, code, expected, done) {
      beakerPO.activateLanguageInManager(language);
      beakerPO.waitForPlugin(language);
      beakerPO.languageManagerCloseButton.click();

      beakerPO.cellEvaluatorMenu.click();
      beakerPO.cellEvaluatorMenuItem(language).click();
      beakerPO.setCellInput(code);
      beakerPO.evaluateButton.click();
      beakerPO.waitForCellOutput();
      return beakerPO.getCellOutput().getText()
      .then(function(output) {
        expect(output).toEqual(expected);
        done();
      });
    }

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
      evalInLanguage('Html', '1+1', '1+1', done);
    });

    it('JavaScript', function(done) {
      evalInLanguage('JavaScript', '1+1', '2', done);
    });

    it('Groovy', function(done) {
      evalInLanguage('Groovy', '1+1', '2', done);
    });
  });

  describe('interacting with a code cell', function() {
    beforeEach(function() {
      beakerPO.newEmptyNotebook.click();
      beakerPO.insertCellButton.click();
      // load Groovy
      beakerPO.notebookMenu.click();
      beakerPO.languageManagerMenuItem.click();
      beakerPO.languageManagerButton('Groovy').click();
      beakerPO.waitForPlugin('Groovy');
      beakerPO.languageManagerCloseButton.click();

      beakerPO.cellEvaluatorMenu.click();
      beakerPO.cellEvaluatorMenuItem('Groovy').click();
    });

    afterEach(function() {
      beakerPO.closeNotebook();
    });

    it('can set a cell language to Groovy', function(done) {
      expect(beakerPO.cellEvaluatorDisplay.getText()).toEqual('Groovy');
      done();
    });

    it('can enter code into a cell and evaluate it', function(done) {
      beakerPO.setCellInput('1+1');
      beakerPO.evaluateButton.click();
      beakerPO.waitForCellOutput();
      expect(beakerPO.getCellOutput().getText()).toMatch('2');
      done();
    });

    it('can hide the input', function(done) {
      var cell = beakerPO.codeCell(0);

      cell.toggleInput().click();

      expect(cell.inputWrapper().isDisplayed()).toBe(true);
      expect(cell.input().isDisplayed()).toBe(false);
      expect(cell.miniCellStatus().isDisplayed()).toBe(true);
      done();
    });
  });

  it('can close the notebook', function(done) {
    beakerPO.newEmptyNotebook.click();

    beakerPO.closeNotebook()
    .then(done);
  });

  it('can handle escaping $ in markdown', function(done) {
    beakerPO.newEmptyNotebook.click()
    .then(function() {
      return beakerPO.createMarkdownCell('hello world \\$');
    })
    .then(function() {
      return beakerPO.readMarkdownCell();
    }.bind(this))
    .then(function(txt) {
      expect(txt).toEqual('hello world $');
    })
    .then(beakerPO.closeNotebook)
    .then(done);
  });

  it('can open a cells language menu in advanced mode', function(done) {
    beakerPO.newEmptyNotebook.click()
    .then(beakerPO.insertCellButton.click)
    .then(beakerPO.toggleAdvancedMode)
    .then(beakerPO.toggleLanguageCellMenu.bind(this, {cellIndex: 1}))
    .then(beakerPO.isLanguageCellMenuOpen)
    .then(function(isOpen) {
      expect(isOpen).toEqual(true);
    })
    .then(beakerPO.toggleAdvancedMode)
    .then(beakerPO.closeNotebook)
    .then(done);
  });

  it('can close a cell language menu by clicking off', function(done) {
    beakerPO.newEmptyNotebook.click()
    .then(beakerPO.insertCellButton.click)
    .then(beakerPO.toggleAdvancedMode)
    .then(beakerPO.toggleLanguageCellMenu.bind(this, {cellIndex: 1}))
    .then(element(by.css('body')).click)
    .then(beakerPO.isLanguageCellMenuOpen)
    .then(function(isOpen) {
      expect(isOpen).toEqual(false);
    })
    .then(beakerPO.toggleAdvancedMode)
    .then(beakerPO.closeNotebook)
    .then(done);
  });

  it('can close a cell menu by clicking off', function(done) {
    beakerPO.newEmptyNotebook.click()
    .then(beakerPO.insertCellButton.click)
    .then(beakerPO.toggleCellMenu.bind(this, {cellIndex: 0}))
    .then(element(by.css('body')).click)
    .then(beakerPO.isCellMenuOpen.bind(this, {cellIndex: 0}))
    .then(function(isOpen) {
      expect(isOpen).toEqual(false);
    })
    .then(beakerPO.closeNotebook)
    .then(done);
  });

  it('can open the menu', function(done) {
    beakerPO.newEmptyNotebook.click()
    .then(beakerPO.insertCellButton.click)
    .then(beakerPO.toggleCellMenu.bind(this, {cellIndex: 0}))
    .then(beakerPO.isCellMenuOpen.bind(this, {cellIndex: 0}))
    .then(function(isOpen) {
      expect(isOpen).toEqual(true);
    })
    .then(beakerPO.closeNotebook)
    .then(done);
  });

  it('can close the menu', function(done) {
    beakerPO.newEmptyNotebook.click()
    .then(beakerPO.insertCellButton.click)
    .then(beakerPO.toggleCellMenu.bind(this, {cellIndex: 0}))
    .then(beakerPO.toggleCellMenu.bind(this, {cellIndex: 0}))
    .then(beakerPO.isCellMenuOpen.bind(this, {cellIndex: 0}))
    .then(function(isOpen) {
      expect(isOpen).toEqual(false);
    })
    .then(beakerPO.closeNotebook)
    .then(done);
  });
});
