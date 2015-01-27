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
describe('language manager test', function () {

  beakerPO = new BeakerPageObject();

  it('should load', function() {
    browser.get(beakerPO.baseURL);
    browser.waitForAngular();
  });

  it('open a new notebook', function() {
    beakerPO.newEmptyNotebook.click();
    expect(browser.getTitle()).toEqual('New Notebook');
  });

  it('open language manager', function () {
    beakerPO.notebookMenu.click();
    beakerPO.languageManagerMenuItem.click();
    expect(beakerPO.languageManager.isDisplayed()).toBe(true);
  });

  it('load ipython', function () {
    expect(beakerPO.languageManagerButtonKnown('IPython').isPresent()).toBe(true);
    expect(beakerPO.languageManagerButtonActive('IPython').isPresent()).toBe(false);
    beakerPO.languageManagerButton('IPython').click();
    // Abstract this into beakerPO XXX
    browser.wait(function () {
      var deferred = protractor.promise.defer();
      beakerPO.languageManagerButtonActive('IPython').isPresent()
        .then(function (result) {
          deferred.fulfill(result);
        });
      return deferred.promise;
    });
  });

  it('close language manager', function () {
    beakerPO.languageManagerCloseButton.click();
    expect(element.all(by.className('plugin-manager')).count()).toEqual(0);
  });

  it('add cell', function () {
    beakerPO.insertCellButton.click();
    expect(beakerPO.runCellButton.isDisplayed()).toBe(true);
  });

  it('set cell language to python', function () {
    beakerPO.cellEvaluatorMenu.click();
    beakerPO.cellEvaluatorMenuItem('IPython').click();
    expect(beakerPO.cellEvaluatorDisplay.getText()).toEqual("IPython");
  });

  it('enter code and evaluate', function () {
    beakerPO.setCellInput("type(sys.version)");
    beakerPO.runCellButton.click();
    expect(beakerPO.cellOutput.getText()).toMatch("str");
  });

});
