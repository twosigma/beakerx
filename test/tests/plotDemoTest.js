/*
 *  Copyright 2017 TWO SIGMA OPEN SOURCE, LLC
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

var BeakerXPageObject = require('./beakerx.po.js');
var beakerxPO;

describe('PlotFeatures notebook', function () {

  beforeAll(function (done) {
    beakerxPO = new BeakerXPageObject();
    browser
      .url(beakerxPO.baseURL)
      .call(done);
    beakerxPO.loginJupyter();
    browser.click('=PlotFeatures.ipynb');
    browser.window(browser.windowHandles().value[1]);
  });

  it('Can run Groovy cell', function (done) {
    beakerxPO.kernelIdleIcon.waitForEnabled();
    beakerxPO.runCodeCellByIndex(0);
    browser.call(done);
  });

  function runCellToDtContainer(index){
    beakerxPO.kernelIdleIcon.waitForEnabled();
    var codeCell = beakerxPO.runCodeCellByIndex(index);
    return beakerxPO.getDtContainer(codeCell);
  }

  describe('Title and Axis Labels', function () {

    it('Should create dtcontainer', function (done) {
      var dtContainer = runCellToDtContainer(0);
      dtContainer.waitForEnabled();
      browser.call(done);
    });

    it('Should create Title', function (done) {
      var dtContainer = runCellToDtContainer(0);
      dtContainer.waitForEnabled();
      expect(dtContainer.$('#plotTitle').getText()).toEqual('We Will Control the Title');
      browser.call(done);
    });

    it('Should create Axes Labels', function (done) {
      var dtContainer = runCellToDtContainer(0);
      dtContainer.waitForEnabled();
      expect(dtContainer.$('#xlabel').getText()).toEqual('Horizontal');
      expect(dtContainer.$('#ylabel').getText()).toEqual('Vertical');
      browser.call(done);
    });

  });

});