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
      beakerxPO.runCallAndCheckOutputText(0, 'test.beaker.BeakerTest');
      browser.call(done);
    });
  });

  describe('Run 2nd cell. ', function () {
    it('Output contains "Today:"', function (done) {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCallAndCheckOutputText(1, 'Today:');
      browser.call(done);
    });
  });

  describe('Run 6th cell. ', function () {
    it('PlotLegendContainer is enabled', function (done) {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      var dtContainer = beakerxPO.runCellToGetDtContainer(5);
      beakerxPO.plotLegendContainerIsEnabled(dtContainer);
      browser.call(done);
    });
  });

  describe('Run 7th cell. ', function () {
    it('Output contains "DateGetter"', function (done) {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCallAndCheckOutputText(6, 'DateGetter');
      browser.call(done);
    });
  });

  describe('Run 8th cell. ', function () {
    it('Output contains "DG2"', function (done) {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCallAndCheckOutputText(7, 'DG2');
      browser.call(done);
    });
  });

  describe('Run 10th cell. ', function () {
    it('Output contains "beakerx/doc/contents"', function (done) {
      beakerxPO.runCodeCellByIndex(8);
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCallAndCheckOutputText(9, 'beakerx\.doc\.contents');
      browser.call(done);
    });
  });

  describe('Run 11th cell. ', function () {
    it('Output contains "static_123 object_123"', function (done) {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCallAndCheckOutputText(10, '((static_123)\.*\n*(object_123))');
      browser.call(done);
    });
  });

});