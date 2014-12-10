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
    element(by.id('new-empty-notebook')).click();
    expect(browser.getTitle()).toEqual('New Notebook');
  });

  it('open language manager', function () {
    element(by.id('notebook-menu')).click();
    element(by.id('language-manager-menuitem')).click();
    expect(element(by.className('plugin-manager')).isDisplayed()).toBe(true);
  });

  it('load ipython', function () {
    expect(element(by.css('#IPython-button .plugin-known')).isDisplayed()).toBe(true);
    expect(element(by.css('#IPython-button .plugin-active')).isDisplayed()).toBe(false);
    element(by.id('IPython-button')).click();
    browser.wait(function () {
      var deferred = protractor.promise.defer();
      element(by.css('#IPython-button .plugin-active')).isDisplayed()
        .then(function (result) {
          deferred.fulfill(result);
        });
      return deferred.promise;
    });
  });

  it('close language manager', function () {
    element(by.id('language-manager-close-button')).click();
    expect(element.all(by.className('plugin-manager')).count()).toEqual(0);
  });

  

});
