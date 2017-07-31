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

describe('ClojureTutorial notebook', function () {

  beforeAll(function (done) {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByName('ClojureTutorial.ipynb', done);
  });

  it('Can run Clojure cell', function (done) {
    beakerxPO.kernelIdleIcon.waitForEnabled();
    beakerxPO.runCodeCellByIndex(0);
    browser.call(done);
  });

  function checkOutputText(index, expectedText){
    var codeCell = beakerxPO.runCodeCellByIndex(index);
    var outputText = codeCell.$('.output_subarea.output_text');
    outputText.waitForEnabled();
    expect(outputText.getText()).toMatch(expectedText);
  }

  describe('Run first cell', function () {
    it('Output contains "clojure.lang.LazySeq"', function (done) {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      checkOutputText(0, 'clojure.lang.LazySeq');
      browser.call(done);
    });
  });

  describe('Run 2nd cell', function () {
    it('Output contains "Will print"', function (done) {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      checkOutputText(1, 'Will print');
      browser.call(done);
    });
  });

  describe('Run 3rd cell', function () {
    it('Output contains "Distinct: 36"', function (done) {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      checkOutputText(2, 'Distinct: 36');
      browser.call(done);
    });
  });

});