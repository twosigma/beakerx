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
describe('notebook', function () {
  var originalTimeout = 0;
  
  beakerPO = new BeakerPageObject();

  beforeAll(function() {
    browser.get(beakerPO.baseURL);
    browser.waitForAngular();
  });
  
  it('can load', function() {
    beakerPO.newEmptyNotebook.click();
    expect(browser.getTitle()).toEqual('New Notebook');
  });

  it('can add a cell', function () {
    beakerPO.insertCellButton.click();
    expect(beakerPO.runCellButton.isDisplayed()).toBe(true);
  });

  it('can set a cell language to Groovy', function (done) {
    /* load iPython */
    beakerPO.notebookMenu.click();
    beakerPO.languageManagerMenuItem.click();
    beakerPO.languageManagerButton('Groovy').click();
    beakerPO.waitForPlugin('Groovy');
    beakerPO.languageManagerCloseButton.click();

    beakerPO.cellEvaluatorMenu.click();
    beakerPO.cellEvaluatorMenuItem('Groovy').click();
    expect(beakerPO.cellEvaluatorDisplay.getText()).toEqual("Groovy");
    done();
  });

  it('can enter code into a cell and evaluate it', function (done) {
    beakerPO.setCellInput("1+1");
    beakerPO.runCellButton.click();
    beakerPO.waitForCellOutput();
    expect(beakerPO.getCellOutput().getText()).toMatch("2");
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

  it('can close the notebook', function(done) {
    beakerPO.fileMenu.click();
    beakerPO.closeMenuItem.click();
    beakerPO.modalDialogNoButton.click();
    done();
  });

});
