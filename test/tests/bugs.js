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

describe('Encountered bugs', function() {
  beforeEach(function(done) {
    beakerPO = new BeakerPageObject();
    browser.get(beakerPO.baseURL);
    browser.waitForAngular().then(function() {
      done();
    });
  })
  describe('cell output', function() {
    it('is visible after opening a closed section', function(done) {
      beakerPO.openFile(path.join(__dirname, '../', 'notebooks/closed-section-breaks-table.bkr'));
      beakerPO.waitUntilLoadingFinished();
      beakerPO.openSection();
      beakerPO.getCellOutput().isPresent().then(function(present) {
        expect(present).toEqual(true);
        done();
      });
    });
  });
});