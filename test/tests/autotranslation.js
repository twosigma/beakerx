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

describe('autotranslation', function() {
  beforeEach(function(done) {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 120000; // Slow initialization cells, CI box might need a long time to initialize these
    beakerPO = new BeakerPageObject();
    browser.get(beakerPO.baseURL).then(done);
  });

  it('handles JVM notebook', function() {
    browser.get(beakerPO.baseURL + "beaker/#/open?uri=file:..%2Ftest%2Fnotebooks%2Fjvm-autotranslation-test.bkr&readOnly=true");
    beakerPO.waitForInstantiationCells('waitForInstantiationCell');

    beakerPO.waitForCellOutputByIdCell('maintest');
    beakerPO.waitForCellOutputByIdCell('codeOSRZTr');

    beakerPO.getCodeCellOutputByIdCell('maintest').getText().then(function(output) {
      expect(output).toEqual('OK');
    });
    beakerPO.getCodeCellOutputByIdCell('codeOSRZTr').getText().then(function(output) {
      expect(output).toEqual('OK');
    });
  });
});
