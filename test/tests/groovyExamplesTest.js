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

describe('GroovyExamples notebook', function () {

  beforeAll(function (done) {
    beakerxPO = new BeakerXPageObject();
    beakerxPO.runNotebookByName('GroovyExamples.ipynb', done);
  }, 2);

  describe('Run first cell. ', function () {
    it('Output contains "2"', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCallAndCheckOutputText(0, '2');
    });
  });

  describe('Run 2nd cell. ', function () {
    it('Output contains "groovy.lang.MissingPropertyException"', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCallAndCheckOutputText(1, 'groovy.lang.MissingPropertyException');
    });
  }, 2);

  describe('Run 3rd cell. ', function () {
    it('Output contains "2"', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCallAndCheckOutputText(2, '2');
    });
  }, 2);

  describe('Run 4th cell. ', function () {
    it('Output contains "run_closure"', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCallAndCheckOutputText(3, 'run_closure');
    });
  }, 2);

  describe('Run 5th cell. ', function () {
    it('Output contains "8"', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCallAndCheckOutputText(4, '8');
    });
  }, 2);

  describe('Run 6th cell. ', function () {
    it('Output contains "Multiplying Strings!Multiplying Strings!"', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCallAndCheckOutputText(5, 'Multiplying Strings!Multiplying Strings!');
    });
  }, 2);

  describe('Run 7th cell. ', function () {
    it('Output contains "9.265"', function () {
      beakerxPO.kernelIdleIcon.waitForEnabled();
      beakerxPO.runCallAndCheckOutputText(6, '9.265');
    });
  }, 2);

});