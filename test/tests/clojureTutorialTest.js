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

  afterAll(function(){
    browser.close();
  })

  it('Can run Clojure cell', function (done) {
    beakerxPO.kernelIdleIcon.waitForEnabled();
    beakerxPO.runCodeCellByIndex(0);
    browser.call(done);
  });

  describe('Run first cell', function () {
    it('Output Result contains "clojure.lang.LazySeq"', function (done) {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      var codeCell = beakerxPO.runCodeCellByIndex(0);
      var outputText = codeCell.$('.output_subarea.output_text.output_result');
      outputText.waitForEnabled();
      expect(outputText.getText()).toMatch('clojure.lang.LazySeq');
      browser.call(done);
    });
  });

});