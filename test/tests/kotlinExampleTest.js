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

describe('Kotlin-example notebook', function () {

  beforeAll(function (done) {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByName('Kotlin-example.ipynb', done);
  }, 2);

  describe('Run first cell. ', function () {
    it('Output contains "hello, 14"', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCallAndCheckOutputText(0, 'hello, 14');
    });
  });

  describe('Run 2nd cell. ', function () {
    it('PlotLegendContainer is enabled', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      var dtContainer = beakerxPO.runCellToGetDtContainer(1);
      beakerxPO.plotLegendContainerIsEnabled(dtContainer);
    });
  });

});