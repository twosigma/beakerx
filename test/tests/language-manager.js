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
describe('language manager', function () {

  beforeEach(function(done) {
    beakerPO = new BeakerPageObject();
    browser.get(beakerPO.baseURL).then(done);
    beakerPO.newEmptyNotebook.click();
    beakerPO.notebookMenu.click();
    beakerPO.languageManagerMenuItem.click();
  });

  afterEach(function(done) {
    beakerPO.closeNotebook()
    .then(done);
  });

  it('can be opened', function () {
    expect(beakerPO.languageManager.isDisplayed()).toBe(true);
  });

  it('can load Groovy', function () {
    expect(beakerPO.languageManagerButtonKnown('Groovy').isPresent()).toBe(true);
    expect(beakerPO.languageManagerButtonActive('Groovy').isPresent()).toBe(false);
    beakerPO.languageManagerButton('Groovy').click();
    beakerPO.waitForPlugin('Groovy');
    expect(beakerPO.languageManagerButtonActive('Groovy').isPresent()).toBe(true);
  });

  it('can load IPython', function () {
    expect(beakerPO.languageManagerButtonKnown('IPython').isPresent()).toBe(true);
    expect(beakerPO.languageManagerButtonActive('IPython').isPresent()).toBe(false);
    beakerPO.languageManagerButton('IPython').click();
    beakerPO.waitForPlugin('IPython');
    expect(beakerPO.languageManagerButtonActive('IPython').isPresent()).toBe(true);
  });

  it('can be closed', function () {
    beakerPO.languageManagerButton('Groovy').click();
    beakerPO.languageManagerCloseButton.click();
    browser.sleep(1000);
    expect(element.all(by.className('plugin-manager')).count()).toEqual(0);
  });
});
