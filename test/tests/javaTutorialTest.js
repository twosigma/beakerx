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

describe('JavaTutorial notebook', function () {

  beforeAll(function (done) {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByName('javaTutorial.ipynb', done);
  });

  it('Can run Java cell. ', function (done) {
    beakerxPO.kernelIdleIcon.waitForEnabled();
    beakerxPO.runCodeCellByIndex(0);
    browser.call(done);
  });

  describe('Run first cell. ', function () {
    it('Output contains "test.beaker.BeakerTest"', function (done) {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.checkOutputText(0, 'test.beaker.BeakerTest');
      browser.call(done);
    });
  });

  describe('Run 2nd cell. ', function () {
    it('Output contains "Today:"', function (done) {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.checkOutputText(1, 'Today:');
      browser.call(done);
    });
  });

});